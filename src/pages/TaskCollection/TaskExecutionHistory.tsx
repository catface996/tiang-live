import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col,
  Calendar,
  Badge,
  Tag,
  Modal,
  Descriptions,
  Timeline,
  Select,
  Tooltip,
  Alert,
  Divider
} from 'antd';
import { 
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  ScheduleOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { setPageTitle } from '../../utils';

const { Title, Text } = Typography;
const { Option } = Select;

const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const CalendarContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ExecutionBadge = styled(Badge)`
  .ant-badge-dot {
    width: 8px;
    height: 8px;
  }
`;

const ExecutionCard = styled(Card)`
  margin-bottom: 8px;
  border-radius: 6px;
  
  &.completed {
    border-left: 4px solid #52c41a;
  }
  
  &.running {
    border-left: 4px solid #1890ff;
  }
  
  &.scheduled {
    border-left: 4px solid #faad14;
  }
  
  &.failed {
    border-left: 4px solid #ff4d4f;
  }
`;

// 执行记录类型定义
interface ExecutionRecord {
  id: string;
  taskCollectionId: string;
  taskCollectionName: string;
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  triggerType: 'cron' | 'hook';
  triggerSource?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  executedTargets: number;
  totalTargets: number;
  successRate: number;
  details?: {
    targets: Array<{
      id: string;
      name: string;
      type: 'entity' | 'sequence';
      status: 'success' | 'failed' | 'running';
      actions: Array<{
        id: string;
        name: string;
        status: 'success' | 'failed' | 'running';
        duration?: number;
      }>;
    }>;
  };
}

// 模拟执行历史数据
const mockExecutionHistory: ExecutionRecord[] = [
  {
    id: 'exec_001',
    taskCollectionId: 'task_001',
    taskCollectionName: '核心业务系统健康检查',
    status: 'completed',
    triggerType: 'cron',
    startTime: '2025-06-25 09:00:00',
    endTime: '2025-06-25 09:15:30',
    duration: 930,
    executedTargets: 8,
    totalTargets: 8,
    successRate: 100,
    details: {
      targets: [
        {
          id: 'entity_001',
          name: '用户管理系统',
          type: 'entity',
          status: 'success',
          actions: [
            { id: 'health_check', name: '健康检查', status: 'success', duration: 120 },
            { id: 'performance_analysis', name: '性能分析', status: 'success', duration: 180 }
          ]
        }
      ]
    }
  },
  {
    id: 'exec_002',
    taskCollectionId: 'task_001',
    taskCollectionName: '核心业务系统健康检查',
    status: 'running',
    triggerType: 'hook',
    triggerSource: 'API调用',
    startTime: '2025-06-25 14:30:00',
    executedTargets: 3,
    totalTargets: 8,
    successRate: 75
  },
  {
    id: 'exec_003',
    taskCollectionId: 'task_002',
    taskCollectionName: '数据库性能监控',
    status: 'scheduled',
    triggerType: 'cron',
    startTime: '2025-06-25 18:00:00',
    executedTargets: 0,
    totalTargets: 5,
    successRate: 0
  },
  {
    id: 'exec_004',
    taskCollectionId: 'task_001',
    taskCollectionName: '核心业务系统健康检查',
    status: 'failed',
    triggerType: 'cron',
    startTime: '2025-06-24 15:00:00',
    endTime: '2025-06-24 15:08:45',
    duration: 525,
    executedTargets: 5,
    totalTargets: 8,
    successRate: 62.5
  },
  {
    id: 'exec_005',
    taskCollectionId: 'task_003',
    taskCollectionName: '安全扫描任务',
    status: 'completed',
    triggerType: 'hook',
    triggerSource: 'Webhook触发',
    startTime: '2025-06-24 10:30:00',
    endTime: '2025-06-24 11:45:20',
    duration: 4520,
    executedTargets: 12,
    totalTargets: 12,
    successRate: 100
  },
  {
    id: 'exec_006',
    taskCollectionId: 'task_002',
    taskCollectionName: '数据库性能监控',
    status: 'completed',
    triggerType: 'cron',
    startTime: '2025-06-23 18:00:00',
    endTime: '2025-06-23 18:25:15',
    duration: 1515,
    executedTargets: 5,
    totalTargets: 5,
    successRate: 100
  }
];

const TaskExecutionHistory: React.FC = () => {
  const { t } = useTranslation();
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedExecution, setSelectedExecution] = useState<ExecutionRecord | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>([]);

  useEffect(() => {
    setPageTitle('任务执行历史记录');
    // 根据taskId过滤执行记录
    const filteredHistory = taskId 
      ? mockExecutionHistory.filter(record => record.taskCollectionId === taskId)
      : mockExecutionHistory;
    setExecutionHistory(filteredHistory);
  }, [taskId]);

  // 获取指定日期的执行记录
  const getExecutionsForDate = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    return executionHistory.filter(record => 
      dayjs(record.startTime).format('YYYY-MM-DD') === dateStr
    );
  };

  // 渲染日历单元格内容
  const dateCellRender = (date: Dayjs) => {
    const executions = getExecutionsForDate(date);
    if (executions.length === 0) return null;

    return (
      <div style={{ fontSize: '12px' }}>
        {executions.map(execution => (
          <ExecutionBadge
            key={execution.id}
            status={getExecutionBadgeStatus(execution.status)}
            text={
              <span style={{ fontSize: '10px', cursor: 'pointer' }}>
                {execution.taskCollectionName.length > 8 
                  ? execution.taskCollectionName.substring(0, 8) + '...'
                  : execution.taskCollectionName
                }
              </span>
            }
            onClick={(e) => {
              e.stopPropagation();
              handleViewExecutionDetail(execution);
            }}
          />
        ))}
      </div>
    );
  };

  // 获取执行状态对应的Badge状态
  const getExecutionBadgeStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'running': return 'processing';
      case 'scheduled': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  // 获取执行状态图标
  const getExecutionIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'running': return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
      case 'scheduled': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'failed': return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default: return <ClockCircleOutlined />;
    }
  };

  // 获取触发类型图标和文本
  const getTriggerInfo = (triggerType: string, triggerSource?: string) => {
    if (triggerType === 'cron') {
      return {
        icon: <ScheduleOutlined style={{ color: '#1890ff' }} />,
        text: '定时任务触发',
        color: 'blue'
      };
    } else {
      return {
        icon: <ApiOutlined style={{ color: '#52c41a' }} />,
        text: triggerSource || 'Hook触发',
        color: 'green'
      };
    }
  };

  // 查看执行详情
  const handleViewExecutionDetail = (execution: ExecutionRecord) => {
    setSelectedExecution(execution);
    setDetailModalVisible(true);
  };

  // 格式化持续时间
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
    return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分`;
  };

  // 渲染日期选择的执行记录列表
  const renderExecutionList = (date: Dayjs) => {
    const executions = getExecutionsForDate(date);
    if (executions.length === 0) {
      return (
        <Alert
          message="该日期无执行记录"
          type="info"
          showIcon
          style={{ margin: '16px 0' }}
        />
      );
    }

    return (
      <div style={{ margin: '16px 0' }}>
        <Title level={5}>
          {date.format('YYYY年MM月DD日')} 执行记录 ({executions.length}条)
        </Title>
        {executions.map(execution => {
          const triggerInfo = getTriggerInfo(execution.triggerType, execution.triggerSource);
          
          return (
            <ExecutionCard
              key={execution.id}
              className={execution.status}
              size="small"
              hoverable
              onClick={() => handleViewExecutionDetail(execution)}
            >
              <Row align="middle" justify="space-between">
                <Col flex="auto">
                  <Space direction="vertical" size={4}>
                    <Space>
                      {getExecutionIcon(execution.status)}
                      <Text strong>{execution.taskCollectionName}</Text>
                      <Tag color={triggerInfo.color} icon={triggerInfo.icon}>
                        {triggerInfo.text}
                      </Tag>
                    </Space>
                    <Space size={16}>
                      <Text type="secondary">
                        <ClockCircleOutlined /> {dayjs(execution.startTime).format('HH:mm:ss')}
                      </Text>
                      {execution.duration && (
                        <Text type="secondary">
                          <HistoryOutlined /> {formatDuration(execution.duration)}
                        </Text>
                      )}
                      <Text type="secondary">
                        成功率: {execution.successRate}%
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col>
                  <Tag color={getExecutionBadgeStatus(execution.status)}>
                    {execution.status === 'completed' && '已完成'}
                    {execution.status === 'running' && '执行中'}
                    {execution.status === 'scheduled' && '计划中'}
                    {execution.status === 'failed' && '失败'}
                  </Tag>
                </Col>
              </Row>
            </ExecutionCard>
          );
        })}
      </div>
    );
  };

  return (
    <PageContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/task-collections')}
          >
            返回任务集合
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            任务执行历史记录
          </Title>
        </Space>
      </div>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {executionHistory.length}
              </div>
              <div style={{ color: '#666' }}>总执行次数</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                {executionHistory.filter(e => e.status === 'completed').length}
              </div>
              <div style={{ color: '#666' }}>成功执行</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {executionHistory.filter(e => e.status === 'running').length}
              </div>
              <div style={{ color: '#666' }}>正在执行</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#faad14' }}>
                {executionHistory.filter(e => e.status === 'scheduled').length}
              </div>
              <div style={{ color: '#666' }}>计划执行</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 日历视图 */}
      <CalendarContainer>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>执行历史日历</Title>
          <Select
            value={viewMode}
            onChange={setViewMode}
            style={{ width: 120 }}
          >
            <Option value="week">本周视图</Option>
            <Option value="month">月视图</Option>
          </Select>
        </div>
        
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
          dateCellRender={dateCellRender}
          mode={viewMode === 'week' ? undefined : 'month'}
        />
        
        {/* 选中日期的执行记录 */}
        {renderExecutionList(selectedDate)}
      </CalendarContainer>

      {/* 执行详情弹窗 */}
      <Modal
        title={
          <Space>
            <ThunderboltOutlined />
            执行详情
          </Space>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedExecution && (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="任务集合">
                {selectedExecution.taskCollectionName}
              </Descriptions.Item>
              <Descriptions.Item label="执行状态">
                <Space>
                  {getExecutionIcon(selectedExecution.status)}
                  <Tag color={getExecutionBadgeStatus(selectedExecution.status)}>
                    {selectedExecution.status === 'completed' && '已完成'}
                    {selectedExecution.status === 'running' && '执行中'}
                    {selectedExecution.status === 'scheduled' && '计划中'}
                    {selectedExecution.status === 'failed' && '失败'}
                  </Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="触发方式">
                {(() => {
                  const triggerInfo = getTriggerInfo(selectedExecution.triggerType, selectedExecution.triggerSource);
                  return (
                    <Tag color={triggerInfo.color} icon={triggerInfo.icon}>
                      {triggerInfo.text}
                    </Tag>
                  );
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="开始时间">
                {dayjs(selectedExecution.startTime).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              {selectedExecution.endTime && (
                <Descriptions.Item label="结束时间">
                  {dayjs(selectedExecution.endTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
              )}
              {selectedExecution.duration && (
                <Descriptions.Item label="执行时长">
                  {formatDuration(selectedExecution.duration)}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="执行进度">
                {selectedExecution.executedTargets} / {selectedExecution.totalTargets}
              </Descriptions.Item>
              <Descriptions.Item label="成功率">
                <Text style={{ color: selectedExecution.successRate >= 80 ? '#52c41a' : '#ff4d4f' }}>
                  {selectedExecution.successRate}%
                </Text>
              </Descriptions.Item>
            </Descriptions>

            {selectedExecution.details && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>执行详情</Title>
                <Timeline>
                  {selectedExecution.details.targets.map(target => (
                    <Timeline.Item
                      key={target.id}
                      dot={target.status === 'success' ? 
                        <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                        target.status === 'failed' ?
                        <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} /> :
                        <PlayCircleOutlined style={{ color: '#1890ff' }} />
                      }
                    >
                      <div>
                        <Text strong>{target.name}</Text>
                        <Tag style={{ marginLeft: 8 }}>
                          {target.type === 'entity' ? '实体' : '时序'}
                        </Tag>
                        <div style={{ marginTop: 8 }}>
                          {target.actions.map(action => (
                            <Tag
                              key={action.id}
                              color={action.status === 'success' ? 'green' : 
                                     action.status === 'failed' ? 'red' : 'blue'}
                              style={{ marginBottom: 4 }}
                            >
                              {action.name}
                              {action.duration && ` (${action.duration}s)`}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            )}
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default TaskExecutionHistory;
