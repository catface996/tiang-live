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
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<AIAgentFormData | undefined>();

  useEffect(() => {
    setPageTitle(isEdit ? '编辑AI智能体' : '创建AI智能体');
    if (isEdit) {
      loadAgentData();
    }
  }, [isEdit, id]);

  // 模拟加载智能体数据
  const loadAgentData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      const agentData: AIAgentFormData = {
        id: id,
        name: '客服助手',
        description: '智能客服助手，处理用户咨询和问题解答',
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
          system: '你是一个专业的客服助手，请友好、准确地回答用户问题。',
          templates: ['customer-service-template'],
          variables: {
            company_name: '天工AI',
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
        tags: ['客服', '对话', '智能助手']
      };

      setInitialData(agentData);
    } catch (error) {
      message.error('加载智能体数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: AIAgentFormData) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(isEdit ? '智能体更新成功' : '智能体创建成功');
      navigate('/ai-agents');
    } catch (error) {
      message.error(isEdit ? '更新失败' : '创建失败');
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
                {isEdit ? '编辑AI智能体' : '创建AI智能体'}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16, color: '#666' }}>
              {isEdit ? '修改智能体配置和参数' : '配置新的AI智能体，包括模型、提示词和能力'}
            </Paragraph>
          </div>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/ai-agents')}
            >
              返回列表
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
              取消
            </Button>
            <Button 
              type="primary" 
              loading={loading}
              icon={<SaveOutlined />}
              form="ai-agent-form"
              htmlType="submit"
            >
              {isEdit ? '更新智能体' : '创建智能体'}
            </Button>
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AIAgentForm;
