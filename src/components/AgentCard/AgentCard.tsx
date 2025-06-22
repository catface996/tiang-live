import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Avatar, 
  Tag, 
  Button, 
  Tooltip, 
  Popconfirm, 
  Space, 
  Statistic, 
  Typography,
  theme
} from 'antd';
import {
  RobotOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  MonitorOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
  ThunderboltOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  GatewayOutlined,
  ProjectOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  CarOutlined,
  ClearOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';

const { Text, Paragraph } = Typography;

// 智能体数据接口
export interface AgentStats {
  tasksCompleted: number;
  successRate: number;
  avgResponseTime: number;
  uptime: string;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'stopped' | 'paused';
  description: string;
  lastActive: string;
  tags?: string[];
  stats: AgentStats;
}

// 组件Props接口
export interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onView: (agent: Agent) => void;
}

// Styled Components
const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  min-height: 420px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.$isDark 
      ? '0 8px 24px rgba(255, 255, 255, 0.12)' 
      : '0 8px 24px rgba(0, 0, 0, 0.12)'
    };
    border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
  }
  
  .ant-card-body {
    padding: 24px;
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .ant-card-actions {
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    padding: 12px 24px;
    
    li {
      border-right: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
      margin: 0;
      
      &:last-child {
        border-right: none;
      }
    }
    
    .ant-btn {
      color: ${props => props.$isDark ? '#8c8c8c' : '#666666'};
      border: none;
      background: transparent;
      transition: all 0.2s ease;
      
      &:hover {
        color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
        background: ${props => props.$isDark ? 'rgba(23, 125, 220, 0.1)' : 'rgba(64, 169, 255, 0.1)'};
        transform: scale(1.05);
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
      border: none;
      background: transparent;
      transition: all 0.2s ease;
      
      &:hover {
        color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
        background: ${props => props.$isDark ? 'rgba(23, 125, 220, 0.1)' : 'rgba(64, 169, 255, 0.1)'};
        transform: scale(1.05);
      }
    }
  }
`;

const AgentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 16px;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)<{ $bgColor: string }>`
  background: linear-gradient(135deg, ${props => props.$bgColor}, ${props => props.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${props => props.$bgColor}40;
  border: 2px solid ${props => props.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 24px;
  }
  
  svg {
    color: #ffffff !important;
  }
`;

const AgentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AgentName = styled.div<{ $isDark: boolean }>`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  line-height: 1.4;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const StyledTag = styled(Tag)<{ $bgColor?: string; $borderColor?: string; $textColor?: string }>`
  border-radius: 6px;
  font-size: 12px;
  padding: 2px 8px;
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

const StatsContainer = styled.div<{ $isDark: boolean }>`
  margin: 20px 0;
  padding: 16px;
  background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px;
  
  .ant-space {
    width: 100%;
    justify-content: space-between;
  }
  
  .ant-space-item {
    flex: 1;
    text-align: center;
    min-width: 0;
  }
`;

const StatsSeparator = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
  font-weight: 300;
`;

const StatsTitle = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
  font-size: 12px;
`;

const StyledStatistic = styled(Statistic)<{ $isDark: boolean }>`
  .ant-statistic-content-value {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: ${props => props.$isDark ? '#ffffff' : '#262626'} !important;
    white-space: nowrap;
  }
  
  .ant-statistic-content-suffix {
    font-size: 12px !important;
    color: ${props => props.$isDark ? '#8c8c8c' : '#666'} !important;
  }
  
  .ant-statistic-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Description = styled(Paragraph)<{ $isDark: boolean }>`
  margin: 16px 0 !important;
  color: ${props => props.$isDark ? '#8c8c8c' : '#666'} !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  
  .ant-typography {
    margin-bottom: 0 !important;
  }
`;

const UserTagsContainer = styled.div`
  margin: 16px 0;
  
  .ant-tag {
    margin: 0 4px 4px 0;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  padding-top: 16px;
  gap: 4px;
`;

const FooterText = styled(Text)<{ $isDark: boolean }>`
  font-size: 12px !important;
  color: ${props => props.$isDark ? '#8c8c8c' : '#999'} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  
  &:last-child {
    text-align: right;
  }
`;

const StatusIndicator = styled.span<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  
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

// 智能体类型配置
const getAgentTypeConfig = (t: any) => ({
  monitor: { 
    name: t('agents.types.monitor'), 
    color: '#1890ff', 
    bgColor: '#e6f7ff',
    icon: <MonitorOutlined />
  },
  analysis: { 
    name: t('agents.types.analysis'), 
    color: '#52c41a', 
    bgColor: '#f6ffed',
    icon: <BarChartOutlined />
  },
  deployment: { 
    name: t('agents.types.deployment'), 
    color: '#722ed1', 
    bgColor: '#f9f0ff',
    icon: <DeploymentUnitOutlined />
  },
  optimization: { 
    name: t('agents.types.optimization'), 
    color: '#fa8c16', 
    bgColor: '#fff7e6',
    icon: <ThunderboltOutlined />
  },
  security: { 
    name: t('agents.types.security'), 
    color: '#ff4d4f', 
    bgColor: '#fff2f0',
    icon: <SecurityScanOutlined />
  },
  backup: { 
    name: t('agents.types.backup'), 
    color: '#13c2c2', 
    bgColor: '#e6fffb',
    icon: <DatabaseOutlined />
  },
  gateway: { 
    name: t('agents.types.gateway'), 
    color: '#2f54eb', 
    bgColor: '#f0f5ff',
    icon: <GatewayOutlined />
  },
  planning: { 
    name: t('agents.types.planning'), 
    color: '#eb2f96', 
    bgColor: '#fff0f6',
    icon: <ProjectOutlined />
  },
  diagnosis: { 
    name: t('agents.types.diagnosis'), 
    color: '#fa541c', 
    bgColor: '#fff2e8',
    icon: <MedicineBoxOutlined />
  },
  config: { 
    name: t('agents.types.config'), 
    color: '#a0d911', 
    bgColor: '#fcffe6',
    icon: <SettingOutlined />
  },
  traffic: { 
    name: t('agents.types.traffic'), 
    color: '#fadb14', 
    bgColor: '#feffe6',
    icon: <CarOutlined />
  },
  cleanup: { 
    name: t('agents.types.cleanup'), 
    color: '#8c8c8c', 
    bgColor: '#f5f5f5',
    icon: <ClearOutlined />
  }
});

// 状态配置
const getStatusConfig = (status: string, t: any) => {
  const statusMap = {
    running: { 
      text: t('agents.status.running'), 
      color: '#52c41a', 
      bgColor: '#f6ffed',
      icon: <CheckCircleOutlined />
    },
    stopped: { 
      text: t('agents.status.stopped'), 
      color: '#ff4d4f', 
      bgColor: '#fff2f0',
      icon: <ExclamationCircleOutlined />
    },
    paused: { 
      text: t('agents.status.paused'), 
      color: '#faad14', 
      bgColor: '#fff7e6',
      icon: <ClockCircleOutlined />
    }
  };
  return statusMap[status as keyof typeof statusMap];
};

// 获取头像背景色
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

const AgentCard: React.FC<AgentCardProps> = ({
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
  const navigate = useNavigate();
  const isDark = currentTheme === 'dark';
  
  // 使用 useMemo 来确保配置对象的稳定性
  const agentTypeMap = useMemo(() => getAgentTypeConfig(t), [t]);
  
  const statusConfig = getStatusConfig(agent.status, t);
  const typeConfig = agentTypeMap[agent.type as keyof typeof agentTypeMap];
  const avatarBgColor = getAvatarBackgroundColor(agent.type, isDark);

  // 添加安全检查，确保 typeConfig 存在
  if (!typeConfig) {
    console.error('Unknown agent type:', agent.type);
    return null;
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
        navigate(`/ai-agents/detail/${agent.id}`);
        break;
    }
  };

  return (
    <StyledCard
      $isDark={isDark}
      hoverable
      onClick={() => onView(agent)}
    >
      <AgentHeader>
        <AvatarContainer>
          <StyledAvatar 
            size={56} 
            icon={<RobotOutlined />} 
            $bgColor={avatarBgColor}
          />
        </AvatarContainer>
        <AgentInfo>
          <AgentName $isDark={isDark}>{agent.name}</AgentName>
          <TagContainer>
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
              <StatusIndicator status={agent.status} />
              {statusConfig.text}
            </StyledTag>
          </TagContainer>
        </AgentInfo>
      </AgentHeader>

      <Description $isDark={isDark} ellipsis={{ rows: 2 }}>
        {agent.description}
      </Description>

      <StatsContainer $isDark={isDark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ color: isDark ? '#8c8c8c' : '#666', fontSize: '12px' }}>
            {t('agents.stats.tasksCompleted')}:
          </span>
          <span style={{ color: isDark ? '#ffffff' : '#262626', fontSize: '14px', fontWeight: 'bold' }}>
            {agent.stats.tasksCompleted}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ color: isDark ? '#8c8c8c' : '#666', fontSize: '12px' }}>
            {t('agents.stats.successRate')}:
          </span>
          <span style={{ color: isDark ? '#ffffff' : '#262626', fontSize: '14px', fontWeight: 'bold' }}>
            {agent.stats.successRate}%
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: isDark ? '#8c8c8c' : '#666', fontSize: '12px' }}>
            {t('agents.stats.responseTime')}:
          </span>
          <span style={{ color: isDark ? '#ffffff' : '#262626', fontSize: '14px', fontWeight: 'bold' }}>
            {agent.stats.avgResponseTime}ms
          </span>
        </div>
      </StatsContainer>

      {agent.tags && agent.tags.length > 0 && (
        <UserTagsContainer>
          {agent.tags.map(tag => (
            <Tag key={tag}>
              {tag}
            </Tag>
          ))}
        </UserTagsContainer>
      )}

      <FooterContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ color: isDark ? '#8c8c8c' : '#999', fontSize: '12px' }}>
            {t('agents.lastActive')}:
          </span>
          <span style={{ color: isDark ? '#8c8c8c' : '#999', fontSize: '12px' }}>
            {agent.lastActive}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ color: isDark ? '#8c8c8c' : '#999', fontSize: '12px' }}>
            {t('agents.uptime')}:
          </span>
          <span style={{ color: isDark ? '#8c8c8c' : '#999', fontSize: '12px' }}>
            {agent.stats.uptime}
          </span>
        </div>
      </FooterContainer>
      
      {/* 操作按钮区域 - 单独一行，右对齐 */}
      <div className="card-actions">
        <Space>
          <Tooltip title={t('common.view')}>
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={(e) => handleAction('view', e)}
            />
          </Tooltip>
          <Tooltip title={t('common.edit')}>
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={(e) => handleAction('edit', e)}
            />
          </Tooltip>
        </Space>
      </div>
    </StyledCard>
  );
};

export default AgentCard;
