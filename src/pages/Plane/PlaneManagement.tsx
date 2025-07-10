import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, message, Modal, Form, Input, Select, Spin } from 'antd';
import { PlusOutlined, ReloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  setDefinitions, 
  setTopology, 
  setMetrics, 
  setSelectedPlane,
  setLoading,
  setError
} from '../../store/slices/simplePlaneSlice';
import PlaneApi from '../../services/planeApi';
import type { SavePlaneRequest, PlaneResponse } from '../../services/planeApi';
import { planeService } from '../../services/planeService';
import { PlaneTopology, PlaneStats, PlaneDependencyAnalysis } from '../../components/Plane';
import styled from 'styled-components';
import '../../styles/plane-management.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const PlaneContainer = styled.div`
  padding: 24px;
`;

const PlaneManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['planes', 'common']);
  const { 
    definitions: planes, 
    topology, 
    metrics,
    loading,
    error 
  } = useAppSelector(state => state.plane);
  
  // 新增状态
  const [planeList, setPlaneList] = useState<PlaneResponse[]>([]);
  const [statsData, setStatsData] = useState<any>(null); // 添加统计数据状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlane, setEditingPlane] = useState<SavePlaneRequest | null>(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setPageTitle(t('planes:title'));
    loadPlaneData();
    // 加载真实平面数据
    fetchPlanes();
    // 加载统计数据
    fetchStatsData();
  }, [t]);

  // 从API获取平面列表
  const fetchPlanes = async () => {
    try {
      const planes = await PlaneApi.listPlanes();
      setPlaneList(planes);
      // 数据转换和依赖关系计算在loadPlaneData中统一处理
    } catch (error) {
      console.error('Failed to fetch planes:', error);
      message.error(t('planes:errors.planeDefinitionLoadFailed'));
    }
  };

  // 获取统计数据
  const fetchStatsData = async () => {
    try {
      const stats = await PlaneApi.getStatsOverview();
      setStatsData(stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      message.error('获取统计数据失败');
    }
  };
  
  // 映射API状态到平面状态
  const mapApiStatusToPlaneStatus = (apiStatus: string): 'ACTIVE' | 'WARNING' | 'ERROR' | 'MAINTENANCE' => {
    const statusMap: Record<string, 'ACTIVE' | 'WARNING' | 'ERROR' | 'MAINTENANCE'> = {
      'ACTIVE': 'ACTIVE',
      'INACTIVE': 'MAINTENANCE',
      'ARCHIVED': 'MAINTENANCE',
      'WARNING': 'WARNING',
      'ERROR': 'ERROR'
    };
    return statusMap[apiStatus] || 'ACTIVE';
  };

  const loadPlaneData = async () => {
    try {
      // 设置加载状态
      dispatch(setLoading({ type: 'definitions', loading: true }));
      dispatch(setLoading({ type: 'topology', loading: true }));
      dispatch(setLoading({ type: 'metrics', loading: true }));

      // 获取平面列表数据
      const apiPlanes = await PlaneApi.listPlanes();
      
      // 转换API数据为PlaneDefinition格式
      const formattedPlanes = apiPlanes.map(plane => {
        const totalEntities = plane.entityCount || 0;
        const healthyEntities = plane.entities?.filter(e => e.status === 'ACTIVE')?.length || 0;
        const warningEntities = plane.entities?.filter(e => e.status === 'WARNING')?.length || 0;
        const errorEntities = plane.entities?.filter(e => e.status === 'ERROR')?.length || 0;
        
        const getPlaneTypeIcon = (type: string): string => {
          const iconMap: Record<string, string> = {
            'BUSINESS': '💼',
            'TECHNICAL': '⚙️',
            'KNOWLEDGE': '📚',
            'WORKFLOW': '🔄'
          };
          return iconMap[type] || '📋';
        };
        
        const getPlaneTypeColor = (type: string): string => {
          const colorMap: Record<string, string> = {
            'BUSINESS': '#1890ff',
            'TECHNICAL': '#52c41a',
            'KNOWLEDGE': '#722ed1',
            'WORKFLOW': '#fa8c16'
          };
          return colorMap[type] || '#1890ff';
        };
        
        return {
          id: plane.id,
          name: plane.name,
          displayName: plane.name,
          description: plane.description || '',
          level: plane.level ? parseInt(plane.level.substring(1)) : 1,
          dependencies: plane.dependencies ? plane.dependencies.map(dep => dep.id) : [], // 使用API返回的依赖ID
          entityHealth: {
            healthy: healthyEntities,
            warning: warningEntities,
            error: errorEntities,
            total: totalEntities
          },
          config: {
            icon: getPlaneTypeIcon(plane.type),
            color: getPlaneTypeColor(plane.type),
            theme: 'default',
            maxInstances: 10,
            autoScaling: false,
            monitoring: { enabled: true, alertThreshold: 80 },
            security: { accessControl: true, encryption: false },
            healthThresholds: { warningThreshold: 0.2, errorThreshold: 0.1 }
          },
          status: mapApiStatusToPlaneStatus(plane.status),
          createdAt: plane.createdAt,
          updatedAt: plane.updatedAt
        };
      });
      
      // 计算依赖关系
      const relationships = calculateRelationships(apiPlanes);
      
      // 分析依赖复杂度
      const complexity = analyzeDependencyComplexity(formattedPlanes, relationships);
      
      // 更新Redux状态
      dispatch(setDefinitions(formattedPlanes));
      
      // 更新拓扑数据，包含复杂度分析
      const topology = {
        relationships: relationships,
        complexity: complexity
      };
      dispatch(setTopology(topology));
      
      // 计算指标数据
      const metrics = calculateMetrics(apiPlanes);
      dispatch(setMetrics(metrics));

      // 输出调试信息
      console.log('平面拓扑关系计算完成:', {
        planesCount: formattedPlanes.length,
        relationshipsCount: relationships.length,
        complexity: complexity,
        planes: formattedPlanes,
        relationships: relationships
      });

    } catch (error) {
      message.error(t('planes:errors.loadDataFailed'));
      console.error('Failed to load plane data:', error);
      dispatch(setError({ type: 'definitions', error: error.message }));
      dispatch(setError({ type: 'topology', error: error.message }));
      dispatch(setError({ type: 'metrics', error: error.message }));
    } finally {
      dispatch(setLoading({ type: 'definitions', loading: false }));
      dispatch(setLoading({ type: 'topology', loading: false }));
      dispatch(setLoading({ type: 'metrics', loading: false }));
    }
  };
  
  // 根据API返回的依赖关系构建关系数据
  const calculateRelationships = (planes: PlaneResponse[]) => {
    const relationships = [];
    
    // 遍历每个平面，根据其dependencies字段构建关系
    planes.forEach(plane => {
      if (plane.dependencies && plane.dependencies.length > 0) {
        plane.dependencies.forEach(dependency => {
          relationships.push({
            id: `${plane.id}-depends-${dependency.id}`,
            sourceId: plane.id,
            targetId: dependency.id,
            type: 'DEPENDS_ON',
            properties: {
              strength: 'MEDIUM',
              description: `${plane.name} 依赖于 ${dependency.name}`,
              weight: 0.6
            }
          });
        });
      }
    });
    
    console.log('从API数据构建的依赖关系:', relationships);
    return relationships;
  };
  
  // 计算平面指标数据
  const calculateMetrics = (planes: PlaneResponse[]) => {
    return planes.map(plane => {
      // 根据实体数量和状态计算健康度
      const totalEntities = plane.entityCount || 0;
      const healthyEntities = plane.entities?.filter(e => e.status === 'ACTIVE')?.length || 0;
      const warningEntities = plane.entities?.filter(e => e.status === 'WARNING')?.length || 0;
      const errorEntities = plane.entities?.filter(e => e.status === 'ERROR')?.length || 0;
      
      const healthScore = totalEntities > 0 ? (healthyEntities / totalEntities) * 100 : 100;
      
      // 根据平面类型设置不同的性能指标
      let performanceScore = 0;
      switch (plane.type) {
        case 'BUSINESS':
          performanceScore = 85 + Math.random() * 10;
          break;
        case 'TECHNICAL':
          performanceScore = 75 + Math.random() * 15;
          break;
        case 'KNOWLEDGE':
          performanceScore = 90 + Math.random() * 8;
          break;
        case 'WORKFLOW':
          performanceScore = 80 + Math.random() * 12;
          break;
        default:
          performanceScore = 80 + Math.random() * 10;
      }
      
      return {
        planeId: plane.id,
        planeName: plane.name,
        health: {
          score: healthScore,
          status: healthScore > 90 ? 'HEALTHY' : healthScore > 70 ? 'WARNING' : 'CRITICAL',
          details: {
            totalEntities,
            healthyEntities,
            warningEntities,
            errorEntities
          }
        },
        performance: {
          score: performanceScore,
          responseTime: 100 + Math.random() * 200,
          throughput: 50 + Math.random() * 100,
          errorRate: Math.random() * 2
        },
        utilization: {
          cpu: 30 + Math.random() * 40,
          memory: 40 + Math.random() * 30,
          storage: 20 + Math.random() * 50,
          network: 10 + Math.random() * 60
        },
        timestamp: new Date().toISOString()
      };
    });
  };

  // 分析依赖复杂度
  const analyzeDependencyComplexity = (planes: any[], relationships: any[]) => {
    const analysis = {
      totalPlanes: planes.length,
      totalRelationships: relationships.length,
      averageDependencies: 0,
      maxDependencies: 0,
      complexityScore: 0,
      riskLevel: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
      recommendations: [] as string[]
    };
    
    if (planes.length === 0) return analysis;
    
    // 计算每个平面的依赖数量
    const dependencyCounts = planes.map(plane => {
      const outgoing = relationships.filter(r => r.sourceId === plane.id).length;
      const incoming = relationships.filter(r => r.targetId === plane.id).length;
      return { planeId: plane.id, planeName: plane.name, outgoing, incoming, total: outgoing + incoming };
    });
    
    analysis.averageDependencies = dependencyCounts.reduce((sum, item) => sum + item.total, 0) / planes.length;
    analysis.maxDependencies = Math.max(...dependencyCounts.map(item => item.total));
    
    // 计算复杂度分数 (0-100)
    const densityScore = planes.length > 1 ? (relationships.length / (planes.length * (planes.length - 1))) * 100 : 0;
    const levelVariance = calculateLevelVariance(planes);
    analysis.complexityScore = Math.min(100, densityScore * 50 + levelVariance * 10);
    
    // 确定风险级别和建议
    if (analysis.complexityScore < 20) {
      analysis.riskLevel = 'LOW';
      analysis.recommendations.push('依赖关系简单，系统稳定性良好');
    } else if (analysis.complexityScore < 50) {
      analysis.riskLevel = 'MEDIUM';
      analysis.recommendations.push('依赖关系适中，建议定期检查关键依赖');
      analysis.recommendations.push('考虑优化高依赖度的平面');
    } else if (analysis.complexityScore < 80) {
      analysis.riskLevel = 'HIGH';
      analysis.recommendations.push('依赖关系复杂，需要重点关注');
      analysis.recommendations.push('建议简化依赖链，减少耦合度');
      analysis.recommendations.push('加强监控和告警机制');
    } else {
      analysis.riskLevel = 'CRITICAL';
      analysis.recommendations.push('依赖关系过于复杂，存在高风险');
      analysis.recommendations.push('紧急需要重构依赖架构');
      analysis.recommendations.push('建立依赖隔离和降级机制');
    }
    
    // 找出高依赖度的平面
    const highDependencyPlanes = dependencyCounts.filter(item => item.total > analysis.averageDependencies * 1.5);
    if (highDependencyPlanes.length > 0) {
      analysis.recommendations.push(`高依赖度平面: ${highDependencyPlanes.map(p => p.planeName).join(', ')}`);
    }
    
    return analysis;
  };

  // 计算层级方差
  const calculateLevelVariance = (planes: any[]): number => {
    const levels = planes.map(p => p.level || 1);
    const mean = levels.reduce((sum, level) => sum + level, 0) / levels.length;
    const variance = levels.reduce((sum, level) => sum + Math.pow(level - mean, 2), 0) / levels.length;
    return Math.sqrt(variance);
  };

  // 更新平面依赖关系字段
  const updatePlaneDependencies = (planes: any[], relationships: any[]) => {
    return planes.map(plane => ({
      ...plane,
      dependencies: relationships
        .filter(rel => rel.sourceId === plane.id)
        .map(rel => rel.targetId)
    }));
  };

  const handleRefresh = async () => {
    await fetchPlanes();
    await fetchStatsData();
    await loadPlaneData();
  };

  // 处理平面操作
  const handlePlaneAction = (action: 'view' | 'edit' | 'add' | 'delete', planeId: string) => {
    const plane = planeList.find(p => p.id === planeId);
    
    if (action !== 'add' && !plane) {
      message.error(t('planes:errors.planeNotFound'));
      return;
    }

    switch (action) {
      case 'view':
        if (plane) {
          // 查看平面详情
          PlaneApi.getPlaneDetail(planeId)
            .then(detail => {
              Modal.info({
                title: `${t('common:view')}: ${plane.name}`,
                width: 600,
                content: (
                  <div>
                    <p><strong>ID:</strong> {detail.id}</p>
                    <p><strong>{t('planes:form.name')}:</strong> {detail.name}</p>
                    <p><strong>{t('planes:form.description')}:</strong> {detail.description || '-'}</p>
                    <p><strong>{t('planes:form.type')}:</strong> {detail.type}</p>
                    <p><strong>{t('planes:form.status')}:</strong> {detail.status}</p>
                    <p><strong>{t('planes:form.level')}:</strong> {detail.level || '-'}</p>
                    <p><strong>{t('planes:form.owner')}:</strong> {detail.ownerId}</p>
                    <p><strong>{t('planes:form.entityCount')}:</strong> {detail.entityCount}</p>
                    <p><strong>{t('planes:form.createdAt')}:</strong> {new Date(detail.createdAt).toLocaleString()}</p>
                    <p><strong>{t('planes:form.updatedAt')}:</strong> {new Date(detail.updatedAt).toLocaleString()}</p>
                  </div>
                ),
              });
            })
            .catch(error => {
              message.error(`${t('planes:errors.planeDetailLoadFailed')}: ${error.message}`);
            });
        }
        break;
      case 'edit':
        if (plane) {
          setEditingPlane({
            id: plane.id,
            name: plane.name,
            description: plane.description,
            type: plane.type as 'BUSINESS' | 'TECHNICAL' | 'KNOWLEDGE' | 'WORKFLOW',
            status: plane.status as 'ACTIVE' | 'INACTIVE' | 'ARCHIVED',
            level: plane.level,
            ownerId: plane.ownerId,
            metadata: plane.metadata
          });
          form.setFieldsValue({
            name: plane.name,
            description: plane.description,
            type: plane.type,
            status: plane.status,
            level: plane.level,
            ownerId: plane.ownerId
          });
          setIsModalVisible(true);
        }
        break;
      case 'delete':
        if (plane) {
          Modal.confirm({
            title: t('planes:delete.confirmTitle'),
            content: t('planes:delete.confirmContent', { name: plane.name }),
            okText: t('common:delete'),
            okType: 'danger',
            cancelText: t('common:cancel'),
            onOk: async () => {
              try {
                await PlaneApi.deletePlane(planeId);
                message.success(t('planes:delete.success'));
                fetchPlanes(); // 重新加载数据
              } catch (error: any) {
                message.error(`${t('planes:delete.error')}: ${error.message}`);
              }
            }
          });
        }
        break;
      case 'add':
        // 这里可以处理添加实例的逻辑
        message.info(`${t('common:add')}: ${plane?.name || planeId}`);
        break;
      default:
        break;
    }
  };

  const handleCreatePlane = () => {
    setEditingPlane(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      
      const planeData: SavePlaneRequest = {
        ...values,
        id: editingPlane?.id // 如果是编辑，则包含ID
      };
      
      await PlaneApi.savePlane(planeData);
      message.success(editingPlane ? t('planes:edit.success') : t('planes:create.success'));
      setIsModalVisible(false);
      fetchPlanes(); // 重新加载数据
    } catch (error: any) {
      console.error('Form submission failed:', error);
      message.error(`${editingPlane ? t('planes:edit.error') : t('planes:create.error')}: ${error.message}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 渲染平面列表
  const renderPlaneList = () => {
    return (
      <Card title={t('planes:list.title')} style={{ marginBottom: 24 }}>
        {planeList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            {loading.definitions ? t('common:loading') : t('planes:list.empty')}
          </div>
        ) : (
          <div className="plane-list">
            {planeList.map(plane => (
              <Card 
                key={plane.id} 
                size="small" 
                title={plane.name}
                style={{ marginBottom: 16 }}
                extra={
                  <Space>
                    <Button 
                      size="small" 
                      onClick={() => handlePlaneAction('view', plane.id)}
                    >
                      {t('common:view')}
                    </Button>
                    <Button 
                      size="small" 
                      icon={<EditOutlined />}
                      onClick={() => handlePlaneAction('edit', plane.id)}
                    >
                      {t('common:edit')}
                    </Button>
                    <Button 
                      size="small" 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handlePlaneAction('delete', plane.id)}
                    >
                      {t('common:delete')}
                    </Button>
                  </Space>
                }
              >
                <p><strong>{t('planes:form.type')}:</strong> {plane.type}</p>
                <p><strong>{t('planes:form.status')}:</strong> {plane.status}</p>
                <p><strong>{t('planes:form.level')}:</strong> {plane.level || '-'}</p>
                <p><strong>{t('planes:form.entityCount')}:</strong> {plane.entityCount}</p>
                {plane.description && <p><strong>{t('planes:form.description')}:</strong> {plane.description}</p>}
              </Card>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <PlaneContainer className="plane-management-page">
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title level={2} style={{ margin: 0 }}>{t('planes:title')}</Title>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              loading={loading.definitions || loading.topology || loading.metrics}
            >
              {t('common:refresh')}
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreatePlane}
            >
              {t('planes:createTitle')}
            </Button>
          </Space>
        </div>
        <Paragraph style={{ margin: 0 }}>
          {t('planes:subtitle')}
        </Paragraph>
      </div>

      {/* 错误提示 */}
      {(error.definitions || error.topology || error.metrics) && (
        <Card className="error-card" style={{ marginBottom: 24 }}>
          <div className="error-text">
            {error.definitions && <div>{t('planes:errors.planeDefinitionLoadFailed')}: {error.definitions}</div>}
            {error.topology && <div>{t('planes:errors.topologyLoadFailed')}: {error.topology}</div>}
            {error.metrics && <div>{t('planes:errors.metricsLoadFailed')}: {error.metrics}</div>}
          </div>
        </Card>
      )}

      {/* 统计信息 */}
      <PlaneStats 
        planes={planes}
        metrics={metrics}
        statsData={statsData}
        loading={loading.definitions || loading.metrics}
      />

      {/* 平面拓扑结构 */}
      <PlaneTopology
        planes={planes}
        relationships={topology?.relationships || []}
        loading={loading.definitions || loading.topology}
        onPlaneAction={handlePlaneAction}
      />

      {/* 平面依赖复杂度分析 */}
      <PlaneDependencyAnalysis
        planes={planes}
        relationships={topology?.relationships || []}
      />

      {/* 依赖复杂度分析结果 */}
      {topology?.complexity && (
        <Card 
          title="依赖复杂度分析" 
          style={{ marginTop: 24 }}
          extra={
            <span style={{ 
              color: topology.complexity.riskLevel === 'LOW' ? '#52c41a' : 
                     topology.complexity.riskLevel === 'MEDIUM' ? '#faad14' :
                     topology.complexity.riskLevel === 'HIGH' ? '#fa8c16' : '#ff4d4f'
            }}>
              风险级别: {topology.complexity.riskLevel}
            </span>
          }
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <p><strong>总平面数:</strong> {topology.complexity.totalPlanes}</p>
                <p><strong>总依赖关系数:</strong> {topology.complexity.totalRelationships}</p>
                <p><strong>平均依赖数:</strong> {topology.complexity.averageDependencies.toFixed(2)}</p>
                <p><strong>最大依赖数:</strong> {topology.complexity.maxDependencies}</p>
                <p><strong>复杂度分数:</strong> {topology.complexity.complexityScore.toFixed(1)}/100</p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <p><strong>优化建议:</strong></p>
                <ul>
                  {topology.complexity.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* 操作说明 */}
      <Card title={t('planes:operations.title')} style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>{t('planes:operations.levelDescription')}</Title>
            <ul>
              <li><strong>{t('planes:operations.levelDetails.l1')}</strong>: {t('planes:operations.levelDetails.l1Desc')}</li>
              <li><strong>{t('planes:operations.levelDetails.l2')}</strong>: {t('planes:operations.levelDetails.l2Desc')}</li>
              <li><strong>{t('planes:operations.levelDetails.l3')}</strong>: {t('planes:operations.levelDetails.l3Desc')} <span className="level-warning">({t('planes:operations.levelDetails.multipleDependency')})</span></li>
              <li><strong>{t('planes:operations.levelDetails.l4')}</strong>: {t('planes:operations.levelDetails.l4Desc')} <span className="level-warning">({t('planes:operations.levelDetails.multipleDependency')})</span></li>
              <li><strong>{t('planes:operations.levelDetails.l5')}</strong>: {t('planes:operations.levelDetails.l5Desc')} <span className="level-error">({t('planes:operations.levelDetails.complexDependency')})</span></li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>{t('planes:operations.features.title')}</Title>
            <ul>
              <li><strong>{t('planes:operations.features.multipleDependencySupport')}</strong>: {t('planes:operations.features.multipleDependencySupportDesc')}</li>
              <li><strong>{t('planes:operations.features.complexityAnalysis')}</strong>: {t('planes:operations.features.complexityAnalysisDesc')}</li>
              <li><strong>{t('planes:operations.features.visualization')}</strong>: {t('planes:operations.features.visualizationDesc')}</li>
              <li><strong>{t('planes:operations.features.realTimeMonitoring')}</strong>: {t('planes:operations.features.realTimeMonitoringDesc')}</li>
              <li><strong>{t('planes:operations.features.riskAssessment')}</strong>: {t('planes:operations.features.riskAssessmentDesc')}</li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* 平面表单模态框 */}
      <Modal
        title={editingPlane ? t('planes:edit.title') : t('planes:create.title')}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={confirmLoading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'BUSINESS',
            status: 'ACTIVE',
            ownerId: 'admin'
          }}
        >
          <Form.Item
            name="name"
            label={t('planes:form.name')}
            rules={[{ required: true, message: t('planes:form.nameRequired') }]}
          >
            <Input placeholder={t('planes:form.namePlaceholder')} />
          </Form.Item>
          
          <Form.Item
            name="description"
            label={t('planes:form.description')}
          >
            <Input.TextArea 
              placeholder={t('planes:form.descriptionPlaceholder')} 
              rows={3}
            />
          </Form.Item>
          
          <Form.Item
            name="type"
            label={t('planes:form.type')}
            rules={[{ required: true, message: t('planes:form.typeRequired') }]}
          >
            <Select placeholder={t('planes:form.typePlaceholder')}>
              <Option value="BUSINESS">BUSINESS</Option>
              <Option value="TECHNICAL">TECHNICAL</Option>
              <Option value="KNOWLEDGE">KNOWLEDGE</Option>
              <Option value="WORKFLOW">WORKFLOW</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label={t('planes:form.status')}
          >
            <Select placeholder={t('planes:form.statusPlaceholder')}>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
              <Option value="ARCHIVED">ARCHIVED</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="level"
            label={t('planes:form.level')}
          >
            <Select placeholder={t('planes:form.levelPlaceholder')}>
              <Option value="L1">L1</Option>
              <Option value="L2">L2</Option>
              <Option value="L3">L3</Option>
              <Option value="L4">L4</Option>
              <Option value="L5">L5</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="ownerId"
            label={t('planes:form.owner')}
            rules={[{ required: true, message: t('planes:form.ownerRequired') }]}
          >
            <Input placeholder={t('planes:form.ownerPlaceholder')} />
          </Form.Item>
        </Form>
      </Modal>
    </PlaneContainer>
  );
};

export default PlaneManagement;
