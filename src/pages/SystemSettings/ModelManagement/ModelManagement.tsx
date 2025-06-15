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
  Progress,
  Tooltip,
  Popconfirm,
  message,
  Alert,
  InputNumber,
  Slider
} from 'antd';
import { 
  SettingOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloudOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  MonitorOutlined,
  RobotOutlined,
  ExperimentOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../../utils';

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

const ModelCard = styled(Card)`
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

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  modelType: 'llm' | 'embedding' | 'image' | 'audio';
  version: string;
  apiEndpoint: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  status: 'active' | 'inactive' | 'testing';
  description: string;
  capabilities: string[];
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  usageCount: number;
}

const ModelManagement: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelConfig | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle(t('systemSettings.models.title'));
  }, [t]);

  // 模型配置数据
  const modelData: ModelConfig[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      modelType: 'llm',
      version: 'gpt-4-1106-preview',
      apiEndpoint: 'https://api.openai.com/v1/chat/completions',
      apiKey: 'sk-*********************',
      maxTokens: 4096,
      temperature: 0.7,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      status: 'active',
      description: '最新的GPT-4 Turbo模型，支持128K上下文长度，适用于复杂推理和长文本处理',
      capabilities: ['文本生成', '代码生成', '问答对话', '文本分析', '翻译'],
      pricing: {
        inputTokens: 0.01,
        outputTokens: 0.03,
        currency: 'USD'
      },
      limits: {
        requestsPerMinute: 500,
        tokensPerMinute: 150000,
        dailyLimit: 1000000
      },
      createdBy: '系统管理员',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14',
      lastUsed: '2024-06-15 14:30:00',
      usageCount: 15847
    },
    {
      id: '2',
      name: 'Claude-3 Sonnet',
      provider: 'Anthropic',
      modelType: 'llm',
      version: 'claude-3-sonnet-20240229',
      apiEndpoint: 'https://api.anthropic.com/v1/messages',
      apiKey: 'sk-ant-*********************',
      maxTokens: 4096,
      temperature: 0.8,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      status: 'active',
      description: 'Claude-3 Sonnet模型，在推理、数学和编程方面表现优异，适合复杂任务处理',
      capabilities: ['文本生成', '代码分析', '逻辑推理', '数学计算', '文档分析'],
      pricing: {
        inputTokens: 0.003,
        outputTokens: 0.015,
        currency: 'USD'
      },
      limits: {
        requestsPerMinute: 1000,
        tokensPerMinute: 200000,
        dailyLimit: 2000000
      },
      createdBy: '系统管理员',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13',
      lastUsed: '2024-06-15 14:25:00',
      usageCount: 8934
    },
    {
      id: '3',
      name: 'Text Embedding Ada 002',
      provider: 'OpenAI',
      modelType: 'embedding',
      version: 'text-embedding-ada-002',
      apiEndpoint: 'https://api.openai.com/v1/embeddings',
      apiKey: 'sk-*********************',
      maxTokens: 8191,
      temperature: 0.0,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      status: 'active',
      description: 'OpenAI的文本嵌入模型，用于文本相似度计算和语义搜索',
      capabilities: ['文本嵌入', '语义搜索', '相似度计算', '聚类分析'],
      pricing: {
        inputTokens: 0.0001,
        outputTokens: 0.0,
        currency: 'USD'
      },
      limits: {
        requestsPerMinute: 3000,
        tokensPerMinute: 1000000,
        dailyLimit: 10000000
      },
      createdBy: '系统管理员',
      createdAt: '2024-05-20',
      lastModified: '2024-06-10',
      lastUsed: '2024-06-15 14:20:00',
      usageCount: 25678
    },
    {
      id: '4',
      name: 'Gemini Pro',
      provider: 'Google',
      modelType: 'llm',
      version: 'gemini-pro',
      apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      apiKey: 'AIza*********************',
      maxTokens: 2048,
      temperature: 0.9,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      status: 'testing',
      description: 'Google的Gemini Pro模型，支持多模态输入，在创意写作方面表现出色',
      capabilities: ['文本生成', '多模态理解', '创意写作', '代码生成'],
      pricing: {
        inputTokens: 0.0005,
        outputTokens: 0.0015,
        currency: 'USD'
      },
      limits: {
        requestsPerMinute: 60,
        tokensPerMinute: 32000,
        dailyLimit: 100000
      },
      createdBy: '开发工程师',
      createdAt: '2024-06-10',
      lastModified: '2024-06-14',
      lastUsed: '2024-06-15 13:45:00',
      usageCount: 234
    }
  ];

  const providerMap = {
    'OpenAI': { color: 'green', icon: <ExperimentOutlined /> },
    'Anthropic': { color: 'blue', icon: <RobotOutlined /> },
    'Google': { color: 'red', icon: <CloudOutlined /> },
    'Azure': { color: 'cyan', icon: <DatabaseOutlined /> },
  };

  const modelTypeMap = {
    llm: { name: '大语言模型', color: 'blue', icon: <ExperimentOutlined /> },
    embedding: { name: '嵌入模型', color: 'green', icon: <ApiOutlined /> },
    image: { name: '图像模型', color: 'orange', icon: <MonitorOutlined /> },
    audio: { name: '音频模型', color: 'purple', icon: <ThunderboltOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: '活跃' },
      inactive: { color: 'red', text: '停用' },
      testing: { color: 'orange', text: '测试中' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateModel = () => {
    setEditingModel(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditModel = (model: ModelConfig) => {
    setEditingModel(model);
    form.setFieldsValue({
      name: model.name,
      provider: model.provider,
      modelType: model.modelType,
      version: model.version,
      apiEndpoint: model.apiEndpoint,
      maxTokens: model.maxTokens,
      temperature: model.temperature,
      description: model.description,
    });
    setModalVisible(true);
  };

  const handleViewModel = (model: ModelConfig) => {
    setSelectedModel(model);
    setDetailModalVisible(true);
  };

  const handleDeleteModel = (modelId: string) => {
    message.success('模型配置删除成功');
  };

  const handleTestModel = (modelId: string) => {
    message.success('模型连接测试成功');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingModel) {
        message.success('模型配置更新成功');
      } else {
        message.success('模型配置创建成功');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderModelCards = () => {
    return modelData.map(model => {
      const providerConfig = providerMap[model.provider as keyof typeof providerMap];
      const typeConfig = modelTypeMap[model.modelType as keyof typeof modelTypeMap];

      return (
        <Col xs={24} sm={12} lg={8} xl={6} key={model.id}>
          <ModelCard
            title={
              <Space>
                {providerConfig?.icon}
                <span>{model.name}</span>
                {getStatusTag(model.status)}
              </Space>
            }
            extra={
              <Space>
                <Tooltip title="测试连接">
                  <Button 
                    type="link" 
                    icon={<CheckCircleOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestModel(model.id);
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
                      handleViewModel(model);
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
                      handleEditModel(model);
                    }}
                  />
                </Tooltip>
              </Space>
            }
            onClick={() => handleViewModel(model)}
          >
            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                <Tag color={providerConfig?.color} icon={providerConfig?.icon}>
                  {model.provider}
                </Tag>
                <Tag color={typeConfig?.color} icon={typeConfig?.icon}>
                  {typeConfig?.name}
                </Tag>
              </Space>
            </div>
            
            <Paragraph 
              ellipsis={{ rows: 2 }} 
              style={{ marginBottom: 16, minHeight: 40 }}
            >
              {model.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="使用次数"
                    value={model.usageCount}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="最大Token"
                    value={model.maxTokens}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                {model.capabilities.slice(0, 3).map(cap => (
                  <Tag key={cap} size="small">{cap}</Tag>
                ))}
                {model.capabilities.length > 3 && (
                  <Tag size="small">+{model.capabilities.length - 3}</Tag>
                )}
              </Space>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div>版本: {model.version}</div>
              <div>上次使用: {model.lastUsed}</div>
            </div>
          </ModelCard>
        </Col>
      );
    });
  };

  const activeModels = modelData.filter(model => model.status === 'active').length;
  const totalUsage = modelData.reduce((sum, model) => sum + model.usageCount, 0);
  const avgTemperature = modelData.reduce((sum, model) => sum + model.temperature, 0) / modelData.length;

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <SettingOutlined style={{ color: '#1890ff' }} />
                {t('systemSettings.models.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('systemSettings.models.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('common.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateModel}>
              {t('systemSettings.models.addModel')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="模型总数"
              value={modelData.length}
              suffix="个"
              valueStyle={{ color: '#1890ff' }}
              prefix={<ExperimentOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="活跃模型"
              value={activeModels}
              suffix="个"
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="总使用次数"
              value={totalUsage}
              valueStyle={{ color: '#faad14' }}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平均温度"
              value={avgTemperature.toFixed(1)}
              valueStyle={{ color: '#722ed1' }}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <Card style={{ marginBottom: 24 }}>
        <FilterBar>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="搜索模型名称、提供商..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col>
              <Select
                placeholder="提供商"
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(providerMap).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {config.icon}
                      {key}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="模型类型"
                style={{ width: 120 }}
                allowClear
              >
                {Object.entries(modelTypeMap).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {config.icon}
                      {config.name}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                placeholder="状态"
                style={{ width: 100 }}
                allowClear
              >
                <Option value="active">活跃</Option>
                <Option value="inactive">停用</Option>
                <Option value="testing">测试中</Option>
              </Select>
            </Col>
          </Row>
        </FilterBar>
      </Card>

      {/* 模型卡片列表 */}
      <Row gutter={16}>
        {renderModelCards()}
      </Row>

      {/* 创建/编辑模型模态框 */}
      <Modal
        title={editingModel ? '编辑模型配置' : '添加模型配置'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            temperature: 0.7,
            topP: 1.0,
            maxTokens: 4096,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="模型名称"
                rules={[{ required: true, message: '请输入模型名称' }]}
              >
                <Input placeholder="请输入模型名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="provider"
                label="提供商"
                rules={[{ required: true, message: '请选择提供商' }]}
              >
                <Select placeholder="请选择提供商">
                  <Option value="OpenAI">OpenAI</Option>
                  <Option value="Anthropic">Anthropic</Option>
                  <Option value="Google">Google</Option>
                  <Option value="Azure">Azure</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="modelType"
                label="模型类型"
                rules={[{ required: true, message: '请选择模型类型' }]}
              >
                <Select placeholder="请选择模型类型">
                  <Option value="llm">大语言模型</Option>
                  <Option value="embedding">嵌入模型</Option>
                  <Option value="image">图像模型</Option>
                  <Option value="audio">音频模型</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="version"
                label="模型版本"
                rules={[{ required: true, message: '请输入模型版本' }]}
              >
                <Input placeholder="请输入模型版本" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="apiEndpoint"
            label="API端点"
            rules={[{ required: true, message: '请输入API端点' }]}
          >
            <Input placeholder="请输入API端点URL" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maxTokens"
                label="最大Token数"
                rules={[{ required: true, message: '请输入最大Token数' }]}
              >
                <InputNumber
                  min={1}
                  max={128000}
                  style={{ width: '100%' }}
                  placeholder="请输入最大Token数"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="temperature"
                label="温度参数"
                rules={[{ required: true, message: '请设置温度参数' }]}
              >
                <Slider
                  min={0}
                  max={2}
                  step={0.1}
                  marks={{
                    0: '0',
                    1: '1',
                    2: '2'
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入模型描述' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="请输入模型的功能描述和使用场景"
            />
          </Form.Item>

          <Alert
            message="提示"
            description="API密钥等敏感信息将在保存后进行加密存储，请确保API端点的正确性。"
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>

      {/* 模型详情模态框 */}
      <Modal
        title={selectedModel?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        {selectedModel && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="模型名称" span={2}>
                {selectedModel.name}
              </Descriptions.Item>
              <Descriptions.Item label="提供商">
                <Tag 
                  color={providerMap[selectedModel.provider as keyof typeof providerMap]?.color}
                  icon={providerMap[selectedModel.provider as keyof typeof providerMap]?.icon}
                >
                  {selectedModel.provider}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="模型类型">
                <Tag 
                  color={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.color}
                  icon={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.icon}
                >
                  {modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="版本">
                {selectedModel.version}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedModel.status)}
              </Descriptions.Item>
              <Descriptions.Item label="API端点" span={2}>
                <Text code>{selectedModel.apiEndpoint}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="使用次数">
                {selectedModel.usageCount}次
              </Descriptions.Item>
              <Descriptions.Item label="上次使用">
                {selectedModel.lastUsed}
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                {selectedModel.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedModel.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>
                {selectedModel.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="parameters">
              <Tabs.TabPane tab="参数配置" key="parameters">
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="生成参数" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="最大Token数">
                          {selectedModel.maxTokens}
                        </Descriptions.Item>
                        <Descriptions.Item label="温度参数">
                          {selectedModel.temperature}
                        </Descriptions.Item>
                        <Descriptions.Item label="Top P">
                          {selectedModel.topP}
                        </Descriptions.Item>
                        <Descriptions.Item label="频率惩罚">
                          {selectedModel.frequencyPenalty}
                        </Descriptions.Item>
                        <Descriptions.Item label="存在惩罚">
                          {selectedModel.presencePenalty}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="限制配置" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="每分钟请求数">
                          {selectedModel.limits.requestsPerMinute}
                        </Descriptions.Item>
                        <Descriptions.Item label="每分钟Token数">
                          {selectedModel.limits.tokensPerMinute}
                        </Descriptions.Item>
                        <Descriptions.Item label="每日限制">
                          {selectedModel.limits.dailyLimit}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="能力特性" key="capabilities">
                <Row gutter={16}>
                  {selectedModel.capabilities.map(capability => (
                    <Col xs={24} sm={12} lg={8} key={capability}>
                      <Card 
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24, marginBottom: 8 }} />
                          <div>{capability}</div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab="定价信息" key="pricing">
                <Card title="定价详情" size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="输入Token价格">
                      ${selectedModel.pricing.inputTokens} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label="输出Token价格">
                      ${selectedModel.pricing.outputTokens} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label="货币单位">
                      {selectedModel.pricing.currency}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default ModelManagement;
