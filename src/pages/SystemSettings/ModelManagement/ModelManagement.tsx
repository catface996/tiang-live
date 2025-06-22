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
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import modelsData from '../../../data/models.json';

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
  
  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;
    
    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }
    
    .ant-card-extra {
      padding: 0;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: #666;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
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
  const [searchText, setSearchText] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle(t('models.title'));
  }, [t]);

  // 从JSON文件获取模型数据
  const modelData: ModelConfig[] = modelsData.models.map(model => ({
    ...model,
    description: t(model.description),
    capabilities: model.capabilities.map(cap => t(cap)),
    createdBy: t(model.createdBy)
  }));

  const providerMap = {
    'OpenAI': { color: 'green', icon: <ExperimentOutlined /> },
    'Anthropic': { color: 'blue', icon: <RobotOutlined /> },
    'Google': { color: 'red', icon: <CloudOutlined /> },
    'Azure': { color: 'cyan', icon: <DatabaseOutlined /> },
  };

  const modelTypeMap = {
    llm: { name: t('models.types.llm'), color: 'blue', icon: <ExperimentOutlined /> },
    embedding: { name: t('models.types.embedding'), color: 'green', icon: <ApiOutlined /> },
    image: { name: t('models.types.image'), color: 'orange', icon: <MonitorOutlined /> },
    audio: { name: t('models.types.audio'), color: 'purple', icon: <ThunderboltOutlined /> },
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('models.status.active') },
      inactive: { color: 'red', text: t('models.status.inactive') },
      testing: { color: 'orange', text: t('models.status.testing') },
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
    message.success(t('models.alerts.deleteSuccess'));
  };

  const handleTestModel = (modelId: string) => {
    message.success(t('models.alerts.testSuccess'));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingModel) {
        message.success(t('models.alerts.updateSuccess'));
      } else {
        message.success(t('models.alerts.createSuccess'));
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
        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={model.id}>
          <ModelCard
            title={
              <div className="card-title">
                <div className="title-left">
                  <Space>
                    {providerConfig?.icon}
                    <span>{model.name}</span>
                  </Space>
                </div>
                <div className="title-right">
                  {getStatusTag(model.status)}
                </div>
              </div>
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
                    title={t('models.stats.usageCount')}
                    value={model.usageCount}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('models.stats.maxTokens')}
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
              <div>{t('models.stats.version')}: {model.version}</div>
              <div>{t('models.stats.lastUsed')}: {model.lastUsed}</div>
            </div>
            
            {/* 操作按钮区域 - 单独一行，右对齐 */}
            <div className="card-actions">
              <Space>
                <Tooltip title={t('models.viewDetails')}>
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewModel(model);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('common.edit')}>
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditModel(model);
                    }}
                  />
                </Tooltip>
              </Space>
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
            <Title className="page-title" level={2} style={{ margin: 0 }}>
              <Space>
                <SettingOutlined />
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
              title={t('models.stats.totalModels')}
              value={modelData.length}
              suffix={t('models.stats.unit')}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ExperimentOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('models.stats.activeModels')}
              value={activeModels}
              suffix={t('models.stats.unit')}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('models.stats.totalUsage')}
              value={totalUsage}
              valueStyle={{ color: '#faad14' }}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title={t('models.stats.avgTemperature')}
              value={avgTemperature.toFixed(1)}
              valueStyle={{ color: '#722ed1' }}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('models.searchPlaceholder')}
        filters={[
          {
            key: 'provider',
            value: filterProvider,
            onChange: setFilterProvider,
            placeholder: t('models.filterByProvider'),
            width: 120,
            options: [
              { value: 'all', label: t('models.providers.all') },
              ...Object.entries(providerMap).map(([key, config]) => ({
                value: key,
                label: t(`models.providers.${key}`)
              }))
            ]
          },
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('models.filterByType'),
            width: 120,
            options: [
              { value: 'all', label: t('common.all') },
              ...Object.entries(modelTypeMap).map(([key, config]) => ({
                value: key,
                label: config.name
              }))
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('models.filterByStatus'),
            width: 100,
            options: [
              { value: 'all', label: t('common.all') },
              { value: 'active', label: t('models.status.active') },
              { value: 'inactive', label: t('models.status.inactive') },
              { value: 'testing', label: t('models.status.testing') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 模型卡片列表 */}
      <Row gutter={16}>
        {renderModelCards()}
      </Row>

      {/* 创建/编辑模型模态框 */}
      <Modal
        title={editingModel ? t('models.editModel') : t('models.createModel')}
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
                label={t('models.form.name')}
                rules={[{ required: true, message: t('models.form.nameRequired') }]}
              >
                <Input placeholder={t('models.form.namePlaceholder')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="provider"
                label={t('models.form.provider')}
                rules={[{ required: true, message: t('models.form.providerRequired') }]}
              >
                <Select placeholder={t('models.form.providerPlaceholder')}>
                  <Option value="OpenAI">{t('models.providers.OpenAI')}</Option>
                  <Option value="Anthropic">{t('models.providers.Anthropic')}</Option>
                  <Option value="Google">{t('models.providers.Google')}</Option>
                  <Option value="Azure">{t('models.providers.Azure')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="modelType"
                label={t('models.form.modelType')}
                rules={[{ required: true, message: t('models.form.typeRequired') }]}
              >
                <Select placeholder={t('models.form.typePlaceholder')}>
                  <Option value="llm">{t('models.types.llm')}</Option>
                  <Option value="embedding">{t('models.types.embedding')}</Option>
                  <Option value="image">{t('models.types.image')}</Option>
                  <Option value="audio">{t('models.types.audio')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="version"
                label={t('models.form.version')}
                rules={[{ required: true, message: t('models.form.versionRequired') }]}
              >
                <Input placeholder={t('models.form.versionPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="apiEndpoint"
            label={t('models.form.apiEndpoint')}
            rules={[{ required: true, message: t('models.form.endpointRequired') }]}
          >
            <Input placeholder={t('models.form.endpointPlaceholder')} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maxTokens"
                label={t('models.form.maxTokens')}
                rules={[{ required: true, message: t('models.form.maxTokensRequired') }]}
              >
                <InputNumber
                  min={1}
                  max={128000}
                  style={{ width: '100%' }}
                  placeholder={t('models.form.maxTokensPlaceholder')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="temperature"
                label={t('models.form.temperature')}
                rules={[{ required: true, message: t('models.form.temperatureRequired') }]}
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
            label={t('models.form.description')}
            rules={[{ required: true, message: t('models.form.descriptionRequired') }]}
          >
            <TextArea 
              rows={3} 
              placeholder={t('models.form.descriptionPlaceholder')}
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
              <Descriptions.Item label={t('models.detail.name')} span={2}>
                {selectedModel.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.provider')}>
                <Tag 
                  color={providerMap[selectedModel.provider as keyof typeof providerMap]?.color}
                  icon={providerMap[selectedModel.provider as keyof typeof providerMap]?.icon}
                >
                  {selectedModel.provider}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.type')}>
                <Tag 
                  color={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.color}
                  icon={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.icon}
                >
                  {modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.version')}>
                {selectedModel.version}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.status')}>
                {getStatusTag(selectedModel.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.apiEndpoint')} span={2}>
                <Text code>{selectedModel.apiEndpoint}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.usageCount')}>
                {selectedModel.usageCount}{t('models.stats.requestUnit')}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.lastUsed')}>
                {selectedModel.lastUsed}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.createdBy')}>
                {selectedModel.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.createdAt')}>
                {selectedModel.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('models.detail.description')} span={2}>
                {selectedModel.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="parameters">
              <Tabs.TabPane tab={t('models.detail.parameters')} key="parameters">
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title={t('models.detail.parameters')} size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={t('models.detail.maxTokens')}>
                          {selectedModel.maxTokens}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.temperature')}>
                          {selectedModel.temperature}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.topP')}>
                          {selectedModel.topP}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.frequencyPenalty')}>
                          {selectedModel.frequencyPenalty}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.presencePenalty')}>
                          {selectedModel.presencePenalty}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={t('models.detail.limits')} size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={t('models.detail.requestsPerMinute')}>
                          {selectedModel.limits.requestsPerMinute}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.tokensPerMinute')}>
                          {selectedModel.limits.tokensPerMinute}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models.detail.dailyLimit')}>
                          {selectedModel.limits.dailyLimit}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={t('models.detail.capabilities')} key="capabilities">
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

              <Tabs.TabPane tab={t('models.detail.pricing')} key="pricing">
                <Card title={t('models.detail.pricingDetails')} size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label={t('models.detail.inputTokenPrice')}>
                      ${selectedModel.pricing.inputTokens} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label={t('models.detail.outputTokenPrice')}>
                      ${selectedModel.pricing.outputTokens} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label={t('models.detail.currency')}>
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
