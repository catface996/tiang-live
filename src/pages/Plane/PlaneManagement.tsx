import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, message } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
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
import { PlaneTopology, PlaneStats } from '../../components/Plane';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PlaneContainer = styled.div`
  padding: 24px;
`;

const PlaneManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    definitions: planes, 
    topology, 
    metrics,
    loading,
    error 
  } = useAppSelector(state => state.plane);

  useEffect(() => {
    setPageTitle('平面管理');
    loadPlaneData();
  }, []);

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
        message.info(`查看平面: ${plane?.displayName || planeId}`);
        // TODO: 打开平面详情模态框或跳转到详情页
        break;
      case 'edit':
        message.info(`编辑平面: ${plane?.displayName || planeId}`);
        // TODO: 打开平面编辑模态框
        break;
      case 'add':
        message.info(`添加实例到平面: ${plane?.displayName || planeId}`);
        // TODO: 打开添加实例模态框
        break;
      default:
        break;
    }
  };

  const handleCreatePlane = () => {
    message.info('创建新平面');
    // TODO: 打开创建平面模态框
  };

  return (
    <PlaneContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2}>平面管理</Title>
            <Paragraph>
              管理系统中的各个平面层级，每个平面代表不同的抽象层次，从业务场景到基础设施形成完整的依赖关系。
            </Paragraph>
          </div>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              loading={loading.definitions || loading.topology || loading.metrics}
            >
              刷新
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleCreatePlane}
            >
              创建平面
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

      {/* 操作说明 */}
      <Card title="操作说明" style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={4}>平面层级说明</Title>
            <ul>
              <li><strong>L1 - 基础设施平面</strong>: 底层资源和基础设施，提供计算、存储、网络等基础能力</li>
              <li><strong>L2 - 中间件平面</strong>: 提供基础服务和组件支撑，如数据库、消息队列等</li>
              <li><strong>L3 - 业务系统平面</strong>: 包含各个业务应用和服务系统</li>
              <li><strong>L4 - 业务链路平面</strong>: 定义业务流程和执行路径</li>
              <li><strong>L5 - 业务场景平面</strong>: 最顶层，定义业务场景和用例</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>可用操作</Title>
            <ul>
              <li><strong>查看详情</strong>: 查看平面的详细信息和配置</li>
              <li><strong>编辑配置</strong>: 修改平面的配置和参数</li>
              <li><strong>添加实例</strong>: 在该平面中创建新的实例</li>
              <li><strong>创建平面</strong>: 创建新的平面定义</li>
              <li><strong>刷新数据</strong>: 重新加载最新的平面数据</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </PlaneContainer>
  );
};

export default PlaneManagement;
