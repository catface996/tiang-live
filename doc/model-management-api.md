# 模型管理后端接口设计

## 接口概述

为 ModelManagement.tsx 页面设计的后端接口，提供AI模型的完整生命周期管理，包括模型配置、统计、测试和监控功能。

## 数据模型定义

### ModelConfig 模型配置

```typescript
interface ModelConfig {
  id: string;
  name: string;
  provider: string; // OpenAI, Anthropic, Google, Azure
  modelType: 'llm' | 'embedding' | 'image' | 'audio';
  version: string;
  apiEndpoint: string;
  apiKey: string; // 加密存储
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  status: 'active' | 'inactive' | 'testing';
  description: string;
  capabilities: string[];
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  usageCount: number;
}
```

## 1. 模型列表接口

### 接口信息
- **URL**: `GET /api/model/list`
- **描述**: 获取所有模型配置列表，支持筛选和搜索
- **权限**: 需要管理员权限

### 请求参数
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| search | string | 否 | 搜索关键词（模型名称、描述） |
| provider | string | 否 | 提供商筛选：OpenAI/Anthropic/Google/Azure |
| modelType | string | 否 | 模型类型筛选：llm/embedding/image/audio |
| status | string | 否 | 状态筛选：active/inactive/testing |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认20 |

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取模型列表成功",
  "data": {
    "models": [
      {
        "id": "model-001",
        "name": "GPT-4 Turbo",
        "provider": "OpenAI",
        "modelType": "llm",
        "version": "gpt-4-1106-preview",
        "apiEndpoint": "https://api.openai.com/v1/chat/completions",
        "apiKey": "sk-*********************",
        "maxTokens": 4096,
        "temperature": 0.7,
        "topP": 1.0,
        "frequencyPenalty": 0.0,
        "presencePenalty": 0.0,
        "status": "active",
        "description": "最新的GPT-4模型，支持更长的上下文",
        "capabilities": [
          "文本生成",
          "代码生成",
          "问答对话",
          "文本分析",
          "翻译"
        ],
        "pricing": {
          "inputTokens": 0.01,
          "outputTokens": 0.03,
          "currency": "USD"
        },
        "limits": {
          "requestsPerMinute": 500,
          "tokensPerMinute": 150000,
          "dailyLimit": 1000000
        },
        "createdBy": "admin",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastModified": "2024-01-20T14:25:00Z",
        "lastUsed": "2024-01-20T16:45:00Z",
        "usageCount": 15420
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

## 2. 模型详情接口

### 接口信息
- **URL**: `GET /api/model/detail/{id}`
- **描述**: 获取指定模型的详细配置信息
- **权限**: 需要管理员权限

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取模型详情成功",
  "data": {
    "id": "model-001",
    "name": "GPT-4 Turbo",
    "provider": "OpenAI",
    "modelType": "llm",
    "version": "gpt-4-1106-preview",
    "apiEndpoint": "https://api.openai.com/v1/chat/completions",
    "apiKey": "sk-*********************",
    "maxTokens": 4096,
    "temperature": 0.7,
    "topP": 1.0,
    "frequencyPenalty": 0.0,
    "presencePenalty": 0.0,
    "status": "active",
    "description": "最新的GPT-4模型，支持更长的上下文",
    "capabilities": [
      "文本生成",
      "代码生成",
      "问答对话",
      "文本分析",
      "翻译"
    ],
    "pricing": {
      "inputTokens": 0.01,
      "outputTokens": 0.03,
      "currency": "USD"
    },
    "limits": {
      "requestsPerMinute": 500,
      "tokensPerMinute": 150000,
      "dailyLimit": 1000000
    },
    "createdBy": "admin",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastModified": "2024-01-20T14:25:00Z",
    "lastUsed": "2024-01-20T16:45:00Z",
    "usageCount": 15420,
    "usageHistory": [
      {
        "date": "2024-01-20",
        "requestCount": 245,
        "tokenCount": 12500,
        "errorCount": 2
      }
    ]
  }
}
```

## 3. 创建模型接口

### 接口信息
- **URL**: `POST /api/model/create`
- **描述**: 创建新的模型配置
- **权限**: 需要管理员权限

### 请求体

```json
{
  "name": "GPT-4 Turbo",
  "provider": "OpenAI",
  "modelType": "llm",
  "version": "gpt-4-1106-preview",
  "apiEndpoint": "https://api.openai.com/v1/chat/completions",
  "apiKey": "sk-proj-xxxxxxxxxxxx",
  "maxTokens": 4096,
  "temperature": 0.7,
  "topP": 1.0,
  "frequencyPenalty": 0.0,
  "presencePenalty": 0.0,
  "status": "testing",
  "description": "最新的GPT-4模型，支持更长的上下文",
  "capabilities": [
    "文本生成",
    "代码生成",
    "问答对话"
  ],
  "pricing": {
    "inputTokens": 0.01,
    "outputTokens": 0.03,
    "currency": "USD"
  },
  "limits": {
    "requestsPerMinute": 500,
    "tokensPerMinute": 150000,
    "dailyLimit": 1000000
  }
}
```

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "模型创建成功",
  "data": {
    "id": "model-002",
    "name": "GPT-4 Turbo",
    "status": "testing",
    "createdAt": "2024-01-21T10:30:00Z"
  }
}
```

## 4. 更新模型接口

### 接口信息
- **URL**: `PUT /api/model/update/{id}`
- **描述**: 更新指定模型的配置
- **权限**: 需要管理员权限

### 请求体
与创建接口相同，但所有字段都是可选的

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "模型更新成功",
  "data": {
    "id": "model-001",
    "lastModified": "2024-01-21T10:30:00Z"
  }
}
```

## 5. 删除模型接口

### 接口信息
- **URL**: `DELETE /api/model/delete/{id}`
- **描述**: 删除指定的模型配置
- **权限**: 需要管理员权限

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "模型删除成功",
  "data": null
}
```

## 6. 模型测试接口

### 接口信息
- **URL**: `POST /api/model/test/{id}`
- **描述**: 测试指定模型的连接和功能
- **权限**: 需要管理员权限

### 请求体

```json
{
  "testType": "connection", // connection, generation, embedding
  "testPrompt": "Hello, how are you?",
  "parameters": {
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "模型测试成功",
  "data": {
    "testId": "test-001",
    "modelId": "model-001",
    "testType": "connection",
    "status": "success",
    "responseTime": 1250,
    "result": {
      "response": "Hello! I'm doing well, thank you for asking.",
      "tokenUsage": {
        "promptTokens": 6,
        "completionTokens": 12,
        "totalTokens": 18
      }
    },
    "testedAt": "2024-01-21T10:30:00Z"
  }
}
```

## 7. 模型统计接口

### 接口信息
- **URL**: `GET /api/model/stats/overview`
- **描述**: 获取模型管理的统计概览数据
- **权限**: 需要管理员权限

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取统计数据成功",
  "data": {
    "modelStats": {
      "totalModels": 12,
      "activeModels": 8,
      "inactiveModels": 2,
      "testingModels": 2
    },
    "usageStats": {
      "totalRequests": 125420,
      "totalTokens": 8750000,
      "averageResponseTime": 1250,
      "errorRate": 0.02
    },
    "providerStats": [
      {
        "provider": "OpenAI",
        "modelCount": 6,
        "usageCount": 85000,
        "successRate": 99.8
      },
      {
        "provider": "Anthropic",
        "modelCount": 3,
        "usageCount": 25000,
        "successRate": 99.5
      }
    ],
    "typeStats": [
      {
        "modelType": "llm",
        "count": 8,
        "usagePercentage": 85.5
      },
      {
        "modelType": "embedding",
        "count": 3,
        "usagePercentage": 12.3
      }
    ],
    "timestamp": "2024-01-21T10:30:00Z"
  }
}
```

## 8. 模型使用历史接口

### 接口信息
- **URL**: `GET /api/model/usage/{id}`
- **描述**: 获取指定模型的使用历史统计
- **权限**: 需要管理员权限

### 请求参数
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| timeRange | string | 否 | 时间范围：1h/6h/24h/7d/30d，默认7d |
| granularity | string | 否 | 统计粒度：hour/day/week，默认day |

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取使用历史成功",
  "data": {
    "modelId": "model-001",
    "modelName": "GPT-4 Turbo",
    "timeRange": "7d",
    "granularity": "day",
    "usageHistory": [
      {
        "date": "2024-01-15",
        "requestCount": 1250,
        "tokenCount": 85000,
        "errorCount": 5,
        "averageResponseTime": 1200,
        "cost": 12.50
      },
      {
        "date": "2024-01-16",
        "requestCount": 1380,
        "tokenCount": 92000,
        "errorCount": 3,
        "averageResponseTime": 1150,
        "cost": 13.80
      }
    ],
    "summary": {
      "totalRequests": 8750,
      "totalTokens": 625000,
      "totalErrors": 25,
      "averageResponseTime": 1175,
      "totalCost": 87.50,
      "successRate": 99.7
    }
  }
}
```

