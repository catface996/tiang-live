import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Descriptions,
  Tag,
  Button,
  Space,
  Statistic,
  Progress,
  Table,
  Tabs,
  Avatar,
  Typography,
  Alert,
  theme
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  RobotOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';
import { setPageTitle } from '../../utils';
import type { Agent } from '../../components/AgentCard';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Styled Components
const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${props => props.$isDark ? '#000000' : '#f5f5f5'};
  transition: all 0.3s ease;
`;

const HeaderCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 12px;
  
  .ant-card-body {
    padding: 32px;
  }
`;

const AgentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const StyledAvatar = styled(Avatar)<{ $bgColor: string }>`
  background: linear-gradient(135deg, ${props => props.$bgColor}, ${props => props.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${props => props.$bgColor}40;
  border: 2px solid ${props => props.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 32px;
  }
`;

const AgentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AgentName = styled(Title)<{ $isDark: boolean }>`
  margin: 0 0 8px 0 !important;
  color: ${props => props.$isDark ? '#ffffff' : '#262626'} !important;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const StyledTag = styled(Tag)<{ $bgColor?: string; $borderColor?: string; $textColor?: string }>`
  border-radius: 6px;
  font-size: 12px;
  padding: 4px 12px;
  margin: 0;
  
  ${props => props.$bgColor && `
    background-color: ${props.$bgColor} !important;
    border: 1px solid ${props.$borderColor} !important;
    color: ${props.$textColor} !important;
  `}
  
  .anticon {
    color: ${props => props.$textColor || 'inherit'} !important;
    margin-right: 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px;
  
  .ant-statistic-content-value {
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  }
`;

const ContentCard = styled(Card)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 12px;
  margin-bottom: 24px;
  
  .ant-tabs-content-holder {
    padding: 24px;
  }
`;

const StatusIndicator = styled.span<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  
  ${props => {
    switch (props.status) {
      case 'running':
        return 'background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;';
      case 'stopped':
        return 'background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;';
      case 'paused':
        return 'background-color: #faad14; box-shadow: 0 0 6px #faad1460;';
      default:
        return 'background-color: #d9d9d9;';
    }
  }}
`;

// 模拟数据
const mockAgentDetail: Agent = {
  id: '1',
  name: '日志分析智能体',
  type: 'analysis',
  status: 'running',
  description: '专门用于分析系统日志，识别异常模式和潜在问题的智能体。具备自然语言处理和模式识别能力。',
  lastActive: '2分钟前',
  tags: ['日志分析', '异常检测', '自动化'],
  stats: {
    tasksCompleted: 1247,
    successRate: 98.5,
    avgResponseTime: 156,
    uptime: '15天8小时'
  }
};

const mockLogs = [
  { time: '2024-01-20 14:30:25', level: 'INFO', message: '智能体启动成功' },
  { time: '2024-01-20 14:30:30', level: 'INFO', message: '开始执行日志分析任务' },
  { time: '2024-01-20 14:31:15', level: 'WARN', message: '检测到异常日志模式' },
  { time: '2024-01-20 14:31:20', level: 'INFO', message: '生成分析报告' },
  { time: '2024-01-20 14:32:00', level: 'INFO', message: '任务执行完成' }
];

const mockHistory = [
  { id: 1, task: '系统日志分析', startTime: '2024-01-20 14:30:00', endTime: '2024-01-20 14:32:00', status: 'success', duration: '2分钟' },
  { id: 2, task: '错误日志检测', startTime: '2024-01-20 13:15:00', endTime: '2024-01-20 13:16:30', status: 'success', duration: '1分30秒' },
  { id: 3, task: '性能日志分析', startTime: '2024-01-20 12:00:00', endTime: '2024-01-20 12:05:00', status: 'failed', duration: '5分钟' },
  { id: 4, task: '安全日志审计', startTime: '2024-01-20 11:30:00', endTime: '2024-01-20 11:32:00', status: 'success', duration: '2分钟' }
];

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['agents', 'common']);
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';
  
  const [agent, setAgent] = useState<Agent>(mockAgentDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPageTitle(t('agents:detail.title'));
    // 这里可以根据id加载具体的智能体数据
    // loadAgentDetail(id);
  }, [id, t]);

  const getAgentTypeConfig = () => ({
    analysis: { 
      name: t('agents:types.analysis'), 
      color: '#52c41a', 
      bgColor: '#f6ffed',
      icon: '📊'
    }
  });

  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: { 
        text: t('agents:status.running'), 
        color: '#52c41a', 
        bgColor: '#f6ffed'
      },
      stopped: { 
        text: t('agents:status.stopped'), 
        color: '#ff4d4f', 
        bgColor: '#fff2f0'
      },
      paused: { 
        text: t('agents:status.paused'), 
        color: '#faad14', 
        bgColor: '#fff7e6'
      }
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const getAvatarBackgroundColor = (agentType: string) => {
    const colorMap = {
      analysis: isDark ? '#52c41a' : '#73d13d'
    };
    return colorMap[agentType as keyof typeof colorMap] || (isDark ? '#1890ff' : '#4096ff');
  };

  const typeConfig = getAgentTypeConfig().analysis;
  const statusConfig = getStatusConfig(agent.status);
  const avatarBgColor = getAvatarBackgroundColor(agent.type);

  const handleAction = (action: string) => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setLoading(false);
      console.log(`执行操作: ${action}`);
    }, 1000);
  };

  const logColumns = [
    {
      title: t('agents:detail.logs'),
      dataIndex: 'time',
      key: 'time',
      width: 180
    },
    {
      title: t('common:level'),
      dataIndex: 'level',
      key: 'level',
      width: 80,
      render: (level: string) => (
        <Tag color={level === 'ERROR' ? 'red' : level === 'WARN' ? 'orange' : 'blue'}>
          {level}
        </Tag>
      )
    },
    {
      title: t('common:message'),
      dataIndex: 'message',
      key: 'message'
    }
  ];

  const historyColumns = [
    {
      title: t('agents:detail.history'),
      dataIndex: 'task',
      key: 'task'
    },
    {
      title: t('common:startTime'),
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180
    },
    {
      title: t('common:endTime'),
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180
    },
    {
      title: t('common:duration'),
      dataIndex: 'duration',
      key: 'duration',
      width: 120
    },
    {
      title: t('common:status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : 'red'}>
          {status === 'success' ? t('common:success') : t('common:failed')}
        </Tag>
      )
    }
  ];

  return (
    <PageContainer $isDark={isDark}>
      {/* 页面头部 */}
      <HeaderCard $isDark={isDark}>
        <Space style={{ marginBottom: 24 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/agents')}
          >
            {t('common:back')}
          </Button>
        </Space>

        <AgentHeader>
          <AvatarContainer>
            <StyledAvatar 
              size={80} 
              icon={<RobotOutlined />} 
              $bgColor={avatarBgColor}
            />
          </AvatarContainer>
          
          <AgentInfo>
            <AgentName level={2} $isDark={isDark}>
              <StatusIndicator status={agent.status} />
              {agent.name}
            </AgentName>
            
            <TagContainer>
              <StyledTag 
                $bgColor={typeConfig.bgColor}
                $borderColor={typeConfig.color}
                $textColor={typeConfig.color}
              >
                {typeConfig.name}
              </StyledTag>
              <StyledTag 
                $bgColor={statusConfig.bgColor}
                $borderColor={statusConfig.color}
                $textColor={statusConfig.color}
              >
                {statusConfig.text}
              </StyledTag>
            </TagContainer>
            
            <Paragraph style={{ color: isDark ? '#8c8c8c' : '#666', marginBottom: 24 }}>
              {agent.description}
            </Paragraph>
            
            <ActionButtons>
              <Button 
                type="primary" 
                icon={agent.status === 'running' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                loading={loading}
                onClick={() => handleAction(agent.status === 'running' ? 'stop' : 'start')}
              >
                {agent.status === 'running' ? t('agents:actions.stop') : t('agents:actions.start')}
              </Button>
              <Button 
                icon={<EditOutlined />}
                onClick={() => navigate(`/agents/edit/${agent.id}`)}
              >
                {t('agents:actions.edit')}
              </Button>
              <Button 
                icon={<ReloadOutlined />}
                onClick={() => handleAction('restart')}
              >
                {t('agents:actions.restart')}
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />}
                onClick={() => handleAction('delete')}
              >
                {t('agents:actions.delete')}
              </Button>
            </ActionButtons>
          </AgentInfo>
        </AgentHeader>

        {/* 统计信息 */}
        <Row gutter={24}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('agents:stats.tasksCompleted')}
                value={agent.stats.tasksCompleted}
                prefix={<FileTextOutlined />}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('agents:stats.successRate')}
                value={agent.stats.successRate}
                suffix="%"
                prefix={<LineChartOutlined />}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('agents:stats.responseTime')}
                value={agent.stats.avgResponseTime}
                suffix="ms"
                prefix={<ClockCircleOutlined />}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('agents:detail.uptime')}
                value={agent.stats.uptime}
                prefix={<ClockCircleOutlined />}
              />
            </StatsCard>
          </Col>
        </Row>
      </HeaderCard>

      {/* 详细信息 */}
      <ContentCard $isDark={isDark}>
        <Tabs defaultActiveKey="overview">
          <TabPane tab={t('agents:detail.overview')} key="overview">
            <Row gutter={24}>
              <Col xs={24} lg={12}>
                <Card title={t('agents:detail.basicInfo')} bordered={false}>
                  <Descriptions column={1}>
                    <Descriptions.Item label={t('agents:detail.id')}>
                      {agent.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('agents:detail.name')}>
                      {agent.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('agents:detail.type')}>
                      {typeConfig.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('agents:detail.status')}>
                      <StatusIndicator status={agent.status} />
                      {statusConfig.text}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('agents:detail.lastActiveAt')}>
                      {agent.lastActive}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title={t('agents:detail.performance')} bordered={false}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text>{t('agents:detail.cpuUsage')}</Text>
                      <Progress percent={45} status="active" />
                    </div>
                    <div>
                      <Text>{t('agents:detail.memoryUsage')}</Text>
                      <Progress percent={67} status="active" />
                    </div>
                    <div>
                      <Text>{t('agents:detail.errorRate')}</Text>
                      <Progress percent={2} status="exception" />
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab={t('agents:detail.logs')} key="logs">
            <Table
              columns={logColumns}
              dataSource={mockLogs}
              rowKey="time"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          
          <TabPane tab={t('agents:detail.history')} key="history">
            <Table
              columns={historyColumns}
              dataSource={mockHistory}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          
          <TabPane tab={t('agents:detail.monitoring')} key="monitoring">
            <Alert
              message={t('common:inDevelopment')}
              description="性能监控图表功能正在开发中..."
              type="info"
              showIcon
            />
          </TabPane>
        </Tabs>
      </ContentCard>
    </PageContainer>
  );
};

export default AgentDetail;
