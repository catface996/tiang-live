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

const { Text } = Typography;

interface BaseEntityCardProps {
  entity: any;
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
  children: React.ReactNode;
  extraActions?: React.ReactNode;
}

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    padding: 12px 16px;
  }
  
  .ant-card-body {
    padding: 16px;
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
  onClick, 
  onEdit, 
  children, 
  extraActions 
}) => {
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
          <EntityIcon style={{ backgroundColor: iconConfig.color }}>
            {iconConfig.icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(entity);
            }}
            style={{ color: '#1890ff' }}
          />
          {extraActions}
          <Badge 
            status={getStatusColor(entity.status) as any} 
            text={entity.status}
          />
        </Space>
      }
    >
      {children}
    </StyledCard>
  );
};

export default BaseEntityCard;