## 9. 批量操作接口

### 接口信息
- **URL**: `POST /api/model/batch`
- **描述**: 批量操作模型（启用、禁用、删除）
- **权限**: 需要管理员权限

### 请求体

```json
{
  "action": "activate", // activate, deactivate, delete
  "modelIds": ["model-001", "model-002", "model-003"]
}
```

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "批量操作完成",
  "data": {
    "action": "activate",
    "totalCount": 3,
    "successCount": 3,
    "failedCount": 0,
    "results": [
      {
        "modelId": "model-001",
        "status": "success",
        "message": "模型已激活"
      },
      {
        "modelId": "model-002",
        "status": "success",
        "message": "模型已激活"
      },
      {
        "modelId": "model-003",
        "status": "success",
        "message": "模型已激活"
      }
    ]
  }
}
```

## 10. 模型配置验证接口

### 接口信息
- **URL**: `POST /api/model/validate`
- **描述**: 验证模型配置的有效性（不保存）
- **权限**: 需要管理员权限

### 请求体
与创建接口相同

### 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "配置验证成功",
  "data": {
    "valid": true,
    "checks": [
      {
        "type": "api_endpoint",
        "status": "success",
        "message": "API端点可访问"
      },
      {
        "type": "api_key",
        "status": "success",
        "message": "API密钥有效"
      },
      {
        "type": "model_version",
        "status": "success",
        "message": "模型版本存在"
      }
    ],
    "estimatedCost": {
      "inputCost": 0.01,
      "outputCost": 0.03,
      "currency": "USD"
    }
  }
}
```

