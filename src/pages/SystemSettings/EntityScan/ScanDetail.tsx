import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Progress,
  Tag,
  Alert,
  Divider,
  Switch,
  Modal,
  message,
  Breadcrumb,
  Statistic,
  Tooltip,
  Badge
} from 'antd';
import {
  ArrowLeftOutlined,
  ScanOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  FileTextOutlined,
  TableOutlined,
  ApiOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';

const { Title, Text, Paragraph } = Typography;

// 样式化组件
const ScanDetailContainer = styled.div`
  padding: 24px;
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
    
    .ant-breadcrumb-link {
      display: flex;
      align-items: center;
      line-height: 1;
    }
    
    .ant-breadcrumb-separator {
      display: flex;
      align-items: center;
      line-height: 1;
      margin: 0 8px;
    }
    
    ol {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
      
      li {
        display: flex;
        align-items: center;
        line-height: 1;
      }
    }
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const PageHeaderContent = styled.div`
  flex: 1;
`;

const PageHeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'linear-gradient(145deg, #1a1a1a, #141414)' 
    : 'linear-gradient(145deg, #ffffff, #fafafa)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.06)'
  };
  
  .ant-card-body {
    padding: 20px;
  }
`;

const StatItem = styled.div<{ $isDark: boolean }>`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.03)' 
    : 'rgba(0, 0, 0, 0.02)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.04)'
    };
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${props => props.color || '#1890ff'};
`;

const StatLabel = styled.div<{ $isDark: boolean }>`
  font-size: 14px;
  color: ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.65)' 
    : 'rgba(0, 0, 0, 0.65)'
  };
  font-weight: 500;
`;

const ScanCard = styled(Card)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  border-radius: 8px;
  background: ${props => props.$isDark 
    ? 'linear-gradient(145deg, #1a1a1a, #141414)' 
    : 'linear-gradient(145deg, #ffffff, #fafafa)'
  };
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.06)'
  };
  
  .ant-card-head {
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  }
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
  const isDark = useAppSelector(state => state.theme.isDark);

  // 状态管理
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [scanTask, setScanTask] = useState<ScanTask | null>(null);
  const [scanEntities, setScanEntities] = useState<ScanEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  // 获取实体类型图标
  const getEntityTypeIcon = (type: string) => {
    switch (type) {
      case 'table':
        return <TableOutlined style={{ color: '#1890ff' }} />;
      case 'view':
        return <EyeOutlined style={{ color: '#52c41a' }} />;
      case 'procedure':
        return <PlayCircleOutlined style={{ color: '#722ed1' }} />;
      case 'function':
        return <FileTextOutlined style={{ color: '#fa8c16' }} />;
      case 'api':
        return <ApiOutlined style={{ color: '#13c2c2' }} />;
      case 'file':
        return <FileTextOutlined style={{ color: '#eb2f96' }} />;
      default:
        return <TableOutlined />;
    }
  };

  // 获取状态配置
  const getStatusConfig = (status: string) => {
    const statusMap = {
      running: { text: '扫描中', color: 'processing', icon: <ScanOutlined spin /> },
      completed: { text: '已完成', color: 'success', icon: <CheckCircleOutlined /> },
      failed: { text: '扫描失败', color: 'error', icon: <ExclamationCircleOutlined /> },
      paused: { text: '已暂停', color: 'warning', icon: <PauseCircleOutlined /> }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.completed;
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
        name: 'MySQL主数据库',
        type: 'database',
        subType: 'mysql',
        description: '生产环境主数据库，包含用户、订单、商品等核心业务数据',
        host: '192.168.1.100',
        port: 3306,
        database: 'ecommerce_db',
        username: 'admin',
        status: 'connected',
        lastConnected: new Date().toLocaleString(),
        scanCount: 5
      };

      setDataSource(mockDataSource);
    } catch (error) {
      message.error('加载数据源信息失败');
    } finally {
      setLoading(false);
    }
  };

  const loadScanResults = async () => {
    try {
      setLoading(true);
      
      // 模拟扫描任务信息
      const mockTask: ScanTask = {
        id: `task_${Date.now()}`,
        dataSourceId: dataSourceId!,
        dataSourceName: 'MySQL主数据库',
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 300000).toLocaleString(),
        endTime: new Date().toLocaleString(),
        entityCount: 15,
        errorCount: 0,
        selectedCount: 12
      };

      setScanTask(mockTask);

      // 模拟扫描到的实体
      const mockEntities: ScanEntity[] = [
        {
          id: '1',
          name: 'users',
          type: 'table',
          schema: 'ecommerce_db',
          description: '用户信息表',
          selected: true,
          scanTime: new Date().toLocaleString(),
          recordCount: 10000,
          size: '2.5MB',
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
          recordCount: 50000,
          size: '12.8MB',
          columns: [
            { name: 'id', type: 'bigint', nullable: false, primaryKey: true, description: '订单ID' },
            { name: 'user_id', type: 'bigint', nullable: false, primaryKey: false, foreignKey: 'users.id', description: '用户ID' },
            { name: 'total_amount', type: 'decimal(10,2)', nullable: false, primaryKey: false, description: '订单总额' },
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
          recordCount: 5000,
          size: '8.2MB',
          columns: [
            { name: 'id', type: 'bigint', nullable: false, primaryKey: true, description: '商品ID' },
            { name: 'name', type: 'varchar(200)', nullable: false, primaryKey: false, description: '商品名称' },
            { name: 'price', type: 'decimal(10,2)', nullable: false, primaryKey: false, description: '商品价格' },
            { name: 'category_id', type: 'int', nullable: false, primaryKey: false, description: '分类ID' }
          ]
        },
        {
          id: '4',
          name: 'user_orders_view',
          type: 'view',
          schema: 'ecommerce_db',
          description: '用户订单视图',
          selected: false,
          scanTime: new Date().toLocaleString(),
          columns: [
            { name: 'user_id', type: 'bigint', nullable: false, primaryKey: false, description: '用户ID' },
            { name: 'username', type: 'varchar(50)', nullable: false, primaryKey: false, description: '用户名' },
            { name: 'order_count', type: 'bigint', nullable: false, primaryKey: false, description: '订单数量' },
            { name: 'total_spent', type: 'decimal(12,2)', nullable: true, primaryKey: false, description: '总消费' }
          ]
        },
        {
          id: '5',
          name: 'get_user_stats',
          type: 'procedure',
          schema: 'ecommerce_db',
          description: '获取用户统计信息存储过程',
          selected: false,
          scanTime: new Date().toLocaleString(),
          columns: []
        }
      ];

      setScanEntities(mockEntities);
      setSelectedRowKeys(mockEntities.filter(e => e.selected).map(e => e.id));
    } catch (error) {
      message.error('加载扫描结果失败');
    } finally {
      setLoading(false);
    }
  };

  // 开始扫描
  const handleStartScan = async () => {
    if (!dataSource) return;

    try {
      setIsScanning(true);
      
      // 更新任务状态
      setScanTask(prev => prev ? {
        ...prev,
        status: 'running',
        progress: 0,
        startTime: new Date().toLocaleString(),
        endTime: undefined
      } : null);

      message.loading('正在扫描数据源...', 2);

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
            message.success('扫描完成！');
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
      message.error('扫描失败！');
    }
  };

  // 暂停扫描
  const handlePauseScan = () => {
    setIsScanning(false);
    setScanTask(prev => prev ? { ...prev, status: 'paused' } : null);
    message.info('扫描已暂停');
  };

  // 停止扫描
  const handleStopScan = () => {
    setIsScanning(false);
    setScanTask(prev => prev ? { 
      ...prev, 
      status: 'completed',
      endTime: new Date().toLocaleString()
    } : null);
    message.info('扫描已停止');
  };

  // 导出实体
  const handleExportEntities = () => {
    const selectedEntities = scanEntities.filter(e => selectedRowKeys.includes(e.id));
    message.success(`已导出 ${selectedEntities.length} 个实体定义`);
  };

  // 查看实体详情
  const handleViewEntity = (entity: ScanEntity) => {
    Modal.info({
      title: `实体详情 - ${entity.name}`,
      width: 800,
      content: (
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
            <Col span={6}><strong>名称:</strong></Col>
            <Col span={18}>{entity.name}</Col>
            <Col span={6}><strong>类型:</strong></Col>
            <Col span={18}>
              <Space>
                {getEntityTypeIcon(entity.type)}
                {entity.type}
              </Space>
            </Col>
            <Col span={6}><strong>模式:</strong></Col>
            <Col span={18}>{entity.schema || '-'}</Col>
            <Col span={6}><strong>描述:</strong></Col>
            <Col span={18}>{entity.description || '-'}</Col>
            <Col span={6}><strong>记录数:</strong></Col>
            <Col span={18}>{entity.recordCount?.toLocaleString() || '-'}</Col>
            <Col span={6}><strong>大小:</strong></Col>
            <Col span={18}>{entity.size || '-'}</Col>
          </Row>
          
          {entity.columns.length > 0 && (
            <>
              <Divider>字段信息</Divider>
              <Table
                size="small"
                dataSource={entity.columns}
                pagination={false}
                columns={[
                  { title: '字段名', dataIndex: 'name', key: 'name' },
                  { title: '类型', dataIndex: 'type', key: 'type' },
                  { 
                    title: '属性', 
                    key: 'attributes',
                    render: (_, record) => (
                      <Space>
                        {record.primaryKey && <Tag color="red">主键</Tag>}
                        {record.foreignKey && <Tag color="blue">外键</Tag>}
                        {record.nullable && <Tag color="orange">可空</Tag>}
                      </Space>
                    )
                  },
                  { title: '描述', dataIndex: 'description', key: 'description' }
                ]}
              />
            </>
          )}
        </div>
      )
    });
  };

  // 表格列定义
  const columns = [
    {
      title: '选择',
      key: 'select',
      width: 60,
      render: (_: any, record: ScanEntity) => (
        <Switch
          checked={selectedRowKeys.includes(record.id)}
          onChange={(checked) => {
            if (checked) {
              setSelectedRowKeys([...selectedRowKeys, record.id]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.id));
            }
          }}
        />
      )
    },
    {
      title: '实体名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ScanEntity) => (
        <Space>
          {getEntityTypeIcon(record.type)}
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.schema && `${record.schema}.`}{text}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const typeMap = {
          table: { name: '表', color: 'blue' },
          view: { name: '视图', color: 'green' },
          procedure: { name: '存储过程', color: 'purple' },
          function: { name: '函数', color: 'orange' },
          api: { name: 'API', color: 'cyan' },
          file: { name: '文件', color: 'magenta' }
        };
        const config = typeMap[type as keyof typeof typeMap] || { name: type, color: 'default' };
        return <Tag color={config.color}>{config.name}</Tag>;
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '记录数',
      dataIndex: 'recordCount',
      key: 'recordCount',
      width: 100,
      render: (count: number) => count ? count.toLocaleString() : '-'
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 80
    },
    {
      title: '扫描时间',
      dataIndex: 'scanTime',
      key: 'scanTime',
      width: 150,
      render: (time: string) => (
        <Text style={{ fontSize: '12px' }}>{time}</Text>
      )
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: (_: any, record: ScanEntity) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewEntity(record)}
          >
            查看
          </Button>
        </Space>
      )
    }
  ];

  // 统计数据
  const getStatistics = () => {
    if (!scanTask) return { totalEntities: 0, selectedEntities: 0, tableCount: 0, viewCount: 0 };
    
    return {
      totalEntities: scanEntities.length,
      selectedEntities: selectedRowKeys.length,
      tableCount: scanEntities.filter(e => e.type === 'table').length,
      viewCount: scanEntities.filter(e => e.type === 'view').length
    };
  };

  if (!dataSource) {
    return <div>加载中...</div>;
  }

  return (
    <ScanDetailContainer>
      {/* 面包屑导航 */}
      <BreadcrumbContainer>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/system-settings/entity-scan')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '4px 8px',
                height: 'auto'
              }}
            >
              {t('menu:entityScan')}
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {dataSource.name}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbContainer>

      {/* 页面头部 */}
      <PageHeader>
        <PageHeaderContent>
          <Title level={2} style={{ margin: 0 }}>
            <Space>
              {getDataSourceIcon(dataSource.type, dataSource.subType)}
              {dataSource.name}
            </Space>
          </Title>
          <Paragraph style={{ margin: '8px 0 0 0', color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)' }}>
            {dataSource.description}
          </Paragraph>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadScanResults}
            disabled={isScanning}
          >
            刷新
          </Button>
          {scanTask?.status === 'running' ? (
            <Space>
              <Button
                icon={<PauseCircleOutlined />}
                onClick={handlePauseScan}
              >
                暂停
              </Button>
              <Button
                danger
                icon={<StopOutlined />}
                onClick={handleStopScan}
              >
                停止
              </Button>
            </Space>
          ) : (
            <Button
              type="primary"
              icon={<ScanOutlined />}
              onClick={handleStartScan}
              loading={isScanning}
            >
              开始扫描
            </Button>
          )}
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExportEntities}
            disabled={selectedRowKeys.length === 0}
          >
            导出实体
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* 扫描状态 */}
      {scanTask && (
        <Alert
          message={
            <Space>
              <Badge status={getStatusConfig(scanTask.status).color as any} />
              {getStatusConfig(scanTask.status).text}
              {scanTask.status === 'running' && (
                <Progress 
                  percent={Math.round(scanTask.progress)} 
                  size="small" 
                  style={{ width: 200, marginLeft: 16 }}
                />
              )}
            </Space>
          }
          description={
            <div>
              <Text>开始时间: {scanTask.startTime}</Text>
              {scanTask.endTime && (
                <>
                  <Divider type="vertical" />
                  <Text>结束时间: {scanTask.endTime}</Text>
                </>
              )}
              <Divider type="vertical" />
              <Text>发现实体: {scanTask.entityCount} 个</Text>
              {scanTask.errorCount > 0 && (
                <>
                  <Divider type="vertical" />
                  <Text type="danger">错误: {scanTask.errorCount} 个</Text>
                </>
              )}
            </div>
          }
          type={scanTask.status === 'failed' ? 'error' : scanTask.status === 'running' ? 'info' : 'success'}
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 统计数据 */}
      <StatsCard $isDark={isDark} title="扫描统计">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <StatItem $isDark={isDark}>
              <StatValue color="#1890ff">{getStatistics().totalEntities}</StatValue>
              <StatLabel $isDark={isDark}>发现实体</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={6}>
            <StatItem $isDark={isDark}>
              <StatValue color="#52c41a">{getStatistics().selectedEntities}</StatValue>
              <StatLabel $isDark={isDark}>已选择</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={6}>
            <StatItem $isDark={isDark}>
              <StatValue color="#722ed1">{getStatistics().tableCount}</StatValue>
              <StatLabel $isDark={isDark}>数据表</StatLabel>
            </StatItem>
          </Col>
          <Col xs={12} sm={6}>
            <StatItem $isDark={isDark}>
              <StatValue color="#fa8c16">{getStatistics().viewCount}</StatValue>
              <StatLabel $isDark={isDark}>视图</StatLabel>
            </StatItem>
          </Col>
        </Row>
      </StatsCard>

      {/* 实体列表 */}
      <ScanCard $isDark={isDark} title="扫描实体">
        <Table
          columns={columns}
          dataSource={scanEntities}
          loading={loading}
          rowKey="id"
          pagination={{
            total: scanEntities.length,
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
          }}
        />
      </ScanCard>
    </ScanDetailContainer>
  );
};

export default ScanDetail;
