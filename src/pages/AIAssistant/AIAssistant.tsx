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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageTitle('AI助手');
    // 初始欢迎消息
    const welcomeMessage: Message = {
      id: '1',
      content: '你好！我是AI运维助手，可以帮助你解答关于系统运维、平面管理、实体关系等方面的问题。有什么我可以帮助你的吗？',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const suggestions = [
    '如何创建一个新的平面？',
    '实体关系图谱有什么作用？',
    '系统健康度如何监控？',
    '平面依赖关系如何配置？',
    '标签管理的最佳实践是什么？',
    '如何生成系统分析报告？',
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
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('平面') && lowerMessage.includes('创建')) {
      return `创建平面的步骤如下：

1. 点击"平面管理"菜单进入平面管理页面
2. 点击"创建平面"按钮
3. 填写基本信息：
   - 平面名称：使用英文和连字符，如 "business-system"
   - 显示名称：用户友好的中文名称
   - 描述：详细说明平面的职责和包含的组件
   - 层级：选择L1-L10中合适的层级
   - 依赖关系：选择该平面依赖的其他平面（只能依赖更低层级）

4. 预览效果确认无误后点击"保存"

注意：L1层级的平面不能依赖其他平面，层级越高的平面可以依赖层级更低的平面。`;
    }
    
    if (lowerMessage.includes('实体') && lowerMessage.includes('关系')) {
      return `实体关系图谱的主要作用包括：

🔍 **关系可视化**
- 以图形化方式展示实体间的复杂关系网络
- 支持力导向布局、层次布局、环形布局等多种展示方式
- 直观了解系统中各实体的连接情况

📊 **路径分析**
- 分析实体间的关系路径，找到最短路径
- 进行影响分析，了解某个实体变化对其他实体的影响
- 发现隐藏的关联关系

🎯 **交互操作**
- 支持节点拖拽、缩放平移
- 点击节点查看详细信息
- 筛选和搜索特定的实体关系

这对于理解系统架构、故障排查、影响评估都非常有帮助。`;
    }
    
    if (lowerMessage.includes('健康度') || lowerMessage.includes('监控')) {
      return `系统健康度监控包括以下几个方面：

📈 **实时监控指标**
- CPU、内存、磁盘使用率
- 网络连接状态和延迟
- 服务响应时间和可用性
- 错误率和异常统计

⚠️ **告警机制**
- 设置告警阈值，超过阈值自动告警
- 支持邮件、短信、钉钉等多种告警方式
- 告警升级机制，确保重要问题及时处理

📊 **健康度评分**
- 基于多维度指标计算综合健康度分数
- 异常实体占比超过阈值时平面状态变为异常
- 提供健康度趋势分析和历史对比

🔧 **自动化处理**
- 支持自动重启、自动扩容等自愈机制
- 预设处理脚本，快速响应常见问题`;
    }
    
    if (lowerMessage.includes('依赖') && lowerMessage.includes('配置')) {
      return `平面依赖关系配置的要点：

🏗️ **层级规则**
- 只能依赖层级更低的平面（L3可以依赖L1、L2）
- L1层级平面不能依赖任何其他平面
- 避免循环依赖，确保依赖关系是有向无环图

⚙️ **配置步骤**
1. 在创建或编辑平面时，选择"依赖平面"字段
2. 系统会自动过滤出可选的依赖平面（层级更低的）
3. 可以选择多个依赖平面
4. 预览区域会实时显示依赖关系

📊 **依赖分析**
- 系统会自动分析依赖关系的复杂度
- 提供依赖关系图谱可视化
- 支持依赖影响分析和变更评估

建议遵循单一职责原则，避免过度复杂的依赖关系。`;
    }
    
    if (lowerMessage.includes('标签') && lowerMessage.includes('管理')) {
      return `标签管理的最佳实践：

🏷️ **标签分类体系**
- 环境标签：生产、测试、开发
- 业务标签：核心业务、辅助业务
- 特性标签：高可用、高性能、安全
- 架构标签：微服务、单体、分布式
- 组件标签：数据库、缓存、消息队列

🎨 **标签设计原则**
- 名称简洁明了，避免歧义
- 颜色区分不同类型，便于识别
- 描述清晰，说明标签的用途和适用场景
- 保持标签体系的一致性和完整性

📊 **使用建议**
- 为每个资源打上合适的标签
- 定期清理不再使用的标签
- 建立标签使用规范和审核机制
- 利用标签进行资源分组和权限控制

这样可以提高资源管理效率，便于运维和监控。`;
    }
    
    if (lowerMessage.includes('报告') && lowerMessage.includes('生成')) {
      return `系统分析报告生成功能：

📋 **报告类型**
- 健康度分析报告：系统整体健康状况
- 依赖分析报告：平面间依赖关系分析
- 关系分析报告：实体关系图谱分析
- 性能分析报告：系统性能指标统计

🔧 **生成步骤**
1. 进入"报告管理"页面
2. 点击"创建报告"按钮
3. 选择报告类型和时间范围
4. 配置报告参数和筛选条件
5. 系统自动生成报告并支持下载

📊 **报告内容**
- 数据统计图表和趋势分析
- 问题识别和改进建议
- 详细的数据明细和说明
- 支持PDF、Excel等多种格式导出

报告可以帮助你更好地了解系统状况，制定优化策略。`;
    }

    // 默认回复
    const defaultResponses = [
      '这是一个很好的问题！基于我对AI运维系统的了解，我建议你可以从以下几个方面来考虑这个问题...',
      '根据系统的设计理念，我认为最佳的做法是...',
      '这个功能确实很重要。在实际使用中，你可以通过以下方式来实现...',
      '让我为你详细解释一下这个概念。在AI运维系统中...',
      '这是一个常见的运维场景。通常我们会采用以下策略来处理...',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + 
           '\n\n如果你需要更具体的帮助，请告诉我更多的细节信息，我会为你提供更精准的建议。';
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      content: '对话已清空。有什么新的问题我可以帮助你吗？',
      isUser: false,
      timestamp: new Date(),
    }]);
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
                AI助手
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
              智能运维助手，为你提供专业的系统管理建议和问题解答
            </Paragraph>
          </Col>
          <Col>
            <Space>
              <Tooltip title="清空对话">
                <Button 
                  icon={<DeleteOutlined />} 
                  onClick={handleClearChat}
                >
                  清空
                </Button>
              </Tooltip>
              <Tooltip title="刷新页面">
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => window.location.reload()}
                >
                  刷新
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
                  <Text strong>建议问题：</Text>
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
                      <Text type="secondary">AI助手正在思考...</Text>
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
              placeholder="输入你的问题，按 Ctrl+Enter 发送..."
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
              发送
            </Button>
          </InputContainer>
          
          <div style={{ marginTop: 8, textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <Space>
                <ThunderboltOutlined />
                按 Ctrl+Enter 快速发送消息
              </Space>
            </Text>
          </div>
        </Card>
      </ChatContainer>
    </PageContainer>
  );
};

export default AIAssistant;