## TypeScript 接口定义

```typescript
// API响应基础类型
export interface ApiResult<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

// 模型配置类型
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  modelType: 'llm' | 'embedding' | 'image' | 'audio';
  version: string;
  apiEndpoint: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  status: 'active' | 'inactive' | 'testing';
  description: string;
  capabilities: string[];
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  usageCount: number;
}

// 模型列表响应类型
export interface ModelListResponse {
  models: ModelConfig[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// 模型统计响应类型
export interface ModelStatsResponse {
  modelStats: {
    totalModels: number;
    activeModels: number;
    inactiveModels: number;
    testingModels: number;
  };
  usageStats: {
    totalRequests: number;
    totalTokens: number;
    averageResponseTime: number;
    errorRate: number;
  };
  providerStats: Array<{
    provider: string;
    modelCount: number;
    usageCount: number;
    successRate: number;
  }>;
  typeStats: Array<{
    modelType: string;
    count: number;
    usagePercentage: number;
  }>;
  timestamp: string;
}

// 模型测试响应类型
export interface ModelTestResponse {
  testId: string;
  modelId: string;
  testType: string;
  status: 'success' | 'failed';
  responseTime: number;
  result: {
    response?: string;
    tokenUsage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    error?: string;
  };
  testedAt: string;
}
```

## 安全考虑

1. **API密钥加密**：所有API密钥必须加密存储，前端显示时脱敏
2. **权限控制**：所有接口都需要管理员权限验证
3. **审计日志**：记录所有模型配置的变更操作
4. **速率限制**：对测试接口实施速率限制，防止滥用
5. **数据验证**：严格验证所有输入参数，防止注入攻击

## 实现建议

1. **缓存策略**：模型列表和统计数据使用缓存，提高响应速度
2. **异步处理**：模型测试和验证操作使用异步处理
3. **监控告警**：监控模型使用情况，异常时及时告警
4. **备份恢复**：定期备份模型配置，支持快速恢复
5. **版本管理**：支持模型配置的版本管理和回滚
