import React from 'react';
import { Typography, Tag, Collapse } from 'antd';
import styled from 'styled-components';
import BaseEntityCard from './BaseEntityCard';
import type { EnumItem } from '../../services/enumApi';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface DefaultEntityCardProps {
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

const DefaultEntityCard: React.FC<DefaultEntityCardProps> = ({ entity, entityTypes, onClick, onEdit }) => {
  // 根据实体类型获取关键属性字段
  const getKeyPropertiesForType = (entityType: string) => {
    const keyPropertiesMap: { [key: string]: string[] } = {
      USER: ['email', 'department', 'role', 'phone'],
      SYSTEM: ['version', 'environment', 'status', 'url'],
      API: ['method', 'endpoint', 'version', 'protocol'],
      DATABASE: ['type', 'version', 'host', 'port'],
      TABLE: ['database', 'schema', 'rows', 'size'],
      MIDDLEWARE: ['type', 'version', 'port', 'cluster'],
      MICROSERVICE: ['port', 'version', 'framework', 'replicas'],
      SCHEDULED_JOB: ['schedule', 'nextRun', 'status', 'duration'],
      CONFIGURATION: ['environment', 'version', 'format', 'source']
    };
    return keyPropertiesMap[entityType] || ['version', 'environment', 'status', 'type'];
  };

  // 智能渲染属性信息
  const renderProperties = () => {
    if (!entity.properties || Object.keys(entity.properties).length === 0) {
      return (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          暂无属性
        </Text>
      );
    }

    // 获取当前实体类型的关键属性
    const keyProperties = getKeyPropertiesForType(entity.type);
    const allProperties = Object.entries(entity.properties);

    // 优先显示关键属性
    const prioritizedProperties = [];

    // 先添加关键属性
    keyProperties.forEach(key => {
      const found = allProperties.find(([propKey]) => propKey.toLowerCase() === key.toLowerCase());
      if (found) {
        prioritizedProperties.push(found);
      }
    });

    // 再添加其他属性（排除已添加的关键属性）
    const remainingProperties = allProperties.filter(
      ([key]) => !keyProperties.some(keyProp => keyProp.toLowerCase() === key.toLowerCase())
    );

    const displayProperties = [...prioritizedProperties, ...remainingProperties].slice(0, 4);

    return (
      <div style={{ marginTop: 8 }}>
        {displayProperties.map(([key, value]) => (
          <MetricItem key={key}>
            <Text type="secondary">{key}:</Text>
            <Text ellipsis={{ tooltip: String(value) }} style={{ maxWidth: '120px' }}>
              {String(value)}
            </Text>
          </MetricItem>
        ))}
        {allProperties.length > 4 && (
          <Text type="secondary" style={{ fontSize: '11px' }}>
            +{allProperties.length - 4} 更多属性
          </Text>
        )}
      </div>
    );
  };

  // 智能渲染元数据信息
  const renderMetadata = () => {
    if (!entity.metadata || Object.keys(entity.metadata).length === 0) {
      return null;
    }

    // 重要的元数据字段（按优先级排序）
    const importantMetadata = ['owner', 'team', 'department', 'version', 'environment', 'createdBy', 'updatedBy'];
    const allMetadata = Object.entries(entity.metadata);

    // 优先显示重要元数据
    const prioritizedMetadata = [];
    importantMetadata.forEach(key => {
      const found = allMetadata.find(([metaKey]) => metaKey.toLowerCase() === key.toLowerCase());
      if (found) {
        prioritizedMetadata.push(found);
      }
    });

    if (prioritizedMetadata.length === 0) return null;

    return (
      <div style={{ marginTop: 8 }}>
        {prioritizedMetadata.slice(0, 2).map(([key, value]) => (
          <MetricItem key={key}>
            <Text type="secondary">{key}:</Text>
            <Text ellipsis={{ tooltip: String(value) }} style={{ maxWidth: '120px' }}>
              {String(value)}
            </Text>
          </MetricItem>
        ))}
      </div>
    );
  };

  return (
    <BaseEntityCard entity={entity} entityTypes={entityTypes} onClick={onClick} onEdit={onEdit}>
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
          <div>
            {entity.tags.slice(0, 3).map((tag: string, index: number) => (
              <Tag key={index} size="small" style={{ marginBottom: 4, marginRight: 4 }}>
                {tag}
              </Tag>
            ))}
            {entity.tags.length > 3 && (
              <Tag size="small" style={{ marginBottom: 4 }}>
                +{entity.tags.length - 3}
              </Tag>
            )}
          </div>
        ) : entity.labels && entity.labels.length > 0 ? (
          <div>
            {entity.labels.slice(0, 3).map((label: string, index: number) => (
              <Tag key={index} size="small" color="blue" style={{ marginBottom: 4, marginRight: 4 }}>
                {label}
              </Tag>
            ))}
            {entity.labels.length > 3 && (
              <Tag size="small" color="blue" style={{ marginBottom: 4 }}>
                +{entity.labels.length - 3}
              </Tag>
            )}
          </div>
        ) : (
          <Text type="secondary" style={{ fontSize: '12px' }}>
            暂无标签
          </Text>
        )}
      </div>

      {/* 显示创建和更新时间 */}
      {(entity.createdAt || entity.updatedAt) && (
        <div style={{ 
          marginTop: 8, 
          borderTop: '1px solid #f0f0f0', 
          paddingTop: 8,
          fontSize: '11px', 
          color: '#999',
          display: 'flex',
          justifyContent: entity.createdAt && entity.updatedAt ? 'space-between' : 'flex-start',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {entity.createdAt && (
            <span>创建: {new Date(entity.createdAt).toLocaleDateString()}</span>
          )}
          {entity.updatedAt && (
            <span>更新: {new Date(entity.updatedAt).toLocaleDateString()}</span>
          )}
        </div>
      )}
    </BaseEntityCard>
  );
};

export default DefaultEntityCard;
