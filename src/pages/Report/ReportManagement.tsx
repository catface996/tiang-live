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
  Table,
  Tag,
  Dropdown,
  Input,
  DatePicker,
  Select,
  Tabs,
  message
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
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  BarsOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import { ReportCard } from './components';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const ReportManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');

  useEffect(() => {
    setPageTitle('报告管理');
  }, []);

  // 模拟报告数据
  const reportData = [
    {
      key: '1',
      name: '系统健康度分析报告',
      type: '健康度分析',
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
      type: '依赖分析',
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
      type: '关系分析',
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
      type: '性能分析',
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
      published: { color: 'green', text: '已发布' },
      draft: { color: 'orange', text: '草稿' },
      archived: { color: 'gray', text: '已归档' },
    };
    const config = statusMap[status as keyof typeof statusMap] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getTypeTag = (type: string) => {
    const typeMap = {
      '健康度分析': { color: 'blue' },
      '依赖分析': { color: 'purple' },
      '关系分析': { color: 'cyan' },
      '性能分析': { color: 'gold' },
      '安全分析': { color: 'red' },
      '行为分析': { color: 'green' },
    };
    const config = typeMap[type as keyof typeof typeMap] || { color: 'default' };
    return <Tag color={config.color}>{type}</Tag>;
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

  const actionMenuItems = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: '查看详情',
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: '编辑报告',
    },
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: '下载报告',
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: '删除报告',
      danger: true,
    },
  ];

  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '创建者',
      dataIndex: 'author',
      key: 'author',
      render: (author: string) => (
        <Space>
          <UserOutlined style={{ color: '#666' }} />
          {author}
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (time: string) => (
        <Space>
          <CalendarOutlined style={{ color: '#666' }} />
          {time}
        </Space>
      ),
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '下载次数',
      dataIndex: 'downloads',
      key: 'downloads',
      render: (downloads: number) => (
        <Badge count={downloads} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            size="small"
          >
            查看
          </Button>
          <Dropdown 
            menu={{ items: actionMenuItems }}
            trigger={['click']}
          >
            <Button 
              type="link" 
              icon={<MoreOutlined />} 
              size="small"
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              报告管理
              <Badge 
                count="开发中" 
                style={{ 
                  backgroundColor: '#faad14', 
                  marginLeft: 12,
                  fontSize: 12 
                }} 
              />
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              统一管理系统生成的各类分析报告，支持报告创建、编辑、发布和分享。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ExportOutlined />}>
              批量导出
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              创建报告
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="报告总数"
              value={reportData.length}
              suffix="份"
              valueStyle={{ color: '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="已发布"
              value={reportData.filter(r => r.status === 'published').length}
              suffix="份"
              valueStyle={{ color: '#52c41a' }}
              prefix={<EyeOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="草稿"
              value={reportData.filter(r => r.status === 'draft').length}
              suffix="份"
              valueStyle={{ color: '#faad14' }}
              prefix={<EditOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="总下载量"
              value={reportData.reduce((sum, r) => sum + r.downloads, 0)}
              suffix="次"
              valueStyle={{ color: '#722ed1' }}
              prefix={<DownloadOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 报告列表 */}
      <Card>
        {/* 筛选栏 */}
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="搜索报告名称、创建者..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="报告类型"
                style={{ width: 120 }}
                allowClear
              >
                <Option value="health">健康度分析</Option>
                <Option value="dependency">依赖分析</Option>
                <Option value="relationship">关系分析</Option>
                <Option value="performance">性能分析</Option>
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="状态"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="published">已发布</Option>
                <Option value="draft">草稿</Option>
                <Option value="archived">已归档</Option>
              </Select>
            </Col>
            <Col>
              <RangePicker placeholder={['开始日期', '结束日期']} />
            </Col>
            <Col>
              <Button icon={<FilterOutlined />}>
                筛选
              </Button>
            </Col>
            <Col>
              <Button.Group>
                <Button 
                  type={viewMode === 'cards' ? 'primary' : 'default'}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode('cards')}
                >
                  卡片视图
                </Button>
                <Button 
                  type={viewMode === 'list' ? 'primary' : 'default'}
                  icon={<BarsOutlined />}
                  onClick={() => setViewMode('list')}
                >
                  列表视图
                </Button>
              </Button.Group>
            </Col>
          </Row>
        </FilterBar>

        {/* 视图内容 */}
        {viewMode === 'cards' ? (
          renderCardView()
        ) : (
          <Table
            columns={columns}
            dataSource={reportData}
            loading={loading}
            pagination={{
              total: reportData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default ReportManagement;
