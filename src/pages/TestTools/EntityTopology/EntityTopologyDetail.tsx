import React, { useState, useEffect, useCallback } from 'react';
import {
  Space,
  Spin,
  Empty,
  Breadcrumb,
  message,
  Form,
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Button,
  Tag
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
import SelectEntityModal from '../../../components/EntityTopology/SelectEntityModal';
import AddDependencyModal from '../../../components/EntityTopology/AddDependencyModal';
import GraphOperationModals from '../../../components/EntityTopology/GraphOperationModals';
import { graphApi, GraphStatus, type Graph } from '../../../services/graphApi';
import { entityApi } from '../../../services/entityApi';
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

  // 图操作相关状态
  const [saveGraphModalVisible] = useState(false);
  const [availableGraphs] = useState<Graph[]>([]);
  const [graphForm] = Form.useForm();
  const [graphLoading] = useState(false);

  // 实体类型枚举相关状态
  const [entityTypeEnums, setEntityTypeEnums] = useState<EnumItem[]>([]);
  const [entityTypeMap, setEntityTypeMap] = useState<Map<string, string>>(new Map());

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
            entities: [],
            dependencies: []
          };

          setTopologyData(topologyData);
          setCurrentGraph(graph);

          console.log('✅ 拓扑图详情加载完成:', topologyData);
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

    const messageText =
      relatedDependencies.length > 0
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

    const sourceName =
      topologyData.entities.find(e => e.id === dependencyToDelete.source)?.name || dependencyToDelete.source;
    const targetName =
      topologyData.entities.find(e => e.id === dependencyToDelete.target)?.name || dependencyToDelete.target;

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
      dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === (relationshipType as any)
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
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>首页</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/test-tools">
          <ToolOutlined />
          <span>测试工具</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/test-tools/entity-topology">
          <NodeIndexOutlined />
          <span>实体拓扑</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{topologyData.name}</Breadcrumb.Item>
      </Breadcrumb>

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
              entities={topologyData.entities}
              dependencies={topologyData.dependencies}
              onDeleteEntity={handleDeleteEntity}
              onDeleteDependency={handleDeleteDependency}
              onAddEntity={handleAddEntity}
              onAddDependency={handleAddDependency}
              onAgentsClick={() => {}} // 简化版本暂不实现
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
