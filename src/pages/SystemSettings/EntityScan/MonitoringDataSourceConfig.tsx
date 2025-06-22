import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Space,
  Typography,
  Alert,
  Tabs,
  Card,
  Tag,
  Button,
  Divider
} from 'antd';
import {
  LineChartOutlined,
  DashboardOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MonitorOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface MonitoringDataSourceConfigProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (config: any) => void;
  dataSource?: any;
}

const MonitoringDataSourceConfig: React.FC<MonitoringDataSourceConfigProps> = ({
  visible,
  onCancel,
  onOk,
  dataSource
}) => {
  const { t } = useTranslation(['entityScan', 'common']);
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState<string>('prometheus');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  // 监控系统类型配置
  const monitoringTypes = [
    {
      key: 'prometheus',
      name: t('entityScan:dataSourceConfig.types.prometheus.name'),
      icon: <LineChartOutlined style={{ color: '#e6522c' }} />,
      description: t('entityScan:dataSourceConfig.types.prometheus.description'),
      defaultPort: 9090,
      features: t('entityScan:dataSourceConfig.types.prometheus.features', { returnObjects: true })
    },
    {
      key: 'grafana',
      name: t('entityScan:dataSourceConfig.types.grafana.name'),
      icon: <DashboardOutlined style={{ color: '#f46800' }} />,
      description: t('entityScan:dataSourceConfig.types.grafana.description'),
      defaultPort: 3000,
      features: t('entityScan:dataSourceConfig.types.grafana.features', { returnObjects: true })
    },
    {
      key: 'elasticsearch',
      name: t('entityScan:dataSourceConfig.types.elasticsearch.name'),
      icon: <FileTextOutlined style={{ color: '#005571' }} />,
      description: t('entityScan:dataSourceConfig.types.elasticsearch.description'),
      defaultPort: 9200,
      features: t('entityScan:dataSourceConfig.types.elasticsearch.features', { returnObjects: true })
    },
    {
      key: 'influxdb',
      name: t('entityScan:dataSourceConfig.types.influxdb.name'),
      icon: <BarChartOutlined style={{ color: '#22adf6' }} />,
      description: t('entityScan:dataSourceConfig.types.influxdb.description'),
      defaultPort: 8086,
      features: t('entityScan:dataSourceConfig.types.influxdb.features', { returnObjects: true })
    },
    {
      key: 'jaeger',
      name: t('entityScan:dataSourceConfig.types.jaeger.name'),
      icon: <BarChartOutlined style={{ color: '#60d0e4' }} />,
      description: t('entityScan:dataSourceConfig.types.jaeger.description'),
      defaultPort: 16686,
      features: t('entityScan:dataSourceConfig.types.jaeger.features', { returnObjects: true })
    },
    {
      key: 'zabbix',
      name: t('entityScan:dataSourceConfig.types.zabbix.name'),
      icon: <MonitorOutlined style={{ color: '#d40000' }} />,
      description: t('entityScan:dataSourceConfig.types.zabbix.description'),
      defaultPort: 80,
      features: t('entityScan:dataSourceConfig.types.zabbix.features', { returnObjects: true })
    },
    {
      key: 'datadog',
      name: t('entityScan:dataSourceConfig.types.datadog.name'),
      icon: <LineChartOutlined style={{ color: '#632ca6' }} />,
      description: t('entityScan:dataSourceConfig.types.datadog.description'),
      defaultPort: 443,
      features: t('entityScan:dataSourceConfig.types.datadog.features', { returnObjects: true })
    }
  ];

  const currentType = monitoringTypes.find(type => type.key === selectedType);

  // 测试连接
  const handleTestConnection = async () => {
    try {
      setTesting(true);
      const values = await form.validateFields();
      
      // 模拟测试连接
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟测试结果
      const success = Math.random() > 0.3;
      setTestResult({
        success,
        message: success ? t('entityScan:dataSourceConfig.messages.testSuccess') : t('entityScan:dataSourceConfig.messages.testFailed')
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: t('entityScan:dataSourceConfig.messages.validationFailed')
      });
    } finally {
      setTesting(false);
    }
  };

  // 渲染配置表单
  const renderConfigForm = () => {
    switch (selectedType) {
      case 'prometheus':
        return (
          <>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.url')}
              name={['config', 'url']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.urlRequired') }]}
            >
              <Input placeholder="http://prometheus.example.com:9090" />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.authType')} name={['config', 'authType']}>
              <Select defaultValue="none">
                <Option value="none">{t('entityScan:dataSourceConfig.fields.authNone')}</Option>
                <Option value="basic">{t('entityScan:dataSourceConfig.fields.authBasic')}</Option>
                <Option value="bearer">{t('entityScan:dataSourceConfig.fields.authToken')}</Option>
              </Select>
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.username')} name={['config', 'username']}>
              <Input placeholder={t('entityScan:dataSourceConfig.fields.usernamePlaceholder')} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.password')} name={['config', 'password']}>
              <Input.Password placeholder={t('entityScan:dataSourceConfig.fields.passwordPlaceholder')} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.timeout')} name={['config', 'timeout']}>
              <InputNumber min={1} max={300} defaultValue={30} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.maxSamples')} name={['config', 'maxSamples']}>
              <InputNumber min={1000} max={1000000} defaultValue={50000} />
            </Form.Item>
          </>
        );
      
      case 'grafana':
        return (
          <>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.url')}
              name={['config', 'url']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.urlRequired') }]}
            >
              <Input placeholder="http://grafana.example.com:3000" />
            </Form.Item>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.apiKey')}
              name={['config', 'apiKey']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.apiKeyRequired') }]}
            >
              <Input.Password placeholder="Grafana API Key" />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.orgId')} name={['config', 'orgId']}>
              <InputNumber min={1} defaultValue={1} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.includeDashboards')} name={['config', 'includeDashboards']} valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.includeDataSources')} name={['config', 'includeDataSources']} valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.includeAlerts')} name={['config', 'includeAlerts']} valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        );
      
      case 'elasticsearch':
        return (
          <>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.cluster')}
              name={['config', 'hosts']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.clusterRequired') }]}
            >
              <TextArea 
                placeholder="http://es1.example.com:9200&#10;http://es2.example.com:9200"
                rows={3}
              />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.username')} name={['config', 'username']}>
              <Input placeholder="elastic" />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.password')} name={['config', 'password']}>
              <Input.Password placeholder={t('entityScan:dataSourceConfig.fields.passwordPlaceholder')} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.indices')} name={['config', 'indices']}>
              <TextArea 
                placeholder="app-logs-*&#10;access-logs-*&#10;error-logs-*"
                rows={3}
              />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.version')} name={['config', 'version']}>
              <Select defaultValue="8.x">
                <Option value="7.x">7.x</Option>
                <Option value="8.x">8.x</Option>
              </Select>
            </Form.Item>
          </>
        );
      
      case 'influxdb':
        return (
          <>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.url')}
              name={['config', 'url']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.urlRequired') }]}
            >
              <Input placeholder="http://influxdb.example.com:8086" />
            </Form.Item>
            <Form.Item
              label={t('entityScan:dataSourceConfig.fields.database')}
              name={['config', 'database']}
              rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.databaseRequired') }]}
            >
              <Input placeholder="metrics" />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.username')} name={['config', 'username']}>
              <Input placeholder={t('entityScan:dataSourceConfig.fields.usernamePlaceholder')} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.password')} name={['config', 'password']}>
              <Input.Password placeholder={t('entityScan:dataSourceConfig.fields.passwordPlaceholder')} />
            </Form.Item>
            <Form.Item label={t('entityScan:dataSourceConfig.fields.retention')} name={['config', 'retention']}>
              <Input placeholder="30d" />
            </Form.Item>
          </>
        );
      
      default:
        return (
          <Alert
            message={t('entityScan:dataSourceConfig.configForm')}
            description={t('entityScan:dataSourceConfig.selectTypeDescription')}
            type="info"
            showIcon
          />
        );
    }
  };

  return (
    <Modal
      title={t('entityScan:dataSourceConfig.title')}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={t('common:save')}
      cancelText={t('common:cancel')}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onOk}
        initialValues={dataSource}
      >
        <Tabs activeKey={selectedType} onChange={setSelectedType}>
          {monitoringTypes.map(type => (
            <TabPane
              tab={
                <Space>
                  {type.icon}
                  {type.name}
                </Space>
              }
              key={type.key}
            >
              <Card size="small" style={{ marginBottom: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {type.icon}
                    <Title level={5} style={{ margin: 0 }}>{type.name}</Title>
                  </div>
                  <Paragraph style={{ margin: 0, color: '#666' }}>
                    {type.description}
                  </Paragraph>
                  <div>
                    <Text strong>{t('entityScan:dataSourceConfig.mainFeatures')}: </Text>
                    {type.features.map(feature => (
                      <Tag key={feature} color="blue" style={{ margin: '2px' }}>
                        {feature}
                      </Tag>
                    ))}
                  </div>
                </Space>
              </Card>

              <Form.Item
                label={t('entityScan:dataSourceConfig.fields.name')}
                name="name"
                rules={[{ required: true, message: t('entityScan:dataSourceConfig.fields.nameRequired') }]}
              >
                <Input placeholder={`${type.name}${t('entityScan:dataSourceConfig.fields.namePlaceholder')}`} />
              </Form.Item>

              <Form.Item label={t('entityScan:dataSourceConfig.fields.description')} name="description">
                <TextArea 
                  placeholder={`${type.name}${t('entityScan:dataSourceConfig.fields.descriptionPlaceholder')}`}
                  rows={2}
                />
              </Form.Item>

              <Divider />

              {renderConfigForm()}

              <Divider />

              <Space>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={handleTestConnection}
                  loading={testing}
                >
                  {t('entityScan:dataSourceConfig.testConnection')}
                </Button>
                {testResult && (
                  <Alert
                    message={testResult.message}
                    type={testResult.success ? 'success' : 'error'}
                    showIcon
                    icon={testResult.success ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                    style={{ flex: 1 }}
                  />
                )}
              </Space>
            </TabPane>
          ))}
        </Tabs>
      </Form>
    </Modal>
  );
};

export default MonitoringDataSourceConfig;
