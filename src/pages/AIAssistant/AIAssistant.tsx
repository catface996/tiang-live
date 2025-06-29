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
  Badge,
  theme
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
import { useAppSelector } from '../../store';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const PageContainer = styled.div<{ $isDark: boolean }>`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: ${props => props.$isDark ? '#000000' : '#f5f5f5'};
  transition: all 0.3s ease;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
};
  transition: all 0.3s ease;
  
  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`;

const MessagesContainer = styled.div<{ $isDark: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: ${props => props.$isDark ? '#0a0a0a' : '#fafafa'};
  border: ${props => props.$isDark ? '1px solid #262626' : '1px solid #f0f0f0'};
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.$isDark ? '#1f1f1f' : '#f1f1f1'};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.$isDark ? '#434343' : '#c1c1c1'};
    border-radius: 3px;
    
    &:hover {
      background: ${props => props.$isDark ? '#595959' : '#a8a8a8'};
    }
  }
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

const MessageBubble = styled.div<{ isUser: boolean; $isDark: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${props => {
    if (props.isUser) {
      return props.$isDark ? '#177ddc' : '#1890ff';
    } else {
      return props.$isDark ? '#262626' : '#ffffff';
    }
  }};
  color: ${props => {
    if (props.isUser) {
      return '#ffffff';
    } else {
      return props.$isDark ? '#ffffff' : '#000000';
    }
  }};
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)'
};
  border: ${props => props.$isDark && !props.isUser ? '1px solid #434343' : 'none'};
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    ${props => props.isUser ? `
      right: -12px;
      border-left-color: ${props.$isDark ? '#177ddc' : '#1890ff'};
    ` : `
      left: -12px;
      border-right-color: ${props.$isDark ? '#262626' : '#ffffff'};
      ${props.$isDark ? 'filter: drop-shadow(1px 0 0 #434343);' : ''}
    `}
  }
`;

const InputContainer = styled.div<{ $isDark: boolean }>`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  
  .ant-input {
    background: ${props => props.$isDark ? '#000000' : '#ffffff'};
    border-color: ${props => props.$isDark ? '#434343' : '#d9d9d9'};
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    
    &:hover {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
    }
    
    &:focus {
      border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
      box-shadow: ${props => props.$isDark 
    ? '0 0 0 2px rgba(23, 125, 220, 0.2)' 
    : '0 0 0 2px rgba(24, 144, 255, 0.2)'
};
    }
    
    &::placeholder {
      color: ${props => props.$isDark ? '#8c8c8c' : '#bfbfbf'};
    }
  }
`;

const SuggestionContainer = styled.div<{ $isDark: boolean }>`
  margin-bottom: 16px;
  padding: 16px;
  background: ${props => props.$isDark ? '#1f1f1f' : '#f8f9fa'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #e8e8e8'};
  border-radius: 8px;
  transition: all 0.3s ease;
`;

const SuggestionTag = styled(Tag)<{ $isDark: boolean }>`
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isDark ? 'rgba(24, 144, 255, 0.1)' : undefined};
  border-color: ${props => props.$isDark ? '#177ddc' : undefined};
  color: ${props => props.$isDark ? '#177ddc' : undefined};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(23, 125, 220, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)'
};
    background: ${props => props.$isDark ? 'rgba(24, 144, 255, 0.2)' : undefined};
  }
