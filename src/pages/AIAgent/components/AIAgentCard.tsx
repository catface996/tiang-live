import React, { useMemo } from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Tag, 
  Avatar, 
  Progress, 
  Tooltip, 
  Popconfirm, 
  Typography,
  Statistic,
  Badge,
  theme
} from 'antd';
import { 
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ApiOutlined,
  MonitorOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';

const { Text, Paragraph } = Typography;

const StyledAvatar = styled(Avatar)<{ $bgColor: string }>`
  background-color: ${props => props.$bgColor} !important;
  color: #ffffff !important;
  
  .anticon {
    color: #ffffff !important;
  }
  
  svg {
    color: #ffffff !important;
  }
`;

const StyledTag = styled(Tag)<{ $bgColor?: string; $borderColor?: string; $textColor?: string }>`
  ${props => props.$bgColor && `
    background-color: ${props.$bgColor} !important;
    border: 1px solid ${props.$borderColor} !important;
    color: ${props.$textColor} !important;
  `}
  
  .anticon {
    color: ${props => props.$textColor || 'inherit'} !important;
  }
`;

const StatsSeparator = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
`;

const StatsTitle = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
`;

const TagContainer = styled.div`
  .ant-tag {
    margin-bottom: 4px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const FooterText = styled(Text)<{ $isDark: boolean }>`
  font-size: 12px;
  color: ${props => props.$isDark ? '#8c8c8c' : '#999'} !important;
`;

const StyledStatistic = styled(Statistic)<{ $isDark: boolean }>`
  .ant-statistic-content-value {
    font-size: 14px !important;
    color: ${props => props.$isDark ? '#ffffff' : '#262626'} !important;
  }
`;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  transition: all 0.3s ease;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px !important;
  overflow: hidden; /* 确保内容不会超出圆角 */
  
  /* 强制卡片本身的圆角 */
  &,
  &.ant-card {
    border-radius: 8px !important;
  }
  
  /* 卡片主体样式 */
  .ant-card-body {
    padding: 20px;
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  }
  
  /* actions区域样式 */
  .ant-card-actions {
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    
    li {
      border-right: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
      
      &:last-child {
        border-right: none;
      }
    }
    
    .ant-btn {
      color: ${props => props.$isDark ? '#ffffff' : '#595959'};
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 4px 12px rgba(255, 255, 255, 0.1)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)'
    };
    border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
  }
      
      &:hover {
        color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
        background: ${props => props.$isDark ? 'rgba(23, 125, 220, 0.1)' : 'rgba(64, 169, 255, 0.1)'};
      }
      
      &.ant-btn-dangerous:hover {
        color: #ff4d4f;
        background: ${props => props.$isDark ? 'rgba(255, 77, 79, 0.1)' : 'rgba(255, 77, 79, 0.1)'};
      }
    }
  }
  
  .agent-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    width: 100%;
  }
  
  .agent-avatar {
    margin-right: 12px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  
  .agent-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  
  .agent-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
    line-height: 1.4;
  }
  
  .agent-type {
    margin-top: 4px;
  }
  
  .agent-stats {
    margin: 16px 0;
    padding: 16px;
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    border-radius: 6px;
  }
  
  .agent-description {
    margin: 16px 0;
    color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
    font-size: 13px;
    line-height: 1.5;
  }
  
  .agent-tags {
    margin: 16px 0;
  }
  
  .agent-actions {
    margin-top: 16px;
    padding-top: 16px;
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    
    &.running {
      background-color: #52c41a;
    }
    
    &.stopped {
      background-color: #ff4d4f;
    }
    
    &.paused {
      background-color: #faad14;
    }
  }
`;

interface AIAgent {
  id: string;
  name: string;
  type: 'monitor' | 'analysis' | 'deployment' | 'optimization';
  status: 'running' | 'stopped' | 'paused';
  description: string;
  avatar?: string;
  tags?: string[];
  stats: {
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: number;
    uptime: string;
  };
  lastActive: string;
  createdAt: string;
  config: {
    maxConcurrency: number;
    timeout: number;
    retryCount: number;
    autoRestart: boolean;
  };
}

interface AIAgentCardProps {
  agent: AIAgent;
  onEdit: (agent: AIAgent) => void;
  onDelete: (agentId: string) => void;
  onStart: (agentId: string) => void;
  onStop: (agentId: string) => void;
  onView: (agent: AIAgent) => void;
}

const AIAgentCard: React.FC<AIAgentCardProps> = ({
  agent,
  onEdit,
  onDelete,
  onStart,
  onStop,
  onView
}) => {
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';
  
  // 使用 useMemo 来确保配置对象的稳定性
  const agentTypeMap = useMemo(() => ({
    monitor: { 
      name: t('agents.types.monitor'), 
      color: isDark ? '#1890ff' : 'blue', 
      icon: <MonitorOutlined />,
      bgColor: isDark ? 'rgba(24, 144, 255, 0.1)' : undefined,
      avatarColor: isDark ? '#1890ff' : '#4096ff'
    },
    analysis: { 
      name: t('agents.types.analysis'), 
      color: isDark ? '#52c41a' : 'green', 
      icon: <BarChartOutlined />,
      bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined,
      avatarColor: isDark ? '#52c41a' : '#73d13d'
    },
    deployment: { 
      name: t('agents.types.deployment'), 
      color: isDark ? '#722ed1' : 'purple', 
      icon: <ApiOutlined />,
      bgColor: isDark ? 'rgba(114, 46, 209, 0.1)' : undefined,
      avatarColor: isDark ? '#722ed1' : '#9254de'
    },
    optimization: { 
      name: t('agents.types.optimization'), 
      color: isDark ? '#fa8c16' : 'orange', 
      icon: <ThunderboltOutlined />,
      bgColor: isDark ? 'rgba(250, 140, 22, 0.1)' : undefined,
      avatarColor: isDark ? '#fa8c16' : '#ffa940'
    },
    security: { 
      name: t('agents.types.security'), 
      color: isDark ? '#ff4d4f' : 'red', 
      icon: <ExclamationCircleOutlined />,
      bgColor: isDark ? 'rgba(255, 77, 79, 0.1)' : undefined,
      avatarColor: isDark ? '#ff4d4f' : '#ff7875'
    },
    backup: { 
      name: t('agents.types.backup'), 
      color: isDark ? '#13c2c2' : 'cyan', 
      icon: <CheckCircleOutlined />,
      bgColor: isDark ? 'rgba(19, 194, 194, 0.1)' : undefined,
      avatarColor: isDark ? '#13c2c2' : '#36cfc9'
    },
    gateway: { 
      name: t('agents.types.gateway'), 
      color: isDark ? '#2f54eb' : 'geekblue', 
      icon: <ApiOutlined />,
      bgColor: isDark ? 'rgba(47, 84, 235, 0.1)' : undefined,
      avatarColor: isDark ? '#2f54eb' : '#597ef7'
    },
    planning: { 
      name: t('agents.types.planning'), 
      color: isDark ? '#eb2f96' : 'magenta', 
      icon: <BarChartOutlined />,
      bgColor: isDark ? 'rgba(235, 47, 150, 0.1)' : undefined,
      avatarColor: isDark ? '#eb2f96' : '#f759ab'
    },
    diagnosis: { 
      name: t('agents.types.diagnosis'), 
      color: isDark ? '#fa541c' : 'volcano', 
      icon: <MonitorOutlined />,
      bgColor: isDark ? 'rgba(250, 84, 28, 0.1)' : undefined,
      avatarColor: isDark ? '#fa541c' : '#ff7a45'
    },
    config: { 
      name: t('agents.types.config'), 
      color: isDark ? '#a0d911' : 'lime', 
      icon: <ApiOutlined />,
      bgColor: isDark ? 'rgba(160, 217, 17, 0.1)' : undefined,
      avatarColor: isDark ? '#a0d911' : '#b7eb8f'
    },
    traffic: { 
      name: t('agents.types.traffic'), 
      color: isDark ? '#fadb14' : 'gold', 
      icon: <BarChartOutlined />,
      bgColor: isDark ? 'rgba(250, 219, 20, 0.1)' : undefined,
      avatarColor: isDark ? '#fadb14' : '#ffd666'
    },
    cleanup: { 
      name: t('agents.types.cleanup'), 
      color: isDark ? '#8c8c8c' : 'gray', 
      icon: <DeleteOutlined />,
      bgColor: isDark ? 'rgba(140, 140, 140, 0.1)' : undefined,
      avatarColor: isDark ? '#8c8c8c' : '#bfbfbf'
    },
  }), [isDark, t]);

  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: { 
        color: isDark ? '#52c41a' : 'green', 
        text: t('agents.status.running'), 
        icon: <CheckCircleOutlined />,
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
      stopped: { 
        color: isDark ? '#ff4d4f' : 'red', 
        text: t('agents.status.stopped'), 
        icon: <ExclamationCircleOutlined />,
        bgColor: isDark ? 'rgba(255, 77, 79, 0.1)' : undefined
      },
      paused: { 
        color: isDark ? '#faad14' : 'orange', 
        text: t('agents.status.paused'), 
        icon: <ClockCircleOutlined />,
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      },
    };
    return statusMap[status as keyof typeof statusMap];
  };

  // 获取头像背景色的辅助函数
  const getAvatarBackgroundColor = (agentType: string, isDark: boolean) => {
    const colorMap = {
      monitor: isDark ? '#1890ff' : '#4096ff',
      analysis: isDark ? '#52c41a' : '#73d13d',
      deployment: isDark ? '#722ed1' : '#9254de',
      optimization: isDark ? '#fa8c16' : '#ffa940',
      security: isDark ? '#ff4d4f' : '#ff7875',
      backup: isDark ? '#13c2c2' : '#36cfc9',
      gateway: isDark ? '#2f54eb' : '#597ef7',
      planning: isDark ? '#eb2f96' : '#f759ab',
      diagnosis: isDark ? '#fa541c' : '#ff7a45',
      config: isDark ? '#a0d911' : '#b7eb8f',
      traffic: isDark ? '#fadb14' : '#ffd666',
      cleanup: isDark ? '#8c8c8c' : '#bfbfbf'
    };
    return colorMap[agentType as keyof typeof colorMap] || (isDark ? '#1890ff' : '#4096ff');
  };

  const statusConfig = getStatusConfig(agent.status);
  const typeConfig = agentTypeMap[agent.type];
  const avatarBgColor = getAvatarBackgroundColor(agent.type, isDark);

  // 添加安全检查，确保 typeConfig 存在
  if (!typeConfig) {
    console.error('Unknown agent type:', agent.type);
    return null; // 或者返回一个默认的卡片
  }

  const handleAction = (action: string, event: React.MouseEvent) => {
    event.stopPropagation();
    switch (action) {
      case 'edit':
        onEdit(agent);
        break;
      case 'delete':
        onDelete(agent.id);
        break;
      case 'start':
        onStart(agent.id);
        break;
      case 'stop':
        onStop(agent.id);
        break;
      case 'view':
        onView(agent);
        break;
    }
  };

  return (
    <StyledCard
      $isDark={isDark}
      hoverable
      onClick={() => onView(agent)}
      actions={[
        <Tooltip title="查看详情" key="view">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={(e) => handleAction('view', e)}
          />
        </Tooltip>,
        <Tooltip title="编辑" key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={(e) => handleAction('edit', e)}
          />
        </Tooltip>,
        agent.status === 'running' ? (
          <Tooltip title="停止" key="stop">
            <Button 
              type="text" 
              icon={<PauseCircleOutlined />} 
              onClick={(e) => handleAction('stop', e)}
            />
          </Tooltip>
        ) : (
          <Tooltip title="启动" key="start">
            <Button 
              type="text" 
              icon={<PlayCircleOutlined />} 
              onClick={(e) => handleAction('start', e)}
            />
          </Tooltip>
        ),
        <Tooltip title="删除" key="delete">
          <Popconfirm
            title="确定要删除这个智能体吗？"
            onConfirm={(e) => {
              e?.stopPropagation();
              onDelete(agent.id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            onClick={(e) => e?.stopPropagation()}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </Tooltip>
      ]}
    >
      <div className="agent-header">
        <div className="agent-avatar">
          <StyledAvatar 
            size={48} 
            icon={<RobotOutlined />} 
            $bgColor={avatarBgColor}
          />
        </div>
        <div className="agent-info">
          <div className="agent-name">{agent.name}</div>
          <div className="agent-type">
            <StyledTag 
              color={typeConfig.color} 
              icon={typeConfig.icon}
              $bgColor={typeConfig.bgColor}
              $borderColor={typeConfig.color}
              $textColor={typeConfig.color}
            >
              {typeConfig.name}
            </StyledTag>
            <StyledTag 
              color={statusConfig.color} 
              icon={statusConfig.icon}
              $bgColor={statusConfig.bgColor}
              $borderColor={statusConfig.color}
              $textColor={statusConfig.color}
            >
              <span className={`status-indicator ${agent.status}`}></span>
              {statusConfig.text}
            </StyledTag>
          </div>
        </div>
      </div>

      <Paragraph className="agent-description" ellipsis={{ rows: 2 }}>
        {agent.description}
      </Paragraph>

      <div className="agent-stats">
        <Space split={<StatsSeparator $isDark={isDark}>|</StatsSeparator>} size="large">
          <StyledStatistic 
            $isDark={isDark}
            title={<StatsTitle $isDark={isDark}>完成任务</StatsTitle>} 
            value={agent.stats.tasksCompleted} 
          />
          <StyledStatistic 
            $isDark={isDark}
            title={<StatsTitle $isDark={isDark}>成功率</StatsTitle>} 
            value={agent.stats.successRate} 
            suffix="%" 
          />
          <StyledStatistic 
            $isDark={isDark}
            title={<StatsTitle $isDark={isDark}>响应时间</StatsTitle>} 
            value={agent.stats.avgResponseTime} 
            suffix="ms" 
          />
        </Space>
      </div>

      <TagContainer className="agent-tags">
        {agent.tags && agent.tags.map(tag => (
          <Tag key={tag}>
            {tag}
          </Tag>
        ))}
      </TagContainer>

      <FooterContainer>
        <FooterText type="secondary" $isDark={isDark}>
          最后活跃: {agent.lastActive}
        </FooterText>
        <FooterText type="secondary" $isDark={isDark}>
          运行时间: {agent.stats.uptime}
        </FooterText>
      </FooterContainer>
    </StyledCard>
  );
};

export default AIAgentCard;
