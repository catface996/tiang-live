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
  Switch,
  Slider,
  message,
  Descriptions,
  Timeline,
  Pagination
} from 'antd';
import {
  RobotOutlined,
  PlusOutlined,
  ReloadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ThunderboltOutlined,
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
import { useAppSelector } from '../../store';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import { AgentCard, type Agent } from '../../components/AgentCard';
import '../../styles/ai-agent-management.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${props => (props.$isDark ? '#000000' : '#f5f5f5')};
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  border-radius: 8px;
  box-shadow: ${props => (props.$isDark ? '0 2px 8px rgba(255, 255, 255, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.06)')};
  border: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};
  background: ${props => (props.$isDark ? '#141414' : '#ffffff')};

  .ant-card-body {
    padding: 16px;
  }

  .ant-statistic-title {
    color: ${props => (props.$isDark ? '#ffffff' : '#666666')};
  }

  .ant-statistic-content {
    color: ${props => (props.$isDark ? '#ffffff' : '#262626')};
  }
`;

const StatusDot = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'running':
        return '#52c41a';
      case 'stopped':
        return '#f5222d';
      case 'paused':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  }};
  display: inline-block;
  margin-right: 8px;
`;

interface AIAgent {
  id: string;
  name: string;
  type: 'monitor' | 'analysis' | 'deployment' | 'optimization';
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
  const { t } = useTranslation(['agents', 'common']);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [form] = Form.useForm();
  const { currentTheme } = useAppSelector(state => state.theme);
  
  // 分页状态
  const [pagination, setPagination] = useState(() => {
    // 从localStorage读取用户的分页偏好
    const savedPageSize = localStorage.getItem('ai-agent-page-size');
    return {
      current: 1,
      pageSize: savedPageSize ? parseInt(savedPageSize, 10) : 6,
      total: 0
    };
  });
  
  // 加载状态
  const [loading, setLoading] = useState(false);
  const isDark = currentTheme === 'dark';

