import React from 'react';
import { Tabs, Table, Button, Space, Typography, Tag } from 'antd';
import { DatabaseOutlined, LinkOutlined, NodeIndexOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// 导入统一的类型定义
import type { Entity, Dependency, DataTabsProps } from '../../types/entityTopology';

const { Text } = Typography;

const DataTabs: React.FC<DataTabsProps> = ({
  entities,
  dependencies,
  onDeleteEntity,
  onDeleteDependency,
  onAddEntity,
  onAddDependency,
  onAgentsClick,
  getEntityTypeLabel,
  entityPagination,
  onEntityPaginationChange
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  // 添加调试信息
  console.log('🔍 DataTabs组件接收到的数据:', {
    entitiesCount: entities?.length || 0,
    dependenciesCount: dependencies?.length || 0,
    sampleDependencies: dependencies?.slice(0, 3),
    entities: entities?.slice(0, 2),
    dependencies: dependencies?.slice(0, 2)
  });

  // 实体列表列定义
  const entityColumns = [
    {
      title: t('detail.dataTabs.entityColumns.name'),
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      render: (text: string, record: Entity) => (
        <Space>
          <NodeIndexOutlined />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: t('detail.dataTabs.entityColumns.type'),
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      render: (type: string) => {
        const typeLabel = getEntityTypeLabel ? getEntityTypeLabel(type) : type;
        return <span>{typeLabel}</span>;
      }
    },
    {
      title: t('detail.dataTabs.entityColumns.actions'),
      key: 'actions',
      width: '20%',
      render: (_, record: Entity) => (
        <Space size={2}>
          <Button
            type="text"
            size="small"
            icon={<DatabaseOutlined />}
            onClick={() => onAgentsClick(record)}
            title={t('detail.dataTabs.entityActions.viewAgents')}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDeleteEntity(record)}
            title={t('detail.dataTabs.entityActions.deleteEntity')}
          />
        </Space>
      )
    }
  ];

  // 依赖关系列定义
  const dependencyColumns = [
    {
      title: t('detail.dataTabs.dependencyColumns.source'),
      dataIndex: 'source',
      key: 'source',
      width: '35%',
      render: (source: string) => {
        const entity = entities.find(e => e.id === source);
        return entity ? (
          <Space>
            <NodeIndexOutlined />
            <Text strong>{entity.name}</Text>
          </Space>
        ) : (
          <Text type="secondary">{source}</Text>
        );
      }
    },
    {
      title: t('detail.dataTabs.dependencyColumns.target'),
      dataIndex: 'target',
      key: 'target',
      width: '35%',
      render: (target: string) => {
        const entity = entities.find(e => e.id === target);
        return entity ? (
          <Space>
            <NodeIndexOutlined />
            <Text strong>{entity.name}</Text>
          </Space>
        ) : (
          <Text type="secondary">{target}</Text>
        );
      }
    },
    {
      title: '关系类型',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      render: (type: string) => {
        const typeColors = {
          'depends_on': 'blue',
          'provides_to': 'green',
          'connects_to': 'orange'
        };
        const typeLabels = {
          'depends_on': '依赖于',
          'provides_to': '提供给',
          'connects_to': '连接到'
        };
        return (
          <Tag color={typeColors[type] || 'default'}>
            {typeLabels[type] || type}
          </Tag>
        );
      }
    },
    {
      title: t('detail.dataTabs.dependencyColumns.actions'),
      key: 'actions',
      width: '10%',
      render: (_, record: Dependency) => (
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDeleteDependency(record)}
          title={t('detail.dataTabs.dependencyActions.deleteDependency')}
        />
      )
    }
  ];

  return (
    <div className="content-left">
      <Tabs
        defaultActiveKey="entities"
        className="data-tabs"
        items={[
          {
            key: 'entities',
            label: (
              <Space>
                <DatabaseOutlined />
                {t('detail.dataTabs.tabs.entities', { count: entities.length })}
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddEntity}>
                    {t('detail.dataTabs.actions.selectEntities')}
                  </Button>
                </div>
                <Table
                  columns={entityColumns}
                  dataSource={entities}
                  rowKey="id"
                  size="small"
                  pagination={entityPagination ? {
                    current: entityPagination.current,
                    pageSize: entityPagination.pageSize,
                    total: entityPagination.total,
                    showSizeChanger: entityPagination.showSizeChanger !== false,
                    showQuickJumper: entityPagination.showQuickJumper !== false,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                    onChange: onEntityPaginationChange,
                    onShowSizeChange: onEntityPaginationChange,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    size: 'small'
                  } : false}
                  scroll={{ y: entityPagination ? 'calc(100vh - 480px)' : 'calc(100vh - 420px)' }}
                />
              </div>
            )
          },
          {
            key: 'dependencies',
            label: (
              <Space>
                <LinkOutlined />
                {t('detail.dataTabs.tabs.dependencies', { count: dependencies.length })}
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddDependency}>
                    {t('detail.dataTabs.actions.addRelationship')}
                  </Button>
                </div>
                <Table
                  columns={dependencyColumns}
                  dataSource={dependencies}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  scroll={{ y: 'calc(100vh - 420px)' }}
                />
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default DataTabs;
