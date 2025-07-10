# 平面统计数据接口协议

## 接口信息
- **URL**: `GET /api/plane/stats/overview`
- **描述**: 获取平面管理的统计概览数据，用于 PlaneStats 组件展示
- **权限**: 需要登录

## 响应格式

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "获取统计数据成功",
  "data": {
    "planeStats": {
      "totalPlanes": 12,
      "activePlanes": 8,
      "warningPlanes": 3,
      "errorPlanes": 1,
      "maintenancePlanes": 0
    },
    "entityStats": {
      "totalEntities": 1250,
      "healthyEntities": 1100,
      "warningEntities": 120,
      "errorEntities": 30
    },
    "timestamp": "2025-07-10T09:00:00Z"
  }
}
```

## TypeScript 接口定义

```typescript
// API 响应类型
export interface PlaneStatsResponse {
  success: boolean;
  code: string;
  message: string;
  data: PlaneStatsData;
}

// 统计数据类型
export interface PlaneStatsData {
  planeStats: {
    totalPlanes: number;
    activePlanes: number;
    warningPlanes: number;
    errorPlanes: number;
    maintenancePlanes: number;
  };
  entityStats: {
    totalEntities: number;
    healthyEntities: number;
    warningEntities: number;
    errorEntities: number;
  };
  timestamp: string;
}
```

## 数据说明

### planeStats (平面统计)
- `totalPlanes`: 总平面数量
- `activePlanes`: 活跃状态的平面数量
- `warningPlanes`: 警告状态的平面数量  
- `errorPlanes`: 错误状态的平面数量
- `maintenancePlanes`: 维护状态的平面数量

### entityStats (实体统计)
- `totalEntities`: 所有平面下的总实体数量
- `healthyEntities`: 健康状态的实体数量
- `warningEntities`: 警告状态的实体数量
- `errorEntities`: 错误状态的实体数量

## 错误响应

```json
{
  "success": false,
  "code": "STATS_CALCULATION_ERROR",
  "message": "统计数据计算失败",
  "data": null
}
```

## 实现建议

1. **缓存策略**: 统计数据计算量大，建议使用缓存，过期时间 5-10 分钟
2. **数据聚合**: 在数据库层面进行聚合计算，提高性能
3. **异常处理**: 当部分数据缺失时，返回可用的统计信息，不要整体失败
