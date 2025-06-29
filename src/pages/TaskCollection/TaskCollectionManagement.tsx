import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Row, 
  Col, 
  Statistic,
  Badge,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Tabs,
  Descriptions,
  Progress,
  Tooltip,
  message,
  Alert
} from 'antd';
import { 
  UnorderedListOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  NodeIndexOutlined,
  ControlOutlined,
  HeartOutlined,
  BugOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  MonitorOutlined,
  LineChartOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setPageTitle } from '../../utils';
import SearchFilterBar from '../../components/Common/SearchFilterBar';
import '../../styles/task-collection-management.css';
// 导入mock数据
import taskCollectionMockData from '../../data/taskCollectionData.json';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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
  
  .ant-statistic {
    .ant-statistic-title {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .ant-statistic-content {
      font-size: 20px;
      font-weight: 600;
    }
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 12px;
    }
    
    .ant-statistic {
      .ant-statistic-title {
        font-size: 11px;
      }
      
      .ant-statistic-content {
        font-size: 18px;
      }
    }
  }
`;

const TaskCard = styled(Card)`
  height: 100%;
  min-height: 450px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-head {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    .ant-card-head-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.4;
      width: 100%;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .ant-card-body {
    padding: 20px;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-tags {
    margin-bottom: 16px;
    min-height: 32px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .card-description {
    flex: 1;
    margin-bottom: 16px;
    min-height: 48px;
    display: flex;
    align-items: flex-start;
  }
  
  .card-stats {
    margin-bottom: 16px;
    
    .ant-statistic {
      .ant-statistic-title {
        font-size: 11px;
        color: #666;
        margin-bottom: 4px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .ant-statistic-content {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
      }
    }
  }
  
  .card-progress {
    margin-bottom: 16px;
  }
  
  .card-footer {
    margin-top: auto;
    padding-top: 12px;
    font-size: 12px;
    color: #999;
    
    .footer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .footer-label {
        flex-shrink: 0;
        margin-right: 8px;
      }
      
      .footer-value {
        flex: 1;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: #666;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }
  
  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 420px;
    
    .ant-card-head {
      padding: 12px 16px;
      
      .ant-card-head-title {
        font-size: 14px;
      }
    }
    
    .ant-card-body {
      padding: 16px;
    }
    
    .card-stats {
      .ant-statistic {
        .ant-statistic-title {
          font-size: 10px;
        }
        
        .ant-statistic-content {
          font-size: 16px;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    min-height: 400px;
    
    .card-stats {
      .ant-row {
        .ant-col {
          margin-bottom: 8px;
        }
      }
    }
  }
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

interface InspectionAction {
  id: string;
  name: string;
  type: 'health_check' | 'fault_analysis' | 'performance_analysis' | 'security_scan';
  description: string;
  duration: string;
  frequency: string;
}

interface TaskTarget {
  id: string;
  name: string;
  type: 'entity' | 'sequence';
  category: string;
  actions: string[]; // InspectionAction IDs
}

interface TaskCollection {
  id: string;
  name: string;
  description: string;
  targets: TaskTarget[];
  status: 'active' | 'paused' | 'draft';
  schedule: string;
  lastRun: string;
  nextRun: string;
  successRate: number;
  totalRuns: number;
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const TaskCollectionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskCollection | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskCollection | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [form] = Form.useForm();
  const { t } = useTranslation(['tasks', 'common']);
  const navigate = useNavigate();

  // 新增状态：实体和动作选择
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [selectedSequences, setSelectedSequences] = useState<string[]>([]);
  const [entityActions, setEntityActions] = useState<Record<string, string[]>>({});
  const [sequenceActions, setSequenceActions] = useState<Record<string, string[]>>({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setPageTitle(t('tasks:collections.title'));
  }, [t]);

  // 巡检动作定义
  const inspectionActions: InspectionAction[] = [
    {
      id: 'health_check',
      name: t('tasks:collections.actions.healthCheck'),
      type: 'health_check',
      description: t('tasks:collections.actionDescriptions.healthCheck'),
      duration: t('tasks:collections.duration.healthCheck'),
      frequency: t('tasks:collections.frequency.every5min')
    },
    {
      id: 'fault_analysis',
      name: t('tasks:collections.actions.faultAnalysis'),
      type: 'fault_analysis',
      description: t('tasks:collections.actionDescriptions.faultAnalysis'),
      duration: t('tasks:collections.duration.faultAnalysis'),
      frequency: t('tasks:collections.frequency.every30min')
    },
    {
      id: 'performance_analysis',
      name: t('tasks:collections.actions.performanceAnalysis'),
      type: 'performance_analysis',
      description: t('tasks:collections.actionDescriptions.performanceAnalysis'),
      duration: t('tasks:collections.duration.performanceAnalysis'),
      frequency: t('tasks:collections.frequency.hourly')
    },
    {
      id: 'security_scan',
      name: t('tasks:collections.actions.securityScan'),
      type: 'security_scan',
      description: t('tasks:collections.actionDescriptions.securityScan'),
      duration: t('tasks:collections.duration.securityScan'),
      frequency: t('tasks:collections.frequency.daily')
    }
  ];

  // 可选的实体和时序
  const availableEntities = [
    { id: 'user_service', name: '用户服务', category: '微服务' },
    { id: 'order_service', name: '订单服务', category: '微服务' },
    { id: 'payment_service', name: '支付服务', category: '微服务' },
    { id: 'product_service', name: '商品服务', category: '微服务' },
    { id: 'inventory_service', name: '库存服务', category: '微服务' },
    { id: 'notification_service', name: '通知服务', category: '微服务' },
    { id: 'mysql_master', name: 'MySQL主库', category: '数据库' },
    { id: 'mysql_slave', name: 'MySQL从库', category: '数据库' },
    { id: 'redis_cluster', name: 'Redis集群', category: '缓存' },
    { id: 'mongodb_cluster', name: 'MongoDB集群', category: '文档数据库' },
    { id: 'elasticsearch', name: 'Elasticsearch', category: '搜索引擎' },
    { id: 'rabbitmq_cluster', name: 'RabbitMQ集群', category: '消息队列' },
    { id: 'kafka_cluster', name: 'Kafka集群', category: '流处理' },
    { id: 'nginx_ingress', name: 'Nginx Ingress', category: '负载均衡' },
    { id: 'api_gateway', name: 'API网关', category: '网关服务' },
    { id: 'web_app', name: 'Web应用', category: '前端应用' },
    { id: 'mobile_app', name: '移动端应用', category: '移动应用' },
    { id: 'cdn_nodes', name: 'CDN节点', category: '内容分发' },
    { id: 'alipay_api', name: '支付宝接口', category: '第三方API' },
    { id: 'wechat_pay_api', name: '微信支付接口', category: '第三方API' },
    { id: 'sms_service', name: '短信服务接口', category: '第三方API' },
    { id: 'ai_recommendation', name: '推荐算法服务', category: 'AI服务' },
    { id: 'ai_image_recognition', name: '图像识别服务', category: 'AI服务' },
    { id: 'ai_nlp', name: '自然语言处理服务', category: 'AI服务' },
    { id: 'backup_system', name: '备份系统', category: '备份系统' },
    { id: 'elk_cluster', name: 'ELK集群', category: '日志系统' },
    { id: 'core_switch', name: '核心交换机', category: '网络设备' },
    { id: 'firewall', name: '防火墙', category: '安全设备' },
    { id: 'load_balancer', name: '负载均衡器', category: '负载均衡' }
  ];

  const availableSequences = [
    { id: 'user_login_flow', name: '用户登录流程', category: '认证时序' },
    { id: 'user_register_flow', name: '用户注册流程', category: '认证时序' },
    { id: 'order_create_flow', name: '订单创建流程', category: '业务时序' },
    { id: 'order_payment_flow', name: '订单支付流程', category: '业务时序' },
    { id: 'order_fulfillment_flow', name: '订单履约流程', category: '业务时序' },
    { id: 'payment_process_flow', name: '支付处理流程', category: '支付时序' },
    { id: 'refund_process_flow', name: '退款处理流程', category: '支付时序' },
    { id: 'inventory_update_flow', name: '库存更新流程', category: '库存时序' },
    { id: 'product_sync_flow', name: '商品同步流程', category: '同步时序' },
    { id: 'data_backup_flow', name: '数据备份流程', category: '备份时序' },
    { id: 'log_analysis_flow', name: '日志分析流程', category: '分析时序' },
    { id: 'health_check_flow', name: '健康检查流程', category: '监控时序' },
    { id: 'alert_notification_flow', name: '告警通知流程', category: '通知时序' },
    { id: 'ai_inference_flow', name: 'AI推理流程', category: 'AI时序' },
    { id: 'message_processing_flow', name: '消息处理流程', category: '消息时序' }
  ];

  // 从JSON文件获取任务集合数据
  const taskCollectionData: TaskCollection[] = taskCollectionMockData.taskCollections;

  const actionTypeMap = {
    health_check: { name: '健康检查', color: 'green', icon: <HeartOutlined /> },
    fault_analysis: { name: '故障分析', color: 'red', icon: <BugOutlined /> },
    performance_analysis: { name: '性能分析', color: 'blue', icon: <BarChartOutlined /> },
    security_scan: { name: '安全扫描', color: 'orange', icon: <SafetyCertificateOutlined /> }
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'green', text: t('tasks:collections.status.active') },
      paused: { color: 'orange', text: t('tasks:collections.status.paused') },
      draft: { color: 'gray', text: t('tasks:collections.status.draft') }
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    form.resetFields();
    setSelectedEntities([]);
    setSelectedSequences([]);
    setEntityActions({});
    setSequenceActions({});
    setCurrentStep(0);
    setModalVisible(true);
  };

  const handleEditTask = (task: TaskCollection) => {
    setEditingTask(task);
    form.setFieldsValue({
      name: task.name,
      description: task.description,
      schedule: task.schedule
    });
    
    // 设置已选择的实体和时序
    const entities = task.targets.filter(t => t.type === 'entity').map(t => t.id);
    const sequences = task.targets.filter(t => t.type === 'sequence').map(t => t.id);
    setSelectedEntities(entities);
    setSelectedSequences(sequences);
    
    // 设置动作配置
    const entityActionsMap: Record<string, string[]> = {};
    const sequenceActionsMap: Record<string, string[]> = {};
    
    task.targets.forEach(target => {
      if (target.type === 'entity') {
        entityActionsMap[target.id] = target.actions;
      } else {
        sequenceActionsMap[target.id] = target.actions;
      }
    });
    
    setEntityActions(entityActionsMap);
    setSequenceActions(sequenceActionsMap);
    setCurrentStep(0);
    setModalVisible(true);
  };

  // 处理实体选择
  const handleEntitySelect = (entityIds: string[]) => {
    setSelectedEntities(entityIds);
    
    // 移除未选中实体的动作配置
    const newEntityActions = { ...entityActions };
    Object.keys(newEntityActions).forEach(entityId => {
      if (!entityIds.includes(entityId)) {
        delete newEntityActions[entityId];
      }
    });
    setEntityActions(newEntityActions);
  };

  // 处理时序选择
  const handleSequenceSelect = (sequenceIds: string[]) => {
    setSelectedSequences(sequenceIds);
    
    // 移除未选中时序的动作配置
    const newSequenceActions = { ...sequenceActions };
    Object.keys(newSequenceActions).forEach(sequenceId => {
      if (!sequenceIds.includes(sequenceId)) {
        delete newSequenceActions[sequenceId];
      }
    });
    setSequenceActions(newSequenceActions);
  };

  // 处理实体动作配置
  const handleEntityActionChange = (entityId: string, actions: string[]) => {
    setEntityActions(prev => ({
      ...prev,
      [entityId]: actions
    }));
  };

  // 处理时序动作配置
  const handleSequenceActionChange = (sequenceId: string, actions: string[]) => {
    setSequenceActions(prev => ({
      ...prev,
      [sequenceId]: actions
    }));
  };

  // 下一步
  const handleNextStep = () => {
    if (currentStep === 0) {
      // 验证基本信息
      form.validateFields(['name', 'description', 'schedule']).then(() => {
        setCurrentStep(1);
      }).catch(() => {
        message.error('请完善基本信息');
      });
    } else if (currentStep === 1) {
      // 验证是否选择了目标
      if (selectedEntities.length === 0 && selectedSequences.length === 0) {
        message.error('请至少选择一个监控目标');
        return;
      }
      setCurrentStep(2);
    }
  };

  // 上一步
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleViewTask = (task: TaskCollection) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  const handleViewRunDetail = (taskId: string) => {
    // 模拟生成运行ID，实际应该从API获取最新的运行记录
    const runId = `run_${taskId}_${Date.now()}`;
    navigate(`/task-management/task-collections/run/${runId}`);
  };

  const handleViewExecutionHistory = (taskId: string) => {
    navigate(`/task-management/task-collections/history/${taskId}`);
  };

  const handleStartTask = (taskId: string) => {
    message.success(t('tasks:collections.messages.startSuccess'));
  };

  const handlePauseTask = (taskId: string) => {
    message.success(t('tasks:collections.messages.pauseSuccess'));
  };

  const handleDeleteTask = (taskId: string) => {
    message.success(t('tasks:collections.messages.deleteSuccess'));
  };

  const handleModalOk = async () => {
    try {
      if (currentStep < 2) {
        handleNextStep();
        return;
      }

      // 验证动作配置
      const allTargets = [...selectedEntities, ...selectedSequences];
      const hasUnConfiguredActions = allTargets.some(targetId => {
        const actions = selectedEntities.includes(targetId) 
          ? entityActions[targetId] 
          : sequenceActions[targetId];
        return !actions || actions.length === 0;
      });

      if (hasUnConfiguredActions) {
        message.error('请为所有选中的目标配置至少一个检查动作');
        return;
      }

      const values = await form.validateFields();
      
      // 构建目标数据
      const targets = [
        ...selectedEntities.map(entityId => {
          const entity = availableEntities.find(e => e.id === entityId);
          return {
            id: entityId,
            name: entity?.name || '',
            type: 'entity' as const,
            category: entity?.category || '',
            actions: entityActions[entityId] || []
          };
        }),
        ...selectedSequences.map(sequenceId => {
          const sequence = availableSequences.find(s => s.id === sequenceId);
          return {
            id: sequenceId,
            name: sequence?.name || '',
            type: 'sequence' as const,
            category: sequence?.category || '',
            actions: sequenceActions[sequenceId] || []
          };
        })
      ];

      console.log('创建任务集合:', {
        ...values,
        targets,
        status: 'draft'
      });

      if (editingTask) {
        message.success(t('tasks:collections.messages.updateSuccess'));
      } else {
        message.success(t('tasks:collections.messages.createSuccess'));
      }
      
      setModalVisible(false);
      form.resetFields();
      setSelectedEntities([]);
      setSelectedSequences([]);
      setEntityActions({});
      setSequenceActions({});
      setCurrentStep(0);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderTaskCards = () => {
    return taskCollectionData.map(task => {
      const entityCount = task.targets.filter(t => t.type === 'entity').length;
      const sequenceCount = task.targets.filter(t => t.type === 'sequence').length;
      const totalActions = task.targets.reduce((sum, t) => sum + t.actions.length, 0);

      return (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={task.id}>
          <TaskCard
            title={
              <div className="card-title">
                <div className="title-left">
                  <Space>
                    <UnorderedListOutlined style={{ color: '#1890ff' }} />
                    <span>{task.name}</span>
                  </Space>
                </div>
                <div className="title-right">
                  {getStatusTag(task.status)}
                </div>
              </div>
            }
            onClick={() => handleViewTask(task)}
          >
            <div className="card-content">
              {/* 标签区域 */}
              <div className="card-tags">
                <Tag icon={<NodeIndexOutlined />} color="blue">
                  {entityCount}{t('tasks:collections.card.entities')}
                </Tag>
                <Tag icon={<ControlOutlined />} color="green">
                  {sequenceCount}{t('tasks:collections.card.sequences')}
                </Tag>
                <Tag icon={<MonitorOutlined />} color="orange">
                  {totalActions}{t('tasks:collections.card.actions')}
                </Tag>
              </div>
              
              {/* 描述区域 */}
              <div className="card-description">
                <Paragraph 
                  ellipsis={{ rows: 2, tooltip: task.description }} 
                  style={{ margin: 0, color: '#666', lineHeight: '1.5' }}
                >
                  {task.description}
                </Paragraph>
              </div>

              {/* 统计数据 */}
              <div className="card-stats">
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Statistic
                      title={t('tasks:collections.card.successRate')}
                      value={task.successRate}
                      suffix="%"
                      valueStyle={{ fontSize: 18, color: task.successRate > 95 ? '#52c41a' : '#faad14' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t('tasks:collections.card.executionCount')}
                      value={task.totalRuns}
                      valueStyle={{ fontSize: 18, color: '#1890ff' }}
                    />
                  </Col>
                </Row>
              </div>

              {/* 进度条 */}
              <div className="card-progress">
                <Text strong style={{ fontSize: 12, color: '#666' }}>
                  {t('tasks:collections.card.successRate')}: 
                </Text>
                <Progress 
                  percent={task.successRate} 
                  size="small"
                  strokeColor={task.successRate > 95 ? '#52c41a' : '#faad14'}
                  style={{ marginTop: 4 }}
                />
              </div>

              {/* 底部信息 */}
              <div className="card-footer">
                <div className="footer-item">
                  <span className="footer-label">{t('tasks:collections.card.schedule')}</span>
                  <span className="footer-value">{task.schedule}</span>
                </div>
                <div className="footer-item">
                  <span className="footer-label">{t('tasks:collections.card.nextExecution')}</span>
                  <span className="footer-value">{task.nextRun}</span>
                </div>
                <div className="footer-item">
                  <span className="footer-label">{t('tasks:collections.card.creator')}</span>
                  <span className="footer-value">{task.createdBy}</span>
                </div>
              </div>
              
              {/* 操作按钮区域 - 单独一行 */}
              <div className="card-actions">
                <Space>
                  <Tooltip title={t('tasks:collections.card.viewExecutionHistory')}>
                    <Button 
                      type="text" 
                      icon={<CalendarOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewExecutionHistory(task.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="查看运行详情">
                    <Button 
                      type="text" 
                      icon={<LineChartOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewRunDetail(task.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={t('tasks:collections.card.viewDetails')}>
                    <Button 
                      type="text" 
                      icon={<EyeOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewTask(task);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={t('tasks:collections.card.edit')}>
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTask(task);
                      }}
                    />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </TaskCard>
        </Col>
      );
    });
  };

  const activeTasks = taskCollectionData.filter(task => task.status === 'active').length;
  const totalTargets = taskCollectionData.reduce((sum, task) => sum + task.targets.length, 0);
  const totalActions = taskCollectionData.reduce((sum, task) => 
    sum + task.targets.reduce((actionSum, target) => actionSum + target.actions.length, 0), 0
  );
  const avgSuccessRate = taskCollectionData.reduce((sum, task) => sum + task.successRate, 0) / taskCollectionData.length;

  return (
    <PageContainer className="task-collection-management-page">
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <UnorderedListOutlined style={{ color: '#1890ff' }} />
                {t('tasks:collections.title')}
              </Space>
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0, fontSize: 16 }}>
              {t('tasks:collections.subtitle')}
            </Paragraph>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {t('tasks:collections.refresh')}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTask}>
              {t('tasks:collections.createCollection')}
            </Button>
          </Space>
        </div>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="collection-stats-primary">
            <Statistic
              title={t('tasks:collections.stats.totalCollections')}
              value={taskCollectionData.length}
              suffix={t('common:unit.count')}
              prefix={<UnorderedListOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="collection-stats-success">
            <Statistic
              title={t('tasks:collections.stats.activeCollections')}
              value={activeTasks}
              suffix={t('common:unit.count')}
              prefix={<PlayCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="collection-stats-warning">
            <Statistic
              title={t('tasks:collections.stats.totalTasks')}
              value={totalTargets}
              suffix={t('common:unit.count')}
              prefix={<MonitorOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StatsCard className="collection-stats-purple">
            <Statistic
              title={t('tasks:collections.stats.executionRate')}
              value={avgSuccessRate.toFixed(1)}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={t('tasks:collections.search.placeholder')}
        filters={[
          {
            key: 'status',
            value: filterStatus,
            onChange: setFilterStatus,
            placeholder: t('tasks:collections.filter.status'),
            width: 100,
            options: [
              { value: 'all', label: t('tasks:collections.filter.allStatus') },
              { value: 'active', label: t('tasks:collections.status.active') },
              { value: 'paused', label: t('tasks:collections.status.paused') },
              { value: 'draft', label: t('tasks:collections.status.draft') }
            ]
          },
          {
            key: 'frequency',
            value: filterFrequency,
            onChange: setFilterFrequency,
            placeholder: t('tasks:collections.filter.frequency'),
            width: 120,
            options: [
              { value: 'all', label: t('tasks:collections.filter.allFrequency') },
              { value: '5min', label: t('tasks:collections.frequency.every5min') },
              { value: '15min', label: t('tasks:collections.frequency.every15min') },
              { value: '1hour', label: t('tasks:collections.frequency.everyHour') },
              { value: '1day', label: t('tasks:collections.frequency.everyDay') }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 任务集合卡片列表 */}
      <Row gutter={[20, 20]}>
        {renderTaskCards()}
      </Row>

      {/* 创建/编辑任务集合模态框 */}
      <Modal
        title={editingTask ? t('tasks:collections.editTitle') : t('tasks:collections.createTitle')}
        open={modalVisible}
        onOk={handleModalOk}
        width={1000}
        okText={currentStep < 2 ? '下一步' : (editingTask ? '更新' : '创建')}
        cancelText={currentStep > 0 ? '上一步' : '取消'}
        onCancel={() => {
          if (currentStep > 0) {
            handlePrevStep();
          } else {
            setModalVisible(false);
            setCurrentStep(0);
            setSelectedEntities([]);
            setSelectedSequences([]);
            setEntityActions({});
            setSequenceActions({});
          }
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: currentStep >= 0 ? '#1890ff' : '#d9d9d9',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold'
            }}>1</div>
            <div style={{ 
              flex: 1, 
              height: 2, 
              backgroundColor: currentStep >= 1 ? '#1890ff' : '#d9d9d9',
              margin: '0 8px'
            }}></div>
            <div style={{ 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: currentStep >= 1 ? '#1890ff' : '#d9d9d9',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold'
            }}>2</div>
            <div style={{ 
              flex: 1, 
              height: 2, 
              backgroundColor: currentStep >= 2 ? '#1890ff' : '#d9d9d9',
              margin: '0 8px'
            }}></div>
            <div style={{ 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: currentStep >= 2 ? '#1890ff' : '#d9d9d9',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold'
            }}>3</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666' }}>
            <span>基本信息</span>
            <span>选择目标</span>
            <span>配置动作</span>
          </div>
        </div>

        {/* 步骤1: 基本信息 */}
        {currentStep === 0 && (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              schedule: '每15分钟'
            }}
          >
            <Form.Item
              name="name"
              label={t('tasks:collections.form.name')}
              rules={[
                { required: true, message: t('tasks:collections.form.nameRequired') },
                { max: 50, message: t('tasks:collections.form.nameMaxLength') }
              ]}
            >
              <Input placeholder={t('tasks:collections.form.namePlaceholder')} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('tasks:collections.form.description')}
              rules={[
                { required: true, message: t('tasks:collections.form.descriptionRequired') },
                { max: 200, message: t('tasks:collections.form.descriptionMaxLength') }
              ]}
            >
              <TextArea 
                rows={3} 
                placeholder={t('tasks:collections.form.descriptionPlaceholder')}
              />
            </Form.Item>

            <Form.Item
              name="schedule"
              label={t('tasks:collections.form.schedule')}
              rules={[{ required: true, message: t('tasks:collections.form.scheduleRequired') }]}
            >
              <Select placeholder={t('tasks:collections.form.schedulePlaceholder')}>
                {taskCollectionMockData.scheduleOptions.map(option => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            </Form.Item>

            <Alert
              message="提示"
              description="请填写任务集合的基本信息，包括名称、描述和执行频率。"
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          </Form>
        )}

        {/* 步骤2: 选择目标 */}
        {currentStep === 1 && (
          <div>
            <Title level={4}>选择监控目标</Title>
            
            <Tabs defaultActiveKey="entities">
              <Tabs.TabPane tab={`实体 (${selectedEntities.length})`} key="entities">
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  <Checkbox.Group 
                    value={selectedEntities} 
                    onChange={handleEntitySelect}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[16, 16]}>
                      {availableEntities.map(entity => (
                        <Col xs={24} sm={12} md={8} key={entity.id}>
                          <Card 
                            size="small" 
                            style={{ 
                              cursor: 'pointer',
                              border: selectedEntities.includes(entity.id) ? '2px solid #1890ff' : '1px solid #d9d9d9'
                            }}
                            onClick={() => {
                              const newSelected = selectedEntities.includes(entity.id)
                                ? selectedEntities.filter(id => id !== entity.id)
                                : [...selectedEntities, entity.id];
                              handleEntitySelect(newSelected);
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Checkbox 
                                checked={selectedEntities.includes(entity.id)}
                                style={{ marginRight: 8 }}
                              />
                              <div>
                                <div style={{ fontWeight: 'bold' }}>{entity.name}</div>
                                <div style={{ fontSize: 12, color: '#666' }}>{entity.category}</div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </div>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={`时序 (${selectedSequences.length})`} key="sequences">
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  <Checkbox.Group 
                    value={selectedSequences} 
                    onChange={handleSequenceSelect}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[16, 16]}>
                      {availableSequences.map(sequence => (
                        <Col xs={24} sm={12} md={8} key={sequence.id}>
                          <Card 
                            size="small" 
                            style={{ 
                              cursor: 'pointer',
                              border: selectedSequences.includes(sequence.id) ? '2px solid #1890ff' : '1px solid #d9d9d9'
                            }}
                            onClick={() => {
                              const newSelected = selectedSequences.includes(sequence.id)
                                ? selectedSequences.filter(id => id !== sequence.id)
                                : [...selectedSequences, sequence.id];
                              handleSequenceSelect(newSelected);
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Checkbox 
                                checked={selectedSequences.includes(sequence.id)}
                                style={{ marginRight: 8 }}
                              />
                              <div>
                                <div style={{ fontWeight: 'bold' }}>{sequence.name}</div>
                                <div style={{ fontSize: 12, color: '#666' }}>{sequence.category}</div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </div>
              </Tabs.TabPane>
            </Tabs>

            <Alert
              message="提示"
              description={`已选择 ${selectedEntities.length} 个实体和 ${selectedSequences.length} 个时序。请至少选择一个监控目标。`}
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          </div>
        )}

        {/* 步骤3: 配置动作 */}
        {currentStep === 2 && (
          <div>
            <Title level={4}>配置检查动作</Title>
            
            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              {/* 实体动作配置 */}
              {selectedEntities.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={5}>实体检查动作</Title>
                  {selectedEntities.map(entityId => {
                    const entity = availableEntities.find(e => e.id === entityId);
                    return (
                      <Card key={entityId} size="small" style={{ marginBottom: 16 }}>
                        <div style={{ marginBottom: 12 }}>
                          <Text strong>{entity?.name}</Text>
                          <Tag color="blue" style={{ marginLeft: 8 }}>{entity?.category}</Tag>
                        </div>
                        <Checkbox.Group
                          value={entityActions[entityId] || []}
                          onChange={(actions) => handleEntityActionChange(entityId, actions)}
                        >
                          <Row gutter={[16, 8]}>
                            {Object.entries(taskCollectionMockData.actionTypes).map(([key, action]) => (
                              <Col xs={12} sm={8} md={6} key={key}>
                                <Checkbox value={key}>
                                  <Space>
                                    <Tag color={action.color}>{action.name}</Tag>
                                  </Space>
                                </Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* 时序动作配置 */}
              {selectedSequences.length > 0 && (
                <div>
                  <Title level={5}>时序检查动作</Title>
                  {selectedSequences.map(sequenceId => {
                    const sequence = availableSequences.find(s => s.id === sequenceId);
                    return (
                      <Card key={sequenceId} size="small" style={{ marginBottom: 16 }}>
                        <div style={{ marginBottom: 12 }}>
                          <Text strong>{sequence?.name}</Text>
                          <Tag color="green" style={{ marginLeft: 8 }}>{sequence?.category}</Tag>
                        </div>
                        <Checkbox.Group
                          value={sequenceActions[sequenceId] || []}
                          onChange={(actions) => handleSequenceActionChange(sequenceId, actions)}
                        >
                          <Row gutter={[16, 8]}>
                            {Object.entries(taskCollectionMockData.actionTypes).map(([key, action]) => (
                              <Col xs={12} sm={8} md={6} key={key}>
                                <Checkbox value={key}>
                                  <Space>
                                    <Tag color={action.color}>{action.name}</Tag>
                                  </Space>
                                </Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            <Alert
              message="提示"
              description="请为每个选中的目标配置至少一个检查动作。不同的动作类型适用于不同的监控场景。"
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          </div>
        )}
      </Modal>

      {/* 任务集合详情模态框 */}
      <Modal
        title={selectedTask?.name}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {selectedTask && (
          <div>
            {/* 基本信息 */}
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label={t('tasks:collections.modal.taskName')} span={2}>
                {selectedTask.name}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.modal.taskStatus')}>
                {getStatusTag(selectedTask.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.modal.scheduleFrequency')}>
                {selectedTask.schedule}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.card.successRate')}>
                {selectedTask.successRate}%
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.card.executionCount')}>
                {selectedTask.totalRuns}{t('common:unit.times')}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.modal.lastExecution')}>
                {selectedTask.lastRun}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.card.nextExecution')}>
                {selectedTask.nextRun}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.card.creator')}>
                {selectedTask.createdBy}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.modal.taskCreatedAt')}>
                {selectedTask.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label={t('tasks:collections.modal.taskDescription')} span={2}>
                {selectedTask.description}
              </Descriptions.Item>
            </Descriptions>

            {/* 监控目标和巡检动作 */}
            <Tabs defaultActiveKey="targets">
              <Tabs.TabPane tab={t('tasks:collections.detail.monitoringTargets')} key="targets">
                <Row gutter={16}>
                  {selectedTask.targets.map(target => (
                    <Col xs={24} sm={12} lg={8} key={target.id}>
                      <Card 
                        title={
                          <Space>
                            {target.type === 'entity' ? 
                              <NodeIndexOutlined style={{ color: '#1890ff' }} /> : 
                              <ControlOutlined style={{ color: '#52c41a' }} />
                            }
                            {target.name}
                          </Space>
                        }
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <div style={{ marginBottom: 8 }}>
                          <Tag color={target.type === 'entity' ? 'blue' : 'green'}>
                            {target.type === 'entity' ? t('tasks:collections.detail.entity') : t('tasks:collections.detail.sequence')}
                          </Tag>
                          <Tag>{target.category}</Tag>
                        </div>
                        <div>
                          <Text strong style={{ fontSize: 12 }}>{t('tasks:collections.detail.inspectionActionsLabel')}:</Text>
                          <div style={{ marginTop: 4 }}>
                            {target.actions.map(actionId => {
                              const action = inspectionActions.find(a => a.id === actionId);
                              const actionConfig = actionTypeMap[actionId as keyof typeof actionTypeMap];
                              return (
                                <Tag 
                                  key={actionId} 
                                  size="small" 
                                  color={actionConfig?.color}
                                  icon={actionConfig?.icon}
                                  style={{ marginBottom: 4 }}
                                >
                                  {actionConfig?.name}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab={t('tasks:collections.detail.inspectionActions')} key="actions">
                <Row gutter={16}>
                  {inspectionActions.map(action => {
                    const actionConfig = actionTypeMap[action.type];
                    const isUsed = selectedTask.targets.some(target => 
                      target.actions.includes(action.id)
                    );
                    
                    return (
                      <Col xs={24} sm={12} lg={8} key={action.id}>
                        <Card 
                          title={
                            <Space>
                              {actionConfig?.icon}
                              {action.name}
                              {isUsed && <Badge status="success" text={t('tasks:collections.detail.inUse')} />}
                            </Space>
                          }
                          size="small"
                          style={{ 
                            marginBottom: 16,
                            opacity: isUsed ? 1 : 0.6
                          }}
                        >
                          <div style={{ marginBottom: 8 }}>
                            <Tag color={actionConfig?.color}>
                              {actionConfig?.name}
                            </Tag>
                          </div>
                          <Paragraph style={{ fontSize: 12, marginBottom: 8 }}>
                            {action.description}
                          </Paragraph>
                          <div style={{ fontSize: 11, color: '#666' }}>
                            <div>{t('tasks:collections.detail.duration')}: {action.duration}</div>
                            <div>{t('tasks:collections.detail.suggestedFrequency')}: {action.frequency}</div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default TaskCollectionManagement;
