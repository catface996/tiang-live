// 节点状态枚举
export enum NodeStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped'
}

// 注意：LayeredTaskNode 和相关函数已移至 utils/layeredTopologyUtils.ts
// 这样可以避免循环依赖和导入问题
