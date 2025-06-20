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
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import { entityScanService } from '../../../services/entityScanService';
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
  padding: 6px 12px;
  margin: 2px 0;
  border-radius: 4px;
  font-size: 12px;
  background: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.03)' 
    : 'rgba(0, 0, 0, 0.02)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.04)'
    };
  }
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

  // 获取数据源类型映射
  const getDataSourceTypeMap = () => ({
    database: { name: '数据库', color: '#1890ff' },
    api: { name: 'API接口', color: '#52c41a' },
    cloud: { name: '云服务', color: '#722ed1' },
    monitoring: { name: '监控系统', color: '#fa8c16' },
    metrics: { name: '指标数据', color: '#13c2c2' },
    file: { name: '文件', color: '#eb2f96' }
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
      connected: { text: '已连接', color: 'success', icon: <CheckCircleOutlined /> },
      disconnected: { text: '未连接', color: 'error', icon: <ExclamationCircleOutlined /> },
      connecting: { text: '连接中', color: 'processing', icon: <ReloadOutlined spin /> },
      error: { text: '连接错误', color: 'error', icon: <ExclamationCircleOutlined /> }
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
              <MetaItem $isDark={isDark}>
                <MetaLabel $isDark={isDark}>主机地址:</MetaLabel>
                <MetaValue $isDark={isDark}>{dataSource.host}:{dataSource.port}</MetaValue>
              </MetaItem>
              <MetaItem $isDark={isDark}>
                <MetaLabel $isDark={isDark}>数据库:</MetaLabel>
                <MetaValue $isDark={isDark}>{dataSource.database || '-'}</MetaValue>
              </MetaItem>
              <MetaItem $isDark={isDark}>
                <MetaLabel $isDark={isDark}>最后连接:</MetaLabel>
                <MetaValue $isDark={isDark}>{dataSource.lastConnected || '从未连接'}</MetaValue>
              </MetaItem>
              <MetaItem $isDark={isDark}>
                <MetaLabel $isDark={isDark}>扫描次数:</MetaLabel>
                <MetaValue $isDark={isDark}>{dataSource.scanCount || 0} 次</MetaValue>
              </MetaItem>
            </DataSourceMeta>

            <Divider style={{ margin: '12px 0' }} />

            <DataSourceActions>
              <div className="scan-btn-row">
                <Button 
                  type="primary" 
                  size="small" 
                  icon={<ScanOutlined />}
                  onClick={() => handleStartScanForDataSource(dataSource)}
                  disabled={dataSource.status !== 'connected'}
                  loading={isScanning && selectedDataSource === dataSource.id}
                  block
                >
                  {isScanning && selectedDataSource === dataSource.id ? '扫描中...' : '开始扫描'}
                </Button>
              </div>
              
              <div className="action-btn-row">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDataSource(dataSource)}
                >
                  查看
                </Button>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<EditOutlined />}
                  onClick={() => handleEditDataSource(dataSource)}
                >
                  编辑
                </Button>
                <Button 
                  type="text" 
                  size="small" 
                  icon={<ReloadOutlined />}
                  onClick={() => handleTestConnection(dataSource)}
                  loading={dataSource.status === 'connecting'}
                >
                  测试
                </Button>
                <Button 
                  type="text" 
                  size="small" 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteDataSource(dataSource)}
                >
                  删除
                </Button>
              </div>
            </DataSourceActions>
          </DataSourceCard>
        </Col>
      );
    });
  };

  // 数据源操作处理函数
  const handleViewDataSource = (dataSource: DataSource) => {
    Modal.info({
      title: `数据源详情 - ${dataSource.name}`,
      width: 600,
      content: (
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 8]}>
            <Col span={8}><strong>名称:</strong></Col>
            <Col span={16}>{dataSource.name}</Col>
            <Col span={8}><strong>类型:</strong></Col>
            <Col span={16}>{dataSource.type}</Col>
            <Col span={8}><strong>子类型:</strong></Col>
            <Col span={16}>{dataSource.subType}</Col>
            <Col span={8}><strong>主机:</strong></Col>
            <Col span={16}>{dataSource.host}:{dataSource.port}</Col>
            <Col span={8}><strong>数据库:</strong></Col>
            <Col span={16}>{dataSource.database || '-'}</Col>
            <Col span={8}><strong>用户名:</strong></Col>
            <Col span={16}>{dataSource.username}</Col>
            <Col span={8}><strong>状态:</strong></Col>
            <Col span={16}>
              <Badge 
                status={getStatusConfig(dataSource.status).color as any} 
                text={getStatusConfig(dataSource.status).text}
              />
            </Col>
            <Col span={8}><strong>描述:</strong></Col>
            <Col span={16}>{dataSource.description}</Col>
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
        isSuccess ? '连接测试成功！' : '连接测试失败，请检查配置。'
      );
    } catch (error) {
      setDataSources(prev => prev.map(ds => 
        ds.id === dataSource.id ? { ...ds, status: 'error' } : ds
      ));
      message.error('连接测试失败！');
    }
  };

  // 针对单个数据源开始扫描
  const handleStartScanForDataSource = async (dataSource: DataSource) => {
    if (dataSource.status !== 'connected') {
      message.warning('请先确保数据源连接正常！');
      return;
    }

    try {
      setIsScanning(true);
      setSelectedDataSource(dataSource.id);
      
      message.loading('正在启动扫描任务...', 1);
      
      // 模拟扫描过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 创建扫描任务
      const newTask: ScanTask = {
        id: `task_${Date.now()}`,
        dataSourceId: dataSource.id,
        dataSourceName: dataSource.name,
        status: 'running',
        progress: 0,
        startTime: new Date().toLocaleString(),
        endTime: '',
        entityCount: 0,
        errorCount: 0,
        config: {
          includeViews: true,
          includeProcedures: false,
          includeIndexes: true,
          generateRelations: true,
          maxDepth: 3
        }
      };

      setScanTasks(prev => [newTask, ...prev]);
      setCurrentTask(newTask);

      // 模拟扫描进度
      const progressInterval = setInterval(() => {
        setScanTasks(prev => prev.map(task => {
          if (task.id === newTask.id && task.status === 'running') {
            const newProgress = Math.min(task.progress + Math.random() * 20, 100);
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return {
                ...task,
                status: 'completed',
                progress: 100,
                endTime: new Date().toLocaleString(),
                entityCount: Math.floor(Math.random() * 50) + 10,
                errorCount: Math.floor(Math.random() * 3)
              };
            }
            return { ...task, progress: newProgress };
          }
          return task;
        }));
      }, 500);

      // 3秒后完成扫描
      setTimeout(() => {
        clearInterval(progressInterval);
        setScanTasks(prev => prev.map(task => 
          task.id === newTask.id ? {
            ...task,
            status: 'completed',
            progress: 100,
            endTime: new Date().toLocaleString(),
            entityCount: Math.floor(Math.random() * 50) + 10,
            errorCount: Math.floor(Math.random() * 3)
          } : task
        ));
        
        // 生成扫描结果
        generateMockScanResults();
        
        // 更新数据源扫描次数
        setDataSources(prev => prev.map(ds => 
          ds.id === dataSource.id ? {
            ...ds,
            scanCount: (ds.scanCount || 0) + 1,
            lastConnected: new Date().toLocaleString()
          } : ds
        ));

        setIsScanning(false);
        setSelectedDataSource('');
        message.success(`数据源 "${dataSource.name}" 扫描完成！`);
      }, 3000);

    } catch (error) {
      setIsScanning(false);
      setSelectedDataSource('');
      message.error('扫描启动失败！');
    }
  };

  const handleDeleteDataSource = (dataSource: DataSource) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据源 "${dataSource.name}" 吗？此操作不可恢复。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setDataSources(prev => prev.filter(ds => ds.id !== dataSource.id));
        message.success('数据源删除成功！');
      }
    });
  };

  // 刷新数据源列表
  const handleRefreshDataSources = async () => {
    try {
      message.loading('正在刷新数据源列表...', 1);
      await loadDataSources();
      message.success('数据源列表刷新成功！');
    } catch (error) {
      message.error('刷新失败，请重试！');
    }
  };

  // 创建数据源
  const handleCreateDataSource = () => {
    Modal.info({
      title: '创建数据源',
      width: 800,
      content: (
        <div style={{ marginTop: 16 }}>
          <Alert
            message="数据源配置功能"
            description="此功能正在开发中，将支持配置MySQL、PostgreSQL、MongoDB、Redis、Elasticsearch等多种数据源类型。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#8c8c8c' }}>
            <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
            <div>数据源配置向导即将上线</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>
              支持可视化配置连接参数、测试连接、批量导入等功能
            </div>
          </div>
        </div>
      ),
      okText: '知道了'
    });
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
      <PageHeader>
        <PageHeaderContent>
          <Title level={2} style={{ margin: 0 }}>
            <ScanOutlined /> {t('systemSettings.entityScan.title', '实体扫描')}
          </Title>
          <Paragraph style={{ margin: '8px 0 0 0', color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)' }}>
            {t('systemSettings.entityScan.description', '从外部数据源扫描和生成实体定义，支持数据库、API、云服务等多种数据源类型。')}
          </Paragraph>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefreshDataSources}
            title="刷新数据源列表"
          >
            刷新
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateDataSource}
          >
            创建数据源
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* 统计数据 */}
      <StatsCard $isDark={isDark} title="扫描统计">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#1890ff">{getStatistics().totalDataSources}</StatValue>
              <StatLabel $isDark={isDark}>数据源总数</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#52c41a">{getStatistics().connectedDataSources}</StatValue>
              <StatLabel $isDark={isDark}>已连接</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#722ed1">{getStatistics().totalEntities}</StatValue>
              <StatLabel $isDark={isDark}>扫描实体</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#fa8c16">{getStatistics().selectedEntities}</StatValue>
              <StatLabel $isDark={isDark}>已选择</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#13c2c2">{getStatistics().completedScans}</StatValue>
              <StatLabel $isDark={isDark}>完成扫描</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={8} lg={4}>
            <StatItem $isDark={isDark}>
              <StatValue color="#eb2f96">{getStatistics().runningScans}</StatValue>
              <StatLabel $isDark={isDark}>进行中</StatLabel>
            </StatItem>
          </Col>
        </Row>
      </StatsCard>

      {/* 搜索筛选 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder="搜索数据源名称、描述、主机地址..."
        filters={[
          {
            key: 'type',
            value: filterType,
            onChange: setFilterType,
            placeholder: '数据源类型',
            width: 120,
            options: [
              { value: 'all', label: '所有类型' },
              { value: 'database', label: '数据库' },
              { value: 'api', label: 'API接口' },
              { value: 'cloud', label: '云服务' },
              { value: 'monitoring', label: '监控系统' },
              { value: 'metrics', label: '指标数据' },
              { value: 'file', label: '文件' }
            ]
          },
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: '连接状态',
            width: 100,
            options: [
              { value: 'all', label: '所有状态' },
              { value: 'connected', label: '已连接' },
              { value: 'disconnected', label: '未连接' },
              { value: 'connecting', label: '连接中' },
              { value: 'error', label: '连接错误' }
            ]
          }
        ]}
        onRefresh={() => loadDataSources()}
        style={{ marginBottom: 24 }}
      />

      {/* 数据源管理 */}
      <ScanCard $isDark={isDark} title="数据源管理">
        <Row gutter={[16, 16]}>
          {renderDataSourceCards()}
        </Row>
        
        {getFilteredDataSources().length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)' }}>
            <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
            <div>暂无数据源</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>
              {searchText || filterType !== 'all' || filterStatus !== 'all' 
                ? '没有找到符合条件的数据源' 
                : '请先配置数据源以开始实体扫描'
              }
            </div>
          </div>
        )}
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
