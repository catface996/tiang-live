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
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Table,
  Tabs,
  Descriptions,
  Progress,
  Tooltip,
  Popconfirm,
  message,
  Transfer,
  Alert
} from 'antd';
import { 
  UnorderedListOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  NodeIndexOutlined,
  ControlOutlined,
  HeartOutlined,
  BugOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  MonitorOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import SearchFilterBar from '../../components/Common/SearchFilterBar';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

interface InspectionAction {
  id: string;
  name: string;
  type: 'health_check' | 'fault_analysis' | 'performance_analysis' | 'security_scan';
  description: string;
  duration: string;
  frequency: string;
}

interface TaskTarget {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  actions: string[]; // InspectionAction IDs
}

interface TaskCollection {
  id: string;
  name: string;
  description: string;
  targets: TaskTarget[];
  status: 'active' | 'paused' | 'draft';
  schedule: string;
  lastRun: string;
  nextRun: string;
  successRate: number;
  totalRuns: number;
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const TaskCollectionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskCollection | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskCollection | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('tasks.collections.title'));
  }, [t]);

  // 巡检动作定义
  const inspectionActions: InspectionAction[] = [
    {
      id: 'health_check',
      name: t('tasks.collections.actions.healthCheck'),
      type: 'health_check',
      description: t('tasks.collections.actionDescriptions.healthCheck'),
      duration: t('tasks.collections.duration.healthCheck'),
      frequency: t('tasks.collections.frequency.every5min')
    },
    {
      id: 'fault_analysis',
      name: t('tasks.collections.actions.faultAnalysis'),
      type: 'fault_analysis',
      description: t('tasks.collections.actionDescriptions.faultAnalysis'),
      duration: t('tasks.collections.duration.faultAnalysis'),
      frequency: t('tasks.collections.frequency.every30min')
    },
    {
      id: 'performance_analysis',
      name: t('tasks.collections.actions.performanceAnalysis'),
      type: 'performance_analysis',
      description: t('tasks.collections.actionDescriptions.performanceAnalysis'),
      duration: t('tasks.collections.duration.performanceAnalysis'),
      frequency: t('tasks.collections.frequency.hourly')
    },
    {
      id: 'security_scan',
      name: t('tasks.collections.actions.securityScan'),
      type: 'security_scan',
      description: t('tasks.collections.actionDescriptions.securityScan'),
      duration: t('tasks.collections.duration.securityScan'),
      frequency: t('tasks.collections.frequency.daily')
    }
  ];

  // 可选的实体和时序
  const availableEntities = [
    { id: 'user_service', name: t('tasks.collections.entities.userService'), category: t('tasks.collections.categories.microservice') },
    { id: 'order_service', name: t('tasks.collections.entities.orderService'), category: t('tasks.collections.categories.microservice') },
    { id: 'payment_service', name: t('tasks.collections.entities.paymentService'), category: t('tasks.collections.categories.microservice') },
    { id: 'database_cluster', name: t('tasks.collections.entities.databaseCluster'), category: t('tasks.collections.categories.dataStorage') },
    { id: 'redis_cache', name: t('tasks.collections.entities.redisCache'), category: t('tasks.collections.categories.cacheService') },
    { id: 'api_gateway', name: t('tasks.collections.entities.apiGateway'), category: t('tasks.collections.categories.gatewayService') }
  ];

  const availableSequences = [
    { id: 'login_flow', name: '用户登录流程', category: '认证时序' },
    { id: 'order_flow', name: '订单处理流程', category: '业务时序' },
    { id: 'payment_flow', name: '支付处理流程', category: '支付时序' },
    { id: 'health_check_flow', name: '健康检查流程', category: '监控时序' }
  ];

  // 任务集合数据
  const taskCollectionData: TaskCollection[] = [
    {
      id: '1',
      name: '核心服务监控任务',
      description: '对核心微服务进行全面的健康检查和性能监控',
      targets: [
        {
          id: 'target_1',
          name: '用户服务',
          type: 'entity',
          category: '微服务',
          actions: ['health_check', 'performance_analysis']
        },
        {
          id: 'target_2',
          name: '订单服务',
          type: 'entity',
          category: '微服务',
          actions: ['health_check', 'fault_analysis', 'performance_analysis']
        },
        {
          id: 'target_3',
          name: '支付服务',
          type: 'entity',
          category: '微服务',
          actions: ['health_check', 'security_scan']
        }
      ],
      status: 'active',
      schedule: '每5分钟',
      lastRun: '2024-06-15 14:30:00',
      nextRun: '2024-06-15 14:35:00',
      successRate: 98.5,
      totalRuns: 2847,
      createdBy: '运维工程师',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14'
    },
    {
      id: '2',
      name: '业务流程巡检任务',
      description: '对关键业务时序进行健康检查和故障分析',
      targets: [
        {
          id: 'target_4',
          name: '用户登录流程',
          type: 'sequence',
          category: '认证时序',
          actions: ['health_check', 'performance_analysis']
        },
        {
          id: 'target_5',
          name: '订单处理流程',
          type: 'sequence',
          category: '业务时序',
          actions: ['health_check', 'fault_analysis']
        },
        {
          id: 'target_6',
          name: '支付处理流程',
          type: 'sequence',
          category: '支付时序',
          actions: ['health_check', 'security_scan', 'performance_analysis']
        }
      ],
      status: 'active',
      schedule: '每15分钟',
      lastRun: '2024-06-15 14:15:00',
      nextRun: '2024-06-15 14:30:00',
      successRate: 96.8,
      totalRuns: 1456,
      createdBy: '业务分析师',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13'
    },
    {
      id: '3',
      name: '安全扫描任务集',
      description: '定期对系统进行安全扫描和漏洞检测',
      targets: [
        {
          id: 'target_7',
          name: 'API网关',
          type: 'entity',
          category: '网关服务',
          actions: ['security_scan', 'health_check']
        },
        {
          id: 'target_8',
          name: '数据库集群',
          type: 'entity',
          category: '数据存储',
          actions: ['security_scan', 'performance_analysis']
        }
      ],
      status: 'paused',
      schedule: '每天',
      lastRun: '2024-06-14 02:00:00',
      nextRun: '2024-06-16 02:00:00',
      successRate: 94.2,
      totalRuns: 45,
      createdBy: '安全工程师',
      createdAt: '2024-05-20',
      lastModified: '2024-06-10'
    }
  ];

  const actionTypeMap = {
    health_check: { name: '健康检查', color: 'green', icon: <HeartOutlined /> },
    fault_analysis: { name: '故障分析', color: 'red', icon: <BugOutlined /> },
    performance_analysis: { name: '性能分析', color: 'blue', icon: <BarChartOutlined /> },
    security_scan: { name: '安全扫描', color: 'orange', icon: <SafetyCertificateOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('tasks.collections.status.active') },
      paused: { color: 'orange', text: t('tasks.collections.status.paused') },
      draft: { color: 'gray', text: t('tasks.collections.status.draft') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTask = (task: TaskCollection) => {
    setEditingTask(task);
    form.setFieldsValue({
      name: task.name,
      description: task.description,
      schedule: task.schedule,
    });
    setModalVisible(true);
  };

  const handleViewTask = (task: TaskCollection) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  const handleStartTask = (taskId: string) => {
    message.success(t('tasks.collections.messages.startSuccess'));
  };

  const handlePauseTask = (taskId: string) => {
    message.success(t('tasks.collections.messages.pauseSuccess'));
  };

  const handleDeleteTask = (taskId: string) => {
    message.success(t('tasks.collections.messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        message.success(t('tasks.collections.messages.updateSuccess'));
      } else {
        message.success(t('tasks.collections.messages.createSuccess'));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderTaskCards = () => {
    return taskCollectionData.map(task => {
      const entityCount = task.targets.filter(t => t.type === 'entity').length;
      const sequenceCount = task.targets.filter(t => t.type === 'sequence').length;
      const totalActions = task.targets.reduce((sum, t) => sum + t.actions.length, 0);

      return (
        <Col xs={24} sm={12} lg={8} xl={6} key={task.id}>
          <TaskCard
            title={
              <Space>
                <UnorderedListOutlined style={{ color: '#1890ff' }} />
                <span>{task.name}</span>
                {getStatusTag(task.status)}
              </Space>
            }
            extra={
              <Space>
                <Tooltip title={t('tasks.collections.card.viewDetails')}>
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewTask(task);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('tasks.collections.card.edit')}>
                  <Button 
                    type="link" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTask(task);
                    }}
                  />
                </Tooltip>
                {task.status === 'active' ? (
                  <Tooltip title={t('tasks.collections.card.pause')}>
                    <Button 
                      type="link" 
                      icon={<PauseCircleOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePauseTask(task.id);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={t('tasks.collections.card.start')}>
                    <Button 
                      type="link" 
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
            }
            onClick={() => handleViewTask(task)}
          >
            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                <Tag icon={<NodeIndexOutlined />} color="blue">
                  {entityCount}{t('tasks.collections.card.entities')}
                </Tag>
                <Tag icon={<ControlOutlined />} color="green">
                  {sequenceCount}{t('tasks.collections.card.sequences')}
                </Tag>
                <Tag icon={<MonitorOutlined />} color="orange">
                  {totalActions}{t('tasks.collections.card.actions')}
                </Tag>
              </Space>
            </div>
            
            <Paragraph 
              ellipsis={{ rows: 2 }} 
              style={{ marginBottom: 16, minHeight: 40 }}
            >
              {task.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={t('tasks.collections.card.successRate')}
                    value={task.successRate}
                    suffix="%"
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('tasks.collections.card.executionCount')}
                    value={task.totalRuns}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Text strong>{t('tasks.collections.card.successRate')}: </Text>
              <Progress 
                percent={task.successRate} 
                size="small"
                strokeColor={task.successRate > 95 ? '#52c41a' : '#faad14'}
              />
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>{t('tasks.collections.card.schedule')}: {task.schedule}</div>
              <div>{t('tasks.collections.card.nextExecution')}: {task.nextRun}</div>
              <div>{t('tasks.collections.card.creator')}: {task.createdBy}</div>
            </div>
          </TaskCard>
        </Col>
      );
    });
  };

  const activeTasks = taskCollectionData.filter(task => task.status === 'active').length;
  const totalTargets = taskCollectionData.reduce((sum, task) => sum + task.targets.length, 0);
  const totalActions = taskCollectionData.reduce((sum, task) => 
    sum + task.targets.reduce((actionSum, target) => actionSum + target.actions.length, 0), 0
  );
  const avgSuccessRate = taskCollectionData.reduce((sum, task) => sum + task.successRate, 0) / taskCollectionData.length;

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <UnorderedListOutlined style={{ color: '#1890ff' }} />
                {t('tasks.collections.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('tasks.collections.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('tasks.collections.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
              {t('tasks.collections.createCollection')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.collections.stats.totalCollections')}
              value={taskCollectionData.length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<UnorderedListOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.collections.stats.activeCollections')}
              value={activeTasks}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.collections.stats.totalTasks')}
              value={totalTargets}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#faad14' }}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.collections.stats.executionRate')}
              value={avgSuccessRate.toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('tasks.collections.search.placeholder')}
        filters={[
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('tasks.collections.filter.status'),
            width: 100,
            options: [
              { value: 'all', label: t('tasks.collections.filter.allStatus') },
              { value: 'active', label: t('tasks.collections.status.active') },
              { value: 'paused', label: t('tasks.collections.status.paused') },
              { value: 'draft', label: t('tasks.collections.status.draft') }
            ]
          },
          {
            key: 'frequency',
            value: filterFrequency,
            onChange: setFilterFrequency,
            placeholder: t('tasks.collections.filter.frequency'),
            width: 120,
            options: [
              { value: 'all', label: t('tasks.collections.filter.allFrequency') },
              { value: '5min', label: t('tasks.collections.frequency.every5min') },
              { value: '15min', label: t('tasks.collections.frequency.every15min') },
              { value: '1hour', label: t('tasks.collections.frequency.everyHour') },
              { value: '1day', label: t('tasks.collections.frequency.everyDay') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 任务集合卡片列表 */}
      <Row gutter={16}>
        {renderTaskCards()}
      </Row>

      {/* 创建/编辑任务集合模态框 */}
      <Modal
        title={editingTask ? t('tasks.collections.editTitle') : t('tasks.collections.createTitle')}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            schedule: '每15分钟',
          }}
        >
          <Form.Item
            name="name"
            label={t('tasks.collections.form.name')}
            rules={[
              { required: true, message: t('tasks.collections.form.nameRequired') },
              { max: 50, message: t('tasks.collections.form.nameMaxLength') }
            ]}
          >
            <Input placeholder={t('tasks.collections.form.namePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('tasks.collections.form.description')}
            rules={[
              { required: true, message: t('tasks.collections.form.descriptionRequired') },
              { max: 200, message: t('tasks.collections.form.descriptionMaxLength') }
            ]}
          >
            <TextArea 
              rows={3} 
              placeholder={t('tasks.collections.form.descriptionPlaceholder')}
            />
          </Form.Item>

          <Form.Item
            name="schedule"
            label={t('tasks.collections.form.schedule')}
            rules={[{ required: true, message: t('tasks.collections.form.scheduleRequired') }]}
          >
            <Select placeholder={t('tasks.collections.form.schedulePlaceholder')}>
              <Option value="每5分钟">{t('tasks.collections.frequency.every5min')}</Option>
              <Option value="每15分钟">{t('tasks.collections.frequency.every15min')}</Option>
              <Option value="每30分钟">{t('tasks.collections.frequency.every30min')}</Option>
              <Option value="每小时">{t('tasks.collections.frequency.everyHour')}</Option>
              <Option value="每天">{t('tasks.collections.frequency.everyDay')}</Option>
            </Select>
          </Form.Item>

          <Alert
            message={t('common.tips')}
            description={t('tasks.collections.tips.createHint')}
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>

      {/* 任务集合详情模态框 */}
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
              <Descriptions.Item label={t('tasks.collections.modal.taskName')} span={2}>
                {selectedTask.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.status')}>
                {getStatusTag(selectedTask.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.modal.scheduleFrequency')}>
                {selectedTask.schedule}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.card.successRate')}>
                {selectedTask.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.card.executionCount')}>
                {selectedTask.totalRuns}{t('common.unit.times')}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.modal.lastExecution')}>
                {selectedTask.lastRun}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.card.nextExecution')}>
                {selectedTask.nextRun}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks.collections.card.creator')}>
                {selectedTask.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.createTime')}>
                {selectedTask.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.description')} span={2}>
                {selectedTask.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 监控目标和巡检动作 */}
            <Tabs defaultActiveKey="targets">
              <Tabs.TabPane tab="监控目标" key="targets">
                <Row gutter={16}>
                  {selectedTask.targets.map(target => (
                    <Col xs={24} sm={12} lg={8} key={target.id}>
                      <Card 
                        title={
                          <Space>
                            {target.type === 'entity' ? 
                              <NodeIndexOutlined style={{ color: '#1890ff' }} /> : 
                              <ControlOutlined style={{ color: '#52c41a' }} />
                            }
                            {target.name}
                          </Space>
                        }
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <div style={{ marginBottom: 8 }}>
                          <Tag color={target.type === 'entity' ? 'blue' : 'green'}>
                            {target.type === 'entity' ? '实体' : '时序'}
                          </Tag>
                          <Tag>{target.category}</Tag>
                        </div>
                        <div>
                          <Text strong style={{ fontSize: 12 }}>巡检动作:</Text>
                          <div style={{ marginTop: 4 }}>
                            {target.actions.map(actionId => {
                              const action = inspectionActions.find(a => a.id === actionId);
                              const actionConfig = actionTypeMap[actionId as keyof typeof actionTypeMap];
                              return (
                                <Tag 
                                  key={actionId} 
                                  size="small" 
                                  color={actionConfig?.color}
                                  icon={actionConfig?.icon}
                                  style={{ marginBottom: 4 }}
                                >
                                  {actionConfig?.name}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="巡检动作" key="actions">
                <Row gutter={16}>
                  {inspectionActions.map(action => {
                    const actionConfig = actionTypeMap[action.type];
                    const isUsed = selectedTask.targets.some(target => 
                      target.actions.includes(action.id)
                    );
                    
                    return (
                      <Col xs={24} sm={12} lg={8} key={action.id}>
                        <Card 
                          title={
                            <Space>
                              {actionConfig?.icon}
                              {action.name}
                              {isUsed && <Badge status="success" text="使用中" />}
                            </Space>
                          }
                          size="small"
                          style={{ 
                            marginBottom: 16,
                            opacity: isUsed ? 1 : 0.6
                          }}
                        >
                          <div style={{ marginBottom: 8 }}>
                            <Tag color={actionConfig?.color}>
                              {actionConfig?.name}
                            </Tag>
                          </div>
                          <Paragraph style={{ fontSize: 12, marginBottom: 8 }}>
                            {action.description}
                          </Paragraph>
                          <div style={{ fontSize: 11, color: '#666' }}>
                            <div>{t('tasks.collections.detail.duration')}: {action.duration}</div>
                            <div>{t('tasks.collections.detail.suggestedFrequency')}: {action.frequency}</div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default TaskCollectionManagement;
