/**
 * 图操作API服务
 */

import { apiClient } from './api';

// 图状态枚举
export enum GraphStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
  PROCESSING = 'PROCESSING'
}

// 图数据类型定义
export interface Graph {
  id?: number;
  name: string;
  description?: string;
  labels?: string[];
  status?: GraphStatus;
  ownerId: number;
  entityCount?: number;
  relationCount?: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// 保存图请求
export interface SaveGraphRequest {
  id?: number;
  name: string;
  description?: string;
  labels?: string[];
  status?: GraphStatus;
  ownerId: number;
  metadata?: Record<string, any>;
}

// 查询图请求
export interface QueryGraphRequest {
  name?: string;
  ownerId?: number;
  status?: GraphStatus;
  label?: string;
  page?: number;
  size?: number;
}

// 删除图请求
export interface DeleteGraphRequest {
  graphId: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

/**
 * 图操作API服务类
 */
export const graphApi = {
  /**
   * 保存图（创建或更新）
   */
  async saveGraph(request: SaveGraphRequest): Promise<ApiResponse<Graph>> {
    return apiClient.post('/api/graph/save', request);
  },

  /**
   * 查询图列表
   */
  async listGraphs(request: QueryGraphRequest = {}): Promise<ApiResponse<Graph[]>> {
    return apiClient.post('/api/graph/list', request);
  },

  /**
   * 删除图
   */
  async deleteGraph(request: DeleteGraphRequest): Promise<ApiResponse<void>> {
    return apiClient.post('/api/graph/delete', request);
  },

  /**
   * 根据ID获取图详情
   */
  async getGraphById(id: number): Promise<ApiResponse<Graph>> {
    return apiClient.get(`/api/graph/${id}`);
  },

  /**
   * 创建新图
   */
  async createGraph(graph: Omit<SaveGraphRequest, 'id'>): Promise<ApiResponse<Graph>> {
    return this.saveGraph(graph);
  },

  /**
   * 更新图
   */
  async updateGraph(graph: SaveGraphRequest & { id: number }): Promise<ApiResponse<Graph>> {
    return this.saveGraph(graph);
  },

  /**
   * 根据所有者ID查询图列表
   */
  async getGraphsByOwner(ownerId: number): Promise<ApiResponse<Graph[]>> {
    return this.listGraphs({ ownerId });
  },

  /**
   * 根据状态查询图列表
   */
  async getGraphsByStatus(status: GraphStatus): Promise<ApiResponse<Graph[]>> {
    return this.listGraphs({ status });
  },

  /**
   * 搜索图（按名称模糊查询）
   */
  async searchGraphs(name: string): Promise<ApiResponse<Graph[]>> {
    return this.listGraphs({ name });
  }
};

export default graphApi;
