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
  Input,
  Modal,
  Form,
  ColorPicker,
  Select,
  Popconfirm,
  message
} from 'antd';
import { 
  TagsOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
  NodeIndexOutlined,
  FileTextOutlined,
  ControlOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import '../../../styles/tag-management.css';

const { Title, Paragraph } = Typography;
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

const TagCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  .ant-card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TagCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
`;

const TagCardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -4px; /* 负边距抵消子元素的边距 */
  
  .ant-tag {
    margin: 4px !important; /* 所有方向统一4px边距，总间距为8px */
  }
`;

const TagManagement: React.FC = () => {
  const { t } = useTranslation(['tags', 'common']);
  const { currentTheme } = useAppSelector((state) => state.theme);
  const isDarkMode = currentTheme === 'dark';
  const iconColor = isDarkMode ? '#ffffff' : '#1890ff';
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle(t('tags:title'));
  }, [t]);

  // 模拟标签数据
  const tagData = [
    {
      key: '1',
      name: '生产环境',
      color: '#f5222d',
      category: 'environment',
      description: '标识生产环境相关的资源',
      usageCount: 156,
      createdAt: '2024-06-10',
    },
    {
      key: '2',
      name: '测试环境',
      color: '#faad14',
      category: 'environment',
      description: '标识测试环境相关的资源',
      usageCount: 89,
      createdAt: '2024-06-10',
    },
    {
      key: '3',
      name: '核心业务',
      color: '#1890ff',
      category: 'business',
      description: '标识核心业务相关的组件',
      usageCount: 234,
      createdAt: '2024-06-08',
    },
    {
      key: '4',
      name: '高可用',
      color: '#52c41a',
      category: 'feature',
      description: '标识具有高可用特性的服务',
      usageCount: 67,
      createdAt: '2024-06-05',
    },
    {
      key: '5',
      name: '微服务',
      color: '#722ed1',
      category: 'architecture',
      description: '标识微服务架构组件',
      usageCount: 123,
      createdAt: '2024-06-03',
    },
    {
      key: '6',
      name: '数据库',
      color: '#13c2c2',
      category: 'component',
      description: '标识数据库相关组件',
      usageCount: 45,
      createdAt: '2024-06-01',
    },
  ];

  const categoryMap = {
    environment: { name: '环境', icon: <AppstoreOutlined />, color: '#1890ff' },
    business: { name: '业务', icon: <NodeIndexOutlined />, color: '#52c41a' },
    feature: { name: '特性', icon: <BgColorsOutlined />, color: '#faad14' },
    architecture: { name: '架构', icon: <ControlOutlined />, color: '#722ed1' },
    component: { name: '组件', icon: <FileTextOutlined />, color: '#13c2c2' },
  };

  const handleCreateTag = () => {
    setEditingTag(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTag = (tag: any) => {
    setEditingTag(tag);
    form.setFieldsValue({
      name: tag.name,
      color: tag.color,
      category: tag.category,
      description: tag.description,
    });
    setModalVisible(true);
  };

  const handleDeleteTag = (tagId: string) => {
    message.success(t('tags:messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        message.success(t('tags:messages.updateSuccess'));
      } else {
        message.success(t('tags:messages.createSuccess'));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: t('tags:table.tagName'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color}>
          {text}
        </Tag>
      ),
    },
    {
      title: t('tags:table.category'),
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const config = categoryMap[category as keyof typeof categoryMap];
        return (
          <Space>
            {config?.icon}
            <span>{config?.name || category}</span>
          </Space>
        );
      },
    },
    {
      title: t('tags:table.description'),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: t('tags:table.usageCount'),
      dataIndex: 'usageCount',
      key: 'usageCount',
      render: (count: number) => (
        <span>{count}</span>
      ),
    },
    {
      title: t('tags:table.createTime'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('tags:table.actions'),
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditTag(record)}
          >
            {t('tags:actions.edit')}
          </Button>
          <Popconfirm
            title={t('tags:actions.deleteConfirm')}
            description={t('tags:actions.deleteDescription')}
            onConfirm={() => handleDeleteTag(record.key)}
            okText={t('common:confirm')}
            cancelText={t('common:cancel')}
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              {t('tags:actions.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const renderTagsByCategory = () => {
    const groupedTags = tagData.reduce((acc, tag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = [];
      }
      acc[tag.category].push(tag);
      return acc;
    }, {} as Record<string, any[]>);

    return Object.entries(groupedTags).map(([category, tags]) => {
      const config = categoryMap[category as keyof typeof categoryMap];
      return (
        <Col xs={24} md={12} lg={8} key={category}>
          <TagCard className={`category-${category.toLowerCase()}`}>
            <TagCardHeader>
              <Space>
                <span className="category-icon">{config?.icon}</span>
                <Title level={4} style={{ margin: 0 }}>
                  {config?.name || category}
                </Title>
              </Space>
              <Badge count={tags.length} />
            </TagCardHeader>
            <TagCardContent>
              {tags.map(tag => (
                <Tag 
                  key={tag.key} 
                  color={tag.color}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEditTag(tag)}
                >
                  {tag.name} ({tag.usageCount})
                </Tag>
              ))}
            </TagCardContent>
          </TagCard>
        </Col>
      );
    });
  };

  return (
    <PageContainer className="tag-management-page">
      <PageHeader>
        {/* Title和按钮在同一行 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title level={2} style={{ margin: 0 }}>
            <Space>
              <TagsOutlined />
              {t('tags:title')}
            </Space>
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTag}>
              {t('tags:createTag')}
            </Button>
          </Space>
        </div>
        
        {/* Paragraph单独一行，充满宽度 */}
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>
          {t('tags:subtitle')}
        </Paragraph>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="tag-stats-primary">
            <Statistic
              title={t('tags:stats.totalTags')}
              value={tagData.length}
              prefix={<TagsOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="tag-stats-success">
            <Statistic
              title={t('tags:stats.categoryCount')}
              value={Object.keys(categoryMap).length}
              prefix={<AppstoreOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="tag-stats-warning">
            <Statistic
              title={t('tags:stats.totalUsage')}
              value={tagData.reduce((sum, tag) => sum + tag.usageCount, 0)}
              prefix={<BgColorsOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="tag-stats-purple">
            <Statistic
              title={t('tags:stats.averageUsage')}
              value={Math.round(tagData.reduce((sum, tag) => sum + tag.usageCount, 0) / tagData.length)}
              prefix={<NodeIndexOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 分类展示 */}
      <Card title={t('tags:categoryDisplay.title')} style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {renderTagsByCategory()}
        </Row>
      </Card>

      {/* 搜索筛选 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('tags:search.placeholder')}
        filters={[
          {
            key: 'category',
            value: filterCategory,
            onChange: setFilterCategory,
            placeholder: t('tags:search.category'),
            width: 120,
            options: [
              { value: 'all', label: t('tags:search.allCategories') },
              ...Object.entries(categoryMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
        style={{ marginBottom: 24 }}
      />

      {/* 标签列表 */}
      <Card title={t('tags:table.title')}>
        <Table
          columns={columns}
          dataSource={tagData}
          loading={loading}
          pagination={{
            total: tagData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 创建/编辑标签模态框 */}
      <Modal
        title={editingTag ? t('tags:editTitle') : t('tags:createTitle')}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            color: '#1890ff',
            category: 'business',
          }}
        >
          <Form.Item
            name="name"
            label={t('tags:form.tagName')}
            rules={[
              { required: true, message: t('tags:form.tagNameRequired') },
              { max: 20, message: t('validation.maxLength', { max: 20 }) }
            ]}
          >
            <Input placeholder={t('tags:form.tagNamePlaceholder')} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="color"
                label={t('tags:form.color')}
                rules={[{ required: true, message: t('tags:form.colorRequired') }]}
              >
                <ColorPicker showText />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label={t('tags:form.category')}
                rules={[{ required: true, message: t('tags:form.categoryRequired') }]}
              >
                <Select placeholder={t('tags:form.categoryPlaceholder')}>
                  {Object.entries(categoryMap).map(([key, config]) => (
                    <Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.name}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label={t('tags:form.description')}
            rules={[
              { required: true, message: t('tags:form.descriptionRequired') },
              { max: 100, message: t('validation.maxLength', { max: 100 }) }
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder={t('tags:form.descriptionPlaceholder')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TagManagement;