`;

const PageHeader = styled.div<{ $isDark: boolean }>`
  margin-bottom: 24px;
  padding: 24px;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
};
  transition: all 0.3s ease;
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
  const { t } = useTranslation(['common']);
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setPageTitle(t('aiAssistant:title'));
    // 初始欢迎消息
    const welcomeMessage: Message = {
      id: '1',
      content: t('dashboard:welcome'),
      isUser: false,
      timestamp: new Date()
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
    t('aiAssistant:suggestions.createPlane'),
    t('aiAssistant:suggestions.entityRelation'),
    t('aiAssistant:suggestions.healthMonitor'),
    t('aiAssistant:suggestions.planeDependency'),
    t('aiAssistant:suggestions.tagManagement'),
    t('aiAssistant:suggestions.systemReport')
  ];

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
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
        timestamp: new Date()
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
      return t('aiAssistant:responses.createPlane');
    }
    
    if (isChineseKeyword(['实体', '关系']) || isEnglishKeyword(['entity', 'relation'])) {
      return t('aiAssistant:responses.entityRelation');
    }
    
    if (isChineseKeyword(['健康度', '监控']) || isEnglishKeyword(['health', 'monitor'])) {
      return t('aiAssistant:responses.healthMonitor');
    }
    
    if (isChineseKeyword(['依赖', '配置']) || isEnglishKeyword(['dependency', 'config'])) {
      return t('aiAssistant:responses.dependency');
    }
    
    if (isChineseKeyword(['标签', '管理']) || isEnglishKeyword(['tag', 'management'])) {
      return t('aiAssistant:responses.tagManagement');
    }
    
    if (isChineseKeyword(['报告', '生成']) || isEnglishKeyword(['report', 'generate'])) {
      return t('aiAssistant:responses.reportGeneration');
    }
    
    if (isChineseKeyword(['时序', '管理']) || isEnglishKeyword(['sequence', 'management'])) {
      return t('aiAssistant:responses.sequenceManagement');
    }
    
    if (isChineseKeyword(['智能体', 'agent']) || isEnglishKeyword(['agent', 'ai'])) {
      return t('aiAssistant:responses.aiAgent');
    }
    
    // 默认回复
    return t('aiAssistant:responses.default');
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      content: t('aiAssistant:chatCleared'),
      isUser: false,
      timestamp: new Date()
    }]);
    // 清空对话时不自动滚动
    setShouldAutoScroll(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    const locale = t('common:locale') === 'zh-CN' ? 'zh-CN' : 'en-US';
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <PageContainer $isDark={isDark}>
      {/* 页面头部 */}
      <PageHeader $isDark={isDark}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ 
              margin: 0,
              color: isDark ? '#ffffff' : '#262626'
            }}>
              <Space>
                <MessageOutlined style={{ color: isDark ? '#177ddc' : '#1890ff' }} />
                {t('aiAssistant:title')}
                <Badge 
                  count="Beta" 
                  style={{ 
                    backgroundColor: '#52c41a', 
                    fontSize: 12 
                  }} 
                />
              </Space>
            </Title>
            <Paragraph style={{ 
              marginTop: 8, 
              marginBottom: 0, 
              fontSize: 16,
              color: isDark ? '#8c8c8c' : '#666666'
            }}>
              {t('aiAssistant:subtitle')}
            </Paragraph>
          </Col>
          <Col>
            <Space>
              <Tooltip title={t('aiAssistant:clear')}>
                <Button 
                  icon={<DeleteOutlined />} 
                  onClick={handleClearChat}
                  style={{
                    color: isDark ? '#ffffff' : undefined,
                    borderColor: isDark ? '#434343' : undefined,
                    backgroundColor: isDark ? 'transparent' : undefined
                  }}
                >
                  {t('aiAssistant:clear')}
                </Button>
              </Tooltip>
              <Tooltip title={t('common:refresh')}>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => window.location.reload()}
                  style={{
                    color: isDark ? '#ffffff' : undefined,
                    borderColor: isDark ? '#434343' : undefined,
                    backgroundColor: isDark ? 'transparent' : undefined
                  }}
                >
                  {t('common:refresh')}
                </Button>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </PageHeader>

      <ChatContainer>
        <StyledCard $isDark={isDark}>
          {/* 建议问题 */}
          {messages.length <= 1 && (
            <SuggestionContainer $isDark={isDark}>
              <div style={{ marginBottom: 12 }}>
                <Space>
                  <BulbOutlined style={{ color: '#faad14' }} />
                  <Text strong style={{ color: isDark ? '#ffffff' : '#262626' }}>
                    {t('aiAssistant:suggestiondescription')}：
                  </Text>
                </Space>
              </div>
              <div>
                {suggestions.map((suggestion, index) => (
                  <SuggestionTag
                    key={index}
                    icon={<QuestionCircleOutlined />}
                    color="blue"
                    $isDark={isDark}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionTag>
                ))}
              </div>
              <Divider style={{ 
                borderColor: isDark ? '#303030' : '#f0f0f0' 
              }} />
            </SuggestionContainer>
          )}

          {/* 消息列表 */}
          <MessagesContainer $isDark={isDark}>
            {messages.length === 0 ? (
              <Empty 
                description={
                  <span style={{ color: isDark ? '#8c8c8c' : '#666666' }}>
                    {t('aiAssistant:emptyMessage')}
                  </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              messages.map((message) => (
                <MessageItem key={message.id} isUser={message.isUser}>
                  <MessageContent isUser={message.isUser}>
                    <Avatar 
                      icon={message.isUser ? <UserOutlined /> : <RobotOutlined />}
                      style={{ 
                        backgroundColor: message.isUser 
                          ? (isDark ? '#177ddc' : '#1890ff')
                          : '#52c41a',
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <MessageBubble isUser={message.isUser} $isDark={isDark}>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                          {message.content}
                        </div>
                      </MessageBubble>
                      <div style={{ 
                        fontSize: 12, 
                        color: isDark ? '#8c8c8c' : '#999', 
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
                  <MessageBubble isUser={false} $isDark={isDark}>
                    <Space>
                      <Spin size="small" />
                      <Text type="secondary" style={{ 
                        color: isDark ? '#8c8c8c' : '#666666' 
                      }}>
                        {t('aiAssistant:thinking')}
                      </Text>
                    </Space>
                  </MessageBubble>
                </MessageContent>
              </MessageItem>
            )}
            
            <div ref={messagesEndRef} />
          </MessagesContainer>

          {/* 输入区域 */}
          <InputContainer $isDark={isDark}>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('aiAssistant:chatPlaceholder')}
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
              {t('aiAssistant:send')}
            </Button>
          </InputContainer>
          
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <Text type="secondary" style={{ 
              fontSize: 12,
              color: isDark ? '#8c8c8c' : '#666666'
            }}>
              <Space>
                <ThunderboltOutlined />
                {t('aiAssistant:sendShortcut')}
              </Space>
            </Text>
          </div>
        </StyledCard>
      </ChatContainer>
    </PageContainer>
  );
};

export default AIAssistant;
