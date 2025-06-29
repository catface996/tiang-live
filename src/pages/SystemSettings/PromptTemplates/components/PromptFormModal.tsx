import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Switch, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppSelector } from '../../../../store';

const { Option } = Select;
const { TextArea } = Input;

// 完美适配暗色主题的表单样式
const StyledModal = styled(Modal)<{ $isDark: boolean }>`
  .ant-modal-content {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border: ${props => (props.$isDark ? '1px solid #434343' : '1px solid #d9d9d9')};
  }

  .ant-modal-header {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border-bottom: ${props => (props.$isDark ? '1px solid #434343' : '1px solid #f0f0f0')};

    .ant-modal-title {
      color: ${props => (props.$isDark ? '#ffffff' : '#000000')};
    }
  }

  .ant-modal-body {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
  }

  .ant-modal-footer {
    background: ${props => (props.$isDark ? '#1f1f1f' : '#ffffff')};
    border-top: ${props => (props.$isDark ? '1px solid #434343' : '1px solid #f0f0f0')};
  }
`;

const StyledForm = styled(Form)<{ $isDark: boolean }>`
  .ant-form-item-label > label {
    color: ${props => (props.$isDark ? '#ffffff' : '#000000')};
    font-weight: 500;
  }

  .ant-input,
  .ant-input:focus,
  .ant-input-focused {
    background: ${props => (props.$isDark ? '#141414' : '#ffffff')};
    border-color: ${props => (props.$isDark ? '#434343' : '#d9d9d9')};
    color: ${props => (props.$isDark ? '#ffffff' : '#000000')};

    &:hover {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
    }

    &:focus,
    &.ant-input-focused {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'};
    }

    &::placeholder {
      color: ${props => (props.$isDark ? '#8c8c8c' : '#bfbfbf')};
    }
  }

  .ant-select {
    .ant-select-selector {
      background: ${props => (props.$isDark ? '#141414' : '#ffffff')};
      border-color: ${props => (props.$isDark ? '#434343' : '#d9d9d9')};
      color: ${props => (props.$isDark ? '#ffffff' : '#000000')};

      &:hover {
        border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      }
    }

    &.ant-select-focused .ant-select-selector {
      border-color: ${props => (props.$isDark ? '#177ddc' : '#40a9ff')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'};
    }

    .ant-select-selection-placeholder {
      color: ${props => (props.$isDark ? '#8c8c8c' : '#bfbfbf')};
    }

    .ant-select-selection-item {
      color: ${props => (props.$isDark ? '#ffffff' : '#000000')};
    }

    .ant-select-arrow {
      color: ${props => (props.$isDark ? '#8c8c8c' : '#bfbfbf')};
    }
  }

  /* Switch组件完美暗色主题适配 - 使用更高优先级覆盖全局样式 */
  .ant-switch {
    background: ${props => (props.$isDark ? '#434343' : '#00000040')} !important;
    border: ${props => (props.$isDark ? '1px solid #595959' : '1px solid #d9d9d9')} !important;
    border-radius: 100px !important;
    height: 22px !important;
    min-width: 44px !important;
    width: 44px !important;
    line-height: 20px !important;
    vertical-align: middle !important;
    position: relative !important;
    display: inline-block !important;
    box-sizing: border-box !important;

    &:hover:not(.ant-switch-disabled) {
      background: ${props => (props.$isDark ? '#595959' : '#00000073')} !important;
    }

    &.ant-switch-checked {
      background: ${props => (props.$isDark ? '#177ddc' : '#1890ff')} !important;
      border-color: ${props => (props.$isDark ? '#177ddc' : '#1890ff')} !important;

      &:hover:not(.ant-switch-disabled) {
        background: ${props => (props.$isDark ? '#1890ff' : '#40a9ff')} !important;
        border-color: ${props => (props.$isDark ? '#1890ff' : '#40a9ff')} !important;
      }
    }

    &:focus {
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 2px rgba(23, 125, 220, 0.2)' : '0 0 0 2px rgba(24, 144, 255, 0.2)'} !important;
      outline: 0 !important;
    }

    .ant-switch-handle {
      position: absolute !important;
      top: 50% !important;
      left: 2px !important;
      width: 18px !important;
      height: 18px !important;
      transform: translateY(-50%) !important;
      transition: all 0.2s ease-in-out !important;
      background: ${props => (props.$isDark ? '#ffffff' : '#ffffff')} !important;
      border: ${props => (props.$isDark ? '1px solid #434343' : '1px solid #d9d9d9')} !important;
      border-radius: 50% !important;
      box-shadow: ${props =>
        props.$isDark ? '0 2px 4px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.12)'} !important;

      &::before {
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        background: ${props => (props.$isDark ? '#ffffff' : '#ffffff')} !important;
        border-radius: 50% !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
        content: '' !important;
      }
    }

    &.ant-switch-checked .ant-switch-handle {
      left: calc(100% - 20px) !important;
      transform: translateY(-50%) !important;
      border-color: ${props => (props.$isDark ? '#177ddc' : '#1890ff')} !important;
    }

    /* 禁用状态 */
    &.ant-switch-disabled {
      background: ${props => (props.$isDark ? '#262626' : '#f5f5f5')} !important;
      border-color: ${props => (props.$isDark ? '#262626' : '#d9d9d9')} !important;
      cursor: not-allowed !important;
      opacity: 0.4 !important;

      .ant-switch-handle {
        background: ${props => (props.$isDark ? '#8c8c8c' : '#ffffff')} !important;
        border-color: ${props => (props.$isDark ? '#262626' : '#d9d9d9')} !important;
        box-shadow: none !important;
        cursor: not-allowed !important;
      }

      &.ant-switch-checked {
        background: ${props => (props.$isDark ? '#262626' : '#f5f5f5')} !important;
        border-color: ${props => (props.$isDark ? '#262626' : '#d9d9d9')} !important;

        .ant-switch-handle {
          background: ${props => (props.$isDark ? '#8c8c8c' : '#ffffff')} !important;
        }
      }
    }

    /* 加载状态 */
    &.ant-switch-loading {
      .ant-switch-loading-icon {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        color: ${props => (props.$isDark ? '#177ddc' : '#1890ff')} !important;
        font-size: 12px !important;
      }

      &.ant-switch-checked .ant-switch-loading-icon {
        color: ${props => (props.$isDark ? '#ffffff' : '#ffffff')} !important;
      }
    }

    /* 移除内部文字以减少宽度 */
    .ant-switch-inner {
      display: none !important;
    }
  }
`;

// 优化Alert组件的暗色主题适配
const StyledAlert = styled(Alert)<{ $isDark: boolean }>`
  margin-top: 16px;

  &.ant-alert-info {
    background-color: ${props => (props.$isDark ? 'rgba(24, 144, 255, 0.1)' : '#e6f7ff')};
    border: 1px solid ${props => (props.$isDark ? 'rgba(24, 144, 255, 0.3)' : '#91d5ff')};

    .ant-alert-message {
      color: ${props => (props.$isDark ? '#91d5ff' : '#0050b3')};
      font-weight: 500;
    }

    .ant-alert-description {
      color: ${props => (props.$isDark ? '#bfbfbf' : '#262626')};
      line-height: 1.6;
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
    <StyledModal
      $isDark={isDark}
      title={editingPrompt ? t('prompts:editTemplate') : t('prompts:createTemplate')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      destroyOnClose
    >
      <StyledForm
        $isDark={isDark}
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
      </StyledForm>
    </StyledModal>
  );
};

export default PromptFormModal;
