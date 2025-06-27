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

          {section.type === 'dependency' && (
            <div>
              {/* 依赖关系概览 */}
              {section.summary && (
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <Statistic
                        title="总平面数"
                        value={section.summary.totalPlanes}
                        prefix={<BarChartOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <Statistic
                        title="总依赖数"
                        value={section.summary.totalDependencies}
                        prefix={<LineChartOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <Statistic
                        title="强依赖"
                        value={section.summary.strongDependencies}
                        valueStyle={{ color: '#cf1322' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <Statistic
                        title="弱依赖"
                        value={section.summary.weakDependencies}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <Statistic
                        title="循环依赖"
                        value={section.summary.circularDependencies}
                        valueStyle={{ color: '#fa8c16' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={8} md={4}>
                    <Card size="small">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#8c8c8c', marginBottom: '4px' }}>风险等级</div>
                        <Badge 
                          status={section.summary.riskLevel === 'high' ? 'error' : 
                                 section.summary.riskLevel === 'medium' ? 'warning' : 'success'} 
                          text={section.summary.riskLevel === 'high' ? '高风险' : 
                               section.summary.riskLevel === 'medium' ? '中风险' : '低风险'}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              )}

              {/* 依赖关系矩阵表格 */}
              {section.dependencyMatrix && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={4}>依赖关系矩阵</Title>
                  <Table
                    columns={[
                      {
                        title: '源平面',
                        dataIndex: 'source',
                        key: 'source',
                        width: 120,
                        render: (text: string) => <Tag color="blue">{text}</Tag>
                      },
                      {
                        title: '目标平面',
                        dataIndex: 'target',
                        key: 'target',
                        width: 120,
                        render: (text: string) => <Tag color="green">{text}</Tag>
                      },
                      {
                        title: '依赖类型',
                        dataIndex: 'type',
                        key: 'type',
                        width: 100,
                        render: (text: string) => {
                          const typeMap: Record<string, { color: string; text: string }> = {
                            'api-call': { color: 'purple', text: 'API调用' },
                            'configuration': { color: 'orange', text: '配置依赖' },
                            'data-flow': { color: 'cyan', text: '数据流' },
                            'metrics': { color: 'geekblue', text: '指标收集' },
                            'metadata': { color: 'magenta', text: '元数据' }
                          };
                          const config = typeMap[text] || { color: 'default', text };
                          return <Tag color={config.color}>{config.text}</Tag>;
                        }
                      },
                      {
                        title: '依赖强度',
                        dataIndex: 'strength',
                        key: 'strength',
                        width: 100,
                        render: (text: string) => (
                          <Badge 
                            status={text === 'strong' ? 'error' : text === 'medium' ? 'warning' : 'success'} 
                            text={text === 'strong' ? '强' : text === 'medium' ? '中' : '弱'}
                          />
                        )
                      },
                      {
                        title: '调用频率',
                        dataIndex: 'frequency',
                        key: 'frequency',
                        width: 100,
                        render: (text: string) => {
                          const colorMap: Record<string, string> = {
                            'very-high': '#ff4d4f',
                            'high': '#fa8c16',
                            'medium': '#fadb14',
                            'low': '#52c41a'
                          };
                          return <span style={{ color: colorMap[text] || '#8c8c8c' }}>
                            {text === 'very-high' ? '极高' : 
                             text === 'high' ? '高' : 
                             text === 'medium' ? '中' : '低'}
                          </span>;
                        }
                      },
                      {
                        title: '平均响应时间',
                        dataIndex: 'avgResponseTime',
                        key: 'avgResponseTime',
                        width: 120,
                        render: (text: string) => <Text code>{text}</Text>
                      },
                      {
                        title: '错误率',
                        dataIndex: 'errorRate',
                        key: 'errorRate',
                        width: 80,
                        render: (text: string) => {
                          const rate = parseFloat(text.replace('%', ''));
                          const color = rate > 0.1 ? '#ff4d4f' : rate > 0.05 ? '#fa8c16' : '#52c41a';
                          return <span style={{ color }}>{text}</span>;
                        }
                      },
                      {
                        title: '关键程度',
                        dataIndex: 'criticality',
                        key: 'criticality',
                        width: 100,
                        render: (text: string) => (
                          <Badge 
                            status={text === 'critical' ? 'error' : text === 'high' ? 'warning' : 'success'} 
                            text={text === 'critical' ? '关键' : text === 'high' ? '重要' : '一般'}
                          />
                        )
                      },
                      {
                        title: '描述',
                        dataIndex: 'description',
                        key: 'description',
                        ellipsis: true
                      }
                    ]}
                    dataSource={section.dependencyMatrix.map((item: any, index: number) => ({
                      ...item,
                      key: index
                    }))}
                    pagination={false}
                    size="middle"
                    scroll={{ x: 1200 }}
                  />
                </div>
              )}

              {/* 关键路径分析 */}
              {section.criticalPaths && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={4}>关键路径分析</Title>
                  <Row gutter={[16, 16]}>
                    {section.criticalPaths.map((path: any, index: number) => (
                      <Col xs={24} lg={12} key={index}>
                        <Card 
                          size="small" 
                          title={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span>路径 {index + 1}</span>
                              <Badge 
                                status={path.riskLevel === 'high' ? 'error' : 'warning'} 
                                text={path.riskLevel === 'high' ? '高风险' : '中风险'}
                              />
                            </div>
                          }
                        >
                          <div style={{ marginBottom: 12 }}>
                            <Text strong>路径：</Text>
                            <div style={{ 
                              background: '#f5f5f5', 
                              padding: '8px', 
                              borderRadius: '4px', 
                              marginTop: '4px',
                              fontFamily: 'monospace'
                            }}>
                              {path.path}
                            </div>
                          </div>
                          <Descriptions size="small" column={1}>
                            <Descriptions.Item label="描述">{path.description}</Descriptions.Item>
                            <Descriptions.Item label="总延迟">
                              <Text code>{path.totalLatency}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="瓶颈">
                              <Tag color="red">{path.bottleneck}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="影响">{path.impact}</Descriptions.Item>
                          </Descriptions>
                          {path.recommendations && (
                            <div style={{ marginTop: 12 }}>
                              <Text strong>优化建议：</Text>
                              <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                                {path.recommendations.map((rec: string, idx: number) => (
                                  <li key={idx} style={{ marginBottom: 4 }}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* 性能指标 */}
              {section.performanceMetrics && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={4}>性能指标</Title>
                  <Row gutter={[16, 16]}>
                    {section.performanceMetrics.map((metric: any, index: number) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <Card size="small">
                          <Statistic
                            title={metric.metric}
                            value={metric.current}
                            suffix={
                              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                <div>目标: {metric.target}</div>
                                <div style={{ 
                                  color: metric.trend.startsWith('+') ? '#ff4d4f' : 
                                         metric.trend.startsWith('-') ? '#52c41a' : '#8c8c8c'
                                }}>
                                  趋势: {metric.trend}
                                </div>
                              </div>
                            }
                            prefix={
                              metric.status === 'good' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                              metric.status === 'warning' ? <ExclamationCircleOutlined style={{ color: '#fa8c16' }} /> :
                              <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                            }
                          />
                          <div style={{ marginTop: 8, fontSize: '12px', color: '#8c8c8c' }}>
                            {metric.description}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* 风险分析 */}
              {section.riskAnalysis && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={4}>风险分析</Title>
                  
                  {/* 单点故障风险 */}
                  {section.riskAnalysis.singlePointFailures && (
                    <div style={{ marginBottom: 16 }}>
                      <Title level={5}>单点故障风险</Title>
                      {section.riskAnalysis.singlePointFailures.map((spf: any, index: number) => (
                        <Alert
                          key={index}
                          message={`${spf.plane} - ${spf.risk === 'critical' ? '严重风险' : '高风险'}`}
                          description={
                            <div>
                              <div><strong>影响：</strong>{spf.impact}</div>
                              <div><strong>受影响平面：</strong>{spf.affectedPlanes.join(', ')}</div>
                              <div style={{ marginTop: 8 }}>
                                <strong>缓解策略：</strong>
                                <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                                  {spf.mitigationStrategies.map((strategy: string, idx: number) => (
                                    <li key={idx}>{strategy}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          }
                          type={spf.risk === 'critical' ? 'error' : 'warning'}
                          style={{ marginBottom: 12 }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 级联故障风险 */}
                  {section.riskAnalysis.cascadeFailures && (
                    <div>
                      <Title level={5}>级联故障风险</Title>
                      {section.riskAnalysis.cascadeFailures.map((cf: any, index: number) => (
                        <Alert
                          key={index}
                          message={`级联故障链：${cf.cascade}`}
                          description={
                            <div>
                              <div><strong>触发条件：</strong>{cf.trigger}</div>
                              <div><strong>发生概率：</strong>{cf.probability === 'high' ? '高' : '中'}</div>
                              <div><strong>影响：</strong>{cf.impact}</div>
                              <div style={{ marginTop: 8 }}>
                                <strong>预防措施：</strong>
                                <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                                  {cf.preventionMeasures.map((measure: string, idx: number) => (
                                    <li key={idx}>{measure}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          }
                          type="warning"
                          style={{ marginBottom: 12 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 优化建议 */}
              {section.optimizationRecommendations && (
                <div>
                  <Title level={4}>优化建议</Title>
                  <Timeline>
                    {section.optimizationRecommendations.map((rec: any, index: number) => (
                      <Timeline.Item
                        key={index}
                        color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'green'}
                        dot={
                          rec.priority === 'high' ? <ExclamationCircleOutlined /> :
                          rec.priority === 'medium' ? <InfoCircleOutlined /> :
                          <CheckCircleOutlined />
                        }
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                            <Tag color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'green'}>
                              {rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}
                            </Tag>
                            <Tag color="blue">{rec.category}</Tag>
                            <Text strong>{rec.title}</Text>
                          </div>
                          <div style={{ marginBottom: 8 }}>
                            <Text>{rec.description}</Text>
                          </div>
                          <Row gutter={[16, 8]}>
                            <Col span={12}>
                              <Text type="secondary">
                                <ClockCircleOutlined /> 预期时间: {rec.timeline}
                              </Text>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">
                                工作量: {rec.effort}
                              </Text>
                            </Col>
                            <Col span={24}>
                              <Text type="secondary" style={{ fontStyle: 'italic' }}>
                                预期改进: {rec.expectedImprovement}
                              </Text>
                            </Col>
                          </Row>
                          {rec.implementation && (
                            <div style={{ marginTop: 8 }}>
                              <Text strong>实施步骤：</Text>
                              <ol style={{ marginTop: 4, paddingLeft: 16 }}>
                                {rec.implementation.map((step: string, idx: number) => (
                                  <li key={idx} style={{ marginBottom: 4 }}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
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
