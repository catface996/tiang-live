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
  Alert
} from 'antd';
import { 
  ApiOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  MonitorOutlined,
  LinkOutlined,
  ThunderboltOutlined,
  BellOutlined,
  CodeOutlined,
  DatabaseOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import '../../../styles/hook-tasks.css';

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
  min-height: 340px;
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
    min-height: 300px;
    
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

const HookCardsContainer = styled.div`
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
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  const { t } = useTranslation(['hookTasks', 'common']);

  // 认证方式映射
  const getAuthenticationDisplay = (auth: string) => {
    const authMap: Record<string, string> = {
      'bearer_token': t('hookTasks:detail.authTypes.bearerToken'),
      'database_credentials': t('hookTasks:detail.authTypes.databaseCredentials'),
      'api_key': t('hookTasks:detail.authTypes.apiKey'),
      'basic_auth': t('hookTasks:detail.authTypes.basicAuth'),
      'oauth2': t('hookTasks:detail.authTypes.oauth2'),
      'none': t('hookTasks:detail.authTypes.none')
    };
    return authMap[auth] || auth;
  };

  useEffect(() => {
    setPageTitle(t('hookTasks:title'));
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
    webhook: { name: t('hookTasks:types.webhook'), color: 'blue', icon: <LinkOutlined /> },
    database: { name: t('hookTasks:types.database'), color: 'green', icon: <DatabaseOutlined /> },
    message_queue: { name: t('hookTasks:types.message_queue'), color: 'orange', icon: <BellOutlined /> },
    api_call: { name: t('hookTasks:types.api_call'), color: 'purple', icon: <ApiOutlined /> },
    script: { name: t('hookTasks:types.script'), color: 'cyan', icon: <CodeOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('hookTasks:status.active') },
      inactive: { color: 'orange', text: t('hookTasks:status.inactive') },
      error: { color: 'red', text: t('hookTasks:status.error') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getExecutionStatusTag = (status: string) => {
    const statusMap = {
      success: { color: 'green', text: t('common:success') },
      failed: { color: 'red', text: t('hookTasks:status.error') },
      timeout: { color: 'orange', text: t('common:timeout') }
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
      retryDelay: hook.config.retryDelay
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
    message.success(t('hookTasks:messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingHook) {
        message.success(t('hookTasks:messages.updateSuccess'));
      } else {
        message.success(t('hookTasks:messages.createSuccess'));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <PageContainer className="hook-tasks-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <ApiOutlined style={{ color: '#1890ff' }} />
                {t('hookTasks:title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('hookTasks:subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('hookTasks:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateHook}>
              {t('hookTasks:createHook')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="hook-stats-primary">
            <Statistic
              title={t('hookTasks:stats.totalHooks')}
              value={hookTaskData.length}
              suffix={t('common:unit.count')}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="hook-stats-success">
            <Statistic
              title={t('hookTasks:stats.activeHooks')}
              value={hookTaskData.filter(h => h.status === 'active').length}
              suffix={t('common:unit.count')}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="hook-stats-warning">
            <Statistic
              title={t('hookTasks:card.triggerCount')}
              value={hookTaskData.reduce((sum, h) => sum + h.statistics.totalTriggers, 0)}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="hook-stats-purple">
            <Statistic
              title={t('hookTasks:stats.successRate')}
              value={(hookTaskData.reduce((sum, h) => sum + h.statistics.successRate, 0) / hookTaskData.length).toFixed(1)}
              suffix="%"
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('hookTasks:search.placeholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('hookTasks:search.type'),
            width: 120,
            options: [
              { value: 'all', label: t('hookTasks:search.allTypes') },
              ...Object.entries(hookTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('hookTasks:search.status'),
            width: 100,
            options: [
              { value: 'all', label: t('hookTasks:search.allStatuses') },
              { value: 'active', label: t('hookTasks:status.active') },
              { value: 'inactive', label: t('hookTasks:status.inactive') },
              { value: 'error', label: t('hookTasks:status.error') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* Hook任务卡片列表 */}
      <HookCardsContainer>
        <Row gutter={[16, 16]}>
          {hookTaskData.map(hook => {
            const typeConfig = hookTypeMap[hook.type];
            const totalCollections = hook.taskCollections.length;
            return (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={hook.id}>
                <HookCard
                  title={
                    <div className="card-title">
                      <div className="title-left">
                        <Space>
                          {typeConfig?.icon}
                          <span>{hook.name}</span>
                        </Space>
                      </div>
                      <div className="title-right">
                        {getStatusTag(hook.status)}
                      </div>
                    </div>
                  }
                  onClick={() => handleViewHook(hook)}
                >
                  {/* Hook类型和事件标签 */}
                  <div style={{ marginBottom: 12 }}>
                    <Space wrap size="small">
                      <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                        {typeConfig?.name}
                      </Tag>
                      <Tag icon={<BellOutlined />}>
                        {hook.trigger.events.length}{t('common:unit.events')}
                      </Tag>
                      <Tag icon={<MonitorOutlined />}>
                        {totalCollections}{t('hookTasks:card.taskCollections')}
                      </Tag>
                    </Space>
                  </div>
                
                  {/* Hook描述 */}
                  <div style={{ marginBottom: 16, flex: 1 }}>
                    <Paragraph 
                      ellipsis={{ rows: 2, tooltip: hook.description }} 
                      style={{ marginBottom: 0, minHeight: 44, fontSize: 13, lineHeight: '1.5' }}
                    >
                      {hook.description}
                    </Paragraph>
                  </div>

                  {/* 统计信息 */}
                  <div style={{ marginBottom: 12 }}>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Statistic
                          title={t('hookTasks:card.successRate')}
                          value={hook.statistics.successRate}
                          suffix="%"
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title={t('hookTasks:card.triggerCount')}
                          value={hook.statistics.totalTriggers}
                        />
                      </Col>
                    </Row>
                  </div>

                  {/* 最后触发状态 - 水平排列 */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text strong style={{ fontSize: 12 }}>{t('hookTasks:card.lastTriggered')}</Text>
                        {getExecutionStatusTag(hook.lastExecution.status)}
                      </div>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {hook.lastExecution.responseTime}ms
                      </Text>
                    </div>
                  </div>

                  {/* 触发信息 */}
                  <div style={{ fontSize: 11, color: '#666', lineHeight: '1.4', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <Text>{t('hookTasks:card.triggerEvent')}: </Text>
                      <Text>{hook.trigger.events.join(', ')}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{t('hookTasks:card.lastTriggered')}: </Text>
                      <Text>{hook.lastExecution.timestamp}</Text>
                    </div>
                  </div>
                
                  {/* 操作按钮区域 - 单独一行 */}
                  <div className="card-actions">
                    <Space>
                      <Tooltip title={t('hookTasks:card.viewDetails')}>
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />} 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewHook(hook);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={t('hookTasks:card.edit')}>
                        <Button 
                          type="text" 
                          icon={<EditOutlined />} 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditHook(hook);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={hook.status === 'active' ? t('hookTasks:card.disable') : t('hookTasks:card.enable')}>
                        <Button 
                          type="text" 
                          icon={hook.status === 'active' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleHook(hook.id, hook.status);
                          }}
                        />
                      </Tooltip>
                    </Space>
                  </div>
                </HookCard>
              </Col>
            );
          })}
        </Row>
      </HookCardsContainer>

      {/* 创建/编辑Hook任务模态框 */}
      <Modal
        title={editingHook ? t('hookTasks:editTitle') : t('hookTasks:createTitle')}
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
            retryDelay: 5
          }}
        >
          <Form.Item
            name="name"
            label={t('hookTasks:form.name')}
            rules={[{ required: true, message: t('hookTasks:form.nameRequired') }]}
          >
            <Input placeholder={t('hookTasks:form.namePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('hookTasks:form.description')}
            rules={[{ required: true, message: t('hookTasks:form.descriptionRequired') }]}
          >
            <TextArea 
              rows={3} 
              placeholder={t('hookTasks:form.descriptionPlaceholder')}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={t('hookTasks:form.type')}
            rules={[{ required: true, message: t('hookTasks:form.typeRequired') }]}
          >
            <Select placeholder={t('hookTasks:form.typePlaceholder')}>
              <Option value="webhook">{t('hookTasks:types.webhook')}</Option>
              <Option value="database">{t('hookTasks:types.database')}</Option>
              <Option value="message_queue">{t('hookTasks:types.message_queue')}</Option>
              <Option value="api_call">API</Option>
              <Option value="script">Script</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="timeout"
                label={t('hookTasks:form.timeout')}
                rules={[{ required: true, message: t('hookTasks:form.timeoutRequired') }]}
              >
                <Input type="number" placeholder={t('hookTasks:form.timeoutPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="retryCount"
                label={t('common:retryCount')}
                rules={[{ required: true, message: t('common:retryCountRequired') }]}
              >
                <Input type="number" placeholder={t('common:retryCountPlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="retryDelay"
                label={t('hookTasks:form.retryDelay')}
                rules={[{ required: true, message: t('hookTasks:form.retryDelayRequired') }]}
              >
                <Input type="number" placeholder={t('hookTasks:form.retryDelayPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message={t('common:tips')}
            description={t('hookTasks:tips.createHint')}
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
              <Descriptions.Item label={t('hookTasks:modal.hookName')} span={2}>
                {selectedHook.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('hookTasks:modal.hookType')}>
                <Tag 
                  color={hookTypeMap[selectedHook.type]?.color}
                  icon={hookTypeMap[selectedHook.type]?.icon}
                >
                  {hookTypeMap[selectedHook.type]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('common:status')}>
                {getStatusTag(selectedHook.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('hookTasks:card.successRate')}>
                {selectedHook.statistics.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label={t('hookTasks:card.triggerCount')}>
                {selectedHook.statistics.totalTriggers}{t('common:unit.times')}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:avgResponseTime')}>
                {selectedHook.statistics.avgResponseTime}ms
              </Descriptions.Item>
              <Descriptions.Item label={t('hookTasks:card.lastTriggered')}>
                {selectedHook.lastExecution.timestamp}
              </Descriptions.Item>
              <Descriptions.Item label={t('hookTasks:card.creator')}>
                {selectedHook.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:createdAt')}>
                {selectedHook.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('common:description')} span={2}>
                {selectedHook.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="collections">
              <Tabs.TabPane tab={t('hookTasks:modal.taskCollections')} key="collections">
                <Card title={t('hookTasks:modal.triggeredCollections')} size="small" style={{ marginBottom: 16 }}>
                  {selectedHook.taskCollections.length > 0 ? (
                    <Space wrap>
                      {selectedHook.taskCollections.map(collection => (
                        <Tag key={collection} icon={<UnorderedListOutlined />} color="blue">
                          {collection}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">{t('hookTasks:modal.noCollections')}</Text>
                  )}
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={t('hookTasks:modal.triggerConfig')} key="trigger">
                <Card title={t('hookTasks:modal.triggerEvent')} size="small" style={{ marginBottom: 16 }}>
                  <Space wrap>
                    {selectedHook.trigger.events.map(event => (
                      <Tag key={event} color="blue">{event}</Tag>
                    ))}
                  </Space>
                </Card>
                <Card title={t('hookTasks:modal.triggerConditions')} size="small">
                  <Space wrap>
                    {selectedHook.trigger.conditions.map(condition => (
                      <Tag key={condition} color="green">{condition}</Tag>
                    ))}
                  </Space>
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={t('hookTasks:modal.executionConfig')} key="config">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label={t('common:timeout')}>
                    {selectedHook.config.timeout}{t('common:unit.seconds')}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('common:retryCount')}>
                    {selectedHook.config.retryCount}{t('common:unit.times')}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('hookTasks:detail.retryDelay')}>
                    {selectedHook.config.retryDelay}{t('hookTasks:detail.seconds')}
                  </Descriptions.Item>
                  {selectedHook.config.url && (
                    <Descriptions.Item label={t('hookTasks:detail.targetUrl')} span={2}>
                      <Text code>{selectedHook.config.url}</Text>
                    </Descriptions.Item>
                  )}
                  {selectedHook.config.method && (
                    <Descriptions.Item label={t('hookTasks:detail.httpMethod')}>
                      <Tag color="blue">{selectedHook.config.method}</Tag>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Tabs.TabPane>

              <Tabs.TabPane tab={t('hookTasks:detail.securityConfig')} key="security">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label={t('hookTasks:detail.authentication')}>
                    {getAuthenticationDisplay(selectedHook.security.authentication)}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('hookTasks:detail.encryption')}>
                    {selectedHook.security.encryption ? t('common:yes') : t('common:no')}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('hookTasks:detail.ipWhitelist')} span={2}>
                    {selectedHook.security.ipWhitelist.length > 0 ? (
                      <Space wrap>
                        {selectedHook.security.ipWhitelist.map(ip => (
                          <Tag key={ip}>{ip}</Tag>
                        ))}
                      </Space>
                    ) : (
                      <Text type="secondary">{t('hookTasks:detail.noRestriction')}</Text>
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
