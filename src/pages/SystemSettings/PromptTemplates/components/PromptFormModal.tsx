import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Switch, Alert } from 'antd';
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
  description: string;
  content: string;
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

  return (
    <Modal
      title={editingPrompt ? t('prompts:editTemplate') : t('prompts:createTemplate')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          language: 'zh-CN',
          difficulty: 'intermediate',
          isPublic: false
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t('prompts:form.templateName')}
              rules={[{ required: true, message: t('prompts:form.templateNameRequired') }]}
            >
              <Input placeholder={t('prompts:form.templateNamePlaceholder')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label={t('prompts:form.category')}
              rules={[{ required: true, message: t('prompts:form.categoryRequired') }]}
            >
              <Select placeholder={t('prompts:form.categoryPlaceholder')}>
                <Option value="开发工具">{t('prompts:categories.devTools')}</Option>
                <Option value="运维工具">{t('prompts:categories.opsTools')}</Option>
                <Option value="产品管理">{t('prompts:categories.productManagement')}</Option>
                <Option value="文档工具">{t('prompts:categories.docTools')}</Option>
                <Option value="客服助手">{t('prompts:categories.customerService')}</Option>
                <Option value="数据分析">{t('prompts:categories.dataAnalysis')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label={t('prompts:form.description')}
          rules={[{ required: true, message: t('prompts:form.descriptionRequired') }]}
        >
          <TextArea rows={2} placeholder={t('prompts:form.descriptionPlaceholder')} />
        </Form.Item>

        <Form.Item
          name="content"
          label={t('prompts:form.content')}
          rules={[{ required: true, message: t('prompts:form.contentRequired') }]}
        >
          <TextArea rows={8} placeholder={t('prompts:form.contentPlaceholder')} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="language"
              label={t('prompts:form.language')}
              rules={[{ required: true, message: t('prompts:form.languageRequired') }]}
            >
              <Select placeholder={t('prompts:form.languagePlaceholder')}>
                <Option value="zh-CN">中文</Option>
                <Option value="en-US">English</Option>
                <Option value="ja-JP">日本語</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="difficulty"
              label={t('prompts:form.difficulty')}
              rules={[{ required: true, message: t('prompts:form.difficultyRequired') }]}
            >
              <Select placeholder={t('prompts:search.difficulty')}>
                <Option value="beginner">{t('prompts:difficulty.beginner')}</Option>
                <Option value="intermediate">{t('prompts:difficulty.intermediate')}</Option>
                <Option value="advanced">{t('prompts:difficulty.advanced')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="isPublic" label={t('prompts:detail.isPublic')} valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <StyledAlert
          $isDark={isDark}
          message={t('prompts:form.variableTip')}
          description={t('prompts:form.variableTipDescription')}
          type="info"
          showIcon
        />
      </Form>
    </Modal>
  );
};

export default PromptFormModal;
