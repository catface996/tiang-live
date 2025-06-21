import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Badge,
  Tag,
  Descriptions,
  Divider,
  Progress,
  Table,
  Timeline,
  Alert,
  Breadcrumb,
  theme,
  Spin
} from 'antd';
import { 
  ArrowLeftOutlined,
  FileTextOutlined, 
  DownloadOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { useAppSelector } from '../../store';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: 100vh;
  background: ${props => props.$isDark ? '#000000' : '#f5f5f5'};
  transition: all 0.3s ease;
`;

const ContentCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 24px;
  }
  
  .ant-card-head {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    border-bottom: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  }
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  text-align: center;
  border-radius: 8px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  transition: all 0.3s ease;
  
  .ant-statistic-content {
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  }
`;

const ReportDetail: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('reports.detail.title'));
    // 模拟加载报告数据
    setTimeout(() => {
      setReportData(getMockReportData(id));
      setLoading(false);
    }, 1000);
  }, [t, id]);

  // 模拟报告数据
  const getMockReportData = (reportId: string | undefined) => {
    const reports = {
      '1': {
        id: '1',
        name: '系统健康度分析报告',
        type: 'health',
        status: 'published',
        author: '系统管理员',
        createdAt: '2024-06-15 10:30:00',
        lastModified: '2024-06-15 14:20:00',
        size: '2.5MB',
        downloads: 156,
        description: '本报告全面分析了系统的健康状况，包括服务可用性、性能指标、错误率等关键指标。通过多维度数据分析，为系统优化提供决策支持。',
        summary: {
          totalServices: 45,
          healthyServices: 42,
          warningServices: 2,
          criticalServices: 1,
          overallScore: 93.3
        },
        sections: [
          {
            title: '执行摘要',
            content: '系统整体健康状况良好，93.3%的服务运行正常。发现2个需要关注的警告项和1个需要紧急处理的关键问题。',
            type: 'summary'
          },
          {
            title: '服务状态分析',
            content: '详细分析各服务的运行状态、响应时间和错误率。',
            type: 'analysis',
            data: [
              { service: '用户服务', status: 'healthy', responseTime: '120ms', errorRate: '0.1%' },
              { service: '订单服务', status: 'healthy', responseTime: '95ms', errorRate: '0.05%' },
              { service: '支付服务', status: 'warning', responseTime: '280ms', errorRate: '0.8%' },
              { service: '通知服务', status: 'critical', responseTime: '1200ms', errorRate: '5.2%' }
            ]
          },
          {
            title: '性能指标趋势',
            content: '过去30天的关键性能指标变化趋势分析。',
            type: 'trend'
          },
          {
            title: '建议与行动计划',
            content: '基于分析结果提出的优化建议和具体行动计划。',
            type: 'recommendations',
            recommendations: [
              { priority: 'high', item: '立即修复通知服务的性能问题', deadline: '2024-06-20' },
              { priority: 'medium', item: '优化支付服务的响应时间', deadline: '2024-06-25' },
              { priority: 'low', item: '建立更完善的监控告警机制', deadline: '2024-07-01' }
            ]
          }
        ]
      },
      '2': {
        id: '2',
        name: '平面依赖关系分析报告',
        type: 'dependency',
        status: 'published',
        author: '架构师',
        createdAt: '2024-06-10 09:15:00',
        lastModified: '2024-06-12 16:45:00',
        size: '3.8MB',
        downloads: 89,
        description: '深入分析系统各平面之间的依赖关系，识别潜在的架构风险和优化机会。',
        summary: {
          totalPlanes: 12,
          dependencies: 34,
          circularDeps: 2,
          riskLevel: 'medium'
        }
      }
    };
    
    return reports[reportId as keyof typeof reports] || reports['1'];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'green',
      draft: 'orange',
      archived: 'default'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      published: t('reports.status.published'),
      draft: t('reports.status.draft'),
      archived: t('reports.status.archived')
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getServiceStatusColor = (status: string) => {
    const colors = {
      healthy: 'success',
      warning: 'warning',
      critical: 'error'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'blue'
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const serviceColumns = [
    {
      title: t('reports.detail.service'),
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: t('reports.detail.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={getServiceStatusColor(status)} 
          text={status === 'healthy' ? t('reports.detail.healthy') : 
                status === 'warning' ? t('reports.detail.warning') : 
                t('reports.detail.critical')} 
        />
      ),
    },
    {
      title: t('reports.detail.responseTime'),
      dataIndex: 'responseTime',
      key: 'responseTime',
    },
    {
      title: t('reports.detail.errorRate'),
      dataIndex: 'errorRate',
      key: 'errorRate',
    },
  ];

  if (loading) {
    return (
      <PageContainer $isDark={isDark}>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: isDark ? '#ffffff' : '#666666' }}>
            {t('reports.detail.loading')}
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!reportData) {
    return (
      <PageContainer $isDark={isDark}>
        <Alert
          message={t('reports.detail.notFound')}
          description={t('reports.detail.notFoundDesc')}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/reports')}>
              {t('common.back')}
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer $isDark={isDark}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
            {t('reports.title')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{reportData.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 报告头部 */}
      <ContentCard $isDark={isDark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <Space align="start" size={16}>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/reports')}
                style={{
                  color: isDark ? '#ffffff' : undefined,
                  borderColor: isDark ? '#434343' : undefined,
                  backgroundColor: isDark ? 'transparent' : undefined
                }}
              >
                {t('common.back')}
              </Button>
              <div>
                <Title level={2} style={{ margin: 0, color: isDark ? '#ffffff' : '#262626' }}>
                  <FileTextOutlined style={{ marginRight: 12 }} />
                  {reportData.name}
                </Title>
                <Space style={{ marginTop: 8 }}>
                  <Tag color={getStatusColor(reportData.status)}>
                    {getStatusText(reportData.status)}
                  </Tag>
                  <Text type="secondary">
                    <UserOutlined /> {reportData.author}
                  </Text>
                  <Text type="secondary">
                    <CalendarOutlined /> {reportData.createdAt}
                  </Text>
                </Space>
              </div>
            </Space>
          </div>
          <Space>
            <Button icon={<ShareAltOutlined />}>
              {t('reports.detail.share')}
            </Button>
            <Button icon={<PrinterOutlined />}>
              {t('reports.detail.print')}
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              {t('reports.detail.download')}
            </Button>
          </Space>
        </div>

        <Paragraph style={{ color: isDark ? '#ffffff' : '#595959', fontSize: 16 }}>
          {reportData.description}
        </Paragraph>

        <Descriptions column={4} style={{ marginTop: 24 }}>
          <Descriptions.Item label={t('reports.detail.fileSize')}>
            {reportData.size}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.downloads')}>
            {reportData.downloads}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.lastModified')}>
            {reportData.lastModified}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports.detail.reportId')}>
            {reportData.id}
          </Descriptions.Item>
        </Descriptions>
      </ContentCard>

      {/* 报告摘要统计 */}
      {reportData.summary && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.totalServices')}
                value={reportData.summary.totalServices}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: isDark ? '#1890ff' : '#1890ff' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.healthyServices')}
                value={reportData.summary.healthyServices}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: isDark ? '#52c41a' : '#52c41a' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.warningServices')}
                value={reportData.summary.warningServices}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: isDark ? '#faad14' : '#faad14' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports.detail.overallScore')}
                value={reportData.summary.overallScore}
                suffix="%"
                prefix={<PieChartOutlined />}
                valueStyle={{ color: isDark ? '#722ed1' : '#722ed1' }}
              />
            </StatsCard>
          </Col>
        </Row>
      )}

      {/* 报告内容 */}
      {reportData.sections?.map((section: any, index: number) => (
        <ContentCard key={index} $isDark={isDark} title={section.title}>
          <Paragraph style={{ color: isDark ? '#ffffff' : '#595959' }}>
            {section.content}
          </Paragraph>

          {section.type === 'analysis' && section.data && (
            <Table
              columns={serviceColumns}
              dataSource={section.data}
              pagination={false}
              size="middle"
              style={{ marginTop: 16 }}
            />
          )}

          {section.type === 'trend' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <LineChartOutlined style={{ fontSize: 48, color: isDark ? '#1890ff' : '#1890ff' }} />
              <div style={{ marginTop: 16, color: isDark ? '#ffffff' : '#666666' }}>
                {t('reports.detail.chartPlaceholder')}
              </div>
            </div>
          )}

          {section.type === 'recommendations' && section.recommendations && (
            <Timeline style={{ marginTop: 16 }}>
              {section.recommendations.map((rec: any, idx: number) => (
                <Timeline.Item
                  key={idx}
                  color={getPriorityColor(rec.priority)}
                  dot={
                    rec.priority === 'high' ? <ExclamationCircleOutlined /> :
                    rec.priority === 'medium' ? <InfoCircleOutlined /> :
                    <CheckCircleOutlined />
                  }
                >
                  <div>
                    <Space>
                      <Tag color={getPriorityColor(rec.priority)}>
                        {rec.priority === 'high' ? t('reports.detail.highPriority') :
                         rec.priority === 'medium' ? t('reports.detail.mediumPriority') :
                         t('reports.detail.lowPriority')}
                      </Tag>
                      <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                        {rec.item}
                      </Text>
                    </Space>
                    <div style={{ marginTop: 4 }}>
                      <Text type="secondary">
                        <ClockCircleOutlined /> {t('reports.detail.deadline')}: {rec.deadline}
                      </Text>
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </ContentCard>
      ))}
    </PageContainer>
  );
};

export default ReportDetail;
