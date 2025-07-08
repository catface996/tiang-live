import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, Switch, Alert, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppSelector } from '../../../../store';

const { Option } = Select;
const { TextArea } = Input;

// 优化Alert组件的暗色主题适配
const StyledAlert = styled(Alert)<{ $isDark: boolean }>`
  margin-top: 16px;

  &.ant-alert-info {
    background-color: ${props => (props.$isDark ? 'rgba(24, 144, 255, 0.1)' : '#e6f7ff')};
    border: 1px solid ${props => (props.$isDark ? 'rgba(24, 144, 255, 0.3)' : '#91d5ff')};

    .ant-alert-message {
      color: ${props => (props.$isDark ? '#91d5ff' : '#0050b3')};
    }

    .ant-alert-description {
      color: ${props => (props.$isDark ? '#bfbfbf' : '#262626')};
    }

    .ant-alert-icon {
      color: ${props => (props.$isDark ? '#91d5ff' : '#1890ff')};
    }
  }
`;

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  categoryCode?: string;
  description: string;
  content: string;
  type: string;
  variables: string[];
  tags: string[];
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  usageCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  version: string;
}

interface PromptFormModalProps {
  visible: boolean;
  editingPrompt: PromptTemplate | null;
  form: any;
  onOk: () => void;
  onCancel: () => void;
}

const PromptFormModal: React.FC<PromptFormModalProps> = ({ visible, editingPrompt, form, onOk, onCancel }) => {
  const { t } = useTranslation(['prompts', 'common']);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';

  // 当编辑模板时，设置表单初始值
  useEffect(() => {
    if (visible && editingPrompt) {
      form.setFieldsValue({
        name: editingPrompt.name,
        category: editingPrompt.category,
        description: editingPrompt.description,
        content: editingPrompt.content,
        type: editingPrompt.type || 'USER_PROMPT',
        tags: editingPrompt.tags || [],
        variables: editingPrompt.variables || [],
        language: editingPrompt.language || 'zh-CN',
        difficulty: editingPrompt.difficulty || 'intermediate',
        isPublic: editingPrompt.isPublic || false
      });
    } else if (visible && !editingPrompt) {
      // 创建新模板时的默认值
      form.setFieldsValue({
        type: 'USER_PROMPT',
        language: 'zh-CN',
        difficulty: 'intermediate',
        isPublic: false,
        tags: [],
        variables: []
      });
    }
  }, [visible, editingPrompt, form]);

  // 从内容中提取变量
  const extractVariablesFromContent = (content: string): string[] => {
    if (!content) return [];
    const matches = content.match(/\{([^}]+)\}/g);
    if (!matches) return [];
    return [...new Set(matches.map(match => match.slice(1, -1)))];
  };

  // 当内容改变时，自动更新变量
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const extractedVariables = extractVariablesFromContent(content);
    const currentVariables = form.getFieldValue('variables') || [];
    
    // 合并现有变量和提取的变量，去重
    const allVariables = [...new Set([...currentVariables, ...extractedVariables])];
    
    form.setFieldValue('variables', allVariables);
  };

  return (
    <Modal
      title={editingPrompt ? t('prompts:editTemplate') : t('prompts:createTemplate')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={900}
      destroyOnHidden
      okText={editingPrompt ? '更新' : '创建'}
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: 'USER_PROMPT',
          language: 'zh-CN',
          difficulty: 'intermediate',
          isPublic: false,
          tags: [],
          variables: []
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="模板名称"
              rules={[{ required: true, message: '请输入模板名称' }]}
            >
              <Input placeholder="请输入模板名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="模板类型"
              rules={[{ required: true, message: '请选择模板类型' }]}
            >
              <Select placeholder="请选择模板类型">
                <Option value="USER_PROMPT">用户提示词</Option>
                <Option value="SYSTEM_PROMPT">系统提示词</Option>
                <Option value="ASSISTANT_PROMPT">助手提示词</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select placeholder="请选择分类">
                <Option value="编程">编程</Option>
                <Option value="商务">商务</Option>
                <Option value="摘要">摘要</Option>
                <Option value="数据分析">数据分析</Option>
                <Option value="文档工具">文档工具</Option>
                <Option value="通用">通用</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="difficulty"
              label="难度等级"
              rules={[{ required: true, message: '请选择难度等级' }]}
            >
              <Select placeholder="请选择难度等级">
                <Option value="beginner">初级</Option>
                <Option value="intermediate">中级</Option>
                <Option value="advanced">高级</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <TextArea rows={2} placeholder="请输入模板描述" />
        </Form.Item>

        <Form.Item
          name="content"
          label="提示词内容"
          rules={[{ required: true, message: '请输入提示词内容' }]}
        >
          <TextArea 
            rows={10} 
            placeholder="请输入提示词内容，可以使用 {变量名} 来定义变量"
            showCount
            onChange={handleContentChange}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="标签"
            >
              <Select
                mode="tags"
                placeholder="请输入标签，按回车添加"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              >
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="variables"
              label="变量"
            >
              <Select
                mode="tags"
                placeholder="请输入变量名，按回车添加"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
              >
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="language"
              label="语言"
              rules={[{ required: true, message: '请选择语言' }]}
            >
              <Select placeholder="请选择语言">
                <Option value="zh-CN">中文</Option>
                <Option value="en-US">English</Option>
                <Option value="ja-JP">日本語</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="isPublic" label="公开模板" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <StyledAlert
          $isDark={isDark}
          message="变量使用提示"
          description={
            <div>
              <p>• 在提示词内容中使用 <code>{'{变量名}'}</code> 来定义变量，例如：<code>{'{用户输入}'}</code>、<code>{'{文档内容}'}</code> 等</p>
              <p>• 系统会自动从内容中提取变量并添加到变量列表中</p>
              <p>• 你也可以手动在变量字段中添加或删除变量</p>
              <p>• 这些变量可以在使用模板时动态替换为实际内容</p>
            </div>
          }
          type="info"
          showIcon
        />
      </Form>
    </Modal>
  );
};

export default PromptFormModal;
