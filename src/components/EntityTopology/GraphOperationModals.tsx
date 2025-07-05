import React from 'react';
import { Modal, Form, Input, Select, Table, Tag, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { GraphStatus, type Graph } from '../../services/graphApi';

interface GraphOperationModalsProps {
  // 保存图相关
  saveModalVisible: boolean;
  onSaveModalCancel: () => void;
  onSaveGraph: (values: any) => void;
  saveForm: any;
  currentGraph: Graph | null;
  saveLoading: boolean;

  // 加载图相关
  loadModalVisible: boolean;
  onLoadModalCancel: () => void;
  availableGraphs: Graph[];
  onLoadGraph: (graphId: number) => void;
  onDeleteGraph: (graphId: number) => void;
  loadLoading: boolean;
}

const GraphOperationModals: React.FC<GraphOperationModalsProps> = ({
  saveModalVisible,
  onSaveModalCancel,
  onSaveGraph,
  saveForm,
  currentGraph,
  saveLoading,
  loadModalVisible,
  onLoadModalCancel,
  availableGraphs,
  onLoadGraph,
  onDeleteGraph,
  loadLoading
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  const graphColumns = [
    {
      title: t('entityTopology:graph.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Graph) => (
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          {record.description && <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>}
        </div>
      )
    },
    {
      title: t('entityTopology:graph.status'),
      dataIndex: 'status',
      key: 'status',
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
      render: (count: number) => count || 0
    },
    {
      title: t('entityTopology:graph.relationCount'),
      dataIndex: 'relationCount',
      key: 'relationCount',
      render: (count: number) => count || 0
    },
    {
      title: t('entityTopology:graph.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (date ? new Date(date).toLocaleDateString() : '-')
    },
    {
      title: t('common:actions'),
      key: 'actions',
      render: (record: Graph) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => onLoadGraph(record.id!)}
            disabled={currentGraph?.id === record.id}
          >
            {t('entityTopology:graph.load')}
          </Button>
          <Popconfirm
            title={t('entityTopology:graph.confirmDelete')}
            description={t('entityTopology:graph.confirmDeleteContent', { name: record.name })}
            onConfirm={() => onDeleteGraph(record.id!)}
            okText={t('common:confirm')}
            cancelText={t('common:cancel')}
          >
            <Button type="link" danger size="small">
              {t('common:delete')}
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <>
      {/* 保存图Modal */}
      <Modal
        title={currentGraph ? t('entityTopology:graph.updateGraph') : t('entityTopology:graph.saveGraph')}
        open={saveModalVisible}
        onCancel={onSaveModalCancel}
        footer={null}
        width={600}
      >
        <Form form={saveForm} layout="vertical" onFinish={onSaveGraph}>
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

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={onSaveModalCancel} style={{ marginRight: 8 }}>
              {t('common:cancel')}
            </Button>
            <Button type="primary" htmlType="submit" loading={saveLoading}>
              {currentGraph ? t('common:update') : t('common:save')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 加载图Modal */}
      <Modal
        title={t('entityTopology:graph.loadGraph')}
        open={loadModalVisible}
        onCancel={onLoadModalCancel}
        footer={null}
        width={1000}
      >
        <Table
          columns={graphColumns}
          dataSource={availableGraphs}
          rowKey="id"
          loading={loadLoading}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} ${t('entityTopology:graph.items')}`
          }}
        />
      </Modal>
    </>
  );
};

export default GraphOperationModals;
