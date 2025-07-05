import React from 'react';
import { Modal, Table, Tag, Button, Space, Empty, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  connections: number;
}

interface SelectEntityModalProps {
  visible: boolean;
  entities: Entity[];
  selectedEntityIds: string[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onConfirm: () => void;
  onCancel: () => void;
  onSelectionChange: (selectedIds: string[]) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onPaginationChange: (page: number, pageSize?: number) => void;
}

const SelectEntityModal: React.FC<SelectEntityModalProps> = ({
  visible,
  entities,
  selectedEntityIds,
  loading,
  pagination,
  onConfirm,
  onCancel,
  onSelectionChange,
  onSelectAll,
  onClearAll,
  onPaginationChange
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  const columns = [
    {
      title: t('detail.modals.selectEntity.columns.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Entity) => (
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>ID: {record.id}</div>
        </div>
      )
    },
    {
      title: t('detail.modals.selectEntity.columns.type'),
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: t('detail.modals.selectEntity.columns.status'),
      dataIndex: 'status',
      key: 'status',
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
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <span style={{ color: '#666' }}>
          {description || t('detail.modals.selectEntity.columns.noDescription')}
        </span>
      )
    }
  ];

  return (
    <Modal
      title={t('detail.modals.selectEntity.title')}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('detail.modals.selectEntity.confirmText', { count: selectedEntityIds.length })}
      cancelText={t('detail.modals.selectEntity.cancelText')}
      width={800}
      okButtonProps={{ disabled: loading || selectedEntityIds.length === 0 }}
    >
      <div>
        <p style={{ marginBottom: 16, color: '#666' }}>
          {loading ? '正在从服务器获取实体列表，请稍候...' : t('detail.modals.selectEntity.description')}
        </p>

        <div style={{ marginBottom: 16, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 6 }}>
          <span>
            {t('detail.modals.selectEntity.stats', {
              total: pagination.total,
              selected: selectedEntityIds.length
            })}
          </span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button
              size="small"
              onClick={onSelectAll}
              disabled={selectedEntityIds.length === entities.length}
            >
              {t('detail.modals.selectEntity.selectAll')}
            </Button>
            <Button size="small" onClick={onClearAll} disabled={selectedEntityIds.length === 0}>
              {t('detail.modals.selectEntity.clearAll')}
            </Button>
          </Space>
        </div>

        {entities.length === 0 && !loading ? (
          <Empty description={t('detail.modals.selectEntity.noEntities')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table
            columns={columns}
            dataSource={entities}
            rowKey="id"
            loading={loading}
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedEntityIds,
              onChange: (selectedRowKeys) => onSelectionChange(selectedRowKeys as string[])
            }}
            scroll={{ y: 300 }}
          />
        )}

        {pagination.total > 0 && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={onPaginationChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                t('detail.modals.selectEntity.pagination.total', {
                  start: range[0],
                  end: range[1],
                  total
                })
              }
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SelectEntityModal;
