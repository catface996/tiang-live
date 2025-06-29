import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, Tag, DatePicker, Select, message, theme } from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  ExportOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { ReportCard } from './components';
import { useAppSelector } from '../../store';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import { getAllReports } from '../../services/reportService';
import type { Report } from '../../types/report';
import '../../styles/report-management.css';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: 100vh;
  background: ${props => (props.$isDark ? '#000000' : '#f5f5f5')};
  transition: all 0.3s ease;
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  border-radius: 8px;
  box-shadow: ${props => (props.$isDark ? '0 2px 8px rgba(255, 255, 255, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.06)')};
  border: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};
  background: ${props => (props.$isDark ? '#141414' : '#ffffff')};
  transition: all 0.3s ease;

  .ant-card-body {
    padding: 16px;
  }

  .ant-statistic-title {
    color: ${props => (props.$isDark ? '#ffffff' : '#666666')};
  }

  .ant-statistic-content {
    color: ${props => (props.$isDark ? '#ffffff' : '#262626')};
  }
`;

const FilterBar = styled.div<{ $isDark: boolean }>`
  background: ${props => (props.$isDark ? '#1f1f1f' : '#fafafa')};
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: ${props => (props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0')};
  transition: all 0.3s ease;

  .ant-input {
    background: ${props => (props.$isDark ? '#000000' : '#ffffff')};
    border-color: ${props => (props.$isDark ? '#434343' : '#d9d9d9')};
    color: ${props => (props.$isDark ? '#ffffff' : '#000000')};

    &:hover {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
    }

    &:focus {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'};
    }
  }

  .ant-select {
    .ant-select-selector {
      background: ${props => (props.$isDark ? '#000000' : '#ffffff')};
      border-color: ${props => (props.$isDark ? '#434343' : '#d9d9d9')};
      color: ${props => (props.$isDark ? '#ffffff' : '#000000')};
    }

    &:hover .ant-select-selector {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
    }

    &.ant-select-focused .ant-select-selector {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'};
    }
  }

  .ant-picker {
    background: ${props => (props.$isDark ? '#000000' : '#ffffff')};
    border-color: ${props => (props.$isDark ? '#434343' : '#d9d9d9')};
    color: ${props => (props.$isDark ? '#ffffff' : '#000000')};

    &:hover {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
    }

    &.ant-picker-focused {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'};
    }
  }
`;

const ReportCardsContainer = styled.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`;

const ReportManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<Report[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useTranslation(['reports', 'common']);
  const navigate = useNavigate();
  const { currentTheme } = useAppSelector(state => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('reports:title'));
    // 加载报告数据
    const loadReports = async () => {
      try {
        setLoading(true);
        const reports = await getAllReports();
        setReportData(reports);
      } catch (error) {
        console.error('Failed to load reports:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [t]);

  useEffect(() => {
    setPageTitle(t('report.title'));
  }, [t]);

  // 报告类型映射
  const reportTypeMap = {
    health: { name: t('reports:types.health'), color: 'green', icon: <FileTextOutlined /> },
    dependency: { name: t('reports:types.dependency'), color: 'blue', icon: <FileTextOutlined /> },
    relationship: { name: t('reports:types.relationship'), color: 'orange', icon: <FileTextOutlined /> },
    performance: { name: t('reports:types.performance'), color: 'purple', icon: <FileTextOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      published: {
        color: isDark ? '#52c41a' : 'green',
        text: '已发布',
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
      draft: {
        color: isDark ? '#faad14' : 'orange',
        text: '草稿',
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      },
      archived: {
        color: isDark ? '#8c8c8c' : 'gray',
        text: '已归档',
        bgColor: isDark ? 'rgba(140, 140, 140, 0.1)' : undefined
      }
    };
    const config = statusMap[status as keyof typeof statusMap] || {
      color: 'default',
      text: status,
      bgColor: undefined
    };
    return (
      <Tag
        color={config.color}
        style={
          config.bgColor
            ? {
                backgroundColor: config.bgColor,
                border: `1px solid ${config.color}`,
                color: config.color
              }
            : {}
        }
      >
        {config.text}
      </Tag>
    );
  };

  const getTypeTag = (type: string) => {
    const typeMap = {
      健康度分析: {
        color: isDark ? '#1890ff' : 'blue',
        bgColor: isDark ? 'rgba(24, 144, 255, 0.1)' : undefined
      },
      依赖分析: {
        color: isDark ? '#722ed1' : 'purple',
        bgColor: isDark ? 'rgba(114, 46, 209, 0.1)' : undefined
      },
      关系分析: {
        color: isDark ? '#13c2c2' : 'cyan',
        bgColor: isDark ? 'rgba(19, 194, 194, 0.1)' : undefined
      },
      性能分析: {
        color: isDark ? '#faad14' : 'gold',
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      },
      安全分析: {
        color: isDark ? '#ff4d4f' : 'red',
        bgColor: isDark ? 'rgba(255, 77, 79, 0.1)' : undefined
      },
      行为分析: {
        color: isDark ? '#52c41a' : 'green',
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      }
    };
    const config = typeMap[type as keyof typeof typeMap] || {
      color: 'default',
      bgColor: undefined
    };
    return (
      <Tag
        color={config.color}
        style={
          config.bgColor
            ? {
                backgroundColor: config.bgColor,
                border: `1px solid ${config.color}`,
                color: config.color
              }
            : {}
        }
      >
        {type}
      </Tag>
    );
  };

  // 处理报告操作
  const handleViewReport = (report: Report) => {
    navigate(`/reports/${report.id}`);
  };

  const handleEditReport = (report: Report) => {
    message.info(`编辑报告: ${report.name}`);
  };

  const handleDownloadReport = (report: Report) => {
    message.success(`开始下载: ${report.name}`);
  };

  const handleDeleteReport = (report: Report) => {
    message.warning(`删除报告: ${report.name}`);
  };

  // 渲染卡片视图
  const renderCardView = () =>
    reportData.map(report => (
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={report.id}>
        <ReportCard
          report={report}
          onView={handleViewReport}
          onEdit={handleEditReport}
          onDownload={handleDownloadReport}
          onDelete={handleDeleteReport}
        />
      </Col>
    ));

  return (
    <PageContainer $isDark={isDark} className="report-management-page">
      {/* Title和按钮在同一行 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Title level={2} style={{ margin: 0 }}>
          {t('reports:title')}
        </Title>
        <Space>
          <Button icon={<ExportOutlined />}>{t('reports:batchExport')}</Button>
          <Button icon={<ReloadOutlined />}>{t('common:refresh')}</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('reports:createTitle')}
          </Button>
        </Space>
      </div>

      {/* Paragraph单独一行，充满宽度 */}
      <Paragraph
        style={{
          marginTop: 0,
          marginBottom: 24
        }}
      >
        {t('reports:subtitle')}
      </Paragraph>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="report-stats-primary">
            <Statistic
              title={t('reports:stats.totalReports')}
              value={reportData.length}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="report-stats-success">
            <Statistic
              title={t('reports:stats.published')}
              value={reportData.filter(r => r.status === 'published').length}
              prefix={<EyeOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="report-stats-warning">
            <Statistic
              title={t('reports:stats.draft')}
              value={reportData.filter(r => r.status === 'draft').length}
              prefix={<EditOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark} className="report-stats-purple">
            <Statistic
              title={t('reports:stats.totalDownloads')}
              value={reportData.reduce((sum, r) => sum + r.downloads, 0)}
              prefix={<DownloadOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('reports:search.placeholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('reports:search.type'),
            width: 120,
            options: [
              { value: 'all', label: t('reports:search.allTypes') },
              ...Object.entries(reportTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('reports:search.status'),
            width: 100,
            options: [
              { value: 'all', label: t('reports:search.allStatuses') },
              { value: 'published', label: t('reports:status.published') },
              { value: 'draft', label: t('reports:status.draft') },
              { value: 'archived', label: t('reports:status.archived') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 报告卡片列表 */}
      <ReportCardsContainer>
        <Row gutter={[16, 16]}>{renderCardView()}</Row>
      </ReportCardsContainer>
    </PageContainer>
  );
};

export default ReportManagement;
