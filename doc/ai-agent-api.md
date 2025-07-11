# AI智能体管理模块 API 接口文档

## 概述

本文档描述了AI智能体管理模块所需的后端API接口，包括智能体的增删改查、统计概览等功能。

## 基础信息

- **基础路径**: `/api/ai-agent`
- **认证方式**: Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 数据模型

### AIAgent 智能体实体

```typescript
interface AIAgent {
  id: string;                    // 智能体唯一标识
  name: string;                  // 智能体名称
  description: string;           // 智能体描述
  type: 'chat' | 'task' | 'analysis' | 'monitoring';  // 智能体类型
  status: 'active' | 'inactive' | 'training';         // 智能体状态
  
  // 模型配置
  model: {
    provider: string;            // 模型提供商 (OpenAI, Anthropic, etc.)
    modelName: string;           // 模型名称
    version: string;             // 模型版本
    config: {
      temperature: number;       // 温度参数 (0.0-2.0)
      maxTokens: number;         // 最大令牌数
      topP: number;             // Top-P 参数
      frequencyPenalty: number; // 频率惩罚
      presencePenalty: number;  // 存在惩罚
    };
  };
  
  // 提示词配置
  prompts: {
    system: string;              // 系统提示词
    templates: string[];         // 使用的模板ID列表
    variables: Record<string, string>; // 模板变量
  };
  
  // MCP服务器配置
  mcpServers: string[];          // MCP服务器ID列表
  
  // 能力配置
  capabilities: string[];        // 智能体能力列表
  
  // 运行设置
  settings: {
    autoStart: boolean;          // 自动启动
    maxConcurrency: number;      // 最大并发数
    timeout: number;             // 超时时间(秒)
    retryCount: number;          // 重试次数
    logLevel: 'debug' | 'info' | 'warn' | 'error'; // 日志级别
  };
  
  // 标签和元数据
  tags: string[];                // 标签列表
  
  // 运行时统计
  runtime?: {
    cpu: number;                 // CPU使用率(%)
    memory: number;              // 内存使用量(MB)
    tasks: number;               // 已处理任务数
    successRate: number;         // 成功率(%)
    lastActive: string;          // 最后活跃时间
    uptime: number;              // 运行时长(秒)
  };
  
  // 审计信息
  createdBy: string;             // 创建者
  updatedBy?: string;            // 更新者
  createdAt: string;             // 创建时间 (ISO 8601)
  updatedAt: string;             // 更新时间 (ISO 8601)
}
```

### 统计概览数据模型

```typescript
interface AIAgentStatistics {
  // 基础统计
  totalAgents: number;           // 智能体总数
  activeAgents: number;          // 活跃智能体数
  inactiveAgents: number;        // 非活跃智能体数
  trainingAgents: number;        // 训练中智能体数
  
  // 类型分布
  typeDistribution: {
    chat: number;                // 对话型智能体数量
    task: number;                // 任务型智能体数量
    analysis: number;            // 分析型智能体数量
    monitoring: number;          // 监控型智能体数量
  };
  
  // 运行统计
  totalTasks: number;            // 总任务数
  avgSuccessRate: number;        // 平均成功率
  totalUptime: number;           // 总运行时长(秒)
  
  // 资源使用
  totalCpuUsage: number;         // 总CPU使用率
  totalMemoryUsage: number;      // 总内存使用量(MB)
  
  // 时间统计
  last24h: {
    newAgents: number;           // 24小时内新增智能体
    completedTasks: number;      // 24小时内完成任务数
    errors: number;              // 24小时内错误数
  };
  
  // 热门配置
  popularModels: Array<{
    provider: string;
    modelName: string;
    count: number;
  }>;
  
  popularMcpServers: Array<{
    serverId: string;
    serverName: string;
    count: number;
  }>;
}
```

## API 接口

### 1. 获取智能体列表 (支持分页)

**接口地址**: `GET /api/ai-agent/list`

**请求参数**:
```typescript
interface ListAgentsRequest {
  // 分页参数
  page?: number;                 // 页码，默认1
  size?: number;                 // 每页大小，默认10
  
  // 搜索参数
  search?: string;               // 搜索关键词(名称、描述)
  
  // 筛选参数
  type?: 'chat' | 'task' | 'analysis' | 'monitoring'; // 智能体类型
  status?: 'active' | 'inactive' | 'training';        // 智能体状态
  tags?: string[];               // 标签筛选
  createdBy?: string;            // 创建者筛选
  
  // 排序参数
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'tasks' | 'successRate';
  sortOrder?: 'asc' | 'desc';    // 排序方向，默认desc
  
  // 时间范围
  createdAfter?: string;         // 创建时间起始 (ISO 8601)
  createdBefore?: string;        // 创建时间结束 (ISO 8601)
}
```

