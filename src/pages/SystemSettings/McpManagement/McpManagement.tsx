import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Statistic,
  Tag,
  Modal,
  Form,
  Tabs,
  Descriptions,
  Tooltip,
  message,
  App
} from 'antd';
import {
  SettingOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloudOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  MonitorOutlined,
  RobotOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import '../../../styles/mcp-management.css';

const { Title, Paragraph, Text } = Typography;

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const StatsCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const McpCard = styled(Card)`
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;

    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }

    .ant-card-extra {
      padding: 0;
    }
  }

  .ant-card-body {
    padding: 16px;
  }

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .title-left {
      flex: 1;
      min-width: 0;
    }

    .title-right {
      margin-left: 8px;
    }
  }

  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    text-align: right;
  }
`;

// MCP Server 数据类型定义
interface McpServer {
  id: string;
  name: string;
  description: string;
  type: 'database' | 'file' | 'api' | 'email' | 'scheduler' | 'custom';
  status: 'running' | 'stopped' | 'error' | 'starting' | 'stopping';
  version: string;
  endpoint: string;
  port: number;
  capabilities: string[];
  config: {
    [key: string]: any;
  };
  healthCheck: {
    enabled: boolean;
    interval: number;
    timeout: number;
    retries: number;
  };
  metrics: {
    uptime: number;
    requestCount: number;
    errorCount: number;
    avgResponseTime: number;
    lastHeartbeat: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const McpManagement: React.FC = () => {
  const { t } = useTranslation(['mcp', 'common']);
  const { modal } = App.useApp();
  
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingServer, setEditingServer] = useState<McpServer | null>(null);
  const [selectedServer, setSelectedServer] = useState<McpServer | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  
  // 真实数据状态
  const [mcpData, setMcpData] = useState<McpServer[]>([]);
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    setPageTitle(t('mcp:title'));
    loadMcpData();
    loadStatsData();
  }, [t]);

  // 加载MCP服务器数据
  const loadMcpData = async () => {
    try {
      setLoading(true);
      // TODO: 替换为真实API调用
      const mockData: McpServer[] = [
        {
          id: '1',
          name: 'Database MCP Server',
          description: '数据库连接和查询服务',
          type: 'database',
          status: 'running',
          version: '1.2.0',
          endpoint: 'http://localhost:3001',
          port: 3001,
          capabilities: ['mysql', 'postgresql', 'mongodb', 'query', 'transaction'],
          config: {
            maxConnections: 100,
            timeout: 30000,
            ssl: true
          },
          healthCheck: {
            enabled: true,
            interval: 30,
            timeout: 5,
            retries: 3
          },
          metrics: {
            uptime: 86400,
            requestCount: 1250,
            errorCount: 5,
            avgResponseTime: 120,
            lastHeartbeat: new Date().toISOString()
          },
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: new Date().toISOString(),
          createdBy: 'admin'
        },
        {
          id: '2',
          name: 'File System MCP Server',
          description: '文件系统操作服务',
          type: 'file',
          status: 'running',
          version: '1.1.5',
          endpoint: 'http://localhost:3002',
          port: 3002,
          capabilities: ['read', 'write', 'delete', 'search', 'upload'],
          config: {
            basePath: '/data',
            maxFileSize: '100MB',
            allowedExtensions: ['.txt', '.json', '.csv', '.xlsx']
          },
          healthCheck: {
            enabled: true,
            interval: 60,
            timeout: 10,
            retries: 2
          },
          metrics: {
            uptime: 72000,
            requestCount: 890,
            errorCount: 2,
            avgResponseTime: 85,
            lastHeartbeat: new Date().toISOString()
          },
          createdAt: '2024-01-20T14:30:00Z',
          updatedAt: new Date().toISOString(),
          createdBy: 'admin'
        }
      ];
      
      setMcpData(mockData);
    } catch (error) {
      console.error('加载MCP服务器数据失败:', error);
      message.error(t('mcp:errors.loadDataFailed'));
    } finally {
      setLoading(false);
    }
  };

  // 加载统计数据
  const loadStatsData = async () => {
    try {
      // TODO: 替换为真实API调用
      const mockStats = {
        totalServers: 5,
        runningServers: 4,
        stoppedServers: 1,
        errorServers: 0,
        totalRequests: 2140,
        avgResponseTime: 102,
        uptime: 99.8
      };
      
      setStatsData(mockStats);
    } catch (error) {
      console.error('加载统计数据失败:', error);
    }
  };

  return (
    <PageContainer className="mcp-management-page">
      <PageHeader>
        {/* Title和按钮在同一行 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title className="page-title" level={2} style={{ margin: 0 }}>
            <Space>
              <ThunderboltOutlined />
              {t('mcp:title')}
            </Space>
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={loadMcpData} loading={loading}>
              {t('common:refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              {t('mcp:createServer')}
            </Button>
          </Space>
        </div>
        <Paragraph className="page-subtitle">
          {t('mcp:subtitle')}
        </Paragraph>
      </PageHeader>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-primary">
            <Statistic
              title={t('mcp:stats.totalServers')}
              value={statsData?.totalServers || mcpData.length}
              suffix={t('mcp:stats.unit')}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-success">
            <Statistic
              title={t('mcp:stats.runningServers')}
              value={statsData?.runningServers || mcpData.filter(s => s.status === 'running').length}
              suffix={t('mcp:stats.unit')}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-warning">
            <Statistic
              title={t('mcp:stats.totalRequests')}
              value={statsData?.totalRequests || 0}
              suffix={t('mcp:stats.requestUnit')}
              prefix={<ApiOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-purple">
            <Statistic
              title={t('mcp:stats.avgResponseTime')}
              value={statsData?.avgResponseTime || 0}
              suffix="ms"
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <SearchFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('mcp:search.placeholder')}
        filters={[
          {
            key: 'type',
            label: t('mcp:filters.type'),
            value: filterType,
            onChange: setFilterType,
            options: [
              { label: t('common:all'), value: 'all' },
              { label: t('mcp:types.database'), value: 'database' },
              { label: t('mcp:types.file'), value: 'file' },
              { label: t('mcp:types.api'), value: 'api' },
              { label: t('mcp:types.email'), value: 'email' },
              { label: t('mcp:types.scheduler'), value: 'scheduler' },
              { label: t('mcp:types.custom'), value: 'custom' }
            ]
          },
          {
            key: 'status',
            label: t('mcp:filters.status'),
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: t('common:all'), value: 'all' },
              { label: t('mcp:status.running'), value: 'running' },
              { label: t('mcp:status.stopped'), value: 'stopped' },
              { label: t('mcp:status.error'), value: 'error' }
            ]
          }
        ]}
        onRefresh={loadMcpData}
      />

      {/* MCP服务器卡片列表 */}
      <Row gutter={[16, 16]}>
        {mcpData.map(server => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} key={server.id}>
            <McpCard
              title={
                <div className="card-title">
                  <div className="title-left">
                    <Space>
                      <ThunderboltOutlined />
                      <span>{server.name}</span>
                    </Space>
                  </div>
                  <div className="title-right">
                    <Tag color={server.status === 'running' ? 'green' : server.status === 'error' ? 'red' : 'orange'}>
                      {t(`mcp:status.${server.status}`)}
                    </Tag>
                  </div>
                </div>
              }
              onClick={() => {
                setSelectedServer(server);
                setDetailModalVisible(true);
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <Space wrap>
                  <Tag color="blue" icon={<DatabaseOutlined />}>
                    {t(`mcp:types.${server.type}`)}
                  </Tag>
                  <Tag color="purple">
                    v{server.version}
                  </Tag>
                </Space>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {server.description}
                </Text>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Space wrap>
                  {(server.capabilities || []).slice(0, 3).map(cap => (
                    <Tag key={cap} size="small">
                      {cap}
                    </Tag>
                  ))}
                  {(server.capabilities?.length || 0) > 3 && (
                    <Tag size="small">+{(server.capabilities?.length || 0) - 3}</Tag>
                  )}
                </Space>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {t('mcp:metrics.requests')}: {server.metrics?.requestCount || 0}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {t('mcp:metrics.avgTime')}: {server.metrics?.avgResponseTime || 0}ms
                    </Text>
                  </Col>
                </Row>
              </div>

              {/* 操作按钮区域 */}
              <div className="card-actions">
                <Space>
                  <Tooltip title={t('mcp:viewDetails')}>
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSelectedServer(server);
                        setDetailModalVisible(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={t('common:edit')}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        setEditingServer(server);
                        setModalVisible(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={server.status === 'running' ? t('mcp:stop') : t('mcp:start')}>
                    <Button
                      type="text"
                      icon={server.status === 'running' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        // TODO: 实现启动/停止功能
                        message.info(t('mcp:operationInProgress'));
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={t('common:delete')}>
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        modal.confirm({
                          title: t('mcp:delete.confirmTitle'),
                          content: t('mcp:delete.confirmContent'),
                          okText: t('common:delete'),
                          okType: 'danger',
                          cancelText: t('common:cancel'),
                          onOk: async () => {
                            try {
                              // TODO: 调用删除API
                              message.success(t('mcp:alerts.deleteSuccess'));
                              await loadMcpData();
                            } catch (error: any) {
                              message.error(`${t('mcp:alerts.deleteError')}: ${error.message}`);
                            }
                          }
                        });
                      }}
                    />
                  </Tooltip>
                </Space>
              </div>
            </McpCard>
          </Col>
        ))}
      </Row>

      {/* TODO: 添加创建/编辑模态框 */}
      {/* TODO: 添加详情模态框 */}
    </PageContainer>
  );
};

export default McpManagement;
