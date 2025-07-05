import React from 'react';
import { Space, Typography, Tag, Statistic } from 'antd';
import styled from 'styled-components';
import BaseEntityCard from './BaseEntityCard';
import type { EnumItem } from '../../services/enumApi';

const { Text, Paragraph } = Typography;

interface ReportEntityCardProps {
  entity: any;
  entityTypes?: EnumItem[];
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

const ReportEntityCard: React.FC<ReportEntityCardProps> = ({ entity, entityTypes, onClick, onEdit }) => {
  return (
    <BaseEntityCard entity={entity} entityTypes={entityTypes} onClick={onClick} onEdit={onEdit}>
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <Space direction="vertical" style={{ width: '100%' }}>
        <MetricItem>
          <Text type="secondary">更新频率:</Text>
          <Tag color="blue">{entity.updateFrequency}</Tag>
        </MetricItem>
        <MetricItem>
          <Text type="secondary">负责人:</Text>
          <Text>{entity.owner}</Text>
        </MetricItem>
        <MetricItem>
          <Text type="secondary">数据源:</Text>
          <Space>
            {entity.dataSource?.map((source: string, index: number) => (
              <Tag key={index} size="small">
                {source}
              </Tag>
            ))}
          </Space>
        </MetricItem>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <Statistic title="查看次数" value={entity.metrics?.viewCount} valueStyle={{ fontSize: '14px' }} />
          <Statistic title="导出次数" value={entity.metrics?.exportCount} valueStyle={{ fontSize: '14px' }} />
          <Statistic title="加载时间" value={entity.metrics?.avgLoadTime} valueStyle={{ fontSize: '14px' }} />
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

export default ReportEntityCard;
