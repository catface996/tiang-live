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
import { 
  BulbOutlined,
  ApiOutlined,
  SettingOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
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
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
    }
    
    &.selected {
      border-color: #1890ff;
      background-color: #f6ffed;
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
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: #1890ff;
    }
    
    &.selected {
      border-color: #1890ff;
      background-color: #f6ffed;
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

const AIAgentFormComponent: React.FC<AIAgentFormComponentProps> = ({
  initialData,
  onSubmit,
  loading = false
}) => {
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
      name: '客服助手模板',
      description: '专业的客服对话模板，包含问候、问题解答、转接等场景',
      content: '你是{{company_name}}的专业客服助手。工作时间：{{service_hours}}。请友好、准确地回答用户问题，如无法解决请及时转接人工客服。',
      variables: ['company_name', 'service_hours'],
      category: '对话'
    },
    {
      id: 'data-analysis-template',
      name: '数据分析模板',
      description: '数据分析和报告生成模板，支持多种数据格式',
      content: '你是一个专业的数据分析师。请分析提供的数据，生成清晰的分析报告，包含关键指标、趋势分析和建议。',
      variables: [],
      category: '分析'
    },
    {
      id: 'code-review-template',
      name: '代码审查模板',
      description: '代码质量审查和建议模板',
      content: '你是一个资深的代码审查专家。请仔细审查代码，关注代码质量、安全性、性能和最佳实践，提供具体的改进建议。',
      variables: [],
      category: '开发'
    },
    {
      id: 'monitoring-template',
      name: '系统监控模板',
      description: '系统监控和告警处理模板',
      content: '你是一个系统监控专家。请分析系统指标和告警信息，判断问题严重程度，提供处理建议和预防措施。',
      variables: [],
      category: '运维'
    }
  ];

  // 可用模型数据
  const availableModels = [
    {
      id: 'openai-gpt-4',
      provider: 'OpenAI',
      name: 'GPT-4',
      version: 'gpt-4-0613',
      description: '最先进的大语言模型，适合复杂任务',
      status: 'available',
      pricing: '$0.03/1K tokens'
    },
    {
      id: 'openai-gpt-3.5-turbo',
      provider: 'OpenAI',
      name: 'GPT-3.5 Turbo',
      version: 'gpt-3.5-turbo-0613',
      description: '高性价比的对话模型，响应速度快',
      status: 'available',
      pricing: '$0.002/1K tokens'
    },
    {
      id: 'anthropic-claude-3',
      provider: 'Anthropic',
      name: 'Claude 3',
      version: 'claude-3-opus-20240229',
      description: '强大的推理能力，适合分析任务',
      status: 'available',
      pricing: '$0.015/1K tokens'
    },
    {
      id: 'local-llama2',
      provider: '本地部署',
      name: 'Llama 2',
      version: 'llama2-7b-chat',
      description: '开源模型，本地部署，数据安全',
      status: 'available',
      pricing: '免费'
    }
  ];

  // MCP Server数据
  const mcpServers = [
    {
      id: 'database-mcp',
      name: '数据库连接器',
      description: '连接和查询各种数据库',
      status: 'running',
      capabilities: ['mysql', 'postgresql', 'mongodb']
    },
    {
      id: 'email-mcp',
      name: '邮件服务',
      description: '发送和接收邮件',
      status: 'running',
      capabilities: ['smtp', 'imap', 'templates']
    },
    {
      id: 'file-mcp',
      name: '文件操作',
      description: '文件读写和管理',
      status: 'running',
      capabilities: ['read', 'write', 'search']
    },
    {
      id: 'api-mcp',
      name: 'API调用器',
      description: '调用外部API服务',
      status: 'running',
      capabilities: ['http', 'rest', 'graphql']
    },
    {
      id: 'scheduler-mcp',
      name: '任务调度器',
      description: '定时任务和调度管理',
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
          system: selectedPromptType === 'template' ? 
            promptTemplates.find(t => t.id === selectedPromptTemplate)?.content || '' : 
            customPrompt,
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
        onChange={(e) => setSelectedPromptType(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <Radio value="template">使用提示词模板</Radio>
        <Radio value="custom">自定义提示词</Radio>
      </Radio.Group>

      {selectedPromptType === 'template' ? (
        <div>
          <Text strong>选择提示词模板：</Text>
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
                    <Tag color="blue" style={{ marginLeft: 8 }}>{template.category}</Tag>
                    <Paragraph style={{ margin: '4px 0', color: '#666' }}>
                      {template.description}
                    </Paragraph>
                  </div>
                </div>
                {selectedPromptTemplate === template.id && template.variables.length > 0 && (
                  <div className="prompt-variables">
                    <Text strong>模板变量：</Text>
                    {template.variables.map(variable => (
                      <div key={variable} style={{ marginTop: 8 }}>
                        <Text>{variable}:</Text>
                        <Input
                          placeholder={`请输入${variable}的值`}
                          value={promptVariables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
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
          <Text strong>自定义提示词：</Text>
          <TextArea
            rows={8}
            placeholder="请输入自定义的系统提示词..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            style={{ marginTop: 8 }}
          />
          <Alert
            message="提示"
            description="自定义提示词将作为AI智能体的系统指令，请确保内容准确、清晰。"
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
      <Text strong>选择AI模型：</Text>
      <div style={{ marginTop: 12 }}>
        {availableModels.map(model => (
          <div
            key={model.id}
            className={`model-item ${selectedModel === model.id ? 'selected' : ''}`}
            onClick={() => setSelectedModel(model.id)}
          >
            <div className="model-info">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <Text strong>{model.provider} - {model.name}</Text>
                <Tag color={model.status === 'available' ? 'green' : 'red'} style={{ marginLeft: 8 }}>
                  {model.status === 'available' ? '可用' : '不可用'}
                </Tag>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                版本: {model.version} | 定价: {model.pricing}
              </Text>
              <Paragraph style={{ margin: '4px 0 0 0', fontSize: 12, color: '#666' }}>
                {model.description}
              </Paragraph>
            </div>
          </div>
        ))}
      </div>
    </ModelSelector>
  );

  const renderMcpServerSelector = () => (
    <div>
      <Text strong>选择MCP Server：</Text>
      <Paragraph type="secondary" style={{ marginTop: 4 }}>
        MCP Server提供额外的工具和能力，如数据库访问、文件操作等。
      </Paragraph>
      <div style={{ marginTop: 12 }}>
        {mcpServers.map(server => (
          <Card
            key={server.id}
            size="small"
            style={{ marginBottom: 8 }}
            bodyStyle={{ padding: 12 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <Checkbox
                    checked={selectedMcpServers.includes(server.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMcpServers(prev => [...prev, server.id]);
                      } else {
                        setSelectedMcpServers(prev => prev.filter(id => id !== server.id));
                      }
                    }}
                  >
                    <Text strong>{server.name}</Text>
                  </Checkbox>
                  <Tag color={server.status === 'running' ? 'green' : 'red'} style={{ marginLeft: 8 }}>
                    {server.status === 'running' ? '运行中' : '已停止'}
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
      label: '基本信息',
      icon: <SettingOutlined />,
      children: (
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="智能体名称"
              rules={[{ required: true, message: '请输入智能体名称' }]}
            >
              <Input placeholder="请输入智能体名称" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="描述"
              rules={[{ required: true, message: '请输入描述' }]}
            >
              <TextArea rows={3} placeholder="请输入智能体的功能描述" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="智能体类型"
              rules={[{ required: true, message: '请选择智能体类型' }]}
            >
              <Select placeholder="请选择类型">
                <Option value="chat">对话助手</Option>
                <Option value="task">任务执行</Option>
                <Option value="analysis">数据分析</Option>
                <Option value="monitoring">系统监控</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="active">激活</Option>
                <Option value="inactive">未激活</Option>
                <Option value="training">训练中</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="tags"
              label="标签"
            >
              <Select
                mode="tags"
                placeholder="请输入标签，按回车添加"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      )
    },
    {
      key: 'prompts',
      label: '提示词配置',
      icon: <BulbOutlined />,
      children: renderPromptEditor()
    },
    {
      key: 'model',
      label: '模型选择',
      icon: <ApiOutlined />,
      children: (
        <div>
          {renderModelSelector()}
          <Divider />
          <Text strong>模型参数配置：</Text>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'temperature']}
                label="Temperature"
                tooltip="控制输出的随机性，值越高越随机"
              >
                <Slider
                  min={0}
                  max={2}
                  step={0.1}
                  marks={{ 0: '0', 1: '1', 2: '2' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'maxTokens']}
                label="Max Tokens"
                tooltip="最大输出token数量"
              >
                <InputNumber
                  min={1}
                  max={4096}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'topP']}
                label="Top P"
                tooltip="核采样参数，控制输出的多样性"
              >
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  marks={{ 0: '0', 0.5: '0.5', 1: '1' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['model', 'config', 'frequencyPenalty']}
                label="Frequency Penalty"
                tooltip="频率惩罚，减少重复内容"
              >
                <Slider
                  min={-2}
                  max={2}
                  step={0.1}
                  marks={{ '-2': '-2', 0: '0', 2: '2' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      )
    },
    {
      key: 'mcp',
      label: 'MCP Server',
      icon: <ThunderboltOutlined />,
      children: renderMcpServerSelector()
    },
    {
      key: 'settings',
      label: '高级设置',
      icon: <SettingOutlined />,
      children: (
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={['settings', 'autoStart']}
              label="自动启动"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['settings', 'maxConcurrency']}
              label="最大并发数"
            >
              <InputNumber min={1} max={100} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['settings', 'timeout']}
              label="超时时间(秒)"
            >
              <InputNumber min={5} max={300} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['settings', 'retryCount']}
              label="重试次数"
            >
              <InputNumber min={0} max={10} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={['settings', 'logLevel']}
              label="日志级别"
            >
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
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />
      </FormCard>
    </Form>
  );
};

export default AIAgentFormComponent;
