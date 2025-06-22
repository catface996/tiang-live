import React from 'react';
import ReportEntityCard from './ReportEntityCard';
import BusinessLinkEntityCard from './BusinessLinkEntityCard';
import BusinessSystemEntityCard from './BusinessSystemEntityCard';
import ApiEntityCard from './ApiEntityCard';
import DatabaseEntityCard from './DatabaseEntityCard';
import TableEntityCard from './TableEntityCard';
import DefaultEntityCard from './DefaultEntityCard';

interface EntityCardProps {
  entity: any;
  onClick?: (entity: any) => void;
  onEdit?: (entity: any) => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick, onEdit }) => {
  const renderCard = () => {
    switch (entity.type) {
      case 'report':
        return <ReportEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'business_link':
        return <BusinessLinkEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'business_system':
        return <BusinessSystemEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'api':
        return <ApiEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'database':
        return <DatabaseEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'table':
        return <TableEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
      case 'middleware':
      case 'microservice':
      case 'scheduled_job':
      case 'configuration':
      default:
        return <DefaultEntityCard entity={entity} onClick={onClick} onEdit={onEdit} />;
    }
  };

  return renderCard();
};

export default EntityCard;
