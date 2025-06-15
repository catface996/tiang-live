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
  Switch,
  Table,
  Tabs,
  Descriptions,
  Progress,
  Tooltip,
  Popconfirm,
  message,
  Alert,
  DatePicker,
  TimePicker,
  Checkbox
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MonitorOutlined,
  HeartOutlined,
  BugOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  NodeIndexOutlined,
  ControlOutlined,
  HistoryOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { setPageTitle } from '../../../utils';

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
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle('巡检任务');
  }, []);

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
    health_check: { name: '健康检查', color: 'green', icon: <HeartOutlined /> },
    performance_monitor: { name: '性能监控', color: 'blue', icon: <BarChartOutlined /> },
    security_scan: { name: '安全扫描', color: 'orange', icon: <SafetyCertificateOutlined /> },
    log_analysis: { name: '日志分析', color: 'purple', icon: <HistoryOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      running: { color: 'green', text: '运行中' },
      paused: { color: 'orange', text: '已暂停' },
      stopped: { color: 'red', text: '已停止' },
      error: { color: 'red', text: '错误' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getLastRunStatusTag = (status: string) => {
    const statusMap = {
      success: { color: 'green', text: '成功' },
      failed: { color: 'red', text: '失败' },
      timeout: { color: 'orange', text: '超时' },
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
      alertThreshold: task.config.alertThreshold,
    });
    setModalVisible(true);
  };

  const handleViewTask = (task: InspectionTask) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  const handleStartTask = (taskId: string) => {
    message.success('巡检任务启动成功');
  };

  const handlePauseTask = (taskId: string) => {
    message.success('巡检任务暂停成功');
  };

  const handleDeleteTask = (taskId: string) => {
    message.success('巡检任务删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        message.success('巡检任务更新成功');
      } else {
        message.success('巡检任务创建成功');
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
        <Col xs={24} sm={12} lg={8} xl={6} key={task.id}>
          <TaskCard
            title={
              <Space>
                {typeConfig?.icon}
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
                {task.status === 'running' ? (
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
                <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                  {typeConfig?.name}
                </Tag>
                <Tag icon={<MonitorOutlined />}>
                  {totalCollections}个任务集合
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
                    value={task.statistics.successRate}
                    suffix="%"
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="执行次数"
                    value={task.statistics.totalRuns}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Text strong>上次执行: </Text>
              {getLastRunStatusTag(task.lastRun.status)}
              <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
                {task.lastRun.duration}s
              </Text>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>调度: {task.schedule.expression}</div>
              <div>下次执行: {task.nextRun}</div>
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
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <SearchOutlined style={{ color: '#1890ff' }} />
                巡检任务
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              管理和执行系统巡检任务，定期触发任务集合执行，支持健康检查、性能监控、安全扫描等多种巡检类型。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
              创建巡检任务
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="任务总数"
              value={inspectionTaskData.length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<SearchOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="运行中任务"
              value={runningTasks}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="任务集合"
              value={totalCollections}
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
                placeholder="搜索巡检任务名称、描述..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="任务类型"
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(taskTypeMap).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {config.icon}
                      {config.name}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="状态"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="running">运行中</Option>
                <Option value="paused">已暂停</Option>
                <Option value="stopped">已停止</Option>
                <Option value="error">错误</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>
      </Card>

      {/* 巡检任务卡片列表 */}
      <Row gutter={16}>
        {renderTaskCards()}
      </Row>

      {/* 创建/编辑巡检任务模态框 */}
      <Modal
        title={editingTask ? '编辑巡检任务' : '创建巡检任务'}
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
            alertThreshold: 80,
          }}
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入巡检任务名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入任务描述' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入巡检任务的功能描述"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="任务类型"
                rules={[{ required: true, message: '请选择任务类型' }]}
              >
                <Select placeholder="请选择巡检类型">
                  <Option value="health_check">健康检查</Option>
                  <Option value="performance_monitor">性能监控</Option>
                  <Option value="security_scan">安全扫描</Option>
                  <Option value="log_analysis">日志分析</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeout"
                label="超时时间(秒)"
                rules={[{ required: true, message: '请设置超时时间' }]}
              >
                <Input type="number" placeholder="请输入超时时间" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="retryCount"
                label="重试次数"
                rules={[{ required: true, message: '请设置重试次数' }]}
              >
                <Input type="number" placeholder="请输入重试次数" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="alertThreshold"
                label="告警阈值(%)"
                rules={[{ required: true, message: '请设置告警阈值' }]}
              >
                <Input type="number" placeholder="请输入告警阈值" />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message="提示"
            description="创建巡检任务后，可以在详情页面中配置具体的任务集合和调度规则。"
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
              <Descriptions.Item label="任务名称" span={2}>
                {selectedTask.name}
              </Descriptions.Item>
              <Descriptions.Item label="任务类型">
                <Tag 
                  color={taskTypeMap[selectedTask.type]?.color}
                  icon={taskTypeMap[selectedTask.type]?.icon}
                >
                  {taskTypeMap[selectedTask.type]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedTask.status)}
              </Descriptions.Item>
              <Descriptions.Item label="成功率">
                {selectedTask.statistics.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label="执行次数">
                {selectedTask.statistics.totalRuns}次
              </Descriptions.Item>
              <Descriptions.Item label="平均耗时">
                {selectedTask.statistics.avgDuration}秒
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

            {/* 详细配置 */}
            <Tabs defaultActiveKey="collections">
              <Tabs.TabPane tab="任务集合" key="collections">
                <Card title="触发的任务集合" size="small">
                  {selectedTask.taskCollections.length > 0 ? (
                    <Space wrap>
                      {selectedTask.taskCollections.map(collection => (
                        <Tag key={collection} icon={<UnorderedListOutlined />} color="blue">
                          {collection}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">无任务集合</Text>
                  )}
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="配置参数" key="config">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label="超时时间">
                    {selectedTask.config.timeout}秒
                  </Descriptions.Item>
                  <Descriptions.Item label="重试次数">
                    {selectedTask.config.retryCount}次
                  </Descriptions.Item>
                  <Descriptions.Item label="告警阈值">
                    {selectedTask.config.alertThreshold}%
                  </Descriptions.Item>
                  <Descriptions.Item label="调度表达式">
                    {selectedTask.schedule.expression}
                  </Descriptions.Item>
                  <Descriptions.Item label="时区">
                    {selectedTask.schedule.timezone}
                  </Descriptions.Item>
                  <Descriptions.Item label="检查点" span={2}>
                    <Space wrap>
                      {selectedTask.config.checkpoints.map(checkpoint => (
                        <Tag key={checkpoint}>{checkpoint}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>

              <Tabs.TabPane tab="执行历史" key="history">
                <Card title="最近执行结果" size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="开始时间">
                      {selectedTask.lastRun.startTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="结束时间">
                      {selectedTask.lastRun.endTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="执行状态">
                      {getLastRunStatusTag(selectedTask.lastRun.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="执行耗时">
                      {selectedTask.lastRun.duration}秒
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
