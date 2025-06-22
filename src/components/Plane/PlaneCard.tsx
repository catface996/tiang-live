import React from 'react';
import { Card, Space, Badge, Button, Tooltip, Typography, Divider } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { PlaneDefinition } from '../../types';
import { getGradientByLevel } from '../../utils/planeColors';
import EntityHealthStats from './EntityHealthStats';

const { Text, Paragraph } = Typography;

interface PlaneCardProps {
  plane: PlaneDefinition;
  onAction: (action: 'view' | 'edit' | 'add', planeId: string) => void;
  className?: string;
}

const StyledPlaneCard = styled(Card)<{ $level: number }>`
  margin-bottom: 16px;
  border: 2px solid var(--border-color);
  background-color: var(--card-bg);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--card-hover-shadow);
    transform: translateY(-2px);
  }
  
  .ant-card-head {
    background: ${props => getGradientByLevel(props.$level)};
    border-bottom: none;
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
  
  .ant-card-body {
    color: var(--text-color);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return '#52c41a';
    case 'WARNING':
      return '#faad14';
    case 'ERROR':
      return '#ff4d4f';
    case 'MAINTENANCE':
      return '#1890ff';
    default:
      return '#d9d9d9';
  }
};

const getStatusText = (status: string, t: any) => {
  return t(`planes:status.${status}`) || t('planes:status.UNKNOWN');
};

const PlaneCard: React.FC<PlaneCardProps> = ({ plane, onAction, className }) => {
  const { t } = useTranslation(['planes', 'common']);
  
  const handleAction = (action: 'view' | 'edit' | 'add') => {
    onAction(action, plane.id);
  };

  return (
    <StyledPlaneCard
      $level={plane.level}
      className={className}
      title={
        <Space>
          <span className="plane-icon">{plane.config.icon || '📋'}</span>
          <span>{plane.displayName || plane.name}</span>
          <Badge 
            color={getStatusColor(plane.status)} 
            text={getStatusText(plane.status, t)}
          />
        </Space>
      }
      extra={
        <Space>
          <Tooltip title={t('planes:card.tooltips.viewDetails')}>
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleAction('view')}
              className="plane-action-btn"
            />
          </Tooltip>
          <Tooltip title={t('planes:card.tooltips.editConfig')}>
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleAction('edit')}
              className="plane-action-btn"
            />
          </Tooltip>
          <Tooltip title={t('planes:card.tooltips.addInstance')}>
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              onClick={() => handleAction('add')}
              className="plane-action-btn"
            />
          </Tooltip>
        </Space>
      }
    >
      <Paragraph className="plane-description">
        {plane.description}
      </Paragraph>

      {/* 实体健康状态统计 */}
      <div className="entity-health-section">
        <Text strong className="section-title">{t('planes:card.labels.entityHealthStatus')}:</Text>
        <EntityHealthStats 
          entityHealth={plane.entityHealth} 
          showProgress={true}
          size="default"
        />
      </div>

      <Divider className="plane-divider" />
      
      <StatsContainer>
        <Space size="large">
          <div>
            <Text strong>{t('planes:card.labels.level')}: </Text>
            <Text>L{plane.level}</Text>
          </div>
          <div>
            <Text strong>{t('planes:card.labels.totalEntities')}: </Text>
            <Text>{plane.entityHealth.total}</Text>
          </div>
          <div>
            <Text strong>{t('planes:card.labels.createdAt')}: </Text>
            <Text>{new Date(plane.createdAt).toLocaleDateString()}</Text>
          </div>
        </Space>
        
        {plane.dependencies && plane.dependencies.length > 0 && (
          <div>
            <Text type="secondary" className="dependency-text">
              {t('planes:card.labels.dependencies')}: {plane.dependencies.length} {t('planes:card.labels.planesCount')}
              {plane.dependencies.length > 1 && <span className="multiple-dependency-warning"> ({t('planes:card.labels.multipleDependency')})</span>}
            </Text>
            <div className="dependency-list">
              {plane.dependencies.map((depId, index) => (
                <span key={depId} className="dependency-item">
                  {depId}
                  {index < plane.dependencies.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        )}
      </StatsContainer>
    </StyledPlaneCard>
  );
};

export default PlaneCard;
