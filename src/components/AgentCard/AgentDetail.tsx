import React from 'react';
import { Descriptions, Tag, Space, Typography, Divider, Card, Row, Col } from 'antd';
import { 
  RobotOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  MonitorOutlined,
  MessageOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { AIAgentResponse } from '../../services/aiAgentApi';

const { Title, Text, Paragraph } = Typography;

interface AgentDetailProps {
  agent: AIAgentResponse;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent }) => {
  const { t } = useTranslation(['common', 'agents']);

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      monitoring: <MonitorOutlined />,
      chat: <MessageOutlined />,
      task: <SettingOutlined />,
      analysis: <BarChartOutlined />
    };
    return iconMap[type] || <RobotOutlined />;
  };

  // 获取状态配置
  const getStatusConfig = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
      active: { color: 'success', icon: <CheckCircleOutlined />, text: '活跃' },
      inactive: { color: 'error', icon: <ExclamationCircleOutlined />, text: '非活跃' },
      training: { color: 'warning', icon: <ClockCircleOutlined />, text: '训练中' }
    };
    return statusMap[status] || { color: 'default', icon: <ExclamationCircleOutlined />, text: status };
  };

  // 获取类型配置
  const getTypeConfig = (type: string) => {
    const typeMap: Record<string, { color: string; text: string }> = {
      monitoring: { color: 'blue', text: '监控型' },
      chat: { color: 'green', text: '对话型' },
      task: { color: 'purple', text: '任务型' },
      analysis: { color: 'orange', text: '分析型' }
    };
    return typeMap[type] || { color: 'default', text: type };
  };

  const statusConfig = getStatusConfig(agent.status);
  const typeConfig = getTypeConfig(agent.type);

  return (
    <div>
      {/* 基本信息 */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col flex="none">
            <div style={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: '#1890ff'
            }}>
              {getTypeIcon(agent.type)}
            </div>
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>
              {agent.name}
            </Title>
            <Paragraph style={{ margin: '8px 0', color: '#666' }}>
              {agent.description}
            </Paragraph>
            <Space>
              <Tag color={typeConfig.color} icon={getTypeIcon(agent.type)}>
                {typeConfig.text}
              </Tag>
              <Tag color={statusConfig.color} icon={statusConfig.icon}>
                {statusConfig.text}
              </Tag>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 详细信息 */}
      <Descriptions title="基本信息" bordered size="small" column={2}>
        <Descriptions.Item label="智能体ID">{agent.id}</Descriptions.Item>
        <Descriptions.Item label="类型">{typeConfig.text}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusConfig.text}</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {agent.createdAt ? new Date(agent.createdAt).toLocaleString() : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          {agent.updatedAt ? new Date(agent.updatedAt).toLocaleString() : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="创建者">{agent.createdBy || '-'}</Descriptions.Item>
      </Descriptions>

      {/* 模型信息 */}
      {agent.model && (
        <>
          <Divider />
          <Descriptions title="模型配置" bordered size="small" column={2}>
            <Descriptions.Item label="模型名称">{agent.model.name}</Descriptions.Item>
            <Descriptions.Item label="提供商">{agent.model.provider}</Descriptions.Item>
            <Descriptions.Item label="版本">{agent.model.version}</Descriptions.Item>
            <Descriptions.Item label="最大Token">{agent.model.maxTokens}</Descriptions.Item>
            <Descriptions.Item label="温度">{agent.model.temperature}</Descriptions.Item>
            <Descriptions.Item label="Top P">{agent.model.topP}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      {/* 设置信息 */}
      {agent.settings && (
        <>
          <Divider />
          <Descriptions title="运行设置" bordered size="small" column={2}>
            <Descriptions.Item label="自动启动">
              {agent.settings.autoStart ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="最大并发">{agent.settings.maxConcurrency}</Descriptions.Item>
            <Descriptions.Item label="超时时间">{agent.settings.timeout}秒</Descriptions.Item>
            <Descriptions.Item label="重试次数">{agent.settings.retryCount}</Descriptions.Item>
            <Descriptions.Item label="日志级别">{agent.settings.logLevel}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      {/* 标签 */}
      {agent.tags && agent.tags.length > 0 && (
        <>
          <Divider />
          <div>
            <Text strong>标签：</Text>
            <div style={{ marginTop: 8 }}>
              <Space wrap>
                {agent.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </Space>
            </div>
          </div>
        </>
      )}

      {/* MCP服务器 */}
      {agent.mcpServers && agent.mcpServers.length > 0 && (
        <>
          <Divider />
          <div>
            <Text strong>MCP服务器 ({agent.mcpServers.length}个)：</Text>
            <div style={{ marginTop: 8 }}>
              <Space wrap>
                {agent.mcpServers.map((server) => (
                  <Tag key={server.id} color="blue">
                    {server.name}
                  </Tag>
                ))}
              </Space>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentDetail;
