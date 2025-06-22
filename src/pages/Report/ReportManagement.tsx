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
  Input,
  DatePicker,
  Select,
  message,
  theme
} from 'antd';
import { 
  FileTextOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
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

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  min-height: 100vh;
  background: ${props => props.$isDark ? '#000000' : '#f5f5f5'};
  transition: all 0.3s ease;
`;

const PageHeader = styled.div<{ $isDark: boolean }>`
  margin-bottom: 24px;
  padding: 24px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  transition: all 0.3s ease;
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 16px;
  }
  
  .ant-statistic-title {
    color: ${props => props.$isDark ? '#ffffff' : '#666666'};
  }
  
  .ant-statistic-content {
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
  }
`;

const FilterBar = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  transition: all 0.3s ease;
  
  .ant-input {
    background: ${props => props.$isDark ? '#000000' : '#ffffff'};
    border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    
    &:hover {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
    }
    
    &:focus {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
      box-shadow: ${props => props.$isDark 
        ? '0 0 0 2px rgba(23, 125, 220, 0.2)' 
        : '0 0 0 2px rgba(24, 144, 255, 0.2)'
      };
    }
  }
  
  .ant-select {
    .ant-select-selector {
      background: ${props => props.$isDark ? '#000000' : '#ffffff'};
      border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
      color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    }
    
    &:hover .ant-select-selector {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
      box-shadow: ${props => props.$isDark 
        ? '0 0 0 2px rgba(23, 125, 220, 0.2)' 
        : '0 0 0 2px rgba(24, 144, 255, 0.2)'
      };
    }
  }
  
  .ant-picker {
    background: ${props => props.$isDark ? '#000000' : '#ffffff'};
    border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    
    &:hover {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
    }
    
    &.ant-picker-focused {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
      box-shadow: ${props => props.$isDark 
        ? '0 0 0 2px rgba(23, 125, 220, 0.2)' 
        : '0 0 0 2px rgba(24, 144, 255, 0.2)'
      };
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
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { t } = useTranslation(['reports', 'common']);
  const navigate = useNavigate();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

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

  // 模拟报告数据
  const reportData = [
    {
      key: '1',
      name: '系统健康度分析报告',
      type: t('reports:types.health'),
      status: 'published',
      author: '系统管理员',
      createdAt: '2024-06-15 10:30:00',
      lastModified: '2024-06-15 14:20:00',
      size: '2.5MB',
      downloads: 156,
      description: '全面分析系统健康状况，包括服务可用性、性能指标、错误率等关键指标。通过多维度数据分析，为系统优化提供决策支持。'
    },
    {
      key: '2',
      name: '平面依赖关系分析报告',
      type: t('reports:types.dependency'),
      status: 'published',
      author: '架构师团队',
      createdAt: '2024-06-10 09:15:00',
      lastModified: '2024-06-12 16:45:00',
      size: '3.8MB',
      downloads: 89,
      description: '深入分析系统各平面之间的依赖关系，识别潜在的架构风险和优化机会。发现2个循环依赖问题需要重点关注。'
    },
    {
      key: '3',
      name: '性能基准测试报告',
      type: t('reports:types.performance'),
      status: 'published',
      author: '性能测试团队',
      createdAt: '2024-06-08 14:20:00',
      lastModified: '2024-06-09 11:30:00',
      size: '4.2MB',
      downloads: 234,
      description: '全面的系统性能基准测试报告，涵盖负载测试、压力测试、容量测试等多个维度。最大支持10000并发用户。'
    },
    {
      key: '4',
      name: '安全风险评估报告',
      type: t('reports:types.security'),
      status: 'draft',
      author: '安全团队',
      createdAt: '2024-06-12 16:00:00',
      lastModified: '2024-06-14 10:15:00',
      size: '1.8MB',
      downloads: 45,
      description: '系统安全风险全面评估报告，包括漏洞扫描、渗透测试、代码安全审计等。发现23个安全问题，其中高危2个。'
    },
    {
      key: '5',
      name: '用户行为分析报告',
      type: t('reports:types.business'),
      status: 'published',
      author: '数据分析师',
      createdAt: '2024-06-05 11:45:00',
      lastModified: '2024-06-06 09:20:00',
      size: '2.1MB',
      downloads: 178,
      description: '基于用户行为数据的深度分析，包括用户画像、行为路径、转化漏斗等。分析了过去3个月的用户行为模式。'
    },
    {
      key: '6',
      name: '数据库性能优化报告',
      type: t('reports:types.performance'),
      status: 'published',
      author: 'DBA团队',
      createdAt: '2024-06-03 15:30:00',
      lastModified: '2024-06-04 13:15:00',
      size: '3.2MB',
      downloads: 92,
      description: '数据库性能深度分析报告，包括慢查询优化、索引建议、存储优化等。识别出15个性能瓶颈点。'
    },
    {
      key: '7',
      name: '微服务架构评估报告',
      type: t('reports:types.system'),
      status: 'archived',
      author: '架构师团队',
      createdAt: '2024-05-28 10:00:00',
      lastModified: '2024-05-30 16:30:00',
      size: '5.1MB',
      downloads: 67,
      description: '微服务架构的全面评估报告，包括服务拆分合理性、通信效率、治理策略等。涵盖45个微服务的详细分析。'
    },
    {
      key: '8',
      name: '容器化部署分析报告',
      type: t('reports:types.system'),
      status: 'published',
      author: '运维团队',
      createdAt: '2024-06-01 14:15:00',
      lastModified: '2024-06-02 10:45:00',
      size: '2.8MB',
      downloads: 134,
      description: '容器化部署策略分析报告，包括资源利用率、扩缩容策略、监控告警等。Docker容器数量达到200+。'
    }
  ];

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
      },
    };
    const config = statusMap[status as keyof typeof statusMap] || { 
      color: 'default', 
      text: status,
      bgColor: undefined
    };
    return (
      <Tag 
        color={config.color}
        style={config.bgColor ? { 
          backgroundColor: config.bgColor,
          border: `1px solid ${config.color}`,
          color: config.color
        } : {}}
      >
        {config.text}
      </Tag>
    );
  };

  const getTypeTag = (type: string) => {
    const typeMap = {
      '健康度分析': { 
        color: isDark ? '#1890ff' : 'blue',
        bgColor: isDark ? 'rgba(24, 144, 255, 0.1)' : undefined
      },
      '依赖分析': { 
        color: isDark ? '#722ed1' : 'purple',
        bgColor: isDark ? 'rgba(114, 46, 209, 0.1)' : undefined
      },
      '关系分析': { 
        color: isDark ? '#13c2c2' : 'cyan',
        bgColor: isDark ? 'rgba(19, 194, 194, 0.1)' : undefined
      },
      '性能分析': { 
        color: isDark ? '#faad14' : 'gold',
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      },
      '安全分析': { 
        color: isDark ? '#ff4d4f' : 'red',
        bgColor: isDark ? 'rgba(255, 77, 79, 0.1)' : undefined
      },
      '行为分析': { 
        color: isDark ? '#52c41a' : 'green',
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
    };
    const config = typeMap[type as keyof typeof typeMap] || { 
      color: 'default',
      bgColor: undefined
    };
    return (
      <Tag 
        color={config.color}
        style={config.bgColor ? { 
          backgroundColor: config.bgColor,
          border: `1px solid ${config.color}`,
          color: config.color
        } : {}}
      >
        {type}
      </Tag>
    );
  };

  // 处理报告操作
  const handleViewReport = (report: any) => {
    navigate(`/reports/${report.key}`);
  };

  const handleEditReport = (report: any) => {
    message.info(`编辑报告: ${report.name}`);
  };

  const handleDownloadReport = (report: any) => {
    message.success(`开始下载: ${report.name}`);
  };

  const handleDeleteReport = (report: any) => {
    message.warning(`删除报告: ${report.name}`);
  };

  // 渲染卡片视图
  const renderCardView = () => (
    reportData.map(report => (
      <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={report.key}>
        <ReportCard
          report={report}
          onView={handleViewReport}
          onEdit={handleEditReport}
          onDownload={handleDownloadReport}
          onDelete={handleDeleteReport}
        />
      </Col>
    ))
  );

  return (
    <PageContainer $isDark={isDark}>
      <PageHeader $isDark={isDark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ 
              margin: 0,
              color: isDark ? '#ffffff' : '#262626'
            }}>
              {t('reports:title')}
              <Badge 
                count={t('common:inDevelopment')} 
                style={{ 
                  backgroundColor: '#faad14', 
                  marginLeft: 12,
                  fontSize: 12 
                }} 
              />
            </Title>
            <Paragraph style={{ 
              marginTop: 8, 
              marginBottom: 0, 
              fontSize: 16,
              color: isDark ? '#8c8c8c' : '#666666'
            }}>
              {t('reports:subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button 
              icon={<ExportOutlined />}
              style={{
                color: isDark ? '#ffffff' : undefined,
                borderColor: isDark ? '#434343' : undefined,
                backgroundColor: isDark ? 'transparent' : undefined
              }}
            >
              {t('reports:batchExport')}
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              style={{
                color: isDark ? '#ffffff' : undefined,
                borderColor: isDark ? '#434343' : undefined,
                backgroundColor: isDark ? 'transparent' : undefined
              }}
            >
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('reports:createTitle')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports:stats.totalReports')}
              value={reportData.length}
              suffix={t('common:unit.count')}
              valueStyle={{ color: isDark ? '#1890ff' : '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports:stats.published')}
              value={reportData.filter(r => r.status === 'published').length}
              suffix={t('common:unit.count')}
              valueStyle={{ color: isDark ? '#52c41a' : '#52c41a' }}
              prefix={<EyeOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports:stats.draft')}
              value={reportData.filter(r => r.status === 'draft').length}
              suffix={t('common:unit.count')}
              valueStyle={{ color: isDark ? '#faad14' : '#faad14' }}
              prefix={<EditOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports:stats.totalDownloads')}
              value={reportData.reduce((sum, r) => sum + r.downloads, 0)}
              suffix={t('common:unit.times')}
              valueStyle={{ color: isDark ? '#722ed1' : '#722ed1' }}
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
        <Row gutter={[16, 16]}>
          {renderCardView()}
        </Row>
      </ReportCardsContainer>
    </PageContainer>
  );
};

export default ReportManagement;
