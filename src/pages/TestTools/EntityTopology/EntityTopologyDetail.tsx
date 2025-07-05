import React, { useState, useEffect, useCallback } from 'react';
import { Space, Spin, Empty, Breadcrumb, message, Modal, Table, Tag, Button, Select, Radio, Input, Form } from 'antd';
import { NodeIndexOutlined, HomeOutlined, ToolOutlined, SwapOutlined, RobotOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import '../../../styles/entity-topology-detail.css';
import TopologyHeader from '../../../components/EntityTopology/TopologyHeader';
import DataTabs from '../../../components/EntityTopology/DataTabs';
import EntityD3RelationshipGraph from '../../../components/EntityTopology/EntityD3RelationshipGraph';
import availableAgentsData from '../../../data/availableAgentsMock.json';
import { graphApi, GraphStatus, type Graph, type SaveGraphRequest } from '../../../services/graphApi';
import { entityApi } from '../../../services/entityApi';

// Agent类型定义
interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  description: string;
  capabilities: string[];
  version: string;
  lastActive: string;
}

// 实体-Agent绑定关系
interface EntityAgentBinding {
  id: string;
  entityId: string;
  agentId: string;
  bindingType: 'monitoring' | 'management' | 'analysis' | 'automation';
  createdAt: string;
}

// 关系展示样式组件
const RelationshipDisplay = styled.div`
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  padding: 12px;
  border-radius: 6px;
  margin: 12px 0;
  text-align: center;
  transition: all 0.3s ease;

  .entity-name {
    font-weight: bold;
    color: var(--text-primary);
  }

  .arrow {
    margin: 0 8px;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 16px;
  }

  &:hover {
    background: var(--bg-elevated);
    border-color: var(--border-hover);
  }
`;

const RelationshipMeta = styled.p`
  font-size: 12px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
`;

const WarningText = styled.p`
  color: var(--text-tertiary);
  font-size: 12px;
  margin: 8px 0 0 0;
`;

const DangerText = styled.p`
  color: var(--error-color);
  font-weight: 500;
  margin: 8px 0;
`;

const SelectionHint = styled.div`
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;

  p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 14px;
  }

  .highlight {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const RelationshipForm = styled.div`
  .form-item {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .entity-select {
    width: 100%;
  }

  .relationship-preview {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    padding: 16px;
    border-radius: 6px;
    margin: 16px 0;
    text-align: center;

    .preview-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 16px;
    }

    .entity-name {
      font-weight: bold;
      color: var(--text-primary);
      padding: 4px 8px;
      background: var(--bg-elevated);
      border-radius: 4px;
    }

    .arrow {
      color: var(--primary-color);
      font-weight: bold;
      font-size: 18px;
    }

    .relationship-type {
      font-size: 12px;
      color: var(--text-secondary);
      margin-top: 8px;
    }
  }
`;

const AgentBindingHint = styled.div`
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;

  p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 14px;
  }

  .highlight {
    color: var(--primary-color);
    font-weight: 500;
  }

  .entity-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 8px;
    background: var(--bg-elevated);
    border-radius: 4px;

    .entity-name {
      font-weight: bold;
      color: var(--text-primary);
    }

    .entity-type {
      font-size: 12px;
      color: var(--text-secondary);
    }
  }
