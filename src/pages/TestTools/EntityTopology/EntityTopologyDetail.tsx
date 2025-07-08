import React, { useState, useEffect, useCallback } from 'react';
import {
  Space,
  Spin,
  Empty,
  Breadcrumb,
  Form,
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Button,
  Tag,
  App
} from 'antd';
import {
  NodeIndexOutlined,
  HomeOutlined,
  ToolOutlined,
  ReloadOutlined,
  SaveOutlined,
  FolderOpenOutlined,
  DatabaseOutlined,
  LinkOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import DataTabs from '../../../components/EntityTopology/DataTabs';
import EntityD3RelationshipGraph from '../../../components/EntityTopology/EntityD3RelationshipGraph';
import DeleteEntityModal from '../../../components/EntityTopology/DeleteEntityModal';
import DeleteDependencyModal from '../../../components/EntityTopology/DeleteDependencyModal';
import SelectEntityModal from '../../../components/EntityTopology/SelectEntityModal';
import AddDependencyModal from '../../../components/EntityTopology/AddDependencyModal';
import GraphOperationModals from '../../../components/EntityTopology/GraphOperationModals';
import { graphApi, GraphStatus, type Graph } from '../../../services/graphApi';
import { entityApi } from '../../../services/entityApi';
import { relationApi, type Relation } from '../../../services/relationApi';
import { enumApi, type EnumItem } from '../../../services/enumApi';

// 导入统一的类型定义
import type { Entity, Dependency, TopologyData, PaginationInfo } from '../../../types/entityTopology';

const { Title, Paragraph, Text } = Typography;

// 页面容器样式
const PageContainer = styled.div`
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--layout-body-background);
`;

// 页面头部样式
const PageHeader = styled.div`
  margin-bottom: 24px;
`;

// 主要内容区域样式
const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 24px;
  overflow: hidden;
`;

// 左侧面板样式
const LeftPanel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 右侧面板样式
const RightPanel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 统计卡片样式
const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const EntityTopologyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['entityTopology', 'common']);
  const { message } = App.useApp(); // 使用App提供的message hook

  // 基础状态
  const [loading, setLoading] = useState(true);
  const [topologyData, setTopologyData] = useState<TopologyData | null>(null);
  const [currentGraph, setCurrentGraph] = useState<Graph | null>(null);

  // 删除实体相关状态
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<Entity | null>(null);

  // 删除依赖关系相关状态
  const [deleteDependencyModalVisible, setDeleteDependencyModalVisible] = useState(false);
  const [dependencyToDelete, setDependencyToDelete] = useState<Dependency | null>(null);

  // 选择实体相关状态
  const [selectEntityModalVisible, setSelectEntityModalVisible] = useState(false);
  const [availableEntities, setAvailableEntities] = useState<Entity[]>([]);
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);
  const [entitiesLoading, setEntitiesLoading] = useState(false);
  const [entitiesPagination, setEntitiesPagination] = useState<PaginationInfo>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // 添加依赖关系相关状态
  const [addDependencyModalVisible, setAddDependencyModalVisible] = useState(false);
  const [sourceEntityId, setSourceEntityId] = useState<string>('');
  const [targetEntityId, setTargetEntityId] = useState<string>('');
  const [relationshipType, setRelationshipType] = useState<string>('depends_on');
  const [addDependencyLoading, setAddDependencyLoading] = useState(false);

  // 图操作相关状态
  const [saveGraphModalVisible] = useState(false);
  const [availableGraphs] = useState<Graph[]>([]);
  const [graphForm] = Form.useForm();
  const [graphLoading] = useState(false);

  // 实体类型枚举相关状态
  const [entityTypeEnums, setEntityTypeEnums] = useState<EnumItem[]>([]);
  const [entityTypeMap, setEntityTypeMap] = useState<Map<string, string>>(new Map());

  // 实体清单分页状态
  const [entityListPagination, setEntityListPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true
  });
  const [allEntitiesInGraph, setAllEntitiesInGraph] = useState<Entity[]>([]);

  // 依赖关系分页状态
  const [dependencyListPagination, setDependencyListPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true
  });
  const [allDependenciesInGraph, setAllDependenciesInGraph] = useState<Dependency[]>([]);

  // 映射后端状态到前端状态
  const mapBackendStatusToFrontend = (backendStatus: string): 'active' | 'inactive' | 'warning' | 'error' => {
    const statusMap: Record<string, 'active' | 'inactive' | 'warning' | 'error'> = {
      'ACTIVE': 'active',
      'INACTIVE': 'inactive', 
      'WARNING': 'warning',
      'ERROR': 'error',
      'PROCESSING': 'warning',
      'ARCHIVED': 'inactive'
    };
    return statusMap[backendStatus] || 'active';
  };

  // 加载图中的实体列表
  const loadEntitiesInGraph = async (graphId: string, currentTopologyData?: TopologyData) => {
    try {
      console.log('🔍 开始加载图中的实体列表, 图ID:', graphId);

      let allEntities: any[] = [];
      let currentPage = 1;
      const pageSize = 100; // 后端限制最大100
      let hasMore = true;

      // 分页获取所有实体
      while (hasMore) {
        console.log(`📄 正在加载第 ${currentPage} 页实体...`);
        
        const response = await entityApi.getEntitiesInGraph(graphId, {
          page: currentPage,
          size: pageSize
        });

        if (response.success && response.data) {
          const responseData = response.data;
          const pageEntities = responseData.data || responseData.content || [];
          
          allEntities = [...allEntities, ...pageEntities];
          
          // 检查是否还有更多页
          const total = parseInt(responseData.total || responseData.totalElements || '0');
          const totalPages = responseData.totalPages || Math.ceil(total / pageSize);
          hasMore = currentPage < totalPages;
          
          console.log(`✅ 第 ${currentPage} 页加载完成:`, {
            pageEntities: pageEntities.length,
            totalSoFar: allEntities.length,
            total,
            totalPages,
            hasMore
          });
          
          currentPage++;
        } else {
          console.error('❌ 加载图中实体失败:', response.message);
          message.error('加载图中实体失败: ' + (response.message || '未知错误'));
          break;
        }
      }

      if (allEntities.length > 0) {
        // 转换后端实体格式为前端期望的格式
        const transformedEntities = allEntities.map((entity: any) => ({
          id: entity.id?.toString() || '',
          name: entity.name || '',
          type: entity.type || '',
          status: mapBackendStatusToFrontend(entity.status),
          description: entity.description || '',
          properties: entity.properties || {},
          connections: 0, // 暂时设为0，后续可以根据需要计算
          // 映射平面信息
          plane: entity.plane ? {
            id: entity.plane.id,
            name: entity.plane.name,
            level: entity.plane.level,
            type: entity.plane.type
          } : undefined,
          // 保留原始数据以备后用
          _raw: entity
        }));

        console.log('✅ 成功加载图中实体列表:', {
          graphId,
          totalPages: currentPage - 1,
          entitiesCount: transformedEntities.length,
          sampleEntities: transformedEntities.slice(0, 3).map(e => ({ 
            id: e.id, 
            name: e.name, 
            type: e.type,
            hasPlane: !!e.plane,
            planeName: e.plane?.name,
            planeLevel: e.plane?.level
          })),
          // 调试：检查原始数据中的plane信息
          rawSamplePlanes: allEntities.slice(0, 3).map(e => ({
            entityName: e.name,
            hasPlaneInRaw: !!e.plane,
            rawPlane: e.plane
          }))
        });

        // 保存所有实体数据
        setAllEntitiesInGraph(transformedEntities);
        
        // 更新分页信息
        setEntityListPagination(prev => ({
          ...prev,
          total: transformedEntities.length,
          current: 1 // 重置到第一页
        }));

        // 更新拓扑数据中的实体列表（用于图形显示）
        const dataToUpdate = currentTopologyData || topologyData;
        if (dataToUpdate) {
          const updatedTopologyData = {
            ...dataToUpdate,
            entities: transformedEntities,
            stats: {
              ...dataToUpdate.stats,
              nodeCount: transformedEntities.length
            }
          };
          setTopologyData(updatedTopologyData);
          return transformedEntities;
        }
      } else {
        console.log('ℹ️ 图中暂无实体');
      }
    } catch (error) {
      console.error('❌ 加载图中实体异常:', error);
      message.error('加载图中实体失败: ' + (error.message || '网络错误'));
    }
    return [];
  };

  // 加载实体类型枚举
  const loadEntityTypeEnums = async () => {
    try {
      console.log('🔍 开始加载实体类型枚举...');
      const response = await enumApi.getEntityTypes();
      
      if (response.success && response.data) {
        console.log('✅ 成功加载实体类型枚举:', response.data);
        setEntityTypeEnums(response.data);
        
        // 创建类型映射 Map<value, label>
        const typeMap = new Map<string, string>();
        response.data.forEach(item => {
          typeMap.set(item.value, item.label);
        });
        setEntityTypeMap(typeMap);
        
        console.log('📋 实体类型映射表:', Object.fromEntries(typeMap));
      } else {
        console.error('❌ 加载实体类型枚举失败:', response.message);
      }
    } catch (error) {
      console.error('❌ 加载实体类型枚举异常:', error);
    }
  };

  // 根据类型值获取类型标签
  const getEntityTypeLabel = (typeValue: string): string => {
    return entityTypeMap.get(typeValue) || typeValue;
  };

  // 映射后端关系类型到前端期望的类型
  const mapRelationType = (backendType: string): 'depends_on' | 'provides_to' | 'connects_to' => {
    switch (backendType.toUpperCase()) {
      case 'DEPENDENCY':
      case 'DEPENDS_ON':
      case 'ASSOCIATION':
        return 'depends_on';
      case 'INTEGRATION':
      case 'INTEGRATES_WITH':
        return 'connects_to';
      case 'PROVIDES':
      case 'PROVIDES_TO':
        return 'provides_to';
      default:
        return 'connects_to'; // 默认为连接关系
    }
  };

  // 加载图中的依赖关系
  const loadRelationsInGraph = async (graphId: string) => {
    try {
      console.log('🔗 开始加载图中的依赖关系...', { graphId });
      
      let allRelations: Relation[] = [];
      let currentPage = 1;
      let hasMore = true;
      const pageSize = 50; // 每页50条关系

      while (hasMore) {
        console.log(`📄 加载第 ${currentPage} 页依赖关系...`);
        
        const response = await relationApi.listRelationsByGraph({
          graphId,
          page: currentPage,
          size: pageSize
        });

        if (response.success && response.data?.data) {
          const pageRelations = response.data.data;
          allRelations = [...allRelations, ...pageRelations];
          
          // 检查是否还有更多页
          const total = parseInt(response.data.total || '0');
          const totalPages = response.data.totalPages || Math.ceil(total / pageSize);
          hasMore = currentPage < totalPages;
          
          console.log(`✅ 第 ${currentPage} 页依赖关系加载完成:`, {
            pageRelations: pageRelations.length,
            totalSoFar: allRelations.length,
            total,
            totalPages,
            hasMore
          });
          
          currentPage++;
        } else {
          console.error('❌ 加载图中依赖关系失败:', {
            success: response.success,
            message: response.message,
            code: response.code,
            data: response.data,
            fullResponse: response
          });
          message.error('加载图中依赖关系失败: ' + (response.message || response.code || '未知错误'));
          break;
        }
      }

      if (allRelations.length > 0) {
        // 转换关系数据格式为前端期望的格式
        const transformedRelations = allRelations.map((relation: Relation) => ({
          id: relation.id,
          source: relation.sourceEntityId,
          target: relation.targetEntityId,
          type: mapRelationType(relation.type),
          strength: relation.weight || 0.5, // 使用实际权重值
          description: relation.description || `${relation.name} - ${relation.type}`,
          // 保留原始数据以备后用
          _raw: relation
        }));

        console.log('✅ 成功加载图中依赖关系列表:', {
          graphId,
          relationCount: transformedRelations.length,
          sampleRelations: transformedRelations.slice(0, 3).map(r => ({ 
            id: r.id, 
            source: r.source, 
            target: r.target, 
            type: r.type 
          }))
        });

        // 更新拓扑数据中的依赖关系 - 使用函数式更新确保状态正确
        setTopologyData(prev => {
          if (!prev) {
            console.warn('⚠️ topologyData为空，无法更新依赖关系');
            return prev;
          }
          
          const updatedData = {
            ...prev,
            dependencies: transformedRelations,
            stats: {
              ...prev.stats,
              linkCount: transformedRelations.length
            }
          };
          
          console.log('🔄 更新拓扑数据中的依赖关系:', {
            previousDependencies: prev.dependencies.length,
            newDependencies: transformedRelations.length,
            updatedStats: updatedData.stats,
            updatedDataPreview: {
              id: updatedData.id,
              dependenciesCount: updatedData.dependencies.length,
              statsLinkCount: updatedData.stats.linkCount
            }
          });
          
          return updatedData;
        });

        // 存储所有依赖关系数据用于分页
        setAllDependenciesInGraph(transformedRelations);
        
        // 更新分页信息
        setDependencyListPagination(prev => ({
          ...prev,
          total: transformedRelations.length,
          current: 1 // 重置到第一页
        }));

        return transformedRelations;
      } else {
        console.log('📝 图中暂无依赖关系');
        // 即使没有依赖关系，也要更新状态确保组件重新渲染
        setTopologyData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            dependencies: [],
            stats: {
              ...prev.stats,
              linkCount: 0
            }
          };
        });
        
        // 清空依赖关系数据和分页信息
        setAllDependenciesInGraph([]);
        setDependencyListPagination(prev => ({
          ...prev,
          total: 0,
          current: 1
        }));
        
        return [];
      }
    } catch (error) {
      console.error('❌ 加载图中依赖关系异常:', {
        error,
        errorMessage: error?.message,
        errorStack: error?.stack,
        graphId
      });
      message.error('加载图中依赖关系失败: ' + (error?.message || '网络错误'));
      
      // 错误情况下也要更新状态
      setTopologyData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          dependencies: [],
          stats: {
            ...prev.stats,
            linkCount: 0
          }
        };
      });
      
      // 清空依赖关系数据和分页信息
      setAllDependenciesInGraph([]);
      setDependencyListPagination(prev => ({
        ...prev,
        total: 0,
        current: 1
      }));
      
      return [];
    }
  };

  // 加载拓扑图详情数据
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        console.error('❌ No ID provided for topology detail');
        return;
      }

      setLoading(true);
      try {
        console.log('🚀 开始加载拓扑图详情, ID:', id);

        // 并行加载图详情和实体类型枚举
        const [graphResponse] = await Promise.all([
          graphApi.getGraphById(id),
          loadEntityTypeEnums()
        ]);

        if (graphResponse.success && graphResponse.data) {
          const graph = graphResponse.data;
          console.log('✅ 成功获取图详情:', graph);

          // 辅助函数：将Graph状态映射为Topology状态
          const mapGraphStatusToTopologyStatus = (
            graphStatus?: GraphStatus
          ): 'active' | 'inactive' | 'warning' | 'error' => {
            switch (graphStatus) {
              case GraphStatus.ACTIVE:
                return 'active';
              case GraphStatus.INACTIVE:
                return 'inactive';
              case GraphStatus.PROCESSING:
                return 'warning';
              case GraphStatus.ARCHIVED:
                return 'error';
              default:
                return 'active';
            }
          };

          const topologyData: TopologyData = {
            id: graph.id?.toString() || id,
            name: graph.name,
            description: graph.description || '',
            type: (graph.metadata?.type as string) || 'network',
            status: mapGraphStatusToTopologyStatus(graph.status),
            plane: (graph.metadata?.plane as string) || 'default',
            tags: graph.labels || [],
            stats: {
              nodeCount: graph.entityCount || 0,
              linkCount: graph.relationCount || 0,
              healthScore: (graph.metadata?.healthScore as number) || 95,
              lastUpdated: graph.updatedAt || graph.createdAt || new Date().toISOString()
            },
            entities: [], // 初始为空，后续通过API加载
            dependencies: []
          };

          setTopologyData(topologyData);
          setCurrentGraph(graph);

          console.log('✅ 拓扑图详情加载完成:', topologyData);

          // 先加载图中的实体列表，再加载依赖关系，确保数据加载顺序
          console.log('🔄 开始按顺序加载实体和依赖关系数据...');
          
          // 第一步：加载实体列表
          await loadEntitiesInGraph(graph.id.toString(), topologyData);
          
          // 第二步：加载依赖关系（在实体加载完成后）
          await loadRelationsInGraph(graph.id.toString());
          
          console.log('✅ 所有数据加载完成');
        } else {
          console.error('❌ API返回数据格式异常:', graphResponse);
          message.error('加载拓扑图详情失败');
        }
      } catch (error) {
        console.error('❌ 加载拓扑图详情失败:', error);
        message.error('加载拓扑图详情失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // 简单的刷新函数
  const handleRefresh = useCallback(() => {
    setLoading(true);
    window.location.reload();
  }, []);

  // 删除实体相关函数
  const handleDeleteEntity = (entity: Entity) => {
    setEntityToDelete(entity);
    setDeleteModalVisible(true);
  };

  const confirmDeleteEntity = async () => {
    if (!topologyData || !entityToDelete || !currentGraph?.id) return;

    try {
      const graphId = currentGraph.id.toString();
      
      console.log('🗑️ 开始从图中移除实体:', {
        graphId,
        entityId: entityToDelete.id,
        entityName: entityToDelete.name
      });

      // 调用后端API移除实体
      const response = await entityApi.removeFromGraph({
        graphId,
        entityIds: [entityToDelete.id]
      });

      if (response.success) {
        console.log('✅ 实体从图中移除成功');

        const relatedDependencies = topologyData.dependencies.filter(
          dep => dep.source === entityToDelete.id || dep.target === entityToDelete.id
        );

        const updatedEntities = topologyData.entities.filter(e => e.id !== entityToDelete.id);
        const updatedDependencies = topologyData.dependencies.filter(
          dep => dep.source !== entityToDelete.id && dep.target !== entityToDelete.id
        );

        // 更新所有实体数据（用于分页）
        const updatedAllEntities = allEntitiesInGraph.filter(e => e.id !== entityToDelete.id);
        setAllEntitiesInGraph(updatedAllEntities);

        // 更新分页信息
        const newTotal = updatedAllEntities.length;
        const { current, pageSize } = entityListPagination;
        const maxPage = Math.ceil(newTotal / pageSize) || 1;
        const newCurrent = current > maxPage ? maxPage : current;

        setEntityListPagination(prev => ({
          ...prev,
          total: newTotal,
          current: newCurrent
        }));

        setTopologyData({
          ...topologyData,
          entities: updatedEntities,
          dependencies: updatedDependencies,
          stats: {
            ...topologyData.stats,
            nodeCount: updatedEntities.length,
            linkCount: updatedDependencies.length
          }
        });

        const messageText =
          relatedDependencies.length > 0
            ? `成功从图中移除实体 ${entityToDelete.name} 及其 ${relatedDependencies.length} 个相关依赖关系`
            : `成功从图中移除实体 ${entityToDelete.name}`;

        message.success(messageText);
        
        // 重新获取可用实体列表，因为刚移除的实体现在应该可以选择
        if (selectEntityModalVisible) {
          await fetchAvailableEntities(1, entitiesPagination.pageSize);
        }
      } else {
        console.error('❌ 从图中移除实体失败:', response.message);
        message.error('移除实体失败: ' + (response.message || '未知错误'));
      }
    } catch (error) {
      console.error('❌ 从图中移除实体异常:', error);
      message.error('移除实体失败: ' + (error.message || '网络错误'));
    } finally {
      setDeleteModalVisible(false);
      setEntityToDelete(null);
    }
  };

  const cancelDeleteEntity = () => {
    setDeleteModalVisible(false);
    setEntityToDelete(null);
  };

  // 删除依赖关系相关函数
  const handleDeleteDependency = (dependency: Dependency) => {
    setDependencyToDelete(dependency);
    setDeleteDependencyModalVisible(true);
  };

  const confirmDeleteDependency = async () => {
    if (!topologyData || !dependencyToDelete || !currentGraph?.id) return;

    try {
      console.log('🗑️ 开始删除依赖关系:', {
        relationId: dependencyToDelete.id,
        graphId: currentGraph.id.toString(),
        source: dependencyToDelete.source,
        target: dependencyToDelete.target,
        type: dependencyToDelete.type
      });

      // 调用后端API删除关系
      const response = await relationApi.deleteRelation({
        relationId: dependencyToDelete.id,
        graphId: currentGraph.id.toString(),
        sourceEntityId: dependencyToDelete.source,
        targetEntityId: dependencyToDelete.target,
        relationType: dependencyToDelete.type
      });

      if (response.success) {
        console.log('✅ 依赖关系删除成功');

        // 更新本地状态
        const updatedDependencies = topologyData.dependencies.filter(dep => dep.id !== dependencyToDelete.id);
        const updatedAllDependencies = allDependenciesInGraph.filter(dep => dep.id !== dependencyToDelete.id);

        setTopologyData({
          ...topologyData,
          dependencies: updatedDependencies,
          stats: {
            ...topologyData.stats,
            linkCount: updatedDependencies.length
          }
        });

        // 更新所有依赖关系数据
        setAllDependenciesInGraph(updatedAllDependencies);
        
        // 更新分页信息
        const newTotal = updatedAllDependencies.length;
        const { current, pageSize } = dependencyListPagination;
        const maxPage = Math.ceil(newTotal / pageSize) || 1;
        const newCurrent = current > maxPage ? maxPage : current;

        setDependencyListPagination(prev => ({
          ...prev,
          total: newTotal,
          current: newCurrent
        }));

        const sourceName =
          topologyData.entities.find(e => e.id === dependencyToDelete.source)?.name || dependencyToDelete.source;
        const targetName =
          topologyData.entities.find(e => e.id === dependencyToDelete.target)?.name || dependencyToDelete.target;

        message.success(`成功删除依赖关系: ${sourceName} → ${targetName}`);
        setDeleteDependencyModalVisible(false);
        setDependencyToDelete(null);
      } else {
        console.error('❌ 删除依赖关系失败:', response.message);
        message.error('删除依赖关系失败: ' + (response.message || '未知错误'));
      }
    } catch (error) {
      console.error('❌ 删除依赖关系异常:', {
        error,
        errorMessage: error?.message,
        relationId: dependencyToDelete.id
      });
      message.error('删除依赖关系失败: ' + (error?.message || '网络错误'));
    }
  };

  const cancelDeleteDependency = () => {
    setDeleteDependencyModalVisible(false);
    setDependencyToDelete(null);
  };

  // 添加实体相关函数
  const handleAddEntity = async () => {
    console.log('🎯 点击新增实体按钮');
    console.log('📊 当前图状态:', {
      graphId: currentGraph?.id,
      graphName: currentGraph?.name,
      currentEntitiesCount: topologyData?.entities?.length || 0,
      topologyDataExists: !!topologyData
    });
    
    setSelectedEntityIds([]);
    setSelectEntityModalVisible(true);
    setEntitiesPagination(prev => ({ ...prev, current: 1 }));
    await fetchAvailableEntities(1, entitiesPagination.pageSize);
  };

  const fetchAvailableEntities = async (page: number = 1, pageSize: number = 10) => {
    console.log(`🔍 开始获取可用实体列表... 页码: ${page}, 每页: ${pageSize}`);

    if (!currentGraph?.id) {
      console.warn('⚠️ 当前图ID不存在，无法获取可用实体');
      setAvailableEntities([]);
      setEntitiesPagination(prev => ({ ...prev, total: 0 }));
      return;
    }

    const graphId = currentGraph.id.toString();
    console.log(`📊 当前图信息:`, {
      graphId,
      graphName: currentGraph.name,
      currentEntitiesInGraph: topologyData?.entities?.length || 0,
      currentEntitiesIds: topologyData?.entities?.map(e => e.id) || []
    });

    setEntitiesLoading(true);
    try {
      const requestParams = {
        page: page,
        size: pageSize
      };
      
      console.log(`🚀 调用API获取不在图中的实体:`, {
        graphId,
        requestParams,
        apiEndpoint: '/list-by-graph',
        mode: 'NOT_IN'
      });

      const response = await entityApi.getEntitiesNotInGraph(graphId, requestParams);

      console.log('📥 API响应:', response);

      if (response.success && response.data) {
        // 适配后端实际的响应格式
        const responseData = response.data;
        const rawEntities = responseData.data || responseData.content || [];
        const totalElements = parseInt(responseData.total || responseData.totalElements || '0');
        const totalPages = responseData.totalPages || 1;
        
        // 转换后端实体格式为前端期望的格式
        const transformedEntities = rawEntities.map((entity: any) => ({
          id: entity.id?.toString() || '',
          name: entity.name || '',
          type: entity.type || '',
          status: mapBackendStatusToFrontend(entity.status),
          description: entity.description || '',
          properties: entity.properties || {},
          connections: 0, // 暂时设为0，后续可以根据需要计算
          // 保留原始数据以备后用
          _raw: entity
        }));
        
        console.log('✅ 成功获取可用实体列表:', {
          availableEntitiesCount: transformedEntities.length,
          totalAvailableEntities: totalElements,
          totalPages,
          currentPage: page,
          pageSize,
          sampleEntities: transformedEntities.slice(0, 3).map(e => ({ id: e.id, name: e.name, type: e.type })),
          rawResponseData: responseData
        });

        // 验证返回的实体确实不在当前图中
        const currentEntityIds = new Set(topologyData?.entities?.map(e => e.id) || []);
        const conflictEntities = transformedEntities.filter(entity => currentEntityIds.has(entity.id));
        
        if (conflictEntities.length > 0) {
          console.warn('⚠️ 发现冲突: 以下实体已在当前图中，但API仍然返回了它们:', 
            conflictEntities.map(e => ({ id: e.id, name: e.name }))
          );
        } else {
          console.log('✅ 验证通过: 所有返回的实体都不在当前图中');
        }

        setAvailableEntities(transformedEntities);
        setEntitiesPagination({
          current: page,
          pageSize: pageSize,
          total: totalElements,
          totalPages: totalPages
        });
      } else {
        console.error('❌ API返回数据格式异常:', response);
        message.error('获取实体列表失败: ' + (response.message || '未知错误'));
        setAvailableEntities([]);
        setEntitiesPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('❌ 获取实体列表失败:', error);
      message.error('获取实体列表失败: ' + (error.message || '网络错误'));
      setAvailableEntities([]);
      setEntitiesPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setEntitiesLoading(false);
    }
  };

  const confirmAddEntities = async () => {
    if (!topologyData || selectedEntityIds.length === 0 || !currentGraph?.id) {
      message.warning('请选择要添加的实体');
      return;
    }

    try {
      const graphId = currentGraph.id.toString();

      console.log('🚀 开始添加实体到图:', {
        graphId,
        entityIds: selectedEntityIds
      });

      const response = await entityApi.addToGraph({
        graphId,
        entityIds: selectedEntityIds
      });

      if (response.success) {
        console.log('✅ 实体添加到图成功');

        const entitiesToAdd = availableEntities.filter(entity => selectedEntityIds.includes(entity.id));
        const updatedEntities = [...topologyData.entities, ...entitiesToAdd];

        // 更新所有实体数据（用于分页）
        const updatedAllEntities = [...allEntitiesInGraph, ...entitiesToAdd];
        setAllEntitiesInGraph(updatedAllEntities);

        // 更新分页信息
        setEntityListPagination(prev => ({
          ...prev,
          total: updatedAllEntities.length
        }));

        setTopologyData({
          ...topologyData,
          entities: updatedEntities,
          stats: {
            ...topologyData.stats,
            nodeCount: updatedEntities.length
          }
        });

        message.success(`成功添加 ${entitiesToAdd.length} 个实体`);
        setSelectEntityModalVisible(false);
        setSelectedEntityIds([]);
        
        // 重新获取可用实体列表，因为刚添加的实体应该不再显示
        await fetchAvailableEntities(1, entitiesPagination.pageSize);
      } else {
        console.error('❌ 添加实体到图失败:', response.message);
        message.error('添加实体失败: ' + (response.message || '未知错误'));
      }
    } catch (error) {
      console.error('❌ 添加实体到图异常:', error);
      message.error('添加实体失败: ' + (error.message || '网络错误'));
    }
  };

  const cancelAddEntities = () => {
    setSelectEntityModalVisible(false);
    setSelectedEntityIds([]);
  };

  // 选择实体相关函数
  const handleEntitySelectionChange = (selectedIds: string[]) => {
    setSelectedEntityIds(selectedIds);
  };

  const selectAllEntities = () => {
    const allIds = availableEntities.map(entity => entity.id);
    setSelectedEntityIds(allIds);
  };

  const clearAllSelection = () => {
    setSelectedEntityIds([]);
  };

  // 处理实体清单分页变化
  const handleEntityListPaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || entityListPagination.pageSize;
    console.log('📄 实体清单分页变化:', { page, pageSize: newPageSize });
    
    setEntityListPagination(prev => ({
      ...prev,
      current: page,
      pageSize: newPageSize
    }));
  };

  // 获取当前页的实体数据
  const getCurrentPageEntities = (): Entity[] => {
    const { current, pageSize } = entityListPagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allEntitiesInGraph.slice(startIndex, endIndex);
  };

  // 处理依赖关系分页变化
  const handleDependencyListPaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || dependencyListPagination.pageSize;
    console.log('📄 依赖关系分页变化:', { page, pageSize: newPageSize });
    
    setDependencyListPagination(prev => ({
      ...prev,
      current: page,
      pageSize: newPageSize
    }));
  };

  // 获取当前页的依赖关系数据
  const getCurrentPageDependencies = (): Dependency[] => {
    const { current, pageSize } = dependencyListPagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allDependenciesInGraph.slice(startIndex, endIndex);
  };

  const handleEntitiesPaginationChange = async (page: number, pageSize?: number) => {
    console.log(`📄 分页变化: 页码 ${page}, 每页 ${pageSize || entitiesPagination.pageSize}`);
    const newPageSize = pageSize || entitiesPagination.pageSize;
    setSelectedEntityIds([]);
    await fetchAvailableEntities(page, newPageSize);
  };

  // 添加依赖关系相关函数
  const handleAddDependency = () => {
    setSourceEntityId('');
    setTargetEntityId('');
    setRelationshipType('depends_on');
    setAddDependencyModalVisible(true);
  };

  const confirmAddDependency = async () => {
    if (!topologyData || !sourceEntityId || !targetEntityId || !currentGraph?.id) {
      message.error('请选择源实体和目标实体');
      return;
    }

    if (sourceEntityId === targetEntityId) {
      message.error('源实体和目标实体不能相同');
      return;
    }

    const existingDependency = topologyData.dependencies.find(
      dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === (relationshipType as any)
    );

    if (existingDependency) {
      message.error('该依赖关系已存在');
      return;
    }

    setAddDependencyLoading(true);

    try {
      console.log('💾 开始创建依赖关系:', {
        graphId: currentGraph.id.toString(),
        sourceEntityId,
        targetEntityId,
        relationshipType
      });

      // 调用后端API创建关系
      const response = await relationApi.saveRelation({
        name: `${relationshipType}_relation`,
        description: `${relationshipType} relationship`,
        type: relationshipType,
        graphId: currentGraph.id.toString(),
        sourceEntityId,
        targetEntityId,
        direction: 'UNIDIRECTIONAL',
        weight: 1.0,
        status: 'ACTIVE'
      });

      if (response.success && response.data) {
        console.log('✅ 依赖关系创建成功:', response.data);

        // 将后端返回的数据转换为前端格式
        const newDependency: Dependency = {
          id: response.data.id,
          source: response.data.sourceEntityId,
          target: response.data.targetEntityId,
          type: response.data.type as any,
          description: response.data.description || `${response.data.type} relationship`,
          strength: response.data.weight || 1,
          // 保留原始数据以备后用
          _raw: response.data
        };

        const updatedDependencies = [...topologyData.dependencies, newDependency];
        const updatedAllDependencies = [...allDependenciesInGraph, newDependency];

        setTopologyData({
          ...topologyData,
          dependencies: updatedDependencies,
          stats: {
            ...topologyData.stats,
            linkCount: updatedDependencies.length
          }
        });

        // 更新所有依赖关系数据
        setAllDependenciesInGraph(updatedAllDependencies);
        
        // 更新分页信息
        setDependencyListPagination(prev => ({
          ...prev,
          total: updatedAllDependencies.length
        }));

        const sourceName = topologyData.entities.find(e => e.id === sourceEntityId)?.name || sourceEntityId;
        const targetName = topologyData.entities.find(e => e.id === targetEntityId)?.name || targetEntityId;

        message.success(`成功添加依赖关系: ${sourceName} → ${targetName}`);
        setAddDependencyModalVisible(false);
        
        // 重置表单状态
        setSourceEntityId('');
        setTargetEntityId('');
        setRelationshipType('depends_on');
      } else {
        console.error('❌ 创建依赖关系失败:', response.message);
        message.error('创建依赖关系失败: ' + (response.message || '未知错误'));
      }
    } catch (error) {
      console.error('❌ 创建依赖关系异常:', {
        error,
        errorMessage: error?.message,
        params: {
          graphId: currentGraph.id.toString(),
          sourceEntityId,
          targetEntityId,
          relationshipType
        }
      });
      message.error('创建依赖关系失败: ' + (error?.message || '网络错误'));
    } finally {
      setAddDependencyLoading(false);
    }
  };

  const cancelAddDependency = () => {
    setAddDependencyModalVisible(false);
  };

  const swapSourceAndTarget = () => {
    const temp = sourceEntityId;
    setSourceEntityId(targetEntityId);
    setTargetEntityId(temp);
  };

  // 图操作相关函数（简化版本 - 当前未完全实现）
  const handleSaveGraph = async (values: Record<string, unknown>) => {
    console.log('保存图:', values);
  };

  const handleLoadGraph = async (graphId: number) => {
    console.log('加载图:', graphId);
  };

  const handleDeleteGraph = async (graphId: number) => {
    console.log('删除图:', graphId);
  };

  // 渲染加载状态
  if (loading) {
    return (
      <PageContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  // 渲染空状态
  if (!topologyData) {
    return (
      <PageContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Empty description="未找到拓扑图数据" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 面包屑导航 */}
      <Breadcrumb 
        style={{ marginBottom: 16 }}
        items={[
          {
            href: '/',
            title: (
              <>
                <HomeOutlined />
                <span>首页</span>
              </>
            )
          },
          {
            href: '/test-tools',
            title: (
              <>
                <ToolOutlined />
                <span>测试工具</span>
              </>
            )
          },
          {
            href: '/test-tools/entity-topology',
            title: (
              <>
                <NodeIndexOutlined />
                <span>实体拓扑</span>
              </>
            )
          },
          {
            title: topologyData.name
          }
        ]}
      />

      {/* 页面头部 */}
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {topologyData.name}
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {topologyData.description || '实体拓扑图详情'}
            </Paragraph>
            <div style={{ marginTop: 12 }}>
              <Space>
                <Tag color={topologyData.status === 'active' ? 'green' : 'orange'}>{topologyData.status}</Tag>
                <Text type="secondary">类型: {topologyData.type}</Text>
                <Text type="secondary">平面: {topologyData.plane}</Text>
              </Space>
            </div>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新
            </Button>
            <Button icon={<SaveOutlined />}>保存</Button>
            <Button icon={<FolderOpenOutlined />}>加载</Button>
          </Space>
        </div>

        {/* 统计信息 */}
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={6}>
            <StatsCard>
              <Statistic title="实体数量" value={topologyData.stats.nodeCount} prefix={<DatabaseOutlined />} />
            </StatsCard>
          </Col>
          <Col span={6}>
            <StatsCard>
              <Statistic title="关系数量" value={topologyData.stats.linkCount} prefix={<LinkOutlined />} />
            </StatsCard>
          </Col>
          <Col span={6}>
            <StatsCard>
              <Statistic title="健康度" value={topologyData.stats.healthScore} suffix="%" prefix={<HeartOutlined />} />
            </StatsCard>
          </Col>
          <Col span={6}>
            <StatsCard>
              <Statistic title="最后更新" value={new Date(topologyData.stats.lastUpdated).toLocaleDateString()} />
            </StatsCard>
          </Col>
        </Row>
      </PageHeader>

      {/* 主要内容区域 */}
      <MainContent>
        {/* 左侧面板 - 数据管理 */}
        <LeftPanel>
          <Card title="数据管理" style={{ height: '100%' }}>
            <DataTabs
              entities={getCurrentPageEntities()}
              dependencies={(() => {
                const deps = getCurrentPageDependencies();
                console.log('📊 传递给DataTabs的依赖关系数据:', {
                  currentPageDependenciesCount: deps.length,
                  totalDependenciesCount: allDependenciesInGraph.length,
                  currentPage: dependencyListPagination.current,
                  pageSize: dependencyListPagination.pageSize,
                  sampleDependencies: deps.slice(0, 2),
                  dependenciesDetails: deps.map(d => ({
                    id: d.id,
                    source: d.source,
                    target: d.target,
                    type: d.type,
                    hasAllFields: !!(d.id && d.source && d.target && d.type)
                  }))
                });
                
                return deps;
              })()}
              onDeleteEntity={handleDeleteEntity}
              onDeleteDependency={handleDeleteDependency}
              onAddEntity={handleAddEntity}
              onAddDependency={handleAddDependency}
              onAgentsClick={() => {}} // 简化版本暂不实现
              getEntityTypeLabel={getEntityTypeLabel}
              entityPagination={entityListPagination}
              onEntityPaginationChange={handleEntityListPaginationChange}
              dependencyPagination={dependencyListPagination}
              onDependencyPaginationChange={handleDependencyListPaginationChange}
            />
          </Card>
        </LeftPanel>

        {/* 右侧面板 - 拓扑图 */}
        <RightPanel>
          <EntityD3RelationshipGraph entities={topologyData.entities} dependencies={topologyData.dependencies} />
        </RightPanel>
      </MainContent>

      {/* 删除实体Modal */}
      <DeleteEntityModal
        visible={deleteModalVisible}
        entity={entityToDelete}
        dependencies={topologyData.dependencies}
        onConfirm={confirmDeleteEntity}
        onCancel={cancelDeleteEntity}
      />

      {/* 删除依赖关系Modal */}
      <DeleteDependencyModal
        visible={deleteDependencyModalVisible}
        dependency={dependencyToDelete}
        entities={topologyData.entities}
        onConfirm={confirmDeleteDependency}
        onCancel={cancelDeleteDependency}
      />

      {/* 选择实体Modal */}
      <SelectEntityModal
        visible={selectEntityModalVisible}
        entities={availableEntities}
        selectedEntityIds={selectedEntityIds}
        loading={entitiesLoading}
        pagination={entitiesPagination}
        onConfirm={confirmAddEntities}
        onCancel={cancelAddEntities}
        onSelectionChange={handleEntitySelectionChange}
        onSelectAll={selectAllEntities}
        onClearAll={clearAllSelection}
        onPaginationChange={handleEntitiesPaginationChange}
        getEntityTypeLabel={getEntityTypeLabel}
      />

      {/* 添加依赖关系Modal */}
      <AddDependencyModal
        visible={addDependencyModalVisible}
        entities={topologyData.entities}
        dependencies={topologyData.dependencies}
        sourceEntityId={sourceEntityId}
        targetEntityId={targetEntityId}
        relationshipType={relationshipType}
        onConfirm={confirmAddDependency}
        onCancel={cancelAddDependency}
        onSourceChange={setSourceEntityId}
        onTargetChange={setTargetEntityId}
        onRelationshipTypeChange={setRelationshipType}
        onSwapEntities={swapSourceAndTarget}
        loading={addDependencyLoading}
      />

      {/* 图操作Modals - 当前简化版本，功能未完全实现 */}
      <GraphOperationModals
        saveModalVisible={saveGraphModalVisible}
        onSaveModalCancel={() => {}}
        onSaveGraph={handleSaveGraph}
        saveForm={graphForm}
        currentGraph={currentGraph}
        saveLoading={graphLoading}
        loadModalVisible={false}
        onLoadModalCancel={() => {}}
        availableGraphs={availableGraphs}
        onLoadGraph={handleLoadGraph}
        onDeleteGraph={handleDeleteGraph}
        loadLoading={graphLoading}
      />
    </PageContainer>
  );
};

export default EntityTopologyDetail;
