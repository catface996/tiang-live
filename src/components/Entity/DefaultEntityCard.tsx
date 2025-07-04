import React from 'react';
import { Typography, Tag } from 'antd';
import styled from 'styled-components';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;

interface DefaultEntityCardProps {
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

const DefaultEntityCard: React.FC<DefaultEntityCardProps> = ({ entity, onClick, onEdit }) => {
  return (
    <BaseEntityCard entity={entity} onClick={onClick} onEdit={onEdit}>
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <MetricItem>
        <Text type="secondary">负责人:</Text>
        <Text>{entity.owner}</Text>
      </MetricItem>

      <div style={{ marginTop: 12 }}>
        {console.log('🏷️ DefaultEntityCard - 实体标签:', entity.tags)}
        {entity.tags && entity.tags.length > 0 ? (
          entity.tags.map((tag: string, index: number) => (
            <Tag key={index} size="small" style={{ marginBottom: 4 }}>
              {tag}
            </Tag>
          ))
        ) : (
          <Text type="secondary" style={{ fontSize: '12px' }}>
            暂无标签
          </Text>
        )}
      </div>
    </BaseEntityCard>
  );
};

export default DefaultEntityCard;