`;

// 类型定义 - 适配D3RelationshipGraph组件
interface Node {
  id: string;
  name: string;
  type: string;
  level: number;
  plane: string;
  description: string;
  status: string;
  [key: string]: any;
}

interface Link {
  source: string;
  target: string;
  type: string;
  strength: number;
}

interface Plane {
  id: string;
  name: string;
  level: number;
  color: string;
  borderColor: string;
  description: string;
  bounds: {
    minLevel: number;
    maxLevel: number;
  };
}

interface GraphData {
  planes: Plane[];
  nodes: Node[];
  links: Link[];
  metadata: {
    levels: Array<{
      level: number;
      name: string;
      color: string;
    }>;
    relationTypes: Array<{
      type: string;
      description: string;
      color: string;
      strokeWidth: number;
    }>;
  };
}

// 保留原有的Entity和Dependency接口用于数据转换
interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, unknown>;
  connections: number;
}

interface Dependency {
  id: string;
  source: string;
  target: string;
  type: 'depends_on' | 'provides_to' | 'connects_to';
  strength: number;
  description?: string;
}

interface TopologyData {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
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
  // 新增适配D3RelationshipGraph的数据
  graphData?: GraphData;
}

const EntityTopologyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['entityTopology', 'common']);

  const [loading, setLoading] = useState(true);
  const [topologyData, setTopologyData] = useState<TopologyData | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<Entity | null>(null);
  const [deleteDependencyModalVisible, setDeleteDependencyModalVisible] = useState(false);
  const [dependencyToDelete, setDependencyToDelete] = useState<Dependency | null>(null);
  const [selectEntityModalVisible, setSelectEntityModalVisible] = useState(false);
  const [availableEntities, setAvailableEntities] = useState<Entity[]>([]);
  const [entitiesLoading, setEntitiesLoading] = useState(false);
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);
  // 分页相关状态
  const [entitiesPagination, setEntitiesPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [addDependencyModalVisible, setAddDependencyModalVisible] = useState(false);
  const [sourceEntityId, setSourceEntityId] = useState<string>('');
  const [targetEntityId, setTargetEntityId] = useState<string>('');
  const [relationshipType, setRelationshipType] = useState<string>('depends_on');
  const [selectAgentModalVisible, setSelectAgentModalVisible] = useState(false);
  const [currentEntity, setCurrentEntity] = useState<any>(null);
  const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([]);
  const [entityAgentBindings, setEntityAgentBindings] = useState<EntityAgentBinding[]>([]);

  // 图操作相关状态
  const [currentGraph, setCurrentGraph] = useState<Graph | null>(null);
  const [saveGraphModalVisible, setSaveGraphModalVisible] = useState(false);
  const [loadGraphModalVisible, setLoadGraphModalVisible] = useState(false);
  const [availableGraphs, setAvailableGraphs] = useState<Graph[]>([]);
  const [graphForm] = Form.useForm();
  const [graphLoading, setGraphLoading] = useState(false);

  useEffect(() => {
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

    // 直接在useEffect中定义加载函数，避免依赖外部函数
    const loadData = async () => {
      if (!id) {
        console.error('❌ No ID provided for topology detail');
        return;
      }

      setLoading(true);
      try {
        console.log('🚀 开始加载拓扑图详情, ID:', id);

        // 调用真实的API接口获取图详情
        const response = await graphApi.getGraphById(id);

        if (response.success && response.data) {
          const graph = response.data;
          console.log('✅ 成功获取图详情:', graph);

          // 将Graph数据转换为TopologyData格式
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
            entities: [], // 实体数据需要从其他接口获取，暂时为空
            dependencies: [] // 依赖关系数据需要从其他接口获取，暂时为空
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
  }, [id]); // 只依赖id，避免函数依赖导致的无限循环

  // 简单的刷新函数
  const handleRefresh = useCallback(() => {
    // 通过更新一个状态来触发重新加载
    setLoading(true);
    // 这里可以添加刷新逻辑，或者简单地重新加载页面
    window.location.reload();
  }, []);

  // 图操作相关函数

  /**
   * 加载可用的图列表
   */
  const loadAvailableGraphs = useCallback(async () => {
    try {
      setGraphLoading(true);
      const response = await graphApi.listGraphs({
        ownerId: 1, // 假设当前用户ID为1，实际应该从用户上下文获取
        status: GraphStatus.ACTIVE,
        page: 1,
        size: 100 // 加载更多图用于选择
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
  }, []); // 移除t依赖，避免重复调用

  /**
   * 保存当前拓扑为图
   */
  const handleSaveGraph = async (values: any) => {
    try {
      setGraphLoading(true);

      // 构建图的元数据，包含当前拓扑的节点和边信息
      const graphMetadata = {
        nodes: topologyData?.entities || [],
        edges: topologyData?.dependencies || [],
        layout: 'force-directed',
        version: '1.0',
        entityCount: topologyData?.entities?.length || 0,
        relationCount: topologyData?.dependencies?.length || 0
      };

      const saveRequest: SaveGraphRequest = {
        id: currentGraph?.id, // 如果是更新现有图
        name: values.name,
        description: values.description,
        labels: values.labels || [],
        status: values.status || GraphStatus.ACTIVE,
        ownerId: 1, // 假设当前用户ID为1
        metadata: graphMetadata
      };

      const response = await graphApi.saveGraph(saveRequest);

      if (response.success) {
        message.success(t('entityTopology:graph.saveSuccess'));
        setCurrentGraph(response.data);
        setSaveGraphModalVisible(false);
        graphForm.resetFields();

        // 刷新可用图列表
        await loadAvailableGraphs();
      } else {
        message.error(response.message || t('entityTopology:graph.saveError'));
      }
    } catch (error) {
      console.error('Failed to save graph:', error);
      message.error(t('entityTopology:graph.saveError'));
    } finally {
      setGraphLoading(false);
    }
  };

  /**
   * 加载选中的图
   */
  const handleLoadGraph = async (graphId: number) => {
    try {
      setGraphLoading(true);

      const response = await graphApi.getGraphById(graphId);

      if (response.success) {
        const graph = response.data;
        setCurrentGraph(graph);

        // 从图的元数据中恢复拓扑数据
        if (graph.metadata) {
          const restoredTopologyData = {
            id: graph.id?.toString() || '',
            name: graph.name,
            description: graph.description || '',
            entities: graph.metadata.nodes || [],
            dependencies: graph.metadata.edges || [],
            metadata: {
              entityCount: graph.metadata.entityCount || 0,
              relationCount: graph.metadata.relationCount || 0,
              version: graph.metadata.version || '1.0'
            }
          };

          setTopologyData(restoredTopologyData);
        }

        message.success(t('entityTopology:graph.loadSuccess'));
        setLoadGraphModalVisible(false);
      } else {
        message.error(response.message || t('entityTopology:graph.loadError'));
      }
    } catch (error) {
      console.error('Failed to load graph:', error);
      message.error(t('entityTopology:graph.loadError'));
    } finally {
      setGraphLoading(false);
    }
  };

  /**
   * 删除图
   */
  const handleDeleteGraph = async (graphId: number) => {
    try {
      const response = await graphApi.deleteGraph({ graphId });

      if (response.success) {
        message.success(t('entityTopology:graph.deleteSuccess'));

        // 如果删除的是当前图，清空当前图状态
        if (currentGraph?.id === graphId) {
          setCurrentGraph(null);
        }

        // 刷新可用图列表
        await loadAvailableGraphs();
      } else {
        message.error(response.message || t('entityTopology:graph.deleteError'));
      }
    } catch (error) {
      console.error('Failed to delete graph:', error);
      message.error(t('entityTopology:graph.deleteError'));
    }
  };

  /**
   * 打开保存图对话框
   */
  const handleOpenSaveGraphModal = () => {
    if (currentGraph) {
      // 如果有当前图，填充表单进行更新
      graphForm.setFieldsValue({
        name: currentGraph.name,
        description: currentGraph.description,
        labels: currentGraph.labels,
        status: currentGraph.status
      });
    } else {
      // 新建图，使用默认值
      graphForm.setFieldsValue({
        name: topologyData?.name || `拓扑图_${new Date().toLocaleDateString()}`,
        description: topologyData?.description || '',
        labels: [],
        status: GraphStatus.ACTIVE
      });
    }
    setSaveGraphModalVisible(true);
  };

  /**
   * 打开加载图对话框
   */
  const handleOpenLoadGraphModal = async () => {
    await loadAvailableGraphs();
    setLoadGraphModalVisible(true);
  };

  // 处理Agents按钮点击
  const handleAgentsClick = (entity: any) => {
    setCurrentEntity(entity);

    // 获取已绑定的Agent ID列表
    const boundAgentIds = entityAgentBindings
      .filter(binding => binding.entityId === entity.id)
      .map(binding => binding.agentId);

    // 设置可用的Agent列表（包括已绑定的，用于显示状态）
    setAvailableAgents(availableAgentsData.agents);
    setSelectedAgentIds(boundAgentIds);
    setSelectAgentModalVisible(true);
  };

  // 确认绑定Agent
  const confirmBindAgents = () => {
    if (!currentEntity || selectedAgentIds.length === 0) {
      message.warning(t('detail.messages.selectAgents'));
      return;
    }

    // 获取当前实体已绑定的Agent
    const currentBindings = entityAgentBindings.filter(binding => binding.entityId === currentEntity.id);
    const currentBoundAgentIds = currentBindings.map(binding => binding.agentId);

    // 计算需要新增和删除的绑定
    const toAdd = selectedAgentIds.filter(agentId => !currentBoundAgentIds.includes(agentId));
    const toRemove = currentBoundAgentIds.filter(agentId => !selectedAgentIds.includes(agentId));

    // 创建新的绑定关系
    const newBindings: EntityAgentBinding[] = toAdd.map(agentId => ({
      id: `binding-${currentEntity.id}-${agentId}-${Date.now()}`,
      entityId: currentEntity.id,
      agentId: agentId,
      bindingType: 'monitoring', // 默认类型，可以后续扩展
      createdAt: new Date().toISOString()
    }));

    // 更新绑定关系列表
    const updatedBindings = [
      ...entityAgentBindings.filter(
        binding => !(binding.entityId === currentEntity.id && toRemove.includes(binding.agentId))
      ),
      ...newBindings
    ];

    setEntityAgentBindings(updatedBindings);

    // 更新拓扑数据，添加Agent节点和连接
    if (topologyData) {
      updateTopologyWithAgents(updatedBindings);
    }

    const addedCount = toAdd.length;
    const removedCount = toRemove.length;
    let message_text = '';
    if (addedCount > 0 && removedCount > 0) {
      message_text = t('detail.messages.bindAgentsSuccess', { added: addedCount, removed: removedCount });
    } else if (addedCount > 0) {
      message_text = t('detail.messages.bindAgentsAddedOnly', { count: addedCount, entityName: currentEntity.name });
    } else if (removedCount > 0) {
      message_text = t('detail.messages.bindAgentsRemovedOnly', { count: removedCount });
    } else {
      message_text = t('detail.messages.bindAgentsNoChange');
    }

    message.success(message_text);
    setSelectAgentModalVisible(false);
  };

  // 取消绑定Agent
  const cancelBindAgents = () => {
    setSelectAgentModalVisible(false);
    setCurrentEntity(null);
    setSelectedAgentIds([]);
  };

  // 处理Agent选择变化
  const handleAgentSelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedAgentIds(selectedRowKeys as string[]);
  };

  // 更新拓扑数据，添加Agent节点和连接
  const updateTopologyWithAgents = (bindings: EntityAgentBinding[]) => {
    if (!topologyData) return;

    // 获取所有绑定的Agent
    const boundAgentIds = [...new Set(bindings.map(binding => binding.agentId))];
    const agentNodes = availableAgentsData.agents
      .filter(agent => boundAgentIds.includes(agent.id))
      .map(agent => ({
        id: agent.id,
        name: agent.name,
        type: 'agent',
        level: 0, // Agent在最顶层
        status: agent.status,
        properties: {
          description: agent.description,
          agentType: agent.type,
          capabilities: agent.capabilities.join(', '),
          version: agent.version,
          lastActive: agent.lastActive
        },
        connections: bindings.filter(binding => binding.agentId === agent.id).length
      }));

    // 创建Agent到实体的连接
    const agentConnections = bindings.map(binding => ({
      id: `agent-conn-${binding.id}`,
      source: binding.agentId,
      target: binding.entityId,
      type: 'manages',
      description: t('detail.relationshipDescriptions.manages', { defaultValue: 'Manages' }),
      strength: 0.8
    }));

    // 更新拓扑数据
    const updatedEntities = [...topologyData.entities.filter(entity => entity.type !== 'agent'), ...agentNodes];

    const updatedDependencies = [
      ...topologyData.dependencies.filter(dep => !dep.id.startsWith('agent-conn-')),
      ...agentConnections
    ];

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
  };

  // 处理单个实体删除
  const handleDeleteEntity = (entity: Entity) => {
    setEntityToDelete(entity);
    setDeleteModalVisible(true);
  };

  const confirmDeleteEntity = () => {
    if (!topologyData || !entityToDelete) return;

    // 计算相关的依赖关系数量
    const relatedDependencies = topologyData.dependencies.filter(
      dep => dep.source === entityToDelete.id || dep.target === entityToDelete.id
    );

    const updatedEntities = topologyData.entities.filter(e => e.id !== entityToDelete.id);

    // 同时删除相关的依赖关系
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

    // 如果当前选中的实体被删除了，清空选中状态
    if (selectedEntity && selectedEntity.id === entityToDelete.id) {
      setSelectedEntity(null);
    }

    const successMessage =
      relatedDependencies.length > 0
        ? t('detail.messages.deleteEntityWithDependencies', {
            entityName: entityToDelete.name,
            count: relatedDependencies.length
          })
        : t('detail.messages.deleteEntitySuccess', { entityName: entityToDelete.name });

    message.success(successMessage);

    // 关闭Modal
    setDeleteModalVisible(false);
    setEntityToDelete(null);
  };

  const cancelDeleteEntity = () => {
    setDeleteModalVisible(false);
    setEntityToDelete(null);
  };

  // 处理依赖关系删除
  const handleDeleteDependency = (dependency: Dependency) => {
    setDependencyToDelete(dependency);
    setDeleteDependencyModalVisible(true);
  };

  const confirmDeleteDependency = () => {
    if (!topologyData || !dependencyToDelete) return;

    const updatedDependencies = topologyData.dependencies.filter(dep => dep.id !== dependencyToDelete.id);

    // 更新实体的连接数
    const updatedEntities = topologyData.entities.map(entity => {
      const connectionCount = updatedDependencies.filter(
        dep => dep.source === entity.id || dep.target === entity.id
      ).length;
      return { ...entity, connections: connectionCount };
    });

    setTopologyData({
      ...topologyData,
      entities: updatedEntities,
      dependencies: updatedDependencies,
      stats: {
        ...topologyData.stats,
        linkCount: updatedDependencies.length
      }
    });

    const sourceEntity = topologyData.entities.find(e => e.id === dependencyToDelete.source);
    const targetEntity = topologyData.entities.find(e => e.id === dependencyToDelete.target);
    const sourceName = sourceEntity ? sourceEntity.name : dependencyToDelete.source;
    const targetName = targetEntity ? targetEntity.name : dependencyToDelete.target;

    message.success(t('detail.messages.deleteDependencySuccess', { source: sourceName, target: targetName }));

    // 关闭Modal
    setDeleteDependencyModalVisible(false);
    setDependencyToDelete(null);
  };

  const cancelDeleteDependency = () => {
    setDeleteDependencyModalVisible(false);
    setDependencyToDelete(null);
  };

  // 处理新增依赖关系
  const handleAddDependency = () => {
    if (!topologyData || topologyData.entities.length < 2) {
      message.warning(t('detail.messages.minEntitiesRequired'));
      return;
    }

    // 重置状态
    setSourceEntityId('');
    setTargetEntityId('');
    setRelationshipType('depends_on');
    setAddDependencyModalVisible(true);
  };

  // 确认创建依赖关系
  const confirmAddDependency = () => {
    if (!topologyData || !sourceEntityId || !targetEntityId) {
      message.error(t('detail.messages.selectSourceAndTarget'));
      return;
    }

    if (sourceEntityId === targetEntityId) {
      message.error(t('detail.messages.sourceTargetSame'));
      return;
    }

    // 检查是否已存在相同的依赖关系
    const existingDependency = topologyData.dependencies.find(
      dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === relationshipType
    );

    if (existingDependency) {
      message.error(t('detail.messages.dependencyExists'));
      return;
    }

    // 创建新的依赖关系
    const newDependency: Dependency = {
      id: `dep-${Date.now()}`,
      source: sourceEntityId,
      target: targetEntityId,
      type: relationshipType,
      description: getRelationshipDescription(relationshipType),
      strength: 1
    };

    // 更新拓扑数据
    const updatedDependencies = [...topologyData.dependencies, newDependency];

    // 更新实体的连接数
    const updatedEntities = topologyData.entities.map(entity => {
      const connectionCount = updatedDependencies.filter(
        dep => dep.source === entity.id || dep.target === entity.id
      ).length;
      return { ...entity, connections: connectionCount };
    });

    setTopologyData({
      ...topologyData,
      entities: updatedEntities,
      dependencies: updatedDependencies,
      stats: {
        ...topologyData.stats,
        linkCount: updatedDependencies.length
      }
    });

    const sourceEntity = topologyData.entities.find(e => e.id === sourceEntityId);
    const targetEntity = topologyData.entities.find(e => e.id === targetEntityId);
    const sourceName = sourceEntity ? sourceEntity.name : sourceEntityId;
    const targetName = targetEntity ? targetEntity.name : targetEntityId;

    message.success(t('detail.messages.addDependencySuccess', { source: sourceName, target: targetName }));

    // 关闭Modal
    setAddDependencyModalVisible(false);
  };

  // 取消创建依赖关系
  const cancelAddDependency = () => {
    setAddDependencyModalVisible(false);
  };

  // 获取关系类型描述
  const getRelationshipDescription = (type: string): string => {
    return t(`detail.relationshipDescriptions.${type}`, { defaultValue: type });
  };

  // 交换源和目标实体
  const swapSourceAndTarget = () => {
    const temp = sourceEntityId;
    setSourceEntityId(targetEntityId);
    setTargetEntityId(temp);
  };

  // 从API获取实体列表（支持分页）
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
      // 将graphId转换为字符串类型
      const graphId = currentGraph.id.toString();
      
      // 调用entityApi获取不在当前图中的实体列表
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

  // 处理新增实体
  const handleAddEntity = async () => {
    console.log('🎯 点击新增实体按钮');
    setSelectedEntityIds([]);
    setSelectEntityModalVisible(true);

    // 重置分页到第一页
    setEntitiesPagination(prev => ({ ...prev, current: 1 }));

    // 获取可用的实体列表（第一页）
    await fetchAvailableEntities(1, entitiesPagination.pageSize);
  };

  // 确认添加选中的实体
  const confirmAddEntities = async () => {
    if (!topologyData || selectedEntityIds.length === 0 || !currentGraph?.id) {
      message.warning('请选择要添加的实体');
      return;
    }

    try {
      // 将graphId转换为字符串类型
      const graphId = currentGraph.id.toString();
      
      console.log('🚀 开始添加实体到图:', {
        graphId,
        entityIds: selectedEntityIds
      });

      // 调用后端接口将实体添加到图中
      const response = await entityApi.addToGraph({
        graphId,
        entityIds: selectedEntityIds
      });

      if (response.success) {
        console.log('✅ 实体添加到图成功');
        
        // 获取选中的实体
        const entitiesToAdd = availableEntities.filter(entity => selectedEntityIds.includes(entity.id));

        // 更新前端拓扑数据
        const updatedEntities = [...topologyData.entities, ...entitiesToAdd];

        setTopologyData({
          ...topologyData,
          entities: updatedEntities,
          stats: {
            ...topologyData.stats,
            nodeCount: updatedEntities.length
          }
        });

        message.success(t('detail.messages.addEntitiesSuccess', { count: entitiesToAdd.length }));

        // 关闭Modal并重置选择
        setSelectEntityModalVisible(false);
        setSelectedEntityIds([]);
        
        // 重新加载可用实体列表（因为这些实体现在已经在图中了）
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
    setSelectEntityModalVisible(false);
    setSelectedEntityIds([]);
  };

  // 取消添加实体
  const cancelAddEntities = () => {
    setSelectEntityModalVisible(false);
    setSelectedEntityIds([]);
    // 重置分页状态
    setEntitiesPagination(prev => ({ ...prev, current: 1 }));
    setAvailableEntities([]);
  };

  // 处理实体选择变化
  const handleEntitySelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedEntityIds(selectedRowKeys as string[]);
  };

  // 全选实体
  const selectAllEntities = () => {
    const allIds = availableEntities.map(entity => entity.id);
    setSelectedEntityIds(allIds);
  };

  // 取消全选
  const clearAllSelection = () => {
    setSelectedEntityIds([]);
  // 处理分页变化
  const handleEntitiesPaginationChange = async (page: number, pageSize?: number) => {
    console.log(`📄 分页变化: 页码 ${page}, 每页 ${pageSize || entitiesPagination.pageSize}`);
    const newPageSize = pageSize || entitiesPagination.pageSize;

    // 清空当前选择（因为切换页面后，之前选择的实体不在当前页）
    setSelectedEntityIds([]);

    // 获取新页面的数据
    await fetchAvailableEntities(page, newPageSize);
  };

  if (loading) {
    return (
      <div className="entity-topology-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!topologyData) {
    return (
      <div className="entity-topology-detail-empty">
        <Empty description={t('detail.empty.title')} />
      </div>
    );
  }

  return (
    <div className="entity-topology-detail">
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <Breadcrumb
          items={[
            {
              href: '/dashboard',
              title: (
                <Space>
                  <HomeOutlined />
                  <span>{t('detail.breadcrumb.home')}</span>
                </Space>
              )
            },
            {
              href: '/test-tools',
              title: (
                <Space>
                  <ToolOutlined />
                  <span>{t('detail.breadcrumb.testTools')}</span>
                </Space>
              )
            },
            {
              href: '/test-tools/entity-topology',
              title: (
                <Space>
                  <NodeIndexOutlined />
                  <span>{t('detail.breadcrumb.entityTopology')}</span>
                </Space>
              )
            },
            {
              title: topologyData.name
            }
          ]}
        />
      </div>

      {/* 顶部基础信息区域 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          marginBottom: '16px'
        }}
      >
        <TopologyHeader topologyData={topologyData} onRefresh={handleRefresh} />
      </div>

      {/* 底部主要内容区域 - 80%高度 */}
      <div className="topology-content">
        {/* 左侧面板 */}
        <DataTabs
          entities={topologyData.entities}
          dependencies={topologyData.dependencies}
          onDeleteEntity={handleDeleteEntity}
          onDeleteDependency={handleDeleteDependency}
          onAddEntity={handleAddEntity}
          onAddDependency={handleAddDependency}
          onAgentsClick={handleAgentsClick}
        />

        {/* 右侧D3拓扑图 */}
        <div className="content-right">
          <EntityD3RelationshipGraph
            entities={topologyData.entities}
            dependencies={topologyData.dependencies}
            onNodeSelect={node => {
              if (node) {
                // 将D3图的节点转换为Entity格式
                const entity = topologyData.entities.find(e => e.id === node.id);
                setSelectedEntity(entity || null);
              } else {
                setSelectedEntity(null);
              }
            }}
          />
        </div>
      </div>

      {/* 删除确认Modal */}
      <Modal
        title={t('detail.modals.deleteEntity.title')}
        open={deleteModalVisible}
        onOk={confirmDeleteEntity}
        onCancel={cancelDeleteEntity}
        okText={t('detail.modals.deleteEntity.confirmText')}
        cancelText={t('detail.modals.deleteEntity.cancelText')}
        okType="danger"
        width={400}
      >
        {entityToDelete && topologyData && (
          <div>
            <p>{t('detail.modals.deleteEntity.content', { entityName: entityToDelete.name })}</p>
            {(() => {
              const relatedDependencies = topologyData.dependencies.filter(
                dep => dep.source === entityToDelete.id || dep.target === entityToDelete.id
              );
              return (
                relatedDependencies.length > 0 && (
                  <DangerText>
                    {t('detail.modals.deleteEntity.warningWithDependencies', { count: relatedDependencies.length })}
                  </DangerText>
                )
              );
            })()}
            <WarningText>{t('detail.modals.deleteEntity.warning')}</WarningText>
          </div>
        )}
      </Modal>

      {/* 删除依赖关系确认Modal */}
      <Modal
        title={t('detail.modals.deleteDependency.title')}
        open={deleteDependencyModalVisible}
        onOk={confirmDeleteDependency}
        onCancel={cancelDeleteDependency}
        okText={t('detail.modals.deleteDependency.confirmText')}
        cancelText={t('detail.modals.deleteDependency.cancelText')}
        okType="danger"
        width={400}
      >
        {dependencyToDelete && topologyData && (
          <div>
            {(() => {
              const sourceEntity = topologyData.entities.find(e => e.id === dependencyToDelete.source);
              const targetEntity = topologyData.entities.find(e => e.id === dependencyToDelete.target);
              const sourceName = sourceEntity ? sourceEntity.name : dependencyToDelete.source;
              const targetName = targetEntity ? targetEntity.name : dependencyToDelete.target;

              return (
                <>
                  <p>{t('detail.modals.deleteDependency.content')}</p>
                  <RelationshipDisplay>
                    <span className="entity-name">{sourceName}</span>
                    <span className="arrow">→</span>
                    <span className="entity-name">{targetName}</span>
                  </RelationshipDisplay>
                  <RelationshipMeta>
                    {t('detail.modals.deleteDependency.relationshipType')}:{' '}
                    {dependencyToDelete.description || dependencyToDelete.type}
                  </RelationshipMeta>
                  <WarningText>{t('detail.modals.deleteDependency.warning')}</WarningText>
                </>
              );
            })()}
          </div>
        )}
      </Modal>

      {/* 选择实体Modal */}
      <Modal
        title={t('detail.modals.selectEntity.title')}
        open={selectEntityModalVisible}
        onOk={confirmAddEntities}
        onCancel={cancelAddEntities}
        okText={t('detail.modals.selectEntity.confirmText', { count: selectedEntityIds.length })}
        cancelText={t('detail.modals.selectEntity.cancelText')}
        width={800}
        okButtonProps={{ disabled: entitiesLoading || selectedEntityIds.length === 0 }}
      >
        <SelectionHint>
          <p>
            {entitiesLoading ? '正在从服务器获取实体列表，请稍候...' : t('detail.modals.selectEntity.description')}
            {!entitiesLoading && entitiesPagination.total > 0 && (
              <>
                {' '}
                {t('detail.modals.selectEntity.stats', {
                  total: entitiesPagination.total,
                  selected: selectedEntityIds.length
                })}
                {` (第 ${entitiesPagination.current} 页，共 ${Math.ceil(entitiesPagination.total / entitiesPagination.pageSize)} 页)`}
              </>
            )}
          </p>
        </SelectionHint>
        {!entitiesLoading && availableEntities.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                size="small"
                onClick={selectAllEntities}
                disabled={selectedEntityIds.length === availableEntities.length}
              >
                {t('detail.modals.selectEntity.selectAll')}
              </Button>
              <Button size="small" onClick={clearAllSelection} disabled={selectedEntityIds.length === 0}>
                {t('detail.modals.selectEntity.clearAll')}
              </Button>
            </Space>
          </div>
        )}
        {entitiesLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <p style={{ marginTop: '16px', color: '#666' }}>正在加载实体列表...</p>
          </div>
        ) : availableEntities.length === 0 ? (
          <Empty description={t('detail.modals.selectEntity.noEntities')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedEntityIds,
              onChange: handleEntitySelectionChange
            }}
            columns={[
              {
                title: t('detail.modals.selectEntity.columns.name'),
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                render: (name: string) => <strong>{name}</strong>
              },
              {
                title: t('detail.modals.selectEntity.columns.type'),
                dataIndex: 'type',
                key: 'type',
                width: '25%',
                render: (type: string) => <Tag color="blue">{type.replace(/_/g, ' ')}</Tag>
              },
              {
                title: t('detail.modals.selectEntity.columns.status'),
                dataIndex: 'status',
                key: 'status',
                width: '15%',
                render: (status: string) => {
                  const statusConfig = {
                    active: { color: 'green', text: t('status.active') },
                    warning: { color: 'orange', text: t('status.warning') },
                    error: { color: 'red', text: t('status.error') },
                    inactive: { color: 'gray', text: t('status.inactive') }
                  };
                  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
                  return <Tag color={config.color}>{config.text}</Tag>;
                }
              },
              {
                title: t('detail.modals.selectEntity.columns.description'),
                dataIndex: ['properties', 'description'],
                key: 'description',
                width: '30%',
                render: (description: string) => (
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {description || t('detail.modals.selectEntity.columns.noDescription')}
                  </span>
                )
              }
            ]}
            dataSource={availableEntities}
            rowKey="id"
            size="small"
            pagination={{
              current: entitiesPagination.current,
              pageSize: entitiesPagination.pageSize,
              total: entitiesPagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                t('detail.modals.selectEntity.pagination.total', {
                  start: range[0],
                  end: range[1],
                  total
                }),
              onChange: handleEntitiesPaginationChange,
              onShowSizeChange: handleEntitiesPaginationChange,
              pageSizeOptions: ['10', '20', '50', '100'],
              disabled: entitiesLoading
            }}
          />
        )}
      </Modal>

      {/* 添加依赖关系Modal */}
      <Modal
        title={t('detail.modals.addDependency.title')}
        open={addDependencyModalVisible}
        onOk={confirmAddDependency}
        onCancel={cancelAddDependency}
        okText={t('detail.modals.addDependency.confirmText')}
        cancelText={t('detail.modals.addDependency.cancelText')}
        width={600}
        okButtonProps={{
          disabled:
            !sourceEntityId ||
            !targetEntityId ||
            sourceEntityId === targetEntityId ||
            topologyData?.dependencies.find(
              dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === relationshipType
            ) !== undefined
        }}
      >
        <SelectionHint>
          <p>{t('detail.modals.addDependency.description', { count: topologyData?.entities.length || 0 })}</p>
        </SelectionHint>

        <RelationshipForm>
          <div className="form-item">
            <label className="form-label">{t('detail.modals.addDependency.sourceEntity')}</label>
            <Select
              className="entity-select"
              placeholder={t('detail.modals.addDependency.placeholders.sourceEntity')}
              value={sourceEntityId || undefined}
              onChange={setSourceEntityId}
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={
                topologyData?.entities.map(entity => ({
                  value: entity.id,
                  label: entity.name,
                  disabled: entity.id === targetEntityId
                })) || []
              }
            />
          </div>

          <div style={{ textAlign: 'center', margin: '12px 0' }}>
            <Button
              type="text"
              icon={<SwapOutlined />}
              onClick={swapSourceAndTarget}
              disabled={!sourceEntityId && !targetEntityId}
              title={t('detail.modals.addDependency.swapTooltip')}
            >
              {t('detail.modals.addDependency.swap')}
            </Button>
          </div>

          <div className="form-item">
            <label className="form-label">{t('detail.modals.addDependency.targetEntity')}</label>
            <Select
              className="entity-select"
              placeholder={t('detail.modals.addDependency.placeholders.targetEntity')}
              value={targetEntityId || undefined}
              onChange={setTargetEntityId}
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={
                topologyData?.entities.map(entity => ({
                  value: entity.id,
                  label: entity.name,
                  disabled: entity.id === sourceEntityId
                })) || []
              }
            />
          </div>

          <div className="form-item">
            <label className="form-label">{t('detail.modals.addDependency.relationshipType')}</label>
            <Radio.Group
              value={relationshipType}
              onChange={e => setRelationshipType(e.target.value)}
              style={{ width: '100%' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <Radio value="depends_on">{t('detail.modals.addDependency.relationshipTypes.depends_on')}</Radio>
                <Radio value="connects_to">{t('detail.modals.addDependency.relationshipTypes.connects_to')}</Radio>
                <Radio value="uses">{t('detail.modals.addDependency.relationshipTypes.uses')}</Radio>
                <Radio value="routes_to">{t('detail.modals.addDependency.relationshipTypes.routes_to')}</Radio>
                <Radio value="stores_in">{t('detail.modals.addDependency.relationshipTypes.stores_in')}</Radio>
                <Radio value="reads_from">{t('detail.modals.addDependency.relationshipTypes.reads_from')}</Radio>
                <Radio value="writes_to">{t('detail.modals.addDependency.relationshipTypes.writes_to')}</Radio>
                <Radio value="monitors">{t('detail.modals.addDependency.relationshipTypes.monitors')}</Radio>
                <Radio value="backs_up">{t('detail.modals.addDependency.relationshipTypes.backs_up')}</Radio>
              </div>
            </Radio.Group>
          </div>

          {sourceEntityId && targetEntityId && (
            <>
              {(() => {
                // 检查是否已存在相同的依赖关系
                const existingDependency = topologyData?.dependencies.find(
                  dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === relationshipType
                );

                if (existingDependency) {
                  return (
                    <div
                      style={{
                        background: 'var(--error-color)',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '6px',
                        margin: '16px 0',
                        textAlign: 'center'
                      }}
                    >
                      ⚠️ {t('detail.modals.addDependency.existsWarning')}
                    </div>
                  );
                }

                return (
                  <div className="relationship-preview">
                    <div className="preview-content">
                      <span className="entity-name">
                        {topologyData?.entities.find(e => e.id === sourceEntityId)?.name}
                      </span>
                      <span className="arrow">→</span>
                      <span className="entity-name">
                        {topologyData?.entities.find(e => e.id === targetEntityId)?.name}
                      </span>
                    </div>
                    <div className="relationship-type">
                      {t('detail.modals.deleteDependency.relationshipType')}:{' '}
                      {getRelationshipDescription(relationshipType)}
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </RelationshipForm>
      </Modal>

      {/* 选择Agent Modal */}
      <Modal
        title={t('detail.modals.bindAgent.title')}
        open={selectAgentModalVisible}
        onOk={confirmBindAgents}
        onCancel={cancelBindAgents}
        okText={t('detail.modals.bindAgent.confirmText', { count: selectedAgentIds.length })}
        cancelText={t('detail.modals.bindAgent.cancelText')}
        width={900}
        okButtonProps={{ disabled: selectedAgentIds.length === 0 }}
      >
        <AgentBindingHint>
          <p>{t('detail.modals.bindAgent.description')}</p>
          {currentEntity && (
            <div className="entity-info">
              <span className="entity-name">{currentEntity.name}</span>
              <span className="entity-type">({currentEntity.type})</span>
            </div>
          )}
          <p style={{ marginTop: 8 }}>
            {t('detail.modals.bindAgent.stats', {
              total: availableAgents.length,
              selected: selectedAgentIds.length
            })}
          </p>
        </AgentBindingHint>

        {availableAgents.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                size="small"
                onClick={() => setSelectedAgentIds(availableAgents.map(agent => agent.id))}
                disabled={selectedAgentIds.length === availableAgents.length}
              >
                {t('detail.modals.bindAgent.selectAll')}
              </Button>
              <Button size="small" onClick={() => setSelectedAgentIds([])} disabled={selectedAgentIds.length === 0}>
                {t('detail.modals.bindAgent.clearAll')}
              </Button>
            </Space>
          </div>
        )}

        {availableAgents.length === 0 ? (
          <Empty description={t('detail.modals.bindAgent.noAgents')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedAgentIds,
              onChange: handleAgentSelectionChange
            }}
            columns={[
              {
                title: t('detail.modals.bindAgent.columns.name'),
                dataIndex: 'name',
                key: 'name',
                width: '25%',
                render: (name: string) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RobotOutlined style={{ color: 'var(--primary-color)' }} />
                    <strong>{name}</strong>
                  </div>
                )
              },
              {
                title: t('detail.modals.bindAgent.columns.type'),
                dataIndex: 'type',
                key: 'type',
                width: '15%',
                render: (type: string) => <Tag color="cyan">{type}</Tag>
              },
              {
                title: t('detail.modals.bindAgent.columns.status'),
                dataIndex: 'status',
                key: 'status',
                width: '12%',
                render: (status: string) => {
                  const statusConfig = {
                    active: { color: 'green', text: t('detail.modals.bindAgent.statusLabels.active') },
                    warning: { color: 'orange', text: t('detail.modals.bindAgent.statusLabels.warning') },
                    error: { color: 'red', text: t('detail.modals.bindAgent.statusLabels.error') },
                    inactive: { color: 'gray', text: t('detail.modals.bindAgent.statusLabels.inactive') }
                  };
                  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
                  return <Tag color={config.color}>{config.text}</Tag>;
                }
              },
              {
                title: t('detail.modals.bindAgent.columns.capabilities'),
                dataIndex: 'capabilities',
                key: 'capabilities',
                width: '25%',
                render: (capabilities: string[]) => (
                  <div>
                    {capabilities.slice(0, 2).map((capability, index) => (
                      <Tag key={index} size="small" style={{ marginBottom: 2 }}>
                        {capability}
                      </Tag>
                    ))}
                    {capabilities.length > 2 && (
                      <Tag size="small" color="default">
                        +{capabilities.length - 2}
                      </Tag>
                    )}
                  </div>
                )
              },
              {
                title: t('detail.modals.bindAgent.columns.description'),
                dataIndex: 'description',
                key: 'description',
                width: '23%',
                render: (description: string) => (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{description}</span>
                )
              }
            ]}
            dataSource={availableAgents}
            rowKey="id"
            size="small"
            pagination={{
              pageSize: 6,
              showSizeChanger: false,
              showQuickJumper: true,
              showTotal: (total, range) =>
                t('detail.modals.bindAgent.pagination.total', {
                  start: range[0],
                  end: range[1],
                  total
                })
            }}
          />
        )}
      </Modal>

      {/* 保存图对话框 */}
      <Modal
        title={currentGraph ? t('entityTopology:graph.updateGraph') : t('entityTopology:graph.saveGraph')}
        open={saveGraphModalVisible}
        onCancel={() => {
          setSaveGraphModalVisible(false);
          graphForm.resetFields();
        }}
        onOk={() => graphForm.submit()}
        confirmLoading={graphLoading}
        width={600}
      >
        <Form form={graphForm} layout="vertical" onFinish={handleSaveGraph}>
          <Form.Item
            name="name"
            label={t('entityTopology:graph.name')}
            rules={[{ required: true, message: t('entityTopology:graph.nameRequired') }]}
          >
            <Input placeholder={t('entityTopology:graph.namePlaceholder')} />
          </Form.Item>

          <Form.Item name="description" label={t('entityTopology:graph.description')}>
            <Input.TextArea rows={3} placeholder={t('entityTopology:graph.descriptionPlaceholder')} />
          </Form.Item>

          <Form.Item name="labels" label={t('entityTopology:graph.labels')}>
            <Select mode="tags" placeholder={t('entityTopology:graph.labelsPlaceholder')} tokenSeparators={[',']} />
          </Form.Item>

          <Form.Item name="status" label={t('entityTopology:graph.status')} initialValue={GraphStatus.ACTIVE}>
            <Select>
              <Select.Option value={GraphStatus.ACTIVE}>{t('entityTopology:graph.statusActive')}</Select.Option>
              <Select.Option value={GraphStatus.INACTIVE}>{t('entityTopology:graph.statusInactive')}</Select.Option>
              <Select.Option value={GraphStatus.ARCHIVED}>{t('entityTopology:graph.statusArchived')}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 加载图对话框 */}
      <Modal
        title={t('entityTopology:graph.loadGraph')}
        open={loadGraphModalVisible}
        onCancel={() => setLoadGraphModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={availableGraphs}
          loading={graphLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} ${t('entityTopology:graph.items')}`
          }}
          columns={[
            {
              title: t('entityTopology:graph.name'),
              dataIndex: 'name',
              key: 'name',
              render: (text: string, record: Graph) => (
                <div>
                  <div style={{ fontWeight: 'bold' }}>{text}</div>
                  {record.description && <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>}
                </div>
              )
            },
            {
              title: t('entityTopology:graph.status'),
              dataIndex: 'status',
              key: 'status',
              width: 100,
              render: (status: GraphStatus) => {
                const statusConfig = {
                  [GraphStatus.ACTIVE]: { color: 'green', text: t('entityTopology:graph.statusActive') },
                  [GraphStatus.INACTIVE]: { color: 'orange', text: t('entityTopology:graph.statusInactive') },
                  [GraphStatus.ARCHIVED]: { color: 'gray', text: t('entityTopology:graph.statusArchived') },
                  [GraphStatus.PROCESSING]: { color: 'blue', text: t('entityTopology:graph.statusProcessing') }
                };
                const config = statusConfig[status] || statusConfig[GraphStatus.ACTIVE];
                return <Tag color={config.color}>{config.text}</Tag>;
              }
            },
            {
              title: t('entityTopology:graph.entityCount'),
              dataIndex: 'entityCount',
              key: 'entityCount',
              width: 100,
              render: (count: number) => count || 0
            },
            {
              title: t('entityTopology:graph.relationCount'),
              dataIndex: 'relationCount',
              key: 'relationCount',
              width: 100,
              render: (count: number) => count || 0
            },
            {
              title: t('entityTopology:graph.createdAt'),
              dataIndex: 'createdAt',
              key: 'createdAt',
              width: 150,
              render: (date: string) => (date ? new Date(date).toLocaleDateString() : '-')
            },
            {
              title: t('common:actions'),
              key: 'actions',
              width: 150,
              render: (_, record: Graph) => (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleLoadGraph(record.id!)}
                    disabled={currentGraph?.id === record.id}
                  >
                    {t('entityTopology:graph.load')}
                  </Button>
                  <Button
                    danger
                    size="small"
                    onClick={() => {
                      Modal.confirm({
                        title: t('entityTopology:graph.confirmDelete'),
                        content: t('entityTopology:graph.confirmDeleteContent', { name: record.name }),
                        onOk: () => handleDeleteGraph(record.id!)
                      });
                    }}
                  >
                    {t('common:delete')}
                  </Button>
                </Space>
              )
            }
          ]}
        />
      </Modal>
    </div>
  );
};

export default EntityTopologyDetail;
