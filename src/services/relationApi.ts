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
      
      // 使用postFullResponse获取完整的API响应
      const response = await apiClient.postFullResponse('/relation/list-by-graph', {
        graphId: params.graphId,
        page: params.page || 1,
        size: params.size || 50
      });

      console.log('✅ 关系查询API原始响应:', {
        success: response?.success,
        code: response?.code,
        message: response?.message,
        relationCount: response?.data?.data?.length || 0,
        total: response?.data?.total,
        fullResponse: response
      });

      // 检查业务逻辑成功状态
      if (!response || response.success !== true) {
        const errorMsg = response?.message || response?.code || '业务逻辑处理失败';
        console.error('❌ 业务逻辑失败:', errorMsg);
        throw new Error(errorMsg);
      }

      // 验证数据结构
      if (!response.data || !Array.isArray(response.data.data)) {
        console.error('❌ 数据结构异常:', response.data);
        throw new Error('返回数据结构异常');
      }

      return response as ListRelationsByGraphResponse;
    } catch (error) {
      console.error('❌ 关系查询API调用失败:', {
        error,
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      
      // 重新抛出一个更清晰的错误
      const errorMessage = error?.response?.data?.message || error?.message || '网络请求失败';
      throw new Error(errorMessage);
    }
  }
};
