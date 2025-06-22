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
  const { t } = useTranslation(['planes', 'common']);
  const { 
    definitions: planes, 
    topology, 
    metrics,
    loading,
    error 
  } = useAppSelector(state => state.plane);

  useEffect(() => {
    setPageTitle(t('planes:title'));
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
        dispatch(setError({ type: 'definitions', error: error.message || t('planes:errors.planeDefinitionLoadFailed') }));
      }

      // 加载拓扑结构
      try {
        const topologyResponse = await planeService.getPlaneTopology();
        dispatch(setTopology(topologyResponse));
      } catch (error: any) {
        dispatch(setError({ type: 'topology', error: error.message || t('planes:errors.topologyLoadFailed') }));
      }

      // 加载指标数据
      try {
        const metricsResponse = await planeService.getAllPlanesMetrics();
        dispatch(setMetrics(metricsResponse));
      } catch (error: any) {
        dispatch(setError({ type: 'metrics', error: error.message || t('planes:errors.metricsLoadFailed') }));
      }

    } catch (error) {
      message.error(t('planes:errors.loadDataFailed'));
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
        message.info(`${t('common:view')}: ${plane?.displayName || planeId}`);
        // TODO: 打开平面详情模态框或跳转到详情页
        break;
      case 'edit':
        navigate(`/planes/edit/${planeId}`);
        break;
      case 'add':
        message.info(`${t('common:add')}: ${plane?.displayName || planeId}`);
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
            <Title level={2}>{t('planes:title')}</Title>
            <Paragraph>
              {t('planes:subtitle')}
            </Paragraph>
          </div>
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
              {t('common:add')} {t('planes:title')}
            </Button>
          </Space>
        </div>
      </div>

      {/* 错误提示 */}
      {(error.definitions || error.topology || error.metrics) && (
        <Card style={{ marginBottom: 24, borderColor: '#ff4d4f' }}>
          <div style={{ color: '#ff4d4f' }}>
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
              <li><strong>{t('planes:operations.levelDetails.l3')}</strong>: {t('planes:operations.levelDetails.l3Desc')} <span style={{color: '#fa8c16'}}>({t('planes:operations.levelDetails.multipleDependency')})</span></li>
              <li><strong>{t('planes:operations.levelDetails.l4')}</strong>: {t('planes:operations.levelDetails.l4Desc')} <span style={{color: '#fa8c16'}}>({t('planes:operations.levelDetails.multipleDependency')})</span></li>
              <li><strong>{t('planes:operations.levelDetails.l5')}</strong>: {t('planes:operations.levelDetails.l5Desc')} <span style={{color: '#ff4d4f'}}>({t('planes:operations.levelDetails.complexDependency')})</span></li>
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
    </PlaneContainer>
  );
};

export default PlaneManagement;
