import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Space,
  Typography,
  Row,
  Col,
  Alert,
  Progress,
  Tag,
  Modal,
  message,
  Divider,
  Tooltip,
  Switch
} from 'antd';
import {
  ScanOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  ApiOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  LineChartOutlined,
  BarChartOutlined,
  MonitorOutlined,
  DashboardOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import { entityScanService } from '../../../services/entityScanService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 样式化组件
const ScanContainer = styled.div`
  padding: 24px;
`;

const ScanCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'
  };
  
  .ant-card-head {
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  }
`;

const StatusTag = styled(Tag)<{ status: string }>`
  font-weight: bold;
  
  ${props => {
    switch (props.status) {
      case 'success':
        return 'background: #f6ffed; border-color: #b7eb8f; color: #52c41a;';
      case 'error':
        return 'background: #fff2f0; border-color: #ffccc7; color: #ff4d4f;';
      case 'warning':
        return 'background: #fffbe6; border-color: #ffe58f; color: #faad14;';
      case 'processing':
        return 'background: #e6f7ff; border-color: #91d5ff; color: #1890ff;';
      default:
        return 'background: #fafafa; border-color: #d9d9d9; color: #595959;';
    }
  }}
`;

// 数据源类型
interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'cloud';
  description: string;
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  lastScan?: string;
  entityCount?: number;
}

// 扫描任务
interface ScanTask {
  id: string;
  name: string;
  dataSourceId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime?: string;
  endTime?: string;
  scannedCount: number;
  generatedCount: number;
  errorCount: number;
  logs: string[];
}

// 扫描结果
interface ScanResult {
  id: string;
  name: string;
  type: string;
  source: string;
  confidence: number;
  attributes: Record<string, any>;
  selected: boolean;
}

const EntityScan: React.FC = () => {
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const isDark = currentTheme === 'dark';

  const [form] = Form.useForm();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [scanTasks, setScanTasks] = useState<ScanTask[]>([]);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [currentTask, setCurrentTask] = useState<ScanTask | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // 加载数据源
  useEffect(() => {
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    try {
      const sources = await entityScanService.getDataSources();
      setDataSources(sources);
    } catch (error) {
      console.error('Failed to load data sources:', error);
      // 如果服务调用失败，使用本地模拟数据
      setDataSources([]);
    }
  };

  // 数据源类型图标
  const getDataSourceIcon = (type: string, subType?: string) => {
    switch (type) {
      case 'database':
        return <DatabaseOutlined />;
      case 'api':
        return <ApiOutlined />;
      case 'cloud':
        return <CloudServerOutlined />;
      case 'monitoring':
        switch (subType) {
          case 'prometheus':
            return <LineChartOutlined style={{ color: '#e6522c' }} />;
          case 'grafana':
            return <DashboardOutlined style={{ color: '#f46800' }} />;
          case 'elasticsearch':
            return <FileTextOutlined style={{ color: '#005571' }} />;
          case 'jaeger':
            return <BarChartOutlined style={{ color: '#60d0e4' }} />;
          case 'zabbix':
            return <MonitorOutlined style={{ color: '#d40000' }} />;
          case 'datadog':
            return <LineChartOutlined style={{ color: '#632ca6' }} />;
          default:
            return <MonitorOutlined />;
        }
      case 'metrics':
        switch (subType) {
          case 'influxdb':
            return <BarChartOutlined style={{ color: '#22adf6' }} />;
          default:
            return <BarChartOutlined />;
        }
      default:
        return <DatabaseOutlined />;
    }
  };

  // 状态标签
  const getStatusTag = (status: string) => {
    const statusMap = {
      connected: { color: 'success', text: '已连接' },
      disconnected: { color: 'default', text: '未连接' },
      error: { color: 'error', text: '连接错误' },
      pending: { color: 'default', text: '等待中' },
      running: { color: 'processing', text: '扫描中' },
      completed: { color: 'success', text: '已完成' },
      failed: { color: 'error', text: '失败' },
      paused: { color: 'warning', text: '已暂停' }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.default;
    return <StatusTag status={config.color}>{config.text}</StatusTag>;
  };

  // 开始扫描
  const handleStartScan = async (values: any) => {
    if (!selectedDataSource) {
      message.error('请选择数据源');
      return;
    }

    const dataSource = dataSources.find(ds => ds.id === selectedDataSource);
    if (!dataSource) {
      message.error('数据源不存在');
      return;
    }

    const newTask: ScanTask = {
      id: `task-${Date.now()}`,
      name: values.taskName || `扫描任务-${dataSource.name}`,
      dataSourceId: selectedDataSource,
      status: 'running',
      progress: 0,
      startTime: new Date().toLocaleString(),
      scannedCount: 0,
      generatedCount: 0,
      errorCount: 0,
      logs: [`开始扫描数据源: ${dataSource.name}`]
    };

    setScanTasks(prev => [newTask, ...prev]);
    setCurrentTask(newTask);
    setIsScanning(true);

    // 模拟扫描过程
    simulateScanProcess(newTask);
    message.success('扫描任务已启动');
  };

  // 模拟扫描过程
  const simulateScanProcess = (task: ScanTask) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // 完成扫描
        const completedTask = {
          ...task,
          status: 'completed' as const,
          progress: 100,
          endTime: new Date().toLocaleString(),
          scannedCount: 156,
          generatedCount: 142,
          errorCount: 3,
          logs: [
            ...task.logs,
            '扫描表结构完成',
            '分析字段关系',
            '生成实体定义',
            '扫描完成'
          ]
        };

        setScanTasks(prev => prev.map(t => t.id === task.id ? completedTask : t));
        setCurrentTask(completedTask);
        setIsScanning(false);

        // 生成模拟结果
        generateMockResults();
        message.success('扫描完成！');
      } else {
        const updatedTask = {
          ...task,
          progress: Math.round(progress),
          scannedCount: Math.round(progress * 1.56),
          generatedCount: Math.round(progress * 1.42),
          logs: [
            ...task.logs,
            `扫描进度: ${Math.round(progress)}%`
          ]
        };
        setScanTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
        setCurrentTask(updatedTask);
      }
    }, 1000);
  };

  // 生成模拟结果
  const generateMockResults = () => {
    const currentDataSource = dataSources.find(ds => ds.id === selectedDataSource);
    let mockResults: ScanResult[] = [];

    if (currentDataSource?.type === 'monitoring') {
      // 监控系统相关实体
      switch (currentDataSource.subType) {
        case 'prometheus':
          mockResults = [
            {
              id: 'metric-1',
              name: 'HTTP请求指标',
              type: 'HttpRequestMetric',
              source: 'http_requests_total',
              confidence: 0.95,
              attributes: {
                method: 'string',
                status_code: 'string',
                endpoint: 'string',
                value: 'counter'
              },
              selected: true
            },
            {
              id: 'metric-2',
              name: 'CPU使用率指标',
              type: 'CpuUsageMetric',
              source: 'cpu_usage_percent',
              confidence: 0.92,
              attributes: {
                instance: 'string',
                cpu: 'string',
                mode: 'string',
                value: 'gauge'
              },
              selected: true
            },
            {
              id: 'metric-3',
              name: '内存使用指标',
              type: 'MemoryMetric',
              source: 'memory_usage_bytes',
              confidence: 0.90,
              attributes: {
                instance: 'string',
                type: 'string',
                value: 'gauge'
              },
              selected: false
            }
          ];
          break;
        case 'grafana':
          mockResults = [
            {
              id: 'dashboard-1',
              name: '系统监控仪表板',
              type: 'Dashboard',
              source: 'System Monitoring',
              confidence: 0.98,
              attributes: {
                id: 'number',
                title: 'string',
                tags: 'array',
                panels: 'array'
              },
              selected: true
            },
            {
              id: 'datasource-1',
              name: 'Prometheus数据源',
              type: 'DataSource',
              source: 'prometheus-prod',
              confidence: 0.95,
              attributes: {
                name: 'string',
                type: 'string',
                url: 'string',
                access: 'string'
              },
              selected: true
            }
          ];
          break;
        case 'elasticsearch':
          mockResults = [
            {
              id: 'log-1',
              name: '应用日志实体',
              type: 'ApplicationLog',
              source: 'app-logs-*',
              confidence: 0.88,
              attributes: {
                timestamp: 'date',
                level: 'string',
                message: 'text',
                service: 'string'
              },
              selected: true
            },
            {
              id: 'log-2',
              name: '访问日志实体',
              type: 'AccessLog',
              source: 'access-logs-*',
              confidence: 0.85,
              attributes: {
                timestamp: 'date',
                ip: 'ip',
                method: 'string',
                url: 'string',
                status: 'integer'
              },
              selected: false
            }
          ];
          break;
        default:
          mockResults = [
            {
              id: 'monitor-1',
              name: '监控指标实体',
              type: 'MonitoringMetric',
              source: '监控系统',
              confidence: 0.85,
              attributes: {
                name: 'string',
                value: 'number',
                timestamp: 'date',
                labels: 'object'
              },
              selected: true
            }
          ];
      }
    } else if (currentDataSource?.type === 'metrics') {
      // 指标数据库相关实体
      mockResults = [
        {
          id: 'timeseries-1',
          name: '时序数据点',
          type: 'TimeSeriesPoint',
          source: 'measurements',
          confidence: 0.93,
          attributes: {
            time: 'timestamp',
            measurement: 'string',
            field_key: 'string',
            field_value: 'float',
            tags: 'object'
          },
          selected: true
        },
        {
          id: 'measurement-1',
          name: '测量指标',
          type: 'Measurement',
          source: 'cpu_usage',
          confidence: 0.90,
          attributes: {
            host: 'string',
            region: 'string',
            usage_idle: 'float',
            usage_system: 'float',
            usage_user: 'float'
          },
          selected: true
        }
      ];
    } else {
      // 默认数据库实体
      mockResults = [
        {
          id: 'entity-1',
          name: '用户实体',
          type: 'User',
          source: 'users表',
          confidence: 0.95,
          attributes: {
            id: 'bigint',
            username: 'varchar(50)',
            email: 'varchar(100)',
            created_at: 'timestamp'
          },
          selected: true
        },
        {
          id: 'entity-2',
          name: '订单实体',
          type: 'Order',
          source: 'orders表',
          confidence: 0.92,
          attributes: {
            id: 'bigint',
            user_id: 'bigint',
            total_amount: 'decimal(10,2)',
            status: 'varchar(20)'
          },
          selected: true
        },
        {
          id: 'entity-3',
          name: '商品实体',
          type: 'Product',
          source: 'products表',
          confidence: 0.88,
          attributes: {
            id: 'bigint',
            name: 'varchar(200)',
            price: 'decimal(8,2)',
            category_id: 'int'
          },
          selected: false
        }
      ];
    }

    setScanResults(mockResults);
  };

  // 数据源表格列
  const dataSourceColumns = [
    {
      title: '数据源',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DataSource) => (
        <Space>
          {getDataSourceIcon(record.type, record.subType)}
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.description}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: DataSource) => {
        const typeMap = {
          database: '数据库',
          api: 'API接口',
          cloud: '云服务',
          monitoring: '监控系统',
          metrics: '指标数据',
          file: '文件'
        };
        
        const subTypeMap = {
          prometheus: 'Prometheus',
          grafana: 'Grafana',
          elasticsearch: 'Elasticsearch',
          jaeger: 'Jaeger',
          zabbix: 'Zabbix',
          datadog: 'Datadog',
          influxdb: 'InfluxDB'
        };
        
        const mainType = typeMap[type as keyof typeof typeMap] || type;
        const subTypeText = record.subType ? subTypeMap[record.subType as keyof typeof subTypeMap] : '';
        
        return (
          <div>
            <div>{mainType}</div>
            {subTypeText && (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {subTypeText}
              </Text>
            )}
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '实体数量',
      dataIndex: 'entityCount',
      key: 'entityCount',
      render: (count: number) => count || 0,
    },
    {
      title: '最后扫描',
      dataIndex: 'lastScan',
      key: 'lastScan',
      render: (time: string) => time || '从未扫描',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DataSource) => (
        <Space>
          <Button
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setShowConfigModal(true)}
          >
            配置
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<ScanOutlined />}
            onClick={() => setSelectedDataSource(record.id)}
            disabled={record.status !== 'connected'}
          >
            选择
          </Button>
        </Space>
      ),
    },
  ];

  // 扫描结果表格列
  const resultColumns = [
    {
      title: '选择',
      dataIndex: 'selected',
      key: 'selected',
      render: (selected: boolean, record: ScanResult) => (
        <Switch
          checked={selected}
          onChange={(checked) => {
            setScanResults(prev =>
              prev.map(r => r.id === record.id ? { ...r, selected: checked } : r)
            );
          }}
        />
      ),
    },
    {
      title: '实体名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ScanResult) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            来源: {record.source}
          </Text>
        </div>
      ),
    },
    {
      title: '实体类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '置信度',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence: number) => (
        <div>
          <Progress
            percent={Math.round(confidence * 100)}
            size="small"
            status={confidence > 0.9 ? 'success' : confidence > 0.7 ? 'normal' : 'exception'}
          />
        </div>
      ),
    },
    {
      title: '属性数量',
      dataIndex: 'attributes',
      key: 'attributes',
      render: (attributes: Record<string, any>) => Object.keys(attributes).length,
    },
  ];

  return (
    <ScanContainer>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <ScanOutlined /> {t('systemSettings.entityScan.title', '实体扫描')}
        </Title>
        <Paragraph>
          {t('systemSettings.entityScan.description', '从外部数据源扫描和生成实体定义，支持数据库、API、云服务等多种数据源类型。')}
        </Paragraph>
      </div>

      {/* 数据源管理 */}
      <ScanCard $isDark={isDark} title="数据源管理">
        <Table
          dataSource={dataSources}
          columns={dataSourceColumns}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </ScanCard>

      {/* 扫描配置 */}
      <ScanCard $isDark={isDark} title="扫描配置">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleStartScan}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="选择数据源"
                name="dataSource"
                rules={[{ required: true, message: '请选择数据源' }]}
              >
                <Select
                  placeholder="请选择要扫描的数据源"
                  value={selectedDataSource}
                  onChange={setSelectedDataSource}
                >
                  {dataSources
                    .filter(ds => ds.status === 'connected')
                    .map(ds => (
                      <Option key={ds.id} value={ds.id}>
                        <Space>
                          {getDataSourceIcon(ds.type, ds.subType)}
                          <span>{ds.name}</span>
                          {ds.subType && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              ({ds.subType})
                            </Text>
                          )}
                        </Space>
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="任务名称"
                name="taskName"
              >
                <Input placeholder="输入扫描任务名称（可选）" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlayCircleOutlined />}
                    loading={isScanning}
                    disabled={!selectedDataSource}
                  >
                    开始扫描
                  </Button>
                  <Button
                    icon={<PauseCircleOutlined />}
                    disabled={!isScanning}
                  >
                    暂停
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => window.location.reload()}
                  >
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ScanCard>

      {/* 扫描进度 */}
      {currentTask && (
        <ScanCard $isDark={isDark} title="扫描进度">
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text strong>{currentTask.name}</Text>
                  {getStatusTag(currentTask.status)}
                </div>
                <Progress
                  percent={currentTask.progress}
                  status={currentTask.status === 'failed' ? 'exception' : 'active'}
                />
              </div>
              <Row gutter={16}>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      {currentTask.scannedCount}
                    </div>
                    <Text type="secondary">已扫描</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      {currentTask.generatedCount}
                    </div>
                    <Text type="secondary">已生成</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                      {currentTask.errorCount}
                    </div>
                    <Text type="secondary">错误</Text>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <div style={{ height: '200px', overflow: 'auto', background: isDark ? '#1f1f1f' : '#fafafa', padding: '12px', borderRadius: '6px' }}>
                <Text strong>扫描日志:</Text>
                {currentTask.logs.map((log, index) => (
                  <div key={index} style={{ fontSize: '12px', marginTop: '4px' }}>
                    <Text type="secondary">[{new Date().toLocaleTimeString()}]</Text> {log}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </ScanCard>
      )}

      {/* 扫描结果 */}
      {scanResults.length > 0 && (
        <ScanCard $isDark={isDark} title="扫描结果">
          <div style={{ marginBottom: 16 }}>
            <Alert
              message={`扫描完成，发现 ${scanResults.length} 个实体，已选择 ${scanResults.filter(r => r.selected).length} 个`}
              type="success"
              showIcon
              action={
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setShowResultModal(true)}
                >
                  生成实体
                </Button>
              }
            />
          </div>
          <Table
            dataSource={scanResults}
            columns={resultColumns}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </ScanCard>
      )}

      {/* 配置模态框 */}
      <Modal
        title="数据源配置"
        open={showConfigModal}
        onCancel={() => setShowConfigModal(false)}
        footer={null}
        width={600}
      >
        <Alert
          message="数据源配置功能"
          description="在这里可以配置数据源的连接参数、认证信息、扫描规则等。"
          type="info"
          showIcon
        />
      </Modal>

      {/* 结果确认模态框 */}
      <Modal
        title="确认生成实体"
        open={showResultModal}
        onCancel={() => setShowResultModal(false)}
        onOk={() => {
          const selectedCount = scanResults.filter(r => r.selected).length;
          message.success(`已生成 ${selectedCount} 个实体定义`);
          setShowResultModal(false);
        }}
        width={800}
      >
        <Alert
          message={`将生成 ${scanResults.filter(r => r.selected).length} 个实体定义`}
          description="生成的实体将添加到实体管理中，您可以进一步编辑和完善这些实体定义。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={scanResults.filter(r => r.selected)}
          columns={resultColumns.filter(col => col.key !== 'selected')}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Modal>
    </ScanContainer>
  );
};

export default EntityScan;