**响应数据**:
```typescript
interface ListAgentsResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    data: AIAgent[];             // 智能体列表
    page: number;                // 当前页码
    size: number;                // 每页大小
    total: number;               // 总记录数
    totalPages: number;          // 总页数
    hasNext: boolean;            // 是否有下一页
    hasPrevious: boolean;        // 是否有上一页
  };
  timestamp: string;
}
```

**请求示例**:
```bash
GET /api/ai-agent/list?page=1&size=10&search=监控&type=monitoring&status=active&sortBy=createdAt&sortOrder=desc
```

### 2. 保存智能体 (创建/更新)

**接口地址**: `POST /api/ai-agent/save`

**请求参数**:
```typescript
interface SaveAgentRequest {
  id?: string;                   // 智能体ID，更新时必填，创建时不填
  name: string;                  // 智能体名称
  description: string;           // 智能体描述
  type: 'chat' | 'task' | 'analysis' | 'monitoring';
  status?: 'active' | 'inactive' | 'training'; // 默认inactive
  
  model: {
    provider: string;
    modelName: string;
    version: string;
    config: {
      temperature: number;
      maxTokens: number;
      topP: number;
      frequencyPenalty: number;
      presencePenalty: number;
    };
  };
  
  prompts: {
    system: string;
    templates: string[];
    variables: Record<string, string>;
  };
  
  mcpServers: string[];
  capabilities: string[];
  
  settings: {
    autoStart: boolean;
    maxConcurrency: number;
    timeout: number;
    retryCount: number;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  
  tags: string[];
}
```

**响应数据**:
```typescript
interface SaveAgentResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: string;                  // 智能体ID
    name: string;                // 智能体名称
    operation: 'create' | 'update'; // 操作类型
    createdAt?: string;          // 创建时间(仅创建时返回)
    updatedAt: string;           // 更新时间
  };
  timestamp: string;
}
```

**请求示例**:
```json
{
  "name": "系统监控智能体",
  "description": "负责监控系统健康状态，自动检测异常并发送告警",
  "type": "monitoring",
  "status": "active",
  "model": {
    "provider": "OpenAI",
    "modelName": "GPT-4",
    "version": "gpt-4-0613",
    "config": {
      "temperature": 0.7,
      "maxTokens": 2048,
      "topP": 1.0,
      "frequencyPenalty": 0.0,
      "presencePenalty": 0.0
    }
  },
  "prompts": {
    "system": "你是一个专业的系统监控智能体...",
    "templates": ["monitoring-template-001"],
    "variables": {
      "system_name": "生产环境",
      "alert_threshold": "90%"
    }
  },
  "mcpServers": ["database-mcp", "email-mcp"],
  "capabilities": ["monitoring", "alerting", "analysis"],
  "settings": {
    "autoStart": true,
    "maxConcurrency": 10,
    "timeout": 30,
    "retryCount": 3,
    "logLevel": "info"
  },
  "tags": ["监控", "告警", "生产环境"]
}
```

### 3. 删除智能体

**接口地址**: `DELETE /api/ai-agent/delete/{id}`

**路径参数**:
- `id`: 智能体ID

**请求参数**: 无

**响应数据**:
```typescript
interface DeleteAgentResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: string;                  // 被删除的智能体ID
    name: string;                // 被删除的智能体名称
    deletedAt: string;           // 删除时间
  };
  timestamp: string;
}
```

**请求示例**:
```bash
DELETE /api/ai-agent/delete/agent-001
```

### 4. 获取智能体详情

**接口地址**: `GET /api/ai-agent/detail/{id}`

**路径参数**:
- `id`: 智能体ID

**响应数据**:
```typescript
interface GetAgentDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: AIAgent;                 // 完整的智能体信息
  timestamp: string;
}
```

### 5. 统计概览

**接口地址**: `GET /api/ai-agent/stats/overview`

**请求参数**: 无

