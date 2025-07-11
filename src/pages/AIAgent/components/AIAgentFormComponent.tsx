import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Switch,
  Slider,
  Tabs,
  Tag,
  Alert,
  Divider,
  Radio,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Typography,
  message,
  Spin,
  Pagination
} from 'antd';
import { BulbOutlined, ApiOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PromptTemplateApi, type PromptTemplateResponse } from '../../../services/promptTemplateApi';
import { ModelApi, type ModelResponse } from '../../../services/modelApi';
import { mcpApi, type McpServer } from '../../../services/mcpApi';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const FormCard = styled(Card)`
  margin-bottom: 24px;

  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
  }

  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

const PromptEditor = styled.div`
  .prompt-template-item {
    padding: 12px;
    border: 1px solid var(--border-base, #d9d9d9);
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    background-color: var(--bg-container, #ffffff);
    color: var(--text-primary, rgba(0, 0, 0, 0.88));

    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
      background-color: var(--bg-hover, #f5f5f5);
    }

    &.selected {
      border-color: #1890ff;
      background-color: rgba(24, 144, 255, 0.08);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      /* 暗色主题下的特殊处理 */
      .theme-dark & {
        background-color: rgba(24, 144, 255, 0.15);
        color: var(--text-primary, rgba(255, 255, 255, 0.88));
      }
    }
  }

  .prompt-variables {
    background: #fafafa;
    padding: 12px;
    border-radius: 6px;
    margin-top: 12px;
  }
`;

const ModelSelector = styled.div`
  .model-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid var(--border-base, #d9d9d9);
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    background-color: var(--bg-container, #ffffff);
    color: var(--text-primary, rgba(0, 0, 0, 0.88));

    &:hover {
      border-color: #1890ff;
      background-color: var(--bg-hover, #f5f5f5);
    }

    &.selected {
      border-color: #1890ff;
      background-color: rgba(24, 144, 255, 0.08);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      /* 暗色主题下的特殊处理 */
      .theme-dark & {
        background-color: rgba(24, 144, 255, 0.15);
        color: var(--text-primary, rgba(255, 255, 255, 0.88));
      }
    }
  }

  .model-info {
    flex: 1;
  }

  .model-status {
    margin-left: 12px;
  }
`;

interface AIAgentFormData {
  id?: string;
  name: string;
  description: string;
  type: 'chat' | 'task' | 'analysis' | 'monitoring';
  status: 'active' | 'inactive' | 'training';
  model: {
    provider: string;
    modelName: string;
    version: string;
    config: {
      temperature: number;
      maxTokens: number;
      topP: number;
      frequencyPenalty: number;
      presencePenalty: number;
    };
  };
  prompts: {
    system: string;
    templates: string[];
    variables: { [key: string]: string };
  };
  mcpServers: string[];
  capabilities: string[];
  settings: {
    autoStart: boolean;
    maxConcurrency: number;
    timeout: number;
    retryCount: number;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  tags: string[];
}

interface AIAgentFormComponentProps {
  initialData?: AIAgentFormData;
  onSubmit: (data: AIAgentFormData) => Promise<void>;
  loading?: boolean;
}

const AIAgentFormComponent: React.FC<AIAgentFormComponentProps> = ({ initialData, onSubmit, loading = false }) => {
  const { t } = useTranslation(['agents', 'common']);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedPromptType, setSelectedPromptType] = useState<'template' | 'custom'>('template');
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedMcpServers, setSelectedMcpServers] = useState<string[]>([]);
  const [promptVariables, setPromptVariables] = useState<{ [key: string]: string }>({});
  
  // 提示词模板相关状态
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplateResponse[]>([]);
  const [promptTemplatesLoading, setPromptTemplatesLoading] = useState(false);
  const [templatePagination, setTemplatePagination] = useState({
    current: 1,
    pageSize: 5, // 每页显示5个模板
    total: 0
  });
  const [templateSearchText, setTemplateSearchText] = useState('');
  
  // 模型相关状态
  const [availableModels, setAvailableModels] = useState<ModelResponse[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelPagination, setModelPagination] = useState({
    current: 1,
    pageSize: 5, // 每页显示5个模型
    total: 0
  });
  const [modelSearchText, setModelSearchText] = useState('');
  
  // MCP服务器相关状态
  const [mcpServers, setMcpServers] = useState<McpServer[]>([]);
  const [mcpServersLoading, setMcpServersLoading] = useState(false);
  const [mcpPagination, setMcpPagination] = useState({
    current: 1,
    pageSize: 5, // 每页显示5个MCP服务器
    total: 0
  });
  const [mcpSearchText, setMcpSearchText] = useState('');

  // 加载MCP服务器列表
  const loadMcpServers = async (page: number = 1, pageSize: number = 5, searchText: string = '') => {
    setMcpServersLoading(true);
    try {
      const response = await mcpApi.getServers({
        search: searchText || undefined,
        // 移除status过滤，查询所有MCP服务器供选择
        page: page,
        size: pageSize
      });

      if (response.success && response.data && response.data.data) {
        setMcpServers(response.data.data);
        setMcpPagination({
          current: page,
          pageSize: pageSize,
          total: typeof response.data.total === 'string' ? parseInt(response.data.total) : response.data.total
        });
        console.log('✅ 成功加载MCP服务器列表:', response.data.data.length, '个服务器，总计:', response.data.total);
      } else {
        console.warn('⚠️ 加载MCP服务器列表失败:', response.message);
        message.warning('加载MCP服务器列表失败: ' + response.message);
        setMcpServers([]);
        setMcpPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('❌ 加载MCP服务器列表异常:', error);
      message.error('加载MCP服务器列表失败: ' + (error instanceof Error ? error.message : '未知错误'));
      setMcpServers([]);
      setMcpPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setMcpServersLoading(false);
    }
  };

  // 处理MCP服务器分页变化
  const handleMcpPaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || mcpPagination.pageSize;
    loadMcpServers(page, newPageSize, mcpSearchText);
  };

  // 处理MCP服务器搜索
  const handleMcpSearch = (searchText: string) => {
    setMcpSearchText(searchText);
    // 搜索时重置到第一页
    loadMcpServers(1, mcpPagination.pageSize, searchText);
  };

  // 加载模型列表
  const loadModels = async (page: number = 1, pageSize: number = 5, searchText: string = '') => {
    setModelsLoading(true);
    try {
      const response = await ModelApi.getModelList({
        search: searchText || undefined,
        status: 'active', // 只获取激活状态的模型
        page: page,
        pageSize: pageSize
      });

      if (response && response.models) {
        setAvailableModels(response.models);
        setModelPagination({
          current: page,
          pageSize: pageSize,
          total: response.pagination.total || 0
        });
        console.log('✅ 成功加载模型列表:', response.models.length, '个模型，总计:', response.pagination.total);
      } else {
        console.warn('⚠️ 加载模型列表失败: 响应数据格式异常');
        message.warning('加载模型列表失败: 响应数据格式异常');
        setAvailableModels([]);
        setModelPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('❌ 加载模型列表异常:', error);
      message.error('加载模型列表失败: ' + (error instanceof Error ? error.message : '未知错误'));
      setAvailableModels([]);
      setModelPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setModelsLoading(false);
    }
  };

  // 处理模型分页变化
  const handleModelPaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || modelPagination.pageSize;
    loadModels(page, newPageSize, modelSearchText);
  };

  // 处理模型搜索
  const handleModelSearch = (searchText: string) => {
    setModelSearchText(searchText);
    // 搜索时重置到第一页
    loadModels(1, modelPagination.pageSize, searchText);
  };

  // 加载提示词模板列表
  const loadPromptTemplates = async (page: number = 1, pageSize: number = 5, searchText: string = '') => {
    setPromptTemplatesLoading(true);
    try {
      const response = await PromptTemplateApi.listTemplates({
        status: 'ACTIVE', // 只获取激活状态的模板
        name: searchText || undefined, // 如果有搜索文本，则按名称搜索
        page: page,
        size: pageSize
      });

      if (response.success && response.data && response.data.data) {
        // API返回的数据结构是 response.data.data，不是 response.data.content
        setPromptTemplates(response.data.data);
        setTemplatePagination({
          current: page,
          pageSize: pageSize,
          total: parseInt(response.data.total) || 0
        });
        console.log('✅ 成功加载提示词模板:', response.data.data.length, '个模板，总计:', response.data.total);
      } else {
        console.warn('⚠️ 加载提示词模板失败:', response.message);
        message.warning('加载提示词模板失败: ' + response.message);
        setPromptTemplates([]);
        setTemplatePagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('❌ 加载提示词模板异常:', error);
      message.error('加载提示词模板失败: ' + (error instanceof Error ? error.message : '未知错误'));
      setPromptTemplates([]);
      setTemplatePagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setPromptTemplatesLoading(false);
    }
  };

  useEffect(() => {
    // 加载提示词模板
    loadPromptTemplates();
    // 加载模型列表
    loadModels();
    // 加载MCP服务器列表
    loadMcpServers();
    
    if (initialData) {
      form.setFieldsValue(initialData);
      setSelectedModel(`${initialData.model.provider}-${initialData.model.modelName}`);
      setSelectedMcpServers(initialData.mcpServers);
      setCustomPrompt(initialData.prompts.system);
      setPromptVariables(initialData.prompts.variables);
      if (initialData.prompts.templates.length > 0) {
        setSelectedPromptType('template');
        setSelectedPromptTemplate(initialData.prompts.templates[0]);
      } else {
        setSelectedPromptType('custom');
      }
    }
  }, [initialData, form]);

  const handleSubmit = async (values: any) => {
    try {
      const selectedModelData = availableModels.find(m => m.id === selectedModel);
      const formData: AIAgentFormData = {
        ...values,
        id: initialData?.id,
        model: {
          ...values.model,
          provider: selectedModelData?.provider || '',
          modelName: selectedModelData?.name || '',
          version: selectedModelData?.version || ''
        },
        prompts: {
          system:
            selectedPromptType === 'template'
              ? promptTemplates.find(t => t.id === selectedPromptTemplate)?.content || ''
              : customPrompt,
          templates: selectedPromptType === 'template' ? [selectedPromptTemplate] : [],
          variables: promptVariables
        },
        mcpServers: selectedMcpServers
      };

      await onSubmit(formData);
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  // 处理模板分页变化
  const handleTemplatePaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || templatePagination.pageSize;
    loadPromptTemplates(page, newPageSize, templateSearchText);
  };

  // 处理模板搜索
  const handleTemplateSearch = (searchText: string) => {
    setTemplateSearchText(searchText);
    // 搜索时重置到第一页
    loadPromptTemplates(1, templatePagination.pageSize, searchText);
  };

  const handlePromptTemplateSelect = (templateId: string) => {
    setSelectedPromptTemplate(templateId);
    const template = promptTemplates.find(t => t.id === templateId);
    if (template) {
      // API返回的variables可能是对象格式或null，需要安全处理
      const templateVariables = template.variables || {};
      const variables: { [key: string]: string } = {};
      
      // 从模板变量对象中提取变量名，并设置默认值
      if (templateVariables && typeof templateVariables === 'object') {
        Object.keys(templateVariables).forEach(variable => {
          const variableConfig = templateVariables[variable];
          // 如果变量配置是对象，使用其默认值；否则使用空字符串
          const defaultValue = typeof variableConfig === 'object' && variableConfig.default 
            ? variableConfig.default 
            : '';
          variables[variable] = promptVariables[variable] || defaultValue || '';
        });
      }
      
      setPromptVariables(variables);
      console.log('🔧 选择模板:', template.name, '变量:', variables);
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    setPromptVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const renderPromptEditor = () => (
    <PromptEditor>
      <Radio.Group
        value={selectedPromptType}
        onChange={e => setSelectedPromptType(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <Radio value="template">{t('agents:form.prompts.useTemplate')}</Radio>
        <Radio value="custom">{t('agents:form.prompts.customPrompt')}</Radio>
      </Radio.Group>

      {selectedPromptType === 'template' ? (
        <Spin spinning={promptTemplatesLoading}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text strong>{t('agents:form.prompts.selectTemplate')}：</Text>
              <Input.Search
                placeholder="搜索模板名称..."
                value={templateSearchText}
                onChange={e => setTemplateSearchText(e.target.value)}
                onSearch={handleTemplateSearch}
                style={{ width: 200 }}
                size="small"
                allowClear
              />
            </div>
            <div style={{ marginTop: 12 }}>
              {promptTemplates.length === 0 && !promptTemplatesLoading ? (
                <Alert
                  message={templateSearchText ? "未找到匹配的提示词模板" : "暂无可用的提示词模板"}
                  description={templateSearchText ? "请尝试其他搜索关键词，或选择自定义提示词。" : "请联系管理员添加提示词模板，或选择自定义提示词。"}
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              ) : (
                promptTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`prompt-template-item ${selectedPromptTemplate === template.id ? 'selected' : ''}`}
                    onClick={() => handlePromptTemplateSelect(template.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <Text strong>{template.name}</Text>
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                          {template.categoryName || template.category}
                        </Tag>
                        <Paragraph style={{ margin: '4px 0', color: '#666' }}>{template.description}</Paragraph>
                      </div>
                    </div>
                    {selectedPromptTemplate === template.id && template.variables && Object.keys(template.variables).length > 0 && (
                      <div className="prompt-variables">
                        <Text strong>{t('agents:form.prompts.templateVariables')}：</Text>
                        {Object.keys(template.variables).map(variable => (
                          <div key={variable} style={{ marginTop: 8 }}>
                            <Text>{variable}:</Text>
                            <Input
                              placeholder={t('agents:form.prompts.enterVariableValue', { variable })}
                              value={promptVariables[variable] || ''}
                              onChange={e => handleVariableChange(variable, e.target.value)}
                              style={{ marginTop: 4 }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* 分页组件 */}
            {templatePagination.total > 0 && (
              <div style={{ 
                marginTop: 16, 
                padding: '12px 16px',
                background: 'var(--bg-container, #ffffff)',
                borderRadius: '6px',
                border: '1px solid var(--border-base, #d9d9d9)',
                textAlign: 'center'
              }}>
                <Pagination
                  current={templatePagination.current}
                  pageSize={templatePagination.pageSize}
                  total={templatePagination.total}
                  onChange={handleTemplatePaginationChange}
                  onShowSizeChange={handleTemplatePaginationChange}
                  showSizeChanger
                  showQuickJumper={templatePagination.total > 50}
                  showTotal={(total, range) => 
                    `第 ${range[0]}-${range[1]} 个，共 ${total} 个模板`
                  }
                  pageSizeOptions={['5', '10', '15', '20']}
                  size="small"
                  disabled={promptTemplatesLoading}
                />
              </div>
            )}
          </div>
        </Spin>
      ) : (
        <div>
          <Text strong>{t('agents:form.prompts.customPrompt')}：</Text>
          <TextArea
            rows={8}
            placeholder={t('agents:form.prompts.customPromptPlaceholder')}
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            style={{ marginTop: 8 }}
          />
          <Alert
            message={t('agents:form.prompts.tip')}
            description={t('agents:form.prompts.customPromptTip')}
            type="info"
            showIcon
            style={{ marginTop: 12 }}
          />
        </div>
      )}
    </PromptEditor>
  );

  const renderModelSelector = () => (
    <ModelSelector>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text strong>{t('agents:form.models.selectModel')}：</Text>
        <Input.Search
          placeholder="搜索模型名称..."
          value={modelSearchText}
          onChange={e => setModelSearchText(e.target.value)}
          onSearch={handleModelSearch}
          style={{ width: 200 }}
          size="small"
          allowClear
        />
      </div>
      
      <Spin spinning={modelsLoading}>
        <div style={{ marginTop: 12 }}>
          {availableModels.length === 0 && !modelsLoading ? (
            <Alert
              message={modelSearchText ? "未找到匹配的模型" : "暂无可用的模型"}
              description={modelSearchText ? "请尝试其他搜索关键词。" : "请联系管理员添加模型配置。"}
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          ) : (
            availableModels.map(model => (
              <div
                key={model.id}
                className={`model-item ${selectedModel === model.id ? 'selected' : ''}`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="model-info">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <Text strong>
                      {model.provider} - {model.name}
                    </Text>
                    <Tag color={model.status === 'active' ? 'green' : 'red'} style={{ marginLeft: 8 }}>
                      {model.status === 'active' ? '可用' : '不可用'}
                    </Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    版本: {model.version} | 类型: {model.modelType}
                  </Text>
                  <Paragraph style={{ margin: '4px 0 0 0', fontSize: 12, color: '#666' }}>
                    {model.description}
                  </Paragraph>
                  {model.pricing && (
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      定价: 输入 ${model.pricing.inputTokens}/1K tokens, 输出 ${model.pricing.outputTokens}/1K tokens
                    </Text>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* 分页组件 */}
        {modelPagination.total > 0 && (
          <div style={{ 
            marginTop: 16, 
            padding: '12px 16px',
            background: 'var(--bg-container, #ffffff)',
            borderRadius: '6px',
            border: '1px solid var(--border-base, #d9d9d9)',
            textAlign: 'center'
          }}>
            <Pagination
              current={modelPagination.current}
              pageSize={modelPagination.pageSize}
              total={modelPagination.total}
              onChange={handleModelPaginationChange}
              onShowSizeChange={handleModelPaginationChange}
              showSizeChanger
              showQuickJumper={modelPagination.total > 50}
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 个，共 ${total} 个模型`
              }
              pageSizeOptions={['5', '10', '15', '20']}
              size="small"
              disabled={modelsLoading}
            />
          </div>
        )}
      </Spin>
    </ModelSelector>
  );

  const handleMcpServerToggle = (serverId: string) => {
    if (selectedMcpServers.includes(serverId)) {
      setSelectedMcpServers(prev => prev.filter(id => id !== serverId));
    } else {
      setSelectedMcpServers(prev => [...prev, serverId]);
    }
  };

  const renderMcpServerSelector = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text strong>{t('agents:form.mcpServers.selectServers')}：</Text>
        <Input.Search
          placeholder="搜索MCP服务器..."
          value={mcpSearchText}
          onChange={e => setMcpSearchText(e.target.value)}
          onSearch={handleMcpSearch}
          style={{ width: 200 }}
          size="small"
          allowClear
        />
      </div>
      <Paragraph type="secondary" style={{ marginTop: 4 }}>
        {t('agents:form.mcpServers.description')}
      </Paragraph>
      
      <Spin spinning={mcpServersLoading}>
        <div style={{ marginTop: 12 }}>
          {mcpServers.length === 0 && !mcpServersLoading ? (
            <Alert
              message={mcpSearchText ? "未找到匹配的MCP服务器" : "暂无可用的MCP服务器"}
              description={mcpSearchText ? "请尝试其他搜索关键词。" : "请联系管理员添加MCP服务器配置。"}
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          ) : (
            mcpServers.map(server => (
              <Card 
                key={server.id} 
                size="small" 
                style={{ 
                  marginBottom: 8,
                  cursor: 'pointer',
                }} 
                bodyStyle={{ padding: 12 }}
                onClick={() => handleMcpServerToggle(server.id)}
                className={`mcp-server-item ${selectedMcpServers.includes(server.id) ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      <Checkbox
                        checked={selectedMcpServers.includes(server.id)}
                        onChange={(e) => {
                          // 阻止事件冒泡，因为我们已经在Card的onClick中处理了
                          e.stopPropagation();
                          handleMcpServerToggle(server.id);
                        }}
                        onClick={(e) => {
                          // 阻止点击复选框时触发Card的onClick
                          e.stopPropagation();
                        }}
                      >
                        <Text strong>{server.name}</Text>
                      </Checkbox>
                      <Tag color={server.status === 'running' ? 'green' : 'red'} style={{ marginLeft: 8 }}>
                        {server.status === 'running' ? '运行中' : '已停止'}
                      </Tag>
                      <Tag color="blue" style={{ marginLeft: 4 }}>
                        {server.type}
                      </Tag>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {server.description}
                    </Text>
                    <div style={{ marginTop: 4 }}>
                      {server.capabilities.map(capability => (
                        <Tag key={capability} size="small" style={{ marginRight: 4 }}>
                          {capability}
                        </Tag>
                      ))}
                    </div>
                    <Text type="secondary" style={{ fontSize: 11, marginTop: 4 }}>
                      端点: {server.endpoint}:{server.port} | 版本: {server.version}
                    </Text>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        {/* 分页组件 */}
        {mcpPagination.total > 0 && (
          <div style={{ 
            marginTop: 16, 
            padding: '12px 16px',
            background: 'var(--bg-container, #ffffff)',
            borderRadius: '6px',
            border: '1px solid var(--border-base, #d9d9d9)',
            textAlign: 'center'
          }}>
            <Pagination
              current={mcpPagination.current}
              pageSize={mcpPagination.pageSize}
              total={mcpPagination.total}
              onChange={handleMcpPaginationChange}
              onShowSizeChange={handleMcpPaginationChange}
              showSizeChanger
              showQuickJumper={mcpPagination.total > 50}
              showTotal={(total, range) => 
                `第 ${range[0]}-${range[1]} 个，共 ${total} 个MCP服务器`
              }
              pageSizeOptions={['5', '10', '15', '20']}
              size="small"
              disabled={mcpServersLoading}
            />
          </div>
        )}
      </Spin>
    </div>
  );

  const tabItems = [
    {
      key: 'basic',
      label: t('agents:form.tabs.basic'),
      icon: <SettingOutlined />,
      children: (
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={t('agents:form.fields.name')}
              rules={[{ required: true, message: t('agents:form.validation.nameRequired') }]}
            >
              <Input placeholder={t('agents:form.placeholders.name')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label={t('agents:form.fields.description')}
              rules={[{ required: true, message: t('agents:form.validation.descriptionRequired') }]}
            >
              <TextArea rows={3} placeholder={t('agents:form.placeholders.description')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label={t('agents:form.fields.type')}
              rules={[{ required: true, message: t('agents:form.validation.typeRequired') }]}
            >
              <Select placeholder={t('agents:form.placeholders.type')}>
                <Option value="chat">{t('agents:form.types.chat')}</Option>
                <Option value="task">{t('agents:form.types.task')}</Option>
                <Option value="analysis">{t('agents:form.types.analysis')}</Option>
                <Option value="monitoring">{t('agents:form.types.monitoring')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label={t('agents:form.fields.status')}
              rules={[{ required: true, message: t('agents:form.validation.statusRequired') }]}
            >
              <Select placeholder={t('agents:form.placeholders.status')}>
                <Option value="active">{t('agents:form.status.active')}</Option>
                <Option value="inactive">{t('agents:form.status.inactive')}</Option>
                <Option value="training">{t('agents:form.status.training')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="tags" label={t('agents:form.fields.tags')}>
              <Select mode="tags" placeholder={t('agents:form.placeholders.tags')} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      )
    },
    {
      key: 'prompts',
      label: t('agents:form.tabs.prompts'),
      icon: <BulbOutlined />,
      children: renderPromptEditor()
    },
    {
      key: 'model',
      label: t('agents:form.tabs.model'),
      icon: <ApiOutlined />,
      children: (
        <div>
          {renderModelSelector()}
          <Divider />
          <Text strong>{t('agents:form.models.parameterConfig')}：</Text>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'temperature']}
                label="Temperature"
                tooltip={t('agents:form.models.temperatureTooltip')}
              >
                <Slider min={0} max={2} step={0.1} marks={{ 0: '0', 1: '1', 2: '2' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'maxTokens']}
                label="Max Tokens"
                tooltip={t('agents:form.models.maxTokensTooltip')}
              >
                <InputNumber min={1} max={4096} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['model', 'config', 'topP']} label="Top P" tooltip={t('agents:form.models.topPTooltip')}>
                <Slider min={0} max={1} step={0.1} marks={{ 0: '0', 0.5: '0.5', 1: '1' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'frequencyPenalty']}
                label="Frequency Penalty"
                tooltip={t('agents:form.models.frequencyPenaltyTooltip')}
              >
                <Slider min={-2} max={2} step={0.1} marks={{ '-2': '-2', 0: '0', 2: '2' }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      )
    },
    {
      key: 'mcp',
      label: t('agents:form.tabs.mcpServer'),
      icon: <ThunderboltOutlined />,
      children: renderMcpServerSelector()
    },
    {
      key: 'settings',
      label: t('agents:form.tabs.settings'),
      icon: <SettingOutlined />,
      children: (
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={['settings', 'autoStart']}
              label={t('agents:form.settings.autoStart')}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['settings', 'maxConcurrency']} label={t('agents:form.settings.maxConcurrency')}>
              <InputNumber min={1} max={100} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['settings', 'timeout']} label={t('agents:form.settings.timeout')}>
              <InputNumber min={5} max={300} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['settings', 'retryCount']} label={t('agents:form.settings.retryCount')}>
              <InputNumber min={0} max={10} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name={['settings', 'logLevel']} label={t('agents:form.settings.logLevel')}>
              <Select>
                <Option value="debug">Debug</Option>
                <Option value="info">Info</Option>
                <Option value="warn">Warn</Option>
                <Option value="error">Error</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <Form
      id="ai-agent-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        type: 'chat',
        status: 'active',
        model: {
          config: {
            temperature: 0.7,
            maxTokens: 2048,
            topP: 1.0,
            frequencyPenalty: 0.0,
            presencePenalty: 0.0
          }
        },
        settings: {
          autoStart: true,
          maxConcurrency: 10,
          timeout: 30,
          retryCount: 3,
          logLevel: 'info'
        }
      }}
    >
      <FormCard>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </FormCard>
    </Form>
  );
};

export default AIAgentFormComponent;
