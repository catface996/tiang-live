import React from 'react';
import { 
  Card, 
  Space, 
  Button, 
  Tag, 
  Avatar, 
  Tooltip, 
  Dropdown, 
  Typography,
  Statistic,
  theme
} from 'antd';
import { 
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  MoreOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import type { Report } from '../../../types/report';

const { Text, Paragraph } = Typography;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  min-height: 380px;
  transition: all 0.3s ease;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  border-radius: 8px !important;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(255, 255, 255, 0.1)' 
    : '0 4px 12px rgba(0, 0, 0, 0.15)'
};
    transform: translateY(-2px);
    border-color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
  }
  
  .ant-card-head {
    display: none; /* 隐藏默认头部，使用自定义头部 */
  }
  
  .ant-card-body {
    padding: 20px;
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    border-radius: 8px 8px 0 0 !important;
    display: flex;
    flex-direction: column;
    height: calc(100% - 64px); /* 减去actions的高度 */
  }
  
  .ant-card-actions {
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
    height: 64px;
    
    li {
      /* 移除按钮间的分割线 */
      border-right: none;
    }
    
    .ant-btn {
      color: ${props => props.$isDark ? '#ffffff' : '#595959'};
      
      &:hover {
        color: ${props => props.$isDark ? '#177ddc' : '#40a9ff'};
        background: ${props => props.$isDark ? 'rgba(23, 125, 220, 0.1)' : 'rgba(64, 169, 255, 0.1)'};
      }
    }
  }
  
  .report-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .report-icon {
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .report-info {
    flex: 1;
    min-width: 0;
  }
  
  .report-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: ${props => props.$isDark ? '#ffffff' : '#262626'};
    line-height: 1.4;
  }
  
  .report-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .report-description {
    margin: 12px 0 16px 0;
    color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
    font-size: 13px;
    flex: 1;
  }
  
  .report-stats {
    margin: 16px 0;
    padding: 12px;
    background: ${props => props.$isDark ? '#1f1f1f' : '#fafafa'};
    border-radius: 6px;
    border: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  }
  
  .report-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 16px;
    border-top: ${props => props.$isDark ? '1px solid #303030' : '1px solid #f0f0f0'};
  }
  
  .report-author {
    display: flex;
    align-items: center;
    color: ${props => props.$isDark ? '#8c8c8c' : '#666'};
    font-size: 12px;
  }
  
  .report-actions {
    display: flex;
    gap: 4px;
  }

  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 340px;
    
    .ant-card-body {
      padding: 16px;
      height: calc(100% - 56px);
    }
    
    .ant-card-actions {
      height: 56px;
    }
    
    .report-header {
      margin-bottom: 12px;
    }
    
    .report-icon {
      margin-right: 10px;
    }
    
    .report-title {
      font-size: 15px;
    }
    
    .report-stats {
      margin: 12px 0;
      padding: 10px;
    }
  }

  @media (max-width: 576px) {
    min-height: 320px;
    
    .ant-card-body {
      padding: 14px;
    }
    
    .report-title {
      font-size: 14px;
    }
    
    .report-meta {
      gap: 4px;
    }
  }
