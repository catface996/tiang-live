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
  Switch,
  Badge,
  Statistic
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
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import { entityScanService } from '../../../services/entityScanService';
import MonitoringDataSourceConfig from './MonitoringDataSourceConfig';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 样式化组件
const ScanContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const PageHeaderContent = styled.div`
  flex: 1;
`;

const PageHeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'linear-gradient(145deg, #1a1a1a, #141414)' 
    : 'linear-gradient(145deg, #ffffff, #fafafa)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.06)'
  };
  
  .ant-card-body {
    padding: 20px;
  }
`;

const StatItem = styled.div<{ $isDark: boolean }>`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.03)' 
    : 'rgba(0, 0, 0, 0.02)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.04)'
    };
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${props => props.color || '#1890ff'};
`;

const StatLabel = styled.div<{ $isDark: boolean }>`
  font-size: 14px;
  color: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.65)' 
    : 'rgba(0, 0, 0, 0.65)'
  };
  font-weight: 500;
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

const DataSourceCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'linear-gradient(145deg, #1a1a1a, #141414)' 
    : 'linear-gradient(145deg, #ffffff, #fafafa)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.06)'
  };
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.02)'
  };
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.$isDark 
      ? 'linear-gradient(145deg, #1f1f1f, #1a1a1a)' 
      : 'linear-gradient(145deg, #ffffff, #f8f9fa)'
    };
    border-color: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(24, 144, 255, 0.3)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 6px 20px rgba(0, 0, 0, 0.6), 0 3px 6px rgba(255, 255, 255, 0.08)' 
      : '0 6px 20px rgba(24, 144, 255, 0.15), 0 3px 6px rgba(0, 0, 0, 0.08)'
    };
  }
  
  .ant-card-body {
    padding: 20px;
    background: transparent;
  }
`;

const DataSourceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DataSourceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DataSourceIcon = styled.div<{ type: string; $isDark: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  position: relative;
  background: ${props => {
    switch (props.type) {
      case 'mysql': return 'linear-gradient(135deg, #4479A1, #336791)';
      case 'postgresql': return 'linear-gradient(135deg, #336791, #2E5984)';
      case 'mongodb': return 'linear-gradient(135deg, #47A248, #3E8E41)';
      case 'redis': return 'linear-gradient(135deg, #DC382D, #B92C20)';
      case 'elasticsearch': return 'linear-gradient(135deg, #005571, #004A5C)';
      case 'api': return 'linear-gradient(135deg, #1890ff, #096dd9)';
      case 'file': return 'linear-gradient(135deg, #722ed1, #531dab)';
      default: return 'linear-gradient(135deg, #8c8c8c, #595959)';
    }
  }};
  box-shadow: ${props => props.$isDark 
    ? '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
    : '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    pointer-events: none;
  }
`;

const DataSourceMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DataSourceActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .scan-btn-row {
    display: flex;
    width: 100%;
  }
  
  .action-btn-row {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    
    .ant-btn {
      flex: 1;
      font-size: 12px;
      height: 26px;
      padding: 0 6px;
      border-radius: 4px;
    }
  }
`;

const MetaItem = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  margin: 2px 0;
  font-size: 12px;
`;

const MetaLabel = styled.span<{ $isDark: boolean }>`
  font-weight: 500;
  color: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.65)' 
    : 'rgba(0, 0, 0, 0.65)'
  };
`;

