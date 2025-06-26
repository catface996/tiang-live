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
  Select,
  Tooltip,
  Alert,
  Divider,
  Breadcrumb,
  List,
  DatePicker
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
  ReloadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { setPageTitle } from '../../utils';
import { SearchFilterBar } from '../../components/Common';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
  triggerSource?: string | null;
  startTime: string;
  endTime?: string | null;
  duration?: number | null;
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
  } | null;
}

// 模拟执行历史数据
const mockExecutionHistoryData: ExecutionRecord[] = [
  {
    id: "exec_001",
    taskCollectionId: "1",
    taskCollectionName: "核心业务系统健康检查",
    status: "completed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-26 10:00:00",
    endTime: "2025-06-26 10:15:30",
    duration: 930,
    executedTargets: 8,
    totalTargets: 8,
    successRate: 100,
    details: {
      targets: [
        {
          id: "entity_001",
          name: "用户管理系统",
          type: "entity",
          status: "success",
          actions: [
            {
              id: "health_check",
              name: "健康检查",
              status: "success",
              duration: 120
            },
            {
              id: "performance_analysis",
              name: "性能分析",
              status: "success",
              duration: 180
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_002",
    taskCollectionId: "2",
    taskCollectionName: "数据库性能监控",
    status: "running",
    triggerType: "hook",
    triggerSource: "API调用",
    startTime: "2025-06-26 14:30:00",
    endTime: null,
    duration: null,
    executedTargets: 3,
    totalTargets: 5,
    successRate: 75,
    details: null
  },
  {
    id: "exec_003",
    taskCollectionId: "3",
    taskCollectionName: "安全扫描任务",
    status: "scheduled",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-26 23:00:00",
    endTime: null,
    duration: null,
    executedTargets: 0,
    totalTargets: 6,
    successRate: 0,
    details: null
  },
  {
    id: "exec_004",
    taskCollectionId: "1",
    taskCollectionName: "核心业务系统健康检查",
    status: "failed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-25 15:00:00",
    endTime: "2025-06-25 15:08:45",
    duration: 525,
    executedTargets: 5,
    totalTargets: 8,
    successRate: 62.5,
    details: {
      targets: [
        {
          id: "entity_002",
          name: "订单管理系统",
          type: "entity",
          status: "failed",
          actions: [
            {
              id: "health_check",
              name: "健康检查",
              status: "failed",
              duration: 60
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_005",
    taskCollectionId: "4",
    taskCollectionName: "网络安全巡检",
    status: "completed",
    triggerType: "hook",
    triggerSource: "Webhook触发",
    startTime: "2025-06-24 10:30:00",
    endTime: "2025-06-24 11:45:20",
    duration: 4520,
    executedTargets: 12,
    totalTargets: 12,
    successRate: 100,
    details: {
      targets: [
        {
          id: "entity_003",
          name: "防火墙系统",
          type: "entity",
          status: "success",
          actions: [
            {
              id: "security_scan",
              name: "安全扫描",
              status: "success",
              duration: 300
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_006",
    taskCollectionId: "2",
    taskCollectionName: "数据库性能监控",
    status: "completed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-23 18:00:00",
    endTime: "2025-06-23 18:25:15",
    duration: 1515,
    executedTargets: 5,
    totalTargets: 5,
    successRate: 100,
    details: {
      targets: [
        {
          id: "entity_004",
          name: "MySQL主库",
          type: "entity",
          status: "success",
          actions: [
            {
              id: "performance_analysis",
              name: "性能分析",
              status: "success",
              duration: 240
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_007",
    taskCollectionId: "5",
    taskCollectionName: "备份验证任务",
    status: "completed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-22 02:00:00",
    endTime: "2025-06-22 02:45:30",
    duration: 2730,
    executedTargets: 3,
    totalTargets: 3,
    successRate: 100,
    details: {
      targets: [
        {
          id: "sequence_001",
          name: "数据备份流程",
          type: "sequence",
          status: "success",
          actions: [
            {
              id: "backup_verify",
              name: "备份验证",
              status: "success",
              duration: 600
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_008",
    taskCollectionId: "6",
    taskCollectionName: "日志分析任务",
    status: "failed",
    triggerType: "hook",
    triggerSource: "监控告警触发",
    startTime: "2025-06-21 16:20:00",
    endTime: "2025-06-21 16:35:15",
    duration: 915,
    executedTargets: 2,
    totalTargets: 4,
    successRate: 50,
    details: {
      targets: [
        {
          id: "entity_005",
          name: "应用日志系统",
          type: "entity",
          status: "failed",
          actions: [
            {
              id: "log_analysis",
              name: "日志分析",
              status: "failed",
              duration: 180
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_009",
    taskCollectionId: "7",
    taskCollectionName: "容器健康检查",
    status: "completed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-20 09:00:00",
    endTime: "2025-06-20 09:12:30",
    duration: 750,
    executedTargets: 15,
    totalTargets: 15,
    successRate: 100,
    details: {
      targets: [
        {
          id: "entity_006",
          name: "Kubernetes集群",
          type: "entity",
          status: "success",
          actions: [
            {
              id: "health_check",
              name: "健康检查",
              status: "success",
              duration: 90
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_010",
    taskCollectionId: "8",
    taskCollectionName: "API接口监控",
    status: "running",
    triggerType: "hook",
    triggerSource: "手动触发",
    startTime: "2025-06-26 15:45:00",
    endTime: null,
    duration: null,
    executedTargets: 6,
    totalTargets: 10,
    successRate: 85,
    details: null
  },
  {
    id: "exec_011",
    taskCollectionId: "1",
    taskCollectionName: "核心业务系统健康检查",
    status: "scheduled",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-27 09:00:00",
    endTime: null,
    duration: null,
    executedTargets: 0,
    totalTargets: 8,
    successRate: 0,
    details: null
  },
  {
    id: "exec_012",
    taskCollectionId: "3",
    taskCollectionName: "安全扫描任务",
    status: "completed",
    triggerType: "hook",
    triggerSource: "API调用",
    startTime: "2025-06-19 14:15:00",
    endTime: "2025-06-19 15:30:45",
    duration: 4545,
    executedTargets: 6,
    totalTargets: 6,
    successRate: 100,
    details: {
      targets: [
        {
          id: "entity_007",
          name: "Web应用防火墙",
          type: "entity",
          status: "success",
          actions: [
            {
              id: "security_scan",
              name: "安全扫描",
              status: "success",
              duration: 450
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_013",
    taskCollectionId: "4",
    taskCollectionName: "网络安全巡检",
    status: "failed",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-18 08:00:00",
    endTime: "2025-06-18 08:25:30",
    duration: 1530,
    executedTargets: 8,
    totalTargets: 12,
    successRate: 66.7,
    details: {
      targets: [
        {
          id: "entity_008",
          name: "入侵检测系统",
          type: "entity",
          status: "failed",
          actions: [
            {
              id: "security_scan",
              name: "安全扫描",
              status: "failed",
              duration: 120
            }
          ]
        }
      ]
    }
  },
  {
    id: "exec_014",
    taskCollectionId: "5",
    taskCollectionName: "备份验证任务",
    status: "scheduled",
    triggerType: "cron",
    triggerSource: null,
    startTime: "2025-06-27 02:00:00",
    endTime: null,
    duration: null,
    executedTargets: 0,
    totalTargets: 3,
    successRate: 0,
    details: null
  },
  {
    id: "exec_015",
    taskCollectionId: "6",
    taskCollectionName: "日志分析任务",
    status: "completed",
    triggerType: "hook",
    triggerSource: "Webhook触发",
    startTime: "2025-06-17 11:30:00",
    endTime: "2025-06-17 12:15:20",
    duration: 2720,
    executedTargets: 4,
    totalTargets: 4,
    successRate: 100,
    details: {
      targets: [
        {
          id: "sequence_002",
          name: "日志聚合流程",
          type: "sequence",
          status: "success",
          actions: [
            {
              id: "log_analysis",
              name: "日志分析",
              status: "success",
              duration: 360
            }
          ]
        }
      ]
    }
  }
];

const TaskExecutionHistory: React.FC = () => {
  const { t } = useTranslation(['tasks', 'common']);
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  
  const [executionHistory, setExecutionHistory] = useState<ExecutionRecord[]>([]);
  
  // 筛选和搜索状态
  const [filteredHistory, setFilteredHistory] = useState<ExecutionRecord[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [triggerFilter, setTriggerFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setPageTitle(t('tasks:executionHistory.title'));
    // 根据taskId过滤执行记录
    const filteredHistory = taskId 
      ? mockExecutionHistoryData.filter(record => record.taskCollectionId === taskId)
      : mockExecutionHistoryData;
    setExecutionHistory(filteredHistory);
    
    // 调试信息
    console.log('加载的执行历史记录总数:', mockExecutionHistoryData.length);
    console.log('过滤后的执行历史记录:', filteredHistory.length);
    console.log('当前taskId:', taskId);
    console.log('模拟数据前3条:', mockExecutionHistoryData.slice(0, 3));
  }, [taskId, t]);

  // 筛选和搜索逻辑
  useEffect(() => {
    console.log('筛选逻辑执行 - executionHistory长度:', executionHistory.length);
    console.log('当前筛选条件:', { searchKeyword, statusFilter, triggerFilter, dateRange, sortOrder });
    
    let filtered = [...executionHistory];

    // 关键词搜索
    if (searchKeyword) {
      filtered = filtered.filter(record => 
        record.taskCollectionName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        record.triggerSource?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

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

    // 排序
    filtered.sort((a, b) => {
      const timeA = dayjs(a.startTime).unix();
      const timeB = dayjs(b.startTime).unix();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    console.log('筛选后的记录数量:', filtered.length);
    console.log('筛选后的前3条记录:', filtered.slice(0, 3));
    setFilteredHistory(filtered);
  }, [executionHistory, searchKeyword, statusFilter, triggerFilter, dateRange, sortOrder]);

  // 刷新数据
  const handleRefresh = () => {
    // 重新加载数据
    const filteredHistory = taskId 
      ? mockExecutionHistoryData.filter(record => record.taskCollectionId === taskId)
      : mockExecutionHistoryData;
    setExecutionHistory(filteredHistory);
  };

  // 查看执行详情 - 导航到详情页面而不是弹窗
  const handleViewExecutionDetail = (execution: ExecutionRecord) => {
    // 使用执行记录ID作为runId导航到详情页面
    navigate(`/task-management/task-collections/run/${execution.id}`);
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
  const getTriggerInfo = (triggerType: string, triggerSource?: string | null) => {
    if (triggerType === 'cron') {
      return {
        icon: <ScheduleOutlined style={{ color: '#1890ff' }} />,
        text: t('tasks:executionHistory.triggerType.cron'),
        color: 'blue'
      };
    } else {
      return {
        icon: <ApiOutlined style={{ color: '#52c41a' }} />,
        text: triggerSource || t('tasks:executionHistory.triggerType.hook'),
        color: 'green'
      };
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    return t(`tasks:executionHistory.status.${status}`);
  };

  // 格式化持续时间
  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return t('tasks:executionHistory.time.formatDuration.seconds', { count: seconds });
    }
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return t('tasks:executionHistory.time.formatDuration.minutes', { 
        minutes, 
        seconds: remainingSeconds 
      });
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return t('tasks:executionHistory.time.formatDuration.hours', { 
      hours, 
      minutes 
    });
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
          {t('tasks:executionHistory.title')}
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
              <div style={{ color: '#666' }}>{t('tasks:executionHistory.stats.totalExecutions')}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                {executionHistory.filter(e => e.status === 'completed').length}
              </div>
              <div style={{ color: '#666' }}>{t('tasks:executionHistory.stats.successfulExecutions')}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {executionHistory.filter(e => e.status === 'running').length}
              </div>
              <div style={{ color: '#666' }}>{t('tasks:executionHistory.stats.runningExecutions')}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#faad14' }}>
                {executionHistory.filter(e => e.status === 'scheduled').length}
              </div>
              <div style={{ color: '#666' }}>{t('tasks:executionHistory.stats.scheduledExecutions')}</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 调试信息面板 */}
      <Alert 
        message={
          <div>
            <div>📊 原始数据: {mockExecutionHistoryData.length} 条</div>
            <div>📋 当前executionHistory: {executionHistory.length} 条</div>
            <div>🔍 筛选后filteredHistory: {filteredHistory.length} 条</div>
            <div>🎯 当前taskId: {taskId || '无'}</div>
            <div>🔧 筛选条件: 状态={statusFilter}, 触发={triggerFilter}, 搜索="{searchKeyword}"</div>
          </div>
        }
        type="info" 
        style={{ marginBottom: 16 }}
        showIcon
      />

      {/* 搜索和筛选栏 */}
      <SearchFilterBar
        searchValue={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder={t('tasks:executionHistory.search.placeholder')}
        filters={[
          {
            key: 'status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: 'all', label: t('tasks:executionHistory.status.all') },
              { value: 'completed', label: t('tasks:executionHistory.status.completed') },
              { value: 'running', label: t('tasks:executionHistory.status.running') },
              { value: 'scheduled', label: t('tasks:executionHistory.status.scheduled') },
              { value: 'failed', label: t('tasks:executionHistory.status.failed') }
            ],
            placeholder: t('tasks:executionHistory.filter.status'),
            width: 120
          },
          {
            key: 'trigger',
            value: triggerFilter,
            onChange: setTriggerFilter,
            options: [
              { value: 'all', label: t('tasks:executionHistory.triggerType.all') },
              { value: 'cron', label: t('tasks:executionHistory.triggerType.cron') },
              { value: 'hook', label: t('tasks:executionHistory.triggerType.hook') }
            ],
            placeholder: t('tasks:executionHistory.filter.triggerType'),
            width: 120
          },
          {
            key: 'sort',
            value: sortOrder,
            onChange: setSortOrder,
            options: [
              { value: 'desc', label: t('tasks:executionHistory.sort.newest') },
              { value: 'asc', label: t('tasks:executionHistory.sort.oldest') }
            ],
            placeholder: t('tasks:executionHistory.filter.sort'),
            width: 120
          }
        ]}
        showRefresh={true}
        onRefresh={handleRefresh}
        extraActions={
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={[
              t('tasks:executionHistory.filter.startDate'), 
              t('tasks:executionHistory.filter.endDate')
            ]}
            style={{ width: 240 }}
          />
        }
      />

      {/* 执行记录列表 */}
      <ListContainer>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>
            {t('tasks:executionHistory.list.title')} ({filteredHistory.length}{t('tasks:executionHistory.list.count')})
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
                            {t('tasks:executionHistory.card.successRate')}: {execution.successRate}%
                          </Text>
                          <Text type="secondary">
                            {t('tasks:executionHistory.card.progress')}: {execution.executedTargets}/{execution.totalTargets}
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
    </PageContainer>
  );
};

export default TaskExecutionHistory;
