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
import styled from 'styled-components';
import { setPageTitle } from '../../utils';

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
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle('任务集合');
  }, []);

  // 巡检动作定义
  const inspectionActions: InspectionAction[] = [
    {
      id: 'health_check',
      name: '健康检查',
      type: 'health_check',
      description: '检查目标的运行状态和健康指标',
      duration: '1-3分钟',
      frequency: '每5分钟'
    },
    {
      id: 'fault_analysis',
      name: '故障分析',
      type: 'fault_analysis',
      description: '分析目标的异常情况和潜在故障',
      duration: '3-10分钟',
      frequency: '每30分钟'
    },
    {
      id: 'performance_analysis',
      name: '性能分析',
      type: 'performance_analysis',
      description: '分析目标的性能指标和瓶颈',
      duration: '5-15分钟',
      frequency: '每小时'
    },
    {
      id: 'security_scan',
      name: '安全扫描',
      type: 'security_scan',
      description: '扫描目标的安全漏洞和风险',
      duration: '10-30分钟',
      frequency: '每天'
    }
  ];

  // 可选的实体和时序
  const availableEntities = [
    { id: 'user_service', name: '用户服务', category: '微服务' },
    { id: 'order_service', name: '订单服务', category: '微服务' },
    { id: 'payment_service', name: '支付服务', category: '微服务' },
    { id: 'database_cluster', name: '数据库集群', category: '数据存储' },
    { id: 'redis_cache', name: 'Redis缓存', category: '缓存服务' },
    { id: 'api_gateway', name: 'API网关', category: '网关服务' }
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
      active: { color: 'green', text: '运行中' },
      paused: { color: 'orange', text: '已暂停' },
      draft: { color: 'gray', text: '草稿' },
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
    message.success('任务集合启动成功');
  };

  const handlePauseTask = (taskId: string) => {
    message.success('任务集合暂停成功');
  };

  const handleDeleteTask = (taskId: string) => {
    message.success('任务集合删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        message.success('任务集合更新成功');
      } else {
        message.success('任务集合创建成功');
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
                <Tooltip title="查看详情">
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
                <Tooltip title="编辑">
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
                  <Tooltip title="暂停">
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
                  <Tooltip title="启动">
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
                  {entityCount}个实体
                </Tag>
                <Tag icon={<ControlOutlined />} color="green">
                  {sequenceCount}个时序
                </Tag>
                <Tag icon={<MonitorOutlined />} color="orange">
                  {totalActions}个动作
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
                    title="成功率"
                    value={task.successRate}
                    suffix="%"
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="执行次数"
                    value={task.totalRuns}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Text strong>成功率: </Text>
              <Progress 
                percent={task.successRate} 
                size="small"
                strokeColor={task.successRate > 95 ? '#52c41a' : '#faad14'}
              />
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>调度: {task.schedule}</div>
              <div>下次执行: {task.nextRun}</div>
              <div>创建者: {task.createdBy}</div>
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
                任务集合
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              管理和执行对多个实体和时序的巡检任务，支持健康检查、故障分析、性能分析等操作。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
              创建任务集合
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="任务集合总数"
              value={taskCollectionData.length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<UnorderedListOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="运行中任务"
              value={activeTasks}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="监控目标"
              value={totalTargets}
              suffix="个"
              valueStyle={{ color: '#faad14' }}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平均成功率"
              value={avgSuccessRate.toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <Card style={{ marginBottom: 24 }}>
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="搜索任务集合名称、描述..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="状态"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="active">运行中</Option>
                <Option value="paused">已暂停</Option>
                <Option value="draft">草稿</Option>
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="调度频率"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="5min">每5分钟</Option>
                <Option value="15min">每15分钟</Option>
                <Option value="1hour">每小时</Option>
                <Option value="1day">每天</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>
      </Card>

      {/* 任务集合卡片列表 */}
      <Row gutter={16}>
        {renderTaskCards()}
      </Row>

      {/* 创建/编辑任务集合模态框 */}
      <Modal
        title={editingTask ? '编辑任务集合' : '创建任务集合'}
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
            label="任务集合名称"
            rules={[
              { required: true, message: '请输入任务集合名称' },
              { max: 50, message: '名称不能超过50个字符' }
            ]}
          >
            <Input placeholder="请输入任务集合名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[
              { required: true, message: '请输入任务集合描述' },
              { max: 200, message: '描述不能超过200个字符' }
            ]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入任务集合的功能描述"
            />
          </Form.Item>

          <Form.Item
            name="schedule"
            label="调度频率"
            rules={[{ required: true, message: '请选择调度频率' }]}
          >
            <Select placeholder="请选择调度频率">
              <Option value="每5分钟">每5分钟</Option>
              <Option value="每15分钟">每15分钟</Option>
              <Option value="每30分钟">每30分钟</Option>
              <Option value="每小时">每小时</Option>
              <Option value="每天">每天</Option>
            </Select>
          </Form.Item>

          <Alert
            message="提示"
            description="创建任务集合后，可以在详情页面中添加具体的监控目标和巡检动作。"
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
              <Descriptions.Item label="任务名称" span={2}>
                {selectedTask.name}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedTask.status)}
              </Descriptions.Item>
              <Descriptions.Item label="调度频率">
                {selectedTask.schedule}
              </Descriptions.Item>
              <Descriptions.Item label="成功率">
                {selectedTask.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label="执行次数">
                {selectedTask.totalRuns}次
              </Descriptions.Item>
              <Descriptions.Item label="上次执行">
                {selectedTask.lastRun}
              </Descriptions.Item>
              <Descriptions.Item label="下次执行">
                {selectedTask.nextRun}
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedTask.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedTask.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
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
                            <div>执行时长: {action.duration}</div>
                            <div>建议频率: {action.frequency}</div>
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
