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
  ArrowUpOutlined,
  ArrowDownOutlined,
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
import { getReportById } from '../../services/reportService';
import type { Report } from '../../types/report';

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
  const { t } = useTranslation(['reports', 'common']);
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('reports:detail.title'));
    // 加载报告数据
    const loadReportData = async () => {
      try {
        setLoading(true);
        const data = await getReportById(id || '');
        setReportData(data);
      } catch (error) {
        console.error('Failed to load report data:', error);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadReportData();
  }, [t, id]);

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
      published: t('reports:status.published'),
      draft: t('reports:status.draft'),
      archived: t('reports:status.archived')
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
      title: t('reports:detail.service'),
      dataIndex: 'service',
      key: 'service',
      width: '25%',
    },
    {
      title: t('reports:detail.status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <Badge 
          status={getServiceStatusColor(status)} 
          text={status === 'healthy' ? t('reports:detail.healthy') : 
                status === 'warning' ? t('reports:detail.warning') : 
                t('reports:detail.critical')} 
        />
      ),
    },
    {
      title: t('reports:detail.responseTime'),
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: '15%',
    },
    {
      title: t('reports:detail.errorRate'),
      dataIndex: 'errorRate',
      key: 'errorRate',
      width: '15%',
    },
    {
      title: t('reports:detail.availability'),
      dataIndex: 'availability',
      key: 'availability',
      width: '15%',
    },
    {
      title: t('reports:detail.requests'),
      dataIndex: 'requests',
      key: 'requests',
      width: '15%',
    },
  ];

  if (loading) {
    return (
      <PageContainer $isDark={isDark}>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: isDark ? '#ffffff' : '#666666' }}>
            {t('reports:detail.loading')}
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!reportData) {
    return (
      <PageContainer $isDark={isDark}>
        <Alert
          message={t('reports:detail.notFound')}
          description={t('reports:detail.notFoundDesc')}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/reports')}>
              {t('common:back')}
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
            {t('reports:title')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{reportData.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 报告头部 */}
      <ContentCard $isDark={isDark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
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
          <Space>
            <Button icon={<ShareAltOutlined />}>
              {t('reports:detail.share')}
            </Button>
            <Button icon={<PrinterOutlined />}>
              {t('reports:detail.print')}
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              {t('reports:detail.download')}
            </Button>
          </Space>
        </div>

        <Paragraph style={{ color: isDark ? '#ffffff' : '#595959', fontSize: 16 }}>
          {reportData.description}
        </Paragraph>

        <Descriptions column={4} style={{ marginTop: 24 }}>
          <Descriptions.Item label={t('reports:detail.fileSize')}>
            {reportData.size}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports:detail.downloads')}>
            {reportData.downloads}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports:detail.lastModified')}>
            {reportData.lastModified}
          </Descriptions.Item>
          <Descriptions.Item label={t('reports:detail.reportId')}>
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
                title={t('reports:detail.totalServices')}
                value={reportData.summary.totalServices}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: isDark ? '#1890ff' : '#1890ff' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports:detail.healthyServices')}
                value={reportData.summary.healthyServices}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: isDark ? '#52c41a' : '#52c41a' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports:detail.warningServices')}
                value={reportData.summary.warningServices}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: isDark ? '#faad14' : '#faad14' }}
              />
            </StatsCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard $isDark={isDark}>
              <Statistic
                title={t('reports:detail.overallScore')}
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
        <ContentCard 
          key={index} 
          $isDark={isDark} 
          title={section.titleKey ? t(`reports:sections.${section.titleKey}`) : section.title}
        >
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
            <div>
              {section.metrics && (
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                  {section.metrics.map((metric: any, idx: number) => (
                    <Col xs={24} sm={12} md={6} key={idx}>
                      <Card size="small">
                        <Statistic
                          title={metric.name}
                          value={metric.current}
                          precision={metric.name.includes('率') ? 1 : 0}
                          valueStyle={{
                            color: metric.status === 'good' ? '#3f8600' : 
                                   metric.status === 'warning' ? '#cf1322' : 
                                   metric.status === 'critical' ? '#cf1322' : '#1890ff'
                          }}
                          prefix={
                            metric.trend.startsWith('+') ? 
                            <ArrowUpOutlined /> : 
                            metric.trend.startsWith('-') ? 
                            <ArrowDownOutlined /> : null
                          }
                          suffix={
                            <span style={{ fontSize: '12px', marginLeft: '8px' }}>
                              ({metric.trend})
                            </span>
                          }
                        />
                        <div style={{ 
                          fontSize: '12px', 
                          color: isDark ? '#ffffff80' : '#00000073',
                          marginTop: '8px'
                        }}>
                          {metric.description}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              
              {section.trendData && (
                <div style={{ 
                  background: isDark ? '#1f1f1f' : '#fafafa',
                  padding: '16px',
                  borderRadius: '6px',
                  marginTop: '16px'
                }}>
                  <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    趋势图表
                  </div>
                  {Object.entries(section.trendData).map(([key, data]: [string, any]) => (
                    <div key={key} style={{ marginBottom: '24px' }}>
                      <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                        {key === 'responseTime' ? '响应时间趋势' :
                         key === 'throughput' ? '吞吐量趋势' :
                         key === 'errorRate' ? '错误率趋势' :
                         key === 'availability' ? '可用性趋势' : key}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'end', 
                        height: '100px',
                        gap: '4px',
                        padding: '8px',
                        background: isDark ? '#262626' : '#ffffff',
                        borderRadius: '4px'
                      }}>
                        {data.map((point: any, idx: number) => {
                          const maxValue = Math.max(...data.map((p: any) => p.value));
                          const height = (point.value / maxValue) * 80;
                          return (
                            <div
                              key={idx}
                              style={{
                                flex: 1,
                                height: `${height}px`,
                                background: key === 'errorRate' ? '#ff4d4f' : 
                                          key === 'availability' && point.value < 99 ? '#faad14' : '#1890ff',
                                borderRadius: '2px',
                                position: 'relative',
                                minHeight: '4px'
                              }}
                              title={`${point.date}: ${point.value}${
                                key === 'responseTime' ? 'ms' :
                                key === 'throughput' ? 'K req/s' :
                                key === 'errorRate' ? '%' :
                                key === 'availability' ? '%' : ''
                              }`}
                            />
                          );
                        })}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: isDark ? '#ffffff80' : '#00000073',
                        marginTop: '4px'
                      }}>
                        <span>{data[0]?.date}</span>
                        <span>{data[data.length - 1]?.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {section.analysis && (
                <div style={{ marginTop: '24px' }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card title="关键发现" size="small">
                        <ul style={{ paddingLeft: '16px', margin: 0 }}>
                          {section.analysis.keyFindings?.map((finding: string, idx: number) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{finding}</li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="根本原因" size="small">
                        <ul style={{ paddingLeft: '16px', margin: 0 }}>
                          {section.analysis.rootCauses?.map((cause: string, idx: number) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{cause}</li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
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
                        {rec.priority === 'high' ? t('reports:detail.highPriority') :
                         rec.priority === 'medium' ? t('reports:detail.mediumPriority') :
                         t('reports:detail.lowPriority')}
                      </Tag>
                      <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                        {rec.item}
                      </Text>
                    </Space>
                    <div style={{ marginTop: 8, paddingLeft: 0 }}>
                      <Row gutter={[16, 8]}>
                        <Col span={12}>
                          <Text type="secondary">
                            <ClockCircleOutlined /> {t('reports:detail.deadline')}: {rec.deadline}
                          </Text>
                        </Col>
                        {rec.assignee && (
                          <Col span={12}>
                            <Text type="secondary">
                              <UserOutlined /> {t('reports:detail.assignee')}: {rec.assignee}
                            </Text>
                          </Col>
                        )}
                        {rec.estimatedHours && (
                          <Col span={12}>
                            <Text type="secondary">
                              <ClockCircleOutlined /> {t('reports:detail.estimatedHours')}: {rec.estimatedHours}
                            </Text>
                          </Col>
                        )}
                        {rec.impact && (
                          <Col span={24}>
                            <Text type="secondary" style={{ fontStyle: 'italic' }}>
                              {t('reports:detail.expectedImpact')}: {rec.impact}
                            </Text>
                          </Col>
                        )}
                      </Row>
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
