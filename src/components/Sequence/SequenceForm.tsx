/**
 * 时序表单组件
 * 用于创建和编辑时序
 */
import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Row, 
  Col, 
  Space, 
  Divider,
  Modal,
  message
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined, 
  EyeOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SequenceDiagram from '../SequenceDiagram';

const { TextArea } = Input;

const FormContainer = styled.div`
  background-color: var(--bg-container);
  color: var(--text-primary);
  
  .ant-form-item-label > label {
    color: var(--text-primary);
  }
`;

const MermaidCodeEditor = styled(TextArea)`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
  font-size: 13px;
  line-height: 1.5;
  background-color: var(--bg-elevated);
  border-color: var(--border-base);
  color: var(--text-primary);
  
  &:hover {
    border-color: var(--border-hover);
  }
  
  &:focus {
    background-color: var(--bg-container);
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-disabled);
    font-size: 12px;
  }
`;

interface SequenceData {
  id?: string;
  name: string;
  description: string;
  type: string;
  status: string;
  participants: string[];
  duration: string;
  mermaidChart: string;
}

interface SequenceFormProps {
  sequence?: SequenceData | null;
  onSubmit: (values: any) => Promise<void>;
  onCancel: () => void;
}

const SequenceForm: React.FC<SequenceFormProps> = ({ 
  sequence, 
  onSubmit, 
  onCancel 
}) => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewChart, setPreviewChart] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['sequences', 'common']);

  const isEditing = !!sequence;

  // 预览图表
  const handlePreviewChart = () => {
    const chartCode = form.getFieldValue('mermaidChart');
    if (chartCode) {
      setPreviewChart(chartCode);
      setPreviewVisible(true);
    } else {
      message.warning(t('sequences:messages.noChartCode'));
    }
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={sequence || {
          status: 'draft',
          type: 'business'
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={t('sequences:form.name')}
              rules={[
                { required: true, message: t('sequences:form.nameRequired') },
                { max: 100, message: t('sequences:form.nameMaxLength') }
              ]}
            >
              <Input placeholder={t('sequences:form.namePlaceholder')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label={t('sequences:form.description')}
              rules={[
                { required: true, message: t('sequences:form.descriptionRequired') },
                { max: 500, message: t('sequences:form.descriptionMaxLength') }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder={t('sequences:form.descriptionPlaceholder')}
                showCount
                maxLength={500}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label={t('sequences:form.type')}
              rules={[{ required: true, message: t('sequences:form.typeRequired') }]}
            >
              <Select placeholder={t('sequences:form.typePlaceholder')}>
                <Select.Option value="authentication">
                  <Space>
                    <UserOutlined />
                    {t('sequences:types.authentication')}
                  </Space>
                </Select.Option>
                <Select.Option value="business">
                  <Space>
                    <ApiOutlined />
                    {t('sequences:types.business')}
                  </Space>
                </Select.Option>
                <Select.Option value="monitoring">
                  <Space>
                    <ClockCircleOutlined />
                    {t('sequences:types.monitoring')}
                  </Space>
                </Select.Option>
                <Select.Option value="data">
                  <Space>
                    <DatabaseOutlined />
                    {t('sequences:types.data')}
                  </Space>
                </Select.Option>
                <Select.Option value="gateway">
                  <Space>
                    <CloudOutlined />
                    {t('sequences:types.gateway')}
                  </Space>
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label={t('sequences:form.status')}
              rules={[{ required: true, message: t('sequences:form.statusRequired') }]}
            >
              <Select placeholder={t('sequences:form.statusPlaceholder')}>
                <Select.Option value="draft">{t('sequences:statuses.draft')}</Select.Option>
                <Select.Option value="active">{t('sequences:statuses.active')}</Select.Option>
                <Select.Option value="inactive">{t('sequences:statuses.inactive')}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="participants"
              label={t('sequences:form.participants')}
              rules={[{ required: true, message: t('sequences:form.participantsRequired') }]}
            >
              <Select
                mode="tags"
                placeholder={t('sequences:form.participantsPlaceholder')}
                style={{ width: '100%' }}
              >
                <Select.Option value="User">{t('sequences:participantOptions.user')}</Select.Option>
                <Select.Option value="Frontend">{t('sequences:participantOptions.frontend')}</Select.Option>
                <Select.Option value="Backend">{t('sequences:participantOptions.backend')}</Select.Option>
                <Select.Option value="Database">{t('sequences:participantOptions.database')}</Select.Option>
                <Select.Option value="Cache">{t('sequences:participantOptions.cache')}</Select.Option>
                <Select.Option value="Queue">{t('sequences:participantOptions.queue')}</Select.Option>
                <Select.Option value="External API">{t('sequences:participantOptions.externalApi')}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="duration"
              label={t('sequences:form.duration')}
              rules={[{ required: true, message: t('sequences:form.durationRequired') }]}
            >
              <Input 
                placeholder={t('sequences:form.durationPlaceholder')}
                addonAfter={t('sequences:form.durationUnit')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="mermaidChart"
              label={
                <Space>
                  {t('sequences:form.mermaidChart')}
                  <Button 
                    type="link" 
                    size="small" 
                    icon={<EyeOutlined />}
                    onClick={handlePreviewChart}
                  >
                    {t('sequences:form.previewChart')}
                  </Button>
                </Space>
              }
              rules={[
                { required: true, message: t('sequences:form.mermaidChartRequired') }
              ]}
            >
              <MermaidCodeEditor 
                rows={8} 
                placeholder={t('sequences:form.mermaidChartPlaceholder')}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel} icon={<CloseOutlined />}>
              {t('common:cancel')}
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={loading}
            >
              {isEditing ? t('common:update') : t('common:create')}
            </Button>
          </Space>
        </div>
      </Form>

      {/* Chart Preview Modal */}
      <Modal
        title={t('sequences:form.chartPreview')}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={1000}
        style={{ top: 20 }}
        className="theme-modal"
      >
        {previewChart && (
          <SequenceDiagram 
            chart={previewChart}
            title={t('sequences:form.previewTitle')}
          />
        )}
      </Modal>
    </FormContainer>
  );
};

export default SequenceForm;
