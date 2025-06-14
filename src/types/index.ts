// 基础类型定义

export interface BaseEntity {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// 导出所有类型
export * from './api';
export * from './plane';