  // 重置分页到第一页（用于搜索和筛选时）
  const resetPagination = () => {
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  useEffect(() => {
    setPageTitle(t('agents:title'));
  }, [t]);

  // 当搜索条件或筛选条件变化时，重置分页到第一页
  useEffect(() => {
    resetPagination();
  }, [searchText, filterStatus, filterType]);

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
        autoRestart: true
      }
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
        autoRestart: true
      }
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
        autoRestart: false
      }
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
        autoRestart: false
      }
    },
    {
      id: '5',
      name: '安全扫描智能体',
      type: 'security',
      status: 'running',
      description: '执行安全漏洞扫描和威胁检测，保障系统安全',
      version: 'v2.3.1',
      cpu: 18.9,
      memory: 384,
      tasks: 673,
      successRate: 97.3,
      lastActive: '2024-06-15 14:25:45',
      createdAt: '2024-05-05',
      config: {
        maxConcurrency: 8,
        timeout: 90,
        retryCount: 2,
        autoRestart: true
      }
    },
    {
      id: '6',
      name: '数据备份智能体',
      type: 'backup',
      status: 'running',
      description: '自动化数据备份和恢复管理，确保数据安全',
      version: 'v1.9.3',
      cpu: 12.3,
      memory: 192,
      tasks: 445,
      successRate: 99.8,
      lastActive: '2024-06-15 14:20:15',
      createdAt: '2024-04-20',
      config: {
        maxConcurrency: 4,
        timeout: 300,
        retryCount: 3,
        autoRestart: true
      }
    },
    {
      id: '7',
      name: 'API网关智能体',
      type: 'gateway',
      status: 'running',
      description: '智能API路由和负载均衡，优化请求分发',
      version: 'v2.0.5',
      cpu: 31.7,
      memory: 768,
      tasks: 2156,
      successRate: 99.1,
      lastActive: '2024-06-15 14:32:08',
      createdAt: '2024-05-15',
      config: {
        maxConcurrency: 20,
        timeout: 15,
        retryCount: 1,
        autoRestart: true
      }
    },
    {
      id: '8',
      name: '容量规划智能体',
      type: 'planning',
      status: 'paused',
      description: '分析资源使用趋势，提供容量规划建议',
      version: 'v1.4.2',
      cpu: 5.8,
      memory: 96,
      tasks: 89,
      successRate: 95.5,
      lastActive: '2024-06-15 10:45:30',
      createdAt: '2024-03-25',
      config: {
        maxConcurrency: 2,
        timeout: 240,
        retryCount: 2,
        autoRestart: false
      }
    },
    {
      id: '9',
      name: '故障诊断智能体',
      type: 'diagnosis',
      status: 'running',
      description: '智能故障诊断和根因分析，快速定位问题',
      version: 'v2.2.0',
      cpu: 21.4,
      memory: 512,
      tasks: 567,
      successRate: 96.2,
      lastActive: '2024-06-15 14:18:55',
      createdAt: '2024-04-30',
      config: {
        maxConcurrency: 6,
        timeout: 120,
        retryCount: 3,
        autoRestart: true
      }
    },
    {
      id: '10',
      name: '配置管理智能体',
      type: 'config',
      status: 'stopped',
      description: '自动化配置管理和版本控制，确保配置一致性',
      version: 'v1.7.1',
      cpu: 0,
      memory: 0,
      tasks: 234,
      successRate: 98.9,
      lastActive: '2024-06-14 16:20:12',
      createdAt: '2024-03-15',
      config: {
        maxConcurrency: 3,
        timeout: 60,
        retryCount: 2,
        autoRestart: false
      }
    },
    {
      id: '11',
      name: '流量分析智能体',
      type: 'traffic',
      status: 'running',
      description: '实时流量分析和异常检测，优化网络性能',
      version: 'v1.6.4',
      cpu: 16.2,
      memory: 320,
      tasks: 789,
      successRate: 97.8,
      lastActive: '2024-06-15 14:29:33',
      createdAt: '2024-05-10',
      config: {
        maxConcurrency: 12,
        timeout: 45,
        retryCount: 2,
        autoRestart: true
      }
    },
    {
      id: '12',
      name: '资源清理智能体',
      type: 'cleanup',
      status: 'paused',
      description: '定期清理无用资源和临时文件，释放存储空间',
      version: 'v1.3.0',
      cpu: 3.1,
      memory: 64,
      tasks: 156,
      successRate: 99.4,
      lastActive: '2024-06-15 08:30:00',
      createdAt: '2024-02-28',
      config: {
        maxConcurrency: 1,
        timeout: 600,
        retryCount: 1,
        autoRestart: false
      }
    }
  ];

  // 计算过滤后的数据总数并更新分页
  useEffect(() => {
    const filteredCount = agentData.filter(agent => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
      const matchesType = filterType === 'all' || agent.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    }).length;

    setPagination(prev => ({
      ...prev,
      total: filteredCount
    }));
  }, [searchText, filterStatus, filterType]);

  const agentTypeMap = {
    monitor: { name: t('agents:types.monitor'), color: 'blue', icon: <MonitorOutlined /> },
    analysis: { name: t('agents:types.analysis'), color: 'green', icon: <BarChartOutlined /> },
    deployment: { name: t('agents:types.deployment'), color: 'purple', icon: <ApiOutlined /> },
    optimization: { name: t('agents:types.optimization'), color: 'orange', icon: <ThunderboltOutlined /> },
    security: { name: t('agents:types.security'), color: 'red', icon: <ExclamationCircleOutlined /> },
    backup: { name: t('agents:types.backup'), color: 'cyan', icon: <CheckCircleOutlined /> },
    gateway: { name: t('agents:types.gateway'), color: 'geekblue', icon: <ApiOutlined /> },
    planning: { name: t('agents:types.planning'), color: 'magenta', icon: <BarChartOutlined /> },
    diagnosis: { name: t('agents:types.diagnosis'), color: 'volcano', icon: <MonitorOutlined /> },
    config: { name: t('agents:types.config'), color: 'lime', icon: <ApiOutlined /> },
    traffic: { name: t('agents:types.traffic'), color: 'gold', icon: <BarChartOutlined /> },
    cleanup: { name: t('agents:types.cleanup'), color: 'gray', icon: <DeleteOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      running: {
        color: isDark ? '#52c41a' : 'green',
        text: t('agents:status.running'),
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
      stopped: {
        color: isDark ? '#f5222d' : 'red',
        text: t('agents:status.stopped'),
        bgColor: isDark ? 'rgba(245, 34, 45, 0.1)' : undefined
      },
      paused: {
        color: isDark ? '#faad14' : 'orange',
        text: t('agents:status.paused'),
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return (
      <Tag
        color={config.color}
        style={
          config.bgColor
            ? {
                backgroundColor: config.bgColor,
                border: `1px solid ${config.color}`,
                color: config.color
              }
            : {}
        }
      >
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

  // 分页变更处理
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setLoading(true);
    const newPageSize = pageSize || pagination.pageSize;
    
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: newPageSize
    }));
    
    // 保存用户的分页偏好
    if (pageSize && pageSize !== pagination.pageSize) {
      localStorage.setItem('ai-agent-page-size', pageSize.toString());
    }
    
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 模拟加载延迟
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // 重置所有筛选条件
  const handleResetFilters = () => {
    setSearchText('');
    setFilterStatus('all');
    setFilterType('all');
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  const handleViewAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setDetailModalVisible(true);
  };

  const handleStartAgent = (_agentId: string) => {
    message.success('智能体启动成功');
  };

  const handleStopAgent = (_agentId: string) => {
    message.success('智能体停止成功');
  };

  const handleDeleteAgent = (_agentId: string) => {
    message.success('智能体删除成功');
  };

  const handleModalOk = async () => {
    try {
      const _values = await form.validateFields();
      message.success('智能体创建成功');
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderAgentCards = () => {
    // 过滤逻辑
    const filteredAgents = agentData.filter(agent => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
      const matchesType = filterType === 'all' || agent.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });

    // 分页逻辑
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedAgents = filteredAgents.slice(startIndex, endIndex);

    return paginatedAgents.map(agent => (
      <Col xs={24} sm={24} lg={12} xl={8} key={agent.id}>
        <AgentCard
          agent={
            {
              ...agent,
              stats: {
                tasksCompleted: agent.tasks,
                successRate: agent.successRate,
                avgResponseTime: Math.floor(Math.random() * 200) + 100,
                uptime: '2天3小时'
              }
            } as Agent
          }
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

  return (
    <PageContainer $isDark={isDark} className="ai-agent-management-page">
      {/* Title和按钮在同一行 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Title level={2} style={{ margin: 0 }}>
          <Space>
            <RobotOutlined />
            {t('agents:title')}
          </Space>
        </Title>
        <Space>
          <Button icon={<ReloadOutlined />}>{t('common:refresh')}</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateAgent}>
            {t('agents:createAgent')}
          </Button>
        </Space>
      </div>

      {/* Paragraph单独一行，充满宽度 */}
      <Paragraph
        style={{
          marginTop: 0,
          marginBottom: 24
        }}
      >
        {t('agents:subtitle')}
      </Paragraph>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="agent-stats-primary">
            <Statistic title={t('agents:stats.totalAgents')} value={agentData.length} prefix={<RobotOutlined />} />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="agent-stats-success">
            <Statistic title={t('agents:stats.runningAgents')} value={runningAgents} prefix={<PlayCircleOutlined />} />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="agent-stats-warning">
            <Statistic title={t('agents:stats.totalTasks')} value={totalTasks} prefix={<ThunderboltOutlined />} />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="agent-stats-purple">
            <Statistic
              title={t('agents:stats.avgSuccessRate')}
              value={avgSuccessRate.toFixed(1)}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 搜索和筛选区域 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('agents:searchPlaceholder')}
        onRefresh={handleResetFilters}
        filters={[
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('agents:filterByStatus'),
            width: 120,
            options: [
              { value: 'all', label: t('common:all') },
              { value: 'running', label: t('agents:status.running') },
              { value: 'paused', label: t('agents:status.paused') },
              { value: 'stopped', label: t('agents:status.stopped') }
            ]
          },
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('agents:filterByType'),
            width: 140,
            options: [
              { value: 'all', label: t('common:all') },
              ...Object.entries(agentTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          }
        ]}
      />

      {/* 智能体卡片展示 */}
      <div style={{ minHeight: '400px', position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: '8px'
          }}>
            <Space direction="vertical" align="center">
              <div className="loading-spinner" style={{
                width: '40px',
                height: '40px',
                border: `3px solid ${isDark ? '#303030' : '#f0f0f0'}`,
                borderTop: '3px solid #1890ff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <Text style={{ color: isDark ? '#fff' : '#666' }}>加载中...</Text>
            </Space>
          </div>
        )}
        
        <Row gutter={[16, 16]}>
          {renderAgentCards()}
          {/* 空状态处理 */}
          {!loading && pagination.total === 0 && (
            <Col span={24}>
              <Card style={{ textAlign: 'center', padding: '40px 20px' }}>
                <RobotOutlined style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#999' }}>
                  {searchText || filterStatus !== 'all' || filterType !== 'all' 
                    ? '没有找到匹配的智能体' 
                    : '暂无智能体'
                  }
                </Title>
                <Paragraph style={{ color: '#999', marginBottom: 24 }}>
                  {searchText || filterStatus !== 'all' || filterType !== 'all'
                    ? '请尝试调整搜索条件或筛选器'
                    : '点击下方按钮创建您的第一个AI智能体'
                  }
                </Paragraph>
                {(!searchText && filterStatus === 'all' && filterType === 'all') && (
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateAgent}>
                    创建智能体
                  </Button>
                )}
              </Card>
            </Col>
          )}
        </Row>
      </div>

      {/* 分页组件 */}
      {pagination.total > pagination.pageSize && (
        <Row justify="center" style={{ marginTop: 32, marginBottom: 24 }}>
          <Col>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              onShowSizeChange={handlePaginationChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 条，共 ${total} 个智能体`
              }
              pageSizeOptions={['6', '12', '18', '24']}
              size="default"
              style={{
                padding: '16px 24px',
                background: isDark ? '#1f1f1f' : '#fff',
                borderRadius: '8px',
                border: `1px solid ${isDark ? '#303030' : '#d9d9d9'}`,
                boxShadow: isDark 
                  ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Col>
        </Row>
      )}

      {/* 创建智能体模态框 */}
      <Modal
        title={t('agents:createAgent')}
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
            autoRestart: true
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
              <Form.Item name="type" label="智能体类型" rules={[{ required: true, message: '请选择智能体类型' }]}>
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
            <TextArea rows={3} placeholder="请输入智能体的功能描述" />
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
              <Form.Item name="timeout" label="超时时间(秒)" rules={[{ required: true, message: '请设置超时时间' }]}>
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
              <Form.Item name="retryCount" label="重试次数" rules={[{ required: true, message: '请设置重试次数' }]}>
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
              <Form.Item name="autoRestart" label="自动重启" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 智能体详情模态框 */}
      <Modal
        title={<span style={{ color: isDark ? '#ffffff' : '#262626' }}>智能体详情</span>}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
        styles={{
          content: {
            backgroundColor: isDark ? '#141414' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000'
          }
        }}
      >
        {selectedAgent && (
          <div>
            <Descriptions
              bordered
              column={2}
              labelStyle={{
                backgroundColor: isDark ? '#1f1f1f' : '#fafafa',
                color: isDark ? '#ffffff' : '#262626'
              }}
              contentStyle={{
                backgroundColor: isDark ? '#141414' : '#ffffff',
                color: isDark ? '#ffffff' : '#262626'
              }}
            >
              <Descriptions.Item label="名称">{selectedAgent.name}</Descriptions.Item>
              <Descriptions.Item label="版本">{selectedAgent.version}</Descriptions.Item>
              <Descriptions.Item label="类型">
                {agentTypeMap[selectedAgent.type as keyof typeof agentTypeMap]?.name}
              </Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedAgent.status)}</Descriptions.Item>
              <Descriptions.Item label="CPU使用率">{selectedAgent.cpu}%</Descriptions.Item>
              <Descriptions.Item label="内存使用">{selectedAgent.memory}MB</Descriptions.Item>
              <Descriptions.Item label="执行任务">{selectedAgent.tasks}次</Descriptions.Item>
              <Descriptions.Item label="成功率">{selectedAgent.successRate}%</Descriptions.Item>
              <Descriptions.Item label="创建时间" span={2}>
                {selectedAgent.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedAgent.description}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={4} style={{ color: isDark ? '#ffffff' : '#262626' }}>
                配置信息
              </Title>
              <Descriptions
                bordered
                column={2}
                labelStyle={{
                  backgroundColor: isDark ? '#1f1f1f' : '#fafafa',
                  color: isDark ? '#ffffff' : '#262626'
                }}
                contentStyle={{
                  backgroundColor: isDark ? '#141414' : '#ffffff',
                  color: isDark ? '#ffffff' : '#262626'
                }}
              >
                <Descriptions.Item label="最大并发">{selectedAgent.config.maxConcurrency}</Descriptions.Item>
                <Descriptions.Item label="超时时间">{selectedAgent.config.timeout}秒</Descriptions.Item>
                <Descriptions.Item label="重试次数">{selectedAgent.config.retryCount}次</Descriptions.Item>
                <Descriptions.Item label="自动重启">
                  {selectedAgent.config.autoRestart ? '启用' : '禁用'}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div style={{ marginTop: 24 }}>
              <Title level={4} style={{ color: isDark ? '#ffffff' : '#262626' }}>
                运行日志
              </Title>
              <Timeline>
                <Timeline.Item color="green">
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    14:30:25
                  </Text>
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}> - 智能体启动成功</span>
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    14:28:10
                  </Text>
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}> - 执行监控任务 #1247</span>
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    14:25:30
                  </Text>
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}> - 检测到系统异常，发送告警</span>
                </Timeline.Item>
                <Timeline.Item color="orange">
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    14:20:15
                  </Text>
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}> - 任务执行超时，开始重试</span>
                </Timeline.Item>
                <Timeline.Item>
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    14:15:00
                  </Text>
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}> - 智能体配置更新</span>
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
