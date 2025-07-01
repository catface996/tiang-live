import React from 'react';
import { Card, Tag, Button, Space, Statistic, Typography, Avatar, Tooltip } from 'antd';
import {
  NodeIndexOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

// 类型定义
type TopologyStats = {
  nodeCount: number;
  linkCount: number;
  healthScore: number;
  lastUpdated: string;
};

type Topology = {
  id: string;
  name: string;
  type: 'network' | 'application' | 'database' | 'system';
  status: 'active' | 'inactive' | 'warning' | 'error';
  description: string;
  plane: string;
  tags?: string[];
  stats: TopologyStats;
  createdAt: string;
};

type TopologyCardProps = {
  topology: Topology;
  onView: (topology: Topology) => void;
  onEdit: (topology: Topology) => void;
  onDelete: (id: string) => void;
  onRefresh: (id: string) => void;
  onClick?: (topology: Topology) => void;
};

const TopologyCard: React.FC<TopologyCardProps> = ({ topology, onView, onEdit, onDelete, onRefresh, onClick }) => {
  const { t } = useTranslation(['entityTopology', 'common']);

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
        return <CheckCircleOutlined className="status-icon status-active" />;
      case 'warning':
        return <ExclamationCircleOutlined className="status-icon status-warning" />;
      case 'error':
        return <StopOutlined className="status-icon status-error" />;
      case 'inactive':
        return <ClockCircleOutlined className="status-icon status-inactive" />;
      default:
        return <ClockCircleOutlined className="status-icon status-inactive" />;
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
        onClick={e => {
          e.stopPropagation();
          onView(topology);
        }}
      />
    </Tooltip>,
    <Tooltip title={t('common:edit')} key="edit">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={e => {
          e.stopPropagation();
          onEdit(topology);
        }}
      />
    </Tooltip>,
    <Tooltip title={t('common:refresh')} key="refresh">
      <Button
        type="text"
        icon={<PlayCircleOutlined />}
        onClick={e => {
          e.stopPropagation();
          onRefresh(topology.id);
        }}
      />
    </Tooltip>,
    <Tooltip title={t('common:delete')} key="delete">
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={e => {
          e.stopPropagation();
          onDelete(topology.id);
        }}
      />
    </Tooltip>
  ];

  return (
    <Card
      className="topology-card"
      actions={actions}
      onClick={() => onClick?.(topology)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="topology-card-header">
        <div className="topology-card-avatar-section">
          <Avatar size={48} icon={getTypeIcon(topology.type)} className="topology-card-avatar" />
          <div className="topology-card-info">
            <div className="topology-card-title-row">
              <Text strong className="topology-card-title">
                {topology.name}
              </Text>
              {getStatusIcon(topology.status)}
            </div>
            <div className="topology-card-tags-row">
              <div className={`status-dot status-${topology.status}`} />
              <Tag color={getStatusColor(topology.status)} size="small">
                {t(`entityTopology:status.${topology.status}`)}
              </Tag>
              <Tag color={getTypeColor(topology.type)} size="small">
                {t(`entityTopology:types.${topology.type}`)}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      <div className="topology-card-description">
        <Paragraph ellipsis={{ rows: 2, tooltip: topology.description }} className="topology-card-description-text">
          {topology.description}
        </Paragraph>
      </div>

      <div className="topology-card-plane">
        <Text type="secondary" className="topology-card-plane-text">
          {t('entityTopology:labels.plane')}: {topology.plane}
        </Text>
      </div>

      {topology.tags && topology.tags.length > 0 && (
        <div className="topology-card-custom-tags">
          <Space wrap size={[4, 4]}>
            {topology.tags.map(tag => (
              <Tag key={tag} size="small" color="default">
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      <div className="topology-card-stats">
        <Space split={<div className="topology-card-stats-divider" />}>
          <Statistic
            title={t('entityTopology:labels.nodeCount')}
            value={topology.stats.nodeCount}
            className="topology-card-statistic"
          />
          <Statistic
            title={t('entityTopology:labels.linkCount')}
            value={topology.stats.linkCount}
            className="topology-card-statistic"
          />
          <Statistic
            title={t('entityTopology:labels.healthScore')}
            value={topology.stats.healthScore}
            suffix="%"
            className={`topology-card-statistic health-score-${
              topology.stats.healthScore >= 80 ? 'good' : topology.stats.healthScore >= 60 ? 'warning' : 'error'
            }`}
          />
        </Space>
        <div className="topology-card-update-time">
          <Text type="secondary" className="topology-card-update-time-text">
            {t('entityTopology:labels.updateTime')}: {topology.stats.lastUpdated}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default TopologyCard;
