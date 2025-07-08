import { apiClient } from './api';

// 提示词模板相关的类型定义
export interface PromptTemplateRequest {
  id?: string;
  name: string;
  description: string;
  content: string;
  type: string;
  category: string;
  tags?: string[];
  variables?: { [key: string]: any };
  version?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface PromptTemplateResponse {
  id: string;
  name: string;
  description: string;
  content: string;
  type: string;
  typeName: string;
  category: string;
  categoryName: string;
  tags: string[];
  variables: { [key: string]: any };
  status: string;
  statusName: string;
  version: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueryPromptTemplateRequest {
  name?: string;
  type?: string;
  category?: string;
  status?: string;
  page?: number;
  size?: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

/**
 * 提示词模板API服务
 */
export class PromptTemplateApi {
  
  /**
   * 保存提示词模板（创建或更新）
   */
  static async saveTemplate(request: PromptTemplateRequest): Promise<ApiResponse<PromptTemplateResponse>> {
    try {
      const response = await apiClient.postFullResponse<PromptTemplateResponse>('/prompts-template/save', request);
      return response;
    } catch (error: any) {
      console.error('保存提示词模板失败:', error);
      throw new Error(error.response?.data?.message || '保存提示词模板失败');
    }
  }

  /**
   * 查询提示词模板列表
   */
  static async listTemplates(request: QueryPromptTemplateRequest): Promise<ApiResponse<PageResponse<PromptTemplateResponse>>> {
    try {
      const response = await apiClient.postFullResponse<PageResponse<PromptTemplateResponse>>('/prompts-template/list', request);
      return response;
    } catch (error: any) {
      console.error('查询提示词模板列表失败:', error);
      throw new Error(error.response?.data?.message || '查询提示词模板列表失败');
    }
  }

  /**
   * 获取提示词模板详情
   */
  static async getTemplateDetail(id: string): Promise<ApiResponse<PromptTemplateResponse>> {
    try {
      // 由于没有getFullResponse方法，我们需要手动构造响应
      const data = await apiClient.get<PromptTemplateResponse>(`/prompts-template/${id}`);
      return {
        success: true,
        code: '200',
        message: 'success',
        data
      };
    } catch (error: any) {
      console.error('获取提示词模板详情失败:', error);
      throw new Error(error.response?.data?.message || '获取提示词模板详情失败');
    }
  }

  /**
   * 删除提示词模板
   */
  static async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.post<void>('/prompts-template/delete', { id });
      return {
        success: true,
        code: '200',
        message: 'success',
        data: undefined as any
      };
    } catch (error: any) {
      console.error('删除提示词模板失败:', error);
      throw new Error(error.response?.data?.message || '删除提示词模板失败');
    }
  }

  /**
   * 更新模板状态
   */
  static async updateTemplateStatus(id: string, status: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.put<void>(`/prompts-template/${id}/status?status=${status}`, null);
      return {
        success: true,
        code: '200',
        message: 'success',
        data: undefined as any
      };
    } catch (error: any) {
      console.error('更新模板状态失败:', error);
      throw new Error(error.response?.data?.message || '更新模板状态失败');
    }
  }

  /**
   * 复制模板
   */
  static async copyTemplate(id: string, newName: string): Promise<ApiResponse<PromptTemplateResponse>> {
    try {
      const data = await apiClient.post<PromptTemplateResponse>(`/prompts-template/${id}/copy?newName=${encodeURIComponent(newName)}`, null);
      return {
        success: true,
        code: '200',
        message: 'success',
        data
      };
    } catch (error: any) {
      console.error('复制模板失败:', error);
      throw new Error(error.response?.data?.message || '复制模板失败');
    }
  }
}

/**
 * 数据转换工具
 */
export class PromptTemplateConverter {
  
  /**
   * 前端数据转换为后端请求格式
   */
  static toBackendRequest(frontendData: any): PromptTemplateRequest {
    return {
      id: frontendData.id,
      name: frontendData.name,
      description: frontendData.description,
      content: frontendData.content,
      type: frontendData.type || 'USER_PROMPT',
      category: this.getCategoryCode(frontendData.category),
      tags: frontendData.tags || [],
      variables: this.convertVariablesToMap(frontendData.variables),
      version: frontendData.version,
      createdBy: frontendData.createdBy,
      updatedBy: frontendData.updatedBy
    };
  }

  /**
   * 后端响应转换为前端数据格式
   */
  static toFrontendFormat(backendData: PromptTemplateResponse): any {
    return {
      id: backendData.id,
      name: backendData.name,
      category: backendData.categoryName || this.getCategoryName(backendData.category),
      categoryCode: backendData.category,
      description: backendData.description,
      content: backendData.content,
      type: backendData.type,
      variables: this.convertMapToVariables(backendData.variables),
      tags: backendData.tags || [],
      language: 'zh-CN', // 默认值
      difficulty: 'intermediate', // 默认值
      rating: 0, // 默认值
      usageCount: 0, // 默认值
      isPublic: true, // 默认值
      isFavorite: false, // 默认值
      createdBy: backendData.createdBy,
      createdAt: this.formatDateTime(backendData.createdAt),
      lastModified: this.formatDateTime(backendData.updatedAt),
      lastUsed: this.formatDateTime(backendData.updatedAt),
      version: backendData.version
    };
  }

  /**
   * 获取分类代码
   */
  private static getCategoryCode(categoryName: string): string {
    const categoryMap: { [key: string]: string } = {
      '编程': 'CODING',
      '商务': 'BUSINESS',
      '摘要': 'SUMMARIZATION',
      '数据分析': 'ANALYSIS',
      '文档工具': 'WRITING',
      '通用': 'GENERAL',
      '其他': 'OTHER'
    };
    return categoryMap[categoryName] || 'OTHER';
  }

  /**
   * 获取分类名称
   */
  private static getCategoryName(categoryCode: string): string {
    const categoryMap: { [key: string]: string } = {
      'CODING': '编程',
      'BUSINESS': '商务',
      'SUMMARIZATION': '摘要',
      'ANALYSIS': '数据分析',
      'WRITING': '文档工具',
      'GENERAL': '通用',
      'OTHER': '其他'
    };
    return categoryMap[categoryCode] || '其他';
  }

  /**
   * 转换变量格式：对象 -> 字符串数组（用于显示）
   */
  private static convertMapToVariables(variables: { [key: string]: any }): string[] {
    if (!variables || typeof variables !== 'object') {
      return [];
    }
    return Object.keys(variables);
  }

  /**
   * 转换变量格式：字符串数组 -> 对象（用于后端）
   */
  private static convertVariablesToMap(variables: any): { [key: string]: any } {
    if (Array.isArray(variables)) {
      // 如果是数组，转换为对象
      const result: { [key: string]: any } = {};
      variables.forEach(variable => {
        if (typeof variable === 'string') {
          result[variable] = '';
        }
      });
      return result;
    } else if (variables && typeof variables === 'object') {
      // 如果已经是对象，直接返回
      return variables;
    }
    return {};
  }

  /**
   * 格式化日期时间
   */
  private static formatDateTime(dateTime: string): string {
    if (!dateTime) return '';
    try {
      return new Date(dateTime).toLocaleString('zh-CN');
    } catch (error) {
      return dateTime;
    }
  }
}
