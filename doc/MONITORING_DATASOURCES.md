# 监控系统数据源支持

## 概述

天工开悟实体扫描功能现已支持多种主流监控系统作为数据源，可以从这些系统中扫描和生成相关的实体定义，包括指标、仪表板、日志、链路追踪等数据。

## 支持的监控系统

### 1. Prometheus
**类型**: 时序数据库和监控系统
**图标**: 🔥 (橙红色)
**默认端口**: 9090

#### 功能特性
- 时序数据收集和存储
- PromQL查询语言
- 告警规则管理
- 服务发现机制

#### 可扫描的实体类型
- **指标实体** (Metric): HTTP请求数、CPU使用率、内存使用量等
- **标签实体** (Label): 实例标识、服务名称、环境标签等
- **告警规则** (AlertRule): 告警条件、阈值设置等

#### 配置参数
```json
{
  "url": "http://prometheus.example.com:9090",
  "authType": "basic|bearer|none",
  "username": "admin",
  "password": "***",
  "timeout": 30,
  "maxSamples": 50000
}
```

### 2. Grafana
**类型**: 可视化和分析平台
**图标**: 📊 (橙色)
**默认端口**: 3000

#### 功能特性
- 仪表板管理
- 多数据源支持
- 告警配置
- 用户权限管理

#### 可扫描的实体类型
- **仪表板实体** (Dashboard): 面板配置、查询语句、可视化设置
- **数据源实体** (DataSource): 连接配置、认证信息
- **告警实体** (Alert): 告警规则、通知渠道

#### 配置参数
```json
{
  "url": "http://grafana.example.com:3000",
  "apiKey": "***",
  "orgId": 1,
  "includeDashboards": true,
  "includeDataSources": true,
  "includeAlerts": true
}
```

### 3. Elasticsearch
**类型**: 搜索和分析引擎
**图标**: 📄 (深蓝色)
**默认端口**: 9200

#### 功能特性
- 全文搜索
- 日志分析
- 聚合查询
- 索引管理

#### 可扫描的实体类型
- **日志实体** (Log): 应用日志、访问日志、错误日志
- **索引实体** (Index): 索引结构、映射配置
- **聚合实体** (Aggregation): 统计分析、数据聚合

#### 配置参数
```json
{
  "hosts": ["http://es1.example.com:9200"],
  "username": "elastic",
  "password": "***",
  "indices": ["app-logs-*", "access-logs-*"],
  "version": "8.x"
}
```

### 4. InfluxDB
**类型**: 时序数据库
**图标**: 📈 (蓝色)
**默认端口**: 8086

#### 功能特性
- 时序数据存储
- 高性能写入
- SQL查询支持
- 数据压缩

#### 可扫描的实体类型
- **测量实体** (Measurement): CPU、内存、网络等指标
- **时序点实体** (Point): 时间戳、字段值、标签
- **保留策略** (RetentionPolicy): 数据保留规则

#### 配置参数
```json
{
  "url": "http://influxdb.example.com:8086",
  "database": "metrics",
  "username": "metrics_user",
  "password": "***",
  "retention": "30d"
}
```

### 5. Jaeger
**类型**: 分布式链路追踪
**图标**: 📊 (青色)
**默认端口**: 16686

#### 功能特性
- 分布式链路追踪
- 性能分析
- 服务依赖分析
- 调用链可视化

#### 可扫描的实体类型
- **链路实体** (Trace): 完整的请求链路
- **跨度实体** (Span): 单个操作的时间跨度
- **服务实体** (Service): 微服务信息

#### 配置参数
```json
{
  "queryUrl": "http://jaeger.example.com:16686",
  "collectorUrl": "http://jaeger.example.com:14268",
  "services": ["user-service", "order-service"],
  "lookback": "24h"
}
```

### 6. Zabbix
**类型**: 企业级监控系统
**图标**: 🖥️ (红色)
**默认端口**: 80

#### 功能特性
- 主机监控
- 网络设备监控
- 应用监控
- 告警通知

#### 可扫描的实体类型
- **主机实体** (Host): 服务器、网络设备信息
- **监控项** (Item): 监控指标定义
- **触发器** (Trigger): 告警触发条件

#### 配置参数
```json
{
  "url": "http://zabbix.example.com/zabbix",
  "username": "admin",
  "password": "***",
  "apiVersion": "6.0",
  "hostGroups": ["Linux servers", "Web servers"]
}
```

### 7. Datadog
**类型**: 云原生监控平台
**图标**: 📊 (紫色)
**默认端口**: 443 (HTTPS)

#### 功能特性
- APM应用性能监控
- 日志管理
- 基础设施监控
- 安全监控

#### 可扫描的实体类型
- **指标实体** (Metric): 应用和基础设施指标
- **日志实体** (Log): 结构化日志数据
- **服务实体** (Service): APM服务信息

#### 配置参数
```json
{
  "apiKey": "***",
  "appKey": "***",
  "site": "datadoghq.com",
  "services": ["web-app", "api-gateway"],
  "env": "production"
}
```

## 扫描流程

### 1. 数据源配置
```typescript
// 添加Prometheus数据源
const prometheusConfig = {
  name: '生产环境Prometheus',
  type: 'monitoring',
  subType: 'prometheus',
  config: {
    url: 'http://prometheus.prod.com:9090',
    authType: 'basic',
    username: 'admin',
    password: 'secret'
  }
};
```

