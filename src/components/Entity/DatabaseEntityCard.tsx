import React from 'react';
import { Space, Typography, Tag, Statistic } from 'antd';
import styled from 'styled-components';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;

interface DatabaseEntityCardProps {
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

const DatabaseEntityCard: React.FC<DatabaseEntityCardProps> = ({ entity, onClick, onEdit }) => {
  return (
    <BaseEntityCard 
      entity={entity} 
      onClick={onClick} 
      onEdit={onEdit}
      extraActions={<Tag color="red">{entity.technology}</Tag>}
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <Space direction="vertical" style={{ width: '100%' }}>
        <MetricItem>
          <Text type="secondary">连接地址:</Text>
          <Text code style={{ fontSize: '12px' }}>{entity.host}:{entity.port}</Text>
        </MetricItem>
        <MetricItem>
          <Text type="secondary">负责人:</Text>
          <Text>{entity.owner}</Text>
        </MetricItem>
        
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          <Statistic 
            title="连接数" 
            value={entity.metrics?.connectionCount} 
            valueStyle={{ fontSize: '14px' }}
          />
          <Statistic 
            title="存储大小" 
            value={entity.metrics?.storageSize} 
            suffix="GB"
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

export default DatabaseEntityCard;
