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
  Progress
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
import styled from 'styled-components';

const { Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .ant-card-body {
    padding: 20px;
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
    color: #262626;
    line-height: 1.4;
  }
  
  .report-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .report-description {
    margin: 12px 0;
    color: #666;
    font-size: 13px;
  }
  
  .report-stats {
    margin: 16px 0;
    padding: 12px;
    background: #fafafa;
    border-radius: 6px;
  }
  
  .report-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }
  
  .report-author {
    display: flex;
    align-items: center;
    color: #666;
    font-size: 12px;
  }
  
  .report-actions {
    display: flex;
    gap: 4px;
  }
`;

interface Report {
  key: string;
  name: string;
  type: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  lastModified: string;
  size: string;
  downloads: number;
  description?: string;
}

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
  const getStatusConfig = (status: string) => {
    const statusMap = {
      published: { color: 'green', text: '已发布', icon: '🟢' },
      draft: { color: 'orange', text: '草稿', icon: '🟡' },
      archived: { color: 'gray', text: '已归档', icon: '⚪' },
    };
    return statusMap[status as keyof typeof statusMap] || { color: 'default', text: status, icon: '⚫' };
  };

  const getTypeConfig = (type: string) => {
    const typeMap = {
      '健康度分析': { color: 'blue', icon: '📊' },
      '依赖分析': { color: 'purple', icon: '🔗' },
      '关系分析': { color: 'cyan', icon: '🕸️' },
      '性能分析': { color: 'gold', icon: '⚡' },
    };
    return typeMap[type as keyof typeof typeMap] || { color: 'default', icon: '📄' };
  };

  const statusConfig = getStatusConfig(report.status);
  const typeConfig = getTypeConfig(report.type);

  const actionMenuItems = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: '查看详情',
      onClick: () => onView(report)
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: '编辑报告',
      onClick: () => onEdit(report)
    },
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: '下载报告',
      onClick: () => onDownload(report)
    },
    {
      type: 'divider' as const
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: '删除报告',
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
      hoverable
      onClick={() => onView(report)}
      actions={[
        <Tooltip title="查看详情" key="view">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={(e) => handleAction('view', e)}
          />
        </Tooltip>,
        <Tooltip title="编辑报告" key="edit">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={(e) => handleAction('edit', e)}
          />
        </Tooltip>,
        <Tooltip title="下载报告" key="download">
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
              backgroundColor: typeConfig.color === 'blue' ? '#1890ff' : 
                              typeConfig.color === 'purple' ? '#722ed1' :
                              typeConfig.color === 'cyan' ? '#13c2c2' : 
                              typeConfig.color === 'gold' ? '#faad14' : '#1890ff'
            }}
          />
        </div>
        <div className="report-info">
          <div className="report-title">{report.name}</div>
          <div className="report-meta">
            <Tag color={typeConfig.color} icon={<span>{typeConfig.icon}</span>}>
              {report.type}
            </Tag>
            <Tag color={statusConfig.color} icon={<span>{statusConfig.icon}</span>}>
              {statusConfig.text}
            </Tag>
          </div>
        </div>
      </div>

      <div className="report-description">
        <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0, fontSize: 13, color: '#666' }}>
          {report.description || `这是一份关于${report.type}的详细报告，包含了系统的各项指标分析和建议。报告内容丰富，数据准确，为决策提供有力支持。`}
        </Paragraph>
      </div>

      <div className="report-stats">
        <Space split={<span style={{ color: '#d9d9d9' }}>|</span>} size="large">
          <Statistic 
            title="文件大小" 
            value={report.size} 
            valueStyle={{ fontSize: 14 }}
          />
          <Statistic 
            title="下载次数" 
            value={report.downloads} 
            valueStyle={{ fontSize: 14 }}
            prefix={<CloudDownloadOutlined />}
          />
        </Space>
        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>存储使用率</Text>
          <Progress 
            percent={getSizeProgress(report.size)} 
            size="small" 
            strokeColor={getSizeProgress(report.size) > 80 ? '#ff4d4f' : '#52c41a'}
            showInfo={false}
            style={{ marginTop: 4 }}
          />
        </div>
      </div>

      <div className="report-footer">
        <div className="report-author">
          <UserOutlined style={{ marginRight: 4 }} />
          <span>{report.author}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            创建: {report.createdAt.split(' ')[0]}
          </div>
          <div style={{ fontSize: 12, color: '#999' }}>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            更新: {report.lastModified.split(' ')[0]}
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default ReportCard;
