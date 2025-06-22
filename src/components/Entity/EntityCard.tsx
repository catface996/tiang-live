import React from 'react';
import { Card, Tag, Badge, Progress, Statistic, Space, Typography, Tooltip, Button } from 'antd';
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
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Text, Paragraph } = Typography;

interface EntityCardProps {
  entity: any;
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
}

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  transition: all 0.3s ease;
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
  margin-right: 12px;
  font-size: 16px;
  color: white;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick, onEdit }) => {
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

  const getStatusIcon = (status: string) => {
    const iconMap = {
      active: <CheckCircleOutlined />,
      running: <CheckCircleOutlined />,
      inactive: <ExclamationCircleOutlined />,
      warning: <ExclamationCircleOutlined />,
      pending: <ClockCircleOutlined />
    };
    return iconMap[status as keyof typeof iconMap] || <CheckCircleOutlined />;
  };

  const renderReportCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Badge 
          status={getStatusColor(entity.status) as any} 
          text={entity.status}
        />
      }
    >
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
              <Tag key={index} size="small">{source}</Tag>
            ))}
          </Space>
        </MetricItem>
        
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <Statistic 
            title="查看次数" 
            value={entity.metrics?.viewCount} 
            valueStyle={{ fontSize: '14px' }}
          />
          <Statistic 
            title="导出次数" 
            value={entity.metrics?.exportCount} 
            valueStyle={{ fontSize: '14px' }}
          />
          <Statistic 
            title="加载时间" 
            value={entity.metrics?.avgLoadTime} 
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
    </StyledCard>
  );

  const renderBusinessLinkCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Badge 
          status={getStatusColor(entity.status) as any} 
          text={entity.status}
        />
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 12 }}>
        <Statistic 
          title="响应时间" 
          value={entity.avgResponseTime} 
          valueStyle={{ fontSize: '14px', color: entity.avgResponseTime > '1s' ? '#faad14' : '#52c41a' }}
        />
        <Statistic 
          title="成功率" 
          value={entity.successRate} 
          suffix="%" 
          valueStyle={{ fontSize: '14px', color: entity.successRate > 99 ? '#52c41a' : '#faad14' }}
        />
        <Statistic 
          title="日均量" 
          value={entity.dailyVolume?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="可用性" 
          value={entity.sla?.availability} 
          valueStyle={{ fontSize: '14px' }}
        />
      </div>
      
      <MetricItem>
        <Text type="secondary">依赖服务:</Text>
        <Space>
          {entity.dependencies?.slice(0, 3).map((dep: string, index: number) => (
            <Tag key={index} size="small">{dep}</Tag>
          ))}
          {entity.dependencies?.length > 3 && <Tag size="small">+{entity.dependencies.length - 3}</Tag>}
        </Space>
      </MetricItem>
      
      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </StyledCard>
  );

  const renderSystemCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Space>
          <Tag color="blue">{entity.version}</Tag>
          <Badge 
            status={getStatusColor(entity.status) as any} 
            text={entity.status}
          />
        </Space>
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <MetricItem>
        <Text type="secondary">技术栈:</Text>
        <Tag>{entity.technology}</Tag>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">实例数:</Text>
        <Text strong>{entity.instances}</Text>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">负责人:</Text>
        <Text>{entity.owner}</Text>
      </MetricItem>
      
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <Statistic 
          title="QPS" 
          value={entity.metrics?.qps?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="响应时间" 
          value={entity.metrics?.responseTime} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="错误率" 
          value={entity.metrics?.errorRate} 
          valueStyle={{ fontSize: '14px', color: parseFloat(entity.metrics?.errorRate) > 0.1 ? '#f5222d' : '#52c41a' }}
        />
      </div>
      
      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </StyledCard>
  );

  const renderApiCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Space>
          <Tag color={entity.method === 'GET' ? 'green' : entity.method === 'POST' ? 'blue' : 'orange'}>
            {entity.method}
          </Tag>
          <Badge 
            status={getStatusColor(entity.status) as any} 
            text={entity.status}
          />
        </Space>
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <MetricItem>
        <Text type="secondary">接口路径:</Text>
        <Text code style={{ fontSize: '12px' }}>{entity.path}</Text>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">版本:</Text>
        <Tag size="small">{entity.version}</Tag>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">限流:</Text>
        <Text>{entity.rateLimit}</Text>
      </MetricItem>
      
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <Statistic 
          title="QPS" 
          value={entity.qps?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="响应时间" 
          value={entity.responseTime} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="成功率" 
          value={entity.successRate} 
          suffix="%" 
          valueStyle={{ fontSize: '14px', color: entity.successRate > 99 ? '#52c41a' : '#faad14' }}
        />
      </div>
      
      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </StyledCard>
  );

  const renderDatabaseCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Space>
          <Tag color="red">{entity.technology}</Tag>
          <Badge 
            status={getStatusColor(entity.status) as any} 
            text={entity.status}
          />
        </Space>
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <MetricItem>
        <Text type="secondary">集群配置:</Text>
        <Tag>{entity.config}</Tag>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">节点数:</Text>
        <Text strong>{entity.nodes}</Text>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">区域:</Text>
        <Text>{entity.region}</Text>
      </MetricItem>
      
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <Statistic 
          title="存储" 
          value={entity.storage} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="连接数" 
          value={entity.connections?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="QPS" 
          value={entity.qps?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
      </div>
      
      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </StyledCard>
  );

  const renderTableCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
          </EntityIcon>
          <div>
            <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{entity.category}</Text>
          </div>
        </Space>
      }
      extra={
        <Badge 
          status={getStatusColor(entity.status) as any} 
          text={entity.status}
        />
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
      <MetricItem>
        <Text type="secondary">数据库:</Text>
        <Tag size="small">{entity.database}</Tag>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">表名:</Text>
        <Text code style={{ fontSize: '12px' }}>{entity.tableName}</Text>
      </MetricItem>
      <MetricItem>
        <Text type="secondary">增长率:</Text>
        <Text>{entity.growthRate}</Text>
      </MetricItem>
      
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <Statistic 
          title="行数" 
          value={entity.rowCount?.toLocaleString()} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="数据大小" 
          value={entity.dataSize} 
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic 
          title="分区数" 
          value={entity.partitions} 
          valueStyle={{ fontSize: '14px' }}
        />
      </div>
      
      <div style={{ marginTop: 12 }}>
        {entity.tags?.map((tag: string, index: number) => (
          <Tag key={index} size="small" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
      </div>
    </StyledCard>
  );

  const renderDefaultCard = () => (
    <StyledCard
      size="small"
      onClick={() => onClick?.(entity)}
      style={{ cursor: 'pointer' }}
      title={
        <Space>
          <EntityIcon style={{ backgroundColor: getEntityIcon(entity.type).color }}>
            {getEntityIcon(entity.type).icon}
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
          <Badge 
            status={getStatusColor(entity.status) as any} 
            text={entity.status}
          />
        </Space>
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
        {entity.description}
      </Paragraph>
      
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
    </StyledCard>
  );

  const renderCard = () => {
    switch (entity.type) {
      case 'report':
        return renderReportCard();
      case 'business_link':
        return renderBusinessLinkCard();
      case 'business_system':
        return renderSystemCard();
      case 'api':
        return renderApiCard();
      case 'database':
        return renderDatabaseCard();
      case 'table':
        return renderTableCard();
      default:
        return renderDefaultCard();
    }
  };

  return renderCard();
};

export default EntityCard;
