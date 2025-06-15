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
import { setPageTitle } from '../../../utils';

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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TagManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle('标签管理');
  }, []);

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
    message.success('标签删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        message.success('标签更新成功');
      } else {
        message.success('标签创建成功');
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
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color} style={{ fontSize: 14, padding: '4px 8px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '分类',
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
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      render: (count: number) => (
        <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditTag(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个标签吗？"
            description="删除后将无法恢复，且会影响已使用此标签的资源。"
            onConfirm={() => handleDeleteTag(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              删除
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
          <TagCard>
            <div style={{ marginBottom: 16 }}>
              <Space>
                {config?.icon}
                <Title level={4} style={{ margin: 0 }}>
                  {config?.name || category}
                </Title>
                <Badge count={tags.length} style={{ backgroundColor: config?.color }} />
              </Space>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map(tag => (
                <Tag 
                  key={tag.key} 
                  color={tag.color}
                  style={{ marginBottom: 4, cursor: 'pointer' }}
                  onClick={() => handleEditTag(tag)}
                >
                  {tag.name} ({tag.usageCount})
                </Tag>
              ))}
            </div>
          </TagCard>
        </Col>
      );
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              标签管理
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
              统一管理系统中的标签体系，支持标签创建、分类管理和使用统计。
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTag}>
              创建标签
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="标签总数"
              value={tagData.length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<TagsOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="分类数量"
              value={Object.keys(categoryMap).length}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<AppstoreOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="总使用次数"
              value={tagData.reduce((sum, tag) => sum + tag.usageCount, 0)}
              suffix="次"
              valueStyle={{ color: '#faad14' }}
              prefix={<BgColorsOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平均使用率"
              value={Math.round(tagData.reduce((sum, tag) => sum + tag.usageCount, 0) / tagData.length)}
              suffix="次/标签"
              valueStyle={{ color: '#722ed1' }}
              prefix={<NodeIndexOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 分类展示 */}
      <Card title="标签分类" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          {renderTagsByCategory()}
        </Row>
      </Card>

      {/* 标签列表 */}
      <Card title="标签列表">
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="搜索标签名称、描述..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="选择分类"
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(categoryMap).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {config.icon}
                      {config.name}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

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
        title={editingTag ? '编辑标签' : '创建标签'}
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
            label="标签名称"
            rules={[
              { required: true, message: '请输入标签名称' },
              { max: 20, message: '标签名称不能超过20个字符' }
            ]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="color"
                label="标签颜色"
                rules={[{ required: true, message: '请选择标签颜色' }]}
              >
                <ColorPicker showText />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="标签分类"
                rules={[{ required: true, message: '请选择标签分类' }]}
              >
                <Select placeholder="请选择分类">
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
            label="标签描述"
            rules={[
              { required: true, message: '请输入标签描述' },
              { max: 100, message: '描述不能超过100个字符' }
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入标签描述，说明标签的用途和适用场景"
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TagManagement;
