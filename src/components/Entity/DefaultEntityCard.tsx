import React from 'react';
import { Typography, Tag, Collapse } from 'antd';
import styled from 'styled-components';
import BaseEntityCard from './BaseEntityCard';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

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
  // 渲染属性信息
  const renderProperties = () => {
    if (!entity.properties || Object.keys(entity.properties).length === 0) {
      return (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          暂无属性
        </Text>
      );
    }

    return (
      <div style={{ marginTop: 8 }}>
        {Object.entries(entity.properties)
          .slice(0, 3)
          .map(([key, value]) => (
            <MetricItem key={key}>
              <Text type="secondary">{key}:</Text>
              <Text>{String(value)}</Text>
            </MetricItem>
          ))}
        {Object.keys(entity.properties).length > 3 && (
          <Text type="secondary" style={{ fontSize: '11px' }}>
            +{Object.keys(entity.properties).length - 3} 更多属性
          </Text>
        )}
      </div>
    );
  };

  // 渲染元数据信息
  const renderMetadata = () => {
    if (!entity.metadata || Object.keys(entity.metadata).length === 0) {
      return null;
    }

    const importantMetadata = ['version', 'environment', 'owner', 'team', 'department'];
    const displayMetadata = Object.entries(entity.metadata).filter(([key]) =>
      importantMetadata.includes(key.toLowerCase())
    );

    if (displayMetadata.length === 0) return null;

    return (
      <div style={{ marginTop: 8 }}>
        {displayMetadata.slice(0, 2).map(([key, value]) => (
          <MetricItem key={key}>
            <Text type="secondary">{key}:</Text>
            <Text>{String(value)}</Text>
          </MetricItem>
        ))}
      </div>
    );
  };

  return (
    <BaseEntityCard entity={entity} onClick={onClick} onEdit={onEdit}>
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>

      <MetricItem>
        <Text type="secondary">负责人:</Text>
        <Text>{entity.owner}</Text>
      </MetricItem>

      {/* 显示平面ID */}
      {entity.planeId && (
        <MetricItem>
          <Text type="secondary">平面ID:</Text>
          <Text>{entity.planeId}</Text>
        </MetricItem>
      )}

      {/* 显示属性信息 */}
      {renderProperties()}

      {/* 显示重要的元数据 */}
      {renderMetadata()}

      {/* 显示标签 */}
      <div style={{ marginTop: 12 }}>
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

      {/* 显示创建和更新时间 */}
      {(entity.createdAt || entity.updatedAt) && (
        <div style={{ marginTop: 8, borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
          {entity.createdAt && (
            <div style={{ fontSize: '11px', color: '#999' }}>
              创建: {new Date(entity.createdAt).toLocaleDateString()}
            </div>
          )}
          {entity.updatedAt && (
            <div style={{ fontSize: '11px', color: '#999' }}>
              更新: {new Date(entity.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
    </BaseEntityCard>
  );
};

export default DefaultEntityCard;
