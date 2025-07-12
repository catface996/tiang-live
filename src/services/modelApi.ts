/**
 * ModelApi - 模型管理相关接口
 * 集成后端 LLMController 的所有接口
 */

import { apiClient } from './api';

// 定义请求和响应类型
export interface SaveModelRequest {
  id?: string;
  name: string;
  provider: string;
  modelType: 'llm' | 'embedding' | 'image' | 'audio';
  version: string;
  apiEndpoint: string;
  apiKey: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  status?: 'active' | 'inactive' | 'testing';
  description?: string;
  capabilities?: string[];
  pricing?: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits?: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
}

export interface ModelResponse {
  id: string;
  name: string;
  provider: string;
  modelType: string;
  version: string;
  apiEndpoint: string;
  apiKey: string; // 脱敏显示
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  status: string;
  description: string;
  capabilities: string[];
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
    dailyLimit: number;
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  usageCount: number;
}

export interface ModelListResponse {
  models: ModelResponse[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ModelStatsResponse {
  modelStats: {
    totalModels: number;
    activeModels: number;
    inactiveModels: number;
    testingModels: number;
  };
  usageStats: {
    totalRequests: number;
    totalTokens: number;
    averageResponseTime: number;
    errorRate: number;
  };
  providerStats: Array<{
    provider: string;
    modelCount: number;
    usageCount: number;
    successRate: number;
  }>;
  typeStats: Array<{
    modelType: string;
    count: number;
    usagePercentage: number;
  }>;
  timestamp: string;
}

export interface ModelTestRequest {
  testType?: string;
  testPrompt?: string;
  parameters?: Record<string, any>;
}

export interface ModelTestResponse {
  testId: string;
  modelId: string;
  testType: string;
  status: 'success' | 'failed';
  responseTime: number;
  result: {
    response?: string;
    tokenUsage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    error?: string;
  };
  testedAt: string;
}

export interface ApiResult<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

/**
 * 获取模型列表
 * @param params 查询参数
 * @returns 模型列表
 */
const getModelList = async (params?: {
  search?: string;
  provider?: string;
  modelType?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}): Promise<ModelListResponse> => {
  try {
    // 构建POST请求体，注意后端使用的是size而不是pageSize
    const requestBody = {
      search: params?.search || '',
      provider: params?.provider || '',
      modelType: params?.modelType || '',
      status: params?.status || '',
      page: params?.page || 1,
      size: params?.pageSize || 10  // 后端使用size字段
    };

    const response = await apiClient.post<ApiResult<ModelListResponse>>(
      '/front/model/list',
      requestBody
    );
    return response.data.data;
  } catch (error) {
    console.error('获取模型列表失败:', error);
    throw error;
  }
};

/**
 * 获取模型详情
 * @param id 模型ID
 * @returns 模型详情
 */
const getModelDetail = async (id: string): Promise<ModelResponse> => {
  try {
    const requestBody = { id };
    const response = await apiClient.post<ApiResult<ModelResponse>>(
      '/front/model/detail',
      requestBody
    );
    return response.data.data;
  } catch (error) {
    console.error(`获取模型详情失败 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 保存模型（创建或更新）
 * @param model 模型数据
 * @returns 保存结果
 */
const saveModel = async (model: SaveModelRequest): Promise<{
  id: string;
  name: string;
  status: string;
  operation: 'create' | 'update';
  createdAt: string;
  lastModified: string;
}> => {
  try {
    const response = await apiClient.post<ApiResult<{
      id: string;
      name: string;
      status: string;
      operation: 'create' | 'update';
      createdAt: string;
      lastModified: string;
    }>>('/front/model/save', model);
    return response.data.data;
  } catch (error) {
    console.error('保存模型失败:', error);
    throw error;
  }
};

/**
 * 删除模型
 * @param id 模型ID
 */
const deleteModel = async (id: string): Promise<void> => {
  try {
    const requestBody = { id };
    await apiClient.post<ApiResult<void>>('/front/model/delete', requestBody);
  } catch (error) {
    console.error(`删除模型失败 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 测试模型
 * @param id 模型ID
 * @param testParams 测试参数
 * @returns 测试结果
 */
const testModel = async (id: string, testParams: ModelTestRequest): Promise<ModelTestResponse> => {
  try {
    const requestBody = { id, ...testParams };
    const response = await apiClient.post<ApiResult<ModelTestResponse>>(
      '/front/model/test',
      requestBody
    );
    return response.data.data;
  } catch (error) {
    console.error(`模型测试失败 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 获取模型统计数据
 * @returns 统计数据
 */
const getModelStats = async (): Promise<ModelStatsResponse> => {
  try {
    // 构建请求体，包含timeRange参数
    const requestBody = {
      timeRange: '30d'  // 默认30天统计
    };
    const response = await apiClient.post<ApiResult<ModelStatsResponse>>('/front/model/stats', requestBody);
    return response.data.data;
  } catch (error) {
    console.error('获取模型统计数据失败:', error);
    throw error;
  }
};

/**
 * 验证模型配置
 * @param model 模型配置
 * @returns 验证结果
 */
const validateModel = async (model: SaveModelRequest): Promise<{
  valid: boolean;
  checks: Array<{
    type: string;
    status: string;
    message: string;
  }>;
  estimatedCost: {
    inputCost: number;
    outputCost: number;
    currency: string;
  };
}> => {
  try {
    const response = await apiClient.post<ApiResult<{
      valid: boolean;
      checks: Array<{
        type: string;
        status: string;
        message: string;
      }>;
      estimatedCost: {
        inputCost: number;
        outputCost: number;
        currency: string;
      };
    }>>('/front/model/validate', model);
    return response.data.data;
  } catch (error) {
    console.error('验证模型配置失败:', error);
    throw error;
  }
};

// 导出所有API函数
export const ModelApi = {
  getModelList,
  getModelDetail,
  saveModel,
  deleteModel,
  testModel,
  getModelStats,
  validateModel
};

// 默认导出
export default ModelApi;

// 确保类型导出
export type { ModelResponse, SaveModelRequest, ModelListResponse, ModelStatsResponse, ModelTestRequest, ModelTestResponse, ApiResult };
