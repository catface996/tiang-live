import React from 'react';
import { Modal, Form, Input, Select, Row, Col, InputNumber, Slider, Alert } from 'antd';
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

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  modelType: 'llm' | 'embedding' | 'image' | 'audio';
  version: string;
  apiEndpoint: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  status: 'active' | 'inactive' | 'testing';
  description: string;
  capabilities: string[];
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  usageCount: number;
}

interface ModelFormModalProps {
  visible: boolean;
  editingModel: ModelConfig | null;
  form: any;
  onOk: () => void;
  onCancel: () => void;
}

const ModelFormModal: React.FC<ModelFormModalProps> = ({ visible, editingModel, form, onOk, onCancel }) => {
  const { t } = useTranslation(['models', 'common']);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';

  return (
    <Modal
      title={editingModel ? t('models:editModel') : t('models:createModel')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          temperature: 0.7,
          topP: 1.0,
          maxTokens: 4096
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t('models:form.name')}
              rules={[{ required: true, message: t('models:form.nameRequired') }]}
            >
              <Input placeholder={t('models:form.namePlaceholder')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="provider"
              label={t('models:form.provider')}
              rules={[{ required: true, message: t('models:form.providerRequired') }]}
            >
              <Select placeholder={t('models:form.providerPlaceholder')}>
                <Option value="OpenAI">{t('models:providers.OpenAI')}</Option>
                <Option value="Anthropic">{t('models:providers.Anthropic')}</Option>
                <Option value="Google">{t('models:providers.Google')}</Option>
                <Option value="Azure">{t('models:providers.Azure')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="modelType"
              label={t('models:form.modelType')}
              rules={[{ required: true, message: t('models:form.typeRequired') }]}
            >
              <Select placeholder={t('models:form.typePlaceholder')}>
                <Option value="llm">{t('models:types.llm')}</Option>
                <Option value="embedding">{t('models:types.embedding')}</Option>
                <Option value="image">{t('models:types.image')}</Option>
                <Option value="audio">{t('models:types.audio')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="version"
              label={t('models:form.version')}
              rules={[{ required: true, message: t('models:form.versionRequired') }]}
            >
              <Input placeholder={t('models:form.versionPlaceholder')} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="apiEndpoint"
          label={t('models:form.apiEndpoint')}
          rules={[{ required: true, message: t('models:form.endpointRequired') }]}
        >
          <Input placeholder={t('models:form.endpointPlaceholder')} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="maxTokens"
              label={t('models:form.maxTokens')}
              rules={[{ required: true, message: t('models:form.maxTokensRequired') }]}
            >
              <InputNumber
                min={1}
                max={128000}
                style={{ width: '100%' }}
                placeholder={t('models:form.maxTokensPlaceholder')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="temperature"
              label={t('models:form.temperature')}
              rules={[{ required: true, message: t('models:form.temperatureRequired') }]}
            >
              <Slider
                min={0}
                max={2}
                step={0.1}
                marks={{
                  0: '0',
                  1: '1',
                  2: '2'
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label={t('models:form.description')}
          rules={[{ required: true, message: t('models:form.descriptionRequired') }]}
        >
          <TextArea rows={3} placeholder={t('models:form.descriptionPlaceholder')} />
        </Form.Item>

        <StyledAlert
          $isDark={isDark}
          message="提示"
          description="API密钥等敏感信息将在保存后进行加密存储，请确保API端点的正确性。"
          type="info"
          showIcon
        />
      </Form>
    </Modal>
  );
};

export default ModelFormModal;
