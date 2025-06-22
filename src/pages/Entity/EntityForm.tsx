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
  Divider,
  Tag,
  Switch,
  InputNumber,
  message,
  Steps,
  Alert,
  Tabs,
  Breadcrumb
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
  HomeOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 样式化组件
const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
    
    .ant-breadcrumb-link {
      display: flex;
      align-items: center;
      line-height: 1;
    }
    
    .ant-breadcrumb-separator {
      display: flex;
      align-items: center;
      line-height: 1;
      margin: 0 8px;
    }
  }
`;

const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const IconSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const IconOption = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.selected ? '#1890ff' : '#d9d9d9'};
  border-radius: 6px;
  cursor: pointer;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
    background: #e6f7ff;
  }

  .anticon {
    font-size: 18px;
    color: ${props => props.selected ? '#1890ff' : '#666'};
  }
`;

const EntityForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('ApiOutlined');

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

  // 实体类型选项
  const entityTypes = [
    { value: 'microservice', label: t('entities.types.microservice'), icon: <ApiOutlined /> },
    { value: 'database', label: t('entities.types.database'), icon: <DatabaseOutlined /> },
    { value: 'table', label: t('entities.types.table'), icon: <TableOutlined /> },
    { value: 'api', label: t('entities.types.api'), icon: <CloudServerOutlined /> },
    { value: 'middleware', label: t('entities.types.middleware'), icon: <DeploymentUnitOutlined /> },
    { value: 'businessSystem', label: t('entities.types.businessSystem'), icon: <AppstoreOutlined /> },
    { value: 'configuration', label: t('entities.types.configuration'), icon: <SettingOutlined /> }
  ];

  // 平面选项
  const planeOptions = [
    { value: 'user-plane', label: t('planes.userPlane') },
    { value: 'order-plane', label: t('planes.orderPlane') },
    { value: 'payment-plane', label: t('planes.paymentPlane') },
    { value: 'product-plane', label: t('planes.productPlane') },
    { value: 'inventory-plane', label: t('planes.inventoryPlane') }
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
        name: t('entities.form.entityName'),
        type: 'microservice',
        plane: 'user-plane',
        description: t('entities.form.descriptionPlaceholder'),
        icon: 'ApiOutlined',
        tags: [t('common.coreService'), t('common.userManagement')],
        status: 'active',
        version: '1.2.0',
        port: 8080,
        healthCheckUrl: '/health',
        dependencies: [t('common.database'), t('common.redisCache')],
        attributes: {
          language: 'Java',
          framework: 'Spring Boot',
          database: 'MySQL'
        }
      };

      form.setFieldsValue(mockData);
      setSelectedIcon(mockData.icon);
    } catch (error) {
      message.error(t('entities.form.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const submitData = {
        ...values,
        icon: selectedIcon
      };

      console.log('提交数据:', submitData);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success(mode === 'create' ? t('entities.form.createSuccess') : t('entities.form.updateSuccess'));
      navigate('/entities');
    } catch (error) {
      message.error(mode === 'create' ? t('entities.form.createFailed') : t('entities.form.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/entities');
  };

  const steps = [
    {
      title: t('entities.form.basicInfo'),
      description: t('entities.form.basicInfoDesc')
    },
    {
      title: t('entities.form.configInfo'),
      description: t('entities.form.configInfoDesc')
    },
    {
      title: t('entities.form.confirmSubmit'),
      description: t('entities.form.confirmSubmitDesc')
    }
  ];

  const renderBasicInfo = () => (
    <StyledCard title={t('entities.form.basicInfo')} extra={<InfoCircleOutlined />}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label={t('entities.form.entityName')}
            rules={[
              { required: true, message: t('entities.form.entityNameRequired') },
              { max: 50, message: t('entities.form.entityNameMaxLength') }
            ]}
          >
            <Input placeholder={t('entities.form.entityNamePlaceholder')} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="type"
            label={t('entities.form.entityType')}
            rules={[{ required: true, message: t('entities.form.entityTypeRequired') }]}
          >
            <Select placeholder={t('entities.form.entityTypeRequired')}>
              {entityTypes.map(type => (
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
            label={t('entities.form.belongsToPlane')}
            rules={[{ required: true, message: t('entities.form.planeRequired') }]}
          >
            <Select placeholder={t('entities.form.planeRequired')}>
              {planeOptions.map(plane => (
                <Option key={plane.value} value={plane.value}>
                  {plane.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="status"
            label={t('common.status')}
            initialValue="active"
          >
            <Select>
              <Option value="active">{t('common.active')}</Option>
              <Option value="inactive">{t('common.inactive')}</Option>
              <Option value="deprecated">{t('common.deprecated')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="description"
            label={t('common.description')}
            rules={[
              { required: true, message: t('entities.form.descriptionRequired') },
              { max: 500, message: t('entities.form.descriptionMaxLength') }
            ]}
          >
            <TextArea 
              rows={4} 
              placeholder={t('entities.form.descriptionPlaceholder')}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label={t('entities.form.iconSelection')}>
            <IconSelector>
              {iconOptions.map(option => (
                <IconOption
                  key={option.key}
                  selected={selectedIcon === option.key}
                  onClick={() => setSelectedIcon(option.key)}
                >
                  {option.icon}
                </IconOption>
              ))}
            </IconSelector>
          </Form.Item>
        </Col>
      </Row>
    </StyledCard>
  );

  const renderConfigInfo = () => (
    <StyledCard title={t('entities.form.configInfo')} extra={<SettingOutlined />}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="version"
            label={t('entities.form.version')}
          >
            <Input placeholder={t('entities.form.versionPlaceholder')} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="port"
            label={t('entities.form.port')}
          >
            <InputNumber 
              placeholder={t('entities.form.portPlaceholder')} 
              min={1} 
              max={65535} 
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="healthCheckUrl"
            label={t('entities.form.healthCheckUrl')}
          >
            <Input placeholder={t('entities.form.healthCheckUrlPlaceholder')} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="tags"
            label={t('entities.form.tags')}
          >
            <Select
              mode="tags"
              placeholder={t('entities.form.tagsPlaceholder')}
              style={{ width: '100%' }}
            >
              <Option value={t('common.coreService')}>{t('common.coreService')}</Option>
              <Option value={t('common.basicService')}>{t('common.basicService')}</Option>
              <Option value={t('common.businessService')}>{t('common.businessService')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="dependencies"
            label={t('entities.form.dependencies')}
          >
            <Select
              mode="tags"
              placeholder={t('entities.form.dependenciesPlaceholder')}
              style={{ width: '100%' }}
            >
              <Option value={t('common.database')}>{t('common.database')}</Option>
              <Option value={t('common.redisCache')}>{t('common.redisCache')}</Option>
              <Option value={t('common.messageQueue')}>{t('common.messageQueue')}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </StyledCard>
  );

  const renderConfirmInfo = () => (
    <StyledCard title={t('entities.form.confirmSubmit')} extra={<CheckOutlined />}>
      <Alert
        message={t('entities.form.confirmInfoMessage')}
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <Tabs
        items={[
          {
            key: 'basic',
            label: t('entities.form.basicInfo'),
            children: (
              <div>
                <p><strong>{t('entities.form.entityName')}：</strong>{form.getFieldValue('name')}</p>
                <p><strong>{t('entities.form.entityType')}：</strong>{entityTypes.find(t => t.value === form.getFieldValue('type'))?.label}</p>
                <p><strong>{t('entities.form.belongsToPlane')}：</strong>{planeOptions.find(p => p.value === form.getFieldValue('plane'))?.label}</p>
                <p><strong>{t('common.status')}：</strong>{form.getFieldValue('status')}</p>
                <p><strong>{t('common.description')}：</strong>{form.getFieldValue('description')}</p>
              </div>
            )
          },
          {
            key: 'config',
            label: t('entities.form.configInfo'),
            children: (
              <div>
                <p><strong>{t('entities.form.version')}：</strong>{form.getFieldValue('version') || t('entities.form.notSet')}</p>
                <p><strong>{t('entities.form.port')}：</strong>{form.getFieldValue('port') || t('entities.form.notSet')}</p>
                <p><strong>{t('entities.form.healthCheckUrl')}：</strong>{form.getFieldValue('healthCheckUrl') || t('entities.form.notSet')}</p>
                <p><strong>{t('entities.form.tags')}：</strong>{form.getFieldValue('tags')?.join(', ') || t('entities.form.none')}</p>
                <p><strong>{t('entities.form.dependencies')}：</strong>{form.getFieldValue('dependencies')?.join(', ') || t('entities.form.none')}</p>
              </div>
            )
          }
        ]}
      />
    </StyledCard>
  );

  return (
    <PageContainer>
      <FormContainer>
        {/* 面包屑导航 */}
        <BreadcrumbContainer>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Button 
                type="text" 
                icon={<HomeOutlined />}
                onClick={() => navigate('/entities')}
                style={{ 
                  padding: 0, 
                  border: 'none', 
                  background: 'transparent',
                  height: 'auto'
                }}
              >
                {t('menu.entities')}
              </Button>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <NodeIndexOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                {mode === 'create' ? t('entities.createTitle') : t('entities.editTitle')}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </BreadcrumbContainer>

        {/* 页面头部 */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            <Space>
              <NodeIndexOutlined style={{ color: '#1890ff' }} />
              {mode === 'create' ? t('entities.createTitle') : t('entities.editTitle')}
            </Space>
          </Title>
        </div>

        {/* 步骤条 */}
        <StyledCard>
          <Steps
            current={currentStep}
            items={steps}
            style={{ marginBottom: 24 }}
          />
        </StyledCard>

        {/* 表单内容 */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active'
          }}
        >
          {currentStep === 0 && renderBasicInfo()}
          {currentStep === 1 && renderConfigInfo()}
          {currentStep === 2 && renderConfirmInfo()}

          {/* 操作按钮 */}
          <StyledCard>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {currentStep > 0 && (
                  <Button onClick={() => setCurrentStep(currentStep - 1)}>
                    {t('entities.form.previousStep')}
                  </Button>
                )}
              </div>
              <Space>
                <Button onClick={handleBack}>
                  {t('common.cancel')}
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button 
                    type="primary" 
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    {t('entities.form.nextStep')}
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    {mode === 'create' ? t('entities.form.createEntity') : t('entities.form.updateEntity')}
                  </Button>
                )}
              </Space>
            </div>
          </StyledCard>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default EntityForm;
