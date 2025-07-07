/**
 * PlaneApi - 平面管理相关接口
 * 集成后端 PlaneController 的所有接口
 */

import axios from 'axios';

// 定义请求和响应类型
export interface SavePlaneRequest {
  id?: string;
  name: string;
  description?: string;
  type: 'BUSINESS' | 'TECHNICAL' | 'KNOWLEDGE' | 'WORKFLOW';
  status?: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  level?: string;  // 添加level字段
  ownerId: string;
  metadata?: Record<string, any>;
}

export interface EntityInfo {
  id: string;
  name: string;
  type: string;
  status: string;
}

export interface PlaneResponse {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  level?: string;  // 添加level字段
  ownerId: string;
  entityCount: number;
  entities: EntityInfo[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
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
 * 获取所有平面列表
 * @returns 平面列表
 */
const listPlanes = async (): Promise<PlaneResponse[]> => {
  try {
    const response = await axios.get<ApiResult<PlaneResponse[]>>(`${BASE_URL}/api/plane/list`);
    return response.data.data;
  } catch (error) {
    console.error('获取平面列表失败:', error);
    throw error;
  }
};

/**
 * 获取平面详情
 * @param id 平面ID
 * @returns 平面详情
 */
const getPlaneDetail = async (id: string): Promise<PlaneResponse> => {
  try {
    const response = await axios.get<ApiResult<PlaneResponse>>(`${BASE_URL}/api/plane/detail/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`获取平面详情失败 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 保存平面（创建或更新）
 * @param plane 平面数据
 * @returns 保存后的平面
 */
const savePlane = async (plane: SavePlaneRequest): Promise<PlaneResponse> => {
  try {
    const response = await axios.post<ApiResult<PlaneResponse>>(`${BASE_URL}/api/plane/save`, plane);
    return response.data.data;
  } catch (error) {
    console.error('保存平面失败:', error);
    throw error;
  }
};

/**
 * 删除平面
 * @param id 平面ID
 */
const deletePlane = async (id: string): Promise<void> => {
  try {
    await axios.post<ApiResult<void>>(`${BASE_URL}/api/plane/delete?id=${id}`);
  } catch (error) {
    console.error(`删除平面失败 (ID: ${id}):`, error);
    throw error;
  }
};

// 导出所有API函数
export const PlaneApi = {
  listPlanes,
  getPlaneDetail,
  savePlane,
  deletePlane
};

// 默认导出
export default PlaneApi;
