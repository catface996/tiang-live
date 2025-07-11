import React from 'react';
import { Card, Badge, Space, Typography, Button } from 'antd';
import {
  FileTextOutlined,
  LinkOutlined,
  AppstoreOutlined,
  ApiOutlined,
  DatabaseOutlined,
  TableOutlined,
  CloudServerOutlined,
  DeploymentUnitOutlined,
  ScheduleOutlined,
  SettingOutlined,
  EditOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import type { EnumItem } from '../../services/enumApi';

const { Text } = Typography;

interface BaseEntityCardProps {
  entity: any;
  entityTypes?: EnumItem[];
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
  children: React.ReactNode;
  extraActions?: React.ReactNode;
}

const StyledCard = styled(Card)`
  height: 100%;
  min-height: 380px;
  margin-bottom: 0;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    padding: 16px 20px;
    min-height: 64px;
  }

  .ant-card-body {
    padding: 20px;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }

  .ant-card-head-title {
    font-weight: 600;
    font-size: 16px;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    min-height: 320px;
    
    .ant-card-head {
      padding: 12px 16px;
      min-height: 56px;
    }
    
    .ant-card-body {
      padding: 16px;
      height: calc(100% - 56px);
    }
  }
`;

const EntityIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  margin-right: 8px;
`;

const BaseEntityCard: React.FC<BaseEntityCardProps> = ({
  entity,
  entityTypes,
  onClick,
  onEdit,
  children,
  extraActions
}) => {
  // 实体类型转换函数
  const getEntityTypeLabel = (typeValue: string) => {
    if (!entityTypes || entityTypes.length === 0) {
      console.log('🔍 BaseEntityCard - 枚举数据为空，使用原始值:', typeValue);
      return typeValue || '未知类型';
    }

    const typeEnum = entityTypes.find(item => item.value === typeValue);
    if (typeEnum) {
      console.log('✅ BaseEntityCard - 找到类型转换:', typeValue, '->', typeEnum.label);
      return typeEnum.label;
    } else {
      console.log('⚠️ BaseEntityCard - 未找到类型转换，使用原始值:', typeValue);
      return typeValue || '未知类型';
    }
  };

  const getEntityIcon = (type: string) => {
    const iconMap = {
      report: { icon: <FileTextOutlined />, color: '#1890ff' },
      business_link: { icon: <LinkOutlined />, color: '#52c41a' },
      business_system: { icon: <AppstoreOutlined />, color: '#faad14' },
      api: { icon: <ApiOutlined />, color: '#722ed1' },
      database: { icon: <DatabaseOutlined />, color: '#f5222d' },
      table: { icon: <TableOutlined />, color: '#fa8c16' },
      middleware: { icon: <CloudServerOutlined />, color: '#13c2c2' },
      microservice: { icon: <DeploymentUnitOutlined />, color: '#eb2f96' },
      scheduled_job: { icon: <ScheduleOutlined />, color: '#a0d911' },
      configuration: { icon: <SettingOutlined />, color: '#2f54eb' }
    };
    return iconMap[type as keyof typeof iconMap] || { icon: <AppstoreOutlined />, color: '#8c8c8c' };
  };

  const getStatusColor = (status: string) => {
    const statusMap = {
      active: 'green',
      running: 'green',
      inactive: 'red',
      warning: 'orange',
      pending: 'blue'
    };
    return statusMap[status as keyof typeof statusMap] || 'default';
  };

  const iconConfig = getEntityIcon(entity.type);

  return (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: iconConfig.color }}>{iconConfig.icon}</EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {getEntityTypeLabel(entity.type)}
            </Text>
          </div>
        </Space>
      }
      extra={
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={e => {
              e.stopPropagation();
              onEdit?.(entity);
            }}
            style={{ color: '#1890ff' }}
          />
          {extraActions}
          <Badge status={getStatusColor(entity.status) as any} text={entity.status} />
        </Space>
      }
    >
      {children}
    </StyledCard>
  );
};

export default BaseEntityCard;
