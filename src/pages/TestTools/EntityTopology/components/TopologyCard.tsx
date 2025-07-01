import React from 'react';
import { Card, Tag, Button, Space, Statistic, Typography, Avatar, Tooltip } from 'antd';
import {
  NodeIndexOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store';

const { Text, Paragraph } = Typography;

// 拓扑数据接口
export interface TopologyStats {
  nodeCount: number;
  linkCount: number;
  healthScore: number;
  lastUpdated: string;
}

export interface Topology {
  id: string;
  name: string;
  type: 'network' | 'application' | 'database' | 'system';
  status: 'active' | 'inactive' | 'warning' | 'error';
  description: string;
  plane: string;
  tags?: string[];
  stats: TopologyStats;
  createdAt: string;
}

// 组件Props接口
export interface TopologyCardProps {
  topology: Topology;
  onView: (topology: Topology) => void;
  onEdit: (topology: Topology) => void;
  onDelete: (id: string) => void;
  onRefresh: (id: string) => void;
}

// Styled Components
const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  min-height: 380px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  transition: all 0.3s ease;
  
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
    
    li {
      margin: 0;
      
      .ant-btn {
        border: none;
        background: transparent;
        color: ${props => props.$isDark ? '#ffffff' : '#666666'};
        
        &:hover {
          color: ${props => props.$isDark ? '#40a9ff' : '#1890ff'};
          background: ${props => props.$isDark ? '#262626' : '#f5f5f5'};
        }
      }
    }
  }
`;

const StatusDot = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'active':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'error':
        return '#f5222d';
      case 'inactive':
        return '#d9d9d9';
      default:
        return '#d9d9d9';
    }
  }};
  display: inline-block;
  margin-right: 8px;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const StatsSection = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.isDark ? '#303030' : '#f0f0f0'};
`;

const TopologyCard: React.FC<TopologyCardProps> = ({
  topology,
  onView,
  onEdit,
  onDelete,
  onRefresh
}) => {
  const { t } = useTranslation(['testTools', 'common']);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';

  // 获取拓扑类型图标
  const getTypeIcon = (type: string) => {
    const iconMap = {
      network: <NodeIndexOutlined />,
      application: <NodeIndexOutlined />,
      database: <NodeIndexOutlined />,
      system: <NodeIndexOutlined />
    };
    return iconMap[type as keyof typeof iconMap] || <NodeIndexOutlined />;
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <StopOutlined style={{ color: '#f5222d' }} />;
      case 'inactive':
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
    }
  };

  // 获取状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  // 获取类型标签颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'network':
        return 'blue';
      case 'application':
        return 'green';
      case 'database':
        return 'orange';
      case 'system':
        return 'purple';
      default:
        return 'default';
    }
  };

  const actions = [
    <Tooltip title={t('common:view')} key="view">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => onView(topology)}
      />
    </Tooltip>,
    <Tooltip title={t('common:edit')} key="edit">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => onEdit(topology)}
      />
    </Tooltip>,
    <Tooltip title={t('common:refresh')} key="refresh">
      <Button
        type="text"
        icon={<PlayCircleOutlined />}
        onClick={() => onRefresh(topology.id)}
      />
    </Tooltip>,
    <Tooltip title={t('common:delete')} key="delete">
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onDelete(topology.id)}
      />
    </Tooltip>
  ];

  return (
    <StyledCard $isDark={isDark} actions={actions}>
      <HeaderSection>
        <AvatarSection>
          <Avatar
            size={48}
            icon={getTypeIcon(topology.type)}
            style={{
              backgroundColor: isDark ? '#262626' : '#f5f5f5',
              color: isDark ? '#ffffff' : '#666666'
            }}
          />
          <InfoSection>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <Text strong style={{ fontSize: '16px', marginRight: 8 }}>
                {topology.name}
              </Text>
              {getStatusIcon(topology.status)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <StatusDot status={topology.status} />
              <Tag color={getStatusColor(topology.status)} size="small">
                {t(`testTools:status.${topology.status}`)}
              </Tag>
              <Tag color={getTypeColor(topology.type)} size="small">
                {t(`testTools:types.${topology.type}`)}
              </Tag>
            </div>
          </InfoSection>
        </AvatarSection>
      </HeaderSection>

      <div style={{ marginBottom: 12 }}>
        <Paragraph
          ellipsis={{ rows: 2, tooltip: topology.description }}
          style={{ 
            margin: 0, 
            color: isDark ? '#ffffff' : '#666666',
            fontSize: '14px'
          }}
        >
          {topology.description}
        </Paragraph>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {t('testTools:labels.plane')}: {topology.plane}
        </Text>
      </div>

      {topology.tags && topology.tags.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Space wrap size={[4, 4]}>
            {topology.tags.map(tag => (
              <Tag key={tag} size="small" color="default">
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      <StatsSection>
        <Space split={<div style={{ width: 1, height: 20, background: isDark ? '#303030' : '#f0f0f0' }} />}>
          <Statistic
            title={t('testTools:labels.nodeCount')}
            value={topology.stats.nodeCount}
            valueStyle={{ fontSize: '16px', color: isDark ? '#ffffff' : '#262626' }}
          />
          <Statistic
            title={t('testTools:labels.linkCount')}
            value={topology.stats.linkCount}
            valueStyle={{ fontSize: '16px', color: isDark ? '#ffffff' : '#262626' }}
          />
          <Statistic
            title={t('testTools:labels.healthScore')}
            value={topology.stats.healthScore}
            suffix="%"
            valueStyle={{ 
              fontSize: '16px', 
              color: topology.stats.healthScore >= 80 ? '#52c41a' : 
                     topology.stats.healthScore >= 60 ? '#faad14' : '#f5222d'
            }}
          />
        </Space>
        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {t('testTools:labels.updateTime')}: {topology.stats.lastUpdated}
          </Text>
        </div>
      </StatsSection>
    </StyledCard>
  );
};

export default TopologyCard;
