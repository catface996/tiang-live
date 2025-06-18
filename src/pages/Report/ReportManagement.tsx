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
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { ReportCard } from './components';
import { useAppSelector } from '../../store';

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

const MainCard = styled(Card)<{ $isDark: boolean }>`
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
`;

const ReportManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('report.title'));
  }, [t]);

  // 模拟报告数据
  const reportData = [
    {
      key: '1',
      name: '系统健康度分析报告',
      type: t('reports.types.health'),
      status: 'published',
      author: '系统管理员',
      createdAt: '2024-06-15 10:30:00',
      lastModified: '2024-06-15 14:20:00',
      size: '2.5MB',
      downloads: 156,
      description: '本报告详细分析了系统各组件的健康状态，包括CPU使用率、内存占用、磁盘空间等关键指标，为系统优化提供数据支持。'
    },
    {
      key: '2',
      name: '平面依赖关系分析',
      type: t('reports.types.dependency'),
      status: 'draft',
      author: '架构师',
      createdAt: '2024-06-14 16:45:00',
      lastModified: '2024-06-15 09:15:00',
      size: '1.8MB',
      downloads: 89,
      description: '深入分析系统各平面之间的依赖关系，识别潜在的风险点和优化机会，为架构重构提供决策依据。'
    },
    {
      key: '3',
      name: '实体关系图谱报告',
      type: t('reports.types.relationship'),
      status: 'published',
      author: '数据分析师',
      createdAt: '2024-06-13 14:20:00',
      lastModified: '2024-06-14 11:30:00',
      size: '4.1MB',
      downloads: 234,
      description: '通过图谱分析展示实体间的复杂关系网络，帮助理解业务逻辑和数据流向，支持业务决策和系统设计。'
    },
    {
      key: '4',
      name: '性能监控月度报告',
      type: t('reports.types.performance'),
      status: 'published',
      author: '运维工程师',
      createdAt: '2024-06-12 09:00:00',
      lastModified: '2024-06-13 16:45:00',
      size: '3.2MB',
      downloads: 178,
      description: '月度性能监控数据汇总，包括响应时间、吞吐量、错误率等核心指标的趋势分析和异常识别。'
    },
    {
      key: '5',
      name: '安全风险评估报告',
      type: '安全分析',
      status: 'draft',
      author: '安全专家',
      createdAt: '2024-06-11 15:30:00',
      lastModified: '2024-06-12 10:20:00',
      size: '2.8MB',
      downloads: 67,
      description: '全面评估系统安全风险，包括漏洞扫描结果、权限配置检查、安全策略建议等内容。'
    },
    {
      key: '6',
      name: '用户行为分析报告',
      type: '行为分析',
      status: 'archived',
      author: '产品经理',
      createdAt: '2024-06-10 11:15:00',
      lastModified: '2024-06-11 14:30:00',
      size: '1.9MB',
      downloads: 123,
      description: '基于用户访问日志的行为模式分析，识别用户偏好和使用习惯，为产品优化提供数据洞察。'
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
    message.info(`查看报告: ${report.name}`);
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
    <Row gutter={[16, 16]}>
      {reportData.map(report => (
        <Col xs={24} sm={12} lg={8} xl={6} key={report.key}>
          <ReportCard
            report={report}
            onView={handleViewReport}
            onEdit={handleEditReport}
            onDownload={handleDownloadReport}
            onDelete={handleDeleteReport}
          />
        </Col>
      ))}
    </Row>
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
              {t('reports.title')}
              <Badge 
                count={t('common.inDevelopment')} 
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
              {t('reports.subtitle')}
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
              {t('reports.batchExport')}
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              style={{
                color: isDark ? '#ffffff' : undefined,
                borderColor: isDark ? '#434343' : undefined,
                backgroundColor: isDark ? 'transparent' : undefined
              }}
            >
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('reports.createTitle')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports.stats.totalReports')}
              value={reportData.length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: isDark ? '#1890ff' : '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports.stats.published')}
              value={reportData.filter(r => r.status === 'published').length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: isDark ? '#52c41a' : '#52c41a' }}
              prefix={<EyeOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports.stats.draft')}
              value={reportData.filter(r => r.status === 'draft').length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: isDark ? '#faad14' : '#faad14' }}
              prefix={<EditOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard $isDark={isDark}>
            <Statistic
              title={t('reports.stats.totalDownloads')}
              value={reportData.reduce((sum, r) => sum + r.downloads, 0)}
              suffix={t('common.unit.times')}
              valueStyle={{ color: isDark ? '#722ed1' : '#722ed1' }}
              prefix={<DownloadOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 报告列表 */}
      <MainCard $isDark={isDark}>
        {/* 筛选栏 */}
        <FilterBar $isDark={isDark}>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder={t('reports.search.placeholder')}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder={t('reports.search.type')}
                style={{ width: 120 }}
                allowClear
              >
                <Option value="health">{t('reports.types.health')}</Option>
                <Option value="dependency">{t('reports.types.dependency')}</Option>
                <Option value="relationship">{t('reports.types.relationship')}</Option>
                <Option value="performance">{t('reports.types.performance')}</Option>
              </Select>
            </Col>
            <Col>
              <Select
                placeholder={t('common.status')}
                style={{ width: 100 }}
                allowClear
              >
                <Option value="published">{t('reports.status.published')}</Option>
                <Option value="draft">{t('reports.status.draft')}</Option>
                <Option value="archived">{t('reports.status.archived')}</Option>
              </Select>
            </Col>
            <Col>
              <RangePicker placeholder={[t('common.startDate'), t('common.endDate')]} />
            </Col>
            <Col>
              <Button 
                icon={<FilterOutlined />}
                style={{
                  color: isDark ? '#ffffff' : undefined,
                  borderColor: isDark ? '#434343' : undefined,
                  backgroundColor: isDark ? 'transparent' : undefined
                }}
              >
                {t('common.filter')}
              </Button>
            </Col>
          </Row>
        </FilterBar>

        {/* 卡片视图 */}
        {renderCardView()}
      </MainCard>
    </PageContainer>
  );
};

export default ReportManagement;
