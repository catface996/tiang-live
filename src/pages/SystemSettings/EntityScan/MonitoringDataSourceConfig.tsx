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
  TestTubeOutlined,
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
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState<string>('prometheus');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  // 监控系统类型配置
  const monitoringTypes = [
    {
      key: 'prometheus',
      name: 'Prometheus',
      icon: <LineChartOutlined style={{ color: '#e6522c' }} />,
      description: '开源监控和告警工具，专注于时序数据收集',
      defaultPort: 9090,
      features: ['时序数据', '指标收集', 'PromQL查询', '告警规则']
    },
    {
      key: 'grafana',
      name: 'Grafana',
      icon: <DashboardOutlined style={{ color: '#f46800' }} />,
      description: '开源可视化和分析平台，支持多种数据源',
      defaultPort: 3000,
      features: ['仪表板', '数据源管理', '告警配置', '用户管理']
    },
    {
      key: 'elasticsearch',
      name: 'Elasticsearch',
      icon: <FileTextOutlined style={{ color: '#005571' }} />,
      description: '分布式搜索和分析引擎，适用于日志分析',
      defaultPort: 9200,
      features: ['全文搜索', '日志分析', '聚合查询', '索引管理']
    },
    {
      key: 'influxdb',
      name: 'InfluxDB',
      icon: <BarChartOutlined style={{ color: '#22adf6' }} />,
      description: '专为时序数据设计的数据库',
      defaultPort: 8086,
      features: ['时序存储', '高性能写入', 'SQL查询', '数据压缩']
    },
    {
      key: 'jaeger',
      name: 'Jaeger',
      icon: <BarChartOutlined style={{ color: '#60d0e4' }} />,
      description: '分布式链路追踪系统',
      defaultPort: 16686,
      features: ['链路追踪', '性能分析', '依赖分析', '服务拓扑']
    },
    {
      key: 'zabbix',
      name: 'Zabbix',
      icon: <MonitorOutlined style={{ color: '#d40000' }} />,
      description: '企业级监控解决方案',
      defaultPort: 80,
      features: ['主机监控', '网络监控', '应用监控', '告警通知']
    },
    {
      key: 'datadog',
      name: 'Datadog',
      icon: <LineChartOutlined style={{ color: '#632ca6' }} />,
      description: '云原生监控和分析平台',
      defaultPort: 443,
      features: ['APM', '日志管理', '基础设施监控', '安全监控']
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
        message: success ? '连接测试成功！' : '连接失败，请检查配置参数。'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: '配置验证失败，请检查必填项。'
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
              label="Prometheus URL"
              name={['config', 'url']}
              rules={[{ required: true, message: '请输入Prometheus地址' }]}
            >
              <Input placeholder="http://prometheus.example.com:9090" />
            </Form.Item>
            <Form.Item label="认证方式" name={['config', 'authType']}>
              <Select defaultValue="none">
                <Option value="none">无认证</Option>
                <Option value="basic">Basic Auth</Option>
                <Option value="bearer">Bearer Token</Option>
              </Select>
            </Form.Item>
            <Form.Item label="用户名" name={['config', 'username']}>
              <Input placeholder="用户名（可选）" />
            </Form.Item>
            <Form.Item label="密码" name={['config', 'password']}>
              <Input.Password placeholder="密码（可选）" />
            </Form.Item>
            <Form.Item label="查询超时(秒)" name={['config', 'timeout']}>
              <InputNumber min={1} max={300} defaultValue={30} />
            </Form.Item>
            <Form.Item label="最大样本数" name={['config', 'maxSamples']}>
              <InputNumber min={1000} max={1000000} defaultValue={50000} />
            </Form.Item>
          </>
        );
      
      case 'grafana':
        return (
          <>
            <Form.Item
              label="Grafana URL"
              name={['config', 'url']}
              rules={[{ required: true, message: '请输入Grafana地址' }]}
            >
              <Input placeholder="http://grafana.example.com:3000" />
            </Form.Item>
            <Form.Item
              label="API Key"
              name={['config', 'apiKey']}
              rules={[{ required: true, message: '请输入API Key' }]}
            >
              <Input.Password placeholder="Grafana API Key" />
            </Form.Item>
            <Form.Item label="组织ID" name={['config', 'orgId']}>
              <InputNumber min={1} defaultValue={1} />
            </Form.Item>
            <Form.Item label="包含仪表板" name={['config', 'includeDashboards']} valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label="包含数据源" name={['config', 'includeDataSources']} valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label="包含告警规则" name={['config', 'includeAlerts']} valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        );
      
      case 'elasticsearch':
        return (
          <>
            <Form.Item
              label="Elasticsearch集群"
              name={['config', 'hosts']}
              rules={[{ required: true, message: '请输入集群地址' }]}
            >
              <TextArea 
                placeholder="http://es1.example.com:9200&#10;http://es2.example.com:9200"
                rows={3}
              />
            </Form.Item>
            <Form.Item label="用户名" name={['config', 'username']}>
              <Input placeholder="elastic" />
            </Form.Item>
            <Form.Item label="密码" name={['config', 'password']}>
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item label="索引模式" name={['config', 'indices']}>
              <TextArea 
                placeholder="app-logs-*&#10;access-logs-*&#10;error-logs-*"
                rows={3}
              />
            </Form.Item>
            <Form.Item label="版本" name={['config', 'version']}>
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
              label="InfluxDB URL"
              name={['config', 'url']}
              rules={[{ required: true, message: '请输入InfluxDB地址' }]}
            >
              <Input placeholder="http://influxdb.example.com:8086" />
            </Form.Item>
            <Form.Item
              label="数据库名"
              name={['config', 'database']}
              rules={[{ required: true, message: '请输入数据库名' }]}
            >
              <Input placeholder="metrics" />
            </Form.Item>
            <Form.Item label="用户名" name={['config', 'username']}>
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item label="密码" name={['config', 'password']}>
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item label="保留策略" name={['config', 'retention']}>
              <Input placeholder="30d" />
            </Form.Item>
          </>
        );
      
      default:
        return (
          <Alert
            message="配置表单"
            description="请选择具体的监控系统类型以显示相应的配置选项。"
            type="info"
            showIcon
          />
        );
    }
  };

  return (
    <Modal
      title="监控系统数据源配置"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
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
                    <Text strong>主要功能: </Text>
                    {type.features.map(feature => (
                      <Tag key={feature} color="blue" style={{ margin: '2px' }}>
                        {feature}
                      </Tag>
                    ))}
                  </div>
                </Space>
              </Card>

              <Form.Item
                label="数据源名称"
                name="name"
                rules={[{ required: true, message: '请输入数据源名称' }]}
              >
                <Input placeholder={`${type.name}数据源`} />
              </Form.Item>

              <Form.Item label="描述" name="description">
                <TextArea 
                  placeholder={`${type.name}监控系统数据源`}
                  rows={2}
                />
              </Form.Item>

              <Divider />

              {renderConfigForm()}

              <Divider />

              <Space>
                <Button
                  icon={<TestTubeOutlined />}
                  onClick={handleTestConnection}
                  loading={testing}
                >
                  测试连接
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
