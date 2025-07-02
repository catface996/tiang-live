import React from 'react';
import { Tabs, Table, Button, Space, Typography } from 'antd';
import { DatabaseOutlined, LinkOutlined, NodeIndexOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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
  // 实体列表列定义
  const entityColumns = [
    {
      title: '名称',
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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      render: (type: string) => <span>{type}</span>
    },
    {
      title: '操作',
      key: 'actions',
      width: '20%',
      render: (_, record: Entity) => (
        <Space size={2}>
          <Button
            type="text"
            size="small"
            icon={<DatabaseOutlined />}
            onClick={() => onAgentsClick(record)}
            title="查看Agents"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDeleteEntity(record)}
            title="删除实体"
          />
        </Space>
      )
    }
  ];

  // 依赖关系列定义
  const dependencyColumns = [
    {
      title: '源实体',
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
      title: '目标实体',
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
      title: '操作',
      key: 'actions',
      width: '20%',
      render: (_, record: Dependency) => (
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDeleteDependency(record)}
          title="删除依赖关系"
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
                实体清单 ({entities.length})
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddEntity}>
                    选择实体
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
                依赖关系 ({dependencies.length})
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onAddDependency}>
                    添加关系
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
