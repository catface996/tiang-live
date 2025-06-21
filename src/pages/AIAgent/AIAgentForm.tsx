import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Space, 
  Button, 
  Card,
  message
} from 'antd';
import { 
  RobotOutlined, 
  SaveOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import { AIAgentFormComponent } from './components';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
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

const AIAgentForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<AIAgentFormData | undefined>();

  useEffect(() => {
    setPageTitle(isEdit ? t('aiAgent.form.editTitle') : t('aiAgent.form.createTitle'));
    if (isEdit) {
      loadAgentData();
    }
  }, [isEdit, id, t]);

  // 模拟加载智能体数据
  const loadAgentData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      const agentData: AIAgentFormData = {
        id: id,
        name: t('aiAgent.form.mockData.customerServiceName'),
        description: t('aiAgent.form.mockData.customerServiceDescription'),
        type: 'chat',
        status: 'active',
        model: {
          provider: 'openai',
          modelName: 'gpt-4',
          version: 'gpt-4-0613',
          config: {
            temperature: 0.7,
            maxTokens: 2048,
            topP: 1.0,
            frequencyPenalty: 0.0,
            presencePenalty: 0.0
          }
        },
        prompts: {
          system: t('aiAgent.form.mockData.systemPrompt'),
          templates: ['customer-service-template'],
          variables: {
            company_name: t('aiAgent.form.mockData.companyName'),
            service_hours: '9:00-18:00'
          }
        },
        mcpServers: ['database-mcp', 'email-mcp'],
        capabilities: ['text-generation', 'question-answering', 'sentiment-analysis'],
        settings: {
          autoStart: true,
          maxConcurrency: 10,
          timeout: 30,
          retryCount: 3,
          logLevel: 'info'
        },
        tags: [t('aiAgent.form.mockData.tags.customerService'), t('aiAgent.form.mockData.tags.dialogue'), t('aiAgent.form.mockData.tags.assistant')]
      };

      setInitialData(agentData);
    } catch (error) {
      message.error(t('aiAgent.form.messages.loadDataFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: AIAgentFormData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(isEdit ? t('aiAgent.form.messages.updateSuccess') : t('aiAgent.form.messages.createSuccess'));
      navigate('/ai-agents');
    } catch (error) {
      message.error(isEdit ? t('aiAgent.form.messages.updateFailed') : t('aiAgent.form.messages.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* 页面标题和操作栏 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <RobotOutlined style={{ color: '#1890ff' }} />
                {isEdit ? t('aiAgent.form.editTitle') : t('aiAgent.form.createTitle')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16, color: '#666' }}>
              {isEdit ? t('aiAgent.form.editSubtitle') : t('aiAgent.form.createSubtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/ai-agents')}
            >
              {t('common.backToList')}
            </Button>
          </Space>
        </div>
      </div>

      {/* 表单组件 */}
      <AIAgentFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* 操作按钮 */}
      <Card>
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => navigate('/ai-agents')}>
              {t('common.cancel')}
            </Button>
            <Button 
              type="primary" 
              loading={loading}
              icon={<SaveOutlined />}
              form="ai-agent-form"
              htmlType="submit"
            >
              {isEdit ? t('aiAgent.form.updateAgent') : t('aiAgent.form.createAgent')}
            </Button>
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AIAgentForm;
