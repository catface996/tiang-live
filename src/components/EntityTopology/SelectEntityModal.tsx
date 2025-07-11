import React, { useState } from 'react';
import { Modal, Table, Tag, Button, Space, Empty, Pagination, Card, Row, Col, Typography, Checkbox, Switch } from 'antd';
import { DatabaseOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// 导入统一的类型定义
import type { Entity, SelectEntityModalProps } from '../../types/entityTopology';

const { Text, Paragraph } = Typography;

// 实体卡片样式
const EntityCard = styled(Card)`
  height: 100%;
  min-height: 200px;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &.selected {
    border: 2px solid #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    padding: 16px 20px;
    min-height: 64px;
  }

  .ant-card-body {
    padding: 20px;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }

  .ant-card-head-title {
    font-weight: 600;
    font-size: 16px;
  }

  .entity-checkbox {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    min-height: 160px;
    
    .ant-card-head {
      padding: 12px 16px;
      min-height: 56px;
    }
    
    .ant-card-body {
      padding: 16px;
      height: calc(100% - 56px);
    }
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

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
  onPaginationChange,
  getEntityTypeLabel
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // 处理实体选择
  const handleEntitySelect = (entityId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedEntityIds, entityId]);
    } else {
      onSelectionChange(selectedEntityIds.filter(id => id !== entityId));
    }
  };

  // 渲染实体卡片
  const renderEntityCards = () => {
    if (!entities || entities.length === 0) {
      return (
        <Empty 
          description="暂无可选实体" 
          style={{ margin: '60px 0' }} 
        />
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {entities.map(entity => {
          const isSelected = selectedEntityIds.includes(entity.id);
          const typeLabel = getEntityTypeLabel ? getEntityTypeLabel(entity.type) : entity.type;
          
          return (
            <Col xs={24} sm={24} lg={12} xl={8} key={entity.id}>
              <EntityCard 
                className={isSelected ? 'selected' : ''}
                onClick={() => handleEntitySelect(entity.id, !isSelected)}
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DatabaseOutlined />
                    <span>{entity.name}</span>
                  </div>
                }
                extra={
                  <Checkbox 
                    className="entity-checkbox"
                    checked={isSelected}
                    onChange={(e) => handleEntitySelect(entity.id, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text type="secondary">类型：</Text>
                    <Tag color="blue">{typeLabel}</Tag>
                  </div>
                  
                  <div>
                    <Text type="secondary">状态：</Text>
                    <Tag color={getStatusColor(entity.status)}>
                      {getStatusText(entity.status)}
                    </Tag>
                  </div>
                  
                  {entity.description && (
                    <div>
                      <Text type="secondary">描述：</Text>
                      <Paragraph 
                        ellipsis={{ rows: 2, tooltip: entity.description }}
                        style={{ margin: 0, marginTop: 4 }}
                      >
                        {entity.description}
                      </Paragraph>
                    </div>
                  )}
                </Space>
              </EntityCard>
            </Col>
          );
        })}
      </Row>
    );
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    const statusConfig = {
      active: 'green',
      warning: 'orange',
      error: 'red',
      inactive: 'default'
    };
    return statusConfig[status as keyof typeof statusConfig] || 'default';
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    const statusConfig = {
      active: t('status.active'),
      warning: t('status.warning'),
      error: t('status.error'),
      inactive: t('status.inactive')
    };
    return statusConfig[status as keyof typeof statusConfig] || status;
  };

  const columns = [
    {
      title: t('detail.modals.selectEntity.columns.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div style={{ fontWeight: 500 }}>{name}</div>
      )
    },
    {
      title: t('detail.modals.selectEntity.columns.type'),
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeLabel = getEntityTypeLabel ? getEntityTypeLabel(type) : type;
        return <Tag color="blue">{typeLabel}</Tag>;
      }
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
          <Empty description="暂无可用实体" image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SelectEntityModal;
