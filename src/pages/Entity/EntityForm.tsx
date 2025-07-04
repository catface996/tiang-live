import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Tag,
  message,
  Steps,
  Alert,
  Tabs,
  Breadcrumb,
  Modal
} from 'antd';
import {
  SaveOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  TagsOutlined,
  DatabaseOutlined,
  ApiOutlined,
  AppstoreOutlined,
  TableOutlined,
  CloudServerOutlined,
  DeploymentUnitOutlined,
  HomeOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { entityApi, EntityStatus } from '../../services/entityApi';
import enumApi, { type EnumItem } from '../../services/enumApi';
import styled from 'styled-components';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Styled Components for perfect dark theme support
const PageContainer = styled.div<{ $isDark: boolean }>`
  min-height: 100vh;
  background-color: ${props => (props.$isDark ? '#000000' : '#f5f5f5')};
  padding: 24px;
`;

const ContentWrapper = styled.div<{ $isDark: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: ${props => (props.$isDark ? '#1e1e1e' : '#ffffff')};
  border: ${props => (props.$isDark ? '1px solid #2a2a2a' : '1px solid #e8e8e8')};
  overflow: hidden;

  &:hover {
    box-shadow: ${props => (props.$isDark ? '0 2px 12px rgba(0, 0, 0, 0.3)' : '0 2px 12px rgba(0, 0, 0, 0.06)')};
  }

  .ant-card-head {
    background-color: ${props => (props.$isDark ? '#232323' : '#fafafa')};
    border-bottom: ${props => (props.$isDark ? '1px solid #2a2a2a' : '1px solid #f0f0f0')};
    padding: 16px 24px;
  }

  .ant-card-head-title {
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')};
    font-weight: 600;
    font-size: 16px;
  }

  .ant-card-extra {
    color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
  }

  .ant-card-body {
    background-color: ${props => (props.$isDark ? '#1e1e1e' : '#ffffff')};
    padding: 24px;
  }
`;

const StyledBreadcrumb = styled(Breadcrumb)<{ $isDark: boolean }>`
  margin-bottom: 24px;

  /* 强制所有面包屑项目垂直居中对齐 */
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .ant-breadcrumb ol {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ant-breadcrumb li {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
  }

  .ant-breadcrumb-link {
    color: ${props => (props.$isDark ? '#e0e0e0' : '#666666')};
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;

    &:hover {
      color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
    }
  }

  .ant-breadcrumb-separator {
    color: ${props => (props.$isDark ? '#a0a0a0' : '#999999')};
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    margin: 0 8px;
  }

  /* Button组件样式 - 确保与其他元素高度一致 */
  .ant-btn {
    color: ${props => (props.$isDark ? '#e0e0e0' : '#666666')};
    border: none;
    background: transparent;
    padding: 0 8px;
    height: 32px;
    min-height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover,
    &:focus {
      color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
      background-color: ${props => (props.$isDark ? 'rgba(74, 158, 255, 0.1)' : 'rgba(24, 144, 255, 0.06)')};
      border-color: transparent;
      box-shadow: none;
    }

    /* Button内部元素对齐 */
    .anticon {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 1;
    }

    span {
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }

  /* Space组件样式 - 确保与Button高度一致 */
  .ant-space {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    line-height: 32px;
  }

  .ant-space-item {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
  }

  /* 图标统一样式 */
  .anticon {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    height: 14px;
  }

  /* 文字统一样式 */
  span:not(.anticon) {
    display: flex;
    align-items: center;
    line-height: 1;
    height: auto;
  }
`;

const StyledTitle = styled(Title)<{ $isDark: boolean }>`
  &.ant-typography {
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')} !important;
    margin-bottom: 32px !important;
    font-weight: 700 !important;
    font-size: 28px !important;
    line-height: 1.2 !important;
  }

  .anticon {
    color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
    margin-right: 12px;
  }
`;

const StyledSteps = styled(Steps)<{ $isDark: boolean }>`
  .ant-steps-item-title {
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')} !important;
    font-weight: 600 !important;
  }

  .ant-steps-item-description {
    color: ${props => (props.$isDark ? '#a0a0a0' : '#666666')} !important;
  }

  .ant-steps-item-wait {
    .ant-steps-item-icon {
      background-color: ${props => (props.$isDark ? '#2a2a2a' : '#f5f5f5')};
      border-color: ${props => (props.$isDark ? '#3a3a3a' : '#d9d9d9')};
    }

    .ant-steps-icon {
      color: ${props => (props.$isDark ? '#6a6a6a' : '#999999')};
    }
  }

  .ant-steps-item-process {
    .ant-steps-item-icon {
      background-color: #4a9eff;
      border-color: #4a9eff;
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background-color: ${props => (props.$isDark ? '#1e4d3a' : '#f6ffed')};
      border-color: #52c41a;
    }

    .ant-steps-icon {
      color: #52c41a;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;

  .left-buttons {
    display: flex;
    gap: 12px;
  }

  .right-buttons {
    display: flex;
    gap: 12px;
  }
`;

const IconSelector = styled.div<{ $isDark: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 12px;
  margin-top: 16px;

  .icon-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 2px solid ${props => (props.$isDark ? '#2a2a2a' : '#e8e8e8')};
    border-radius: 12px;
    cursor: pointer;
    background-color: ${props => (props.$isDark ? '#232323' : '#fafafa')};
    position: relative;

    &:hover {
      border-color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
      background-color: ${props => (props.$isDark ? 'rgba(74, 158, 255, 0.1)' : 'rgba(24, 144, 255, 0.06)')};
      transform: translateY(-2px);
      box-shadow: ${props =>
        props.$isDark ? '0 4px 12px rgba(74, 158, 255, 0.2)' : '0 4px 12px rgba(24, 144, 255, 0.15)'};
    }

    &.selected {
      border-color: #4a9eff;
      background-color: ${props => (props.$isDark ? 'rgba(74, 158, 255, 0.15)' : 'rgba(24, 144, 255, 0.08)')};
      box-shadow: ${props =>
        props.$isDark ? '0 0 0 3px rgba(74, 158, 255, 0.2)' : '0 0 0 3px rgba(24, 144, 255, 0.1)'};
    }

    .anticon {
      font-size: 28px;
      color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')};
    }
  }
`;

const TagContainer = styled.div<{ $isDark: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;

  .ant-tag {
    background-color: ${props => (props.$isDark ? '#232323' : '#f5f5f5')};
    border: ${props => (props.$isDark ? '1px solid #3a3a3a' : '1px solid #d9d9d9')};
    color: ${props => (props.$isDark ? '#e0e0e0' : '#333333')};
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 13px;

    &:hover {
      background-color: ${props => (props.$isDark ? '#2a2a2a' : '#e6f7ff')};
      border-color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
    }
  }
`;

const StyledAlert = styled(Alert)<{ $isDark: boolean }>`
  &.ant-alert {
    background-color: ${props => (props.$isDark ? 'rgba(74, 158, 255, 0.1)' : '#e6f7ff')};
    border: ${props => (props.$isDark ? '1px solid rgba(74, 158, 255, 0.3)' : '1px solid #91d5ff')};
    border-radius: 8px;
    margin-bottom: 24px;
  }

  .ant-alert-message {
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')};
    font-weight: 500;
  }

  .ant-alert-description {
    color: ${props => (props.$isDark ? '#e0e0e0' : '#666666')};
  }

  .ant-alert-icon {
    color: ${props => (props.$isDark ? '#4a9eff' : '#1890ff')};
  }
`;

const FormSection = styled.div<{ $isDark: boolean }>`
  .ant-form-item-label > label {
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')};
    font-weight: 500;
    font-size: 14px;
  }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    color: #ff4d4f;
  }

  .ant-input,
  .ant-input-number,
  .ant-select-selector,
  .ant-input-affix-wrapper {
    background-color: ${props => (props.$isDark ? '#232323' : '#ffffff')};
    border-color: ${props => (props.$isDark ? '#3a3a3a' : '#d9d9d9')};
    color: ${props => (props.$isDark ? '#ffffff' : '#1a1a1a')};

    &:hover {
      border-color: ${props => (props.$isDark ? '#4a9eff' : '#40a9ff')};
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: #4a9eff;
      box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
    }
  }

  .ant-input::placeholder,
  .ant-input-number-input::placeholder {
    color: ${props => (props.$isDark ? '#6a6a6a' : '#bfbfbf')};
  }

  .ant-select-arrow {
    color: ${props => (props.$isDark ? '#a0a0a0' : '#999999')};
  }

  .ant-form-item-explain-error {
    color: #ff7875;
  }
`;

const EntityForm: React.FC = () => {
  const { t } = useTranslation(['entities', 'common']);
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDark = currentTheme === 'dark';
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('ApiOutlined');
  const [entityTypes, setEntityTypes] = useState<EnumItem[]>([]);
  const [entityStatuses, setEntityStatuses] = useState<EnumItem[]>([]);
  const [enumLoading, setEnumLoading] = useState(false);

  const mode = id ? 'edit' : 'create';

  // 图标选项
  const iconOptions = [
    { key: 'ApiOutlined', icon: <ApiOutlined /> },
    { key: 'DatabaseOutlined', icon: <DatabaseOutlined /> },
    { key: 'TableOutlined', icon: <TableOutlined /> },
    { key: 'AppstoreOutlined', icon: <AppstoreOutlined /> },
    { key: 'CloudServerOutlined', icon: <CloudServerOutlined /> },
    { key: 'DeploymentUnitOutlined', icon: <DeploymentUnitOutlined /> },
    { key: 'SettingOutlined', icon: <SettingOutlined /> },
    { key: 'TagsOutlined', icon: <TagsOutlined /> }
  ];

  // 加载枚举数据
  const loadEnumData = async () => {
    setEnumLoading(true);
    try {
      const response = await enumApi.getEntityEnums();

      if (response?.success && Array.isArray(response.data)) {
        // 查找并设置EntityType
        const entityTypeEnum = response.data.find(item => item.typeName === 'EntityType');
        if (entityTypeEnum?.items) {
          setEntityTypes(entityTypeEnum.items);
        }

        // 查找并设置EntityStatus
        const entityStatusEnum = response.data.find(item => item.typeName === 'EntityStatus');
        if (entityStatusEnum?.items) {
          setEntityStatuses(entityStatusEnum.items);
        }
      }
    } catch (error) {
      console.error('加载枚举数据失败:', error);
      message.error('加载枚举数据失败');
    } finally {
      setEnumLoading(false);
    }
  };

  // 组件挂载时加载枚举数据
  useEffect(() => {
    loadEnumData();
  }, []);

  // 实体类型选项 - 保留作为备用，优先使用从后端获取的数据
  const mockEntityTypes = [
    { value: 'microservice', label: t('entities:types.microservice'), icon: <ApiOutlined /> },
    { value: 'database', label: t('entities:types.database'), icon: <DatabaseOutlined /> },
    { value: 'table', label: t('entities:types.table'), icon: <TableOutlined /> },
    { value: 'api', label: t('entities:types.api'), icon: <CloudServerOutlined /> },
    { value: 'middleware', label: t('entities:types.middleware'), icon: <DeploymentUnitOutlined /> },
    { value: 'businessSystem', label: t('entities:types.businessSystem'), icon: <AppstoreOutlined /> },
    { value: 'configuration', label: t('entities:types.configuration'), icon: <SettingOutlined /> }
  ];

  // 平面选项
  const planeOptions = [
    { value: 'user-plane', label: t('planes:userPlane') },
    { value: 'order-plane', label: t('planes:orderPlane') },
    { value: 'payment-plane', label: t('planes:paymentPlane') },
    { value: 'product-plane', label: t('planes:productPlane') },
    { value: 'inventory-plane', label: t('planes:inventoryPlane') }
  ];

  useEffect(() => {
    if (mode === 'edit' && id) {
      loadEntityData(id);
    }
  }, [id, mode]);

  const loadEntityData = async (entityId: string) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟数据
      const mockData = {
        name: t('entities:form.entityName'),
        type: 'microservice',
        plane: 'user-plane',
        description: t('entities:form.descriptionPlaceholder'),
        icon: 'ApiOutlined',
        tags: [t('common:coreService'), t('common:userManagement')],
        entityStatus: 'ACTIVE',
        properties: [
          { key: 'version', value: '1.2.0' },
          { key: 'port', value: '8080' },
          { key: 'framework', value: 'Spring Boot' },
          { key: 'language', value: 'Java' }
        ]
      };

      form.setFieldsValue(mockData);
      setSelectedIcon(mockData.icon);
    } catch (error) {
      message.error(t('entities:form.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    // 显示确认对话框
    Modal.confirm({
      title: mode === 'create' ? t('entities:form.confirmCreate') : t('entities:form.confirmUpdate'),
      content:
        mode === 'create'
          ? t('entities:form.confirmCreateContent', { name: values.name })
          : t('entities:form.confirmUpdateContent', { name: values.name }),
      okText: t('common:confirm'),
      cancelText: t('common:cancel'),
      onOk: async () => {
        await performSubmit(values);
      }
    });
  };

  const performSubmit = async (values: any) => {
    console.log('🎯 开始提交实体数据...');
    console.log('📋 表单数据:', values);
    console.log('🔧 当前模式:', mode);

    setLoading(true);
    try {
      const submitData = {
        id: mode === 'edit' ? Number(id) : undefined,
        name: values.name,
        description: values.description || '',
        type: values.type,
        planeId: values.planeId || 1, // 默认平面ID，实际应该从表单获取
        status: values.entityStatus === 'ACTIVE' ? EntityStatus.ACTIVE : EntityStatus.INACTIVE,
        labels: values.tags || [],
        properties: {
          icon: selectedIcon,
          category: values.category,
          priority: values.priority,
          // 将Properties数组转换为对象
          ...(values.properties || []).reduce((acc: any, prop: { key: string; value: string }) => {
            if (prop.key && prop.value) {
              acc[prop.key] = prop.value;
            }
            return acc;
          }, {})
        },
        metadata: {
          icon: selectedIcon,
          step: currentStep,
          formData: values
        }
      };

      console.log('🚀 提交实体数据:', submitData);
      console.log('📡 即将调用API:', mode === 'create' ? 'createEntity' : 'updateEntity');

      // 调用真实的API
      const response =
        mode === 'create' ? await entityApi.createEntity(submitData) : await entityApi.updateEntity(submitData);

      console.log('📥 API响应:', response);

      if (response.success) {
        console.log('✅ 实体保存成功:', response.data);
        message.success(mode === 'create' ? t('entities:form.createSuccess') : t('entities:form.updateSuccess'));
        navigate('/entities');
      } else {
        console.error('❌ 实体保存失败:', response);
        message.error(
          response.message || (mode === 'create' ? t('entities:form.createFailed') : t('entities:form.updateFailed'))
        );
      }
    } catch (error) {
      console.error('❌ 实体保存异常:', error);
      console.error('❌ 错误详情:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status
      });
      message.error(mode === 'create' ? t('entities:form.createFailed') : t('entities:form.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/entities');
  };

  const steps = [
    {
      title: t('entities:form.basicInfo'),
      description: t('entities:form.basicInfoDesc')
    },
    {
      title: t('entities:form.configInfo'),
      description: t('entities:form.configInfoDesc')
    },
    {
      title: t('entities:form.confirmSubmit'),
      description: t('entities:form.confirmSubmitDesc')
    }
  ];

  const renderBasicInfo = () => (
    <StyledCard $isDark={isDark} title={t('entities:form.basicInfo')} extra={<InfoCircleOutlined />}>
      <FormSection $isDark={isDark}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label={t('entities:form.entityName')}
              rules={[
                { required: true, message: t('entities:form.entityNameRequired') },
                { max: 50, message: t('entities:form.entityNameMaxLength') }
              ]}
            >
              <Input placeholder={t('entities:form.entityNamePlaceholder')} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="type"
              label={t('entities:form.entityType')}
              rules={[{ required: true, message: t('entities:form.entityTypeRequired') }]}
            >
              <Select placeholder={t('entities:form.entityTypeRequired')} loading={enumLoading}>
                {/* 优先使用从后端获取的枚举数据 */}
                {entityTypes.length > 0
                  ? entityTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        <Space>
                          <ApiOutlined />
                          {type.label}
                        </Space>
                      </Option>
                    ))
                  : /* 备用的mock数据 */
                    mockEntityTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        <Space>
                          {type.icon}
                          {type.label}
                        </Space>
                      </Option>
                    ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="plane"
              label={t('entities:form.belongsToPlane')}
              rules={[{ required: true, message: t('entities:form.planeRequired') }]}
            >
              <Select placeholder={t('entities:form.planeRequired')}>
                {planeOptions.map(plane => (
                  <Option key={plane.value} value={plane.value}>
                    {plane.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="entityStatus" label={t('entities:form.entityStatus')} initialValue="ACTIVE">
              <Select loading={enumLoading}>
                {/* 优先使用从后端获取的枚举数据 */}
                {entityStatuses.length > 0 ? (
                  entityStatuses.map(status => (
                    <Option key={status.value} value={status.value}>
                      {status.label}
                    </Option>
                  ))
                ) : (
                  /* 备用的mock数据 */
                  <>
                    <Option value="ACTIVE">{t('common:active')}</Option>
                    <Option value="INACTIVE">{t('common:inactive')}</Option>
                    <Option value="DEPRECATED">{t('common:deprecated')}</Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="description"
              label={t('common:description')}
              rules={[
                { required: true, message: t('entities:form.descriptionRequired') },
                { max: 500, message: t('entities:form.descriptionMaxLength') }
              ]}
            >
              <TextArea rows={4} placeholder={t('entities:form.descriptionPlaceholder')} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="tags" label={t('entities:form.tags')}>
              <Select mode="tags" placeholder={t('entities:form.tagsPlaceholder')} style={{ width: '100%' }}>
                <Option value={t('common:coreService')}>{t('common:coreService')}</Option>
                <Option value={t('common:basicService')}>{t('common:basicService')}</Option>
                <Option value={t('common:businessService')}>{t('common:businessService')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label={t('entities:form.iconSelection')}>
              <IconSelector $isDark={isDark}>
                {iconOptions.map(option => (
                  <div
                    key={option.key}
                    className={`icon-option ${selectedIcon === option.key ? 'selected' : ''}`}
                    onClick={() => setSelectedIcon(option.key)}
                  >
                    {option.icon}
                  </div>
                ))}
              </IconSelector>
            </Form.Item>
          </Col>
        </Row>
      </FormSection>
    </StyledCard>
  );

  const renderConfigInfo = () => (
    <StyledCard $isDark={isDark} title={t('entities:form.configInfo')} extra={<SettingOutlined />}>
      <FormSection $isDark={isDark}>
        <Form.List name="properties">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} style={{ marginBottom: 16 }}>
                  <Col xs={24} md={10}>
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      rules={[{ required: true, message: '请输入属性名' }]}
                    >
                      <Input placeholder="属性名 (如: version, port)" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true, message: '请输入属性值' }]}
                    >
                      <Input placeholder="属性值 (如: 1.0.0, 8080)" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={2}>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      style={{ marginTop: 4 }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加属性
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </FormSection>
    </StyledCard>
  );

  const renderConfirmInfo = () => (
    <StyledCard $isDark={isDark} title={t('entities:form.confirmSubmit')} extra={<CheckOutlined />}>
      <StyledAlert $isDark={isDark} message={t('entities:form.confirmInfoMessage')} type="info" showIcon />
      <Tabs
        items={[
          {
            key: 'basic',
            label: t('entities:form.basicInfo'),
            children: (
              <div style={{ padding: '16px 0' }}>
                <p>
                  <strong>{t('entities:form.entityName')}：</strong>
                  {form.getFieldValue('name')}
                </p>
                <p>
                  <strong>{t('entities:form.entityType')}：</strong>
                  {(() => {
                    const selectedType = form.getFieldValue('type');
                    // 优先从后端枚举数据中查找
                    const backendType = entityTypes.find(t => t.value === selectedType);
                    if (backendType) {
                      return backendType.label;
                    }
                    // 备用：从mock数据中查找
                    return mockEntityTypes.find(t => t.value === selectedType)?.label || selectedType;
                  })()}
                </p>
                <p>
                  <strong>{t('entities:form.belongsToPlane')}：</strong>
                  {planeOptions.find(p => p.value === form.getFieldValue('plane'))?.label}
                </p>
                <p>
                  <strong>{t('entities:form.entityStatus')}：</strong>
                  {form.getFieldValue('entityStatus')}
                </p>
                <p>
                  <strong>{t('entities:form.tags')}：</strong>
                  <TagContainer $isDark={isDark}>
                    {form.getFieldValue('tags')?.map((tag: string) => <Tag key={tag}>{tag}</Tag>) ||
                      t('entities:form.none')}
                  </TagContainer>
                </p>
                <p>
                  <strong>{t('common:description')}：</strong>
                  {form.getFieldValue('description')}
                </p>
              </div>
            )
          },
          {
            key: 'config',
            label: t('entities:form.configInfo'),
            children: (
              <div style={{ padding: '16px 0' }}>
                <strong>属性配置：</strong>
                {(() => {
                  const properties = form.getFieldValue('properties') || [];
                  if (properties.length === 0) {
                    return <p style={{ color: '#999', marginTop: 8 }}>暂无配置属性</p>;
                  }
                  return (
                    <div style={{ marginTop: 8 }}>
                      {properties.map((prop: { key: string; value: string }, index: number) => (
                        <p key={index} style={{ margin: '4px 0', paddingLeft: 16 }}>
                          <strong>{prop.key}:</strong> {prop.value}
                        </p>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )
          }
        ]}
      />
    </StyledCard>
  );

  return (
    <PageContainer $isDark={isDark}>
      <ContentWrapper $isDark={isDark}>
        {/* 面包屑导航 */}
        <StyledBreadcrumb $isDark={isDark}>
          <Breadcrumb.Item>
            <Button type="text" icon={<HomeOutlined />} onClick={() => navigate('/entities')}>
              {t('menu:entities')}
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Space>
              <NodeIndexOutlined />
              {mode === 'create' ? t('entities:createTitle') : t('entities:editTitle')}
            </Space>
          </Breadcrumb.Item>
        </StyledBreadcrumb>

        {/* 页面标题 */}
        <StyledTitle $isDark={isDark} level={2}>
          <Space>
            <NodeIndexOutlined />
            {mode === 'create' ? t('entities:createTitle') : t('entities:editTitle')}
          </Space>
        </StyledTitle>

        {/* 步骤条 */}
        <StyledCard $isDark={isDark}>
          <StyledSteps $isDark={isDark} current={currentStep} items={steps} />
        </StyledCard>

        {/* 表单内容 */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            entityStatus: 'ACTIVE'
          }}
        >
          {currentStep === 0 && renderBasicInfo()}
          {currentStep === 1 && renderConfigInfo()}
          {currentStep === 2 && renderConfirmInfo()}

          {/* 操作按钮 */}
          <StyledCard $isDark={isDark}>
            <ActionButtons>
              <div className="left-buttons">
                {currentStep > 0 && (
                  <Button onClick={() => setCurrentStep(currentStep - 1)}>{t('entities:form.previousStep')}</Button>
                )}
              </div>
              <div className="right-buttons">
                <Button onClick={handleBack}>{t('common:cancel')}</Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                    {t('entities:form.nextStep')}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    loading={loading}
                    icon={<SaveOutlined />}
                    onClick={() => {
                      form
                        .validateFields()
                        .then(values => {
                          handleSubmit(values);
                        })
                        .catch(errorInfo => {
                          console.log('表单验证失败:', errorInfo);
                          message.error(t('entities:form.validationFailed'));
                        });
                    }}
                  >
                    {mode === 'create' ? t('entities:form.createEntity') : t('entities:form.updateEntity')}
                  </Button>
                )}
              </div>
            </ActionButtons>
          </StyledCard>
        </Form>
      </ContentWrapper>
    </PageContainer>
  );
};

export default EntityForm;
