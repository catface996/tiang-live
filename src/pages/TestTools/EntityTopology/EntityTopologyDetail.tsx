import React, { useState, useEffect, useCallback } from 'react';
import { Space, Spin, Empty, Breadcrumb, message, Form } from 'antd';
import { NodeIndexOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../../styles/entity-topology-detail.css';
import TopologyHeader from '../../../components/EntityTopology/TopologyHeader';
import DataTabs from '../../../components/EntityTopology/DataTabs';
import EntityD3RelationshipGraph from '../../../components/EntityTopology/EntityD3RelationshipGraph';
import DeleteEntityModal from '../../../components/EntityTopology/DeleteEntityModal';
import SelectEntityModal from '../../../components/EntityTopology/SelectEntityModal';
import AddDependencyModal from '../../../components/EntityTopology/AddDependencyModal';
import GraphOperationModals from '../../../components/EntityTopology/GraphOperationModals';
import { graphApi, GraphStatus, type Graph } from '../../../services/graphApi';
import { entityApi } from '../../../services/entityApi';

// 基础类型定义
interface Entity {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  connections: number;
}

interface Dependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to';
  description: string;
  strength: number;
}

interface TopologyData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  plane: string;
  tags: string[];
  stats: {
    nodeCount: number;
    linkCount: number;
    healthScore: number;
    lastUpdated: string;
  };
  entities: Entity[];
  dependencies: Dependency[];
  graphData?: any;
}

const EntityTopologyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['entityTopology', 'common']);

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
  const [entitiesPagination, setEntitiesPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // 添加依赖关系相关状态
  const [addDependencyModalVisible, setAddDependencyModalVisible] = useState(false);
  const [sourceEntityId, setSourceEntityId] = useState<string>('');
  const [targetEntityId, setTargetEntityId] = useState<string>('');
  const [relationshipType, setRelationshipType] = useState<string>('depends_on');

  // 图操作相关状态
  const [saveGraphModalVisible, setSaveGraphModalVisible] = useState(false);
  const [loadGraphModalVisible, setLoadGraphModalVisible] = useState(false);
  const [availableGraphs, setAvailableGraphs] = useState<Graph[]>([]);
  const [graphForm] = Form.useForm();
  const [graphLoading, setGraphLoading] = useState(false);

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

        const response = await graphApi.getGraphById(id);

        if (response.success && response.data) {
          const graph = response.data;
          console.log('✅ 成功获取图详情:', graph);

          // 辅助函数：将Graph状态映射为Topology状态
          const mapGraphStatusToTopologyStatus = (graphStatus?: GraphStatus): 'active' | 'inactive' | 'warning' | 'error' => {
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
            entities: [],
            dependencies: []
          };

          setTopologyData(topologyData);
          setCurrentGraph(graph);

          console.log('✅ 拓扑图详情加载完成:', topologyData);
        } else {
          console.error('❌ API返回数据格式异常:', response);
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

  const confirmDeleteEntity = () => {
    if (!topologyData || !entityToDelete) return;

    const relatedDependencies = topologyData.dependencies.filter(
      dep => dep.source === entityToDelete.id || dep.target === entityToDelete.id
    );

    const updatedEntities = topologyData.entities.filter(e => e.id !== entityToDelete.id);
    const updatedDependencies = topologyData.dependencies.filter(
      dep => dep.source !== entityToDelete.id && dep.target !== entityToDelete.id
    );

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

    const messageText = relatedDependencies.length > 0
      ? `成功删除实体 ${entityToDelete.name} 及其 ${relatedDependencies.length} 个相关依赖关系`
      : `成功删除实体 ${entityToDelete.name}`;

    message.success(messageText);
    setDeleteModalVisible(false);
    setEntityToDelete(null);
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

  const confirmDeleteDependency = () => {
    if (!topologyData || !dependencyToDelete) return;

    const updatedDependencies = topologyData.dependencies.filter(dep => dep.id !== dependencyToDelete.id);

    setTopologyData({
      ...topologyData,
      dependencies: updatedDependencies,
      stats: {
        ...topologyData.stats,
        linkCount: updatedDependencies.length
      }
    });

    const sourceName = topologyData.entities.find(e => e.id === dependencyToDelete.source)?.name || dependencyToDelete.source;
    const targetName = topologyData.entities.find(e => e.id === dependencyToDelete.target)?.name || dependencyToDelete.target;

    message.success(`成功删除依赖关系: ${sourceName} → ${targetName}`);
    setDeleteDependencyModalVisible(false);
    setDependencyToDelete(null);
  };

  const cancelDeleteDependency = () => {
    setDeleteDependencyModalVisible(false);
    setDependencyToDelete(null);
  };

  // 添加实体相关函数
  const handleAddEntity = async () => {
    console.log('🎯 点击新增实体按钮');
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

    setEntitiesLoading(true);
    try {
      const graphId = currentGraph.id.toString();
      const response = await entityApi.getEntitiesNotInGraph(graphId, {
        page: page,
        size: pageSize
      });

      console.log('📥 API响应:', response);

      if (response.success && response.data) {
        const { content, totalElements, totalPages } = response.data;
        console.log('✅ 成功获取可用实体列表:', content.length, '个实体，总计:', totalElements);

        setAvailableEntities(content);
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

  const confirmAddDependency = () => {
    if (!topologyData || !sourceEntityId || !targetEntityId) {
      message.error('请选择源实体和目标实体');
      return;
    }

    if (sourceEntityId === targetEntityId) {
      message.error('源实体和目标实体不能相同');
      return;
    }

    const existingDependency = topologyData.dependencies.find(
      dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === relationshipType as any
    );

    if (existingDependency) {
      message.error('该依赖关系已存在');
      return;
    }

    const newDependency: Dependency = {
      id: `dep_${Date.now()}`,
      source: sourceEntityId,
      target: targetEntityId,
      type: relationshipType as any,
      description: `${relationshipType} relationship`,
      strength: 1
    };

    const updatedDependencies = [...topologyData.dependencies, newDependency];

    setTopologyData({
      ...topologyData,
      dependencies: updatedDependencies,
      stats: {
        ...topologyData.stats,
        linkCount: updatedDependencies.length
      }
    });

    const sourceName = topologyData.entities.find(e => e.id === sourceEntityId)?.name || sourceEntityId;
    const targetName = topologyData.entities.find(e => e.id === targetEntityId)?.name || targetEntityId;

    message.success(`成功添加依赖关系: ${sourceName} → ${targetName}`);
    setAddDependencyModalVisible(false);
  };

  const cancelAddDependency = () => {
    setAddDependencyModalVisible(false);
  };

  const swapSourceAndTarget = () => {
    const temp = sourceEntityId;
    setSourceEntityId(targetEntityId);
    setTargetEntityId(temp);
  };

  // 图操作相关函数（简化版本）
  const loadAvailableGraphs = useCallback(async () => {
    try {
      setGraphLoading(true);
      const response = await graphApi.listGraphs({
        ownerId: 1,
        status: GraphStatus.ACTIVE,
        page: 1,
        size: 100
      });

      if (response.success && response.data && response.data.records) {
        setAvailableGraphs(response.data.records);
      } else {
        message.error('加载图列表失败');
        setAvailableGraphs([]);
      }
    } catch (error) {
      console.error('Failed to load graphs:', error);
      message.error('加载图列表失败');
      setAvailableGraphs([]);
    } finally {
      setGraphLoading(false);
    }
  }, []);

  const handleSaveGraph = async (values: any) => {
    // 简化的保存图逻辑
    console.log('保存图:', values);
    setSaveGraphModalVisible(false);
  };

  const handleLoadGraph = async (graphId: number) => {
    // 简化的加载图逻辑
    console.log('加载图:', graphId);
    setLoadGraphModalVisible(false);
  };

  const handleDeleteGraph = async (graphId: number) => {
    // 简化的删除图逻辑
    console.log('删除图:', graphId);
  };

  // 渲染加载状态
  if (loading) {
    return (
      <div className="entity-topology-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  // 渲染空状态
  if (!topologyData) {
    return (
      <div className="entity-topology-detail-empty">
        <Empty description="未找到拓扑图数据" />
      </div>
    );
  }

  return (
    <div className="entity-topology-detail">
      {/* 面包屑导航 */}
      <div style={{ marginBottom: '16px' }}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: (
                <Space>
                  <HomeOutlined />
                  <span>首页</span>
                </Space>
              )
            },
            {
              href: '/test-tools',
              title: (
                <Space>
                  <ToolOutlined />
                  <span>测试工具</span>
                </Space>
              )
            },
            {
              href: '/test-tools/entity-topology',
              title: (
                <Space>
                  <NodeIndexOutlined />
                  <span>实体拓扑</span>
                </Space>
              )
            },
            {
              title: topologyData.name
            }
          ]}
        />
      </div>

      {/* 顶部标题区域 */}
      <div style={{ marginBottom: '16px' }}>
        <TopologyHeader topologyData={topologyData} onRefresh={handleRefresh} />
      </div>

      {/* 主要内容区域 */}
      <div style={{ display: 'flex', height: 'calc(100vh - 200px)', gap: '16px' }}>
        {/* 左侧图形区域 */}
        <div style={{ flex: 1, minHeight: '500px' }}>
          <EntityD3RelationshipGraph
            entities={topologyData.entities}
            dependencies={topologyData.dependencies}
          />
        </div>

        {/* 右侧数据区域 */}
        <div style={{ width: '400px' }}>
          <DataTabs
            entities={topologyData.entities}
            dependencies={topologyData.dependencies}
            onDeleteEntity={handleDeleteEntity}
            onDeleteDependency={handleDeleteDependency}
            onAddEntity={handleAddEntity}
            onAddDependency={handleAddDependency}
            onAgentsClick={() => {}} // 简化版本暂不实现
          />
        </div>
      </div>

      {/* 删除实体Modal */}
      <DeleteEntityModal
        visible={deleteModalVisible}
        entity={entityToDelete}
        dependencies={topologyData.dependencies}
        onConfirm={confirmDeleteEntity}
        onCancel={cancelDeleteEntity}
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
      />

      {/* 图操作Modals */}
      <GraphOperationModals
        saveModalVisible={saveGraphModalVisible}
        onSaveModalCancel={() => setSaveGraphModalVisible(false)}
        onSaveGraph={handleSaveGraph}
        saveForm={graphForm}
        currentGraph={currentGraph}
        saveLoading={graphLoading}
        loadModalVisible={loadGraphModalVisible}
        onLoadModalCancel={() => setLoadGraphModalVisible(false)}
        availableGraphs={availableGraphs}
        onLoadGraph={handleLoadGraph}
        onDeleteGraph={handleDeleteGraph}
        loadLoading={graphLoading}
      />
    </div>
  );
};

export default EntityTopologyDetail;
