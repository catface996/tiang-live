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
  TimePicker
} from 'antd';
import { 
  ApiOutlined, 
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
  LinkOutlined,
  ThunderboltOutlined,
  BellOutlined,
  CodeOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  HistoryOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../../utils';

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

const HookCard = styled(Card)`
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

interface HookTask {
  id: string;
  name: string;
  description: string;
  type: 'webhook' | 'database' | 'message_queue' | 'api_call' | 'script';
  trigger: {
    events: string[];
    conditions: string[];
    filters: any;
  };
  taskCollections: string[]; // 改为触发的任务集合列表
  config: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    payload?: any;
    timeout: number;
    retryCount: number;
    retryDelay: number;
  };
  status: 'active' | 'inactive' | 'error';
  statistics: {
    totalTriggers: number;
    successCount: number;
    failureCount: number;
    avgResponseTime: number;
    successRate: number;
  };
  lastExecution: {
    timestamp: string;
    status: 'success' | 'failed' | 'timeout';
    responseTime: number;
    response?: any;
    error?: string;
  };
  security: {
    authentication: string;
    encryption: boolean;
    ipWhitelist: string[];
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const HookTasks: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingHook, setEditingHook] = useState<HookTask | null>(null);
  const [selectedHook, setSelectedHook] = useState<HookTask | null>(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('tasks.hooks.title'));
  }, [t]);

  // Hook任务数据
  const hookTaskData: HookTask[] = [
    {
      id: '1',
      name: '告警通知Hook',
      description: '当系统出现告警事件时，自动触发告警处理任务集合，执行通知和响应动作',
      type: 'webhook',
      trigger: {
        events: ['alert.created', 'alert.resolved'],
        conditions: ['severity >= high'],
        filters: { services: ['user-service', 'order-service'] }
      },
      taskCollections: ['告警处理任务集', '通知发送任务集'],
      config: {
        url: 'https://hooks.slack.com/services/xxx',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        payload: {
          text: '{{alert.message}}',
          channel: '#alerts',
          username: 'AlertBot'
        },
        timeout: 10,
        retryCount: 3,
        retryDelay: 5
      },
      status: 'active',
      statistics: {
        totalTriggers: 1247,
        successCount: 1198,
        failureCount: 49,
        avgResponseTime: 245,
        successRate: 96.1
      },
      lastExecution: {
        timestamp: '2024-06-15 14:25:30',
        status: 'success',
        responseTime: 180,
        response: { ok: true, message: 'Task collections executed successfully' }
      },
      security: {
        authentication: 'bearer_token',
        encryption: true,
        ipWhitelist: ['10.0.0.0/8', '172.16.0.0/12']
      },
      createdBy: '运维工程师',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14'
    },
    {
      id: '2',
      name: '数据同步Hook',
      description: '当用户信息更新时，触发数据同步任务集合，执行数据仓库和缓存系统的同步',
      type: 'database',
      trigger: {
        events: ['user.updated', 'user.created'],
        conditions: ['user.status == active'],
        filters: { departments: ['engineering', 'product'] }
      },
      taskCollections: ['数据同步任务集', '缓存更新任务集'],
      config: {
        timeout: 30,
        retryCount: 2,
        retryDelay: 10
      },
      status: 'active',
      statistics: {
        totalTriggers: 856,
        successCount: 834,
        failureCount: 22,
        avgResponseTime: 1200,
        successRate: 97.4
      },
      lastExecution: {
        timestamp: '2024-06-15 14:20:15',
        status: 'success',
        responseTime: 980
      },
      security: {
        authentication: 'database_credentials',
        encryption: true,
        ipWhitelist: ['192.168.1.0/24']
      },
      createdBy: '数据工程师',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13'
    },
    {
      id: '3',
      name: '订单状态变更Hook',
      description: '订单状态变更时，触发订单处理任务集合，执行下游业务处理和通知',
      type: 'message_queue',
      trigger: {
        events: ['order.status_changed'],
        conditions: ['order.status in [paid, shipped, delivered]'],
        filters: { amount: { gte: 100 } }
      },
      taskCollections: ['订单处理任务集', '业务通知任务集'],
      config: {
        timeout: 15,
        retryCount: 5,
        retryDelay: 3
      },
      status: 'active',
      statistics: {
        totalTriggers: 2341,
        successCount: 2298,
        failureCount: 43,
        avgResponseTime: 85,
        successRate: 98.2
      },
      lastExecution: {
        timestamp: '2024-06-15 14:30:45',
        status: 'success',
        responseTime: 65
      },
      security: {
        authentication: 'api_key',
        encryption: false,
        ipWhitelist: []
      },
      createdBy: '业务开发',
      createdAt: '2024-05-20',
      lastModified: '2024-06-10'
    }
  ];

  const hookTypeMap = {
    webhook: { name: t('tasks.hooks.types.webhook'), color: 'blue', icon: <LinkOutlined /> },
    database: { name: t('tasks.hooks.types.database'), color: 'green', icon: <DatabaseOutlined /> },
    message_queue: { name: t('tasks.hooks.types.messageQueue'), color: 'orange', icon: <BellOutlined /> },
    api_call: { name: 'API', color: 'purple', icon: <ApiOutlined /> },
    script: { name: 'Script', color: 'cyan', icon: <CodeOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('tasks.hooks.status.active') },
      inactive: { color: 'orange', text: t('tasks.hooks.status.inactive') },
      error: { color: 'red', text: t('tasks.hooks.status.error') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getExecutionStatusTag = (status: string) => {
    const statusMap = {
      success: { color: 'green', text: t('common.success') },
      failed: { color: 'red', text: t('tasks.hooks.status.error') },
      timeout: { color: 'orange', text: t('common.timeout') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateHook = () => {
    setEditingHook(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditHook = (hook: HookTask) => {
    setEditingHook(hook);
    form.setFieldsValue({
      name: hook.name,
      description: hook.description,
      type: hook.type,
      timeout: hook.config.timeout,
      retryCount: hook.config.retryCount,
      retryDelay: hook.config.retryDelay,
    });
    setModalVisible(true);
  };

  const handleViewHook = (hook: HookTask) => {
    setSelectedHook(hook);
    setDetailModalVisible(true);
  };

  const handleToggleHook = (hookId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const messageKey = newStatus === 'active' ? 'enableSuccess' : 'disableSuccess';
    message.success(t(`tasks.hooks.messages.${messageKey}`));
  };

  const handleDeleteHook = (hookId: string) => {
    message.success(t('tasks.hooks.messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingHook) {
        message.success(t('tasks.hooks.messages.updateSuccess'));
      } else {
        message.success(t('tasks.hooks.messages.createSuccess'));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ApiOutlined style={{ color: '#1890ff' }} />
                {t('tasks.hooks.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('tasks.hooks.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('tasks.hooks.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateHook}>
              {t('tasks.hooks.createHook')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.hooks.stats.totalHooks')}
              value={hookTaskData.length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.hooks.stats.activeHooks')}
              value={hookTaskData.filter(h => h.status === 'active').length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.hooks.card.triggerCount')}
              value={hookTaskData.reduce((sum, h) => sum + h.statistics.totalTriggers, 0)}
              valueStyle={{ color: '#faad14' }}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('tasks.hooks.stats.successRate')}
              value={(hookTaskData.reduce((sum, h) => sum + h.statistics.successRate, 0) / hookTaskData.length).toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
              prefix={<MonitorOutlined />}
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
                placeholder={t('tasks.hooks.search.placeholder')}
                prefix={<ApiOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="Hook类型"
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(hookTypeMap).map(([key, config]) => (
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
                <Option value="active">活跃</Option>
                <Option value="inactive">停用</Option>
                <Option value="error">错误</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>
      </Card>

      {/* Hook任务卡片列表 */}
      <Row gutter={16}>
        {hookTaskData.map(hook => {
          const typeConfig = hookTypeMap[hook.type];
          const totalCollections = hook.taskCollections.length;
          return (
            <Col xs={24} sm={12} lg={8} xl={6} key={hook.id}>
              <HookCard
                title={
                  <Space>
                    {typeConfig?.icon}
                    <span>{hook.name}</span>
                    {getStatusTag(hook.status)}
                  </Space>
                }
                extra={
                  <Space>
                    <Tooltip title={t('tasks.hooks.card.viewDetails')}>
                      <Button 
                        type="link" 
                        icon={<EyeOutlined />} 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewHook(hook);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={t('tasks.hooks.card.edit')}>
                      <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditHook(hook);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={hook.status === 'active' ? t('tasks.hooks.card.disable') : t('tasks.hooks.card.enable')}>
                      <Button 
                        type="link" 
                        icon={hook.status === 'active' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleHook(hook.id, hook.status);
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                onClick={() => handleViewHook(hook)}
              >
                <div style={{ marginBottom: 12 }}>
                  <Space wrap>
                    <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                      {typeConfig?.name}
                    </Tag>
                    <Tag icon={<BellOutlined />}>
                      {hook.trigger.events.length}{t('common.unit.events')}
                    </Tag>
                    <Tag icon={<MonitorOutlined />}>
                      {totalCollections}{t('tasks.hooks.card.taskCollections')}
                    </Tag>
                  </Space>
                </div>
                
                <Paragraph 
                  ellipsis={{ rows: 2 }} 
                  style={{ marginBottom: 16, minHeight: 40 }}
                >
                  {hook.description}
                </Paragraph>

                <div style={{ marginBottom: 12 }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title={t('tasks.hooks.card.successRate')}
                        value={hook.statistics.successRate}
                        suffix="%"
                        valueStyle={{ fontSize: 14 }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title={t('tasks.hooks.card.triggerCount')}
                        value={hook.statistics.totalTriggers}
                        valueStyle={{ fontSize: 14 }}
                      />
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <Text strong>{t('tasks.hooks.card.lastTriggered')}: </Text>
                  {getExecutionStatusTag(hook.lastExecution.status)}
                  <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
                    {hook.lastExecution.responseTime}ms
                  </Text>
                </div>

                <div style={{ fontSize: 12, color: '#666' }}>
                  <div>触发事件: {hook.trigger.events.join(', ')}</div>
                  <div>上次执行: {hook.lastExecution.timestamp}</div>
                </div>
              </HookCard>
            </Col>
          );
        })}
      </Row>

      {/* 创建/编辑Hook任务模态框 */}
      <Modal
        title={editingHook ? t('tasks.hooks.editTitle') : t('tasks.hooks.createTitle')}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'webhook',
            timeout: 10,
            retryCount: 3,
            retryDelay: 5,
          }}
        >
          <Form.Item
            name="name"
            label={t('tasks.hooks.form.name')}
            rules={[{ required: true, message: t('tasks.hooks.form.nameRequired') }]}
          >
            <Input placeholder={t('tasks.hooks.form.namePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('tasks.hooks.form.description')}
            rules={[{ required: true, message: t('tasks.hooks.form.descriptionRequired') }]}
          >
            <TextArea 
              rows={3} 
              placeholder={t('tasks.hooks.form.descriptionPlaceholder')}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Hook类型"
            rules={[{ required: true, message: '请选择Hook类型' }]}
          >
            <Select placeholder="请选择Hook类型">
              <Option value="webhook">Webhook</Option>
              <Option value="database">数据库</Option>
              <Option value="message_queue">消息队列</Option>
              <Option value="api_call">API调用</Option>
              <Option value="script">脚本执行</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="timeout"
                label="超时时间(秒)"
                rules={[{ required: true, message: '请设置超时时间' }]}
              >
                <Input type="number" placeholder="超时时间" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="retryCount"
                label="重试次数"
                rules={[{ required: true, message: '请设置重试次数' }]}
              >
                <Input type="number" placeholder="重试次数" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="retryDelay"
                label="重试延迟(秒)"
                rules={[{ required: true, message: '请设置重试延迟' }]}
              >
                <Input type="number" placeholder="重试延迟" />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message={t('common.tips')}
            description={t('tasks.hooks.tips.createHint')}
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>

      {/* Hook任务详情模态框 */}
      <Modal
        title={selectedHook?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {selectedHook && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Hook名称" span={2}>
                {selectedHook.name}
              </Descriptions.Item>
              <Descriptions.Item label="Hook类型">
                <Tag 
                  color={hookTypeMap[selectedHook.type]?.color}
                  icon={hookTypeMap[selectedHook.type]?.icon}
                >
                  {hookTypeMap[selectedHook.type]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedHook.status)}
              </Descriptions.Item>
              <Descriptions.Item label="成功率">
                {selectedHook.statistics.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label="触发次数">
                {selectedHook.statistics.totalTriggers}次
              </Descriptions.Item>
              <Descriptions.Item label="平均响应时间">
                {selectedHook.statistics.avgResponseTime}ms
              </Descriptions.Item>
              <Descriptions.Item label="上次执行">
                {selectedHook.lastExecution.timestamp}
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedHook.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedHook.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedHook.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="collections">
              <Tabs.TabPane tab="任务集合" key="collections">
                <Card title="触发的任务集合" size="small" style={{ marginBottom: 16 }}>
                  {selectedHook.taskCollections.length > 0 ? (
                    <Space wrap>
                      {selectedHook.taskCollections.map(collection => (
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
              
              <Tabs.TabPane tab="触发配置" key="trigger">
                <Card title="触发事件" size="small" style={{ marginBottom: 16 }}>
                  <Space wrap>
                    {selectedHook.trigger.events.map(event => (
                      <Tag key={event} color="blue">{event}</Tag>
                    ))}
                  </Space>
                </Card>
                <Card title="触发条件" size="small">
                  <Space wrap>
                    {selectedHook.trigger.conditions.map(condition => (
                      <Tag key={condition} color="green">{condition}</Tag>
                    ))}
                  </Space>
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="执行配置" key="config">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label="超时时间">
                    {selectedHook.config.timeout}秒
                  </Descriptions.Item>
                  <Descriptions.Item label="重试次数">
                    {selectedHook.config.retryCount}次
                  </Descriptions.Item>
                  <Descriptions.Item label="重试延迟">
                    {selectedHook.config.retryDelay}秒
                  </Descriptions.Item>
                  {selectedHook.config.url && (
                    <Descriptions.Item label="目标URL" span={2}>
                      <Text code>{selectedHook.config.url}</Text>
                    </Descriptions.Item>
                  )}
                  {selectedHook.config.method && (
                    <Descriptions.Item label="HTTP方法">
                      <Tag color="blue">{selectedHook.config.method}</Tag>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Tabs.TabPane>

              <Tabs.TabPane tab="安全配置" key="security">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label="认证方式">
                    {selectedHook.security.authentication}
                  </Descriptions.Item>
                  <Descriptions.Item label="加密传输">
                    {selectedHook.security.encryption ? '是' : '否'}
                  </Descriptions.Item>
                  <Descriptions.Item label="IP白名单" span={2}>
                    {selectedHook.security.ipWhitelist.length > 0 ? (
                      <Space wrap>
                        {selectedHook.security.ipWhitelist.map(ip => (
                          <Tag key={ip}>{ip}</Tag>
                        ))}
                      </Space>
                    ) : (
                      <Text type="secondary">无限制</Text>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default HookTasks;
