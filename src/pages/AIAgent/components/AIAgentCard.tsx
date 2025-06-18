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
import { useAppSelector } from '../../../store';

const { Text, Paragraph } = Typography;

const CustomAvatar = styled(Avatar)<{ $bgColor: string }>`
  background-color: ${props => props.$bgColor} !important;
  transition: background-color 0.3s ease;
  
  /* 强制覆盖所有可能的全局样式 */
  &.ant-avatar {
    background-color: ${props => props.$bgColor} !important;
  }
  
  /* 确保图标始终为白色，在彩色背景上清晰可见 */
  .anticon {
    color: #ffffff !important;
  }
  
  svg {
    color: #ffffff !important;
  }
`;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  transition: all 0.3s ease;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 4px 12px rgba(255, 255, 255, 0.1)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)'
    };
    border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
  }
  
  .ant-card-body {
    padding: 20px;
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  }
  
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
    align-items: center;
    margin-bottom: 16px;
  }
  
  .agent-avatar {
    margin-right: 12px;
    
    .ant-avatar {
      background-color: unset !important;
    }
    
    .custom-avatar {
      background-color: unset !important;
    }
    
    /* 强制覆盖全局样式 */
    .ant-avatar.custom-avatar {
      background-color: unset !important;
    }
  }
  
  .agent-info {
    flex: 1;
  }
  
  .agent-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  }
  
  .agent-type {
    margin-top: 4px;
  }
  
  .agent-stats {
    margin: 16px 0;
    padding: 12px;
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    border-radius: 6px;
  }
  
  .agent-description {
    margin: 12px 0;
    color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
    font-size: 13px;
  }
  
  .agent-tags {
    margin: 12px 0;
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
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';
  
  // 使用 useMemo 来确保配置对象的稳定性
  const agentTypeMap = useMemo(() => ({
    monitor: { 
      name: '监控', 
      color: isDark ? '#1890ff' : 'blue', 
      icon: <MonitorOutlined />,
      bgColor: isDark ? 'rgba(24, 144, 255, 0.1)' : undefined,
      avatarColor: isDark ? '#1890ff' : '#4096ff'
    },
    analysis: { 
      name: '分析', 
      color: isDark ? '#52c41a' : 'green', 
      icon: <BarChartOutlined />,
      bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined,
      avatarColor: isDark ? '#52c41a' : '#73d13d'
    },
    deployment: { 
      name: '部署', 
      color: isDark ? '#722ed1' : 'purple', 
      icon: <ApiOutlined />,
      bgColor: isDark ? 'rgba(114, 46, 209, 0.1)' : undefined,
      avatarColor: isDark ? '#722ed1' : '#9254de'
    },
    optimization: { 
      name: '优化', 
      color: isDark ? '#fa8c16' : 'orange', 
      icon: <ThunderboltOutlined />,
      bgColor: isDark ? 'rgba(250, 140, 22, 0.1)' : undefined,
      avatarColor: isDark ? '#fa8c16' : '#ffa940'
    },
  }), [isDark]);

  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: { 
        color: isDark ? '#52c41a' : 'green', 
        text: '运行中', 
        icon: <CheckCircleOutlined />,
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
      stopped: { 
        color: isDark ? '#ff4d4f' : 'red', 
        text: '已停止', 
        icon: <ExclamationCircleOutlined />,
        bgColor: isDark ? 'rgba(255, 77, 79, 0.1)' : undefined
      },
      paused: { 
        color: isDark ? '#faad14' : 'orange', 
        text: '已暂停', 
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
      optimization: isDark ? '#fa8c16' : '#ffa940'
    };
    return colorMap[agentType as keyof typeof colorMap] || (isDark ? '#1890ff' : '#4096ff');
  };

  const statusConfig = getStatusConfig(agent.status);
  const typeConfig = agentTypeMap[agent.type];
  const avatarBgColor = getAvatarBackgroundColor(agent.type, isDark);

  // 添加调试信息
  console.log('Agent type:', agent.type);
  console.log('isDark:', isDark);
  console.log('typeConfig:', typeConfig);
  console.log('avatarBgColor:', avatarBgColor);

  // 添加安全检查，确保 typeConfig 存在
  if (!typeConfig) {
    console.error('Unknown agent type:', agent.type);
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
          <CustomAvatar 
            size={48} 
            icon={<RobotOutlined />} 
            $bgColor={avatarBgColor}
          />
        </div>
        <div className="agent-info">
          <div className="agent-name">{agent.name}</div>
          <div className="agent-type">
            <Tag 
              color={typeConfig.color} 
              icon={React.cloneElement(typeConfig.icon, { 
                style: { color: typeConfig.color } 
              })}
              style={typeConfig.bgColor ? { 
                backgroundColor: typeConfig.bgColor,
                border: `1px solid ${typeConfig.color}`,
                color: typeConfig.color
              } : {}}
            >
              {typeConfig.name}
            </Tag>
            <Tag 
              color={statusConfig.color} 
              icon={React.cloneElement(statusConfig.icon, { 
                style: { color: statusConfig.color } 
              })}
              style={statusConfig.bgColor ? { 
                backgroundColor: statusConfig.bgColor,
                border: `1px solid ${statusConfig.color}`,
                color: statusConfig.color
              } : {}}
            >
              <span className={`status-indicator ${agent.status}`}></span>
              {statusConfig.text}
            </Tag>
          </div>
        </div>
      </div>

      <Paragraph className="agent-description" ellipsis={{ rows: 2 }}>
        {agent.description}
      </Paragraph>

      <div className="agent-stats">
        <Space split={<span style={{ color: isDark ? '#434343' : '#d9d9d9' }}>|</span>} size="large">
          <Statistic 
            title={<span style={{ color: isDark ? '#8c8c8c' : '#666' }}>完成任务</span>} 
            value={agent.stats.tasksCompleted} 
            valueStyle={{ 
              fontSize: 14,
              color: isDark ? '#ffffff' : '#262626'
            }}
          />
          <Statistic 
            title={<span style={{ color: isDark ? '#8c8c8c' : '#666' }}>成功率</span>} 
            value={agent.stats.successRate} 
            suffix="%" 
            valueStyle={{ 
              fontSize: 14,
              color: isDark ? '#ffffff' : '#262626'
            }}
          />
          <Statistic 
            title={<span style={{ color: isDark ? '#8c8c8c' : '#666' }}>响应时间</span>} 
            value={agent.stats.avgResponseTime} 
            suffix="ms" 
            valueStyle={{ 
              fontSize: 14,
              color: isDark ? '#ffffff' : '#262626'
            }}
          />
        </Space>
      </div>

      <div className="agent-tags">
        {agent.tags && agent.tags.map(tag => (
          <Tag key={tag} style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <Text type="secondary" style={{ 
          fontSize: 12,
          color: isDark ? '#8c8c8c' : '#999'
        }}>
          最后活跃: {agent.lastActive}
        </Text>
        <Text type="secondary" style={{ 
          fontSize: 12,
          color: isDark ? '#8c8c8c' : '#999'
        }}>
          运行时间: {agent.stats.uptime}
        </Text>
      </div>
    </StyledCard>
  );
};

export default AIAgentCard;
