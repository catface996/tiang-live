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
  Table,
  Timeline,
  Alert,
  Breadcrumb,
  Spin
} from 'antd';
import {
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
  HomeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { getReportById } from '../../services/reportService';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: var(--bg-layout);
  transition: all 0.3s ease;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: 24px;

  .ant-breadcrumb-link {
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }

  .ant-breadcrumb-separator {
    color: var(--text-tertiary);
  }
`;

const ContentCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  background: var(--bg-container);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;

  .ant-card-body {
    padding: 24px;
  }

  .ant-card-head {
    background: var(--bg-container);
    border-bottom: 1px solid var(--border-secondary);
  }
`;

const ReportHeader = styled.div`
  margin-bottom: 24px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ReportTitle = styled(Title)`
  &.ant-typography {
    margin: 0 !important;
    color: var(--text-primary) !important;
    display: flex;
    align-items: center;

    .anticon {
      margin-right: 12px;
      color: var(--primary-color);
    }
  }
`;

const ActionButtons = styled(Space)`
  flex-shrink: 0;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);

  .anticon {
    color: var(--text-tertiary);
  }
`;

const ReportDescription = styled(Paragraph)`
  &.ant-typography {
    color: var(--text-primary) !important;
    font-size: 16px;
    margin-bottom: 16px !important; /* 增加描述底部间距 */
    line-height: 1.6;
  }
