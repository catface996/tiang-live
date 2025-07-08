/**
 * 模态框主题测试组件
 * 用于验证模态框内组件的主题适配效果
 */
import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  Descriptions, 
  Tag, 
  Typography, 
  Space, 
  Input, 
  Select, 
  Form,
  Divider
} from 'antd';
import { UserOutlined, ApiOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ModalThemeTest: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const mockData = {
    name: '用户认证时序',
    type: 'authentication',
    status: 'active',
    participants: ['User', 'Frontend', 'Backend', 'Database'],
    steps: 8,
    duration: '2000-5000',
    createdBy: '张三',
    createdAt: '2024-01-15 10:30:00',
    description: '这是一个用户认证的时序流程，包含登录验证、权限检查等步骤。'
  };

  return (
    <div style={{ padding: '24px' }}>
      <Button type="primary" onClick={() => setVisible(true)}>
        打开模态框测试主题
      </Button>

      <Modal
        title="主题适配测试"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
        className="theme-modal"
        destroyOnHidden
      >
        <div>
          <Typography.Title level={4}>描述列表测试</Typography.Title>
          <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
            <Descriptions.Item label="时序名称" span={2}>
              <Text strong>{mockData.name}</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label="类型">
              <Tag color="blue" icon={<UserOutlined />}>
                认证时序
              </Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="状态">
              <Tag color="green">活跃</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="步骤数">
              <Text>{mockData.steps} 步</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label="执行时长">
              <Text>2-5 秒</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label="创建者">
              <Text>{mockData.createdBy}</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label="创建时间">
              <Text>{mockData.createdAt}</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label="参与者" span={2}>
              <Space wrap>
                {mockData.participants.map((participant, index) => (
                  <Tag key={index} icon={<ApiOutlined />}>
                    {participant}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
            
            <Descriptions.Item label="描述" span={2}>
              <Text>{mockData.description}</Text>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Typography.Title level={4}>表单组件测试</Typography.Title>
          <Form layout="vertical">
            <Form.Item label="输入框测试">
              <Input placeholder="请输入内容" />
            </Form.Item>
            
            <Form.Item label="文本域测试">
              <Input.TextArea rows={3} placeholder="请输入描述" />
            </Form.Item>
            
            <Form.Item label="选择器测试">
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Select.Option value="1">选项1</Select.Option>
                <Select.Option value="2">选项2</Select.Option>
                <Select.Option value="3">选项3</Select.Option>
              </Select>
            </Form.Item>
          </Form>

          <Divider />

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setVisible(false)}>
                取消
              </Button>
              <Button type="primary">
                确定
              </Button>
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalThemeTest;
