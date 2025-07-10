# MCP管理API接口设计文档

## 概述

本文档定义了MCP（Model Context Protocol）管理系统的后端API接口规范，包括MCP服务器的CRUD操作、统计信息查询、状态管理等功能。

## 数据模型

### McpServer 数据结构

```typescript
interface McpServer {
  id: string;                    // 服务器唯一标识
  name: string;                  // 服务器名称
  description: string;           // 服务器描述
  type: McpServerType;          // 服务器类型
  status: McpServerStatus;      // 服务器状态
  version: string;              // 版本号
  endpoint: string;             // 服务端点URL
  port: number;                 // 端口号
  capabilities: string[];       // 支持的能力列表
  config: McpServerConfig;      // 配置信息
  healthCheck: HealthCheckConfig; // 健康检查配置
  metrics: McpServerMetrics;    // 运行指标
  createdAt: string;            // 创建时间 (ISO 8601)
  updatedAt: string;            // 更新时间 (ISO 8601)
  createdBy: string;            // 创建者
}

// 服务器类型枚举
type McpServerType = 'database' | 'file' | 'api' | 'email' | 'scheduler' | 'custom';

// 服务器状态枚举
type McpServerStatus = 'running' | 'stopped' | 'error' | 'starting' | 'stopping';

// 服务器配置
interface McpServerConfig {
  maxConnections?: number;      // 最大连接数
  timeout?: number;            // 超时时间(ms)
  ssl?: boolean;               // 是否启用SSL
  retryAttempts?: number;      // 重试次数
  [key: string]: any;          // 其他自定义配置
}

// 健康检查配置
interface HealthCheckConfig {
  enabled: boolean;            // 是否启用健康检查
  interval: number;            // 检查间隔(秒)
  timeout: number;             // 检查超时(秒)
  retries: number;             // 重试次数
}

// 运行指标
interface McpServerMetrics {
  uptime: number;              // 运行时间(秒)
  requestCount: number;        // 请求总数
  errorCount: number;          // 错误总数
  avgResponseTime: number;     // 平均响应时间(ms)
  lastHeartbeat: string;       // 最后心跳时间 (ISO 8601)
}
```

### 统计数据结构

```typescript
interface McpStatistics {
  totalServers: number;        // 服务器总数
  runningServers: number;      // 运行中的服务器数
  stoppedServers: number;      // 已停止的服务器数
  errorServers: number;        // 错误状态的服务器数
  totalRequests: number;       // 总请求数
  totalErrors: number;         // 总错误数
  avgResponseTime: number;     // 平均响应时间
  serversByType: {             // 按类型分组的服务器数量
    [key in McpServerType]: number;
  };
  recentActivity: {            // 最近活动统计
    last24h: {
      requests: number;
      errors: number;
      newServers: number;
    };
    last7d: {
      requests: number;
      errors: number;
      newServers: number;
    };
  };
}
```

## API接口规范

### 基础响应格式

```typescript
interface ApiResponse<T> {
  success: boolean;            // 请求是否成功
  code: string;               // 响应代码
  message: string;            // 响应消息
  data: T;                    // 响应数据
  timestamp: string;          // 响应时间戳
}

interface PagedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;             // 当前页码
    size: number;             // 每页大小
    total: number;            // 总记录数
    totalPages: number;       // 总页数
  };
}
```

## 1. MCP服务器管理接口

### 1.1 获取MCP服务器列表

**接口地址**: `GET /api/v1/mcp/servers`

