/**
 * 静态数据服务 - 从JSON文件获取数据
 * 用于GitHub Pages部署，避免真实API调用
 */

import type { 
  PlaneDefinition, 
  PlaneTopology, 
  PlaneMetrics,
  PaginatedResponse 
} from '../types';
import { getBasePath } from '../utils/assetUtils';

// 基础请求函数
const fetchJsonData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
};

/**
 * 平面管理相关API
 */
export const planeStaticDataService = {
  // 获取平面定义列表
  async getPlaneDefinitions(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<PlaneDefinition>> {
    const basePath = getBasePath();
    const url = `${basePath}/api/v1/planes.json`;
    return await fetchJsonData<PaginatedResponse<PlaneDefinition>>(url);
  },

  // 获取平面拓扑数据
  async getPlaneTopology(): Promise<{ success: boolean; data: PlaneTopology }> {
    const basePath = getBasePath();
    const url = `${basePath}/api/v1/planes/topology.json`;
    return await fetchJsonData<{ success: boolean; data: PlaneTopology }>(url);
  },

  // 获取平面指标数据
  async getPlaneMetrics(): Promise<{ success: boolean; data: PlaneMetrics }> {
    const basePath = getBasePath();
    const url = `${basePath}/api/v1/planes/metrics.json`;
    return await fetchJsonData<{ success: boolean; data: PlaneMetrics }>(url);
  },

  // 获取单个平面详情
  async getPlaneById(id: string): Promise<{ success: boolean; data: PlaneDefinition }> {
    const basePath = getBasePath();
    const url = `${basePath}/api/v1/planes.json`;
    const response = await fetchJsonData<PaginatedResponse<PlaneDefinition>>(url);
    
    const plane = response.data.find(p => p.id === id);
    if (!plane) {
      throw new Error(`Plane with id ${id} not found`);
    }
    
    return {
      success: true,
      data: plane
    };
  }
};

/**
 * 其他模块的静态数据服务可以在这里扩展
 */

// 导出默认服务
export default {
  plane: planeStaticDataService
};
