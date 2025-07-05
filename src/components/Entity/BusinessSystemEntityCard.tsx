import React from 'react';
import { Space, Typography, Tag, Progress } from 'antd';
import styled from 'styled-components';
import type { EnumItem } from '../../services/enumApi';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;

interface BusinessSystemEntityCardProps {
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

const BusinessSystemEntityCard: React.FC<BusinessSystemEntityCardProps> = ({
  entity,
  entityTypes,
  onClick,
  onEdit
}) => {
  return (
    <BaseEntityCard
      entity={entity}
      onClick={onClick}
      onEdit={onEdit}
      extraActions={<Tag color="blue">{entity.version}</Tag>}
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <Space direction="vertical" style={{ width: '100%' }}>
        <MetricItem>
          <Text type="secondary">负责人:</Text>
          <Text>{entity.owner}</Text>
        </MetricItem>
        <MetricItem>
          <Text type="secondary">技术栈:</Text>
          <Space>
            {entity.techStack?.map((tech: string, index: number) => (
              <Tag key={index} size="small">
                {tech}
              </Tag>
            ))}
          </Space>
        </MetricItem>

        <div style={{ marginTop: 12 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            健康度
          </Text>
          <Progress
            percent={entity.healthScore}
            size="small"
            status={entity.healthScore > 80 ? 'success' : entity.healthScore > 60 ? 'normal' : 'exception'}
            style={{ marginTop: 4 }}
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

export default BusinessSystemEntityCard;
