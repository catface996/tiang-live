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
  Pagination,
  Spin
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
import { AgentCard, AgentDetail, type Agent } from '../../components/AgentCard';
import { AIAgentApi, type AIAgentResponse, type AIAgentStatisticsResponse, type QueryAIAgentRequest } from '../../services/aiAgentApi';
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
  const [selectedAgent, setSelectedAgent] = useState<AIAgentResponse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [resetLoading, setResetLoading] = useState(false);
  const [form] = Form.useForm();
  const { currentTheme } = useAppSelector(state => state.theme);
  
  // 数据状态
  const [agentData, setAgentData] = useState<AIAgentResponse[]>([]);
  const [statistics, setStatistics] = useState<AIAgentStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  
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

  // 加载智能体列表
  const loadAgentList = async () => {
    setLoading(true);
    try {
      const params: QueryAIAgentRequest = {
        page: pagination.current,
        size: pagination.pageSize,
        search: searchText || undefined,
        type: filterType !== 'all' ? filterType as any : undefined,
        status: filterStatus !== 'all' ? filterStatus as any : undefined,
      };

      const response = await AIAgentApi.getAIAgentList(params);
      
      console.log('🔍 响应检查:', {
        'response.success': response.success,
        'response.data': response.data,
        'response.data存在': !!response.data,
        '条件结果': response.success && response.data,
        '完整响应': response
      });
      
      if (response.success && response.data) {
        setAgentData(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: typeof response.data.total === 'string' ? parseInt(response.data.total, 10) : response.data.total
        }));
        console.log('✅ 成功加载智能体列表:', response.data.data.length, '个智能体，总计:', response.data.total);
      } else {
        console.warn('⚠️ 加载智能体列表失败:', response.message);
        message.warning('加载智能体列表失败: ' + response.message);
        setAgentData([]);
      }
    } catch (error) {
      console.error('❌ 加载智能体列表异常:', error);
      message.error('加载智能体列表失败: ' + (error instanceof Error ? error.message : '未知错误'));
      setAgentData([]);
    } finally {
      setLoading(false);
    }
  };

  // 加载统计数据
  const loadStatistics = async () => {
    setStatsLoading(true);
    try {
      const response = await AIAgentApi.getAIAgentStatistics();
      
      console.log('🔍 统计响应检查:', {
        'response.success': response.success,
        'response.data': response.data,
        'response.data存在': !!response.data,
        '条件结果': response.success && response.data,
        '完整响应': response
      });
      
      if (response.success && response.data) {
        setStatistics(response.data);
        console.log('✅ 成功加载统计数据:', response.data);
      } else {
        console.warn('⚠️ 加载统计数据失败:', response.message);
        message.warning('加载统计数据失败: ' + response.message);
      }
    } catch (error) {
      console.error('❌ 加载统计数据异常:', error);
      message.error('加载统计数据失败: ' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setStatsLoading(false);
    }
  };

  // 初始化数据加载
  useEffect(() => {
    loadAgentList();
    loadStatistics();
  }, [pagination.current, pagination.pageSize, searchText, filterStatus, filterType]);

  // 刷新数据
  const handleRefresh = async () => {
    setResetLoading(true);
    try {
      await Promise.all([loadAgentList(), loadStatistics()]);
      message.success('数据刷新成功');
    } catch (error) {
      message.error('数据刷新失败');
    } finally {
      setResetLoading(false);
    }
  };

  // 创建智能体
  const handleCreateAgent = () => {
    navigate('/ai-agents/create');
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // 编辑智能体
  const handleEditAgent = (agent: AIAgentResponse) => {
    navigate(`/ai-agents/edit/${agent.id}`);
  };

  // 分页变更处理
  const handlePaginationChange = (page: number, pageSize?: number) => {
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
  };

  // 重置所有筛选条件
  const handleResetFilters = async () => {
    setResetLoading(true);
    
    try {
      // 重置搜索和筛选条件
      setSearchText('');
      setFilterStatus('all');
      setFilterType('all');
      
      // 完全重置分页状态
      const savedPageSize = localStorage.getItem('ai-agent-page-size');
      setPagination({
        current: 1,
        pageSize: savedPageSize ? parseInt(savedPageSize, 10) : 6,
        total: 0 // 将在数据加载后更新
      });
      
      // 模拟一个短暂的延迟，提供更好的用户反馈
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } finally {
      setResetLoading(false);
    }
  };

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

  const handleViewAgent = (agent: AIAgentResponse) => {
    setSelectedAgent(agent);
    setDetailModalVisible(true);
  };

  const handleStartAgent = async (agentId: string) => {
    try {
      // 这里可以调用启动智能体的API
      message.success('智能体启动成功');
      // 重新加载数据
      await loadAgentList();
    } catch (error) {
      message.error(`启动智能体失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const handleStopAgent = async (agentId: string) => {
    try {
      // 这里可以调用停止智能体的API
      message.success('智能体停止成功');
      // 重新加载数据
      await loadAgentList();
    } catch (error) {
      message.error(`停止智能体失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    const agent = agentData.find(a => a.id === agentId);
    if (!agent) return;

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除智能体 "${agent.name}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await AIAgentApi.deleteAIAgent({ id: agentId });
          if (response.success) {
            message.success(`智能体 "${agent.name}" 删除成功`);
            // 重新加载数据
            await loadAgentList();
            await loadStatistics();
          } else {
            message.error(`删除失败: ${response.message}`);
          }
        } catch (error) {
          message.error(`删除智能体失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const _values = await form.validateFields();
      message.success('智能体创建成功');
      setModalVisible(false);
      form.resetFields();
      // 重新加载数据
      await loadAgentList();
      await loadStatistics();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderAgentCards = () => {
    // 直接使用从API获取的数据，无需前端筛选和分页
    return agentData.map(agent => (
      <Col xs={24} sm={24} lg={12} xl={8} key={agent.id}>
        <AgentCard
          agent={
            {
              id: agent.id,
              name: agent.name,
              type: agent.type as any,
              status: agent.status as any,
              description: agent.description,
              version: agent.model?.version || 'v1.0.0',
              cpu: agent.runtime?.cpu || 0,
              memory: agent.runtime?.memory || 0,
              tasks: agent.runtime?.tasks || 0,
              successRate: agent.runtime?.successRate || 0,
              lastActive: agent.runtime?.lastActive || agent.updatedAt,
              createdAt: agent.createdAt,
              config: {
                maxConcurrency: agent.settings?.maxConcurrency || 1,
                timeout: agent.settings?.timeout || 30,
                retryCount: agent.settings?.retryCount || 3,
                autoRestart: agent.settings?.autoStart || false
              },
              stats: {
                tasksCompleted: agent.runtime?.tasks || 0,
                successRate: agent.runtime?.successRate || 0,
                avgResponseTime: Math.floor(Math.random() * 200) + 100,
                uptime: agent.runtime?.uptime ? `${Math.floor(agent.runtime.uptime / 3600)}小时` : '0小时'
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

  // 使用统计数据或从当前数据计算
  const runningAgents = statistics?.activeAgents || agentData.filter(agent => agent.status === 'active').length;
  const totalTasks = statistics?.totalTasks || agentData.reduce((sum, agent) => sum + (agent.runtime?.tasks || 0), 0);
  const avgSuccessRate = statistics?.avgSuccessRate || (agentData.length > 0 ? agentData.reduce((sum, agent) => sum + (agent.runtime?.successRate || 0), 0) / agentData.length : 0);

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
          <Button 
            icon={<ReloadOutlined />} 
            loading={resetLoading}
            onClick={handleRefresh}
          >
            {t('common:refresh')}
          </Button>
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
      <Spin spinning={statsLoading}>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark} className="agent-stats-primary">
              <Statistic 
                title={t('agents:stats.totalAgents')} 
                value={statistics?.totalAgents || agentData.length} 
                prefix={<RobotOutlined />} 
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark} className="agent-stats-success">
              <Statistic 
                title={t('agents:stats.runningAgents')} 
                value={runningAgents} 
                prefix={<PlayCircleOutlined />} 
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark} className="agent-stats-warning">
              <Statistic 
                title={t('agents:stats.totalTasks')} 
                value={totalTasks} 
                prefix={<ThunderboltOutlined />} 
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark} className="agent-stats-purple">
              <Statistic
                title={t('agents:stats.avgSuccessRate')}
                value={avgSuccessRate.toFixed(1)}
                prefix={<CheckCircleOutlined />}
                suffix="%"
              />
            </StatsCard>
          </Col>
        </Row>
      </Spin>

      {/* 搜索和筛选区域 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={handleSearch}
        searchPlaceholder={t('agents:searchPlaceholder')}
        showRefresh={true}
        onRefresh={handleResetFilters}
        refreshLoading={resetLoading}
        filters={[
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('agents:filterByStatus'),
            width: 120,
            options: [
              { value: 'all', label: t('common:all') },
              { value: 'active', label: '活跃' },
              { value: 'inactive', label: '非活跃' },
              { value: 'training', label: '训练中' }
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
              { value: 'chat', label: '对话型' },
              { value: 'task', label: '任务型' },
              { value: 'analysis', label: '分析型' },
              { value: 'monitoring', label: '监控型' }
            ]
          }
        ]}
      />

      {/* 智能体卡片展示 */}
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Spin spinning={loading} size="large">
          <Row gutter={[16, 16]}>
            {agentData.length === 0 && !loading ? (
              <Col span={24}>
                <Card style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <RobotOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                  <Title level={4} type="secondary">
                    {searchText || filterStatus !== 'all' || filterType !== 'all' 
                      ? '未找到匹配的智能体' 
                      : '暂无智能体'
                    }
                  </Title>
                  <Paragraph type="secondary">
                    {searchText || filterStatus !== 'all' || filterType !== 'all' 
                      ? '请尝试调整搜索条件或筛选器。' 
                      : '点击右上角的"创建智能体"按钮开始创建您的第一个AI智能体。'
                    }
                  </Paragraph>
                  {(!searchText && filterStatus === 'all' && filterType === 'all') && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateAgent}>
                      创建智能体
                    </Button>
                  )}
                </Card>
              </Col>
            ) : (
              renderAgentCards()
            )}
          </Row>
        </Spin>
      </div>

      {/* 分页组件 */}
      {pagination.total > 0 && (
        <Row justify="center" style={{ marginTop: 32, marginBottom: 24 }}>
          <Col>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              onShowSizeChange={handlePaginationChange}
              showSizeChanger
              showQuickJumper={pagination.total > 50}
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 条，共 ${total} 个智能体`
              }
              pageSizeOptions={['6', '12', '18', '24']}
              disabled={loading}
            />
          </Col>
        </Row>
      )}

      {/* 智能体详情模态框 */}
      <Modal
        title="智能体详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedAgent && (
          <AgentDetail agent={selectedAgent} />
        )}
      </Modal>

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
