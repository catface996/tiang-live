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
  App,
  Empty,
  Spin,
  Pagination
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
import mcpApi, { type McpServer, type McpStatistics } from '../../../services/mcpApi';
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
    padding: 20px;
  }
  
  &.mcp-stats-primary .ant-statistic-content {
    color: #1890ff;
  }
  
  &.mcp-stats-success .ant-statistic-content {
    color: #52c41a;
  }
  
  &.mcp-stats-warning .ant-statistic-content {
    color: #faad14;
  }
  
  &.mcp-stats-purple .ant-statistic-content {
    color: #722ed1;
  }
`;

const McpCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .title-left {
      flex: 1;
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

const McpManagement: React.FC = () => {
  const { t } = useTranslation(['mcp', 'common']);
  const { modal } = App.useApp();
  
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
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
  const [statsData, setStatsData] = useState<McpStatistics | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,  // 默认分页大小改为10
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    setPageTitle(t('mcp:title'));
    loadMcpData();
    loadStatsData();
  }, [t]);

  // 加载MCP服务器数据
  const loadMcpData = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        size: pagination.size,  // 参数名从pageSize改为size
        search: searchText || undefined,
        type: filterType !== 'all' ? filterType : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined
      };

      const response = await mcpApi.getServers(params);
      
      if (response.success) {
        // 适配实际的数据结构
        const pageData = response.data;
        setMcpData(pageData.data);  // 数据在data字段中，不是content
        setPagination({
          page: pageData.page,
          size: pageData.size,
          total: typeof pageData.total === 'string' ? parseInt(pageData.total) : pageData.total,
          totalPages: pageData.totalPages
        });
      } else {
        message.error(response.message || '获取MCP服务器列表失败');
        setMcpData([]);
        setPagination({
          page: 1,
          size: 10,  // 默认分页大小改为10
          total: 0,
          totalPages: 0
        });
      }
    } catch (error) {
      console.error('Failed to load MCP data:', error);
      message.error('获取MCP服务器列表失败');
      setMcpData([]);
      setPagination({
        page: 1,
        size: 10,  // 默认分页大小改为10
        total: 0,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // 加载统计数据
  const loadStatsData = async () => {
    try {
      setStatisticsLoading(true);
      const response = await mcpApi.getStatistics();
      
      if (response.success) {
        setStatsData(response.data);
      } else {
        message.error(response.message || '获取统计信息失败');
        setStatsData(null);
      }
    } catch (error) {
      console.error('Failed to load stats data:', error);
      setStatsData(null);
    } finally {
      setStatisticsLoading(false);
    }
  };

  // 刷新数据
  const handleRefresh = async () => {
    await Promise.all([loadMcpData(pagination.page), loadStatsData()]);
  };

  // 搜索和筛选变化时重新加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      loadMcpData(1); // 重置到第一页
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, filterType, filterStatus]);

  // 服务器操作方法
  const handleStartServer = async (server: McpServer) => {
    try {
      const response = await mcpApi.startServer(server.id);
      if (response.success) {
        message.success(`${server.name} 启动成功`);
        // 更新本地状态
        setMcpData(prev => prev.map(s => 
          s.id === server.id ? { ...s, status: 'starting' as const } : s
        ));
        // 延迟刷新数据以获取最新状态
        setTimeout(() => loadMcpData(pagination.page), 2000);
      } else {
        message.warning(response.message || '启动服务器功能暂不支持');
      }
    } catch (error) {
      console.error('Failed to start server:', error);
      message.warning('启动服务器功能暂不支持');
    }
  };

  const handleStopServer = async (server: McpServer) => {
    try {
      const response = await mcpApi.stopServer(server.id);
      if (response.success) {
        message.success(`${server.name} 停止成功`);
        // 更新本地状态
        setMcpData(prev => prev.map(s => 
          s.id === server.id ? { ...s, status: 'stopping' as const } : s
        ));
        // 延迟刷新数据以获取最新状态
        setTimeout(() => loadMcpData(pagination.page), 2000);
      } else {
        message.warning(response.message || '停止服务器功能暂不支持');
      }
    } catch (error) {
      console.error('Failed to stop server:', error);
      message.warning('停止服务器功能暂不支持');
    }
  };

  const handleRestartServer = async (server: McpServer) => {
    try {
      const response = await mcpApi.restartServer(server.id);
      if (response.success) {
        message.success(`${server.name} 重启成功`);
        // 更新本地状态
        setMcpData(prev => prev.map(s => 
          s.id === server.id ? { ...s, status: 'starting' as const } : s
        ));
        // 延迟刷新数据以获取最新状态
        setTimeout(() => loadMcpData(pagination.page), 3000);
      } else {
        message.warning(response.message || '重启服务器功能暂不支持');
      }
    } catch (error) {
      console.error('Failed to restart server:', error);
      message.warning('重启服务器功能暂不支持');
    }
  };

  const handleDeleteServer = async (server: McpServer) => {
    modal.confirm({
      title: t('mcp:deleteConfirm.title'),
      content: t('mcp:deleteConfirm.content', { name: server.name }),
      okText: t('common:confirm'),
      cancelText: t('common:cancel'),
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await mcpApi.deleteServer(server.id);
          if (response.success) {
            message.success(t('mcp:deleteSuccess'));
            await loadMcpData(pagination.page);
            await loadStatsData();
          } else {
            message.error(response.message || t('mcp:deleteFailed'));
          }
        } catch (error) {
          console.error('Failed to delete server:', error);
          message.error(t('mcp:deleteFailed'));
        }
      }
    });
  };

  const handleHealthCheck = async (server: McpServer) => {
    try {
      const response = await mcpApi.healthCheck(server.id);
      if (response.success) {
        const { healthy, responseTime, details } = response.data;
        if (healthy) {
          message.success(`${server.name} 健康检查通过 (${responseTime}ms)`);
        } else {
          message.warning(`${server.name} 健康检查异常`);
        }
      } else {
        message.warning(response.message || '健康检查功能暂不支持');
      }
    } catch (error) {
      console.error('Failed to perform health check:', error);
      message.warning('健康检查功能暂不支持');
    }
  };

  // 分页处理函数
  const handlePageChange = (page: number, pageSize?: number) => {
    const newSize = pageSize || pagination.size;
    setPagination(prev => ({
      ...prev,
      page,
      size: newSize
    }));
    loadMcpData(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPagination(prev => ({
      ...prev,
      page: 1,  // 改变页面大小时重置到第一页
      size
    }));
    loadMcpData(1);
  };

  const handleCreateServer = () => {
    setEditingServer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditServer = (server: McpServer) => {
    setEditingServer(server);
    form.setFieldsValue(server);
    setModalVisible(true);
  };

  const handleViewServer = (server: McpServer) => {
    setSelectedServer(server);
    setDetailModalVisible(true);
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'green';
      case 'stopped': return 'default';
      case 'error': return 'red';
      case 'starting': return 'blue';
      case 'stopping': return 'orange';
      default: return 'default';
    }
  };

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <DatabaseOutlined />;
      case 'file': return <CloudOutlined />;
      case 'api': return <ApiOutlined />;
      case 'email': return <RobotOutlined />;
      case 'scheduler': return <MonitorOutlined />;
      case 'custom': return <ExperimentOutlined />;
      default: return <SettingOutlined />;
    }
  };

  // 渲染服务器详情Modal
  const renderServerDetail = () => {
    if (!selectedServer) return null;

    return (
      <Modal
        title={
          <Space>
            {getTypeIcon(selectedServer.type)}
            <span>{selectedServer.name}</span>
            <Tag color={getStatusColor(selectedServer.status)}>
              {t(`mcp:status.${selectedServer.status}`)}
            </Tag>
          </Space>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            {t('common:close')}
          </Button>
        ]}
        width={800}
      >
        <Tabs
          items={[
            {
              key: 'basic',
              label: t('mcp:tabs.basicInfo'),
              children: (
                <Descriptions column={2} bordered>
                  <Descriptions.Item label={t('mcp:fields.name')}>
                    {selectedServer.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.type')}>
                    <Space>
                      {getTypeIcon(selectedServer.type)}
                      {t(`mcp:types.${selectedServer.type}`)}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.status')}>
                    <Tag color={getStatusColor(selectedServer.status)}>
                      {t(`mcp:status.${selectedServer.status}`)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.version')}>
                    {selectedServer.version}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.endpoint')}>
                    {selectedServer.endpoint}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.port')}>
                    {selectedServer.port}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.description')} span={2}>
                    {selectedServer.description}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:fields.capabilities')} span={2}>
                    <Space wrap>
                      {selectedServer.capabilities.map(cap => (
                        <Tag key={cap} color="blue">{cap}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              )
            },
            {
              key: 'metrics',
              label: t('mcp:tabs.metrics'),
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title={t('mcp:metrics.uptime')}
                      value={Math.floor(selectedServer.metrics.uptime / 3600)}
                      suffix={t('mcp:units.hours')}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t('mcp:metrics.requestCount')}
                      value={selectedServer.metrics.requestCount}
                      suffix={t('mcp:units.requests')}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t('mcp:metrics.errorCount')}
                      value={selectedServer.metrics.errorCount}
                      suffix={t('mcp:units.errors')}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t('mcp:metrics.avgResponseTime')}
                      value={selectedServer.metrics.avgResponseTime}
                      suffix={t('mcp:units.ms')}
                    />
                  </Col>
                </Row>
              )
            },
            {
              key: 'config',
              label: t('mcp:tabs.config'),
              children: (
                <Descriptions column={1} bordered>
                  <Descriptions.Item label={t('mcp:config.healthCheck')}>
                    <Tag color={selectedServer.healthCheck.enabled ? 'green' : 'red'}>
                      {selectedServer.healthCheck.enabled ? t('common:enabled') : t('common:disabled')}
                    </Tag>
                    {selectedServer.healthCheck.enabled && (
                      <Text type="secondary">
                        {t('mcp:config.interval')}: {selectedServer.healthCheck.interval}s, 
                        {t('mcp:config.timeout')}: {selectedServer.healthCheck.timeout}s, 
                        {t('mcp:config.retries')}: {selectedServer.healthCheck.retries}
                      </Text>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('mcp:config.other')}>
                    <pre>{JSON.stringify(selectedServer.config, null, 2)}</pre>
                  </Descriptions.Item>
                </Descriptions>
              )
            }
          ]}
        />
      </Modal>
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {t('mcp:title')}
            </Title>
          </div>
          <Space>
            <Button icon={<PlusOutlined />} type="primary" onClick={handleCreateServer}>
              {t('mcp:createServer')}
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading || statisticsLoading}>
              {t('common:refresh')}
            </Button>
          </Space>
        </div>
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>
          {t('mcp:description')}
        </Paragraph>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-primary">
            <Statistic
              title={t('mcp:stats.totalServers')}
              value={statsData?.totalServers || (Array.isArray(mcpData) ? mcpData.length : 0)}
              suffix={t('mcp:stats.unit')}
              prefix={<ThunderboltOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="mcp-stats-success">
            <Statistic
              title={t('mcp:stats.runningServers')}
              value={statsData?.runningServers || (Array.isArray(mcpData) ? mcpData.filter(s => s.status === 'running').length : 0)}
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
              suffix={t('mcp:units.ms')}
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
        onRefresh={handleRefresh}
      />

      {/* MCP服务器卡片列表 */}
      <Spin spinning={loading}>
        {Array.isArray(mcpData) && mcpData.length > 0 ? (
          <Row gutter={[16, 16]}>
            {mcpData.map(server => (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={server.id}>
                <McpCard
                  title={
                    <div className="card-title">
                      <div className="title-left">
                        <Space>
                          {getTypeIcon(server.type)}
                          <span>{server.name}</span>
                        </Space>
                      </div>
                      <div className="title-right">
                        <Tag color={getStatusColor(server.status)}>
                          {t(`mcp:status.${server.status}`)}
                        </Tag>
                      </div>
                    </div>
                  }
                  onClick={() => handleViewServer(server)}
                >
                  <div>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 12 }}>
                      {server.description}
                    </Paragraph>
                    
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <Text type="secondary">{t('mcp:fields.endpoint')}: </Text>
                        <Text code>{server.endpoint}:{server.port}</Text>
                      </div>
                      <div>
                        <Text type="secondary">{t('mcp:fields.version')}: </Text>
                        <Tag color="blue">{server.version}</Tag>
                      </div>
                      <div>
                        <Text type="secondary">{t('mcp:fields.capabilities')}: </Text>
                        <Space wrap>
                          {server.capabilities.slice(0, 3).map(cap => (
                            <Tag key={cap} size="small">{cap}</Tag>
                          ))}
                          {server.capabilities.length > 3 && (
                            <Tag size="small">+{server.capabilities.length - 3}</Tag>
                          )}
                        </Space>
                      </div>
                    </Space>

                    <div className="card-actions">
                      <Space>
                        <Tooltip title={t('mcp:actions.view')}>
                          <Button 
                            size="small" 
                            icon={<EyeOutlined />} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewServer(server);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={t('mcp:actions.edit')}>
                          <Button 
                            size="small" 
                            icon={<EditOutlined />} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditServer(server);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={t('mcp:actions.healthCheck')}>
                          <Button 
                            size="small" 
                            icon={<CheckCircleOutlined />} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHealthCheck(server);
                            }}
                          />
                        </Tooltip>
                        {server.status === 'running' ? (
                          <Tooltip title={t('mcp:actions.stop')}>
                            <Button 
                              size="small" 
                              icon={<PauseCircleOutlined />} 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStopServer(server);
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title={t('mcp:actions.start')}>
                            <Button 
                              size="small" 
                              icon={<PlayCircleOutlined />} 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartServer(server);
                              }}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title={t('mcp:actions.restart')}>
                          <Button 
                            size="small" 
                            icon={<SyncOutlined />} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestartServer(server);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={t('mcp:actions.delete')}>
                          <Button 
                            size="small" 
                            icon={<DeleteOutlined />} 
                            danger
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteServer(server);
                            }}
                          />
                        </Tooltip>
                      </Space>
                    </div>
                  </div>
                </McpCard>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            background: 'var(--bg-container)',
            borderRadius: '8px',
            border: '1px solid var(--border-light)'
          }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {searchText || filterType !== 'all' || filterStatus !== 'all' 
                      ? t('mcp:empty.noResults') 
                      : t('mcp:empty.noServers')
                    }
                  </Text>
                  <div style={{ marginTop: '12px' }}>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {searchText || filterType !== 'all' || filterStatus !== 'all'
                        ? t('mcp:empty.tryDifferentFilters')
                        : t('mcp:empty.createFirstServer')
                      }
                    </Text>
                  </div>
                </div>
              }
            >
              {(!searchText && filterType === 'all' && filterStatus === 'all') && (
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleCreateServer}
                  size="large"
                >
                  {t('mcp:createServer')}
                </Button>
              )}
            </Empty>
          </div>
        )}
      </Spin>

      {/* 分页组件 */}
      {Array.isArray(mcpData) && mcpData.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '24px',
          padding: '16px 0'
        }}>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.size}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} / ${total} ${t('mcp:stats.unit')}`
            }
            pageSizeOptions={['10', '20', '50', '100']}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            size="default"
          />
        </div>
      )}

      {/* 服务器详情Modal */}
      {renderServerDetail()}
    </PageContainer>
  );
};

export default McpManagement;
