import React from 'react';
import { Space, Typography, Tag, Statistic } from 'antd';
import styled from 'styled-components';
import type { EnumItem } from '../../services/enumApi';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;

interface ApiEntityCardProps {
  entityTypes?: EnumItem[];
  entity: any;
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
}

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ApiEntityCard: React.FC<ApiEntityCardProps> = ({ entity, entityTypes, onClick, onEdit }) => {
  const getMethodColor = (method: string) => {
    const colorMap = {
      GET: 'green',
      POST: 'blue',
      PUT: 'orange',
      DELETE: 'red',
      PATCH: 'purple'
    };
    return colorMap[method as keyof typeof colorMap] || 'default';
  };

  return (
    <BaseEntityCard
      entity={entity}
      onClick={onClick}
      onEdit={onEdit}
      extraActions={<Tag color={getMethodColor(entity.method)}>{entity.method}</Tag>}
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <Space direction="vertical" style={{ width: '100%' }}>
        <MetricItem>
          <Text type="secondary">路径:</Text>
          <Text code style={{ fontSize: '12px' }}>
            {entity.path}
          </Text>
        </MetricItem>
        <MetricItem>
          <Text type="secondary">负责人:</Text>
          <Text>{entity.owner}</Text>
        </MetricItem>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          <Statistic title="调用次数" value={entity.metrics?.callCount} valueStyle={{ fontSize: '14px' }} />
          <Statistic
            title="响应时间"
            value={entity.metrics?.avgResponseTime}
            suffix="ms"
            valueStyle={{ fontSize: '14px' }}
          />
        </div>
      </Space>

      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </BaseEntityCard>
  );
};

export default ApiEntityCard;
