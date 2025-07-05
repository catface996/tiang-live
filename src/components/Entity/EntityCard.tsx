import React from 'react';
import DefaultEntityCard from './DefaultEntityCard';
import type { EnumItem } from '../../services/enumApi';

interface EntityCardProps {
  entity: any;
  entityTypes?: EnumItem[];
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, entityTypes, onClick, onEdit }) => {
  // 统一使用DefaultEntityCard，通过属性和元数据来展示不同实体的特性
  return <DefaultEntityCard entity={entity} entityTypes={entityTypes} onClick={onClick} onEdit={onEdit} />;
};

export default EntityCard;

export default EntityCard;
