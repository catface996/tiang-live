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
  Tabs
} from 'antd';
import {
  ArrowLeftOutlined,
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
  DeploymentUnitOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface EntityFormProps {
  mode: 'create' | 'edit';
  entityId?: string;
}

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 12px;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
`;

const IconOption = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.selected ? '#1890ff' : '#d9d9d9'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};

  &:hover {
    border-color: #1890ff;
    background: #e6f7ff;
  }

  .anticon {
    font-size: 20px;
    color: ${props => props.selected ? '#1890ff' : '#666'};
  }
`;

const EntityForm: React.FC<EntityFormProps> = ({ mode, entityId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('NodeIndexOutlined');

  // 使用路由参数中的id，如果没有则使用props中的entityId
  const currentEntityId = id || entityId;

  // 可选图标列表
  const iconOptions = [
    { key: 'NodeIndexOutlined', icon: <NodeIndexOutlined /> },
    { key: 'DatabaseOutlined', icon: <DatabaseOutlined /> },
    { key: 'ApiOutlined', icon: <ApiOutlined /> },
    { key: 'AppstoreOutlined', icon: <AppstoreOutlined /> },
    { key: 'TableOutlined', icon: <TableOutlined /> },
    { key: 'CloudServerOutlined', icon: <CloudServerOutlined /> },
    { key: 'DeploymentUnitOutlined', icon: <DeploymentUnitOutlined /> },
    { key: 'SettingOutlined', icon: <SettingOutlined /> }
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
    { value: 'user-plane', label: '用户平面' },
    { value: 'order-plane', label: '订单平面' },
    { value: 'payment-plane', label: '支付平面' },
    { value: 'product-plane', label: '商品平面' },
    { value: 'inventory-plane', label: '库存平面' }
  ];

  useEffect(() => {
    if (mode === 'edit' && currentEntityId) {
      // 加载实体数据进行编辑
      loadEntityData(currentEntityId);
    }
  }, [mode, currentEntityId]);

  const loadEntityData = async (id: string) => {
    setLoading(true);
    try {
      // 模拟加载数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟数据
      const mockData = {
        name: '用户服务',
        type: 'microservice',
        plane: 'user-plane',
        description: '负责用户注册、登录、个人信息管理等功能的核心微服务',
        icon: 'ApiOutlined',
        tags: ['核心服务', '用户管理'],
        status: 'active',
        version: '1.2.0',
        port: 8080,
        healthCheckUrl: '/health',
        dependencies: ['数据库', 'Redis缓存'],
        attributes: {
          language: 'Java',
          framework: 'Spring Boot',
          database: 'MySQL'
        }
      };

      form.setFieldsValue(mockData);
      setSelectedIcon(mockData.icon);
    } catch (error) {
      message.error('加载实体数据失败');
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
      
      message.success(mode === 'create' ? '实体创建成功' : '实体更新成功');
      navigate('/entities');
    } catch (error) {
      message.error(mode === 'create' ? '创建失败' : '更新失败');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/entities');
  };

  const steps = [
    {
      title: '基本信息',
      description: '设置实体的基本属性'
    },
    {
      title: '配置信息',
      description: '配置实体的详细参数'
    },
    {
      title: '确认提交',
      description: '确认信息并提交'
    }
  ];

  const renderBasicInfo = () => (
    <StyledCard title="基本信息" extra={<InfoCircleOutlined />}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="实体名称"
            rules={[
              { required: true, message: '请输入实体名称' },
              { max: 50, message: '名称不能超过50个字符' }
            ]}
          >
            <Input placeholder="请输入实体名称" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="type"
            label="实体类型"
            rules={[{ required: true, message: '请选择实体类型' }]}
          >
            <Select placeholder="请选择实体类型">
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
            label="所属平面"
            rules={[{ required: true, message: '请选择所属平面' }]}
          >
            <Select placeholder="请选择所属平面">
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
            label="状态"
            initialValue="active"
          >
            <Select>
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
              <Option value="deprecated">已废弃</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="description"
            label="描述"
            rules={[
              { required: true, message: '请输入实体描述' },
              { max: 500, message: '描述不能超过500个字符' }
            ]}
          >
            <TextArea 
              rows={4} 
              placeholder="请详细描述该实体的功能和用途"
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="图标选择">
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
    <StyledCard title="配置信息" extra={<SettingOutlined />}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="version"
            label="版本号"
          >
            <Input placeholder="如：1.0.0" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="port"
            label="端口号"
          >
            <InputNumber 
              placeholder="如：8080" 
              min={1} 
              max={65535} 
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="healthCheckUrl"
            label="健康检查URL"
          >
            <Input placeholder="如：/health" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="tags"
            label="标签"
          >
            <Select
              mode="tags"
              placeholder="添加标签"
              style={{ width: '100%' }}
            >
              <Option value="核心服务">核心服务</Option>
              <Option value="基础服务">基础服务</Option>
              <Option value="业务服务">业务服务</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="dependencies"
            label="依赖关系"
          >
            <Select
              mode="tags"
              placeholder="添加依赖的实体"
              style={{ width: '100%' }}
            >
              <Option value="数据库">数据库</Option>
              <Option value="Redis缓存">Redis缓存</Option>
              <Option value="消息队列">消息队列</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </StyledCard>
  );

  const renderConfirmInfo = () => (
    <StyledCard title="确认信息" extra={<CheckOutlined />}>
      <Alert
        message="请确认以下信息无误后提交"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <Tabs
        items={[
          {
            key: 'basic',
            label: '基本信息',
            children: (
              <div>
                <p><strong>实体名称：</strong>{form.getFieldValue('name')}</p>
                <p><strong>实体类型：</strong>{entityTypes.find(t => t.value === form.getFieldValue('type'))?.label}</p>
                <p><strong>所属平面：</strong>{planeOptions.find(p => p.value === form.getFieldValue('plane'))?.label}</p>
                <p><strong>状态：</strong>{form.getFieldValue('status')}</p>
                <p><strong>描述：</strong>{form.getFieldValue('description')}</p>
              </div>
            )
          },
          {
            key: 'config',
            label: '配置信息',
            children: (
              <div>
                <p><strong>版本号：</strong>{form.getFieldValue('version') || '未设置'}</p>
                <p><strong>端口号：</strong>{form.getFieldValue('port') || '未设置'}</p>
                <p><strong>健康检查URL：</strong>{form.getFieldValue('healthCheckUrl') || '未设置'}</p>
                <p><strong>标签：</strong>{form.getFieldValue('tags')?.join(', ') || '无'}</p>
                <p><strong>依赖关系：</strong>{form.getFieldValue('dependencies')?.join(', ') || '无'}</p>
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
        {/* 页面头部 */}
        <div style={{ marginBottom: 24 }}>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              返回
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <NodeIndexOutlined style={{ color: '#1890ff' }} />
                {mode === 'create' ? '创建实体' : '编辑实体'}
              </Space>
            </Title>
          </Space>
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
                    上一步
                  </Button>
                )}
              </div>
              <Space>
                <Button onClick={handleBack}>
                  取消
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button 
                    type="primary" 
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    下一步
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    {mode === 'create' ? '创建实体' : '更新实体'}
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
