import { apiClient } from './apiClient';

// 数据源接口
export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'cloud' | 'monitoring' | 'metrics';
  description: string;
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  lastScan?: string;
  entityCount?: number;
  subType?: string; // 用于区分具体的监控系统类型
}

// 扫描任务接口
export interface ScanTask {
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

// 扫描结果接口
export interface ScanResult {
  id: string;
  name: string;
  type: string;
  source: string;
  confidence: number;
  attributes: Record<string, any>;
  selected: boolean;
}

// 扫描配置接口
export interface ScanConfig {
  dataSourceId: string;
  taskName?: string;
  includeViews?: boolean;
  includeProcedures?: boolean;
  tablePattern?: string;
  excludePattern?: string;
  generateRelations?: boolean;
}

class EntityScanService {
  // 获取数据源列表
  async getDataSources(): Promise<DataSource[]> {
    try {
      const response = await apiClient.get('/entity-scan/data-sources');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data sources:', error);
      // 返回模拟数据
      return this.getMockDataSources();
    }
  }

  // 创建数据源
  async createDataSource(dataSource: Omit<DataSource, 'id' | 'status'>): Promise<DataSource> {
    try {
      const response = await apiClient.post('/entity-scan/data-sources', dataSource);
      return response.data;
    } catch (error) {
      console.error('Failed to create data source:', error);
      throw error;
    }
  }

  // 更新数据源
  async updateDataSource(id: string, dataSource: Partial<DataSource>): Promise<DataSource> {
    try {
      const response = await apiClient.put(`/entity-scan/data-sources/${id}`, dataSource);
      return response.data;
    } catch (error) {
      console.error('Failed to update data source:', error);
      throw error;
    }
  }

  // 删除数据源
  async deleteDataSource(id: string): Promise<void> {
    try {
      await apiClient.delete(`/entity-scan/data-sources/${id}`);
    } catch (error) {
      console.error('Failed to delete data source:', error);
      throw error;
    }
  }

  // 测试数据源连接
  async testDataSourceConnection(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post(`/entity-scan/data-sources/${id}/test`);
      return response.data;
    } catch (error) {
      console.error('Failed to test data source connection:', error);
      return { success: false, message: '连接测试失败' };
    }
  }

  // 开始扫描任务
  async startScanTask(config: ScanConfig): Promise<ScanTask> {
    try {
      const response = await apiClient.post('/entity-scan/tasks', config);
      return response.data;
    } catch (error) {
      console.error('Failed to start scan task:', error);
      throw error;
    }
  }

  // 获取扫描任务列表
  async getScanTasks(): Promise<ScanTask[]> {
    try {
      const response = await apiClient.get('/entity-scan/tasks');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch scan tasks:', error);
      return [];
    }
  }

