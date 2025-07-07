import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, message, Modal, Form, Input, Select } from 'antd';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlane, setEditingPlane] = useState<SavePlaneRequest | null>(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setPageTitle(t('planes:title'));
    loadPlaneData();
    // 加载真实平面数据
    fetchPlanes();
  }, [t]);

  // 从API获取平面列表
  const fetchPlanes = async () => {
    try {
      const planes = await PlaneApi.listPlanes();
      setPlaneList(planes);
      // 同时更新Redux状态，将API返回的数据转换为应用所需格式
      const formattedPlanes = planes.map(plane => ({
        id: plane.id,
        name: plane.name,
        displayName: plane.name,
        description: plane.description || '',
        level: plane.level ? parseInt(plane.level.substring(1)) : 1, // 从API获取级别，例如"L3"转为数字3
        dependencies: [],
        entityHealth: {
          healthy: plane.entities?.filter(e => e.status === 'ACTIVE')?.length || 0,
          warning: plane.entities?.filter(e => e.status === 'WARNING')?.length || 0,
          error: plane.entities?.filter(e => e.status === 'ERROR')?.length || 0,
          total: plane.entityCount || 0
        },
        config: {
          icon: '📋',
          color: '#1890ff',
          theme: 'default',
          maxInstances: 10,
          autoScaling: false,
          monitoring: { enabled: true, alertThreshold: 80 },
          security: { accessControl: true, encryption: false },
          healthThresholds: { warningThreshold: 0.2, errorThreshold: 0.1 }
        },
        status: plane.status,
        createdAt: plane.createdAt,
        updatedAt: plane.updatedAt
      }));
      dispatch(setDefinitions(formattedPlanes));
    } catch (error) {
      console.error('Failed to fetch planes:', error);
      message.error(t('planes:errors.planeDefinitionLoadFailed'));
    }
  };

  const loadPlaneData = async () => {
    try {
      // 设置加载状态
      dispatch(setLoading({ type: 'definitions', loading: true }));
      dispatch(setLoading({ type: 'topology', loading: true }));
      dispatch(setLoading({ type: 'metrics', loading: true }));

      // 获取平面列表数据
      const planes = await PlaneApi.listPlanes();
      
      // 根据平面类型和元数据计算依赖关系
      const relationships = calculateRelationships(planes);
      
      // 更新拓扑数据
      const topology = {
        relationships: relationships
      };
      dispatch(setTopology(topology));
      
      // 计算指标数据
      const metrics = calculateMetrics(planes);
      dispatch(setMetrics(metrics));

    } catch (error) {
      message.error(t('planes:errors.loadDataFailed'));
      console.error('Failed to load plane data:', error);
    } finally {
      dispatch(setLoading({ type: 'definitions', loading: false }));
      dispatch(setLoading({ type: 'topology', loading: false }));
      dispatch(setLoading({ type: 'metrics', loading: false }));
    }
  };
  
  // 计算平面之间的依赖关系
  const calculateRelationships = (planes: PlaneResponse[]) => {
    const relationships = [];
    
    // 根据平面类型创建依赖关系
    // 规则：
    // 1. BUSINESS 平面依赖于 TECHNICAL 平面
    // 2. TECHNICAL 平面依赖于 KNOWLEDGE 平面
    // 3. WORKFLOW 平面可能依赖于任何其他平面
    
    const businessPlanes = planes.filter(p => p.type === 'BUSINESS');
    const technicalPlanes = planes.filter(p => p.type === 'TECHNICAL');
    const knowledgePlanes = planes.filter(p => p.type === 'KNOWLEDGE');
    const workflowPlanes = planes.filter(p => p.type === 'WORKFLOW');
    
    // 创建 BUSINESS -> TECHNICAL 依赖
    businessPlanes.forEach(business => {
      // 为每个业务平面随机选择1-2个技术平面作为依赖
      const techDependencies = technicalPlanes
        .sort(() => 0.5 - Math.random()) // 随机排序
        .slice(0, Math.min(2, technicalPlanes.length)); // 取前1-2个
      
      techDependencies.forEach(tech => {
        relationships.push({
          sourceId: business.id,
          targetId: tech.id,
          type: 'DEPENDS_ON',
          strength: 'STRONG',
          metadata: {
            description: `${business.name} 依赖于 ${tech.name}`
          }
        });
      });
    });
    
    // 创建 TECHNICAL -> KNOWLEDGE 依赖
    technicalPlanes.forEach(tech => {
      // 为每个技术平面随机选择1-3个知识平面作为依赖
      const knowledgeDependencies = knowledgePlanes
        .sort(() => 0.5 - Math.random()) // 随机排序
        .slice(0, Math.min(3, knowledgePlanes.length)); // 取前1-3个
      
      knowledgeDependencies.forEach(knowledge => {
        relationships.push({
          sourceId: tech.id,
          targetId: knowledge.id,
          type: 'DEPENDS_ON',
          strength: 'MEDIUM',
          metadata: {
            description: `${tech.name} 依赖于 ${knowledge.name}`
          }
        });
      });
    });
    
    // 创建 WORKFLOW 依赖
    workflowPlanes.forEach(workflow => {
      // 工作流平面可能依赖于任何其他平面
      const allOtherPlanes = planes.filter(p => p.id !== workflow.id);
      const dependencies = allOtherPlanes
        .sort(() => 0.5 - Math.random()) // 随机排序
        .slice(0, Math.min(2, allOtherPlanes.length)); // 取前1-2个
      
      dependencies.forEach(dep => {
        relationships.push({
          sourceId: workflow.id,
          targetId: dep.id,
          type: 'ORCHESTRATES',
          strength: 'WEAK',
          metadata: {
            description: `${workflow.name} 编排 ${dep.name}`
          }
        });
      });
    });
    
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

  const handleRefresh = () => {
    fetchPlanes();
    loadPlaneData();
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
