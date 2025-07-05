import React from 'react';
import { Typography, Tag } from 'antd';
import styled from 'styled-components';
import type { EnumItem } from '../../services/enumApi';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;

interface TableEntityCardProps {
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

const TableEntityCard: React.FC<TableEntityCardProps> = ({ entity, entityTypes, onClick, onEdit }) => {
  return (
    <BaseEntityCard entity={entity} entityTypes={entityTypes} onClick={onClick} onEdit={onEdit}>
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <MetricItem>
        <Text type="secondary">数据库:</Text>
        <Text>{entity.database}</Text>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">负责人:</Text>
        <Text>{entity.owner}</Text>
      </MetricItem>

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

export default TableEntityCard;
