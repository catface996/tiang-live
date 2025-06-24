import React from 'react';
import {
  Drawer,
  Card,
  Descriptions,
  Tag,
  Badge,
  Space,
  Timeline,
  Typography
} from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  BarChartOutlined,
  BugOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { TaskNode, Panel } from './TaskTopology';

const { Text } = Typography;

// 节点状态枚举
enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 任务结果接口
interface TaskResult {
  actionId: string;
  actionName: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
  timestamp: string;
}

interface NodeDetailDrawerProps {
  visible: boolean;
  node: TaskNode | null;
  panels: Panel[];
  allNodes: TaskNode[];
  onClose: () => void;
}

const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  visible,
  node,
  panels,
  allNodes,
  onClose
}) => {
  // 获取结果状态图标
  const getResultIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  // 获取检查动作图标
  const getActionIcon = (actionId: string) => {
    switch (actionId) {
      case 'health_check':
        return <HeartOutlined style={{ color: '#52c41a' }} />;
      case 'performance_analysis':
        return <BarChartOutlined style={{ color: '#1890ff' }} />;
      case 'fault_analysis':
        return <BugOutlined style={{ color: '#ff4d4f' }} />;
      case 'security_scan':
        return <SafetyCertificateOutlined style={{ color: '#faad14' }} />;
      default:
        return <FileTextOutlined style={{ color: '#666' }} />;
    }
  };

  if (!node) return null;

  return (
    <Drawer
      title={`${node.name} - 详细信息`}
      placement="right"
      width={600}
      open={visible}
      onClose={onClose}
    >
      <div>
        {/* 节点基本信息 */}
        <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="节点名称">
              {node.name}
            </Descriptions.Item>
            <Descriptions.Item label="节点类型">
              <Tag color={node.type === 'entity' ? 'blue' : 'green'}>
                {node.type === 'entity' ? '实体' : '时序'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {node.category}
            </Descriptions.Item>
            <Descriptions.Item label="所属面板">
              <Tag color="purple">
                {panels.find(p => p.id === node.panel)?.name}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="执行状态">
              <Badge 
                status={
                  node.status === NodeStatus.COMPLETED ? 'success' :
                  node.status === NodeStatus.RUNNING ? 'processing' :
                  node.status === NodeStatus.FAILED ? 'error' : 'default'
                }
                text={
                  node.status === NodeStatus.COMPLETED ? '已完成' :
                  node.status === NodeStatus.RUNNING ? '运行中' :
                  node.status === NodeStatus.FAILED ? '失败' :
                  node.status === NodeStatus.PENDING ? '等待中' : '未知'
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {node.startTime || '未开始'}
            </Descriptions.Item>
            <Descriptions.Item label="结束时间">
              {node.endTime || '未结束'}
            </Descriptions.Item>
            <Descriptions.Item label="执行时长">
              {node.duration ? `${node.duration}秒` : '未完成'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 检查动作 */}
        <Card title="检查动作" size="small" style={{ marginBottom: 16 }}>
          <Space wrap>
            {node.actions.map(actionId => (
              <Tag key={actionId} color="blue" icon={getActionIcon(actionId)}>
                {actionId === 'health_check' ? '健康检查' :
                 actionId === 'performance_analysis' ? '性能分析' :
                 actionId === 'fault_analysis' ? '故障分析' :
                 actionId === 'security_scan' ? '安全扫描' : actionId}
              </Tag>
            ))}
          </Space>
        </Card>

        {/* 执行结果 */}
        {node.results && node.results.length > 0 && (
          <Card title="执行结果" size="small">
            <Timeline>
              {node.results.map((result: TaskResult, index: number) => (
                <Timeline.Item
                  key={index}
                  dot={getResultIcon(result.status)}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      {result.actionName}
                    </div>
                    <div style={{ color: '#666', marginBottom: 4 }}>
                      {result.message}
                    </div>
                    <div style={{ fontSize: 12, color: '#999' }}>
                      {result.timestamp}
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        )}

        {/* 依赖关系 */}
        {node.dependencies && node.dependencies.length > 0 && (
          <Card title="依赖节点" size="small" style={{ marginTop: 16 }}>
            <Space wrap>
              {node.dependencies.map(depId => {
                const depNode = allNodes.find(n => n.id === depId);
                return (
                  <Tag 
                    key={depId} 
                    color={depNode?.status === NodeStatus.COMPLETED ? 'green' : 'default'}
                  >
                    {depNode?.name || depId}
                  </Tag>
                );
              })}
            </Space>
          </Card>
        )}
      </div>
    </Drawer>
  );
};

export default NodeDetailDrawer;
