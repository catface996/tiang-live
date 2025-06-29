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
  message
} from 'antd';
import { BulbOutlined, ApiOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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

  useEffect(() => {
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

  // 提示词模板数据
  const promptTemplates = [
    {
      id: 'customer-service-template',
      name: t('agents:form.promptTemplates.customerService.name'),
      description: t('agents:form.promptTemplates.customerService.description'),
      content: t('agents:form.promptTemplates.customerService.content'),
      variables: ['company_name', 'service_hours'],
      category: t('agents:form.promptTemplates.categories.dialogue')
    },
    {
      id: 'data-analysis-template',
      name: t('agents:form.promptTemplates.dataAnalysis.name'),
      description: t('agents:form.promptTemplates.dataAnalysis.description'),
      content: t('agents:form.promptTemplates.dataAnalysis.content'),
      variables: [],
      category: t('agents:form.promptTemplates.categories.analysis')
    },
    {
      id: 'code-review-template',
      name: t('agents:form.promptTemplates.codeReview.name'),
      description: t('agents:form.promptTemplates.codeReview.description'),
      content: t('agents:form.promptTemplates.codeReview.content'),
      variables: [],
      category: t('agents:form.promptTemplates.categories.development')
    },
    {
      id: 'monitoring-template',
      name: t('agents:form.promptTemplates.monitoring.name'),
      description: t('agents:form.promptTemplates.monitoring.description'),
      content: t('agents:form.promptTemplates.monitoring.content'),
      variables: [],
      category: t('agents:form.promptTemplates.categories.operations')
    }
  ];

  // 可用模型数据
  const availableModels = [
    {
      id: 'openai-gpt-4',
      provider: 'OpenAI',
      name: 'GPT-4',
      version: 'gpt-4-0613',
      description: t('agents:form.models.gpt4.description'),
      status: 'available',
      pricing: '$0.03/1K tokens'
    },
    {
      id: 'openai-gpt-3.5-turbo',
      provider: 'OpenAI',
      name: 'GPT-3.5 Turbo',
      version: 'gpt-3.5-turbo-0613',
      description: t('agents:form.models.gpt35.description'),
      status: 'available',
      pricing: '$0.002/1K tokens'
    },
    {
      id: 'anthropic-claude-3',
      provider: 'Anthropic',
      name: 'Claude 3',
      version: 'claude-3-opus-20240229',
      description: t('agents:form.models.claude3.description'),
      status: 'available',
      pricing: '$0.015/1K tokens'
    },
    {
      id: 'local-llama2',
      provider: t('agents:form.models.localDeployment'),
      name: 'Llama 2',
      version: 'llama2-7b-chat',
      description: t('agents:form.models.llama2.description'),
      status: 'available',
      pricing: t('agents:form.models.free')
    }
  ];

  // MCP Server数据
  const mcpServers = [
    {
      id: 'database-mcp',
      name: t('agents:form.mcpServers.database.name'),
      description: t('agents:form.mcpServers.database.description'),
      status: 'running',
      capabilities: ['mysql', 'postgresql', 'mongodb']
    },
    {
      id: 'email-mcp',
      name: t('agents:form.mcpServers.email.name'),
      description: t('agents:form.mcpServers.email.description'),
      status: 'running',
      capabilities: ['smtp', 'imap', 'templates']
    },
    {
      id: 'file-mcp',
      name: t('agents:form.mcpServers.file.name'),
      description: t('agents:form.mcpServers.file.description'),
      status: 'running',
      capabilities: ['read', 'write', 'search']
    },
    {
      id: 'api-mcp',
      name: t('agents:form.mcpServers.api.name'),
      description: t('agents:form.mcpServers.api.description'),
      status: 'running',
      capabilities: ['http', 'rest', 'graphql']
    },
    {
      id: 'scheduler-mcp',
      name: t('agents:form.mcpServers.scheduler.name'),
      description: t('agents:form.mcpServers.scheduler.description'),
      status: 'stopped',
      capabilities: ['cron', 'interval', 'webhook']
    }
  ];

  const handleSubmit = async (values: any) => {
    try {
      const formData: AIAgentFormData = {
        ...values,
        id: initialData?.id,
        model: {
          ...values.model,
          provider: selectedModel.split('-')[0],
          modelName: selectedModel.split('-')[1],
          version: availableModels.find(m => m.id === selectedModel)?.version || ''
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

  const handlePromptTemplateSelect = (templateId: string) => {
    setSelectedPromptTemplate(templateId);
    const template = promptTemplates.find(t => t.id === templateId);
    if (template) {
      const variables: { [key: string]: string } = {};
      template.variables.forEach(variable => {
        variables[variable] = promptVariables[variable] || '';
      });
      setPromptVariables(variables);
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
        <div>
          <Text strong>{t('agents:form.prompts.selectTemplate')}：</Text>
          <div style={{ marginTop: 12 }}>
            {promptTemplates.map(template => (
              <div
                key={template.id}
                className={`prompt-template-item ${selectedPromptTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handlePromptTemplateSelect(template.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <Text strong>{template.name}</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {template.category}
                    </Tag>
                    <Paragraph style={{ margin: '4px 0', color: '#666' }}>{template.description}</Paragraph>
                  </div>
                </div>
                {selectedPromptTemplate === template.id && template.variables.length > 0 && (
                  <div className="prompt-variables">
                    <Text strong>{t('agents:form.prompts.templateVariables')}：</Text>
                    {template.variables.map(variable => (
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
            ))}
          </div>
        </div>
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
      <Text strong>{t('agents:form.models.selectModel')}：</Text>
      <div style={{ marginTop: 12 }}>
        {availableModels.map(model => (
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
                <Tag color={model.status === 'available' ? 'green' : 'red'} style={{ marginLeft: 8 }}>
                  {model.status === 'available'
                    ? t('agents:form.models.available')
                    : t('agents:form.models.unavailable')}
                </Tag>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {t('agents:form.models.version')}: {model.version} | {t('agents:form.models.pricing')}: {model.pricing}
              </Text>
              <Paragraph style={{ margin: '4px 0 0 0', fontSize: 12, color: '#666' }}>{model.description}</Paragraph>
            </div>
          </div>
        ))}
      </div>
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
      <Text strong>{t('agents:form.mcpServers.selectServers')}：</Text>
      <Paragraph type="secondary" style={{ marginTop: 4 }}>
        {t('agents:form.mcpServers.description')}
      </Paragraph>
      <div style={{ marginTop: 12 }}>
        {mcpServers.map(server => (
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
                    {server.status === 'running'
                      ? t('agents:form.mcpServers.running')
                      : t('agents:form.mcpServers.stopped')}
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
              </div>
            </div>
          </Card>
        ))}
      </div>
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
