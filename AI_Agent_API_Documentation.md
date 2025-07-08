# AI Agent 创建 API 文档

## 概述

基于 `src/pages/AIAgent/AIAgentManagement.tsx` 分析，AI Agent 创建功能需要以下参数和配置。

## API 端点

```
POST /api/v1/ai-agents
```

## 请求参数

### 必填参数

| 参数名 | 类型 | 描述 | 验证规则 |
|--------|------|------|----------|
| `name` | string | 智能体名称 | 必填，最大长度50字符 |
| `type` | string | 智能体类型 | 必填，枚举值见下表 |
| `description` | string | 智能体描述 | 必填，最大长度200字符 |
| `maxConcurrency` | number | 最大并发数 | 必填，范围1-20 |
| `timeout` | number | 超时时间(秒) | 必填，范围10-300 |
| `retryCount` | number | 重试次数 | 必填，可选值：0,1,2,3,5 |

### 可选参数

| 参数名 | 类型 | 描述 | 默认值 |
|--------|------|------|--------|
| `autoRestart` | boolean | 自动重启开关 | true |

## 智能体类型枚举

| 类型值 | 显示名称 | 图标 | 颜色 | 描述 |
|--------|----------|------|------|------|
| `monitor` | 监控智能体 | MonitorOutlined | blue | 系统监控和健康检查 |
| `analysis` | 分析智能体 | BarChartOutlined | green | 数据分析和日志分析 |
| `deployment` | 部署智能体 | ApiOutlined | purple | 自动化部署和配置管理 |
| `optimization` | 优化智能体 | ThunderboltOutlined | orange | 性能优化和资源调优 |
| `security` | 安全智能体 | ExclamationCircleOutlined | red | 安全扫描和威胁检测 |
| `backup` | 备份智能体 | CheckCircleOutlined | cyan | 数据备份和恢复 |
| `gateway` | 网关智能体 | ApiOutlined | geekblue | API网关和流量管理 |
| `planning` | 规划智能体 | BarChartOutlined | magenta | 容量规划和资源预测 |
| `diagnosis` | 诊断智能体 | MonitorOutlined | volcano | 故障诊断和根因分析 |
| `config` | 配置智能体 | ApiOutlined | lime | 配置管理和变更控制 |
| `traffic` | 流量智能体 | BarChartOutlined | gold | 流量分析和负载均衡 |

## 请求示例

### JSON 格式

```json
{
  "name": "系统监控智能体",
  "type": "monitor",
  "description": "负责监控系统健康状态，自动检测异常并发送告警",
  "maxConcurrency": 5,
  "timeout": 60,
  "retryCount": 3,
  "autoRestart": true
}
```

### cURL 示例

```bash
curl -X POST "http://localhost:8080/api/v1/ai-agents" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "系统监控智能体",
    "type": "monitor", 
    "description": "负责监控系统健康状态，自动检测异常并发送告警",
    "maxConcurrency": 5,
    "timeout": 60,
    "retryCount": 3,
    "autoRestart": true
  }'
```

## 响应格式

### 成功响应 (201 Created)

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "智能体创建成功",
  "data": {
    "id": "agent_123456789",
    "name": "系统监控智能体",
    "type": "monitor",
    "status": "stopped",
    "description": "负责监控系统健康状态，自动检测异常并发送告警",
    "version": "v1.0.0",
    "cpu": 0,
    "memory": 0,
    "tasks": 0,
    "successRate": 0,
    "lastActive": null,
    "createdAt": "2024-07-08T12:00:00Z",
    "config": {
      "maxConcurrency": 5,
      "timeout": 60,
      "retryCount": 3,
      "autoRestart": true
    }
  }
}
```

### 错误响应

#### 参数验证失败 (400 Bad Request)

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "参数验证失败",
  "errors": [
    {
      "field": "name",
      "message": "智能体名称不能为空"
    },
    {
      "field": "maxConcurrency",
      "message": "最大并发数必须在1-20之间"
    }
  ]
}
```

#### 名称重复 (409 Conflict)

```json
{
  "success": false,
  "code": "DUPLICATE_NAME",
  "message": "智能体名称已存在"
}
```

#### 服务器错误 (500 Internal Server Error)

```json
{
  "success": false,
  "code": "INTERNAL_ERROR", 
  "message": "服务器内部错误"
}
```

## 数据模型

### AIAgent 完整数据结构

```typescript
interface AIAgent {
  id: string;                    // 智能体唯一标识
  name: string;                  // 智能体名称
  type: AgentType;               // 智能体类型
  status: AgentStatus;           // 运行状态
  description: string;           // 功能描述
  version: string;               // 版本号
  cpu: number;                   // CPU使用率(%)
  memory: number;                // 内存使用量(MB)
  tasks: number;                 // 已完成任务数
  successRate: number;           // 成功率(%)
  lastActive: string | null;     // 最后活跃时间
  createdAt: string;             // 创建时间
  config: AgentConfig;           // 配置信息
}

type AgentType = 
  | 'monitor' 
  | 'analysis' 
  | 'deployment' 
  | 'optimization'
  | 'security'
  | 'backup'
  | 'gateway'
  | 'planning'
  | 'diagnosis'
  | 'config'
  | 'traffic';

type AgentStatus = 'running' | 'stopped' | 'paused';

interface AgentConfig {
  maxConcurrency: number;        // 最大并发数 (1-20)
  timeout: number;               // 超时时间，秒 (10-300)
  retryCount: number;            // 重试次数 (0,1,2,3,5)
  autoRestart: boolean;          // 自动重启开关
}
```

## 前端表单配置

### 默认值

```javascript
{
  type: 'monitor',
  maxConcurrency: 5,
  timeout: 60,
  retryCount: 3,
  autoRestart: true
}
```

### 滑块配置

#### 最大并发数滑块
- 范围: 1-20
- 标记点: 1, 5, 10, 20

#### 超时时间滑块  
- 范围: 10-300秒
- 标记点: 10s, 1m(60s), 3m(180s), 5m(300s)

### 下拉选项

#### 重试次数选项
- 0: "不重试"
- 1: "1次"
- 2: "2次" 
- 3: "3次"
- 5: "5次"

## 注意事项

1. **名称唯一性**: 智能体名称在系统中必须唯一
2. **类型扩展**: 智能体类型可根据业务需求扩展
3. **资源限制**: 最大并发数和超时时间需要根据系统资源合理设置
4. **版本管理**: 新创建的智能体默认版本为 v1.0.0
5. **状态管理**: 新创建的智能体初始状态为 'stopped'
6. **权限控制**: 需要相应的权限才能创建智能体

## 相关API

- `GET /api/v1/ai-agents` - 获取智能体列表
- `GET /api/v1/ai-agents/{id}` - 获取智能体详情
- `PUT /api/v1/ai-agents/{id}` - 更新智能体配置
- `DELETE /api/v1/ai-agents/{id}` - 删除智能体
- `POST /api/v1/ai-agents/{id}/start` - 启动智能体
- `POST /api/v1/ai-agents/{id}/stop` - 停止智能体
- `POST /api/v1/ai-agents/{id}/pause` - 暂停智能体
