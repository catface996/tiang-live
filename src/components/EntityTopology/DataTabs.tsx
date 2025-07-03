import React from 'react';
import { Tabs, Table, Button, Space, Typography } from 'antd';
import { DatabaseOutlined, LinkOutlined, NodeIndexOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  properties: Record<string, any>;
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

interface DataTabsProps {
  entities: Entity[];
  dependencies: Dependency[];
  onDeleteEntity: (entity: Entity) => void;
  onDeleteDependency: (dependency: Dependency) => void;
  onAddEntity: () => void;
  onAddDependency: () => void;
  onAgentsClick: (entity: Entity) => void;
}

const DataTabs: React.FC<DataTabsProps> = ({
  entities,
  dependencies,
  onDeleteEntity,
  onDeleteDependency,
  onAddEntity,
  onAddDependency,
  onAgentsClick
}) => {
  const { t, i18n } = useTranslation(['entityTopology', 'common']);

  // 调试信息
  console.log('DataTabs - i18n ready:', i18n.isInitialized);
  console.log('DataTabs - current language:', i18n.language);
  console.log('DataTabs - available namespaces:', Object.keys(i18n.store.data[i18n.language] || {}));
  console.log('DataTabs - test translation:', t('dataTabs.entityColumns.name'));

  // 实体列表列定义
  const entityColumns = [
    {
      title: t('dataTabs.entityColumns.name'),
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
      title: t('dataTabs.entityColumns.type'),
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      render: (type: string) => <span>{type}</span>
    },
    {
      title: t('dataTabs.entityColumns.actions'),
      key: 'actions',
      width: '20%',
      render: (_, record: Entity) => (
        <Space size={2}>
          <Button
            type="text"
            size="small"
            icon={<DatabaseOutlined />}
            onClick={() => onAgentsClick(record)}
            title={t('dataTabs.entityActions.viewAgents')}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDeleteEntity(record)}
            title={t('dataTabs.entityActions.deleteEntity')}
          />
        </Space>
      )
    }
  ];

  // 依赖关系列定义
  const dependencyColumns = [
    {
      title: t('dataTabs.dependencyColumns.source'),
      dataIndex: 'source',
      key: 'source',
      width: '40%',
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
      title: t('dataTabs.dependencyColumns.target'),
      dataIndex: 'target',
      key: 'target',
      width: '40%',
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
      title: t('dataTabs.dependencyColumns.actions'),
      key: 'actions',
      width: '20%',
      render: (_, record: Dependency) => (
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDeleteDependency(record)}
          title={t('dataTabs.dependencyActions.deleteDependency')}
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
                {t('dataTabs.tabs.entities', { count: entities.length })}
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddEntity}>
                    {t('dataTabs.actions.selectEntities')}
                  </Button>
                </div>
                <Table
                  columns={entityColumns}
                  dataSource={entities}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  scroll={{ y: 'calc(100vh - 420px)' }}
                />
              </div>
            )
          },
          {
            key: 'dependencies',
            label: (
              <Space>
                <LinkOutlined />
                {t('dataTabs.tabs.dependencies', { count: dependencies.length })}
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddDependency}>
                    {t('dataTabs.actions.addRelationship')}
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