**请求参数**:
```typescript
interface GetMcpServersRequest {
  page?: number;              // 页码，默认1
  size?: number;              // 每页大小，默认20
  search?: string;            // 搜索关键词（名称、描述）
  type?: McpServerType;       // 服务器类型筛选
  status?: McpServerStatus;   // 状态筛选
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'status'; // 排序字段
  sortOrder?: 'asc' | 'desc'; // 排序方向
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取MCP服务器列表成功",
  "data": [
    {
      "id": "mcp_001",
      "name": "Database MCP Server",
      "description": "数据库连接和查询服务",
      "type": "database",
      "status": "running",
      "version": "1.2.0",
      "endpoint": "http://localhost:3001",
      "port": 3001,
      "capabilities": ["mysql", "postgresql", "mongodb"],
      "config": {
        "maxConnections": 100,
        "timeout": 30000,
        "ssl": true
      },
      "healthCheck": {
        "enabled": true,
        "interval": 30,
        "timeout": 5,
        "retries": 3
      },
      "metrics": {
        "uptime": 86400,
        "requestCount": 1250,
        "errorCount": 5,
        "avgResponseTime": 120,
        "lastHeartbeat": "2024-07-10T14:00:00Z"
      },
      "createdAt": "2024-07-01T10:00:00Z",
      "updatedAt": "2024-07-10T14:00:00Z",
      "createdBy": "admin"
    }
  ],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 15,
    "totalPages": 1
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 1.2 获取单个MCP服务器详情

**接口地址**: `GET /api/v1/mcp/servers/{id}`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取MCP服务器详情成功",
  "data": {
    "id": "mcp_001",
    "name": "Database MCP Server",
    // ... 完整的McpServer对象
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 1.3 保存MCP服务器（创建/更新）

**接口地址**: `POST /api/v1/mcp/servers/save`

**请求体**:
```typescript
interface SaveMcpServerRequest {
  id?: string;                // 更新时必填，创建时不填
  name: string;               // 服务器名称
  description: string;        // 服务器描述
  type: McpServerType;        // 服务器类型
  endpoint: string;           // 服务端点URL
  port: number;               // 端口号
  capabilities: string[];     // 支持的能力列表
  config: McpServerConfig;    // 配置信息
  healthCheck: HealthCheckConfig; // 健康检查配置
}
```

**请求示例**:
```json
{
  "name": "New Database MCP Server",
  "description": "新的数据库MCP服务器",
  "type": "database",
  "endpoint": "http://localhost:3002",
  "port": 3002,
  "capabilities": ["mysql", "postgresql"],
  "config": {
    "maxConnections": 50,
    "timeout": 15000,
    "ssl": false
  },
  "healthCheck": {
    "enabled": true,
    "interval": 60,
    "timeout": 10,
    "retries": 2
  }
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "MCP服务器保存成功",
  "data": {
    "id": "mcp_002",
    "name": "New Database MCP Server",
    // ... 完整的保存后的McpServer对象
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 1.4 删除MCP服务器

**接口地址**: `DELETE /api/v1/mcp/servers/{id}`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "MCP服务器删除成功",
  "data": null,
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 1.5 批量删除MCP服务器

**接口地址**: `DELETE /api/v1/mcp/servers/batch`

**请求体**:
```json
{
  "ids": ["mcp_001", "mcp_002", "mcp_003"]
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "批量删除MCP服务器成功",
  "data": {
    "deletedCount": 3,
    "failedIds": []
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

## 2. MCP服务器状态管理接口

### 2.1 启动MCP服务器

**接口地址**: `POST /api/v1/mcp/servers/{id}/start`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "MCP服务器启动成功",
  "data": {
    "id": "mcp_001",
    "status": "starting",
    "message": "服务器正在启动中..."
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 2.2 停止MCP服务器

**接口地址**: `POST /api/v1/mcp/servers/{id}/stop`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "MCP服务器停止成功",
  "data": {
    "id": "mcp_001",
    "status": "stopping",
    "message": "服务器正在停止中..."
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 2.3 重启MCP服务器

**接口地址**: `POST /api/v1/mcp/servers/{id}/restart`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "MCP服务器重启成功",
  "data": {
    "id": "mcp_001",
    "status": "starting",
    "message": "服务器正在重启中..."
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 2.4 健康检查

**接口地址**: `GET /api/v1/mcp/servers/{id}/health`

**路径参数**:
- `id`: MCP服务器ID

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "健康检查完成",
  "data": {
    "id": "mcp_001",
    "status": "running",
    "healthy": true,
    "responseTime": 85,
    "lastCheck": "2024-07-10T14:00:00Z",
    "details": {
      "endpoint": "accessible",
      "database": "connected",
      "memory": "normal",
      "cpu": "normal"
    }
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

## 3. 统计信息接口

### 3.1 获取MCP统计信息

**接口地址**: `GET /api/v1/mcp/statistics`

**请求参数**:
```typescript
interface GetMcpStatisticsRequest {
  timeRange?: '24h' | '7d' | '30d' | 'all'; // 时间范围，默认'all'
  includeMetrics?: boolean;                  // 是否包含详细指标，默认true
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取MCP统计信息成功",
  "data": {
    "totalServers": 15,
    "runningServers": 12,
    "stoppedServers": 2,
    "errorServers": 1,
    "totalRequests": 125000,
    "totalErrors": 250,
    "avgResponseTime": 145,
    "serversByType": {
      "database": 6,
      "file": 3,
      "api": 4,
      "email": 1,
      "scheduler": 1,
      "custom": 0
    },
    "recentActivity": {
      "last24h": {
        "requests": 5200,
        "errors": 12,
        "newServers": 1
      },
      "last7d": {
        "requests": 35000,
        "errors": 85,
        "newServers": 3
      }
    }
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 3.2 获取MCP服务器指标历史

**接口地址**: `GET /api/v1/mcp/servers/{id}/metrics`

**路径参数**:
- `id`: MCP服务器ID

**请求参数**:
```typescript
interface GetMcpMetricsRequest {
  timeRange: '1h' | '6h' | '24h' | '7d' | '30d'; // 时间范围
  interval?: '1m' | '5m' | '15m' | '1h' | '1d';  // 数据间隔
  metrics?: string[];                             // 指定指标类型
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取MCP服务器指标成功",
  "data": {
    "serverId": "mcp_001",
    "timeRange": "24h",
    "interval": "1h",
    "metrics": [
      {
        "timestamp": "2024-07-10T13:00:00Z",
        "requestCount": 120,
        "errorCount": 2,
        "responseTime": 135,
        "cpuUsage": 25.5,
        "memoryUsage": 68.2
      },
      {
        "timestamp": "2024-07-10T14:00:00Z",
        "requestCount": 145,
        "errorCount": 1,
        "responseTime": 142,
        "cpuUsage": 28.1,
        "memoryUsage": 71.8
      }
    ]
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

## 4. 配置管理接口

### 4.1 获取MCP服务器配置模板

**接口地址**: `GET /api/v1/mcp/config-templates`

**请求参数**:
```typescript
interface GetConfigTemplatesRequest {
  type?: McpServerType; // 服务器类型筛选
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取配置模板成功",
  "data": [
    {
      "type": "database",
      "name": "数据库MCP服务器",
      "description": "用于数据库连接和查询的MCP服务器配置模板",
      "template": {
        "port": 3001,
        "capabilities": ["mysql", "postgresql", "mongodb"],
        "config": {
          "maxConnections": 100,
          "timeout": 30000,
          "ssl": true,
          "retryAttempts": 3
        },
        "healthCheck": {
          "enabled": true,
          "interval": 30,
          "timeout": 5,
          "retries": 3
        }
      }
    }
  ],
  "timestamp": "2024-07-10T14:00:00Z"
}
```

### 4.2 验证MCP服务器配置

**接口地址**: `POST /api/v1/mcp/servers/validate-config`

**请求体**:
```json
{
  "type": "database",
  "endpoint": "http://localhost:3001",
  "port": 3001,
  "config": {
    "maxConnections": 100,
    "timeout": 30000,
    "ssl": true
  }
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "配置验证成功",
  "data": {
    "valid": true,
    "warnings": [
      "建议启用SSL连接以提高安全性"
    ],
    "errors": [],
    "suggestions": [
      "可以考虑增加连接池大小以提高性能"
    ]
  },
  "timestamp": "2024-07-10T14:00:00Z"
}
```

## 5. 错误代码说明

| 错误代码 | HTTP状态码 | 说明 |
|---------|-----------|------|
| SUCCESS | 200 | 请求成功 |
| INVALID_PARAMETER | 400 | 请求参数无效 |
| SERVER_NOT_FOUND | 404 | MCP服务器不存在 |
| SERVER_ALREADY_EXISTS | 409 | MCP服务器已存在 |
| SERVER_START_FAILED | 500 | 服务器启动失败 |
| SERVER_STOP_FAILED | 500 | 服务器停止失败 |
| CONFIG_VALIDATION_FAILED | 400 | 配置验证失败 |
| HEALTH_CHECK_FAILED | 503 | 健康检查失败 |
| INTERNAL_SERVER_ERROR | 500 | 内部服务器错误 |

## 6. 实现注意事项

### 6.1 数据库设计建议

1. **主表**: `mcp_servers` - 存储MCP服务器基本信息
2. **配置表**: `mcp_server_configs` - 存储服务器配置（JSON格式）
3. **指标表**: `mcp_server_metrics` - 存储历史指标数据（时序数据）
4. **日志表**: `mcp_server_logs` - 存储操作日志

### 6.2 缓存策略

1. **Redis缓存**: 缓存服务器状态、统计信息等频繁查询的数据
2. **缓存过期**: 设置合理的缓存过期时间（如统计信息5分钟）
3. **缓存更新**: 在服务器状态变更时及时更新缓存

### 6.3 异步处理

1. **状态变更**: 服务器启动/停止操作应异步处理
2. **健康检查**: 定时任务执行健康检查
3. **指标收集**: 后台任务定期收集服务器指标

### 6.4 安全考虑

1. **权限控制**: 实现基于角色的访问控制
2. **配置加密**: 敏感配置信息应加密存储
3. **审计日志**: 记录所有重要操作的审计日志

### 6.5 监控告警

1. **服务器状态监控**: 监控服务器运行状态
2. **性能指标监控**: 监控响应时间、错误率等
3. **告警通知**: 异常情况及时通知管理员

## 7. 前端集成说明

### 7.1 API客户端封装

建议在前端创建 `mcpApi.ts` 文件，封装所有MCP相关的API调用：

```typescript
// src/services/mcpApi.ts
import { apiClient } from './apiClient';

export const mcpApi = {
  // 获取服务器列表
  getServers: (params: GetMcpServersRequest) => 
    apiClient.get('/mcp/servers', { params }),
  
  // 获取服务器详情
  getServer: (id: string) => 
    apiClient.get(`/mcp/servers/${id}`),
  
  // 保存服务器
  saveServer: (data: SaveMcpServerRequest) => 
    apiClient.post('/mcp/servers/save', data),
  
  // 删除服务器
  deleteServer: (id: string) => 
    apiClient.delete(`/mcp/servers/${id}`),
  
  // 获取统计信息
  getStatistics: (params?: GetMcpStatisticsRequest) => 
    apiClient.get('/mcp/statistics', { params }),
  
  // 服务器操作
  startServer: (id: string) => 
    apiClient.post(`/mcp/servers/${id}/start`),
  
  stopServer: (id: string) => 
    apiClient.post(`/mcp/servers/${id}/stop`),
  
  restartServer: (id: string) => 
    apiClient.post(`/mcp/servers/${id}/restart`),
};
```

### 7.2 状态管理

建议使用Redux Toolkit管理MCP相关状态：

```typescript
// src/store/slices/mcpSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMcpServers = createAsyncThunk(
  'mcp/fetchServers',
  async (params: GetMcpServersRequest) => {
    const response = await mcpApi.getServers(params);
    return response.data;
  }
);

const mcpSlice = createSlice({
  name: 'mcp',
  initialState: {
    servers: [],
    statistics: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMcpServers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMcpServers.fulfilled, (state, action) => {
        state.loading = false;
        state.servers = action.payload.data;
      })
      .addCase(fetchMcpServers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
```

---

**文档版本**: v1.0  
**创建时间**: 2024-07-10  
**最后更新**: 2024-07-10  
**维护者**: 天工开悟团队
