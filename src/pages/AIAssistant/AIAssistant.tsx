import React, { useState, useEffect, useRef } from 'react';
import { 
  Typography, 
  Card, 
  Input, 
  Button, 
  Space, 
  Avatar,
  Divider,
  Spin,
  Empty,
  Tag,
  Tooltip,
  Row,
  Col,
  Badge
} from 'antd';
import { 
  MessageOutlined,
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  ReloadOutlined,
  DeleteOutlined,
  BulbOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../utils';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const PageContainer = styled.div`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const MessageItem = styled.div<{ isUser: boolean }>`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  gap: 8px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${props => props.isUser ? '#1890ff' : '#ffffff'};
  color: ${props => props.isUser ? '#ffffff' : '#000000'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    ${props => props.isUser ? `
      right: -12px;
      border-left-color: #1890ff;
    ` : `
      left: -12px;
      border-right-color: #ffffff;
    `}
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const SuggestionContainer = styled.div`
  margin-bottom: 16px;
`;

const SuggestionTag = styled(Tag)`
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setPageTitle(t('aiAssistant.title'));
    // 初始欢迎消息
    const welcomeMessage: Message = {
      id: '1',
      content: t('dashboard.welcome'),
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    // 初始加载时不自动滚动
    setShouldAutoScroll(false);
  }, []);

  useEffect(() => {
    // 只有在需要自动滚动时才滚动
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const suggestions = [
    t('aiAssistant.suggestions.createPlane'),
    t('aiAssistant.suggestions.entityRelation'),
    t('aiAssistant.suggestions.healthMonitor'),
    t('aiAssistant.suggestions.planeDependency'),
    t('aiAssistant.suggestions.tagManagement'),
    t('aiAssistant.suggestions.systemReport'),
  ];

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setIsTyping(true);
    // 发送消息后启用自动滚动
    setShouldAutoScroll(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
      setIsTyping(false);
      // AI回复后也保持自动滚动
      setShouldAutoScroll(true);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 检查中文关键词
    const isChineseKeyword = (keywords: string[]) => 
      keywords.some(keyword => lowerMessage.includes(keyword));
    
    // 检查英文关键词  
    const isEnglishKeyword = (keywords: string[]) =>
      keywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isChineseKeyword(['平面', '创建']) || isEnglishKeyword(['plane', 'create'])) {
      return t('aiAssistant.responses.createPlane');
    }
    
    if (isChineseKeyword(['实体', '关系']) || isEnglishKeyword(['entity', 'relation'])) {
      return t('aiAssistant.responses.entityRelation');
    }
    
    if (isChineseKeyword(['健康度', '监控']) || isEnglishKeyword(['health', 'monitor'])) {
      return t('aiAssistant.responses.healthMonitor');
    }
    
    if (isChineseKeyword(['依赖', '配置']) || isEnglishKeyword(['dependency', 'config'])) {
      return t('aiAssistant.responses.dependency');
    }
    
    if (isChineseKeyword(['标签', '管理']) || isEnglishKeyword(['tag', 'management'])) {
      return t('aiAssistant.responses.tagManagement');
    }
    
    if (isChineseKeyword(['报告', '生成']) || isEnglishKeyword(['report', 'generate'])) {
      return t('aiAssistant.responses.reportGeneration');
    }
    
    if (isChineseKeyword(['时序', '管理']) || isEnglishKeyword(['sequence', 'management'])) {
      return t('aiAssistant.responses.sequenceManagement');
    }
    
    if (isChineseKeyword(['智能体', 'agent']) || isEnglishKeyword(['agent', 'ai'])) {
      return t('aiAssistant.responses.aiAgent');
    }
    
    // 默认回复
    return t('aiAssistant.responses.default');
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      content: t('aiAssistant.chatCleared'),
      isUser: false,
      timestamp: new Date(),
    }]);
    // 清空对话时不自动滚动
    setShouldAutoScroll(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <PageContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <MessageOutlined style={{ color: '#1890ff' }} />
                {t('aiAssistant.title')}
                <Badge 
                  count="Beta" 
                  style={{ 
                    backgroundColor: '#52c41a', 
                    fontSize: 12 
                  }} 
                />
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('aiAssistant.subtitle')}
            </Paragraph>
          </Col>
          <Col>
            <Space>
              <Tooltip title={t('aiAssistant.clear')}>
                <Button 
                  icon={<DeleteOutlined />} 
                  onClick={handleClearChat}
                >
                  {t('aiAssistant.clear')}
                </Button>
              </Tooltip>
              <Tooltip title={t('common.refresh')}>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => window.location.reload()}
                >
                  {t('common.refresh')}
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </div>

      <ChatContainer>
        <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 建议问题 */}
          {messages.length <= 1 && (
            <SuggestionContainer>
              <div style={{ marginBottom: 12 }}>
                <Space>
                  <BulbOutlined style={{ color: '#faad14' }} />
                  <Text strong>{t('aiAssistant.suggestions')}：</Text>
                </Space>
              </div>
              <div>
                {suggestions.map((suggestion, index) => (
                  <SuggestionTag
                    key={index}
                    icon={<QuestionCircleOutlined />}
                    color="blue"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionTag>
                ))}
              </div>
              <Divider />
            </SuggestionContainer>
          )}

          {/* 消息列表 */}
          <MessagesContainer>
            {messages.length === 0 ? (
              <Empty 
                description="还没有对话记录，开始你的第一个问题吧！"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              messages.map((message) => (
                <MessageItem key={message.id} isUser={message.isUser}>
                  <MessageContent isUser={message.isUser}>
                    <Avatar 
                      icon={message.isUser ? <UserOutlined /> : <RobotOutlined />}
                      style={{ 
                        backgroundColor: message.isUser ? '#1890ff' : '#52c41a',
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <MessageBubble isUser={message.isUser}>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                          {message.content}
                        </div>
                      </MessageBubble>
                      <div style={{ 
                        fontSize: 12, 
                        color: '#999', 
                        marginTop: 4,
                        textAlign: message.isUser ? 'right' : 'left'
                      }}>
                        <Space size={4}>
                          <ClockCircleOutlined />
                          {formatTime(message.timestamp)}
                        </Space>
                      </div>
                    </div>
                  </MessageContent>
                </MessageItem>
              ))
            )}
            
            {/* AI正在输入提示 */}
            {isTyping && (
              <MessageItem isUser={false}>
                <MessageContent isUser={false}>
                  <Avatar 
                    icon={<RobotOutlined />}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                  <MessageBubble isUser={false}>
                    <Space>
                      <Spin size="small" />
                      <Text type="secondary">{t('aiAssistant.thinking')}</Text>
                    </Space>
                  </MessageBubble>
                </MessageContent>
              </MessageItem>
            )}
            
            <div ref={messagesEndRef} />
          </MessagesContainer>

          {/* 输入区域 */}
          <InputContainer>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('aiAssistant.chatPlaceholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onPressEnter={(e) => {
                if (e.ctrlKey) {
                  handleSendMessage();
                }
              }}
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={loading}
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              style={{ height: 'auto', minHeight: 32 }}
            >
              {t('aiAssistant.send')}
            </Button>
          </InputContainer>
          
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <Space>
                <ThunderboltOutlined />
                {t('aiAssistant.sendShortcut')}
              </Space>
            </Text>
          </div>
        </Card>
      </ChatContainer>
    </PageContainer>
  );
};

export default AIAssistant;
