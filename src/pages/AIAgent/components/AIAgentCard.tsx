import React from 'react';
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
  Badge
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

const { Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
  
  .agent-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .agent-avatar {
    margin-right: 12px;
  }
  
  .agent-info {
    flex: 1;
  }
  
  .agent-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #262626;
  }
  
  .agent-type {
    margin-top: 4px;
  }
  
  .agent-stats {
    margin: 16px 0;
    padding: 12px;
    background: #fafafa;
    border-radius: 6px;
  }
  
  .agent-description {
    margin: 12px 0;
    color: #666;
    font-size: 13px;
  }
  
  .agent-tags {
    margin: 12px 0;
  }
  
  .agent-actions {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
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
  const agentTypeMap = {
    monitor: { name: '监控', color: 'blue', icon: <MonitorOutlined /> },
    analysis: { name: '分析', color: 'green', icon: <BarChartOutlined /> },
    deployment: { name: '部署', color: 'purple', icon: <ApiOutlined /> },
    optimization: { name: '优化', color: 'orange', icon: <ThunderboltOutlined /> },
  };

  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: { color: 'green', text: '运行中', icon: <CheckCircleOutlined /> },
      stopped: { color: 'red', text: '已停止', icon: <ExclamationCircleOutlined /> },
      paused: { color: 'orange', text: '已暂停', icon: <ClockCircleOutlined /> },
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const statusConfig = getStatusConfig(agent.status);
  const typeConfig = agentTypeMap[agent.type];

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
          <Avatar 
            size={48} 
            icon={<RobotOutlined />} 
            style={{ 
              backgroundColor: typeConfig.color === 'blue' ? '#1890ff' : 
                              typeConfig.color === 'green' ? '#52c41a' :
                              typeConfig.color === 'purple' ? '#722ed1' : '#fa8c16'
            }}
          />
        </div>
        <div className="agent-info">
          <div className="agent-name">{agent.name}</div>
          <div className="agent-type">
            <Tag color={typeConfig.color} icon={typeConfig.icon}>
              {typeConfig.name}
            </Tag>
            <Tag color={statusConfig.color} icon={statusConfig.icon}>
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
        <Space split={<span style={{ color: '#d9d9d9' }}>|</span>} size="large">
          <Statistic 
            title="完成任务" 
            value={agent.stats.tasksCompleted} 
            valueStyle={{ fontSize: 14 }}
          />
          <Statistic 
            title="成功率" 
            value={agent.stats.successRate} 
            suffix="%" 
            valueStyle={{ fontSize: 14 }}
          />
          <Statistic 
            title="响应时间" 
            value={agent.stats.avgResponseTime} 
            suffix="ms" 
            valueStyle={{ fontSize: 14 }}
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

      <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          最后活跃: {agent.lastActive}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          运行时间: {agent.stats.uptime}
        </Text>
      </div>
    </StyledCard>
  );
};

export default AIAgentCard;