const MetaValue = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.85)' 
    : 'rgba(0, 0, 0, 0.85)'
  };
  font-weight: 500;
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
  const { t } = useTranslation(['entityScan', 'common']);
  const navigate = useNavigate();
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
  const [showDataSourceConfig, setShowDataSourceConfig] = useState(false);
  
  // 搜索和筛选状态
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // 统计数据
  const getStatistics = () => {
    const totalDataSources = dataSources.length;
    const connectedDataSources = dataSources.filter(ds => ds.status === 'connected').length;
    const totalEntities = scanResults.length;
    const selectedEntities = scanResults.filter(r => r.selected).length;
    const completedScans = scanTasks.filter(task => task.status === 'completed').length;
    const runningScans = scanTasks.filter(task => task.status === 'running').length;

    return {
      totalDataSources,
      connectedDataSources,
      totalEntities,
      selectedEntities,
      completedScans,
      runningScans
    };
  };

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
      connected: { color: 'success', text: t('entityScan:dataSources.connected') },
      disconnected: { color: 'default', text: t('entityScan:dataSources.disconnected') },
      error: { color: 'error', text: t('entityScan:dataSources.error') },
      pending: { color: 'default', text: t('entityScan:status.pending') },
      running: { color: 'processing', text: t('entityScan:status.running') },
      completed: { color: 'success', text: t('entityScan:status.completed') },
      failed: { color: 'error', text: t('entityScan:status.failed') },
      paused: { color: 'warning', text: t('entityScan:status.paused') }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.disconnected;
    return <StatusTag status={config.color}>{config.text}</StatusTag>;
  };

  // 开始扫描
  const handleStartScan = async (values: any) => {
    if (!selectedDataSource) {
      message.error(t('entityScan:messages.selectDataSourceFirst'));
      return;
    }

    const dataSource = dataSources.find(ds => ds.id === selectedDataSource);
    if (!dataSource) {
      message.error(t('entityScan:messages.dataSourceNotFound'));
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
    message.success(t('entityScan:messages.scanStarted'));
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

  // 获取数据源类型映射
  const getDataSourceTypeMap = () => ({
    database: { name: t('entityScan:dataSources.types.database'), color: '#1890ff' },
    api: { name: t('entityScan:dataSources.types.api'), color: '#52c41a' },
    cloud: { name: t('entityScan:dataSources.types.cloud'), color: '#722ed1' },
    monitoring: { name: t('entityScan:dataSources.types.monitoring'), color: '#fa8c16' },
    metrics: { name: t('entityScan:dataSources.types.metrics'), color: '#13c2c2' },
    file: { name: t('entityScan:dataSources.types.file'), color: '#eb2f96' }
  });

  const getDataSourceSubTypeMap = () => ({
    mysql: 'MySQL',
    postgresql: 'PostgreSQL', 
    mongodb: 'MongoDB',
    redis: 'Redis',
    elasticsearch: 'Elasticsearch',
    prometheus: 'Prometheus',
    grafana: 'Grafana',
    jaeger: 'Jaeger',
    zabbix: 'Zabbix',
    datadog: 'Datadog',
    influxdb: 'InfluxDB'
  });

  // 获取状态配置
  const getStatusConfig = (status: string) => {
    const statusMap = {
      connected: { text: t('entityScan:dataSources.connected'), color: 'success', icon: <CheckCircleOutlined /> },
      disconnected: { text: t('entityScan:dataSources.disconnected'), color: 'error', icon: <ExclamationCircleOutlined /> },
      connecting: { text: t('entityScan:dataSources.connecting'), color: 'processing', icon: <ReloadOutlined spin /> },
      error: { text: t('entityScan:dataSources.error'), color: 'error', icon: <ExclamationCircleOutlined /> }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.disconnected;
  };

  // 过滤数据源
  const getFilteredDataSources = () => {
    return dataSources.filter(ds => {
      const matchesSearch = !searchText || 
        ds.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ds.description.toLowerCase().includes(searchText.toLowerCase()) ||
        ds.host.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesType = filterType === 'all' || ds.type === filterType;
      const matchesStatus = filterStatus === 'all' || ds.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  // 渲染数据源卡片
  const renderDataSourceCards = () => {
    const filteredDataSources = getFilteredDataSources();
    const typeMap = getDataSourceTypeMap();
    const subTypeMap = getDataSourceSubTypeMap();

    return filteredDataSources.map(dataSource => {
      const statusConfig = getStatusConfig(dataSource.status);
      const typeConfig = typeMap[dataSource.type as keyof typeof typeMap];
      
      return (
        <Col xs={24} sm={12} lg={8} key={dataSource.id}>
          <DataSourceCard $isDark={isDark}>
            <DataSourceHeader>
              <DataSourceInfo>
                <DataSourceIcon type={dataSource.subType || dataSource.type} $isDark={isDark}>
                  {getDataSourceIcon(dataSource.type, dataSource.subType)}
                </DataSourceIcon>
                <div>
                  <Title level={5} style={{ margin: 0, fontSize: '16px' }}>
                    {dataSource.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {subTypeMap[dataSource.subType as keyof typeof subTypeMap] || typeConfig?.name}
                  </Text>
                </div>
              </DataSourceInfo>
              <Badge 
                status={statusConfig.color as any} 
                text={statusConfig.text}
              />
            </DataSourceHeader>

            <DataSourceMeta>
              {getDataSourceCardInfo(dataSource).map((info, index) => (
                <MetaItem key={index} $isDark={isDark}>
                  <MetaLabel $isDark={isDark}>{info.label}:</MetaLabel>
                  <MetaValue $isDark={isDark}>{info.value}</MetaValue>
                </MetaItem>
              ))}
            </DataSourceMeta>

            <Divider style={{ margin: '12px 0' }} />

            <DataSourceActions>
              <div className="action-btn-row">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDataSource(dataSource)}
                  title={t('common:view')}
                />
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EditOutlined />}
                  onClick={() => handleEditDataSource(dataSource)}
                  title={t('common:edit')}
                />
                <Button 
                  type="text" 
                  size="small" 
                  icon={<ReloadOutlined />}
                  onClick={() => handleTestConnection(dataSource)}
                  loading={dataSource.status === 'connecting'}
                  title={t('entityScan:dataSources.testConnection')}
                />
                <Button 
                  type="text" 
                  size="small" 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteDataSource(dataSource)}
                  title={t('common:delete')}
                />
                <Button 
                  type="text" 
                  size="small" 
                  icon={<ScanOutlined />}
                  onClick={() => handleStartScanForDataSource(dataSource)}
                  disabled={dataSource.status !== 'connected'}
                  loading={isScanning && selectedDataSource === dataSource.id}
                  title={isScanning && selectedDataSource === dataSource.id ? t('entityScan:status.running') : t('entityScan:scanConfig.startScan')}
                />
              </div>
            </DataSourceActions>
          </DataSourceCard>
        </Col>
      );
    });
  };

  // 根据数据源类型获取卡片显示的关键信息
  const getDataSourceCardInfo = (dataSource: DataSource) => {
    const info: Array<{ label: string; value: string }> = [];

    switch (dataSource.type) {
      case 'database':
        info.push(
          { label: t('entityScan:fields.host'), value: `${dataSource.config?.host}:${dataSource.config?.port}` },
          { label: t('entityScan:fields.database'), value: dataSource.config?.database || '-' }
        );
        break;

      case 'api':
        info.push(
          { label: t('entityScan:fields.baseUrl'), value: dataSource.config?.baseUrl || '-' },
          { label: t('entityScan:fields.endpoints'), value: dataSource.config?.endpoints?.length ? t('entityScan:units.endpoints', { count: dataSource.config.endpoints.length }) : '-' }
        );
        break;

      case 'cloud':
        info.push(
          { label: t('entityScan:fields.endpoint'), value: dataSource.config?.endpoint || '-' },
          { label: t('entityScan:fields.bucket'), value: dataSource.config?.bucket || '-' }
        );
        break;

      case 'monitoring':
        switch (dataSource.subType) {
          case 'prometheus':
            info.push(
              { label: t('entityScan:fields.url'), value: dataSource.config?.url || '-' },
              { label: t('entityScan:fields.maxSamples'), value: dataSource.config?.maxSamples?.toString() || '-' }
            );
            break;
          case 'grafana':
            info.push(
              { label: t('entityScan:fields.url'), value: dataSource.config?.url || '-' },
              { label: t('entityScan:fields.orgId'), value: dataSource.config?.orgId?.toString() || '-' }
            );
            break;
          case 'elasticsearch':
            info.push(
              { label: t('entityScan:fields.hosts'), value: dataSource.config?.hosts?.length ? t('entityScan:units.nodes', { count: dataSource.config.hosts.length }) : '-' },
              { label: t('entityScan:fields.indices'), value: dataSource.config?.indices?.length ? t('entityScan:units.indices', { count: dataSource.config.indices.length }) : '-' }
            );
            break;
          case 'jaeger':
            info.push(
              { label: t('entityScan:fields.queryUrl'), value: dataSource.config?.queryUrl || '-' },
              { label: t('entityScan:fields.services'), value: dataSource.config?.services?.length ? t('entityScan:units.services', { count: dataSource.config.services.length }) : '-' }
            );
            break;
          case 'zabbix':
            info.push(
              { label: t('entityScan:fields.url'), value: dataSource.config?.url || '-' },
              { label: t('entityScan:fields.apiVersion'), value: dataSource.config?.apiVersion || '-' }
            );
            break;
          case 'datadog':
            info.push(
              { label: t('entityScan:fields.site'), value: dataSource.config?.site || '-' },
              { label: t('entityScan:fields.environment'), value: dataSource.config?.env || '-' }
            );
            break;
          default:
            info.push(
              { label: t('entityScan:fields.url'), value: dataSource.config?.url || '-' }
            );
        }
        break;

      case 'metrics':
        switch (dataSource.subType) {
          case 'influxdb':
            info.push(
              { label: t('entityScan:fields.url'), value: dataSource.config?.url || '-' },
              { label: t('entityScan:fields.database'), value: dataSource.config?.database || '-' }
            );
            break;
        }
        break;

      case 'file':
        info.push(
          { label: t('entityScan:fields.path'), value: dataSource.config?.path || '-' },
          { label: t('entityScan:fields.format'), value: dataSource.config?.format || '-' }
        );
        break;

      default:
        info.push(
          { label: t('entityScan:fields.description'), value: dataSource.description || '-' }
        );
    }

    // 添加通用信息
    info.push(
      { label: t('entityScan:dataSources.lastScan'), value: dataSource.lastScan || t('entityScan:status.neverScanned') },
      { label: t('entityScan:dataSources.entityCount'), value: t('entityScan:units.entities', { count: dataSource.entityCount || 0 }) }
    );

    return info;
  };
  const getDataSourceFields = (dataSource: DataSource) => {
    const baseFields = [
      { key: 'name', label: t('entityScan:fields.name'), value: dataSource.name },
      { key: 'type', label: t('entityScan:fields.type'), value: dataSource.type },
      { key: 'subType', label: t('entityScan:fields.subType'), value: dataSource.subType },
      { key: 'status', label: t('entityScan:fields.status'), value: dataSource.status, isStatus: true },
      { key: 'description', label: t('entityScan:fields.description'), value: dataSource.description }
    ];

    // 根据数据源类型添加特定字段
    const specificFields: Array<{ key: string; label: string; value: any; isArray?: boolean }> = [];

    switch (dataSource.type) {
      case 'database':
        specificFields.push(
          { key: 'host', label: t('entityScan:fields.host'), value: `${dataSource.config?.host}:${dataSource.config?.port}` },
          { key: 'database', label: t('entityScan:fields.database'), value: dataSource.config?.database || '-' },
          { key: 'username', label: t('entityScan:fields.username'), value: dataSource.config?.username }
        );
        break;

      case 'api':
        specificFields.push(
          { key: 'baseUrl', label: t('entityScan:fields.baseUrl'), value: dataSource.config?.baseUrl },
          { key: 'endpoints', label: t('entityScan:fields.endpoints'), value: dataSource.config?.endpoints, isArray: true },
          { key: 'apiKey', label: t('entityScan:fields.apiKey'), value: dataSource.config?.apiKey ? '***hidden***' : '-' }
        );
        break;

      case 'cloud':
        specificFields.push(
          { key: 'endpoint', label: t('entityScan:fields.endpoint'), value: dataSource.config?.endpoint },
          { key: 'bucket', label: t('entityScan:fields.bucket'), value: dataSource.config?.bucket },
          { key: 'accessKeyId', label: t('entityScan:fields.accessKeyId'), value: dataSource.config?.accessKeyId ? '***hidden***' : '-' }
        );
        break;

      case 'monitoring':
        switch (dataSource.subType) {
          case 'prometheus':
            specificFields.push(
              { key: 'url', label: t('entityScan:fields.url'), value: dataSource.config?.url },
              { key: 'timeout', label: t('entityScan:fields.timeout'), value: `${dataSource.config?.timeout || 0}ms` },
              { key: 'maxSamples', label: t('entityScan:fields.maxSamples'), value: dataSource.config?.maxSamples }
            );
            break;
          case 'grafana':
            specificFields.push(
              { key: 'url', label: t('entityScan:fields.url'), value: dataSource.config?.url },
              { key: 'orgId', label: t('entityScan:fields.orgId'), value: dataSource.config?.orgId },
              { key: 'includeDashboards', label: t('entityScan:fields.includeDashboards'), value: dataSource.config?.includeDashboards ? t('common:yes') : t('common:no') }
            );
            break;
          case 'elasticsearch':
            specificFields.push(
              { key: 'hosts', label: t('entityScan:fields.hosts'), value: dataSource.config?.hosts, isArray: true },
              { key: 'indices', label: t('entityScan:fields.indices'), value: dataSource.config?.indices, isArray: true },
              { key: 'version', label: t('entityScan:fields.version'), value: dataSource.config?.version }
            );
            break;
          case 'jaeger':
            specificFields.push(
              { key: 'queryUrl', label: t('entityScan:fields.queryUrl'), value: dataSource.config?.queryUrl },
              { key: 'services', label: t('entityScan:fields.services'), value: dataSource.config?.services, isArray: true },
              { key: 'lookback', label: t('entityScan:fields.lookback'), value: dataSource.config?.lookback }
            );
            break;
          case 'zabbix':
            specificFields.push(
              { key: 'url', label: t('entityScan:fields.url'), value: dataSource.config?.url },
              { key: 'apiVersion', label: t('entityScan:fields.apiVersion'), value: dataSource.config?.apiVersion },
              { key: 'hostGroups', label: t('entityScan:fields.hostGroups'), value: dataSource.config?.hostGroups, isArray: true }
            );
            break;
          case 'datadog':
            specificFields.push(
              { key: 'site', label: t('entityScan:fields.site'), value: dataSource.config?.site },
              { key: 'services', label: t('entityScan:fields.services'), value: dataSource.config?.services, isArray: true },
              { key: 'env', label: t('entityScan:fields.environment'), value: dataSource.config?.env }
            );
            break;
        }
        break;

      case 'metrics':
        switch (dataSource.subType) {
          case 'influxdb':
            specificFields.push(
              { key: 'url', label: t('entityScan:fields.url'), value: dataSource.config?.url },
              { key: 'database', label: t('entityScan:fields.database'), value: dataSource.config?.database },
              { key: 'retention', label: t('entityScan:fields.retention'), value: dataSource.config?.retention }
            );
            break;
        }
        break;

      case 'file':
        specificFields.push(
          { key: 'path', label: t('entityScan:fields.path'), value: dataSource.config?.path },
          { key: 'format', label: t('entityScan:fields.format'), value: dataSource.config?.format },
          { key: 'encoding', label: t('entityScan:fields.encoding'), value: dataSource.config?.encoding || 'UTF-8' }
        );
        break;
    }

    return [...baseFields, ...specificFields];
  };

  // 渲染字段值
  const renderFieldValue = (field: { key: string; label: string; value: any; isStatus?: boolean; isArray?: boolean }) => {
    if (field.isStatus) {
      const statusConfig = getStatusConfig(field.value);
      return (
        <Badge 
          status={statusConfig.color as any} 
          text={statusConfig.text}
        />
      );
    }
    
    if (field.isArray && Array.isArray(field.value)) {
      return field.value.join(', ');
    }
    
    return field.value || '-';
  };

  // 数据源操作处理函数
  const handleViewDataSource = (dataSource: DataSource) => {
    const fields = getDataSourceFields(dataSource);
    
    Modal.info({
      title: `${t('entityScan:dataSources.details')} - ${dataSource.name}`,
      width: 600,
      content: (
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 8]}>
            {fields.map(field => (
              <React.Fragment key={field.key}>
                <Col span={8}><strong>{field.label}:</strong></Col>
                <Col span={16}>{renderFieldValue(field)}</Col>
              </React.Fragment>
            ))}
          </Row>
        </div>
      )
    });
  };

  const handleEditDataSource = (dataSource: DataSource) => {
    message.info('编辑数据源功能开发中...');
  };

  const handleTestConnection = async (dataSource: DataSource) => {
    try {
      // 更新状态为连接中
      setDataSources(prev => prev.map(ds => 
        ds.id === dataSource.id ? { ...ds, status: 'connecting' } : ds
      ));

      // 模拟测试连接
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 随机成功或失败
      const isSuccess = Math.random() > 0.3;
      const newStatus = isSuccess ? 'connected' : 'error';
      
      setDataSources(prev => prev.map(ds => 
        ds.id === dataSource.id ? { 
          ...ds, 
          status: newStatus,
          lastConnected: isSuccess ? new Date().toLocaleString() : ds.lastConnected
        } : ds
      ));

      message[isSuccess ? 'success' : 'error'](
        isSuccess ? t('entityScan:messages.connectionTestSuccess') : t('entityScan:messages.connectionTestFailed')
      );
    } catch (error) {
      setDataSources(prev => prev.map(ds => 
        ds.id === dataSource.id ? { ...ds, status: 'error' } : ds
      ));
      message.error(t('entityScan:messages.connectionTestFailed'));
    }
  };

  // 针对单个数据源开始扫描 - 跳转到扫描详情页
  const handleStartScanForDataSource = (dataSource: DataSource) => {
    if (dataSource.status !== 'connected') {
      message.warning(t('entityScan:messages.ensureConnectionFirst'));
      return;
    }

    // 跳转到扫描详情页面
    navigate(`/system-settings/entity-scan/${dataSource.id}`);
  };

  const handleDeleteDataSource = (dataSource: DataSource) => {
    Modal.confirm({
      title: t('common:confirmDelete'),
      content: t('entityScan:messages.confirmDeleteDataSource', { name: dataSource.name }),
      okText: t('common:delete'),
      okType: 'danger',
      cancelText: t('common:cancel'),
      onOk: () => {
        setDataSources(prev => prev.filter(ds => ds.id !== dataSource.id));
        message.success(t('entityScan:messages.dataSourceDeleted'));
      }
    });
  };

  // 刷新数据源列表
  const handleRefreshDataSources = async () => {
    try {
      message.loading(t('entityScan:messages.refreshingDataSources'), 1);
      await loadDataSources();
      message.success(t('entityScan:messages.refreshSuccess'));
    } catch (error) {
      message.error(t('entityScan:messages.refreshFailed'));
    }
  };

  // 创建数据源
  const handleCreateDataSource = () => {
    setShowDataSourceConfig(true);
  };

  // 处理数据源配置保存
  const handleDataSourceConfigSave = (config: any) => {
    console.log('Saving data source config:', config);
    // 这里可以调用API保存数据源配置
    message.success(t('entityScan:messages.dataSourceCreated'));
    setShowDataSourceConfig(false);
    // 刷新数据源列表
    loadDataSources();
  };

  // 处理数据源配置取消
  const handleDataSourceConfigCancel = () => {
    setShowDataSourceConfig(false);
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
      render: (time: string) => time || t('entityScan:status.neverScanned'),
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
      <PageHeader style={{ display: 'block' }}>
        {/* Title和按钮在同一行 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title level={2} style={{ margin: 0 }}>
            <ScanOutlined /> {t('entityScan:title', '实体扫描')}
          </Title>
          <div>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefreshDataSources}
              title={t('entityScan:dataSources.refreshDataSources')}
              style={{ marginRight: 8 }}
            >
              {t('common:refresh')}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateDataSource}
            >
              {t('entityScan:dataSources.addDataSource')}
            </Button>
          </div>
        </div>
        
        {/* Paragraph单独一行，充满宽度 */}
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>
          {t('entityScan:description', '从外部数据源扫描和生成实体定义，支持数据库、API、云服务等多种数据源类型。')}
        </Paragraph>
      </PageHeader>

      {/* 统计数据 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#1890ff">{getStatistics().totalDataSources}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.totalDataSources')}</StatLabel>
          </StatItem>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#52c41a">{getStatistics().connectedDataSources}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.connectedSources')}</StatLabel>
          </StatItem>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#722ed1">{getStatistics().totalEntities}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.totalEntities')}</StatLabel>
          </StatItem>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#fa8c16">{getStatistics().selectedEntities}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.selectedEntities')}</StatLabel>
          </StatItem>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#13c2c2">{getStatistics().completedScans}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.completedScans')}</StatLabel>
          </StatItem>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <StatItem $isDark={isDark}>
            <StatValue color="#eb2f96">{getStatistics().runningScans}</StatValue>
            <StatLabel $isDark={isDark}>{t('entityScan:stats.runningScans')}</StatLabel>
          </StatItem>
        </Col>
      </Row>

      {/* 搜索筛选 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('entityScan:dataSources.searchPlaceholder')}
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: t('entityScan:dataSources.filterByType'),
            width: 120,
            options: [
              { value: 'all', label: t('entityScan:dataSources.allTypes') },
              { value: 'database', label: t('entityScan:dataSources.types.database') },
              { value: 'api', label: t('entityScan:dataSources.types.api') },
              { value: 'cloud', label: t('entityScan:dataSources.types.cloud') },
              { value: 'monitoring', label: t('entityScan:dataSources.types.monitoring') },
              { value: 'metrics', label: t('entityScan:dataSources.types.metrics') },
              { value: 'file', label: t('entityScan:dataSources.types.file') }
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('entityScan:dataSources.filterByStatus'),
            width: 100,
            options: [
              { value: 'all', label: t('entityScan:dataSources.allStatuses') },
              { value: 'connected', label: t('entityScan:dataSources.connected') },
              { value: 'disconnected', label: t('entityScan:dataSources.disconnected') },
              { value: 'connecting', label: t('entityScan:dataSources.connecting') },
              { value: 'error', label: t('entityScan:dataSources.error') }
            ]
          }
        ]}
        onRefresh={() => loadDataSources()}
        style={{ marginBottom: 24 }}
      />

      {/* 数据源 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {renderDataSourceCards()}
      </Row>
      
      {getFilteredDataSources().length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0', 
          color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
          marginBottom: 24
        }}>
          <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <div>{t('entityScan:dataSources.noDataSources')}</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>
            {searchText || filterType !== 'all' || filterStatus !== 'all' 
              ? t('entityScan:dataSources.noMatchingDataSources')
              : t('entityScan:dataSources.configureDataSourcesFirst')
            }
          </div>
        </div>
      )}


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
                    <Text type="secondary">{t('entityScan:progress.scanned')}</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      {currentTask.generatedCount}
                    </div>
                    <Text type="secondary">{t('entityScan:progress.generated')}</Text>
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
              message={t('entityScan:results.scanCompleted', { 
                total: scanResults.length, 
                selected: scanResults.filter(r => r.selected).length 
              })}
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
        title={t('entityScan:results.confirmGenerate')}
        open={showResultModal}
        onCancel={() => setShowResultModal(false)}
        onOk={() => {
          const selectedCount = scanResults.filter(r => r.selected).length;
          message.success(t('entityScan:messages.entitiesGenerated', { count: selectedCount }));
          setShowResultModal(false);
        }}
        width={800}
      >
        <Alert
          message={t('entityScan:results.willGenerate', { count: scanResults.filter(r => r.selected).length })}
          description={t('entityScan:results.generateDescription')}
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

      {/* 数据源配置对话框 */}
      <MonitoringDataSourceConfig
        visible={showDataSourceConfig}
        onCancel={handleDataSourceConfigCancel}
        onOk={handleDataSourceConfigSave}
      />
    </ScanContainer>
  );
};

export default EntityScan;
