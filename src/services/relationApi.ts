import { apiClient } from './api';

/**
 * 关系查询参数接口
 */
export interface ListRelationsByGraphParams {
  graphId: string;
  page?: number;
  size?: number;
}

/**
 * 关系信息接口
 */
export interface Relation {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  sourceEntityId: string;
  targetEntityId: string;
  direction: 'UNIDIRECTIONAL' | 'BIDIRECTIONAL';
  weight: number;
  properties?: Record<string, unknown>;
  metadata?: Record<string, unknown> | null;
  graphId: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 关系查询响应接口
 */
export interface ListRelationsByGraphResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    data: Relation[];
    page: number;
    size: number;
    total: string;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * 关系API服务
 */
export const relationApi = {
  /**
   * 查询图中的实体依赖关系
   */
  async listRelationsByGraph(params: ListRelationsByGraphParams): Promise<ListRelationsByGraphResponse> {
    try {
      console.log('🔗 调用关系查询API:', params);
      
      const response = await apiClient.post('/relation/list-by-graph', {
        graphId: params.graphId,
        page: params.page || 1,
        size: params.size || 50
      });

      console.log('✅ 关系查询API原始响应:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        success: response.data?.success,
        relationCount: response.data?.data?.data?.length || 0,
        total: response.data?.data?.total
      });

      // 检查响应状态
      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 检查业务逻辑成功状态
      if (!response.data || response.data.success !== true) {
        throw new Error(response.data?.message || '业务逻辑处理失败');
      }

      return response.data;
    } catch (error) {
      console.error('❌ 关系查询API调用失败:', {
        error,
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      throw error;
    }
  }
};
