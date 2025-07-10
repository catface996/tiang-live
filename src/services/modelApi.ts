/**
 * ModelApi - 模型管理相关接口
 * 集成后端 LLMController 的所有接口
 */

import axios from 'axios';

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

// 后端API基础URL
const BASE_URL = 'http://localhost:8080';

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
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.provider) queryParams.append('provider', params.provider);
    if (params?.modelType) queryParams.append('modelType', params.modelType);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

    const response = await axios.get<ApiResult<ModelListResponse>>(
      `${BASE_URL}/api/model/list?${queryParams.toString()}`
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
    const response = await axios.get<ApiResult<ModelResponse>>(`${BASE_URL}/api/model/detail/${id}`);
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
    const response = await axios.post<ApiResult<{
      id: string;
      name: string;
      status: string;
      operation: 'create' | 'update';
      createdAt: string;
      lastModified: string;
    }>>(`${BASE_URL}/api/model/save`, model);
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
    await axios.delete<ApiResult<void>>(`${BASE_URL}/api/model/delete/${id}`);
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
    const response = await axios.post<ApiResult<ModelTestResponse>>(
      `${BASE_URL}/api/model/test/${id}`,
      testParams
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
    const response = await axios.get<ApiResult<ModelStatsResponse>>(`${BASE_URL}/api/model/stats/overview`);
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
    const response = await axios.post<ApiResult<{
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
    }>>(`${BASE_URL}/api/model/validate`, model);
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
