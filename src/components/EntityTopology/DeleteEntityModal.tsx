import React from 'react';
import { Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { Text } = Typography;

const WarningText = styled(Text)`
  color: var(--color-warning);
  font-weight: 500;
`;

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
  type: string;
  description: string;
  strength: number;
}

interface DeleteEntityModalProps {
  visible: boolean;
  entity: Entity | null;
  dependencies: Dependency[];
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const DeleteEntityModal: React.FC<DeleteEntityModalProps> = ({
  visible,
  entity,
  dependencies,
  onConfirm,
  onCancel,
  loading = false
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  if (!entity) return null;

  // 获取与该实体相关的依赖关系
  const relatedDependencies = dependencies.filter(
    dep => dep.source === entity.id || dep.target === entity.id
  );

  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
          {t('detail.modals.deleteEntity.title')}
        </span>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('detail.modals.deleteEntity.confirmText')}
      cancelText={t('detail.modals.deleteEntity.cancelText')}
      okButtonProps={{ danger: true, loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <div>
        <p>{t('detail.modals.deleteEntity.content', { entityName: entity.name })}</p>
        
        {relatedDependencies.length > 0 && (
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fff7e6', borderRadius: 6 }}>
            <Text type="warning">
              <ExclamationCircleOutlined style={{ marginRight: 4 }} />
              {t('detail.modals.deleteEntity.warningWithDependencies', { count: relatedDependencies.length })}
            </Text>
          </div>
        )}
        
        <WarningText>{t('detail.modals.deleteEntity.warning')}</WarningText>
      </div>
    </Modal>
  );
};

export default DeleteEntityModal;
