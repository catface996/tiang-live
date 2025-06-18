# 实体扫描功能

## 功能概述

实体扫描功能允许用户从外部业务系统或平台扫描基础数据，自动生成实体定义。这个功能大大简化了实体创建过程，提高了数据建模的效率。

## 功能特性

### 1. 多数据源支持
- **数据库**: MySQL, PostgreSQL, Oracle, SQL Server 等
- **API接口**: REST API, GraphQL API 等
- **云服务**: 阿里云OSS, AWS S3, 腾讯云COS 等
- **文件系统**: CSV, JSON, XML 等文件格式

### 2. 智能扫描
- **结构分析**: 自动分析表结构、字段类型、约束关系
- **关系推断**: 基于外键关系推断实体间的关联
- **命名规范**: 智能识别命名模式，生成标准化实体名称
- **置信度评估**: 为每个扫描结果提供置信度评分

### 3. 可视化管理
- **数据源管理**: 可视化配置和管理多个数据源
- **扫描进度**: 实时显示扫描进度和状态
- **结果预览**: 扫描结果的详细预览和编辑
- **批量操作**: 支持批量选择和生成实体

## 页面结构

### 数据源管理
```
┌─ 数据源列表 ─────────────────────────────────┐
│ ┌─ MySQL生产库 ─┐ ┌─ CRM系统API ─┐ ┌─ OSS ─┐ │
│ │ 状态: 已连接   │ │ 状态: 已连接  │ │ 未连接 │ │
│ │ 实体: 156个   │ │ 实体: 89个   │ │ 0个   │ │
│ │ [配置] [选择] │ │ [配置] [选择] │ │ [配置] │ │
│ └──────────────┘ └─────────────┘ └──────┘ │
└─────────────────────────────────────────┘
```

### 扫描配置
```
┌─ 扫描配置 ─────────────────────────────────┐
│ 数据源: [MySQL生产库 ▼]                    │
│ 任务名: [扫描任务-2024-06-18]              │
│ [开始扫描] [暂停] [重置]                   │
└───────────────────────────────────────────┘
```

### 扫描进度
```
┌─ 扫描进度 ─────────────────────────────────┐
│ 任务: 扫描任务-MySQL生产库                  │
│ ████████████████████████████████ 85%      │
│                                           │
│ 已扫描: 133  已生成: 120  错误: 2          │
│                                           │
│ 扫描日志:                                  │
│ [14:30:15] 开始扫描数据源                  │
│ [14:30:16] 扫描表结构完成                  │
│ [14:30:18] 分析字段关系                    │
└───────────────────────────────────────────┘
```

### 扫描结果
```
┌─ 扫描结果 ─────────────────────────────────┐
│ ✓ 发现 25 个实体，已选择 20 个 [生成实体]   │
│                                           │
│ ☑ 用户实体    User     95% ████████████   │
│ ☑ 订单实体    Order    92% ███████████    │
│ ☐ 商品实体    Product  88% ██████████     │
│ ☑ 分类实体    Category 85% █████████      │
└───────────────────────────────────────────┘
```

## 技术实现

### 前端组件
- `EntityScan.tsx`: 主页面组件
- `DataSourceCard.tsx`: 数据源卡片组件
- `ScanProgress.tsx`: 扫描进度组件
- `ResultTable.tsx`: 结果表格组件

### 服务层
- `entityScanService.ts`: 实体扫描服务
- 支持多种数据源的连接和扫描
- 提供统一的API接口

### 状态管理
- 使用 Redux Toolkit 管理扫描状态
- 实时更新扫描进度和结果
- 支持任务的暂停和恢复

## 使用流程

### 1. 配置数据源
```typescript
// 添加数据库数据源
const dataSource = {
  name: '生产环境MySQL',
  type: 'database',
  config: {
    host: 'prod-mysql.example.com',
    port: 3306,
    database: 'business_db',
    username: 'scan_user',
    password: '***'
  }
};
```

### 2. 开始扫描
```typescript
// 启动扫描任务
const scanConfig = {
  dataSourceId: 'mysql-prod',
  taskName: '生产库扫描',
  includeViews: false,
  generateRelations: true
};

await entityScanService.startScanTask(scanConfig);
```

### 3. 监控进度
```typescript
// 获取扫描进度
const task = await entityScanService.getScanTask(taskId);
console.log(`进度: ${task.progress}%`);
console.log(`已扫描: ${task.scannedCount}`);
```

### 4. 生成实体
```typescript
// 生成选中的实体
const selectedResults = ['entity-1', 'entity-2', 'entity-3'];
await entityScanService.generateEntities(taskId, selectedResults);
```

## 扩展性

### 自定义数据源
```typescript
interface CustomDataSource extends DataSource {
  type: 'custom';
  config: {
    connector: string;
    parameters: Record<string, any>;
  };
}
```

### 扫描规则配置
```typescript
interface ScanRule {
  tablePattern: RegExp;
  excludePattern: RegExp;
  fieldMapping: Record<string, string>;
  relationRules: RelationRule[];
}
```

### 实体模板
```typescript
interface EntityTemplate {
  namePattern: string;
  attributeMapping: Record<string, AttributeType>;
  defaultProperties: Record<string, any>;
}
```

## 安全考虑

### 1. 连接安全
- 支持SSL/TLS加密连接
- API密钥和密码加密存储
- 连接超时和重试机制

### 2. 权限控制
- 只读权限扫描
- 用户权限验证
- 操作日志记录

### 3. 数据保护
- 敏感数据脱敏
- 扫描结果临时存储
- 自动清理机制

## 性能优化

### 1. 批量处理
- 分批扫描大型数据库
- 异步处理扫描任务
- 进度实时更新

### 2. 缓存机制
- 扫描结果缓存
- 数据源元数据缓存
- 智能增量扫描

### 3. 资源管理
- 连接池管理
- 内存使用优化
- 并发任务控制

## 未来规划

### 1. AI增强
- 使用机器学习优化实体识别
- 智能命名建议
- 关系推断优化

### 2. 更多数据源
- NoSQL数据库支持
- 消息队列扫描
- 微服务API发现

### 3. 协作功能
- 多人协作扫描
- 扫描结果分享
- 版本控制集成

## 总结

实体扫描功能为天工开悟系统提供了强大的数据导入能力，通过自动化的方式大大提高了实体建模的效率。该功能支持多种数据源，提供了完整的扫描、预览、生成流程，是系统数据建模的重要工具。
