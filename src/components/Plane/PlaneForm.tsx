import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Space,
  Typography,
  Tag,
  Alert,
  Tooltip
} from 'antd';
import { SaveOutlined, ReloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { PlaneDefinition } from '../../types';
import { PLANE_COLORS, getPlaneColorByLevel } from '../../utils/planeColors';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface PlaneFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<PlaneDefinition>;
  existingPlanes?: PlaneDefinition[];
  onSubmit: (data: Partial<PlaneDefinition>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const PreviewCard = styled(Card)<{ $level: number }>`
  margin-top: 16px;
  border: 2px solid #e8e8e8;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  
  .ant-card-head {
    background: ${props => getPlaneColorByLevel(props.$level).gradient};
    border-bottom: none;
    
    .ant-card-head-title {
      color: white;
      font-weight: bold;
    }
  }
`;

const DependencyTag = styled(Tag)<{ $planeId: string }>`
  margin: 2px;
  border-radius: 12px;
`;

const PlaneForm: React.FC<PlaneFormProps> = ({
  mode,
  initialData,
  existingPlanes = [],
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['planes', 'common']);
  const [previewLevel, setPreviewLevel] = useState<number>(1);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);

  // 初始化表单数据
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        displayName: initialData.displayName,
        description: initialData.description,
        level: initialData.level || 1,
        dependencies: initialData.dependencies || [],
      });
      setPreviewLevel(initialData.level || 1);
      setSelectedDependencies(initialData.dependencies || []);
    }
  }, [initialData, form]);

  // 监听层级变化
  const handleLevelChange = (level: number) => {
    setPreviewLevel(level);
    // 清空依赖关系，因为层级变化可能导致依赖关系无效
    form.setFieldValue('dependencies', []);
    setSelectedDependencies([]);
  };

  // 监听依赖关系变化
  const handleDependenciesChange = (deps: string[]) => {
    setSelectedDependencies(deps);
  };

  // 获取可选的依赖平面（层级小于当前层级的平面）
  const getAvailableDependencies = () => {
    return existingPlanes.filter(plane => plane.level < previewLevel);
  };

  // 表单提交
  const handleSubmit = async (values: any) => {
    try {
      const formData: Partial<PlaneDefinition> = {
        name: values.name,
        displayName: values.displayName,
        description: values.description,
        level: values.level,
        dependencies: values.dependencies || [],
        config: {
          icon: getPlaneIcon(values.level),
          color: PLANE_COLORS[values.level]?.primary || '#1890ff',
          theme: values.name,
          maxInstances: 100, // 固定默认值
          autoScaling: false, // 固定默认值
          monitoring: {
            enabled: true, // 固定默认值
            alertThreshold: 80, // 固定默认值
          },
          security: {
            accessControl: true, // 固定默认值
            encryption: false, // 固定默认值
          },
          healthThresholds: {
            warningThreshold: 0.2, // 固定默认值
            errorThreshold: 0.1, // 固定默认值
          },
        },
      };

      if (mode === 'edit' && initialData?.id) {
        formData.id = initialData.id;
      }

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // 获取平面图标
  const getPlaneIcon = (level: number): string => {
    const icons = {
      1: '🏗️',
      2: '⚙️',
      3: '💼',
      4: '🔗',
      5: '🎯',
      6: '🌟',
      7: '🚀',
      8: '💎',
      9: '🎨',
      10: '👑',
    };
    return icons[level as keyof typeof icons] || '📋';
  };

  // 重置表单
  const handleReset = () => {
    if (mode === 'edit' && initialData) {
      // 编辑模式：恢复到初始编辑状态
      form.setFieldsValue({
        name: initialData.name,
        displayName: initialData.displayName,
        description: initialData.description,
        level: initialData.level || 1,
        dependencies: initialData.dependencies || [],
      });
      setPreviewLevel(initialData.level || 1);
      setSelectedDependencies(initialData.dependencies || []);
    } else {
      // 创建模式：清空表单
      form.resetFields();
      setPreviewLevel(1);
      setSelectedDependencies([]);
    }
  };

  return (
    <FormContainer>
      <Card
        title={
          <Space>
            {mode === 'create' ? t('planes:createEdit.createTitle') : t('planes:createEdit.editTitle')}
            <Tooltip title={t('planes:createEdit.formLabels.levelHelp')}>
              <InfoCircleOutlined style={{ color: '#1890ff' }} />
            </Tooltip>
          </Space>
        }
        extra={
          <Space>
            <Tooltip title={mode === 'edit' ? t('planes:createEdit.buttons.reset') : t('planes:createEdit.buttons.reset')}>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                {t('planes:createEdit.buttons.reset')}
              </Button>
            </Tooltip>
            <Button onClick={onCancel}>
              {t('planes:createEdit.buttons.cancel')}
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            level: 1,
          }}
        >
          {/* 基本信息 */}
          <div>
            <Title level={4}>{t('planes:form.basicInfo')}</Title>
            
            <Form.Item
              name="name"
              label={t('planes:createEdit.formLabels.planeName')}
              rules={[
                { required: true, message: t('planes:createEdit.validation.planeNameRequired') },
                { pattern: /^[a-z0-9-]+$/, message: 'Only lowercase letters, numbers and hyphens are allowed' }
              ]}
              extra={t('planes:createEdit.formLabels.planeNameHelp')}
            >
              <Input placeholder={t('planes:createEdit.formLabels.planeNamePlaceholder')} />
            </Form.Item>

            <Form.Item
              name="displayName"
              label={t('planes:createEdit.formLabels.displayName')}
              rules={[{ required: true, message: t('planes:createEdit.validation.displayNameRequired') }]}
              extra={t('planes:createEdit.formLabels.displayNameHelp')}
            >
              <Input placeholder={t('planes:createEdit.formLabels.displayNamePlaceholder')} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('planes:createEdit.formLabels.description')}
              rules={[{ required: true, message: t('planes:createEdit.validation.descriptionRequired') }]}
            >
              <TextArea
                rows={4}
                placeholder={t('planes:createEdit.formLabels.descriptionPlaceholder')}
              />
            </Form.Item>

            <Form.Item
              name="level"
              label={t('planes:createEdit.formLabels.level')}
              rules={[{ required: true, message: t('planes:createEdit.validation.levelRequired') }]}
              extra={t('planes:createEdit.formLabels.levelHelp')}
            >
              <Select onChange={handleLevelChange}>
                <Option value={1}>{t('planes:createEdit.levelOptions.1')}</Option>
                <Option value={2}>{t('planes:createEdit.levelOptions.2')}</Option>
                <Option value={3}>{t('planes:createEdit.levelOptions.3')}</Option>
                <Option value={4}>{t('planes:createEdit.levelOptions.4')}</Option>
                <Option value={5}>{t('planes:createEdit.levelOptions.5')}</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dependencies"
              label={t('planes:createEdit.formLabels.dependencies')}
              extra={t('planes:createEdit.formLabels.dependenciesHelp')}
            >
              <Select
                mode="multiple"
                placeholder={t('planes:createEdit.formLabels.dependencies')}
                onChange={handleDependenciesChange}
                disabled={previewLevel === 1}
              >
                {getAvailableDependencies().map(plane => (
                  <Option key={plane.id} value={plane.id}>
                    L{plane.level} - {plane.displayName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {previewLevel === 1 && (
              <Alert
                message={t('planes:createEdit.levelOptions.1') + ' ' + t('planes:createEdit.formLabels.dependenciesHelp')}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
          </div>

          {/* 预览效果 */}
          <div style={{ marginTop: 32 }}>
            <Title level={4}>{t('planes:createEdit.preview.title')}</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              {t('planes:createEdit.preview.subtitle')}
            </Text>
            <PreviewCard
              $level={previewLevel}
              title={
                <Space>
                  <span>{getPlaneIcon(previewLevel)}</span>
                  <span>{form.getFieldValue('displayName') || t('planes:createEdit.formLabels.displayName')}</span>
                  <Tag color="white" style={{ color: getPlaneColorByLevel(previewLevel).primary }}>
                    L{previewLevel}
                  </Tag>
                </Space>
              }
              size="small"
            >
              <Text type="secondary">
                {form.getFieldValue('description') || t('planes:createEdit.formLabels.descriptionPlaceholder')}
              </Text>
              
              {selectedDependencies.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <Text strong>{t('planes:createEdit.preview.dependencies')}: </Text>
                  {selectedDependencies.map(depId => {
                    const depPlane = existingPlanes.find(p => p.id === depId);
                    return depPlane ? (
                      <DependencyTag key={depId} $planeId={depId} color="blue">
                        L{depPlane.level} - {depPlane.displayName}
                      </DependencyTag>
                    ) : null;
                  })}
                </div>
              )}
            </PreviewCard>
          </div>

          {/* 提交按钮 */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Space size="large">
              <Button onClick={onCancel} size="large">
                {t('planes:createEdit.buttons.cancel')}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                size="large"
              >
                {mode === 'create' ? t('planes:createEdit.createTitle') : t('planes:createEdit.buttons.save')}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </FormContainer>
  );
};

export default PlaneForm;
