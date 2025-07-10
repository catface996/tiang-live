# API通信架构说明

## 概述

本项目已建立了统一的前后端API通信架构，包含标准化的类型定义、服务层和工具函数，用于规范化数据交互和提高代码可维护性。

## 架构组成

### 1. 类型定义层 (`src/types/api.ts`)

定义了所有与后端通信的标准化接口类型：

#### 基础类型

- `Status` - 通用状态枚举
- `ApiResponse<T>` - 统一响应格式
- `PaginationRequest/Response` - 分页相关类型

#### 核心业务类型

- `Entity` - 实体标准定义
- `Agent` - Agent标准定义
- `EntityDependency` - 实体依赖关系
- `EntityAgentRelation` - 实体与Agent关系
- `TopologyData` - 拓扑数据结构
- `TopologyAnalysisRequest/Response` - 拓扑分析请求/响应

#### 操作类型

- `Create*Request` - 创建操作请求
- `Update*Request` - 更新操作请求
- `*QueryRequest` - 查询操作请求
- `BatchOperationRequest/Response` - 批量操作

### 2. 服务层 (`src/services/api.ts`)

提供统一的API调用服务：

#### API客户端

- 统一的HTTP客户端配置
- 请求/响应拦截器
- 错误处理和日志记录
- 认证token管理

#### 业务API服务

- `entityApi` - 实体管理API
- `agentApi` - Agent管理API
- `relationApi` - 关系管理API
- `topologyApi` - 拓扑分析API
- `planeApi` - 平面管理API
- `monitoringApi` - 监控告警API

### 3. 类型转换工具 (`src/utils/apiTypeConverter.ts`)

处理新旧接口兼容性：

#### 转换函数

- `convertLegacyEntityToApi()` - 旧实体格式转新格式
- `convertLegacyEntityToAgent()` - 旧实体转Agent格式
- `convertLegacyDependencyToApi()` - 旧依赖关系转新格式
- `analyzeAndConvertTopologyData()` - 拓扑数据分析转换

#### 模拟工具

- `simulateTopologyAnalysis()` - 模拟拓扑分析API
- `displayAnalysisResults()` - 分析结果展示

## 使用示例

### 1. 基本API调用

```typescript
import { entityApi, agentApi } from '../services/api';
import type { CreateEntityRequest, Entity } from '../types/api';

// 创建实体
const createEntity = async (data: CreateEntityRequest): Promise<Entity> => {
  return await entityApi.createEntity(data);
};

// 获取实体列表
const getEntities = async () => {
  const result = await entityApi.getEntities({
    page: 1,
    pageSize: 20,
    status: 'active'
  });
  return result.items;
};
```

### 2. 拓扑分析

```typescript
import { topologyApi } from '../services/api';
import { createTopologyAnalysisRequest } from '../utils/apiTypeConverter';

// 执行拓扑分析
const analyzeTopology = async (entities, dependencies) => {
  const request = createTopologyAnalysisRequest(entities, dependencies);
  const result = await topologyApi.analyzeTopology(request);
  return result;
};
```

### 3. 类型转换

```typescript
import { analyzeAndConvertTopologyData, simulateTopologyAnalysis } from '../utils/apiTypeConverter';

// 转换旧格式数据
const convertData = (legacyEntities, legacyDependencies) => {
  const { entities, agents, entityDependencies, entityAgentRelations } = analyzeAndConvertTopologyData(
    legacyEntities,
    legacyDependencies
  );

  return { entities, agents, entityDependencies, entityAgentRelations };
};
```

## 数据格式标准

### 实体 (Entity)

```typescript
{
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  description?: string;
  tags?: string[];
  properties: Record<string, any>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    version: number;
  };
}
```

### Agent

```typescript
{
  id: string;
  name: string;
  type: string;
  status: Status;
  agentType: 'monitoring' | 'security' | 'performance' | 'automation' | 'analysis';
  capabilities: string[];
  version: string;
  configuration: Record<string, any>;
  resources: { cpu: number; memory: number; storage: number };
  metadata: { ... };
}
```

### 拓扑分析请求

```typescript
{
  topologyId: string;
  entities: Entity[];
  agents: Agent[];
  entityDependencies: EntityDependency[];
  entityAgentRelations: EntityAgentRelation[];
  analysisOptions: {
    checkHealthStatus: boolean;
    detectAnomalies: boolean;
    performanceAnalysis: boolean;
    securityCheck: boolean;
    dependencyAnalysis: boolean;
    agentEfficiencyAnalysis: boolean;
  };
}
```

## 优势特点

### 1. 类型安全

- 完整的TypeScript类型定义
- 编译时类型检查
- IDE智能提示和自动补全

### 2. 统一标准

- 标准化的数据格式
- 一致的API调用方式
- 统一的错误处理

### 3. 向后兼容

- 支持旧格式数据转换
- 渐进式迁移
- 不影响现有功能

### 4. 可扩展性

- 模块化设计
- 易于添加新的API服务
- 支持批量操作

### 5. 开发效率

- 减少重复代码
- 统一的调用模式
- 完善的工具函数

## 最佳实践

### 1. API调用

- 始终使用统一的API服务
- 正确处理异步操作
- 合理使用错误处理

### 2. 类型使用

- 导入正确的类型定义
- 避免使用any类型
- 利用类型推导

### 3. 数据转换

- 使用提供的转换工具
- 保持数据格式一致
- 验证转换结果

### 4. 错误处理

- 使用try-catch包装API调用
- 提供用户友好的错误信息
- 记录详细的错误日志

## 未来规划

1. **实时通信** - 添加WebSocket支持
2. **缓存机制** - 实现API响应缓存
3. **离线支持** - 支持离线数据同步
4. **性能优化** - 请求合并和批处理
5. **监控集成** - API调用监控和分析

## 迁移指南

### 从旧格式迁移到新格式

1. **导入新类型**

```typescript
import type { Entity, Agent, EntityDependency } from '../types/api';
```

2. **使用转换工具**

```typescript
import { analyzeAndConvertTopologyData } from '../utils/apiTypeConverter';
```

3. **更新API调用**

```typescript
// 旧方式
const response = await fetch('/api/entities');

// 新方式
const entities = await entityApi.getEntities();
```

4. **更新组件Props**

```typescript
// 使用新的类型定义
interface ComponentProps {
  entities: Entity[];
  agents: Agent[];
}
```

通过这套统一的API架构，项目的前后端通信将更加规范、类型安全和易于维护。