  // 获取扫描任务详情
  async getScanTask(id: string): Promise<ScanTask> {
    try {
      const response = await apiClient.get(`/entity-scan/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch scan task:', error);
      throw error;
    }
  }

  // 暂停扫描任务
  async pauseScanTask(id: string): Promise<void> {
    try {
      await apiClient.post(`/entity-scan/tasks/${id}/pause`);
    } catch (error) {
      console.error('Failed to pause scan task:', error);
      throw error;
    }
  }

  // 恢复扫描任务
  async resumeScanTask(id: string): Promise<void> {
    try {
      await apiClient.post(`/entity-scan/tasks/${id}/resume`);
    } catch (error) {
      console.error('Failed to resume scan task:', error);
      throw error;
    }
  }

  // 停止扫描任务
  async stopScanTask(id: string): Promise<void> {
    try {
      await apiClient.post(`/entity-scan/tasks/${id}/stop`);
    } catch (error) {
      console.error('Failed to stop scan task:', error);
      throw error;
    }
  }

  // 获取扫描结果
  async getScanResults(taskId: string): Promise<ScanResult[]> {
    try {
      const response = await apiClient.get(`/entity-scan/tasks/${taskId}/results`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch scan results:', error);
      return [];
    }
  }

  // 生成实体定义
  async generateEntities(taskId: string, selectedResults: string[]): Promise<{ success: boolean; count: number }> {
    try {
      const response = await apiClient.post(`/entity-scan/tasks/${taskId}/generate`, {
        selectedResults
      });
      return response.data;
    } catch (error) {
      console.error('Failed to generate entities:', error);
      throw error;
    }
  }

  // 获取模拟数据源（用于开发测试）
  private getMockDataSources(): DataSource[] {
    return [
      {
        id: 'mysql-prod',
        name: '生产环境MySQL',
        type: 'database',
        description: '生产环境主数据库，包含用户、订单、商品等核心业务数据',
        config: {
          host: 'prod-mysql.example.com',
          port: 3306,
          database: 'business_db',
          username: 'scan_user'
        },
        status: 'connected',
        lastScan: '2024-06-17 14:30:00',
        entityCount: 156
      },
      {
        id: 'api-crm',
        name: 'CRM系统API',
        type: 'api',
        description: 'CRM系统REST API，包含客户、联系人、销售机会等数据',
        config: {
          baseUrl: 'https://crm.example.com/api/v1',
          apiKey: '***hidden***',
          endpoints: ['/customers', '/contacts', '/opportunities']
        },
        status: 'connected',
        lastScan: '2024-06-16 09:15:00',
        entityCount: 89
      },
      {
        id: 'cloud-oss',
        name: '阿里云OSS',
        type: 'cloud',
        description: '对象存储服务，包含文档、图片、视频等文件资源',
        config: {
          endpoint: 'oss-cn-hangzhou.aliyuncs.com',
          bucket: 'business-files',
          accessKeyId: '***hidden***'
        },
        status: 'disconnected',
        entityCount: 0
      },
      {
        id: 'prometheus-prod',
        name: '生产环境Prometheus',
        type: 'monitoring',
        subType: 'prometheus',
        description: 'Prometheus监控系统，包含应用指标、系统指标、业务指标等时序数据',
        config: {
          url: 'http://prometheus.example.com:9090',
          basicAuth: {
            username: 'admin',
            password: '***hidden***'
          },
          timeout: 30000,
          maxSamples: 50000
        },
        status: 'connected',
        lastScan: '2024-06-17 16:45:00',
        entityCount: 234
      },
      {
        id: 'grafana-prod',
        name: '生产环境Grafana',
        type: 'monitoring',
        subType: 'grafana',
        description: 'Grafana可视化平台，包含仪表板、数据源、告警规则等配置信息',
        config: {
          url: 'http://grafana.example.com:3000',
          apiKey: '***hidden***',
          orgId: 1,
          includeDashboards: true,
          includeDataSources: true,
          includeAlerts: true
        },
        status: 'connected',
        lastScan: '2024-06-17 15:20:00',
        entityCount: 67
      },
      {
        id: 'influxdb-metrics',
        name: 'InfluxDB时序数据库',
        type: 'metrics',
        subType: 'influxdb',
        description: 'InfluxDB时序数据库，存储应用性能指标和业务监控数据',
        config: {
          url: 'http://influxdb.example.com:8086',
          database: 'metrics',
          username: 'metrics_user',
          password: '***hidden***',
          retention: '30d'
        },
        status: 'connected',
        lastScan: '2024-06-17 12:15:00',
        entityCount: 145
      },
      {
        id: 'elasticsearch-logs',
        name: 'Elasticsearch日志系统',
        type: 'monitoring',
        subType: 'elasticsearch',
        description: 'Elasticsearch集群，存储应用日志、访问日志、错误日志等结构化数据',
        config: {
          hosts: ['http://es1.example.com:9200', 'http://es2.example.com:9200'],
          username: 'elastic',
          password: '***hidden***',
          indices: ['app-logs-*', 'access-logs-*', 'error-logs-*'],
          version: '8.x'
        },
        status: 'connected',
        lastScan: '2024-06-17 11:30:00',
        entityCount: 89
      },
      {
        id: 'jaeger-tracing',
        name: 'Jaeger链路追踪',
        type: 'monitoring',
        subType: 'jaeger',
        description: 'Jaeger分布式链路追踪系统，包含服务调用链、性能指标等数据',
        config: {
          queryUrl: 'http://jaeger.example.com:16686',
          collectorUrl: 'http://jaeger.example.com:14268',
          services: ['user-service', 'order-service', 'payment-service'],
          lookback: '24h'
        },
        status: 'connected',
        lastScan: '2024-06-17 10:45:00',
        entityCount: 56
      },
      {
        id: 'zabbix-monitor',
        name: 'Zabbix监控系统',
        type: 'monitoring',
        subType: 'zabbix',
        description: 'Zabbix企业级监控系统，包含主机、应用、网络设备等监控数据',
        config: {
          url: 'http://zabbix.example.com/zabbix',
          username: 'admin',
          password: '***hidden***',
          apiVersion: '6.0',
          hostGroups: ['Linux servers', 'Web servers', 'Database servers']
        },
        status: 'disconnected',
        entityCount: 0
      },
      {
        id: 'datadog-apm',
        name: 'Datadog APM',
        type: 'monitoring',
        subType: 'datadog',
        description: 'Datadog应用性能监控，包含应用指标、日志、链路追踪等数据',
        config: {
          apiKey: '***hidden***',
          appKey: '***hidden***',
          site: 'datadoghq.com',
          services: ['web-app', 'api-gateway', 'background-jobs'],
          env: 'production'
        },
        status: 'connected',
        lastScan: '2024-06-17 09:30:00',
        entityCount: 78
      }
    ];
  }
}

export const entityScanService = new EntityScanService();
