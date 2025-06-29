import React from 'react';
import { Tag, Tooltip, Progress } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { EntityHealthStats } from '../../types';

interface EntityHealthStatsProps {
  entityHealth: EntityHealthStats;
  showProgress?: boolean;
  size?: 'small' | 'default';
}

const StatsContainer = styled.div<{ $size: 'small' | 'default' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$size === 'small' ? '8px' : '12px'};
  flex-wrap: wrap;
`;

const StatItem = styled.div<{ $size: 'small' | 'default' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${props => props.$size === 'small' ? '12px' : '14px'};
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const EntityHealthStatsComponent: React.FC<EntityHealthStatsProps> = ({
  entityHealth,
  showProgress = false,
  size = 'default'
}) => {
  const { t } = useTranslation(['entities', 'common']);
  const { healthy, warning, error, total } = entityHealth;

  if (total === 0) {
    return (
      <StatsContainer $size={size}>
        <Tag color="default">{t('planes:card.entityStats.noEntities')}</Tag>
      </StatsContainer>
    );
  }

  const healthyPercent = (healthy / total) * 100;
  const warningPercent = (warning / total) * 100;
  const errorPercent = (error / total) * 100;

  return (
    <div>
      <StatsContainer $size={size}>
        <Tooltip title={`${t('planes:card.entityStats.healthyTooltip')}: ${healthy} (${healthyPercent.toFixed(1)}%)`}>
          <StatItem $size={size}>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <span style={{ color: '#52c41a', fontWeight: 500 }}>{healthy}</span>
          </StatItem>
        </Tooltip>

        <Tooltip title={`${t('planes:card.entityStats.warningTooltip')}: ${warning} (${warningPercent.toFixed(1)}%)`}>
          <StatItem $size={size}>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            <span style={{ color: '#faad14', fontWeight: 500 }}>{warning}</span>
          </StatItem>
        </Tooltip>

        <Tooltip title={`${t('planes:card.entityStats.errorTooltip')}: ${error} (${errorPercent.toFixed(1)}%)`}>
          <StatItem $size={size}>
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            <span style={{ color: '#ff4d4f', fontWeight: 500 }}>{error}</span>
          </StatItem>
        </Tooltip>

        <span style={{ color: '#8c8c8c', fontSize: size === 'small' ? '11px' : '12px' }}>
          / {total}
        </span>
      </StatsContainer>

      {showProgress && (
        <ProgressContainer>
          <Progress
            percent={100}
            success={{ percent: healthyPercent }}
            strokeColor={{
              '0%': '#ff4d4f',
              [`${errorPercent}%`]: '#ff4d4f',
              [`${errorPercent + warningPercent}%`]: '#faad14',
              '100%': '#52c41a'
            }}
            showInfo={false}
            size="small"
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '11px', 
            color: '#8c8c8c',
            marginTop: '4px'
          }}>
            <span>{t('planes:card.entityStats.error')} {errorPercent.toFixed(1)}%</span>
            <span>{t('planes:card.entityStats.warning')} {warningPercent.toFixed(1)}%</span>
            <span>{t('planes:card.entityStats.healthy')} {healthyPercent.toFixed(1)}%</span>
          </div>
        </ProgressContainer>
      )}
    </div>
  );
};

export default EntityHealthStatsComponent;
