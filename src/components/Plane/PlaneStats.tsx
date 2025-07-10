import React from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { 
  AppstoreOutlined, 
  NodeIndexOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { PlaneDefinition, PlaneMetrics } from '../../types';

const { Title } = Typography;

interface PlaneStatsProps {
  planes: PlaneDefinition[];
  metrics?: PlaneMetrics[];
  statsData?: any; // 真实统计数据
  loading?: boolean;
}

const PlaneStats: React.FC<PlaneStatsProps> = ({ 
  planes, 
  metrics = [], 
  statsData,
  loading = false 
}) => {
  const { t } = useTranslation(['planes', 'common']);
  
  // 如果有真实统计数据，优先使用
  let totalPlanes, activePlanes, warningPlanes, errorPlanes;
  let totalEntities, totalHealthyEntities, totalWarningEntities, totalErrorEntities;
  
  if (statsData) {
    // 使用真实统计数据
    totalPlanes = statsData.planeStats.totalPlanes;
    activePlanes = statsData.planeStats.activePlanes;
    warningPlanes = statsData.planeStats.warningPlanes;
    errorPlanes = statsData.planeStats.errorPlanes;
    
    totalEntities = statsData.entityStats.totalEntities;
    totalHealthyEntities = statsData.entityStats.healthyEntities;
    totalWarningEntities = statsData.entityStats.warningEntities;
    totalErrorEntities = statsData.entityStats.errorEntities;
  } else {
    // 使用计算的统计数据（兜底）
    totalPlanes = planes.length;
    activePlanes = planes.filter(plane => plane.status === 'ACTIVE').length;
    warningPlanes = planes.filter(plane => plane.status === 'WARNING').length;
    errorPlanes = planes.filter(plane => plane.status === 'ERROR').length;
    
    // 计算实体健康状态统计
    totalHealthyEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.healthy, 0);
    totalWarningEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.warning, 0);
    totalErrorEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.error, 0);
    totalEntities = planes.reduce((sum, plane) => sum + plane.entityHealth.total, 0);
  }

  const displayData = [
    {
      title: t('planes:stats.totalPlanes'),
      value: totalPlanes,
      icon: <AppstoreOutlined />,
      className: 'plane-stats-primary'
    },
    {
      title: t('planes:stats.activePlanes'),
      value: activePlanes,
      icon: <CheckCircleOutlined />,
      className: 'plane-stats-success'
    },
    {
      title: t('planes:stats.warningPlanes'),
      value: warningPlanes,
      icon: <ExclamationCircleOutlined />,
      className: 'plane-stats-warning'
    },
    {
      title: t('planes:stats.errorPlanes'),
      value: errorPlanes,
      icon: <CloseCircleOutlined />,
      className: 'plane-stats-error'
    },
    {
      title: t('planes:stats.totalEntities'),
      value: totalEntities,
      icon: <NodeIndexOutlined />,
      className: 'plane-stats-purple'
    },
    {
      title: t('planes:stats.healthyEntities'),
      value: totalHealthyEntities,
      icon: <CheckCircleOutlined />,
      className: 'plane-stats-success'
    },
    {
      title: t('planes:stats.warningEntities'),
      value: totalWarningEntities,
      icon: <ExclamationCircleOutlined />,
      className: 'plane-stats-warning'
    },
    {
      title: t('planes:stats.errorEntities'),
      value: totalErrorEntities,
      icon: <CloseCircleOutlined />,
      className: 'plane-stats-error'
    }
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
      {displayData.map((stat, index) => (
        <Col xs={24} sm={12} md={6} lg={3} key={index}>
          <Card loading={loading} className={stat.className}>
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.icon}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PlaneStats;