`;

const StyledDescriptions = styled(Descriptions)`
  margin-top: 24px;
  background: transparent !important;

  /* 移除所有可能的背景色 */
  &.ant-descriptions {
    background: transparent !important;
  }

  .ant-descriptions-view {
    background: transparent !important;
  }

  .ant-descriptions-item-label {
    color: var(--text-secondary);
    font-weight: 500;
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item-content {
    color: var(--text-primary);
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-row {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item-container {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* 移除可能的斑马纹效果 */
  .ant-descriptions-row:nth-child(odd) {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-row:nth-child(even) {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* 移除表格样式的背景 */
  &.ant-descriptions-bordered {
    background: transparent !important;

    .ant-descriptions-item-label,
    .ant-descriptions-item-content {
      background: transparent !important;
      background-color: transparent !important;
    }
  }

  /* 移除所有可能的表格单元格背景 */
  td {
    background: transparent !important;
    background-color: transparent !important;
  }

  th {
    background: transparent !important;
    background-color: transparent !important;
  }
`;

const StatsCard = styled(Card)`
  text-align: center;
  border-radius: 8px;
  background: var(--bg-container);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;

  .ant-statistic-title {
    color: var(--text-secondary);
  }
`;

// 专门的统计卡片组件，使用data属性来区分
const TotalServicesCard = styled(StatsCard)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #1890ff !important;
  }
`;

const HealthyServicesCard = styled(StatsCard)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #52c41a !important;
  }
`;

const WarningServicesCard = styled(StatsCard)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #faad14 !important;
  }
`;

const OverallScoreCard = styled(StatsCard)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #722ed1 !important;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 100px 0;

  .loading-text {
    margin-top: 16px;
    color: var(--text-secondary);
  }
`;

const StyledAlert = styled(Alert)`
  &.ant-alert {
    background: var(--bg-container);
    border: 1px solid var(--border-primary);
  }
`;

const StyledTable = styled(Table)`
  margin-top: 24px; /* 增加表格顶部间距 */

  .ant-table {
    background: var(--bg-container);
  }

  .ant-table-thead > tr > th {
    background: var(--table-header-bg);
    border-bottom: 1px solid var(--border-primary);
    color: var(--text-primary);
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid var(--border-secondary);
    color: var(--text-primary);
  }

  .ant-table-tbody > tr:hover > td {
    background: var(--table-row-hover-bg);
  }
`;

const StyledTimeline = styled(Timeline)`
  .ant-timeline-item-content {
    color: var(--text-primary);
  }

  .ant-timeline-item-tail {
    border-left-color: var(--border-primary);
  }

  /* 高优先级 - 红色 */
  &.priority-high .ant-timeline-item-head .anticon {
    color: #ff4d4f !important;
  }

  /* 中优先级 - 橙色 */
  &.priority-medium .ant-timeline-item-head .anticon {
    color: #faad14 !important;
  }

  /* 低优先级 - 绿色 */
  &.priority-low .ant-timeline-item-head .anticon {
    color: #52c41a !important;
  }

  /* 辅助图标颜色 */
  .ant-typography .anticon {
    color: var(--text-tertiary);
  }
`;

// 状态标签样式 - 保持固定颜色，在暗色和亮色主题下一致
const StatusTag = styled(Tag)`
  &.status-published {
    color: #52c41a !important;
    background: rgba(82, 196, 26, 0.1) !important;
    border-color: #52c41a !important;
  }

  &.status-draft {
    color: #faad14 !important;
    background: rgba(250, 173, 20, 0.1) !important;
    border-color: #faad14 !important;
  }

  &.status-archived {
    color: #8c8c8c !important;
    background: rgba(140, 140, 140, 0.1) !important;
    border-color: #8c8c8c !important;
  }
`;

// 优先级标签样式 - 保持固定颜色，在暗色和亮色主题下一致
const PriorityTag = styled(Tag)`
  &.priority-high {
    color: #ff4d4f !important;
    background: rgba(255, 77, 79, 0.1) !important;
    border-color: #ff4d4f !important;
  }

  &.priority-medium {
    color: #faad14 !important;
    background: rgba(250, 173, 20, 0.1) !important;
    border-color: #faad14 !important;
  }

  &.priority-low {
    color: #1890ff !important;
    background: rgba(24, 144, 255, 0.1) !important;
    border-color: #1890ff !important;
  }
`;

const TrendSuffix = styled.span`
  font-size: 12px;
  margin-left: 8px;
`;

const MetricDescription = styled.div`
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 8px;
`;

const StatsRow = styled(Row)`
  margin-bottom: 24px;
`;

// 分析内容容器，确保描述和表格之间有合适间距
const AnalysisContent = styled.div`
  .analysis-description {
    margin-bottom: 20px;
    padding-bottom: 4px;
  }

  .analysis-table {
    margin-top: 4px;
  }
`;

// 趋势指标样式
const TrendStatsCard = styled(StatsCard)`
  /* 良好状态 - 深绿色 */
  &.trend-good {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #3f8600 !important;
    }
  }

  /* 警告状态 - 深红色 */
  &.trend-warning,
  &.trend-critical {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #cf1322 !important;
    }
  }

  /* 默认状态 - 蓝色 */
  &.trend-default {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #1890ff !important;
    }
  }
`;

const ReportDetail: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<Record<string, any> | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['reports', 'common']);

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

  const getStatusClassName = (status: string) => {
    const classMap = {
      published: 'status-published',
      draft: 'status-draft',
      archived: 'status-archived'
    };
    return classMap[status as keyof typeof classMap] || '';
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

  const getPriorityClassName = (priority: string) => {
    const classMap = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classMap[priority as keyof typeof classMap] || '';
  };

  const serviceColumns = [
    {
      title: t('reports:detail.service'),
      dataIndex: 'service',
      key: 'service',
      width: '25%'
    },
    {
      title: t('reports:detail.status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <Badge
          status={getServiceStatusColor(status)}
          text={
            status === 'healthy'
              ? t('reports:detail.healthy')
              : status === 'warning'
                ? t('reports:detail.warning')
                : t('reports:detail.critical')
          }
        />
      )
    },
    {
      title: t('reports:detail.responseTime'),
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: '15%'
    },
    {
      title: t('reports:detail.errorRate'),
      dataIndex: 'errorRate',
      key: 'errorRate',
      width: '15%'
    },
    {
      title: t('reports:detail.availability'),
      dataIndex: 'availability',
      key: 'availability',
      width: '15%'
    },
    {
      title: t('reports:detail.requests'),
      dataIndex: 'requests',
      key: 'requests',
      width: '15%'
    }
  ];

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <Spin size="large" />
          <div className="loading-text">{t('reports:detail.loading')}</div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!reportData) {
    return (
      <PageContainer>
        <StyledAlert
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
    <PageContainer>
      {/* 面包屑导航 */}
      <StyledBreadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span onClick={() => navigate('/reports')}>{t('reports:title')}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{reportData.name}</Breadcrumb.Item>
      </StyledBreadcrumb>

      {/* 报告头部 */}
      <ContentCard>
        <ReportHeader>
          {/* 标题和操作按钮行 */}
          <TitleRow>
            <ReportTitle level={2}>
              <FileTextOutlined />
              {reportData.name}
            </ReportTitle>
            <ActionButtons>
              <Button icon={<ShareAltOutlined />}>{t('reports:detail.share')}</Button>
              <Button icon={<PrinterOutlined />}>{t('reports:detail.print')}</Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                {t('reports:detail.download')}
              </Button>
            </ActionButtons>
          </TitleRow>

          {/* 状态和元信息行 */}
          <MetaRow>
            <StatusTag className={getStatusClassName(reportData.status)}>{getStatusText(reportData.status)}</StatusTag>
            <MetaItem>
              <UserOutlined />
              <span>{reportData.author}</span>
            </MetaItem>
            <MetaItem>
              <CalendarOutlined />
              <span>{reportData.createdAt}</span>
            </MetaItem>
          </MetaRow>

          {/* 报告描述 */}
          <ReportDescription>{reportData.description}</ReportDescription>
        </ReportHeader>

        <StyledDescriptions column={3}>
          <Descriptions.Item label={t('reports:detail.fileSize')}>{reportData.size}</Descriptions.Item>
          <Descriptions.Item label={t('reports:detail.downloads')}>{reportData.downloads}</Descriptions.Item>
          <Descriptions.Item label={t('reports:detail.lastModified')}>{reportData.lastModified}</Descriptions.Item>
        </StyledDescriptions>
      </ContentCard>

      {/* 报告摘要统计 */}
      {reportData.summary && (
        <StatsRow gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <TotalServicesCard>
              <Statistic
                title={t('reports:detail.totalServices')}
                value={reportData.summary.totalServices}
                prefix={<BarChartOutlined />}
              />
            </TotalServicesCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <HealthyServicesCard>
              <Statistic
                title={t('reports:detail.healthyServices')}
                value={reportData.summary.healthyServices}
                prefix={<CheckCircleOutlined />}
              />
            </HealthyServicesCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <WarningServicesCard>
              <Statistic
                title={t('reports:detail.warningServices')}
                value={reportData.summary.warningServices}
                prefix={<ExclamationCircleOutlined />}
              />
            </WarningServicesCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <OverallScoreCard>
              <Statistic
                title={t('reports:detail.overallScore')}
                value={reportData.summary.overallScore}
                suffix="%"
                prefix={<PieChartOutlined />}
              />
            </OverallScoreCard>
          </Col>
        </StatsRow>
      )}

      {/* 报告内容 */}
      {reportData.sections?.map((section: any, index: number) => (
        <ContentCard key={index} title={section.titleKey ? t(`reports:sections.${section.titleKey}`) : section.title}>
          {section.type === 'analysis' && section.data ? (
            <AnalysisContent>
              <div className="analysis-description">
                <ReportDescription>{section.content}</ReportDescription>
              </div>
              <div className="analysis-table">
                <StyledTable columns={serviceColumns} dataSource={section.data} pagination={false} size="middle" />
              </div>
            </AnalysisContent>
          ) : (
            <ReportDescription>{section.content}</ReportDescription>
          )}

          {section.type === 'trend' && (
            <div>
              {section.metrics && (
                <Row gutter={[16, 16]}>
                  {section.metrics.map((metric: any, idx: number) => (
                    <Col xs={24} sm={12} md={6} key={idx}>
                      <TrendStatsCard
                        size="small"
                        className={`trend-${
                          metric.status === 'good'
                            ? 'good'
                            : metric.status === 'warning'
                              ? 'warning'
                              : metric.status === 'critical'
                                ? 'critical'
                                : 'default'
                        }`}
                      >
                        <Statistic
                          title={metric.name}
                          value={metric.current}
                          precision={metric.name.includes('率') ? 1 : 0}
                          prefix={
                            metric.trend.startsWith('+') ? (
                              <ArrowUpOutlined />
                            ) : metric.trend.startsWith('-') ? (
                              <ArrowDownOutlined />
                            ) : null
                          }
                          suffix={<TrendSuffix>({metric.trend})</TrendSuffix>}
                        />
                        <MetricDescription>{metric.description}</MetricDescription>
                      </TrendStatsCard>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}
        </ContentCard>
      ))}

      {/* 报告建议时间线 */}
      {reportData.sections?.some((section: any) => section.type === 'recommendations') && (
        <ContentCard title={t('reports:detail.recommendations')}>
          {reportData.sections
            .filter((section: any) => section.type === 'recommendations')
            .map((section: any, index: number) => (
              <div key={index}>
                {section.recommendations && (
                  <StyledTimeline className={`priority-${section.recommendations[0]?.priority || 'default'}`}>
                    {section.recommendations.map((rec: any, idx: number) => (
                      <Timeline.Item
                        key={idx}
                        color={rec.priority === 'high' ? '#ff4d4f' : rec.priority === 'medium' ? '#faad14' : '#52c41a'}
                        dot={
                          rec.priority === 'high' ? (
                            <ExclamationCircleOutlined />
                          ) : rec.priority === 'medium' ? (
                            <InfoCircleOutlined />
                          ) : (
                            <CheckCircleOutlined />
                          )
                        }
                      >
                        <div>
                          <Space>
                            <PriorityTag className={getPriorityClassName(rec.priority)}>
                              {rec.priority === 'high'
                                ? t('reports:detail.highPriority')
                                : rec.priority === 'medium'
                                  ? t('reports:detail.mediumPriority')
                                  : t('reports:detail.lowPriority')}
                            </PriorityTag>
                            <Text strong>{rec.item}</Text>
                          </Space>
                          <div>
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
                            </Row>
                          </div>
                        </div>
                      </Timeline.Item>
                    ))}
                  </StyledTimeline>
                )}
              </div>
            ))}
        </ContentCard>
      )}
    </PageContainer>
  );
};

export default ReportDetail;
