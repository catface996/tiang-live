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
  TrendingUpOutlined,
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
  HeartOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
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

  useEffect(() => {
    setPageTitle('仪表盘');
  }, []);

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
    title: {
      text: '任务执行趋势',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['任务集合', '巡检任务', 'Hook任务'],
      top: 30
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
      name: '执行次数'
    },
    series: [
      {
        name: '任务集合',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { color: '#1890ff' }
      },
      {
        name: '巡检任务',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: 'Hook任务',
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410],
        itemStyle: { color: '#faad14' }
      }
    ]
  });

  // 系统健康状态饼图
  const getHealthStatusOption = () => ({
    title: {
      text: '系统健康状态',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'middle'
    },
    series: [
      {
        name: '健康状态',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        data: [
          { value: 142, name: '健康', itemStyle: { color: '#52c41a' } },
          { value: 12, name: '警告', itemStyle: { color: '#faad14' } },
          { value: 2, name: '异常', itemStyle: { color: '#ff4d4f' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  // 任务成功率柱状图
  const getSuccessRateOption = () => ({
    title: {
      text: '任务成功率统计',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
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
      data: ['健康检查', '性能监控', '安全扫描', '数据同步', '告警通知', '日志分析']
    },
    yAxis: {
      type: 'value',
      name: '成功率 (%)',
      max: 100
    },
    series: [
      {
        name: '成功率',
        type: 'bar',
        data: [
          { value: 98.5, itemStyle: { color: '#52c41a' } },
          { value: 96.2, itemStyle: { color: '#52c41a' } },
          { value: 94.8, itemStyle: { color: '#faad14' } },
          { value: 97.3, itemStyle: { color: '#52c41a' } },
          { value: 99.1, itemStyle: { color: '#52c41a' } },
          { value: 92.7, itemStyle: { color: '#faad14' } }
        ],
        markLine: {
          data: [{ type: 'average', name: '平均值' }]
        }
      }
    ]
  });

  // 响应时间趋势图
  const getResponseTimeOption = () => ({
    title: {
      text: '系统响应时间趋势',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return `${params[0].name}<br/>响应时间: ${params[0].value}ms`;
      }
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
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value',
      name: '响应时间 (ms)'
    },
    series: [
      {
        name: '响应时间',
        type: 'area',
        smooth: true,
        data: [180, 165, 220, 280, 320, 290, 245],
        itemStyle: { color: '#1890ff' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
            ]
          }
        }
      }
    ]
  });

  // 资源使用率仪表盘
  const getResourceGaugeOption = (title: string, value: number, color: string) => ({
    title: {
      text: title,
      left: 'center',
      top: '10%',
      textStyle: { fontSize: 14, fontWeight: 'normal' }
    },
    series: [
      {
        name: title,
        type: 'gauge',
        center: ['50%', '60%'],
        radius: '80%',
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']],
            width: 8
          }
        },
        pointer: {
          itemStyle: { color: color }
        },
        axisTick: { show: false },
        splitLine: {
          length: 15,
          lineStyle: { width: 2, color: '#999' }
        },
        axisLabel: {
          color: '#999',
          fontSize: 12
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: color,
          fontSize: 20,
          offsetCenter: [0, '70%']
        },
        data: [{ value: value, name: title }]
      }
    ]
  });

  // 最近告警数据
  const recentAlerts = [
    {
      id: '1',
      type: 'error',
      title: '支付服务响应超时',
      description: '支付服务平均响应时间超过500ms',
      time: '2024-06-15 14:30:00',
      status: 'active'
    },
    {
      id: '2',
      type: 'warning',
      title: '数据库连接数过高',
      description: 'MySQL连接数达到180，接近上限',
      time: '2024-06-15 14:15:00',
      status: 'active'
    },
    {
      id: '3',
      type: 'info',
      title: '安全扫描完成',
      description: '发现1个中等风险漏洞',
      time: '2024-06-15 02:00:00',
      status: 'resolved'
    }
  ];

  // 热门实体排行
  const topEntities = [
    { name: '用户服务', usage: 1247, trend: 'up' },
    { name: '订单服务', usage: 1156, trend: 'up' },
    { name: '支付服务', usage: 987, trend: 'down' },
    { name: 'API网关', usage: 856, trend: 'up' },
    { name: '数据库集群', usage: 734, trend: 'stable' }
  ];

  return (
    <PageContainer>
      {/* 页面标题和控制栏 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <DashboardOutlined style={{ color: '#1890ff' }} />
                运维仪表盘
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16, color: '#666' }}>
              系统运行状态总览，实时监控各项关键指标
            </Paragraph>
          </div>
          <Space>
            <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
              <Option value="1d">近1天</Option>
              <Option value="7d">近7天</Option>
              <Option value="30d">近30天</Option>
            </Select>
            <Button icon={<TrendingUpOutlined />}>
              刷新
            </Button>
          </Space>
        </div>
      </div>

      {/* 核心指标统计 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平面总数"
              value={systemStats.totalPlanes}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<DatabaseOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                较昨日 +2
              </Text>
            </div>
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="实体总数"
              value={systemStats.totalEntities}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<ApiOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                较昨日 +8
              </Text>
            </div>
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="运行任务"
              value={systemStats.runningTasks}
              suffix={`/${systemStats.totalTaskCollections}`}
              valueStyle={{ color: '#faad14' }}
              prefix={<ThunderboltOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Progress 
                percent={(systemStats.runningTasks / systemStats.totalTaskCollections) * 100} 
                size="small" 
                showInfo={false}
              />
            </div>
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="系统健康度"
              value={systemStats.systemHealth}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
              prefix={<HeartOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                优秀
              </Text>
            </div>
          </StatsCard>
        </Col>
      </Row>

      {/* 告警信息 */}
      {systemStats.activeAlerts > 0 && (
        <Alert
          message={`当前有 ${systemStats.activeAlerts} 个活跃告警`}
          description="请及时处理系统告警，确保服务稳定运行"
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button size="small" type="primary">
              查看详情
            </Button>
          }
        />
      )}

      {/* 图表区域 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <ChartCard title="任务执行趋势">
            <ReactECharts 
              option={getTaskTrendOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="系统健康状态">
            <ReactECharts 
              option={getHealthStatusOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <ChartCard title="任务成功率统计">
            <ReactECharts 
              option={getSuccessRateOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <ChartCard title="平均响应时间">
            <ReactECharts 
              option={getResponseTimeOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
      </Row>

      {/* 资源使用率仪表盘 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <ChartCard>
            <ReactECharts 
              option={getResourceGaugeOption('CPU使用率', 68, '#1890ff')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
        <Col xs={24} sm={8}>
          <ChartCard>
            <ReactECharts 
              option={getResourceGaugeOption('内存使用率', 72, '#52c41a')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
        <Col xs={24} sm={8}>
          <ChartCard>
            <ReactECharts 
              option={getResourceGaugeOption('磁盘使用率', 45, '#faad14')} 
              style={{ height: '200px' }}
              opts={{ renderer: 'svg' }}
            />
          </ChartCard>
        </Col>
      </Row>

      {/* 详细信息区域 */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <AlertCard title="最近告警">
            <List
              itemLayout="horizontal"
              dataSource={recentAlerts}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color={item.status === 'active' ? 'red' : 'green'}>
                      {item.status === 'active' ? '活跃' : '已解决'}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={
                          item.type === 'error' ? <BugOutlined /> :
                          item.type === 'warning' ? <AlertOutlined /> :
                          <CheckCircleOutlined />
                        }
                        style={{
                          backgroundColor: 
                            item.type === 'error' ? '#ff4d4f' :
                            item.type === 'warning' ? '#faad14' :
                            '#52c41a'
                        }}
                      />
                    }
                    title={item.title}
                    description={
                      <div>
                        <div>{item.description}</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </AlertCard>
        </Col>
        <Col xs={24} lg={12}>
          <AlertCard title="热门实体排行">
            <List
              itemLayout="horizontal"
              dataSource={topEntities}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        count={index + 1} 
                        style={{ 
                          backgroundColor: index < 3 ? '#faad14' : '#d9d9d9',
                          color: index < 3 ? '#fff' : '#666'
                        }}
                      />
                    }
                    title={item.name}
                    description={`使用次数: ${item.usage}`}
                  />
                  <div>
                    {item.trend === 'up' && <TrendingUpOutlined style={{ color: '#52c41a' }} />}
                    {item.trend === 'down' && <TrendingUpOutlined style={{ color: '#ff4d4f', transform: 'rotate(180deg)' }} />}
                    {item.trend === 'stable' && <span style={{ color: '#faad14' }}>—</span>}
                  </div>
                </List.Item>
              )}
            />
          </AlertCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
