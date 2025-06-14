import React from 'react';
import { Card, Space, Badge, Button, Tooltip, Typography, Divider } from 'antd';
import { EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
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
  border: 2px solid #e8e8e8;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  }
  
  .ant-card-head {
    background: ${props => getGradientByLevel(props.$level)};
    border-bottom: none;
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
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

const getStatusText = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return '健康';
    case 'WARNING':
      return '告警';
    case 'ERROR':
      return '异常';
    case 'MAINTENANCE':
      return '维护中';
    default:
      return '未知';
  }
};

const PlaneCard: React.FC<PlaneCardProps> = ({ plane, onAction, className }) => {
  const handleAction = (action: 'view' | 'edit' | 'add') => {
    onAction(action, plane.id);
  };

  return (
    <StyledPlaneCard
      $level={plane.level}
      className={className}
      title={
        <Space>
          <span style={{ fontSize: '18px' }}>{plane.config.icon || '📋'}</span>
          <span>{plane.displayName || plane.name}</span>
          <Badge 
            color={getStatusColor(plane.status)} 
            text={getStatusText(plane.status)}
          />
        </Space>
      }
      extra={
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleAction('view')}
              style={{ color: 'white' }}
            />
          </Tooltip>
          <Tooltip title="编辑配置">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleAction('edit')}
              style={{ color: 'white' }}
            />
          </Tooltip>
          <Tooltip title="添加实例">
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              onClick={() => handleAction('add')}
              style={{ color: 'white' }}
            />
          </Tooltip>
        </Space>
      }
    >
      <Paragraph style={{ marginBottom: 16 }}>
        {plane.description}
      </Paragraph>

      {/* 实体健康状态统计 */}
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ marginBottom: 8, display: 'block' }}>实体健康状态:</Text>
        <EntityHealthStats 
          entityHealth={plane.entityHealth} 
          showProgress={true}
          size="default"
        />
      </div>

      <Divider style={{ margin: '16px 0' }} />
      
      <StatsContainer>
        <Space size="large">
          <div>
            <Text strong>层级: </Text>
            <Text>L{plane.level}</Text>
          </div>
          <div>
            <Text strong>实体总数: </Text>
            <Text>{plane.entityHealth.total}</Text>
          </div>
          <div>
            <Text strong>创建时间: </Text>
            <Text>{new Date(plane.createdAt).toLocaleDateString()}</Text>
          </div>
        </Space>
        
        {plane.dependencies && plane.dependencies.length > 0 && (
          <div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              依赖: {plane.dependencies.length} 个平面 
              {plane.dependencies.length > 1 && <span style={{ color: '#fa8c16' }}> (多重依赖)</span>}
            </Text>
            <div style={{ marginTop: '4px' }}>
              {plane.dependencies.map((depId, index) => (
                <span key={depId} style={{ fontSize: '11px', color: '#8c8c8c' }}>
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
