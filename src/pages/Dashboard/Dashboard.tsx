import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress,
  Table,
  Tag,
  Space,
  Select,
  DatePicker,
  Button,
  Tabs,
  Alert,
  List,
  Avatar,
  Badge
} from 'antd';
import {
  DashboardOutlined,
  ArrowUpOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  DatabaseOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  BugOutlined,
  RocketOutlined,
  HeartOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
  
  .ant-statistic-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
  
  .ant-statistic-content {
    font-size: 24px;
    font-weight: 600;
  }
`;

const ChartCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
`;

const AlertCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('dashboard.title'));
  }, [t]);

  // 系统概览统计数据
  const systemStats = {
    totalPlanes: 12,
    totalEntities: 156,
    totalSequences: 89,
    totalTaskCollections: 24,
    runningTasks: 18,
    totalInspections: 1247,
    totalHooks: 67,
    activeAlerts: 3,
    systemHealth: 98.5,
    avgResponseTime: 245
  };

  // 任务执行趋势数据
  const getTaskTrendOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: [t('tasks.collections.title'), t('tasks.inspection.title'), t('tasks.hooks.title')],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['06-09', '06-10', '06-11', '06-12', '06-13', '06-14', '06-15']
    },
    yAxis: {
      type: 'value',
      name: t('dashboard.executionCount')
    },
    series: [
      {
        name: t('tasks.collections.title'),
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { color: '#1890ff' }
      },
      {
        name: t('tasks.inspection.title'),
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: t('tasks.hooks.title'),
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410],
        itemStyle: { color: '#faad14' }
      }
    ]
  });

  // 系统健康状态数据
  const getSystemHealthOption = () => ({
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: t('dashboard.systemHealthScore'),
        type: 'gauge',
        detail: {
          formatter: '{value}%',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1890ff'
        },
        data: [{ value: systemStats.systemHealth, name: t('dashboard.healthScore') }],
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.7, '#ff4d4f'],
              [0.9, '#faad14'],
              [1, '#52c41a']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: '#1890ff'
          }
        },
        axisTick: {
          distance: -20,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -20,
          length: 20,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 12
        }
      }
    ]
  });

  // 最近活动数据
  const recentActivities = [
    {
      id: 1,
      type: 'success',
      title: t('tasks.inspection.title'),
      description: t('messages.operationSuccess'),
      time: '2分钟前',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 2,
      type: 'warning',
      title: t('dashboard.alertSummary'),
      description: t('common.warning'),
      time: '5分钟前',
      icon: <AlertOutlined style={{ color: '#faad14' }} />
    },
    {
      id: 3,
      type: 'info',
      title: t('agents.title'),
      description: t('common.running'),
      time: '10分钟前',
      icon: <RocketOutlined style={{ color: '#1890ff' }} />
    }
  ];

  return (
    <PageContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>{t('dashboard.title')}</Title>
        <Paragraph>{t('dashboard.subtitle')}</Paragraph>
      </div>

      {/* 系统概览统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('planes.stats.totalPlanes')}
              value={systemStats.totalPlanes}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('entities.stats.totalEntities')}
              value={systemStats.totalEntities}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('sequences.stats.totalSequences')}
              value={systemStats.totalSequences}
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('dashboard.activeUsers')}
              value={systemStats.runningTasks}
              prefix={<UserOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <ChartCard title={t('dashboard.performanceMetrics')}>
            <ReactECharts 
              option={getTaskTrendOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <ChartCard title={t('dashboard.systemStatus')}>
            <ReactECharts 
              option={getSystemHealthOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
      </Row>

      {/* 最近活动和快捷操作 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={t('dashboard.recentActivities')}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} />}
                    title={item.title}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{item.description}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t('dashboard.quickActions')}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block icon={<RocketOutlined />}>
                {t('common.create')} {t('tasks.inspection.title')}
              </Button>
              <Button block icon={<DatabaseOutlined />}>
                {t('common.view')} {t('entities.title')}
              </Button>
              <Button block icon={<AlertOutlined />}>
                {t('dashboard.alertSummary')}
              </Button>
              <Button block icon={<SafetyCertificateOutlined />}>
                {t('systemSettings.title')}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
