/**
 * 枚举API服务
 */

import axios from 'axios';

// 枚举项数据类型定义
export interface EnumItem {
  value: string;
  label: string;
  description?: string;
  order?: number;
}

// 枚举类型数据定义
export interface EnumType {
  type: string;
  items: EnumItem[];
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

// 创建专门的枚举API客户端，直接指向后端的/api/enum路径
const enumApiClient = axios.create({
  baseURL: '/api/enum',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
enumApiClient.interceptors.request.use(
  config => {
    const timestamp = new Date().toISOString();
    const fullURL = `${config.baseURL}${config.url}`;

    console.log(`🚀 [${timestamp}] Enum API Request:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: fullURL,
      headers: {
        'Content-Type': config.headers['Content-Type'],
        Authorization: config.headers.Authorization ? '***Bearer Token***' : 'None'
      }
    });

    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 [${timestamp}] Added auth token to request`);
    } else {
      console.log(`⚠️ [${timestamp}] No auth token found in localStorage`);
    }

    console.log(`📤 [${timestamp}] Sending ${config.method?.toUpperCase()} request to: ${fullURL}`);

    return config;
  },
  error => {
    console.error(`❌ [${new Date().toISOString()}] Enum API Request Error:`, error);
    return Promise.reject(error);
  }
);

// 响应拦截器
enumApiClient.interceptors.response.use(
  response => {
    const timestamp = new Date().toISOString();
    const fullURL = `${response.config.baseURL}${response.config.url}`;

    console.log(`✅ [${timestamp}] Enum API Response SUCCESS:`, {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      fullURL: fullURL,
      dataSize: JSON.stringify(response.data).length + ' bytes'
    });
    console.log(`📥 [${timestamp}] Response data:`, response.data);
    console.log(`🎉 [${timestamp}] ✅ REQUEST SUCCESSFULLY REACHED BACKEND! ✅`);

    return response.data;
  },
  error => {
    const timestamp = new Date().toISOString();
    const fullURL = error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown';

    console.error(`❌ [${timestamp}] Enum API Response ERROR:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      fullURL: fullURL
    });

    if (error.response?.status === 404) {
      console.error(`🔍 [${timestamp}] 404 Error - Backend endpoint not found: ${fullURL}`);
      console.error(`💡 [${timestamp}] Check if backend service is running on http://localhost:8080`);
    } else if (error.response?.status >= 500) {
      console.error(`🔥 [${timestamp}] Server Error - Backend service issue`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`🚫 [${timestamp}] Connection Refused - Backend service not running`);
    } else if (!error.response) {
      console.error(`🌐 [${timestamp}] Network Error - Request may not have reached backend`);
    }

    return Promise.reject(error);
  }
);

/**
 * 枚举操作API服务类
 */
export const enumApi = {
  /**
   * 获取所有枚举类型列表
   */
  async getAllEnumTypes(): Promise<ApiResponse<string[]>> {
    return enumApiClient.get('/types');
  },

  /**
   * 根据枚举类型获取枚举项
   */
  async getEnumItems(enumType: string): Promise<ApiResponse<EnumItem[]>> {
    return enumApiClient.get(`/items/${enumType}`);
  },

  /**
   * 获取所有枚举类型和项
   */
  async getAllEnumTypesWithItems(): Promise<ApiResponse<EnumType[]>> {
    return enumApiClient.get('/all');
  },

  /**
   * 批量获取指定枚举类型的枚举项
   */
  async getBatchEnumItems(enumTypes: string[]): Promise<ApiResponse<EnumType[]>> {
    return enumApiClient.post('/batch', enumTypes);
  },

  /**
   * 获取实体类型枚举项（便捷方法）
   */
  async getEntityTypes(): Promise<ApiResponse<EnumItem[]>> {
    return this.getEnumItems('EntityType');
  },

  /**
   * 获取实体状态枚举项（便捷方法）
   */
  async getEntityStatuses(): Promise<ApiResponse<EnumItem[]>> {
    return this.getEnumItems('EntityStatus');
  },

  /**
   * 批量获取实体相关枚举（便捷方法）
   */
  async getEntityEnums(): Promise<ApiResponse<EnumType[]>> {
    return this.getBatchEnumItems(['EntityType', 'EntityStatus']);
  }
};

export default enumApi;
