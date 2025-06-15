import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, message } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
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
import { planeService } from '../../services/planeService';
import { PlaneTopology, PlaneStats, PlaneDependencyAnalysis } from '../../components/Plane';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PlaneContainer = styled.div`
  padding: 24px;
`;

const PlaneManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { 
    definitions: planes, 
    topology, 
    metrics,
    loading,
    error 
  } = useAppSelector(state => state.plane);

  useEffect(() => {
    setPageTitle(t('planes.title'));
    loadPlaneData();
  }, [t]);

  const loadPlaneData = async () => {
    try {
      // 设置加载状态
      dispatch(setLoading({ type: 'definitions', loading: true }));
      dispatch(setLoading({ type: 'topology', loading: true }));
      dispatch(setLoading({ type: 'metrics', loading: true }));

      // 加载平面定义
      try {
        const definitionsResponse = await planeService.getPlaneDefinitions();
        dispatch(setDefinitions(definitionsResponse.data));
      } catch (error: any) {
        dispatch(setError({ type: 'definitions', error: error.message || '加载平面定义失败' }));
      }

      // 加载拓扑结构
      try {
        const topologyResponse = await planeService.getPlaneTopology();
        dispatch(setTopology(topologyResponse));
      } catch (error: any) {
        dispatch(setError({ type: 'topology', error: error.message || '加载拓扑结构失败' }));
      }

      // 加载指标数据
      try {
        const metricsResponse = await planeService.getAllPlanesMetrics();
        dispatch(setMetrics(metricsResponse));
      } catch (error: any) {
        dispatch(setError({ type: 'metrics', error: error.message || '加载指标数据失败' }));
      }

    } catch (error) {
      message.error('加载平面数据失败');
      console.error('Failed to load plane data:', error);
    }
  };

  const handleRefresh = () => {
    loadPlaneData();
  };

  const handlePlaneAction = (action: 'view' | 'edit' | 'add', planeId: string) => {
    const plane = planes.find((p: any) => p.id === planeId);
    if (plane) {
      dispatch(setSelectedPlane(plane));
    }

    switch (action) {
      case 'view':
        message.info(`${t('common.view')}: ${plane?.displayName || planeId}`);
        // TODO: 打开平面详情模态框或跳转到详情页
        break;
      case 'edit':
        navigate(`/planes/edit/${planeId}`);
        break;
      case 'add':
        message.info(`${t('common.add')}: ${plane?.displayName || planeId}`);
        // TODO: 打开添加实例模态框
        break;
      default:
        break;
    }
  };

  const handleCreatePlane = () => {
    navigate('/planes/create');
  };

  return (
    <PlaneContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2}>{t('planes.title')}</Title>
            <Paragraph>
              {t('planes.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              loading={loading.definitions || loading.topology || loading.metrics}
            >
              {t('common.refresh')}
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreatePlane}
            >
              {t('common.add')} {t('planes.title')}
            </Button>
          </Space>
        </div>
      </div>

      {/* 错误提示 */}
      {(error.definitions || error.topology || error.metrics) && (
        <Card style={{ marginBottom: 24, borderColor: '#ff4d4f' }}>
          <div style={{ color: '#ff4d4f' }}>
            {error.definitions && <div>平面定义加载失败: {error.definitions}</div>}
            {error.topology && <div>拓扑结构加载失败: {error.topology}</div>}
            {error.metrics && <div>指标数据加载失败: {error.metrics}</div>}
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
      <Card title="操作说明" style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>平面层级与依赖说明</Title>
            <ul>
              <li><strong>L1 - 基础设施平面</strong>: 底层资源，不依赖其他平面</li>
              <li><strong>L2 - 中间件平面</strong>: 依赖基础设施平面</li>
              <li><strong>L3 - 业务系统平面</strong>: 依赖中间件和基础设施平面 <span style={{color: '#fa8c16'}}>(多重依赖)</span></li>
              <li><strong>L4 - 业务链路平面</strong>: 依赖业务系统和中间件平面 <span style={{color: '#fa8c16'}}>(多重依赖)</span></li>
              <li><strong>L5 - 业务场景平面</strong>: 依赖业务链路、业务系统和基础设施 <span style={{color: '#ff4d4f'}}>(复杂依赖)</span></li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>功能特性</Title>
            <ul>
              <li><strong>多重依赖支持</strong>: 支持一个平面依赖多个平面</li>
              <li><strong>依赖复杂度分析</strong>: 自动分析平面依赖的复杂程度和风险</li>
              <li><strong>可视化展示</strong>: 直观显示平面间的依赖关系</li>
              <li><strong>实时监控</strong>: 基于实体健康状态的平面状态监控</li>
              <li><strong>风险评估</strong>: 根据依赖复杂度评估平面风险等级</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </PlaneContainer>
  );
};

export default PlaneManagement;
