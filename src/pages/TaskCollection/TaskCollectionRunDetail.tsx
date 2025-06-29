import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Badge,
  Descriptions,
  Progress,
  message
} from 'antd';
import { 
  ReloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  NodeIndexOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { 
  DiagnosticReports, 
  LayeredTaskTopology,
  NodeDetailDrawer,
  type DiagnosticReport,
  type TaskNode,
  type Panel
} from './components';
import { loadLayeredTopologyNodes, getLayerStatistics, getLayerFullName, type LayeredTaskNode } from '../../utils/layeredTopologyUtils';
import '../../styles/task-collection-run-detail.css';

// 使用主题适配的样式组件
const LayerStatCard = styled.div.attrs({
  className: 'layer-stat-card'
})``;

const LayerTitle = styled.div.attrs({
  className: 'layer-title'
})``;

const LayerTotal = styled.div.attrs({
  className: 'layer-total'
})``;

const StatusGrid = styled.div.attrs({
  className: 'status-grid'
})``;

const StatusItem = styled.div.attrs<{ $status: string }>(props => ({
  className: `status-item ${props.$status}`
}))<{ $status: string }>``;

const StatisticsHeader = styled.div.attrs({
  className: 'statistics-header'
})``;

const StatisticsLegend = styled.div.attrs({
  className: 'statistics-legend'
})``;

const LegendItem = styled.span.attrs({
  className: 'legend-item'
})``;

const { Title, Text } = Typography;

const PageContainer = styled.div.attrs({
  className: 'task-run-detail-container'
})``;

const StatsCard = styled(Card).attrs<{ $status?: string }>(props => ({
  className: `stats-card ${props.$status || ''}`
}))<{ $status?: string }>``;

// 节点状态枚举
enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 任务集合运行实例
interface TaskCollectionRun {
  id: string;
  collectionId: string;
  collectionName: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  startTime: string;
  endTime?: string;
  duration?: number;
  totalNodes: number;
  completedNodes: number;
  failedNodes: number;
  successRate: number;
  nodes: TaskNode[];
  panels: Panel[];
  diagnosticReports: DiagnosticReport[];
  createdBy: string;
}

const TaskCollectionRunDetail: React.FC = () => {
  const { runId } = useParams<{ runId: string }>();
  const { t } = useTranslation(['taskCollectionRunDetail', 'common']);
  
  const [loading, setLoading] = useState(false);
  const [runDetail, setRunDetail] = useState<TaskCollectionRun | null>(null);
  const [selectedNode, setSelectedNode] = useState<TaskNode | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [layeredNodes, setLayeredNodes] = useState<LayeredTaskNode[]>([]);

  useEffect(() => {
    setPageTitle(t('taskCollectionRunDetail:title'));
    loadRunDetail();
  }, [runId, t]);

  // 加载分层拓扑数据
  useEffect(() => {
    const nodes = loadLayeredTopologyNodes();
    setLayeredNodes(nodes);
  }, []);

  // 自动刷新逻辑
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoRefresh && runDetail?.status === 'running') {
      interval = setInterval(() => {
        loadRunDetail();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, runDetail?.status]);

  // 模拟数据加载
  const loadRunDetail = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockRunDetail: TaskCollectionRun = {
        id: runId || '1',
        collectionId: '1',
        collectionName: t('taskCollectionRunDetail:actions.healthCheck'),
        status: 'running',
        startTime: '2024-06-24 13:00:00',
        totalNodes: 8,
        completedNodes: 5,
        failedNodes: 1,
        successRate: 75,
        createdBy: t('taskCollectionRunDetail:creator'),
        panels: [
          {
            id: 'application_layer',
            name: t('taskCollectionRunDetail:layerStats.applicationLayer'),
            level: 1,
            color: 'rgba(24, 144, 255, 0.1)',
            borderColor: '#1890ff',
            description: t('taskCollectionRunDetail:layerStats.description.applicationLayer')
          },
          {
            id: 'service_layer',
            name: t('taskCollectionRunDetail:layerStats.serviceLayer'),
            level: 2,
            color: 'rgba(82, 196, 26, 0.1)',
            borderColor: '#52c41a',
            description: t('taskCollectionRunDetail:layerStats.description.serviceLayer')
          },
          {
            id: 'data_layer',
            name: t('taskCollectionRunDetail:layerStats.dataLayer'),
            level: 3,
            color: 'rgba(250, 173, 20, 0.1)',
            borderColor: '#faad14',
            description: t('taskCollectionRunDetail:layerStats.description.dataLayer')
          }
        ],
        nodes: [
          {
            id: 'node_1',
            name: '用户服务',
            type: 'entity',
            category: '微服务',
            panel: 'service_layer',
            status: NodeStatus.COMPLETED,
            actions: ['health_check', 'performance_analysis'],
            startTime: '2024-06-24 13:00:00',
            endTime: '2024-06-24 13:02:30',
            duration: 150,
            dependencies: [],
            results: [
              {
                actionId: 'health_check',
                actionName: '健康检查',
                status: 'success',
                message: '服务运行正常，响应时间 < 100ms',
                timestamp: '2024-06-24 13:01:00'
              },
              {
                actionId: 'performance_analysis',
                actionName: '性能分析',
                status: 'success',
                message: 'CPU使用率: 45%, 内存使用率: 60%',
                timestamp: '2024-06-24 13:02:30'
              }
            ]
          },
          {
            id: 'node_2',
            name: '订单服务',
            type: 'entity',
            category: '微服务',
            panel: 'service_layer',
            status: NodeStatus.FAILED,
            actions: ['health_check', 'fault_analysis'],
            startTime: '2024-06-24 13:00:00',
            endTime: '2024-06-24 13:03:00',
            duration: 180,
            dependencies: ['node_1'],
            results: [
              {
                actionId: 'health_check',
                actionName: '健康检查',
                status: 'error',
                message: '服务响应超时，连接失败',
                timestamp: '2024-06-24 13:01:30'
              },
              {
                actionId: 'fault_analysis',
                actionName: '故障分析',
                status: 'warning',
                message: '检测到内存泄漏风险',
                timestamp: '2024-06-24 13:03:00'
              }
            ]
          },
          {
            id: 'node_3',
            name: '支付服务',
            type: 'entity',
            category: '微服务',
            panel: 'service_layer',
            status: NodeStatus.RUNNING,
            actions: ['health_check', 'security_scan'],
            startTime: '2024-06-24 13:02:00',
            dependencies: ['node_1']
          },
          {
            id: 'node_4',
            name: '用户登录流程',
            type: 'sequence',
            category: '认证时序',
            panel: 'application_layer',
            status: NodeStatus.COMPLETED,
            actions: ['health_check'],
            startTime: '2024-06-24 13:00:30',
            endTime: '2024-06-24 13:01:45',
            duration: 75,
            dependencies: [],
            results: [
              {
                actionId: 'health_check',
                actionName: '健康检查',
                status: 'success',
                message: '登录流程正常，平均响应时间 2.3s',
                timestamp: '2024-06-24 13:01:45'
              }
            ]
          },
          {
            id: 'node_5',
            name: '订单创建流程',
            type: 'sequence',
            category: '业务时序',
            panel: 'application_layer',
            status: NodeStatus.COMPLETED,
            actions: ['health_check', 'performance_analysis'],
            startTime: '2024-06-24 13:01:00',
            endTime: '2024-06-24 13:03:30',
            duration: 150,
            dependencies: ['node_1', 'node_2'],
            results: [
              {
                actionId: 'health_check',
                actionName: '健康检查',
                status: 'warning',
                message: '流程执行成功，但响应时间较慢',
                timestamp: '2024-06-24 13:02:15'
              },
              {
                actionId: 'performance_analysis',
                actionName: '性能分析',
                status: 'success',
                message: '平均处理时间: 3.2s，成功率: 98%',
                timestamp: '2024-06-24 13:03:30'
              }
            ]
          },
          {
            id: 'node_6',
            name: '数据库连接池',
            type: 'entity',
            category: '数据库',
            panel: 'data_layer',
            status: NodeStatus.PENDING,
            actions: ['health_check'],
            dependencies: ['node_3']
          },
          {
            id: 'node_7',
            name: '缓存集群',
            type: 'entity',
            category: '缓存',
            panel: 'data_layer',
            status: NodeStatus.PENDING,
            actions: ['health_check', 'performance_analysis'],
            dependencies: ['node_3']
          },
          {
            id: 'node_8',
            name: '支付流程',
            type: 'sequence',
            category: '支付时序',
            panel: 'application_layer',
            status: NodeStatus.PENDING,
            actions: ['health_check', 'security_scan'],
            dependencies: ['node_3', 'node_6']
          }
        ],
        diagnosticReports: [
          {
            nodeId: 'node_1',
            nodeName: '用户服务',
            nodeType: 'entity',
            status: NodeStatus.COMPLETED,
            summary: {
              totalChecks: 2,
              passedChecks: 2,
              warningChecks: 0,
              failedChecks: 0
            },
            checks: [
              {
                id: 'health_check',
                name: '健康检查',
                status: 'success',
                message: '服务运行正常，响应时间 < 100ms',
                timestamp: '2024-06-24 13:01:00',
                duration: 60
              },
              {
                id: 'performance_analysis',
                name: '性能分析',
                status: 'success',
                message: 'CPU使用率: 45%, 内存使用率: 60%',
                timestamp: '2024-06-24 13:02:30',
                duration: 90
              }
            ],
            recommendations: ['继续保持当前配置', '建议定期清理日志文件']
          },
          {
            nodeId: 'node_2',
            nodeName: '订单服务',
            nodeType: 'entity',
            status: NodeStatus.FAILED,
            summary: {
              totalChecks: 2,
              passedChecks: 0,
              warningChecks: 1,
              failedChecks: 1
            },
            checks: [
              {
                id: 'health_check',
                name: '健康检查',
                status: 'error',
                message: '服务响应超时，连接失败',
                timestamp: '2024-06-24 13:01:30',
                duration: 30
              },
              {
                id: 'fault_analysis',
                name: '故障分析',
                status: 'warning',
                message: '检测到内存泄漏风险',
                timestamp: '2024-06-24 13:03:00',
                duration: 150
              }
            ],
            recommendations: [
              '立即重启服务实例',
              '检查网络连接配置',
              '增加内存监控告警',
              '优化内存使用策略'
            ]
          },
          {
            nodeId: 'node_4',
            nodeName: '用户登录流程',
            nodeType: 'sequence',
            status: NodeStatus.COMPLETED,
            summary: {
              totalChecks: 1,
              passedChecks: 1,
              warningChecks: 0,
              failedChecks: 0
            },
            checks: [
              {
                id: 'health_check',
                name: '健康检查',
                status: 'success',
                message: '登录流程正常，平均响应时间 2.3s',
                timestamp: '2024-06-24 13:01:45',
                duration: 75
              }
            ],
            recommendations: ['流程运行正常，无需调整']
          },
          {
            nodeId: 'node_5',
            nodeName: '订单创建流程',
            nodeType: 'sequence',
            status: NodeStatus.COMPLETED,
            summary: {
              totalChecks: 2,
              passedChecks: 1,
              warningChecks: 1,
              failedChecks: 0
            },
            checks: [
              {
                id: 'health_check',
                name: '健康检查',
                status: 'warning',
                message: '流程执行成功，但响应时间较慢',
                timestamp: '2024-06-24 13:02:15',
                duration: 135
              },
              {
                id: 'performance_analysis',
                name: '性能分析',
                status: 'success',
                message: '平均处理时间: 3.2s，成功率: 98%',
                timestamp: '2024-06-24 13:03:30',
                duration: 15
              }
            ],
            recommendations: [
              '优化数据库查询性能',
              '考虑增加缓存机制',
              '监控第三方API响应时间'
            ]
          }
        ]
      };
      
      setRunDetail(mockRunDetail);
    } catch (error) {
      message.error('加载运行详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理节点点击
  const handleNodeClick = (node: TaskNode) => {
    setSelectedNode(node);
    setDrawerVisible(true);
  };

  // 处理分层节点点击
  const handleLayeredNodeClick = (node: LayeredTaskNode) => {
    // 转换为TaskNode格式以兼容现有的抽屉组件
    const taskNode: TaskNode = {
      ...node,
      panel: node.layer // 将layer映射为panel
    };
    setSelectedNode(taskNode);
    setDrawerVisible(true);
  };

  return (
    <PageContainer>
      {/* 面包屑导航 */}
      <Breadcrumb
        items={[
          {
            title: t('taskCollectionRunDetail:breadcrumb.home'),
            path: '/dashboard',
            icon: <HomeOutlined />
          },
          {
            title: t('taskCollectionRunDetail:breadcrumb.taskCollections'),
            path: '/task-management/task-collections',
            icon: <UnorderedListOutlined />
          },
          {
            title: `${runDetail?.collectionName || t('taskCollectionRunDetail:breadcrumb.runDetail')}`,
            icon: <FileTextOutlined />
          }
        ]}
      />

      {/* 页面标题和操作 */}
      <div className="page-header">
        <div className="page-title-section">
          <Title level={2}>
            {runDetail?.collectionName} - {t('taskCollectionRunDetail:header.runDetail')}
          </Title>
          <div className="page-status-section">
            <Space>
              <Badge 
                status={runDetail?.status === 'running' ? 'processing' : 'success'} 
                text={runDetail?.status === 'running' ? t('taskCollectionRunDetail:runStatus.running') : t('taskCollectionRunDetail:runStatus.completed')} 
              />
              <Text type="secondary">{t('taskCollectionRunDetail:header.runId')}: {runId}</Text>
            </Space>
          </div>
        </div>
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={loadRunDetail}
            loading={loading}
          >
            {t('taskCollectionRunDetail:header.refresh')}
          </Button>
          <Button 
            type={autoRefresh ? 'primary' : 'default'}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? t('taskCollectionRunDetail:header.stopAutoRefresh') : t('taskCollectionRunDetail:header.autoRefresh')}
          </Button>
        </Space>
      </div>

      {runDetail && (
        <>
          {/* 统计信息 */}
          <Row gutter={[16, 16]} className="stats-row">
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <StatsCard $status="total">
                <Statistic
                  title={t('taskCollectionRunDetail:statistics.totalNodes')}
                  value={runDetail.totalNodes}
                  prefix={<NodeIndexOutlined />}
                />
              </StatsCard>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <StatsCard $status="completed">
                <Statistic
                  title={t('taskCollectionRunDetail:statistics.completedNodes')}
                  value={runDetail.completedNodes}
                  prefix={<CheckCircleOutlined className="status-completed" />}
                />
              </StatsCard>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <StatsCard $status="failed">
                <Statistic
                  title={t('taskCollectionRunDetail:statistics.failedNodes')}
                  value={runDetail.failedNodes}
                  prefix={<ExclamationCircleOutlined className="status-failed" />}
                />
              </StatsCard>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <StatsCard $status={runDetail.successRate > 80 ? 'completed' : 'pending'}>
                <Statistic
                  title={t('taskCollectionRunDetail:statistics.successRate')}
                  value={runDetail.successRate}
                  suffix="%"
                  prefix={<CheckCircleOutlined className={runDetail.successRate > 80 ? 'status-completed' : 'status-pending'} />}
                />
              </StatsCard>
            </Col>
          </Row>

          {/* 分层统计信息 */}
          <Card 
            title={
              <StatisticsHeader>
                <span>{t('taskCollectionRunDetail:statistics.layeredStatistics')}</span>
                <StatisticsLegend>
                  <LegendItem>
                    <span className="legend-completed">✓</span> {t('taskCollectionRunDetail:legend.completed')}
                  </LegendItem>
                  <LegendItem>
                    <span className="legend-running">●</span> {t('taskCollectionRunDetail:legend.running')}
                  </LegendItem>
                  <LegendItem>
                    <span className="legend-failed">✗</span> {t('taskCollectionRunDetail:legend.failed')}
                  </LegendItem>
                  <LegendItem>
                    <span className="legend-pending">○</span> {t('taskCollectionRunDetail:legend.pending')}
                  </LegendItem>
                </StatisticsLegend>
              </StatisticsHeader>
            }
            className="card-with-margin"
          >
            <Row gutter={[16, 16]}>
              {Object.entries(getLayerStatistics(layeredNodes)).map(([layer, stats]) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={layer}>
                  <LayerStatCard>
                    <LayerTitle>
                      {getLayerFullName(layer)}
                    </LayerTitle>
                    <LayerTotal>
                        总计: {stats.total}
                    </LayerTotal>
                    <StatusGrid>
                      <StatusItem 
                        $status="completed"
                        title={t('taskCollectionRunDetail:legend.completed')}
                      >
                          ✓ {stats.completed}
                      </StatusItem>
                      <StatusItem 
                        $status="running"
                        title={t('taskCollectionRunDetail:legend.running')}
                      >
                          ● {stats.running}
                      </StatusItem>
                      <StatusItem 
                        $status="failed"
                        title={t('taskCollectionRunDetail:legend.failed')}
                      >
                          ✗ {stats.failed}
                      </StatusItem>
                      <StatusItem 
                        $status="pending"
                        title={t('taskCollectionRunDetail:legend.pending')}
                      >
                          ○ {stats.pending}
                      </StatusItem>
                    </StatusGrid>
                  </LayerStatCard>
                </Col>
              ))}
            </Row>
          </Card>

          {/* 基本信息 */}
          <Card title={t('taskCollectionRunDetail:header.runDetail')} className="card-with-margin">
            <Descriptions column={3}>
              <Descriptions.Item label={t('taskCollectionRunDetail:time.startTime')}>
                {runDetail.startTime}
              </Descriptions.Item>
              <Descriptions.Item label={t('taskCollectionRunDetail:time.endTime')}>
                {runDetail.endTime || t('taskCollectionRunDetail:runStatus.running') + '...'}
              </Descriptions.Item>
              <Descriptions.Item label={t('taskCollectionRunDetail:time.duration')}>
                {runDetail.duration ? `${runDetail.duration}${t('common:unit.seconds')}` : t('common:loading')}
              </Descriptions.Item>
              <Descriptions.Item label={t('taskCollectionRunDetail:creator')}>
                {runDetail.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('taskCollectionRunDetail:runStatus.title')}>
                <Badge 
                  status={runDetail.status === 'running' ? 'processing' : 'success'} 
                  text={runDetail.status === 'running' ? t('taskCollectionRunDetail:runStatus.running') : t('taskCollectionRunDetail:runStatus.completed')} 
                />
              </Descriptions.Item>
              <Descriptions.Item label={t('common:progress')}>
                <Progress 
                  percent={Math.round((runDetail.completedNodes / runDetail.totalNodes) * 100)}
                  size="small"
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 诊断报告清单 */}
          <Card title={t('taskCollectionRunDetail:diagnosticReports.title')} className="card-with-margin">
            <DiagnosticReports nodeIds={runDetail.nodes.map(node => node.id)} />
          </Card>

          {/* 拓扑图 */}
          <Card 
            title={t('taskCollectionRunDetail:topology.title')} 
            className="card-with-margin"
          >
            <LayeredTaskTopology 
              nodes={layeredNodes}
              onNodeClick={handleLayeredNodeClick}
            />
          </Card>

          {/* 节点详情抽屉 */}
          <NodeDetailDrawer
            visible={drawerVisible}
            node={selectedNode}
            panels={runDetail.panels}
            allNodes={runDetail.nodes}
            onClose={() => setDrawerVisible(false)}
          />
        </>
      )}
    </PageContainer>
  );
};

export default TaskCollectionRunDetail;
