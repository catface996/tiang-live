import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Tag,
  Modal,
  Form,
  Tabs,
  Descriptions,
  Tooltip,
  message,
  App,
  Pagination
} from 'antd';
import {
  SettingOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloudOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  MonitorOutlined,
  RobotOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import ModelFormModal from './components/ModelFormModal';
import ModelApi from '../../../services/modelApi';
import type { ModelResponse, ModelStatsResponse } from '../../../services/modelApi';
import '../../../styles/model-management.css';

const { Title, Paragraph, Text } = Typography;

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

const ModelManagement: React.FC = () => {
  const { t } = useTranslation(['models', 'common']);
  const { modal } = App.useApp();
  const isDark = useAppSelector(state => state.theme.isDark);
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelResponse | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelResponse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  
  // 真实数据状态
  const [modelData, setModelData] = useState<ModelResponse[]>([]);
  const [statsData, setStatsData] = useState<ModelStatsResponse | null>(null);
  const [pagination, setPagination] = useState(() => {
    // 从localStorage读取用户的分页偏好
    const savedPageSize = localStorage.getItem('model-management-page-size');
    return {
      page: 1,
      pageSize: savedPageSize ? parseInt(savedPageSize, 10) : 20,
      total: 0,
      totalPages: 0
    };
  });

  useEffect(() => {
    setPageTitle(t('models:title'));
    loadModelData();
    loadStatsData();
  }, [t]);

  // 加载模型数据
  const loadModelData = async () => {
    try {
      setLoading(true);
      const response = await ModelApi.getModelList({
        search: searchText || undefined,
        provider: filterProvider !== 'all' ? filterProvider : undefined,
        modelType: filterType !== 'all' ? filterType : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        page: pagination.page,
        pageSize: pagination.pageSize
      });
      
      setModelData(response.models);
      setPagination(response.pagination);
    } catch (error) {
      console.error('加载模型数据失败:', error);
      message.error(t('models:errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  // 加载统计数据
  const loadStatsData = async () => {
    try {
      const stats = await ModelApi.getModelStats();
      setStatsData(stats);
    } catch (error) {
      console.error('加载统计数据失败:', error);
      message.error(t('models:errors.statsFailed'));
    }
  };

  // 刷新数据
  const handleRefresh = async () => {
    await Promise.all([loadModelData(), loadStatsData()]);
  };

  // 搜索和筛选变化时重新加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }));
      loadModelData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchText, filterProvider, filterType, filterStatus]);

  const providerMap = {
    OpenAI: { color: 'green', icon: <ExperimentOutlined /> },
    Anthropic: { color: 'blue', icon: <RobotOutlined /> },
    Google: { color: 'red', icon: <CloudOutlined /> },
    Azure: { color: 'cyan', icon: <DatabaseOutlined /> }
  };

  const modelTypeMap = {
    llm: { name: t('models:types.llm'), color: 'blue', icon: <ExperimentOutlined /> },
    embedding: { name: t('models:types.embedding'), color: 'green', icon: <ApiOutlined /> },
    image: { name: t('models:types.image'), color: 'orange', icon: <MonitorOutlined /> },
    audio: { name: t('models:types.audio'), color: 'purple', icon: <ThunderboltOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('models:status.active') },
      inactive: { color: 'red', text: t('models:status.inactive') },
      testing: { color: 'orange', text: t('models:status.testing') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateModel = () => {
    setEditingModel(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditModel = async (model: ModelResponse) => {
    try {
      // 获取完整的模型详情
      const fullModel = await ModelApi.getModelDetail(model.id);
      setEditingModel(fullModel);
      
      // 设置表单值
      form.setFieldsValue({
        name: fullModel.name,
        provider: fullModel.provider,
        modelType: fullModel.modelType,
        version: fullModel.version,
        apiEndpoint: fullModel.apiEndpoint,
        apiKey: fullModel.apiKey,
        maxTokens: fullModel.maxTokens,
        temperature: fullModel.temperature,
        topP: fullModel.topP,
        frequencyPenalty: fullModel.frequencyPenalty,
        presencePenalty: fullModel.presencePenalty,
        status: fullModel.status,
        description: fullModel.description,
        capabilities: fullModel.capabilities,
        pricing: fullModel.pricing,
        limits: fullModel.limits
      });
      setModalVisible(true);
    } catch (error) {
      console.error('获取模型详情失败:', error);
      message.error(t('models:errors.loadDetailFailed'));
    }
  };

  const handleViewModel = async (model: ModelResponse) => {
    try {
      // 获取完整的模型详情
      const fullModel = await ModelApi.getModelDetail(model.id);
      setSelectedModel(fullModel);
      setDetailModalVisible(true);
    } catch (error) {
      console.error('获取模型详情失败:', error);
      message.error(t('models:errors.loadDetailFailed'));
    }
  };

  const handleDeleteModel = (modelId: string) => {
    console.log('删除模型被调用，模型ID:', modelId);
    modal.confirm({
      title: t('models:delete.confirmTitle'),
      content: t('models:delete.confirmContent'),
      okText: t('common:delete'),
      okType: 'danger',
      cancelText: t('common:cancel'),
      onOk: async () => {
        console.log('用户确认删除，开始调用API');
        try {
          console.log('调用 ModelApi.deleteModel，参数:', modelId);
          await ModelApi.deleteModel(modelId);
          console.log('删除API调用成功');
          message.success(t('models:alerts.deleteSuccess'));
          await loadModelData(); // 重新加载数据
        } catch (error: any) {
          console.error('删除模型失败:', error);
          message.error(`${t('models:alerts.deleteError')}: ${error.message}`);
        }
      },
      onCancel: () => {
        console.log('用户取消删除');
      }
    });
  };

  const handleTestModel = async (modelId: string) => {
    try {
      setLoading(true);
      const testResult = await ModelApi.testModel(modelId, {
        testType: 'connection',
        testPrompt: 'Hello, how are you?'
      });
      
      if (testResult.status === 'success') {
        message.success(t('models:alerts.testSuccess'));
      } else {
        message.error(t('models:alerts.testFailed'));
      }
    } catch (error: any) {
      message.error(`${t('models:alerts.testError')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const modelData = {
        ...values,
        id: editingModel?.id // 如果是编辑，则包含ID
      };
      
      const result = await ModelApi.saveModel(modelData);
      
      if (result.operation === 'create') {
        message.success(t('models:alerts.createSuccess'));
      } else {
        message.success(t('models:alerts.updateSuccess'));
      }
      
      setModalVisible(false);
      form.resetFields();
      await loadModelData(); // 重新加载数据
    } catch (error: any) {
      console.error('保存模型失败:', error);
      message.error(`${editingModel ? t('models:alerts.updateError') : t('models:alerts.createError')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 分页处理函数
  const handlePageChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || pagination.pageSize;
    
    setPagination(prev => ({
      ...prev,
      page: page,
      pageSize: newPageSize
    }));
    
    // 保存用户的分页偏好
    if (pageSize && pageSize !== pagination.pageSize) {
      localStorage.setItem('model-management-page-size', pageSize.toString());
    }
    
    // 重新加载数据
    loadModelData();
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPagination(prev => ({
      ...prev,
      page: 1,  // 改变页面大小时重置到第一页
      pageSize: size
    }));
    
    // 保存用户的分页偏好
    localStorage.setItem('model-management-page-size', size.toString());
    
    // 重新加载数据
    loadModelData();
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
                <div className="title-right">{getStatusTag(model.status)}</div>
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

            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 16, minHeight: 40 }}>
              {model.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title={t('models:stats.usageCount')}
                    value={model.usageCount}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t('models:stats.maxTokens')}
                    value={model.maxTokens}
                    valueStyle={{ fontSize: 14 }}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                {(model.capabilities || []).slice(0, 3).map(cap => (
                  <Tag key={cap} size="small">
                    {cap}
                  </Tag>
                ))}
                {(model.capabilities?.length || 0) > 3 && <Tag size="small">+{(model.capabilities?.length || 0) - 3}</Tag>}
              </Space>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}
              >
                <span>{t('models:stats.version')}:</span>
                <span>{model.version}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t('models:stats.lastUsed')}:</span>
                <span>{new Date(model.lastUsed).toLocaleDateString()}</span>
              </div>
            </div>

            {/* 操作按钮区域 - 单独一行，右对齐 */}
            <div className="card-actions">
              <Space>
                <Tooltip title={t('models:viewDetails')}>
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleViewModel(model);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('common:edit')}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleEditModel(model);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('models:test')}>
                  <Button
                    type="text"
                    icon={<ThunderboltOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleTestModel(model.id);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('common:delete')}>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteModel(model.id);
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

  // 计算统计数据
  const activeModels = statsData?.modelStats.activeModels || 0;
  const totalUsage = statsData?.usageStats.totalRequests || 0;
  const avgTemperature = modelData.length > 0 
    ? modelData.reduce((sum, model) => sum + (model.temperature || 0), 0) / modelData.length 
    : 0;

  return (
    <PageContainer className="model-management-page">
      <PageHeader>
        {/* Title和按钮在同一行 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title className="page-title" level={2} style={{ margin: 0 }}>
            <Space>
              <SettingOutlined />
              {t('models:title')}
            </Space>
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateModel}>
              {t('models:addModel')}
            </Button>
          </Space>
        </div>

        {/* Paragraph单独一行，充满宽度 */}
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>{t('models:subtitle')}</Paragraph>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="model-stats-primary">
            <Statistic
              title={t('models:stats.totalModels')}
              value={statsData?.modelStats.totalModels || modelData.length}
              suffix={t('models:stats.unit')}
              prefix={<ExperimentOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="model-stats-success">
            <Statistic
              title={t('models:stats.activeModels')}
              value={activeModels}
              suffix={t('models:stats.unit')}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="model-stats-warning">
            <Statistic title={t('models:stats.totalUsage')} value={totalUsage} prefix={<ThunderboltOutlined />} />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="model-stats-purple">
            <Statistic
              title={t('models:stats.avgTemperature')}
              value={avgTemperature.toFixed(1)}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('models:searchPlaceholder')}
        filters={[
          {
            key: 'provider',
            value: filterProvider,
            onChange: setFilterProvider,
            placeholder: t('models:filterByProvider'),
            width: 120,
            options: [
              { value: 'all', label: t('models:providers.all') },
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
            placeholder: t('models:filterByType'),
            width: 120,
            options: [
              { value: 'all', label: t('common:all') },
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
            placeholder: t('models:filterByStatus'),
            width: 100,
            options: [
              { value: 'all', label: t('common:all') },
              { value: 'active', label: t('models:status.active') },
              { value: 'inactive', label: t('models:status.inactive') },
              { value: 'testing', label: t('models:status.testing') }
            ]
          }
        ]}
        onRefresh={handleRefresh}
      />

      {/* 模型卡片列表 */}
      <Row gutter={[16, 16]}>{renderModelCards()}</Row>

      {/* 分页组件 */}
      {pagination.total > 0 && (
        <Row justify="center" style={{ marginTop: 32, marginBottom: 24 }}>
          <Col>
            <Pagination
              current={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 条，共 ${total} 个模型`
              }
              pageSizeOptions={['10', '20', '30', '50']}
              size="default"
              style={{
                padding: '16px 24px',
                background: isDark ? '#1f1f1f' : '#fff',
                borderRadius: '8px',
                border: `1px solid ${isDark ? '#303030' : '#d9d9d9'}`,
                boxShadow: isDark 
                  ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Col>
        </Row>
      )}

      {/* 创建/编辑模型模态框 */}
      <ModelFormModal
        visible={modalVisible}
        editingModel={editingModel}
        form={form}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      />

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
              <Descriptions.Item label={t('models:detail.name')} span={2}>
                {selectedModel.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.provider')}>
                <Tag
                  color={providerMap[selectedModel.provider as keyof typeof providerMap]?.color}
                  icon={providerMap[selectedModel.provider as keyof typeof providerMap]?.icon}
                >
                  {selectedModel.provider}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.type')}>
                <Tag
                  color={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.color}
                  icon={modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.icon}
                >
                  {modelTypeMap[selectedModel.modelType as keyof typeof modelTypeMap]?.name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.version')}>{selectedModel.version}</Descriptions.Item>
              <Descriptions.Item label={t('models:detail.status')}>
                {getStatusTag(selectedModel.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.apiEndpoint')} span={2}>
                <Text code>{selectedModel.apiEndpoint}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.usageCount')}>
                {selectedModel.usageCount}
                {t('models:stats.requestUnit')}
              </Descriptions.Item>
              <Descriptions.Item label={t('models:detail.lastUsed')}>{selectedModel.lastUsed}</Descriptions.Item>
              <Descriptions.Item label={t('models:detail.createdBy')}>{selectedModel.createdBy}</Descriptions.Item>
              <Descriptions.Item label={t('models:detail.createdAt')}>{selectedModel.createdAt}</Descriptions.Item>
              <Descriptions.Item label={t('models:detail.description')} span={2}>
                {selectedModel.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 详细配置 */}
            <Tabs defaultActiveKey="parameters">
              <Tabs.TabPane tab={t('models:detail.parameters')} key="parameters">
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title={t('models:detail.parameters')} size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={t('models:detail.maxTokens')}>
                          {selectedModel.maxTokens}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.temperature')}>
                          {selectedModel.temperature}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.topP')}>{selectedModel.topP}</Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.frequencyPenalty')}>
                          {selectedModel.frequencyPenalty}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.presencePenalty')}>
                          {selectedModel.presencePenalty}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title={t('models:detail.limits')} size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={t('models:detail.requestsPerMinute')}>
                          {selectedModel.limits?.requestsPerMinute || 0}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.tokensPerMinute')}>
                          {selectedModel.limits?.tokensPerMinute || 0}
                        </Descriptions.Item>
                        <Descriptions.Item label={t('models:detail.dailyLimit')}>
                          {selectedModel.limits?.dailyLimit || 0}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab={t('models:detail.capabilities')} key="capabilities">
                <Row gutter={16}>
                  {(selectedModel?.capabilities || []).map(capability => (
                    <Col xs={24} sm={12} lg={8} key={capability}>
                      <Card size="small" style={{ marginBottom: 16 }}>
                        <div style={{ textAlign: 'center' }}>
                          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24, marginBottom: 8 }} />
                          <div>{capability}</div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab={t('models:detail.pricing')} key="pricing">
                <Card title={t('models:detail.pricingDetails')} size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label={t('models:detail.inputTokenPrice')}>
                      ${selectedModel.pricing?.inputTokens || 0} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label={t('models:detail.outputTokenPrice')}>
                      ${selectedModel.pricing?.outputTokens || 0} / 1K tokens
                    </Descriptions.Item>
                    <Descriptions.Item label={t('models:detail.currency')}>
                      {selectedModel.pricing?.currency || 'USD'}
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
