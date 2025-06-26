import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col,
  Badge,
  Tag,
  Modal,
  Descriptions,
  Timeline,
  Select,
  Tooltip,
  Alert,
  Divider,
  Breadcrumb,
  List,
  DatePicker,
  Input
} from 'antd';
import { 
  ClockCircleOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ScheduleOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { setPageTitle } from '../../utils';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const ListContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    const daysInMonth = dayjs().year(currentYear).month(month).daysInMonth();
    
    // 为每个月的每一天生成1-3条记录
    for (let day = 1; day <= daysInMonth; day++) {
      // 30%的天数有执行记录
      if (Math.random() > 0.7) continue;
      
      const recordsPerDay = Math.floor(Math.random() * 3) + 1; // 1-3条记录
      
      for (let i = 0; i < recordsPerDay; i++) {
        const task = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
        const triggerType = triggerTypes[Math.floor(Math.random() * triggerTypes.length)];
        
        // 生成具体的执行时间
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        
        const startTime = dayjs().year(currentYear).month(month).date(day).hour(hour).minute(minute).second(0);
        const now = dayjs();
        
        // 根据时间确定状态
        let status: 'completed' | 'running' | 'scheduled' | 'failed';
        if (startTime.isAfter(now)) {
          status = 'scheduled'; // 未来时间为计划任务
        } else if (startTime.isSame(now, 'day') && startTime.isAfter(now.subtract(2, 'hour'))) {
          status = Math.random() > 0.5 ? 'running' : 'completed'; // 最近2小时可能正在执行
        } else {
          status = Math.random() > 0.8 ? 'failed' : 'completed'; // 历史任务80%成功
        }
        
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
          executedTargets = Math.floor(totalTargets * 0.6); // 执行了60%
          successRate = Math.floor(Math.random() * 20) + 70; // 70-90%
        } else if (status === 'scheduled') {
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
  }

  // 确保今天有明确的执行记录示例
  const today = dayjs();
  
  // 今天10:00已完成的任务
  records.push({
    id: `exec_today_001`,
    taskCollectionId: 'task_001',
    taskCollectionName: '核心业务系统健康检查',
    status: 'completed',
    triggerType: 'cron',
    startTime: today.hour(10).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
    endTime: today.hour(10).minute(15).second(0).format('YYYY-MM-DD HH:mm:ss'),
    duration: 900,
    executedTargets: 8,
    totalTargets: 8,
    successRate: 100
  });

  // 今天23:00未执行的计划任务
  records.push({
    id: `exec_today_002`,
    taskCollectionId: 'task_002',
    taskCollectionName: '数据库性能监控',
    status: 'scheduled',
    triggerType: 'cron',
    startTime: today.hour(23).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
    executedTargets: 0,
    totalTargets: 5,
    successRate: 0
  });

  // 今天14:30正在执行的任务
  records.push({
    id: `exec_today_003`,
    taskCollectionId: 'task_003',
    taskCollectionName: '安全扫描任务',
    status: 'running',
    triggerType: 'hook',
    triggerSource: 'API调用',
    startTime: today.hour(14).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
    executedTargets: 3,
    totalTargets: 6,
    successRate: 75
  });

  return records.sort((a, b) => dayjs(b.startTime).unix() - dayjs(a.startTime).unix());
};

// 生成模拟执行历史数据
const mockExecutionHistory: ExecutionRecord[] = generateYearlyExecutionHistory();

const TaskExecutionHistory: React.FC = () => {
  const { t } = useTranslation();
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  
  const [selectedExecution, setSelectedExecution] = useState<ExecutionRecord | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>([]);
  
  // 筛选和搜索状态
  const [filteredHistory, setFilteredHistory] = useState<ExecutionRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [triggerFilter, setTriggerFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setPageTitle('任务执行历史记录');
    // 根据taskId过滤执行记录
    const filteredHistory = taskId 
      ? mockExecutionHistory.filter(record => record.taskCollectionId === taskId)
      : mockExecutionHistory;
    setExecutionHistory(filteredHistory);
    
    // 调试信息
    console.log('生成的执行历史记录总数:', mockExecutionHistory.length);
    console.log('过滤后的执行历史记录:', filteredHistory.length);
  }, [taskId]);

  // 筛选和搜索逻辑
  useEffect(() => {
    let filtered = [...executionHistory];

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // 触发方式筛选
    if (triggerFilter !== 'all') {
      filtered = filtered.filter(record => record.triggerType === triggerFilter);
    }

    // 日期范围筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(record => {
        const recordDate = dayjs(record.startTime);
        return recordDate.isAfter(dateRange[0]?.startOf('day')) && 
               recordDate.isBefore(dateRange[1]?.endOf('day'));
      });
    }

    // 关键词搜索
    if (searchKeyword) {
      filtered = filtered.filter(record => 
        record.taskCollectionName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        record.triggerSource?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // 排序
    filtered.sort((a, b) => {
      const timeA = dayjs(a.startTime).unix();
      const timeB = dayjs(b.startTime).unix();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    setFilteredHistory(filtered);
  }, [executionHistory, statusFilter, triggerFilter, dateRange, searchKeyword, sortOrder]);

  // 查看执行详情
  const handleViewExecutionDetail = (execution: ExecutionRecord) => {
    setSelectedExecution(execution);
    setDetailModalVisible(true);
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

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'running': return '执行中';
      case 'scheduled': return '未执行';
      case 'failed': return '失败';
      default: return '未知';
    }
  };

  // 格式化持续时间
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
    return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分`;
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
          <UnorderedListOutlined />
          执行历史记录
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <UnorderedListOutlined style={{ marginRight: 8, color: '#1890ff' }} />
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

      {/* 筛选器 */}
      <FilterContainer>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={6}>
            <Space>
              <FilterOutlined />
              <Text strong>筛选条件:</Text>
            </Space>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              placeholder="执行状态"
            >
              <Option value="all">全部状态</Option>
              <Option value="completed">已完成</Option>
              <Option value="running">执行中</Option>
              <Option value="scheduled">计划中</Option>
              <Option value="failed">失败</Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              value={triggerFilter}
              onChange={setTriggerFilter}
              style={{ width: '100%' }}
              placeholder="触发方式"
            >
              <Option value="all">全部方式</Option>
              <Option value="cron">定时任务</Option>
              <Option value="hook">Hook触发</Option>
            </Select>
          </Col>
          <Col xs={24} sm={6}>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '100%' }}
              placeholder={['开始日期', '结束日期']}
            />
          </Col>
          <Col xs={24} sm={4}>
            <Search
              placeholder="搜索任务名称"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 12 }}>
          <Col>
            <Space>
              <Text type="secondary">排序:</Text>
              <Select
                value={sortOrder}
                onChange={setSortOrder}
                style={{ width: 120 }}
              >
                <Option value="desc">最新优先</Option>
                <Option value="asc">最早优先</Option>
              </Select>
              <Button 
                type="link" 
                size="small"
                onClick={() => {
                  setStatusFilter('all');
                  setTriggerFilter('all');
                  setDateRange(null);
                  setSearchKeyword('');
                  setSortOrder('desc');
                }}
              >
                重置筛选
              </Button>
            </Space>
          </Col>
        </Row>
      </FilterContainer>

      {/* 执行记录列表 */}
      <ListContainer>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>
            执行记录列表 ({filteredHistory.length}条)
          </Title>
        </div>
        
        <List
          dataSource={filteredHistory}
          renderItem={(execution) => {
            const triggerInfo = getTriggerInfo(execution.triggerType, execution.triggerSource);
            const time = dayjs(execution.startTime).format('YYYY-MM-DD HH:mm:ss');
            const statusText = getStatusText(execution.status);
            
            return (
              <List.Item style={{ padding: 0, marginBottom: 8 }}>
                <ExecutionCard
                  className={execution.status}
                  size="small"
                  hoverable
                  onClick={() => handleViewExecutionDetail(execution)}
                  style={{ width: '100%' }}
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
                            <ClockCircleOutlined /> {time}
                          </Text>
                          {execution.duration && (
                            <Text type="secondary">
                              <HistoryOutlined /> {formatDuration(execution.duration)}
                            </Text>
                          )}
                          <Text type="secondary">
                            成功率: {execution.successRate}%
                          </Text>
                          <Text type="secondary">
                            进度: {execution.executedTargets}/{execution.totalTargets}
                          </Text>
                        </Space>
                      </Space>
                    </Col>
                    <Col>
                      <Tag color={getExecutionBadgeStatus(execution.status)}>
                        {statusText}
                      </Tag>
                    </Col>
                  </Row>
                </ExecutionCard>
              </List.Item>
            );
          }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
          }}
        />
      </ListContainer>

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
                    {getStatusText(selectedExecution.status)}
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
