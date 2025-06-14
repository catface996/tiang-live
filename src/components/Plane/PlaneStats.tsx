import React from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { 
  AppstoreOutlined, 
  NodeIndexOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import type { PlaneDefinition, PlaneMetrics } from '../../types';

const { Title } = Typography;

interface PlaneStatsProps {
  planes: PlaneDefinition[];
  metrics?: PlaneMetrics[];
  loading?: boolean;
}

const PlaneStats: React.FC<PlaneStatsProps> = ({ 
  planes, 
  metrics = [], 
  loading = false 
}) => {
  // 计算统计数据
  const totalPlanes = planes.length;
  const activePlanes = planes.filter(plane => plane.status === 'ACTIVE').length;
  const warningPlanes = planes.filter(plane => plane.status === 'WARNING').length;
  const errorPlanes = planes.filter(plane => plane.status === 'ERROR').length;
  
  const totalInstances = metrics.reduce((sum, metric) => sum + metric.instanceCount, 0);
  
  // 计算实体健康状态统计
  const totalHealthyEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.healthy, 0);
  const totalWarningEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.warning, 0);
  const totalErrorEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.error, 0);
  const totalEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.total, 0);

  const statsData = [
    {
      title: '平面总数',
      value: totalPlanes,
      icon: <AppstoreOutlined />,
      color: '#1890ff',
    },
    {
      title: '健康平面',
      value: activePlanes,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
    },
    {
      title: '告警平面',
      value: warningPlanes,
      icon: <ExclamationCircleOutlined />,
      color: '#faad14',
    },
    {
      title: '异常平面',
      value: errorPlanes,
      icon: <CloseCircleOutlined />,
      color: '#ff4d4f',
    },
    {
      title: '实例总数',
      value: totalInstances,
      icon: <NodeIndexOutlined />,
      color: '#722ed1',
    },
    {
      title: '健康实体',
      value: totalHealthyEntities,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
    },
    {
      title: '告警实体',
      value: totalWarningEntities,
      icon: <ExclamationCircleOutlined />,
      color: '#faad14',
    },
    {
      title: '异常实体',
      value: totalErrorEntities,
      icon: <CloseCircleOutlined />,
      color: '#ff4d4f',
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
      {statsData.map((stat, index) => (
        <Col xs={24} sm={12} md={6} lg={3} key={index}>
          <Card loading={loading}>
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.icon}
              valueStyle={{ color: stat.color }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PlaneStats;
