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
 * 删除关系参数接口
 */
export interface DeleteRelationParams {
  relationId: string;
  graphId?: string;
  sourceEntityId?: string;
  targetEntityId?: string;
  relationName?: string;
  relationType?: string;
}

/**
 * 删除关系响应接口
 */
export interface DeleteRelationResponse {
  success: boolean;
  code: string;
  message: string;
  data?: any;
}
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
  },

  /**
   * 删除关系
   */
  async deleteRelation(params: DeleteRelationParams): Promise<DeleteRelationResponse> {
    try {
      console.log('🗑️ 调用删除关系API:', params);
      
      // 使用POST方法删除关系，符合后端API设计
      const response = await apiClient.postFullResponse('/relation/delete', {
        relationId: params.relationId,
        graphId: params.graphId,
        sourceEntityId: params.sourceEntityId,
        targetEntityId: params.targetEntityId,
        relationName: params.relationName,
        relationType: params.relationType
      });

      console.log('✅ 删除关系API原始响应:', {
        success: response?.success,
        code: response?.code,
        message: response?.message,
        relationId: params.relationId,
        fullResponse: response
      });

      // 检查业务逻辑成功状态
      if (!response || response.success !== true) {
        const errorMsg = response?.message || response?.code || '删除关系失败';
        console.error('❌ 删除关系业务逻辑失败:', errorMsg);
        throw new Error(errorMsg);
      }

      return response as DeleteRelationResponse;
    } catch (error) {
      console.error('❌ 删除关系API调用失败:', {
        error,
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        relationId: params.relationId
      });
      
      // 重新抛出一个更清晰的错误
      const errorMessage = error?.response?.data?.message || error?.message || '删除关系网络请求失败';
      throw new Error(errorMessage);
    }
  }
};
