import { api } from './api';

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
  sourceEntityId: string;
  targetEntityId: string;
  type: string;
  description?: string;
  properties?: Record<string, unknown>;
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
      
      const response = await api.post('/relation/list-by-graph', {
        graphId: params.graphId,
        page: params.page || 1,
        size: params.size || 50
      });

      console.log('✅ 关系查询API响应:', {
        success: response.data.success,
        relationCount: response.data.data?.data?.length || 0,
        total: response.data.data?.total
      });

      return response.data;
    } catch (error) {
      console.error('❌ 关系查询API调用失败:', error);
      throw error;
    }
  }
};