**响应数据**:
```typescript
interface GetStatisticsResponse {
  success: boolean;
  code: string;
  message: string;
  data: AIAgentStatistics;       // 统计概览数据
  timestamp: string;
}
```

**响应示例**:
```json
{
  "success": true,
  "code": "200",
  "message": "获取统计信息成功",
  "data": {
    "totalAgents": 15,
    "activeAgents": 12,
    "inactiveAgents": 2,
    "trainingAgents": 1,
    "typeDistribution": {
      "chat": 5,
      "task": 4,
      "analysis": 3,
      "monitoring": 3
    },
    "totalTasks": 15420,
    "avgSuccessRate": 96.8,
    "totalUptime": 2592000,
    "totalCpuUsage": 45.6,
    "totalMemoryUsage": 4096,
    "last24h": {
      "newAgents": 2,
      "completedTasks": 1247,
      "errors": 15
    },
    "popularModels": [
      {
        "provider": "OpenAI",
        "modelName": "GPT-4",
        "count": 8
      },
      {
        "provider": "Anthropic",
        "modelName": "Claude-3",
        "count": 4
      }
    ],
    "popularMcpServers": [
      {
        "serverId": "database-mcp",
        "serverName": "数据库连接器",
        "count": 10
      },
      {
        "serverId": "email-mcp",
        "serverName": "邮件服务",
        "count": 6
      }
    ]
  },
  "timestamp": "2024-07-11T05:30:00.000Z"
}
```

### 6. 批量操作

#### 6.1 批量删除智能体

**接口地址**: `POST /api/ai-agent/batch/delete`

**请求参数**:
```typescript
interface BatchDeleteRequest {
  ids: string[];                 // 智能体ID列表
}
```

**响应数据**:
```typescript
interface BatchDeleteResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    deletedCount: number;        // 成功删除数量
    failedIds: string[];         // 删除失败的ID列表
    deletedAt: string;           // 删除时间
  };
  timestamp: string;
}
```

#### 6.2 批量更新状态

**接口地址**: `POST /api/ai-agent/batch/status`

**请求参数**:
```typescript
interface BatchUpdateStatusRequest {
  ids: string[];                 // 智能体ID列表
  status: 'active' | 'inactive' | 'training'; // 目标状态
}
```

**响应数据**:
```typescript
interface BatchUpdateStatusResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    updatedCount: number;        // 成功更新数量
    failedIds: string[];         // 更新失败的ID列表
    updatedAt: string;           // 更新时间
  };
  timestamp: string;
}
```

## 错误码说明

| 错误码 | 说明 | HTTP状态码 |
|--------|------|------------|
| 200 | 操作成功 | 200 |
| 400 | 请求参数错误 | 400 |
| 401 | 未授权访问 | 401 |
| 403 | 权限不足 | 403 |
| 404 | 智能体不存在 | 404 |
| 409 | 智能体名称已存在 | 409 |
| 422 | 数据验证失败 | 422 |
| 500 | 服务器内部错误 | 500 |

## 数据验证规则

### 智能体名称
- 必填，长度2-50字符
- 不能包含特殊字符，仅支持中文、英文、数字、下划线、连字符

### 智能体描述
- 必填，长度10-500字符

### 模型配置
- `temperature`: 0.0-2.0之间的数值
- `maxTokens`: 1-32768之间的整数
- `topP`: 0.0-1.0之间的数值
- `frequencyPenalty`: -2.0-2.0之间的数值
- `presencePenalty`: -2.0-2.0之间的数值

### 运行设置
- `maxConcurrency`: 1-100之间的整数
- `timeout`: 1-3600之间的整数(秒)
- `retryCount`: 0-10之间的整数

## 性能要求

- 列表查询响应时间 < 500ms
- 单个智能体操作响应时间 < 200ms
- 统计概览查询响应时间 < 1000ms
- 支持并发请求数 >= 100

## 安全要求

- 所有接口需要Bearer Token认证
- 敏感信息(如API密钥)需要脱敏处理
- 操作日志记录，包含用户、时间、操作类型
- 支持RBAC权限控制

## 备注

1. 所有时间字段使用ISO 8601格式 (YYYY-MM-DDTHH:mm:ss.sssZ)
2. 分页从1开始计数
3. 删除操作建议使用软删除，保留审计记录
4. 智能体运行时统计数据可以异步更新
5. 建议实现接口幂等性，避免重复操作