### 2. 连接测试
```typescript
// 测试数据源连接
const testResult = await entityScanService.testDataSourceConnection('prometheus-prod');
if (testResult.success) {
  console.log('Prometheus连接成功');
}
```

### 3. 开始扫描
```typescript
// 启动扫描任务
const scanConfig = {
  dataSourceId: 'prometheus-prod',
  taskName: 'Prometheus指标扫描',
  includeMetrics: true,
  includeAlerts: false,
  metricPattern: 'http_*,cpu_*,memory_*'
};

const task = await entityScanService.startScanTask(scanConfig);
```

### 4. 监控进度
```typescript
// 获取扫描进度
const progress = await entityScanService.getScanTask(task.id);
console.log(`扫描进度: ${progress.progress}%`);
console.log(`发现指标: ${progress.scannedCount}`);
```

### 5. 生成实体
```typescript
// 获取扫描结果
const results = await entityScanService.getScanResults(task.id);

// 选择要生成的实体
const selectedMetrics = results
  .filter(r => r.confidence > 0.8)
  .map(r => r.id);

// 生成实体定义
await entityScanService.generateEntities(task.id, selectedMetrics);
```

## 实体映射规则

### Prometheus指标映射
```typescript
// Prometheus指标 -> 实体定义
{
  "http_requests_total": {
    "entityName": "HTTP请求指标",
    "entityType": "HttpRequestMetric",
    "attributes": {
      "method": "string",      // HTTP方法
      "status_code": "string", // 状态码
      "endpoint": "string",    // 端点路径
      "value": "counter"       // 计数器值
    }
  }
}
```

### Grafana仪表板映射
```typescript
// Grafana仪表板 -> 实体定义
{
  "dashboard": {
    "entityName": "监控仪表板",
    "entityType": "Dashboard",
    "attributes": {
      "id": "number",          // 仪表板ID
      "title": "string",       // 标题
      "tags": "array",         // 标签列表
      "panels": "array"        // 面板配置
    }
  }
}
```

### Elasticsearch日志映射
```typescript
// ES日志索引 -> 实体定义
{
  "app-logs": {
    "entityName": "应用日志",
    "entityType": "ApplicationLog",
    "attributes": {
      "timestamp": "date",     // 时间戳
      "level": "string",       // 日志级别
      "message": "text",       // 日志消息
      "service": "string"      // 服务名称
    }
  }
}
```

## 最佳实践

### 1. 连接配置
- 使用只读账户进行扫描
- 配置适当的超时时间
- 启用SSL/TLS加密连接
- 定期轮换API密钥

### 2. 扫描策略
- 选择合适的时间窗口
- 限制扫描的数据量
- 使用模式匹配过滤数据
- 设置合理的置信度阈值

### 3. 性能优化
- 分批处理大量数据
- 使用缓存减少重复请求
- 并行扫描多个数据源
- 监控扫描任务资源使用

### 4. 安全考虑
- 加密存储认证信息
- 限制网络访问权限
- 记录所有扫描操作
- 定期审计数据源配置

## 扩展开发

### 添加新的监控系统
```typescript
// 1. 扩展数据源类型
interface CustomMonitoringSource extends DataSource {
  type: 'monitoring';
  subType: 'custom-monitor';
  config: {
    endpoint: string;
    apiKey: string;
    customParams: Record<string, any>;
  };
}

// 2. 实现扫描逻辑
class CustomMonitoringScanner {
  async scan(config: CustomMonitoringSource['config']): Promise<ScanResult[]> {
    // 实现具体的扫描逻辑
    return [];
  }
}

// 3. 注册扫描器
scannerRegistry.register('custom-monitor', new CustomMonitoringScanner());
```

### 自定义实体映射
```typescript
// 定义映射规则
const customMappingRules = {
  'custom_metric_*': {
    entityType: 'CustomMetric',
    attributeMapping: {
      'name': 'metricName',
      'value': 'metricValue',
      'labels': 'metricLabels'
    }
  }
};

// 应用映射规则
entityMapper.addRules(customMappingRules);
```

## 故障排除

### 常见问题

1. **连接超时**
   - 检查网络连接
   - 增加超时时间
   - 验证防火墙设置

2. **认证失败**
   - 验证用户名密码
   - 检查API密钥有效性
   - 确认权限设置

3. **数据格式错误**
   - 检查数据源版本兼容性
   - 验证API响应格式
   - 更新映射规则

4. **扫描性能问题**
   - 减少扫描数据量
   - 优化查询条件
   - 增加并发限制

### 日志分析
```bash
# 查看扫描日志
tail -f /var/log/entity-scan/prometheus-scan.log

# 分析错误信息
grep "ERROR" /var/log/entity-scan/*.log | tail -20

# 监控扫描性能
grep "PERFORMANCE" /var/log/entity-scan/*.log
```

## 总结

通过支持多种主流监控系统，天工开悟实体扫描功能为用户提供了强大的监控数据集成能力。用户可以轻松地从现有的监控基础设施中导入数据，快速构建统一的实体模型，为后续的分析和运维工作奠定基础。

这些监控系统的支持大大扩展了系统的数据来源，使得用户能够构建更加完整和准确的业务实体模型。
