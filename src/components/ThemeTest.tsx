/**
 * 主题测试组件 - 用于验证主题切换效果
 */
import React from 'react';
import { Card, Button, Input, Select, Typography, Space } from 'antd';
import { useTheme } from '../hooks/useTheme';

const { Title, Text } = Typography;

const ThemeTest: React.FC = () => {
  const { theme, isDark, classes } = useTheme();

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>主题测试页面</Title>
      <Text>当前主题: {theme} {isDark ? '(深色)' : '(浅色)'}</Text>
      
      <div style={{ marginTop: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 卡片测试 */}
          <Card title="卡片测试" className={classes.CARD}>
            <Text className={classes.TEXT_PRIMARY}>主要文本</Text>
            <br />
            <Text className={classes.TEXT_SECONDARY}>次要文本</Text>
            <br />
            <Text className={classes.TEXT_SUCCESS}>成功文本</Text>
            <br />
            <Text className={classes.TEXT_WARNING}>警告文本</Text>
            <br />
            <Text className={classes.TEXT_ERROR}>错误文本</Text>
          </Card>

          {/* 表单控件测试 */}
          <Card title="表单控件测试">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input placeholder="输入框测试" />
              <Input.TextArea placeholder="文本域测试" rows={3} />
              <Select placeholder="选择框测试" style={{ width: '200px' }}>
                <Select.Option value="1">选项1</Select.Option>
                <Select.Option value="2">选项2</Select.Option>
              </Select>
            </Space>
          </Card>

          {/* 按钮测试 */}
          <Card title="按钮测试">
            <Space>
              <Button>默认按钮</Button>
              <Button type="primary">主要按钮</Button>
              <Button type="text">文本按钮</Button>
              <Button type="link">链接按钮</Button>
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default ThemeTest;
