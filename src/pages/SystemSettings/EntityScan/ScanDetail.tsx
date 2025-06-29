import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Progress,
  Tag,
  Alert,
  Divider,
  Modal,
  message,
  Breadcrumb,
  Badge,
  Statistic,
  Input,
  Select,
  Switch
} from 'antd';
import {
  ArrowLeftOutlined,
  ScanOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  FileTextOutlined,
  TableOutlined,
  ApiOutlined,
  CloudServerOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import '../../../styles/entity-scan-detail.css';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

// 样式化组件
const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const FilterBar = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

const EntityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
`;

const EntityCard = styled(Card)`
  transition: all 0.3s ease;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    padding: 12px 16px;
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const EntityIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  margin-right: 8px;
`;

// 数据类型定义
interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'cloud';
  subType?: string;
  description: string;
  host: string;
  port: number;
  database?: string;
  username: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastConnected?: string;
  scanCount?: number;
}

interface ScanEntity {
  id: string;
  name: string;
  type: 'table' | 'view' | 'procedure' | 'function' | 'api' | 'file';
  schema?: string;
  description?: string;
  columns: EntityColumn[];
  selected: boolean;
  scanTime: string;
  recordCount?: number;
  size?: string;
  status: 'active' | 'inactive' | 'warning';
  owner?: string;
  tags?: string[];
}

interface EntityColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: string;
  description?: string;
}

interface ScanTask {
  id: string;
  dataSourceId: string;
  dataSourceName: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime: string;
  endTime?: string;
  entityCount: number;
  errorCount: number;
  selectedCount: number;
}

const ScanDetail: React.FC = () => {
  const { t } = useTranslation(['entityScan', 'common']);
  const navigate = useNavigate();
  const { dataSourceId } = useParams<{ dataSourceId: string }>();

  // 状态管理
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [scanTask, setScanTask] = useState<ScanTask | null>(null);
  const [scanEntities, setScanEntities] = useState<ScanEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // 获取数据源图标
  const getDataSourceIcon = (type: string, subType?: string) => {
    switch (type) {
      case 'database':
        return <DatabaseOutlined />;
      case 'api':
        return <ApiOutlined />;
      case 'cloud':
        return <CloudServerOutlined />;
      default:
        return <DatabaseOutlined />;
    }
  };

  // 获取实体类型图标和颜色
  const getEntityTypeConfig = (type: string) => {
    const typeMap = {
      table: { icon: <TableOutlined />, color: '#1890ff', name: t('entityScan:scanDetail.entityTypes.table') },
      view: { icon: <EyeOutlined />, color: '#52c41a', name: t('entityScan:scanDetail.entityTypes.view') },
      procedure: {
        icon: <PlayCircleOutlined />,
        color: '#722ed1',
        name: t('entityScan:scanDetail.entityTypes.procedure')
      },
      function: { icon: <FileTextOutlined />, color: '#fa8c16', name: t('entityScan:scanDetail.entityTypes.function') },
      api: { icon: <ApiOutlined />, color: '#13c2c2', name: t('entityScan:scanDetail.entityTypes.api') },
      file: { icon: <FileTextOutlined />, color: '#eb2f96', name: t('entityScan:scanDetail.entityTypes.file') }
    };
    return typeMap[type as keyof typeof typeMap] || { icon: <TableOutlined />, color: '#8c8c8c', name: type };
  };

  // 获取状态配置
  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: {
        text: t('entityScan:scanDetail.scanStatus.scanning'),
        color: 'processing',
        icon: <ScanOutlined spin />
      },
      completed: {
        text: t('entityScan:scanDetail.scanStatus.completed'),
        color: 'success',
        icon: <CheckCircleOutlined />
      },
      failed: {
        text: t('entityScan:scanDetail.scanStatus.failed'),
        color: 'error',
        icon: <ExclamationCircleOutlined />
      },
      paused: { text: t('entityScan:scanDetail.scanStatus.paused'), color: 'warning', icon: <PauseCircleOutlined /> }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.completed;
  };

  // 获取实体状态颜色
  const getEntityStatusColor = (status: string) => {
    const statusMap = {
      active: 'green',
      inactive: 'red',
      warning: 'orange'
    };
    return statusMap[status as keyof typeof statusMap] || 'default';
  };

  // 加载数据源信息
  useEffect(() => {
    if (dataSourceId) {
      loadDataSourceInfo();
      loadScanResults();
    }
  }, [dataSourceId]);

  const loadDataSourceInfo = async () => {
    try {
      setLoading(true);

      // 模拟加载数据源信息
      const mockDataSource: DataSource = {
        id: dataSourceId!,
        name: 'MySQL生产数据库',
        type: 'database',
        subType: 'mysql',
        description: '电商系统核心业务数据库，包含用户、订单、商品等核心业务表',
        host: 'mysql-prod.example.com',
        port: 3306,
        database: 'ecommerce_db',
        username: 'scan_user',
        status: 'connected',
        lastConnected: new Date().toLocaleString(),
        scanCount: 15
      };

      setDataSource(mockDataSource);

      // 模拟扫描任务信息
      const mockScanTask: ScanTask = {
        id: 'scan_' + Date.now(),
        dataSourceId: dataSourceId!,
        dataSourceName: mockDataSource.name,
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 300000).toLocaleString(),
        endTime: new Date().toLocaleString(),
        entityCount: 12,
        errorCount: 0,
        selectedCount: 8
      };

      setScanTask(mockScanTask);
    } catch (error) {
      message.error(t('entityScan:scanDetail.messages.loadDataSourceFailed'));
    } finally {
      setLoading(false);
    }
  };

  const loadScanResults = async () => {
    try {
      setLoading(true);

      // 模拟扫描结果
      const mockEntities: ScanEntity[] = [
        {
          id: '1',
          name: 'users',
          type: 'table',
          schema: 'ecommerce_db',
          description: '用户基础信息表',
          selected: true,
          scanTime: new Date().toLocaleString(),
          recordCount: 150000,
          size: '25.6MB',
          status: 'active',
          owner: '张三',
          tags: ['核心业务', '用户数据'],
          columns: [
            { name: 'id', type: 'bigint', nullable: false, primaryKey: true, description: '用户ID' },
            { name: 'username', type: 'varchar(50)', nullable: false, primaryKey: false, description: '用户名' },
            { name: 'email', type: 'varchar(100)', nullable: false, primaryKey: false, description: '邮箱' },
            { name: 'created_at', type: 'timestamp', nullable: false, primaryKey: false, description: '创建时间' }
          ]
        },
        {
          id: '2',
          name: 'orders',
          type: 'table',
          schema: 'ecommerce_db',
          description: '订单信息表',
          selected: true,
          scanTime: new Date().toLocaleString(),
          recordCount: 500000,
          size: '120.3MB',
          status: 'active',
          owner: '李四',
          tags: ['核心业务', '订单数据'],
          columns: [
            { name: 'id', type: 'bigint', nullable: false, primaryKey: true, description: '订单ID' },
            {
              name: 'user_id',
              type: 'bigint',
              nullable: false,
              primaryKey: false,
              foreignKey: 'users.id',
              description: '用户ID'
            },
            {
              name: 'total_amount',
              type: 'decimal(10,2)',
              nullable: false,
              primaryKey: false,
              description: '订单总额'
            },
            { name: 'status', type: 'varchar(20)', nullable: false, primaryKey: false, description: '订单状态' }
          ]
        },
        {
          id: '3',
          name: 'products',
          type: 'table',
          schema: 'ecommerce_db',
          description: '商品信息表',
          selected: true,
          scanTime: new Date().toLocaleString(),
          recordCount: 50000,
          size: '45.2MB',
          status: 'active',
          owner: '王五',
          tags: ['商品管理'],
          columns: []
        },
        {
          id: '4',
          name: 'user_order_view',
          type: 'view',
          schema: 'ecommerce_db',
          description: '用户订单视图',
          selected: false,
          scanTime: new Date().toLocaleString(),
          status: 'active',
          owner: '张三',
          tags: ['视图', '统计'],
          columns: []
        },
        {
          id: '5',
          name: 'get_user_stats',
          type: 'procedure',
          schema: 'ecommerce_db',
          description: '获取用户统计信息存储过程',
          selected: false,
          scanTime: new Date().toLocaleString(),
          status: 'active',
          owner: '李四',
          tags: ['存储过程'],
          columns: []
        }
      ];

      setScanEntities(mockEntities);
      setSelectedRowKeys(mockEntities.filter(e => e.selected).map(e => e.id));
    } catch (error) {
      message.error(t('entityScan:scanDetail.messages.loadScanResultsFailed'));
    } finally {
      setLoading(false);
    }
  };

  // 开始扫描
  const handleStartScan = async () => {
    if (!dataSource) return;

    try {
      setIsScanning(true);

      setScanTask(prev =>
        prev
          ? {
              ...prev,
              status: 'running',
              progress: 0,
              startTime: new Date().toLocaleString(),
              endTime: undefined
            }
          : null
      );

      message.loading(t('entityScan:scanDetail.messages.scanningDataSource'), 2);

      // 模拟扫描进度
      const progressInterval = setInterval(() => {
        setScanTask(prev => {
          if (!prev || prev.status !== 'running') {
            clearInterval(progressInterval);
            return prev;
          }

          const newProgress = Math.min(prev.progress + Math.random() * 15, 100);
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsScanning(false);
            message.success(t('entityScan:scanDetail.messages.scanCompleted'));
            return {
              ...prev,
              status: 'completed',
              progress: 100,
              endTime: new Date().toLocaleString(),
              entityCount: scanEntities.length,
              selectedCount: selectedRowKeys.length
            };
          }

          return { ...prev, progress: newProgress };
        });
      }, 500);
    } catch (error) {
      setIsScanning(false);
      message.error(t('entityScan:scanDetail.messages.scanFailed'));
    }
  };

  // 暂停扫描
  const handlePauseScan = () => {
    setIsScanning(false);
    setScanTask(prev => (prev ? { ...prev, status: 'paused' } : null));
    message.info(t('entityScan:scanDetail.messages.scanPaused'));
  };

  // 停止扫描
  const handleStopScan = () => {
    setIsScanning(false);
    setScanTask(prev =>
      prev
        ? {
            ...prev,
            status: 'completed',
            endTime: new Date().toLocaleString()
          }
        : null
    );
    message.info(t('entityScan:scanDetail.messages.scanStopped'));
  };

  // 导出实体
  const handleExportEntities = () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t('entityScan:scanDetail.messages.selectEntitiesFirst'));
      return;
    }

    const selectedEntities = scanEntities.filter(entity => selectedRowKeys.includes(entity.id));

    console.log('导出数据:', selectedEntities);
    message.success(t('entityScan:scanDetail.messages.exportSuccess', { count: selectedEntities.length }));
  };

  // 查看实体详情
  const handleViewEntity = (entity: ScanEntity) => {
    Modal.info({
      title: `${t('entityScan:scanDetail.entityDetail.title')} - ${entity.name}`,
      width: 800,
      content: (
        <div className="entity-detail-modal">
          <Row gutter={[16, 8]} className="entity-detail-row">
            <Col span={6}>
              <strong>{t('entityScan:scanDetail.entityDetail.name')}:</strong>
            </Col>
            <Col span={18}>{entity.name}</Col>
          </Row>
          <Row gutter={[16, 8]} className="entity-detail-row">
            <Col span={6}>
              <strong>{t('entityScan:scanDetail.entityDetail.type')}:</strong>
            </Col>
            <Col span={18}>
              <Tag color={getEntityTypeConfig(entity.type).color}>{getEntityTypeConfig(entity.type).name}</Tag>
            </Col>
          </Row>
          <Row gutter={[16, 8]} className="entity-detail-row">
            <Col span={6}>
              <strong>{t('entityScan:scanDetail.entityDetail.schema')}:</strong>
            </Col>
            <Col span={18}>{entity.schema}</Col>
          </Row>
          <Row gutter={[16, 8]} className="entity-detail-row">
            <Col span={6}>
              <strong>{t('entityScan:scanDetail.entityDetail.description')}:</strong>
            </Col>
            <Col span={18}>{entity.description}</Col>
          </Row>
          {entity.recordCount && (
            <Row gutter={[16, 8]} className="entity-detail-row">
              <Col span={6}>
                <strong>{t('entityScan:scanDetail.entityDetail.recordCount')}:</strong>
              </Col>
              <Col span={18}>{entity.recordCount.toLocaleString()}</Col>
            </Row>
          )}
          {entity.size && (
            <Row gutter={[16, 8]} className="entity-detail-row">
              <Col span={6}>
                <strong>{t('entityScan:scanDetail.entityDetail.size')}:</strong>
              </Col>
              <Col span={18}>{entity.size}</Col>
            </Row>
          )}
          <Row gutter={[16, 8]} className="entity-detail-row">
            <Col span={6}>
              <strong>{t('entityScan:scanDetail.entityDetail.scanTime')}:</strong>
            </Col>
            <Col span={18}>{entity.scanTime}</Col>
          </Row>
        </div>
      )
    });
  };

  // 切换实体激活状态
  const handleToggleEntityActive = (entityId: string, active: boolean) => {
    setScanEntities(entities =>
      entities.map(entity => (entity.id === entityId ? { ...entity, status: active ? 'active' : 'inactive' } : entity))
    );

    message.success(
      active
        ? t('entityScan:scanDetail.messages.entityActivated')
        : t('entityScan:scanDetail.messages.entityDeactivated')
    );
  };

  // 切换实体选择状态
  const handleToggleEntity = (entityId: string, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, entityId]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter(key => key !== entityId));
    }

    // 更新实体选择状态
    setScanEntities(entities =>
      entities.map(entity => (entity.id === entityId ? { ...entity, selected: checked } : entity))
    );
  };

  // 统计数据
  const getStatistics = () => {
    if (!scanTask)
      return { totalEntities: 0, selectedEntities: 0, tableCount: 0, viewCount: 0, activeCount: 0, warningCount: 0 };

    return {
      totalEntities: scanEntities.length,
      selectedEntities: selectedRowKeys.length,
      tableCount: scanEntities.filter(e => e.type === 'table').length,
      viewCount: scanEntities.filter(e => e.type === 'view').length,
      activeCount: scanEntities.filter(e => e.status === 'active').length,
      warningCount: scanEntities.filter(e => e.status === 'warning').length
    };
  };

  // 过滤实体
  const getFilteredEntities = () => {
    return scanEntities.filter(entity => {
      const matchesSearch =
        !searchText ||
        entity.name.toLowerCase().includes(searchText.toLowerCase()) ||
        entity.description?.toLowerCase().includes(searchText.toLowerCase());

      const matchesType = filterType === 'all' || entity.type === filterType;
      const matchesStatus = filterStatus === 'all' || entity.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  };

  // 渲染实体卡片
  const renderEntityCard = (entity: ScanEntity) => {
    const typeConfig = getEntityTypeConfig(entity.type);

    return (
      <EntityCard
        key={entity.id}
        size="small"
        onClick={() => handleViewEntity(entity)}
        title={
          <Space>
            <EntityIcon style={{ backgroundColor: typeConfig.color }}>{typeConfig.icon}</EntityIcon>
            <div>
              <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {entity.schema && `${entity.schema}.`}
                {entity.name}
              </Text>
            </div>
          </Space>
        }
      >
        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
          {entity.description || t('entityScan:scanDetail.entityCard.noDescription')}
        </Paragraph>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text type="secondary">{t('entityScan:scanDetail.entityCard.owner')}:</Text>
          <Text>{entity.owner || t('entityScan:scanDetail.entityCard.unspecified')}</Text>
        </div>

        {entity.recordCount && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text type="secondary">{t('entityScan:scanDetail.entityCard.recordCount')}:</Text>
            <Text>{entity.recordCount.toLocaleString()}</Text>
          </div>
        )}

        {entity.size && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text type="secondary">{t('entityScan:scanDetail.entityCard.size')}:</Text>
            <Text>{entity.size}</Text>
          </div>
        )}

        <div style={{ marginTop: 12, marginBottom: 12 }}>
          {entity.tags?.map((tag: string, index: number) => (
            <Tag key={index} size="small" style={{ marginBottom: 4 }}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* 激活状态控制 */}
        <div className="entity-activation-control">
          <Space>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {t('entityScan:scanDetail.entityCard.activationStatus')}:
            </Text>
            <Switch
              size="small"
              checked={entity.status === 'active'}
              onChange={checked => {
                handleToggleEntityActive(entity.id, checked);
              }}
              onClick={(checked, e) => {
                e.stopPropagation();
              }}
            />
          </Space>
          <Text
            className={entity.status === 'active' ? 'entity-status-active' : 'entity-status-inactive'}
            style={{ fontSize: '12px' }}
          >
            {entity.status === 'active'
              ? t('entityScan:scanDetail.entityCard.activated')
              : t('entityScan:scanDetail.entityCard.deactivated')}
          </Text>
        </div>
      </EntityCard>
    );
  };

  if (!dataSource) {
    return <div>{t('entityScan:scanDetail.messages.loading')}</div>;
  }

  const filteredEntities = getFilteredEntities();
  const stats = getStatistics();

  return (
    <PageContainer className="entity-scan-detail-page">
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/system-settings/entity-scan')}
              className="breadcrumb-back-button"
            >
              {t('menu:entityScan')}
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="breadcrumb-item-span">{dataSource.name}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* 页面头部 */}
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title level={2} style={{ margin: 0 }}>
            <Space>
              {getDataSourceIcon(dataSource.type, dataSource.subType)}
              {dataSource.name}
            </Space>
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={loadScanResults}>
              {t('entityScan:scanDetail.actions.refresh')}
            </Button>
            {scanTask?.status === 'running' ? (
              <Space>
                <Button icon={<PauseCircleOutlined />} onClick={handlePauseScan}>
                  {t('entityScan:scanDetail.actions.pauseScan')}
                </Button>
                <Button danger icon={<StopOutlined />} onClick={handleStopScan}>
                  {t('entityScan:scanDetail.actions.stopScan')}
                </Button>
              </Space>
            ) : (
              <Button type="primary" icon={<ScanOutlined />} onClick={handleStartScan} loading={isScanning}>
                {t('entityScan:scanDetail.actions.startScan')}
              </Button>
            )}
            <Button icon={<DownloadOutlined />} onClick={handleExportEntities} disabled={selectedRowKeys.length === 0}>
              {t('entityScan:scanDetail.actions.exportEntities')}
            </Button>
          </Space>
        </div>
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>{dataSource.description}</Paragraph>
      </PageHeader>

      {/* 扫描状态 */}
      {scanTask && (
        <Alert
          message={
            <Space>
              <Badge status={getStatusConfig(scanTask.status).color as any} />
              {getStatusConfig(scanTask.status).text}
              {scanTask.status === 'running' && (
                <Progress percent={Math.round(scanTask.progress)} size="small" className="scan-progress" />
              )}
            </Space>
          }
          description={
            <div>
              <Text>
                {t('entityScan:scanDetail.scanStatus.startTime')}: {scanTask.startTime}
              </Text>
              {scanTask.endTime && (
                <>
                  <Divider type="vertical" />
                  <Text>
                    {t('entityScan:scanDetail.scanStatus.endTime')}: {scanTask.endTime}
                  </Text>
                </>
              )}
              <Divider type="vertical" />
              <Text>
                {t('entityScan:scanDetail.scanStatus.foundEntities')}: {scanTask.entityCount} 个
              </Text>
              {scanTask.errorCount > 0 && (
                <>
                  <Divider type="vertical" />
                  <Text type="danger">
                    {t('entityScan:scanDetail.scanStatus.errors')}: {scanTask.errorCount} 个
                  </Text>
                </>
              )}
            </div>
          }
          type={scanTask.status === 'failed' ? 'error' : scanTask.status === 'running' ? 'info' : 'success'}
          className="scan-alert"
        />
      )}

      {/* 统计数据 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-primary">
            <Statistic
              title={t('entityScan:scanDetail.statistics.foundEntities')}
              value={stats.totalEntities}
              suffix="个"
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-success">
            <Statistic
              title={t('entityScan:scanDetail.statistics.selected')}
              value={stats.selectedEntities}
              suffix="个"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-warning">
            <Statistic
              title={t('entityScan:scanDetail.statistics.dataTables')}
              value={stats.tableCount}
              suffix="个"
              prefix={<TableOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card-purple">
            <Statistic
              title={t('entityScan:scanDetail.statistics.views')}
              value={stats.viewCount}
              suffix="个"
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <FilterBar>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder={t('entityScan:scanDetail.filters.searchPlaceholder')}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%' }}
              allowClear
            />
          </Col>
          <Col>
            <Select
              value={filterType}
              onChange={setFilterType}
              style={{ width: 120 }}
              placeholder={t('entityScan:scanDetail.filters.allTypes')}
            >
              <Option value="all">{t('entityScan:scanDetail.filters.allTypes')}</Option>
              <Option value="table">{t('entityScan:scanDetail.filters.table')}</Option>
              <Option value="view">{t('entityScan:scanDetail.filters.view')}</Option>
              <Option value="procedure">{t('entityScan:scanDetail.filters.procedure')}</Option>
              <Option value="function">{t('entityScan:scanDetail.filters.function')}</Option>
              <Option value="api">{t('entityScan:scanDetail.filters.api')}</Option>
              <Option value="file">{t('entityScan:scanDetail.filters.file')}</Option>
            </Select>
          </Col>
          <Col>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 100 }}
              placeholder={t('entityScan:scanDetail.filters.allStatuses')}
            >
              <Option value="all">{t('entityScan:scanDetail.filters.allStatuses')}</Option>
              <Option value="active">{t('entityScan:scanDetail.filters.active')}</Option>
              <Option value="inactive">{t('entityScan:scanDetail.filters.inactive')}</Option>
              <Option value="warning">{t('entityScan:scanDetail.filters.warning')}</Option>
            </Select>
          </Col>
        </Row>
      </FilterBar>

      {/* 实体卡片列表 */}
      <Card
        title={`${t('entityScan:scanDetail.scanResults.title')} (${filteredEntities.length})`}
        className="scan-card"
      >
        {filteredEntities.length > 0 ? (
          <EntityGrid>{filteredEntities.map(renderEntityCard)}</EntityGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">{t('entityScan:scanDetail.messages.noMatchingEntities')}</Text>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default ScanDetail;