`;

interface ReportCardProps {
  report: Report;
  onView: (report: Report) => void;
  onEdit: (report: Report) => void;
  onDownload: (report: Report) => void;
  onDelete: (report: Report) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onView,
  onEdit,
  onDownload,
  onDelete
}) => {
  const { t } = useTranslation(['reports', 'common']);
  const { currentTheme } = useAppSelector((state) => state.theme);
  const { token } = theme.useToken();
  const isDark = currentTheme === 'dark';
  
  const getStatusConfig = (status: string) => {
    const statusMap = {
      published: { 
        color: isDark ? '#52c41a' : 'green', 
        text: t('reports:status.published'), 
        icon: '🟢',
        bgColor: isDark ? 'rgba(82, 196, 26, 0.1)' : undefined
      },
      draft: { 
        color: isDark ? '#faad14' : 'orange', 
        text: t('reports:status.draft'), 
        icon: '🟡',
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      },
      archived: { 
        color: isDark ? '#8c8c8c' : 'gray', 
        text: t('reports:status.archived'), 
        icon: '⚪',
        bgColor: isDark ? 'rgba(140, 140, 140, 0.1)' : undefined
      }
    };
    return statusMap[status as keyof typeof statusMap] || { 
      color: 'default', 
      text: status, 
      icon: '⚫',
      bgColor: undefined
    };
  };

  const getTypeConfig = (type: string) => {
    const typeMap = {
      [t('reports:types.health')]: { 
        color: isDark ? '#1890ff' : 'blue', 
        icon: '📊',
        bgColor: isDark ? 'rgba(24, 144, 255, 0.1)' : undefined
      },
      [t('reports:types.dependency')]: { 
        color: isDark ? '#722ed1' : 'purple', 
        icon: '🔗',
        bgColor: isDark ? 'rgba(114, 46, 209, 0.1)' : undefined
      },
      [t('reports:types.relationship')]: { 
        color: isDark ? '#13c2c2' : 'cyan', 
        icon: '🕸️',
        bgColor: isDark ? 'rgba(19, 194, 194, 0.1)' : undefined
      },
      [t('reports:types.performance')]: { 
        color: isDark ? '#faad14' : 'gold', 
        icon: '⚡',
        bgColor: isDark ? 'rgba(250, 173, 20, 0.1)' : undefined
      }
    };
    return typeMap[type as keyof typeof typeMap] || { 
      color: 'default', 
      icon: '📄',
      bgColor: undefined
    };
  };

  const statusConfig = getStatusConfig(report.status);
  const typeConfig = getTypeConfig(report.type);

  const actionMenuItems = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: t('common:view'),
      onClick: () => onView(report)
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: t('common:edit'),
      onClick: () => onEdit(report)
    },
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: t('common:download'),
      onClick: () => onDownload(report)
    },
    {
      type: 'divider' as const
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: t('common:delete'),
      danger: true,
      onClick: () => onDelete(report)
    }
  ];

  const handleAction = (action: string, event: React.MouseEvent) => {
    event.stopPropagation();
    switch (action) {
      case 'view':
        onView(report);
        break;
      case 'edit':
        onEdit(report);
        break;
      case 'download':
        onDownload(report);
        break;
      case 'delete':
        onDelete(report);
        break;
    }
  };

  // 计算文件大小的数值用于进度条
  const getSizeProgress = (size: string) => {
    const sizeNum = parseFloat(size);
    const unit = size.replace(/[0-9.]/g, '');
    if (unit === 'KB') return Math.min((sizeNum / 1024) * 100, 100);
    if (unit === 'MB') return Math.min((sizeNum / 10) * 100, 100);
    if (unit === 'GB') return 100;
    return 50;
  };

  return (
    <StyledCard
      $isDark={isDark}
      hoverable
      onClick={() => onView(report)}
      actions={[
        <Tooltip title={t('common:view')} key="view">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={(e) => handleAction('view', e)}
          />
        </Tooltip>,
        <Tooltip title={t('common:edit')} key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={(e) => handleAction('edit', e)}
          />
        </Tooltip>,
        <Tooltip title={t('common:download')} key="download">
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            onClick={(e) => handleAction('download', e)}
          />
        </Tooltip>,
        <Dropdown 
          menu={{ 
            items: actionMenuItems.map(item => ({
              ...item,
              onClick: item.onClick ? () => item.onClick() : undefined
            }))
          }} 
          trigger={['click']}
          key="more"
        >
          <Button 
            type="text" 
            icon={<MoreOutlined />} 
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      ]}
    >
      <div className="report-header">
        <div className="report-icon">
          <Avatar 
            size={48} 
            icon={<FileTextOutlined />} 
            style={{ 
              backgroundColor: typeConfig.color === 'blue' || typeConfig.color === '#1890ff' ? '#1890ff' : 
                typeConfig.color === 'purple' || typeConfig.color === '#722ed1' ? '#722ed1' :
                  typeConfig.color === 'cyan' || typeConfig.color === '#13c2c2' ? '#13c2c2' : 
                    typeConfig.color === 'gold' || typeConfig.color === '#faad14' ? '#faad14' : '#1890ff'
            }}
          />
        </div>
        <div className="report-info">
          <div className="report-title">{report.name}</div>
          <div className="report-meta">
            <Tag 
              color={typeConfig.color} 
              icon={<span>{typeConfig.icon}</span>}
              style={typeConfig.bgColor ? { 
                backgroundColor: typeConfig.bgColor,
                border: `1px solid ${typeConfig.color}`,
                color: typeConfig.color
              } : {}}
            >
              {report.type}
            </Tag>
            <Tag 
              color={statusConfig.color} 
              icon={<span>{statusConfig.icon}</span>}
              style={statusConfig.bgColor ? { 
                backgroundColor: statusConfig.bgColor,
                border: `1px solid ${statusConfig.color}`,
                color: statusConfig.color
              } : {}}
            >
              {statusConfig.text}
            </Tag>
          </div>
        </div>
      </div>

      <div className="report-description">
        <Paragraph 
          ellipsis={{ 
            rows: 2, 
            tooltip: report.description || t('reports:card.defaultDescription', { type: report.type })
          }} 
          style={{ 
            margin: 0, 
            fontSize: 13, 
            color: isDark ? '#8c8c8c' : '#666',
            lineHeight: '1.5'
          }}
        >
          {report.description || t('reports:card.defaultDescription', { type: report.type })}
        </Paragraph>
      </div>

      <div className="report-stats">
        <Space 
          split={<span style={{ color: isDark ? '#434343' : '#d9d9d9' }}>|</span>} 
          size="small"
          wrap
        >
          <Statistic 
            title={<span style={{ color: isDark ? '#8c8c8c' : '#666', fontSize: 11 }}>{t('reports:card.fileSize')}</span>} 
            value={report.size} 
            valueStyle={{ 
              fontSize: 13,
              color: isDark ? '#ffffff' : '#262626'
            }}
          />
          <Statistic 
            title={<span style={{ color: isDark ? '#8c8c8c' : '#666', fontSize: 11 }}>{t('reports:card.downloads')}</span>} 
            value={report.downloads} 
            valueStyle={{ 
              fontSize: 13,
              color: isDark ? '#ffffff' : '#262626'
            }}
            prefix={<CloudDownloadOutlined style={{ color: isDark ? '#1890ff' : '#1890ff', fontSize: 12 }} />}
          />
        </Space>
      </div>

      <div className="report-footer">
        <div className="report-author">
          <UserOutlined style={{ marginRight: 4 }} />
          <span>{report.author}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: 12, 
            color: isDark ? '#8c8c8c' : '#999', 
            marginBottom: 2 
          }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {t('reports:card.created')}: {report.createdAt.split(' ')[0]}
          </div>
          <div style={{ 
            fontSize: 12, 
            color: isDark ? '#8c8c8c' : '#999' 
          }}>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {t('reports:card.updated')}: {report.lastModified.split(' ')[0]}
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default ReportCard;
