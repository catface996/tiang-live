import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Card, message, Breadcrumb } from 'antd';
import { RobotOutlined, SaveOutlined, HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';
import { AIAgentFormComponent } from './components';
import '../../styles/ai-agent-form.css';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  padding: 24px;
  background: var(--content-bg);
  min-height: calc(100vh - 64px);
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContent = styled.div`
  flex: 1;
`;

const ActionButtons = styled.div`
  text-align: right;
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
  const { t } = useTranslation(['agents', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<AIAgentFormData | undefined>();

  useEffect(() => {
    setPageTitle(isEdit ? t('agents:form.editTitle') : t('agents:form.createTitle'));
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
        name: t('agents:form.mockData.customerServiceName'),
        description: t('agents:form.mockData.customerServiceDescription'),
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
          system: t('agents:form.mockData.systemPrompt'),
          templates: [t('agents:form.mockData.template1'), t('agents:form.mockData.template2')],
          variables: {
            company_name: t('agents:form.mockData.companyName'),
            support_email: 'support@example.com'
          }
        },
        mcpServers: ['database-server', 'file-server'],
        capabilities: ['text-generation', 'conversation', 'task-automation'],
        settings: {
          autoStart: true,
          maxConcurrency: 5,
          timeout: 30000,
          retryCount: 3,
          logLevel: 'info'
        },
        tags: ['customer-service', 'chat', 'support']
      };

      setInitialData(agentData);
    } catch (error) {
      message.error(t('agents:form.messages.loadDataFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: AIAgentFormData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success(isEdit ? t('agents:form.messages.updateSuccess') : t('agents:form.messages.createSuccess'));
      navigate('/ai-agents');
    } catch (error) {
      message.error(isEdit ? t('agents:form.messages.updateFailed') : t('agents:form.messages.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="ai-agent-form-page">
      {/* 面包屑导航 */}
      <Breadcrumb 
        className="page-breadcrumb"
        items={[
          {
            title: <HomeOutlined />
          },
          {
            title: <a onClick={() => navigate('/ai-agents')}>{t('agents:title')}</a>
          },
          {
            title: isEdit ? t('agents:form.editTitle') : t('agents:form.createTitle')
          }
        ]}
      />

      {/* 页面标题 */}
      <PageHeader>
        <TitleSection>
          <TitleContent>
            <Title className="page-title" level={2}>
              <Space>
                <RobotOutlined className="title-icon" />
                {isEdit ? t('agents:form.editTitle') : t('agents:form.createTitle')}
              </Space>
            </Title>
            <Paragraph className="page-subtitle">
              {isEdit ? t('agents:form.editSubtitle') : t('agents:form.createSubtitle')}
            </Paragraph>
          </TitleContent>
        </TitleSection>
      </PageHeader>

      {/* 表单组件 */}
      <AIAgentFormComponent initialData={initialData} onSubmit={handleSubmit} loading={loading} />

      {/* 操作按钮 */}
      <Card className="action-card">
        <ActionButtons>
          <Space>
            <Button onClick={() => navigate('/ai-agents')}>{t('common:cancel')}</Button>
            <Button type="primary" loading={loading} icon={<SaveOutlined />} form="ai-agent-form" htmlType="submit">
              {isEdit ? t('agents:form.updateAgent') : t('agents:form.createAgent')}
            </Button>
          </Space>
        </ActionButtons>
      </Card>
    </PageContainer>
  );
};

export default AIAgentForm;
