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
  Table,
  Tag,
  Avatar,
  Progress,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Slider,
  Tabs,
  Tooltip,
  Popconfirm,
  message,
  Descriptions,
  Timeline,
  Alert
} from 'antd';
import { 
  RobotOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SettingOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ApiOutlined,
  MonitorOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import { AIAgentCard } from './components';

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

const AgentCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatusDot = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'running': return '#52c41a';
      case 'stopped': return '#f5222d';
      case 'paused': return '#faad14';
      default: return '#d9d9d9';
    }
  }};
  display: inline-block;
  margin-right: 8px;
`;

interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'stopped' | 'paused';
  description: string;
  version: string;
  cpu: number;
  memory: number;
  tasks: number;
  successRate: number;
  lastActive: string;
  createdAt: string;
  config: {
    maxConcurrency: number;
    timeout: number;
    retryCount: number;
    autoRestart: boolean;
  };
}

const AIAgentManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle(t('agents.title'));
  }, [t]);

  // 模拟AI智能体数据
  const agentData: AIAgent[] = [
    {
      id: '1',
      name: '系统监控智能体',
      type: 'monitor',
      status: 'running',
      description: '负责监控系统健康状态，自动检测异常并发送告警',
      version: 'v2.1.0',
      cpu: 15.6,
      memory: 256,
      tasks: 1247,
      successRate: 98.5,
      lastActive: '2024-06-15 14:30:25',
      createdAt: '2024-05-20',
      config: {
        maxConcurrency: 10,
        timeout: 30,
        retryCount: 3,
        autoRestart: true,
      },
    },
    {
      id: '2',
      name: '日志分析智能体',
      type: 'analysis',
      status: 'running',
      description: '分析系统日志，识别异常模式和潜在问题',
      version: 'v1.8.2',
      cpu: 23.4,
      memory: 512,
      tasks: 856,
      successRate: 96.8,
      lastActive: '2024-06-15 14:28:10',
      createdAt: '2024-04-15',
      config: {
        maxConcurrency: 5,
        timeout: 60,
        retryCount: 2,
        autoRestart: true,
      },
    },
    {
      id: '3',
      name: '自动化部署智能体',
      type: 'deployment',
      status: 'paused',
      description: '自动化应用部署和配置管理',
      version: 'v3.0.1',
      cpu: 8.2,
      memory: 128,
      tasks: 342,
      successRate: 99.2,
      lastActive: '2024-06-15 12:15:30',
      createdAt: '2024-06-01',
      config: {
        maxConcurrency: 3,
        timeout: 120,
        retryCount: 1,
        autoRestart: false,
      },
    },
    {
      id: '4',
      name: '性能优化智能体',
      type: 'optimization',
      status: 'stopped',
      description: '分析系统性能瓶颈，提供优化建议',
      version: 'v1.5.0',
      cpu: 0,
      memory: 0,
      tasks: 128,
      successRate: 94.7,
      lastActive: '2024-06-14 18:45:12',
      createdAt: '2024-03-10',
      config: {
        maxConcurrency: 2,
        timeout: 180,
        retryCount: 3,
        autoRestart: false,
      },
    },
  ];

  const agentTypeMap = {
    monitor: { name: '监控', color: 'blue', icon: <MonitorOutlined /> },
    analysis: { name: '分析', color: 'green', icon: <BarChartOutlined /> },
    deployment: { name: '部署', color: 'purple', icon: <ApiOutlined /> },
    optimization: { name: '优化', color: 'orange', icon: <ThunderboltOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      running: { color: 'green', text: '运行中' },
      stopped: { color: 'red', text: '已停止' },
      paused: { color: 'orange', text: '已暂停' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return (
      <Tag color={config.color}>
        <StatusDot status={status} />
        {config.text}
      </Tag>
    );
  };

  const handleCreateAgent = () => {
    navigate('/ai-agents/create');
  };

  const handleEditAgent = (agent: AIAgent) => {
    navigate(`/ai-agents/edit/${agent.id}`);
  };

  const handleViewAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setDetailModalVisible(true);
  };

  const handleStartAgent = (agentId: string) => {
    message.success('智能体启动成功');
  };

  const handleStopAgent = (agentId: string) => {
    message.success('智能体停止成功');
  };

  const handleDeleteAgent = (agentId: string) => {
    message.success('智能体删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingAgent) {
        message.success('智能体更新成功');
      } else {
        message.success('智能体创建成功');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns = [
    {
      title: '智能体名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AIAgent) => (
        <Space>
          <Avatar 
            icon={<RobotOutlined />} 
            className="agent-avatar"
          />
          <div>
            <div className="font-weight-medium">{text}</div>
            <Text type="secondary" className="font-size-12">
              {record.version}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const config = agentTypeMap[type as keyof typeof agentTypeMap];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {config?.name}
          </Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '资源使用',
      key: 'resources',
      render: (_, record: AIAgent) => (
        <div>
          <div className="margin-bottom-8">
            <Text className="font-size-12">CPU: {record.cpu}%</Text>
            <Progress 
              percent={record.cpu} 
              size="small" 
              showInfo={false}
              strokeColor={record.cpu > 80 ? '#f5222d' : '#52c41a'}
            />
          </div>
          <div>
            <Text className="font-size-12">内存: {record.memory}MB</Text>
          </div>
        </div>
      ),
    },
    {
      title: '任务统计',
      key: 'tasks',
      render: (_, record: AIAgent) => (
        <div>
          <div>执行: {record.tasks}</div>
          <div>
            <Text type="secondary" className="font-size-12">
              成功率: {record.successRate}%
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (time: string) => (
        <Tooltip title={time}>
          <Space>
            <ClockCircleOutlined className="text-secondary" />
            <Text className="font-size-12">
              {new Date(time).toLocaleString('zh-CN')}
            </Text>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: AIAgent) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewAgent(record)}
            />
          </Tooltip>
          <Tooltip title="编辑配置">
            <Button 
              type="link" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditAgent(record)}
            />
          </Tooltip>
          {record.status === 'running' ? (
            <Tooltip title="停止">
              <Button 
                type="link" 
                icon={<PauseCircleOutlined />} 
                size="small"
                onClick={() => handleStopAgent(record.id)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="启动">
              <Button 
                type="link" 
                icon={<PlayCircleOutlined />} 
                size="small"
                onClick={() => handleStartAgent(record.id)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="确定要删除这个智能体吗？"
            description="删除后将无法恢复，请谨慎操作。"
            onConfirm={() => handleDeleteAgent(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button 
                type="link" 
                icon={<DeleteOutlined />} 
                size="small"
                danger
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const renderAgentCards = () => {
    return agentData.map(agent => (
      <Col xs={24} sm={12} lg={8} xl={6} key={agent.id}>
        <AIAgentCard
          agent={{
            ...agent,
            stats: {
              tasksCompleted: agent.tasks,
              successRate: agent.successRate,
              avgResponseTime: Math.floor(Math.random() * 200) + 100,
              uptime: '2天3小时'
            }
          }}
          onEdit={handleEditAgent}
          onDelete={handleDeleteAgent}
          onStart={handleStartAgent}
          onStop={handleStopAgent}
          onView={handleViewAgent}
        />
      </Col>
    ));
  };

  const runningAgents = agentData.filter(agent => agent.status === 'running').length;
  const totalTasks = agentData.reduce((sum, agent) => sum + agent.tasks, 0);
  const avgSuccessRate = agentData.reduce((sum, agent) => sum + agent.successRate, 0) / agentData.length;
  const totalCpu = agentData.reduce((sum, agent) => sum + agent.cpu, 0);

  return (
    <PageContainer>
      <PageHeader>
        <div className="flex-between">
          <div>
            <Title className="page-title margin-0" level={2}>
              <Space>
                <RobotOutlined />
                {t('agents.title')}
              </Space>
            </Title>
            <Paragraph className="page-subtitle">
              {t('agents.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateAgent}>
              {t('agents.createAgent')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} className="margin-bottom-24">
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="stats-card">
            <Statistic
              title="智能体总数"
              value={agentData.length}
              suffix="个"
              valueStyle={{ color: 'var(--primary-color)' }}
              prefix={<RobotOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="stats-card">
            <Statistic
              title="运行中"
              value={runningAgents}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="stats-card">
            <Statistic
              title="总执行任务"
              value={totalTasks}
              suffix="次"
              valueStyle={{ color: '#faad14' }}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="stats-card">
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

      {/* 系统状态提醒 */}
      {totalCpu > 60 && (
        <Alert
          message="系统资源使用率较高"
          description={`当前CPU总使用率为 ${totalCpu.toFixed(1)}%，建议关注系统性能状况。`}
          type="warning"
          showIcon
          closable
          className="margin-bottom-24"
        />
      )}

      {/* 智能体展示 */}
      <Tabs 
        defaultActiveKey="cards" 
        className="margin-bottom-24"
        items={[
          {
            key: 'cards',
            label: '卡片视图',
            children: (
              <Row gutter={16}>
                {renderAgentCards()}
              </Row>
            )
          },
          {
            key: 'table',
            label: '列表视图',
            children: (
              <Card>
                <div className="margin-bottom-16">
                  <Input
                    placeholder="搜索智能体名称、类型..."
                    prefix={<SearchOutlined />}
                    allowClear
                    className="search-input"
                  />
                </div>
                <Table
                  columns={columns}
                  dataSource={agentData}
                  loading={loading}
                  rowKey="id"
                  pagination={{
                    total: agentData.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
                  }}
                />
              </Card>
            )
          }
        ]}
      />

      {/* 创建/编辑智能体模态框 */}
      <Modal
        title={editingAgent ? '编辑智能体' : '创建智能体'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'monitor',
            maxConcurrency: 5,
            timeout: 60,
            retryCount: 3,
            autoRestart: true,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="智能体名称"
                rules={[
                  { required: true, message: '请输入智能体名称' },
                  { max: 50, message: '名称不能超过50个字符' }
                ]}
              >
                <Input placeholder="请输入智能体名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="智能体类型"
                rules={[{ required: true, message: '请选择智能体类型' }]}
              >
                <Select placeholder="请选择类型">
                  {Object.entries(agentTypeMap).map(([key, config]) => (
                    <Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.name}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="描述"
            rules={[
              { required: true, message: '请输入智能体描述' },
              { max: 200, message: '描述不能超过200个字符' }
            ]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入智能体的功能描述"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maxConcurrency"
                label="最大并发数"
                rules={[{ required: true, message: '请设置最大并发数' }]}
              >
                <Slider
                  min={1}
                  max={20}
                  marks={{
                    1: '1',
                    5: '5',
                    10: '10',
                    20: '20'
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeout"
                label="超时时间(秒)"
                rules={[{ required: true, message: '请设置超时时间' }]}
              >
                <Slider
                  min={10}
                  max={300}
                  marks={{
                    10: '10s',
                    60: '1m',
                    180: '3m',
                    300: '5m'
                  }}
                />
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
                <Select>
                  <Option value={0}>不重试</Option>
                  <Option value={1}>1次</Option>
                  <Option value={2}>2次</Option>
                  <Option value={3}>3次</Option>
                  <Option value={5}>5次</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="autoRestart"
                label="自动重启"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 智能体详情模态框 */}
      <Modal
        title="智能体详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedAgent && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="名称">
                {selectedAgent.name}
              </Descriptions.Item>
              <Descriptions.Item label="版本">
                {selectedAgent.version}
              </Descriptions.Item>
              <Descriptions.Item label="类型">
                {agentTypeMap[selectedAgent.type as keyof typeof agentTypeMap]?.name}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedAgent.status)}
              </Descriptions.Item>
              <Descriptions.Item label="CPU使用率">
                {selectedAgent.cpu}%
              </Descriptions.Item>
              <Descriptions.Item label="内存使用">
                {selectedAgent.memory}MB
              </Descriptions.Item>
              <Descriptions.Item label="执行任务">
                {selectedAgent.tasks}次
              </Descriptions.Item>
              <Descriptions.Item label="成功率">
                {selectedAgent.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label="创建时间" span={2}>
                {selectedAgent.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedAgent.description}
              </Descriptions.Item>
            </Descriptions>

            <div className="margin-top-24">
              <Title level={4}>配置信息</Title>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="最大并发">
                  {selectedAgent.config.maxConcurrency}
                </Descriptions.Item>
                <Descriptions.Item label="超时时间">
                  {selectedAgent.config.timeout}秒
                </Descriptions.Item>
                <Descriptions.Item label="重试次数">
                  {selectedAgent.config.retryCount}次
                </Descriptions.Item>
                <Descriptions.Item label="自动重启">
                  {selectedAgent.config.autoRestart ? '启用' : '禁用'}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="margin-top-24">
              <Title level={4}>运行日志</Title>
              <Timeline>
                <Timeline.Item color="green">
                  <Text strong>14:30:25</Text> - 智能体启动成功
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <Text strong>14:28:10</Text> - 执行监控任务 #1247
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <Text strong>14:25:30</Text> - 检测到系统异常，发送告警
                </Timeline.Item>
                <Timeline.Item color="orange">
                  <Text strong>14:20:15</Text> - 任务执行超时，开始重试
                </Timeline.Item>
                <Timeline.Item>
                  <Text strong>14:15:00</Text> - 智能体配置更新
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default AIAgentManagement;
