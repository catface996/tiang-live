import React from 'react';
import { Modal, Typography, Space } from 'antd';
import { ExclamationCircleOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// 导入统一的类型定义
import type { Entity, Dependency, DeleteDependencyModalProps } from '../../types/entityTopology';

const { Text } = Typography;

const WarningText = styled(Text)`
  color: var(--color-warning);
  font-weight: 500;
`;

const EntityName = styled(Text)`
  font-weight: 600;
  color: var(--color-primary);
`;

const RelationshipInfo = styled.div`
  background: var(--color-fill-quaternary);
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
`;

const DeleteDependencyModal: React.FC<DeleteDependencyModalProps> = ({
  visible,
  dependency,
  entities,
  onConfirm,
  onCancel,
  loading = false
}) => {
  const { t } = useTranslation(['entityTopology', 'common']);

  if (!dependency) return null;

  // 获取源实体和目标实体信息
  const sourceEntity = entities.find(e => e.id === dependency.source);
  const targetEntity = entities.find(e => e.id === dependency.target);

  const getRelationshipTypeLabel = (type: string) => {
    const typeLabels = {
      'depends_on': '依赖于',
      'provides_to': '提供给',
      'connects_to': '连接到'
    };
    return typeLabels[type] || type;
  };

  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
          确认删除依赖关系
        </span>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="确认删除"
      cancelText="取消"
      okButtonProps={{ danger: true, loading }}
      cancelButtonProps={{ disabled: loading }}
      width={500}
    >
      <div>
        <Text>您确定要删除以下依赖关系吗？</Text>
        
        <RelationshipInfo>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text type="secondary">源实体：</Text>
              <Space>
                <NodeIndexOutlined />
                <EntityName>
                  {sourceEntity?.name || dependency.source}
                </EntityName>
              </Space>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ color: '#1890ff' }}>
                {getRelationshipTypeLabel(dependency.type)}
              </Text>
            </div>
            
            <div>
              <Text type="secondary">目标实体：</Text>
              <Space>
                <NodeIndexOutlined />
                <EntityName>
                  {targetEntity?.name || dependency.target}
                </EntityName>
              </Space>
            </div>
            
            {dependency.description && (
              <div>
                <Text type="secondary">描述：</Text>
                <Text>{dependency.description}</Text>
              </div>
            )}
          </Space>
        </RelationshipInfo>
        
        <WarningText>
          ⚠️ 此操作不可撤销，删除后该依赖关系将从系统中永久移除。
        </WarningText>
      </div>
    </Modal>
  );
};

export default DeleteDependencyModal;
