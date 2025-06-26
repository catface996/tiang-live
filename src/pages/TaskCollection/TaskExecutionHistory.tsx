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
  Divider,
  Breadcrumb
} from 'antd';
import { 
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ScheduleOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  HistoryOutlined,
  UnorderedListOutlined
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

// 生成全年12个月的模拟执行历史数据
const generateYearlyExecutionHistory = (): ExecutionRecord[] => {
  const records: ExecutionRecord[] = [];
  const currentYear = dayjs().year();
  
  // 任务集合模板
  const taskTemplates = [
    { id: 'task_001', name: '核心业务系统健康检查' },
    { id: 'task_002', name: '数据库性能监控' },
    { id: 'task_003', name: '安全扫描任务' },
    { id: 'task_004', name: '网络安全巡检' },
    { id: 'task_005', name: '备份验证任务' },
    { id: 'task_006', name: '日志分析任务' },
    { id: 'task_007', name: '容器健康检查' },
    { id: 'task_008', name: 'API接口监控' }
  ];

  const statuses: Array<'completed' | 'running' | 'scheduled' | 'failed'> = ['completed', 'running', 'scheduled', 'failed'];
  const triggerTypes: Array<'cron' | 'hook'> = ['cron', 'hook'];
  const triggerSources = ['API调用', 'Webhook触发', '监控告警触发', '手动触发'];

  let recordId = 1;

  // 为每个月生成数据
  for (let month = 0; month < 12; month++) {
    // 每个月生成8-15条记录
    const recordsPerMonth = Math.floor(Math.random() * 8) + 8;
    
    for (let i = 0; i < recordsPerMonth; i++) {
      const task = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const triggerType = triggerTypes[Math.floor(Math.random() * triggerTypes.length)];
      
      // 随机选择月份中的某一天
      const day = Math.floor(Math.random() * 28) + 1; // 1-28确保所有月份都有效
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      
      const startTime = dayjs().year(currentYear).month(month).date(day).hour(hour).minute(minute).second(0);
      
      // 根据状态生成不同的数据
      let endTime: string | undefined;
      let duration: number | undefined;
      let executedTargets = Math.floor(Math.random() * 8) + 1;
      let totalTargets = Math.floor(Math.random() * 4) + executedTargets;
      let successRate = Math.floor(Math.random() * 40) + 60; // 60-100%

      if (status === 'completed') {
        duration = Math.floor(Math.random() * 3600) + 300; // 5分钟到1小时
        endTime = startTime.add(duration, 'second').format('YYYY-MM-DD HH:mm:ss');
        successRate = Math.floor(Math.random() * 30) + 70; // 70-100%
      } else if (status === 'failed') {
        duration = Math.floor(Math.random() * 1800) + 180; // 3分钟到30分钟
        endTime = startTime.add(duration, 'second').format('YYYY-MM-DD HH:mm:ss');
        successRate = Math.floor(Math.random() * 50) + 10; // 10-60%
        executedTargets = Math.floor(totalTargets * 0.3); // 只执行了30%
      } else if (status === 'running') {
        // 正在执行的任务，只有当前月份才有
        if (month !== dayjs().month()) continue;
        executedTargets = Math.floor(totalTargets * 0.6); // 执行了60%
        successRate = Math.floor(Math.random() * 20) + 70; // 70-90%
      } else if (status === 'scheduled') {
        // 计划任务，只在未来时间
        if (startTime.isBefore(dayjs())) continue;
        executedTargets = 0;
        successRate = 0;
      }

      const record: ExecutionRecord = {
        id: `exec_${String(recordId).padStart(3, '0')}`,
        taskCollectionId: task.id,
        taskCollectionName: task.name,
        status,
        triggerType,
        triggerSource: triggerType === 'hook' ? triggerSources[Math.floor(Math.random() * triggerSources.length)] : undefined,
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime,
        duration,
        executedTargets,
        totalTargets,
        successRate,
        details: status === 'completed' ? {
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
        } : undefined
      };

      records.push(record);
      recordId++;
    }
  }

  // 添加一些今天的特定记录确保能看到
  const today = dayjs();
  
  // 今天已完成的任务
  records.push({
    id: `exec_today_001`,
    taskCollectionId: 'task_001',
    taskCollectionName: '核心业务系统健康检查',
    status: 'completed',
    triggerType: 'cron',
    startTime: today.hour(9).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    endTime: today.hour(9).minute(15).format('YYYY-MM-DD HH:mm:ss'),
    duration: 900,
    executedTargets: 8,
    totalTargets: 8,
    successRate: 100
  });

  // 今天正在执行的任务
  records.push({
    id: `exec_today_002`,
    taskCollectionId: 'task_002',
    taskCollectionName: '数据库性能监控',
    status: 'running',
    triggerType: 'hook',
    triggerSource: 'API调用',
    startTime: today.hour(14).minute(30).format('YYYY-MM-DD HH:mm:ss'),
    executedTargets: 3,
    totalTargets: 5,
    successRate: 80
  });

  // 明天的计划任务
  records.push({
    id: `exec_tomorrow_001`,
    taskCollectionId: 'task_003',
    taskCollectionName: '安全扫描任务',
    status: 'scheduled',
    triggerType: 'cron',
    startTime: today.add(1, 'day').hour(18).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    executedTargets: 0,
    totalTargets: 6,
    successRate: 0
  });

  return records.sort((a, b) => dayjs(b.startTime).unix() - dayjs(a.startTime).unix());
};

// 生成模拟执行历史数据
const mockExecutionHistory: ExecutionRecord[] = generateYearlyExecutionHistory();

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
    const filtered = executionHistory.filter(record => {
      const recordDate = dayjs(record.startTime).format('YYYY-MM-DD');
      return recordDate === dateStr;
    });
    
    // 调试信息
    if (dateStr === dayjs().format('YYYY-MM-DD')) {
      console.log('今天的日期:', dateStr);
      console.log('执行历史总数:', executionHistory.length);
      console.log('今天的执行记录:', filtered);
      console.log('所有记录的日期:', executionHistory.map(r => dayjs(r.startTime).format('YYYY-MM-DD')));
    }
    
    return filtered;
  };

  // 渲染日历单元格内容 - 简化版本
  const dateCellRender = (current: Dayjs) => {
    const executions = getExecutionsForDate(current);
    if (executions.length === 0) return null;

    return (
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        fontSize: '10px'
      }}>
        {executions.slice(0, 2).map(execution => (
          <li
            key={execution.id}
            style={{ 
              marginBottom: '1px',
              cursor: 'pointer',
              padding: '1px 3px',
              borderRadius: '2px',
              backgroundColor: getExecutionBadgeColor(execution.status),
              color: 'white',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '9px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleViewExecutionDetail(execution);
            }}
          >
            {getTriggerIcon(execution.triggerType)} {execution.taskCollectionName.substring(0, 4)}...
          </li>
        ))}
        {executions.length > 2 && (
          <li style={{ fontSize: '8px', color: '#999', textAlign: 'center' }}>
            +{executions.length - 2}
          </li>
        )}
      </ul>
    );
  };

  // 获取执行状态对应的颜色
  const getExecutionBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return '#52c41a';
      case 'running': return '#1890ff';
      case 'scheduled': return '#faad14';
      case 'failed': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  // 获取触发类型图标
  const getTriggerIcon = (triggerType: string) => {
    return triggerType === 'cron' ? '⏰' : '🔗';
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
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
          <span 
            style={{ cursor: 'pointer', marginLeft: 4 }}
            onClick={() => navigate('/')}
          >
            首页
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UnorderedListOutlined />
          <span 
            style={{ cursor: 'pointer', marginLeft: 4 }}
            onClick={() => navigate('/task-management/task-collections')}
          >
            任务集合管理
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <CalendarOutlined />
          执行历史记录
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          任务执行历史记录
        </Title>
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

      {/* 月度统计 */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5}>月度执行统计</Title>
        <Row gutter={16}>
          {Array.from({ length: 12 }, (_, i) => {
            const month = i;
            const monthName = dayjs().month(month).format('MM月');
            const monthRecords = executionHistory.filter(r => dayjs(r.startTime).month() === month);
            return (
              <Col xs={12} sm={8} md={6} lg={4} xl={2} key={month}>
                <div style={{ textAlign: 'center', padding: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: monthRecords.length > 0 ? '#1890ff' : '#d9d9d9' }}>
                    {monthRecords.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{monthName}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>

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
        
        {/* 调试信息 */}
        <Alert 
          message={
            <div>
              <div>当前加载了 {executionHistory.length} 条执行记录</div>
              <div>今天 ({dayjs().format('YYYY-MM-DD')}) 的记录: {getExecutionsForDate(dayjs()).length} 条</div>
              <div>本月记录总数: {executionHistory.filter(r => dayjs(r.startTime).month() === dayjs().month()).length} 条</div>
            </div>
          }
          type="info" 
          style={{ marginBottom: 16 }}
          showIcon
        />
        
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
          dateCellRender={dateCellRender}
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
