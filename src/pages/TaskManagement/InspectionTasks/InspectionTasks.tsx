import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Descriptions,
  Tooltip,
  message,
  Alert,
  DatePicker
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  MonitorOutlined,
  HeartOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  HistoryOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import '../../../styles/inspection-tasks.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const TaskCard = styled(Card)`
  height: 100%;
  min-height: 320px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
  }

  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;
    
    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }
    
    .ant-card-extra {
      padding: 0;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: #666;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }

  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 280px;
    
    .ant-card-head {
      padding: 10px 12px;
      min-height: 50px;
    }
    
    .ant-card-body {
      padding: 12px;
      height: calc(100% - 50px);
    }
  }
`;

const TaskCardsContainer = styled.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

interface InspectionTask {
  id: string;
  name: string;
  description: string;
  type: 'health_check' | 'performance_monitor' | 'security_scan' | 'log_analysis';
  taskCollections: string[]; // 改为触发的任务集合列表
  schedule: {
    type: 'cron' | 'interval';
    expression: string;
    timezone: string;
  };
  config: {
    timeout: number;
    retryCount: number;
    alertThreshold: number;
    checkpoints: string[];
  };
  status: 'running' | 'paused' | 'stopped' | 'error';
  lastRun: {
    startTime: string;
    endTime: string;
    status: 'success' | 'failed' | 'timeout';
    duration: number;
    result: any;
  };
  nextRun: string;
  statistics: {
    totalRuns: number;
    successCount: number;
    failureCount: number;
    avgDuration: number;
    successRate: number;
  };
  alerts: {
    enabled: boolean;
    channels: string[];
    conditions: string[];
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const InspectionTasks: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<InspectionTask | null>(null);
  const [selectedTask, setSelectedTask] = useState<InspectionTask | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  const { t } = useTranslation(['tasks', 'common']);

  useEffect(() => {
    setPageTitle(t('tasks:inspection.title'));
  }, [t]);

  // 巡检任务数据
  const inspectionTaskData: InspectionTask[] = [
    {
      id: '1',
      name: '核心服务健康检查',
      description: '定期触发核心服务监控任务集合，执行健康检查、性能分析等巡检动作',
      type: 'health_check',
      taskCollections: ['核心服务监控任务', '业务流程巡检任务'],
      schedule: {
        type: 'interval',
        expression: '*/5 * * * *',
        timezone: 'Asia/Shanghai'
      },
      config: {
        timeout: 30,
        retryCount: 3,
        alertThreshold: 80,
        checkpoints: ['任务集合执行状态', '巡检动作成功率', '响应时间', '错误率']
      },
      status: 'running',
      lastRun: {
        startTime: '2024-06-15 14:30:00',
        endTime: '2024-06-15 14:30:45',
        status: 'success',
        duration: 45,
        result: {
          '核心服务监控任务': { status: 'success', duration: 25, actions: 7 },
          '业务流程巡检任务': { status: 'success', duration: 20, actions: 6 }
        }
      },
      nextRun: '2024-06-15 14:35:00',
      statistics: {
        totalRuns: 2847,
        successCount: 2801,
        failureCount: 46,
        avgDuration: 42,
        successRate: 98.4
      },
      alerts: {
        enabled: true,
        channels: ['email', 'webhook', 'sms'],
        conditions: ['任务集合执行失败', '成功率<80%', '执行超时']
      },
      createdBy: '运维工程师',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14'
    },
    {
      id: '2',
      name: '数据库性能监控',
      description: '定期触发数据库相关任务集合，监控数据库集群的性能指标和健康状态',
      type: 'performance_monitor',
      taskCollections: ['数据库监控任务集'],
      schedule: {
        type: 'cron',
        expression: '0 */10 * * * *',
        timezone: 'Asia/Shanghai'
      },
      config: {
        timeout: 60,
        retryCount: 2,
        alertThreshold: 70,
        checkpoints: ['任务集合状态', '数据库连接', '查询性能', '资源使用率']
      },
      status: 'running',
      lastRun: {
        startTime: '2024-06-15 14:20:00',
        endTime: '2024-06-15 14:21:15',
        status: 'success',
        duration: 75,
        result: {
          '数据库监控任务集': { status: 'success', duration: 75, actions: 4 }
        }
      },
      nextRun: '2024-06-15 14:30:00',
      statistics: {
        totalRuns: 1456,
        successCount: 1398,
        failureCount: 58,
        avgDuration: 68,
        successRate: 96.0
      },
      alerts: {
        enabled: true,
        channels: ['email', 'webhook'],
        conditions: ['数据库任务失败', '性能指标异常', '连接数超限']
      },
      createdBy: '数据库管理员',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13'
    },
    {
      id: '3',
      name: '安全漏洞扫描',
      description: '定期触发安全扫描任务集合，执行系统安全检查和漏洞扫描',
      type: 'security_scan',
      taskCollections: ['安全扫描任务集'],
      schedule: {
        type: 'cron',
        expression: '0 0 2 * * *',
        timezone: 'Asia/Shanghai'
      },
      config: {
        timeout: 300,
        retryCount: 1,
        alertThreshold: 90,
        checkpoints: ['安全扫描执行', '漏洞检测', '合规检查', '风险评估']
      },
      status: 'paused',
      lastRun: {
        startTime: '2024-06-14 02:00:00',
        endTime: '2024-06-14 02:08:30',
        status: 'success',
        duration: 510,
        result: {
          '安全扫描任务集': { status: 'success', duration: 510, actions: 4 }
        }
      },
      nextRun: '2024-06-16 02:00:00',
      statistics: {
        totalRuns: 45,
        successCount: 42,
        failureCount: 3,
        avgDuration: 485,
        successRate: 93.3
      },
      alerts: {
        enabled: true,
        channels: ['email'],
        conditions: ['发现高危漏洞', '安全扫描失败', '合规检查不通过']
      },
      createdBy: '安全工程师',
      createdAt: '2024-05-20',
      lastModified: '2024-06-10'
    }
  ];

  const taskTypeMap = {
    health_check: { name: t('tasks:inspection.types.health_check'), color: 'green', icon: <HeartOutlined /> },
    performance_monitor: { name: t('tasks:inspection.types.performance_monitor'), color: 'blue', icon: <BarChartOutlined /> },
    security_scan: { name: t('tasks:inspection.types.security_scan'), color: 'orange', icon: <SafetyCertificateOutlined /> },
    log_analysis: { name: t('tasks:inspection.types.log_analysis'), color: 'purple', icon: <HistoryOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      running: { color: 'green', text: t('tasks:inspection.status.active') },
      paused: { color: 'orange', text: t('tasks:inspection.status.paused') },
      stopped: { color: 'red', text: t('common:status.stopped') },
      error: { color: 'red', text: t('common:status.error') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getLastRunStatusTag = (status: string) => {
    const statusMap = {
      success: { color: 'green', text: t('common:status.success') },
      failed: { color: 'red', text: t('tasks:inspection.status.failed') },
      timeout: { color: 'orange', text: t('common:status.timeout') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTask = (task: InspectionTask) => {
    setEditingTask(task);
    form.setFieldsValue({
      name: task.name,
      description: task.description,
      type: task.type,
      timeout: task.config.timeout,
      retryCount: task.config.retryCount,
      alertThreshold: task.config.alertThreshold
    });
    setModalVisible(true);
  };

  const handleViewTask = (task: InspectionTask) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  const handleStartTask = (taskId: string) => {
    message.success(t('tasks:inspection.messages.startSuccess'));
  };

  const handlePauseTask = (taskId: string) => {
    message.success(t('tasks:inspection.messages.pauseSuccess'));
  };

  const handleDeleteTask = (taskId: string) => {
    message.success(t('tasks:inspection.messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        message.success(t('tasks:inspection.messages.updateSuccess'));
      } else {
        message.success(t('tasks:inspection.messages.createSuccess'));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderTaskCards = () => {
    return inspectionTaskData.map(task => {
      const typeConfig = taskTypeMap[task.type];
      const totalCollections = task.taskCollections.length;

      return (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={task.id}>
          <TaskCard
            title={
              <div className="card-title">
                <div className="title-left">
                  <Space>
                    {typeConfig?.icon}
                    <span>{task.name}</span>
                  </Space>
                </div>
                <div className="title-right">
                  {getStatusTag(task.status)}
                </div>
              </div>
            }
            onClick={() => handleViewTask(task)}
          >
            {/* 任务类型和集合标签 */}
            <div style={{ marginBottom: 12 }}>
              <Space wrap size="small">
                <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                  {typeConfig?.name}
                </Tag>
                <Tag icon={<MonitorOutlined />}>
                  {totalCollections}{t('tasks:inspection.card.taskCollections')}
                </Tag>
              </Space>
            </div>
            
            {/* 任务描述 */}
            <div style={{ marginBottom: 16, flex: 1 }}>
              <Paragraph 
                ellipsis={{ rows: 2, tooltip: task.description }} 
                style={{ marginBottom: 0, minHeight: 44, fontSize: 13, lineHeight: '1.5' }}
              >
                {task.description}
              </Paragraph>
            </div>

            {/* 统计信息 */}
            <div style={{ marginBottom: 12 }}>
              <Row gutter={12}>
                <Col span={12}>
                  <Statistic
                    title={t('tasks:inspection.card.successRate')}
                    value={task.statistics.successRate}
                    suffix="%"
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('tasks:inspection.card.executionCount')}
                    value={task.statistics.totalRuns}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            {/* 最后执行状态 - 水平排列 */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text strong style={{ fontSize: 12 }}>{t('tasks:inspection.card.lastExecution')}</Text>
                  {getLastRunStatusTag(task.lastRun.status)}
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {task.lastRun.duration}s
                </Text>
              </div>
            </div>

            {/* 调度信息 */}
            <div style={{ fontSize: 11, color: '#666', lineHeight: '1.4', marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Text>{t('tasks:inspection.card.schedule')}: </Text>
                <Text>{task.schedule.expression}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{t('tasks:inspection.card.nextExecution')}: </Text>
                <Text>{task.nextRun}</Text>
              </div>
            </div>
            
            {/* 操作按钮区域 - 单独一行 */}
            <div className="card-actions">
              <Space>
                <Tooltip title={t('tasks:inspection.card.viewDetails')}>
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewTask(task);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('tasks:inspection.card.edit')}>
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTask(task);
                    }}
                  />
                </Tooltip>
                {task.status === 'running' ? (
                  <Tooltip title={t('tasks:inspection.card.pause')}>
                    <Button 
                      type="text" 
                      icon={<PauseCircleOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePauseTask(task.id);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={t('tasks:inspection.card.start')}>
                    <Button 
                      type="text" 
                      icon={<PlayCircleOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartTask(task.id);
                      }}
                    />
                  </Tooltip>
                )}
              </Space>
            </div>
          </TaskCard>
        </Col>
      );
    });
  };

  const runningTasks = inspectionTaskData.filter(task => task.status === 'running').length;
  const totalCollections = inspectionTaskData.reduce((sum, task) => 
    sum + task.taskCollections.length, 0
  );
  const avgSuccessRate = inspectionTaskData.reduce((sum, task) => 
    sum + task.statistics.successRate, 0
  ) / inspectionTaskData.length;

  return (
    <PageContainer className="inspection-tasks-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <SearchOutlined style={{ color: '#1890ff' }} />
                {t('tasks:inspection.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('tasks:inspection.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('tasks:inspection.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
              {t('tasks:inspection.createTask')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="inspection-stats-primary">
            <Statistic
              title={t('tasks:inspection.stats.totalTasks')}
              value={inspectionTaskData.length}
              suffix={t('common:unit.count')}
              prefix={<SearchOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="inspection-stats-success">
            <Statistic
              title={t('tasks:inspection.stats.runningTasks')}
              value={runningTasks}
              suffix={t('common:unit.count')}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="inspection-stats-warning">
            <Statistic
              title={t('tasks:inspection.card.taskCollections')}
              value={totalCollections}
              suffix={t('common:unit.count')}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="inspection-stats-purple">
            <Statistic
              title={t('tasks:inspection.card.successRate')}
              value={avgSuccessRate.toFixed(1)}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('tasks:inspection.search.placeholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('tasks:inspection.search.type'),
            width: 120,
            options: [
              { value: 'all', label: t('tasks:inspection.search.allTypes') },
              ...Object.entries(taskTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('tasks:inspection.search.status'),
            width: 100,
            options: [
              { value: 'all', label: t('tasks:inspection.search.allStatuses') },
              { value: 'running', label: t('tasks:inspection.status.active') },
              { value: 'paused', label: t('tasks:inspection.status.paused') },
              { value: 'stopped', label: t('tasks:inspection.status.draft') },
              { value: 'error', label: t('tasks:inspection.status.failed') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 巡检任务卡片列表 */}
      <TaskCardsContainer>
        <Row gutter={[16, 16]}>
          {renderTaskCards()}
        </Row>
      </TaskCardsContainer>

      {/* 创建/编辑巡检任务模态框 */}
      <Modal
        title={editingTask ? t('tasks:inspection.editTitle') : t('tasks:inspection.createTitle')}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'health_check',
            timeout: 30,
            retryCount: 3,
            alertThreshold: 80
          }}
        >
          <Form.Item
            name="name"
            label={t('tasks:inspection.form.name')}
            rules={[{ required: true, message: t('tasks:inspection.form.nameRequired') }]}
          >
            <Input placeholder={t('tasks:inspection.form.namePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('tasks:inspection.form.description')}
            rules={[{ required: true, message: t('tasks:inspection.form.descriptionRequired') }]}
          >
            <TextArea 
              rows={3} 
              placeholder={t('tasks:inspection.form.descriptionPlaceholder')}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label={t('tasks:inspection.form.type')}
                rules={[{ required: true, message: t('tasks:inspection.form.typeRequired') }]}
              >
                <Select placeholder={t('tasks:inspection.form.typePlaceholder')}>
                  <Option value="health_check">{t('tasks:inspection.types.health_check')}</Option>
                  <Option value="performance_monitor">{t('tasks:inspection.types.performance_monitor')}</Option>
                  <Option value="security_scan">{t('tasks:inspection.types.security_scan')}</Option>
                  <Option value="log_analysis">{t('tasks:inspection.types.log_analysis')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeout"
                label={t('tasks:inspection.form.timeout')}
                rules={[{ required: true, message: t('tasks:inspection.form.timeoutRequired') }]}
              >
                <Input type="number" placeholder={t('tasks:inspection.form.timeoutPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="retryCount"
                label={t('tasks:inspection.form.retryCount')}
                rules={[{ required: true, message: t('tasks:inspection.form.retryCountRequired') }]}
              >
                <Input type="number" placeholder={t('tasks:inspection.form.retryCountPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="alertThreshold"
                label={t('tasks:inspection.form.alertThreshold')}
                rules={[{ required: true, message: t('tasks:inspection.form.alertThresholdRequired') }]}
              >
                <Input type="number" placeholder={t('tasks:inspection.form.alertThresholdPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message={t('common:tips')}
            description={t('tasks:inspection.tips.createHint')}
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>

      {/* 巡检任务详情模态框 */}
      <Modal
        title={selectedTask?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {selectedTask && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label={t('tasks:inspection.detail.taskName')} span={2}>
                {selectedTask.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.taskType')}>
                <Tag 
                  color={taskTypeMap[selectedTask.type]?.color}
                  icon={taskTypeMap[selectedTask.type]?.icon}
                >
                  {taskTypeMap[selectedTask.type]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('common:status')}>
                {getStatusTag(selectedTask.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.successRate')}>
                {selectedTask.statistics.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.executionCount')}>
                {selectedTask.statistics.totalRuns}{t('common:unit.times')}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.avgDuration')}>
                {selectedTask.statistics.avgDuration}{t('tasks:inspection.detail.seconds')}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.nextExecution')}>
                {selectedTask.nextRun}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:inspection.detail.creator')}>
                {selectedTask.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:createTime')}>
                {selectedTask.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:description')} span={2}>
                {selectedTask.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="collections">
              <Tabs.TabPane tab={t('tasks:inspection.detail.taskCollections')} key="collections">
                <Card title={t('tasks:inspection.detail.triggeredCollections')} size="small">
                  {selectedTask.taskCollections.length > 0 ? (
                    <Space wrap>
                      {selectedTask.taskCollections.map(collection => (
                        <Tag key={collection} icon={<UnorderedListOutlined />} color="blue">
                          {collection}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">{t('tasks:inspection.detail.noCollections')}</Text>
                  )}
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={t('tasks:inspection.detail.configParams')} key="config">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label={t('tasks:inspection.detail.timeout')}>
                    {selectedTask.config.timeout}{t('tasks:inspection.detail.seconds')}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tasks:inspection.detail.retryCount')}>
                    {selectedTask.config.retryCount}{t('common:unit.times')}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tasks:inspection.detail.alertThreshold')}>
                    {selectedTask.config.alertThreshold}%
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tasks:inspection.detail.scheduleExpression')}>
                    {selectedTask.schedule.expression}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tasks:inspection.detail.timezone')}>
                    {selectedTask.schedule.timezone}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('tasks:inspection.detail.checkpoints')} span={2}>
                    <Space wrap>
                      {selectedTask.config.checkpoints.map(checkpoint => (
                        <Tag key={checkpoint}>{checkpoint}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>

              <Tabs.TabPane tab={t('tasks:inspection.detail.executionHistory')} key="history">
                <Card title={t('tasks:inspection.detail.recentResults')} size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label={t('tasks:inspection.detail.startTime')}>
                      {selectedTask.lastRun.startTime}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('tasks:inspection.detail.endTime')}>
                      {selectedTask.lastRun.endTime}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('tasks:inspection.detail.executionStatus')}>
                      {getLastRunStatusTag(selectedTask.lastRun.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('tasks:inspection.detail.executionDuration')}>
                      {selectedTask.lastRun.duration}{t('tasks:inspection.detail.seconds')}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default InspectionTasks;
