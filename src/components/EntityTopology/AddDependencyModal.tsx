import React from 'react';
import { Modal, Select, Radio, Button, Space } from 'antd';
import { SwapOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// 导入统一的类型定义
import type { Entity, Dependency, AddDependencyModalProps } from '../../types/entityTopology';

const { Option } = Select;

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

  .relationship-arrow {
    margin: 8px 0;
    font-size: 16px;
    color: var(--color-primary);
  }
`;

const AddDependencyModal: React.FC<AddDependencyModalProps> = ({
  visible,
  entities,
  dependencies,
  sourceEntityId,
  targetEntityId,
  relationshipType,
  onConfirm,
  onCancel,
  onSourceChange,
  onTargetChange,
  onRelationshipTypeChange,
  onSwapEntities,
  loading = false
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  // 检查是否已存在相同的依赖关系
  const existingDependency = dependencies.find(
    dep => dep.source === sourceEntityId && dep.target === targetEntityId && dep.type === relationshipType
  );

  const sourceEntity = entities.find(e => e.id === sourceEntityId);
  const targetEntity = entities.find(e => e.id === targetEntityId);

  const canConfirm = sourceEntityId && targetEntityId && sourceEntityId !== targetEntityId && !existingDependency;

  return (
    <Modal
      title={t('detail.modals.addDependency.title')}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('detail.modals.addDependency.confirmText')}
      cancelText={t('detail.modals.addDependency.cancelText')}
      okButtonProps={{ disabled: !canConfirm, loading }}
      cancelButtonProps={{ disabled: loading }}
      width={600}
    >
      <div>
        <p>{t('detail.modals.addDependency.description', { count: entities.length })}</p>

        <div style={{ marginBottom: 16 }}>
          <label className="form-label">{t('detail.modals.addDependency.sourceEntity')}</label>
          <Select
            style={{ width: '100%' }}
            placeholder={t('detail.modals.addDependency.placeholders.sourceEntity')}
            value={sourceEntityId || undefined}
            onChange={onSourceChange}
            showSearch
            filterOption={(input, option) =>
              (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {entities.map(entity => (
              <Option key={entity.id} value={entity.id}>
                {entity.name} ({entity.type})
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <Button
            type="dashed"
            icon={<SwapOutlined />}
            onClick={onSwapEntities}
            disabled={!sourceEntityId || !targetEntityId}
            title={t('detail.modals.addDependency.swapTooltip')}
          >
            {t('detail.modals.addDependency.swap')}
          </Button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="form-label">{t('detail.modals.addDependency.targetEntity')}</label>
          <Select
            style={{ width: '100%' }}
            placeholder={t('detail.modals.addDependency.placeholders.targetEntity')}
            value={targetEntityId || undefined}
            onChange={onTargetChange}
            showSearch
            filterOption={(input, option) =>
              (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {entities.map(entity => (
              <Option key={entity.id} value={entity.id} disabled={entity.id === sourceEntityId}>
                {entity.name} ({entity.type})
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="form-label">{t('detail.modals.addDependency.relationshipType')}</label>
          <Radio.Group
            value={relationshipType}
            onChange={(e) => onRelationshipTypeChange(e.target.value)}
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

        {/* 关系预览 */}
        {sourceEntity && targetEntity && (
          <RelationshipDisplay>
            <div className="entity-name">{sourceEntity.name}</div>
            <div className="relationship-arrow">↓ {relationshipType} ↓</div>
            <div className="entity-name">{targetEntity.name}</div>
          </RelationshipDisplay>
        )}

        {/* 警告信息 */}
        {existingDependency && (
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fff2f0', borderRadius: 6 }}>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            <span style={{ color: '#ff4d4f' }}>
              ⚠️ {t('detail.modals.addDependency.existsWarning')}
            </span>
          </div>
        )}

        {sourceEntityId === targetEntityId && sourceEntityId && (
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fff2f0', borderRadius: 6 }}>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            <span style={{ color: '#ff4d4f' }}>
              ⚠️ 源实体和目标实体不能相同
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddDependencyModal;
