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
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Table,
  Tabs,
  Descriptions,
  Tooltip,
  Popconfirm,
  message,
  Alert,
  Rate,
  Divider
} from 'antd';
import { 
  FileTextOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  StarOutlined,
  BulbOutlined,
  CodeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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

const PromptCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const PromptContent = styled.div`
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  variables: string[];
  tags: string[];
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  usageCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  version: string;
}

const PromptTemplates: React.FC = () => {
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const isDarkMode = currentTheme === 'dark';
  const iconColor = isDarkMode ? '#ffffff' : '#1890ff';
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle(t('systemSettings.prompts.title'));
  }, [t]);

  // 提示词模板数据
  const promptData: PromptTemplate[] = [
    {
      id: '1',
      name: '代码审查助手',
      category: '开发工具',
      description: '帮助开发者进行代码审查，识别潜在问题和改进建议',
      content: `你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

代码语言：{language}
代码内容：
{code}

请从以下几个方面进行审查：
1. 代码质量和可读性
2. 性能优化建议
3. 安全性问题
4. 最佳实践遵循情况
5. 潜在的bug或错误

请提供具体的改进建议和修改方案。`,
      variables: ['language', 'code'],
      tags: ['代码审查', '开发', '质量控制'],
      language: 'zh-CN',
      difficulty: 'intermediate',
      rating: 4.8,
      usageCount: 1247,
      isPublic: true,
      isFavorite: true,
      createdBy: '开发团队',
      createdAt: '2024-05-15',
      lastModified: '2024-06-10',
      lastUsed: '2024-06-15 14:20:00',
      version: '1.2'
    },
    {
      id: '2',
      name: '系统故障诊断',
      category: '运维工具',
      description: '协助运维人员诊断系统故障，提供解决方案',
      content: `你是一个经验丰富的系统运维专家。现在需要你帮助诊断以下系统故障：

系统类型：{system_type}
故障现象：{symptoms}
错误日志：{error_logs}
系统环境：{environment}

请按照以下步骤进行故障诊断：
1. 分析故障现象和可能原因
2. 检查相关系统组件和依赖
3. 提供详细的排查步骤
4. 给出具体的解决方案
5. 建议预防措施

请提供清晰的诊断报告和操作指南。`,
      variables: ['system_type', 'symptoms', 'error_logs', 'environment'],
      tags: ['故障诊断', '运维', '系统维护'],
      language: 'zh-CN',
      difficulty: 'advanced',
      rating: 4.9,
      usageCount: 856,
      isPublic: true,
      isFavorite: false,
      createdBy: '运维团队',
      createdAt: '2024-05-20',
      lastModified: '2024-06-12',
      lastUsed: '2024-06-15 13:45:00',
      version: '1.1'
    },
    {
      id: '3',
      name: '业务需求分析',
      category: '产品管理',
      description: '帮助产品经理分析和整理业务需求',
      content: `你是一个资深的产品经理和业务分析师。请帮助分析以下业务需求：

需求背景：{background}
目标用户：{target_users}
业务目标：{business_goals}
功能描述：{feature_description}

请从以下维度进行需求分析：
1. 需求合理性和可行性评估
2. 用户价值和业务价值分析
3. 技术实现复杂度评估
4. 风险识别和应对策略
5. 优先级建议和排期规划

请提供结构化的需求分析报告。`,
      variables: ['background', 'target_users', 'business_goals', 'feature_description'],
      tags: ['需求分析', '产品管理', '业务分析'],
      language: 'zh-CN',
      difficulty: 'intermediate',
      rating: 4.6,
      usageCount: 634,
      isPublic: true,
      isFavorite: true,
      createdBy: '产品团队',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14',
      lastUsed: '2024-06-15 12:30:00',
      version: '1.0'
    },
    {
      id: '4',
      name: '技术文档生成',
      category: '文档工具',
      description: '自动生成技术文档和API说明',
      content: `你是一个专业的技术文档编写专家。请根据以下信息生成完整的技术文档：

项目名称：{project_name}
功能模块：{module_name}
技术栈：{tech_stack}
API接口：{api_details}
使用场景：{use_cases}

请生成包含以下内容的技术文档：
1. 项目概述和架构说明
2. 功能模块详细介绍
3. API接口文档和示例
4. 安装和配置指南
5. 使用示例和最佳实践
6. 常见问题和故障排除

请确保文档结构清晰，内容详实，易于理解。`,
      variables: ['project_name', 'module_name', 'tech_stack', 'api_details', 'use_cases'],
      tags: ['技术文档', '文档生成', 'API文档'],
      language: 'zh-CN',
      difficulty: 'beginner',
      rating: 4.4,
      usageCount: 423,
      isPublic: false,
      isFavorite: false,
      createdBy: '技术团队',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13',
      lastUsed: '2024-06-15 11:15:00',
      version: '1.0'
    }
  ];

  const categoryMap = {
    '开发工具': { color: 'blue', icon: <CodeOutlined /> },
    '运维工具': { color: 'green', icon: <ThunderboltOutlined /> },
    '产品管理': { color: 'orange', icon: <BulbOutlined /> },
    '文档工具': { color: 'purple', icon: <FileTextOutlined /> },
    '客服助手': { color: 'cyan', icon: <MessageOutlined /> },
    '数据分析': { color: 'red', icon: <SafetyCertificateOutlined /> },
  };

  const difficultyMap = {
    beginner: { name: '初级', color: 'green' },
    intermediate: { name: '中级', color: 'orange' },
    advanced: { name: '高级', color: 'red' },
  };

  const handleCreatePrompt = () => {
    setEditingPrompt(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPrompt = (prompt: PromptTemplate) => {
    setEditingPrompt(prompt);
    form.setFieldsValue({
      name: prompt.name,
      category: prompt.category,
      description: prompt.description,
      content: prompt.content,
      language: prompt.language,
      difficulty: prompt.difficulty,
      isPublic: prompt.isPublic,
    });
    setModalVisible(true);
  };

  const handleViewPrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setDetailModalVisible(true);
  };

  const handleCopyPrompt = (prompt: PromptTemplate) => {
    navigator.clipboard.writeText(prompt.content);
    message.success('提示词内容已复制到剪贴板');
  };

  const handleToggleFavorite = (promptId: string) => {
    message.success('收藏状态更新成功');
  };

  const handleDeletePrompt = (promptId: string) => {
    message.success('提示词模板删除成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPrompt) {
        message.success('提示词模板更新成功');
      } else {
        message.success('提示词模板创建成功');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderPromptCards = () => {
    return promptData.map(prompt => {
      const categoryConfig = categoryMap[prompt.category as keyof typeof categoryMap];
      const difficultyConfig = difficultyMap[prompt.difficulty];

      return (
        <Col xs={24} sm={12} lg={8} xl={6} key={prompt.id}>
          <PromptCard
            title={
              <Space>
                {categoryConfig?.icon}
                <span>{prompt.name}</span>
                {prompt.isFavorite && <StarOutlined style={{ color: '#faad14' }} />}
              </Space>
            }
            extra={
              <Space>
                <Tooltip title="复制内容">
                  <Button 
                    type="link" 
                    icon={<CopyOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPrompt(prompt);
                    }}
                  />
                </Tooltip>
                <Tooltip title={prompt.isFavorite ? '取消收藏' : '添加收藏'}>
                  <Button 
                    type="link" 
                    icon={<StarOutlined />} 
                    size="small"
                    style={{ color: prompt.isFavorite ? '#faad14' : undefined }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(prompt.id);
                    }}
                  />
                </Tooltip>
                <Tooltip title="查看详情">
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewPrompt(prompt);
                    }}
                  />
                </Tooltip>
                <Tooltip title="编辑">
                  <Button 
                    type="link" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPrompt(prompt);
                    }}
                  />
                </Tooltip>
              </Space>
            }
            onClick={() => handleViewPrompt(prompt)}
          >
            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                <Tag color={categoryConfig?.color} icon={categoryConfig?.icon}>
                  {prompt.category}
                </Tag>
                <Tag color={difficultyConfig?.color}>
                  {difficultyConfig?.name}
                </Tag>
                {prompt.isPublic && <Tag color="blue">公开</Tag>}
              </Space>
            </div>
            
            <Paragraph 
              ellipsis={{ rows: 2 }} 
              style={{ marginBottom: 16, minHeight: 40 }}
            >
              {prompt.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ textAlign: 'center' }}>
                    <Rate disabled value={prompt.rating} allowHalf style={{ fontSize: 12 }} />
                    <div style={{ fontSize: 12, color: '#666' }}>{prompt.rating}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <Statistic
                    title="使用次数"
                    value={prompt.usageCount}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                {prompt.tags.slice(0, 3).map(tag => (
                  <Tag key={tag} size="small">{tag}</Tag>
                ))}
                {prompt.tags.length > 3 && (
                  <Tag size="small">+{prompt.tags.length - 3}</Tag>
                )}
              </Space>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>版本: {prompt.version}</div>
              <div>上次使用: {prompt.lastUsed}</div>
            </div>
          </PromptCard>
        </Col>
      );
    });
  };

  const publicPrompts = promptData.filter(prompt => prompt.isPublic).length;
  const favoritePrompts = promptData.filter(prompt => prompt.isFavorite).length;
  const totalUsage = promptData.reduce((sum, prompt) => sum + prompt.usageCount, 0);
  const avgRating = promptData.reduce((sum, prompt) => sum + prompt.rating, 0) / promptData.length;

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <FileTextOutlined style={{ color: iconColor }} />
                {t('systemSettings.prompts.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('systemSettings.prompts.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreatePrompt}>
              {t('systemSettings.prompts.createPrompt')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('systemSettings.prompts.stats.totalTemplates')}
              value={promptData.length}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('systemSettings.prompts.stats.publicTemplates')}
              value={publicPrompts}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('systemSettings.prompts.stats.favoriteTemplates')}
              value={favoritePrompts}
              suffix={t('common.unit.count')}
              valueStyle={{ color: '#faad14' }}
              prefix={<StarOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('systemSettings.prompts.stats.averageRating')}
              value={avgRating.toFixed(1)}
              valueStyle={{ color: '#722ed1' }}
              prefix={<RobotOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('systemSettings.prompts.search.placeholder')}
        filters={[
          {
            key: 'category',
            value: filterCategory,
            onChange: setFilterCategory,
            placeholder: t('systemSettings.prompts.search.category'),
            width: 120,
            options: [
              { value: 'all', label: t('systemSettings.prompts.search.allCategories') },
              ...Object.entries(categoryMap).map(([key, config]) => ({
                value: key,
                label: key
              }))
            ]
          },
          {
            key: 'difficulty',
            value: filterDifficulty,
            onChange: setFilterDifficulty,
            placeholder: t('systemSettings.prompts.search.difficulty'),
            width: 100,
            options: [
              { value: 'all', label: t('systemSettings.prompts.search.allDifficulties') },
              { value: 'beginner', label: t('systemSettings.prompts.difficulty.beginner') },
              { value: 'intermediate', label: t('systemSettings.prompts.difficulty.intermediate') },
              { value: 'advanced', label: t('systemSettings.prompts.difficulty.advanced') }
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('systemSettings.prompts.search.status'),
            width: 100,
            options: [
              { value: 'all', label: t('systemSettings.prompts.search.allStatuses') },
              { value: 'public', label: t('systemSettings.prompts.status.public') },
              { value: 'private', label: t('systemSettings.prompts.status.private') },
              { value: 'favorite', label: t('systemSettings.prompts.status.favorite') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 提示词卡片列表 */}
      <Row gutter={16}>
        {renderPromptCards()}
      </Row>

      {/* 创建/编辑提示词模态框 */}
      <Modal
        title={editingPrompt ? '编辑提示词模板' : '创建提示词模板'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            language: 'zh-CN',
            difficulty: 'intermediate',
            isPublic: false,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="模板名称"
                rules={[{ required: true, message: '请输入模板名称' }]}
              >
                <Input placeholder="请输入模板名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Option value="开发工具">开发工具</Option>
                  <Option value="运维工具">运维工具</Option>
                  <Option value="产品管理">产品管理</Option>
                  <Option value="文档工具">文档工具</Option>
                  <Option value="客服助手">客服助手</Option>
                  <Option value="数据分析">数据分析</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入模板描述' }]}
          >
            <TextArea 
              rows={2} 
              placeholder="请输入模板的功能描述和使用场景"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="提示词内容"
            rules={[{ required: true, message: '请输入提示词内容' }]}
          >
            <TextArea 
              rows={8} 
              placeholder="请输入提示词内容，使用 {变量名} 格式定义变量"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="language"
                label="语言"
                rules={[{ required: true, message: '请选择语言' }]}
              >
                <Select placeholder="请选择语言">
                  <Option value="zh-CN">中文</Option>
                  <Option value="en-US">English</Option>
                  <Option value="ja-JP">日本語</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="difficulty"
                label="难度"
                rules={[{ required: true, message: '请选择难度' }]}
              >
                <Select placeholder="请选择难度">
                  <Option value="beginner">初级</Option>
                  <Option value="intermediate">中级</Option>
                  <Option value="advanced">高级</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="isPublic"
                label="公开模板"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message="提示"
            description="使用 {变量名} 格式在提示词中定义变量，系统会自动识别并提供变量替换功能。"
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>

      {/* 提示词详情模态框 */}
      <Modal
        title={selectedPrompt?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        {selectedPrompt && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="模板名称" span={2}>
                {selectedPrompt.name}
              </Descriptions.Item>
              <Descriptions.Item label="分类">
                <Tag 
                  color={categoryMap[selectedPrompt.category as keyof typeof categoryMap]?.color}
                  icon={categoryMap[selectedPrompt.category as keyof typeof categoryMap]?.icon}
                >
                  {selectedPrompt.category}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="难度">
                <Tag color={difficultyMap[selectedPrompt.difficulty]?.color}>
                  {difficultyMap[selectedPrompt.difficulty]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="评分">
                <Space>
                  <Rate disabled value={selectedPrompt.rating} allowHalf />
                  <Text>{selectedPrompt.rating}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="使用次数">
                {selectedPrompt.usageCount}次
              </Descriptions.Item>
              <Descriptions.Item label="语言">
                {selectedPrompt.language}
              </Descriptions.Item>
              <Descriptions.Item label="版本">
                {selectedPrompt.version}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Space>
                  {selectedPrompt.isPublic && <Tag color="blue">公开</Tag>}
                  {selectedPrompt.isFavorite && <Tag color="gold" icon={<StarOutlined />}>收藏</Tag>}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedPrompt.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedPrompt.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="上次使用">
                {selectedPrompt.lastUsed}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedPrompt.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 提示词内容 */}
            <Card title="提示词内容" style={{ marginBottom: 16 }}>
              <PromptContent>
                {selectedPrompt.content}
              </PromptContent>
              <div style={{ marginTop: 12, textAlign: 'right' }}>
                <Button 
                  icon={<CopyOutlined />} 
                  onClick={() => handleCopyPrompt(selectedPrompt)}
                >
                  复制内容
                </Button>
              </div>
            </Card>

            {/* 变量和标签 */}
            <Row gutter={16}>
              <Col span={12}>
                <Card title="变量列表" size="small">
                  {selectedPrompt.variables.length > 0 ? (
                    <Space wrap>
                      {selectedPrompt.variables.map(variable => (
                        <Tag key={variable} color="blue">
                          {`{${variable}}`}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">无变量</Text>
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="标签" size="small">
                  <Space wrap>
                    {selectedPrompt.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default PromptTemplates;
