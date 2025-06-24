# 任务集合运行详情功能

## 功能概述

在天工开悟系统中新增了任务集合运行详情展示页面，该页面提供了任务集合执行过程中节点拓扑关系的可视化展示，以及详细的执行结果查看功能。

## 主要特性

### 1. 节点拓扑关系图
- **可视化展示**: 使用D3.js力导向图展示任务节点之间的依赖关系
- **交互式操作**: 支持节点拖拽、缩放等交互操作
- **状态区分**: 不同颜色表示不同的节点执行状态
  - 🟢 绿色: 已完成 (completed)
  - 🔵 蓝色: 运行中 (running)  
  - ⚪ 灰色: 等待中 (pending)
  - 🔴 红色: 失败 (failed)
  - 🟡 黄色: 已跳过 (skipped)

### 2. 节点详情查看
- **点击查看**: 点击任意节点可查看详细信息
- **执行结果**: 展示每个检查动作的执行结果
- **时间线**: 按时间顺序展示执行过程
- **依赖关系**: 显示节点的依赖关系

### 3. 实时状态更新
- **自动刷新**: 支持自动刷新功能，实时更新执行状态
- **手动刷新**: 提供手动刷新按钮
- **状态统计**: 实时显示执行统计信息

## 页面结构

### 1. 页面头部
- 返回按钮: 返回任务集合列表页面
- 页面标题: 显示任务集合名称和运行ID
- 操作按钮: 刷新、自动刷新开关

### 2. 统计信息卡片
- 总节点数
- 已完成节点数
- 失败节点数  
- 成功率

### 3. 基本信息
- 开始时间
- 结束时间
- 运行时长
- 创建者
- 运行状态
- 进度条

### 4. 拓扑关系图
- 节点可视化展示
- 依赖关系连线
- 图例说明
- 操作提示

### 5. 节点详情抽屉
- 基本信息
- 检查动作
- 执行结果
- 依赖关系

## 技术实现

### 1. 核心技术栈
- **React 19**: 前端框架
- **TypeScript**: 类型安全
- **Antd 5.26**: UI组件库
- **D3.js**: 数据可视化
- **Styled Components**: 样式管理

### 2. 关键组件
```typescript
// 节点状态枚举
enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running', 
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 任务节点接口
interface TaskNode {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  status: NodeStatus;
  actions: string[];
  startTime?: string;
  endTime?: string;
  duration?: number;
  results?: TaskResult[];
  dependencies?: string[];
}

// 任务结果接口
interface TaskResult {
  actionId: string;
  actionName: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
  timestamp: string;
}
```

### 3. 拓扑图实现
使用D3.js力导向图算法实现节点布局和交互:

```typescript
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(50));
```

## 路由配置

新增路由路径:
```
/task-management/task-collections/run/:runId
```

## 数据结构

### Mock数据文件
- `src/data/taskRunData.json`: 任务运行详情模拟数据

### 主要数据结构
```json
{
  "taskRuns": [
    {
      "id": "run_1_1719230400000",
      "collectionId": "1", 
      "collectionName": "核心服务监控任务",
      "status": "running",
      "startTime": "2024-06-24 13:00:00",
      "totalNodes": 8,
      "completedNodes": 5,
      "failedNodes": 1,
      "successRate": 75,
      "nodes": [...]
    }
  ]
}
```

## 使用方式

### 1. 从任务集合列表进入
在任务集合管理页面，点击任务卡片上的"查看运行详情"按钮(📊图标)

### 2. 直接访问
通过URL直接访问: `/task-management/task-collections/run/{runId}`

## 功能扩展

### 1. 已实现功能
- ✅ 节点拓扑关系可视化
- ✅ 不同状态节点颜色区分
- ✅ 节点详情查看
- ✅ 执行结果展示
- ✅ 实时状态更新
- ✅ 依赖关系展示

### 2. 后续可扩展功能
- 🔄 节点执行日志查看
- 🔄 执行过程录像回放
- 🔄 性能指标图表
- 🔄 告警信息集成
- 🔄 执行计划调整
- 🔄 批量操作支持

## 注意事项

1. **性能优化**: 大量节点时考虑虚拟化渲染
2. **响应式设计**: 适配不同屏幕尺寸
3. **错误处理**: 完善的错误提示和降级方案
4. **数据更新**: 合理的刷新频率避免性能问题
5. **用户体验**: 加载状态和交互反馈

## 文件清单

### 新增文件
- `src/pages/TaskCollection/TaskCollectionRunDetail.tsx` - 运行详情页面组件
- `src/data/taskRunData.json` - 模拟数据文件
- `TASK_COLLECTION_RUN_DETAIL.md` - 功能说明文档

### 修改文件
- `src/pages/TaskCollection/index.ts` - 导出新组件
- `src/routes/index.tsx` - 添加新路由
- `src/pages/TaskCollection/TaskCollectionManagement.tsx` - 添加跳转按钮
- `src/pages/Relation/RelationshipGraph.tsx` - 完善关系图谱示例

## 总结

任务集合运行详情功能为天工开悟系统提供了强大的任务执行监控能力，通过直观的拓扑图展示和详细的执行结果查看，帮助用户更好地理解和监控任务执行过程，提升运维效率。
