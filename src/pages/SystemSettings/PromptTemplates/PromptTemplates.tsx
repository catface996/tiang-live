import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, Tag, Form, Tooltip, message, Rate, Pagination, Modal } from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  BulbOutlined,
  CodeOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store';
import { setPageTitle } from '../../../utils';
import SearchFilterBar from '../../../components/Common/SearchFilterBar';
import PromptFormModal from './components/PromptFormModal';
import PromptDetailModal from './components/PromptDetailModal';
import { PromptTemplateApi, PromptTemplateConverter } from '../../../services/promptTemplateApi';
import '../../../styles/prompt-templates.css';

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

const PromptCard = styled(Card)`
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
`;

const FilterBar = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

interface PromptTemplate {
  id: string;
  name: string;
  category: string;                    // 显示用的中文分类
  categoryCode?: string;               // 后端枚举值
  description: string;
  content: string;
  type?: string;                       // 新增：模板类型
  variables: { [key: string]: any };   // 修改：改为对象格式
  tags: string[];
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  usageCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastUsed: string;
  version: string;
}

const PromptTemplates: React.FC = () => {
  const { t } = useTranslation(['prompts', 'common']);
  const { currentTheme } = useAppSelector(state => state.theme);
  const isDarkMode = currentTheme === 'dark';
  const iconColor = isDarkMode ? '#ffffff' : '#1890ff';

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [form] = Form.useForm();
  
  // 新增：API相关状态
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  });

  useEffect(() => {
    setPageTitle(t('prompts:title'));
    // 初始化时加载数据
    loadTemplates();
  }, [t]);

  // 加载模板数据
  const loadTemplates = async (page = 1, size = 12) => {
    try {
      setLoading(true);
      
      // 在开发模式下，如果后端不可用，直接使用mock数据
      if (import.meta.env.DEV) {
        try {
          const response = await PromptTemplateApi.listTemplates({
            name: searchText || undefined,
            category: filterCategory !== 'all' ? frontendCategoryMap[filterCategory] : undefined,
            page,
            size
          });

          console.log('🔍 API响应详情:', response);
          
          if (response && response.success && response.data) {
            console.log('✅ API调用成功，处理数据...');
            
            // 检查数据结构 - 适配实际的API响应格式
            let templates = [];
            
            if (Array.isArray(response.data)) {
              // 如果直接是数组
              console.log('📋 数据是直接数组格式');
              templates = response.data;
            } else if (response.data.data && Array.isArray(response.data.data)) {
              // 如果是 data.data 格式（实际API返回的格式）
              console.log('📋 数据是data.data格式');
              templates = response.data.data;
            } else if (response.data.content && Array.isArray(response.data.content)) {
              // 如果是分页格式
              console.log('📋 数据是分页格式');
              templates = response.data.content;
            } else if (response.data.list && Array.isArray(response.data.list)) {
              // 如果是list格式
              console.log('📋 数据是list格式');
              templates = response.data.list;
            } else {
              console.warn('⚠️ 未知的数据结构:', response.data);
              templates = [];
            }
            
            console.log('📊 找到模板数据，数量:', templates.length);
            
            const convertedTemplates = templates.map((item, index) => {
              console.log(`🔄 转换数据项 ${index}:`, item);
              try {
                const converted = PromptTemplateConverter.toFrontendFormat(item);
                console.log(`✅ 转换结果 ${index}:`, converted);
                return converted;
              } catch (convertError) {
                console.error('❌ 数据转换失败:', convertError, item);
                // 返回一个基本的数据结构
                const fallback = {
                  id: item.id || `temp-${index}`,
                  name: item.name || '未知模板',
                  category: item.categoryName || item.category || '其他',
                  description: item.description || '',
                  content: item.content || '',
                  type: item.type || 'text',
                  variables: [],
                  tags: item.tags || [],
                  language: 'zh-CN',
                  difficulty: 'intermediate',
                  rating: 0,
                  usageCount: 0,
                  isPublic: true,
                  isFavorite: false
                };
                console.log(`🔧 使用fallback数据 ${index}:`, fallback);
                return fallback;
              }
            });
            
            console.log('✅ 数据转换完成，使用API数据');
            
            setTemplates(convertedTemplates);
            setPagination({
              current: response.data.page || page,
              pageSize: response.data.size || size,
              total: parseInt(response.data.total) || templates.length // 注意：API返回的total是字符串
            });
            
            setLoading(false);
            return;
          } else {
            console.warn('⚠️ API响应不成功或无数据:', response);
          }
        } catch (apiError) {
          console.error('🚨 API调用出错:', apiError);
          console.warn('开发模式：API不可用，使用mock数据');
        }
      }

      // 生产模式或开发模式API调用失败时的处理
      const filteredMockData = promptData.filter(template => {
        const matchesSearch = !searchText || 
          template.name.toLowerCase().includes(searchText.toLowerCase()) ||
          template.description.toLowerCase().includes(searchText.toLowerCase());
        
        const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
        
        return matchesSearch && matchesCategory;
      });

      // 模拟分页
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedData = filteredMockData.slice(startIndex, endIndex);

      setTemplates(paginatedData);
      setPagination({
        current: page,
        pageSize: size,
        total: filteredMockData.length
      });

    } catch (error: any) {
      console.error('加载模板列表失败:', error);
      message.error('加载模板列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 提示词模板数据
  const promptData: PromptTemplate[] = [
    {
      id: '1',
      name: '代码审查助手',
      category: '编程',
      description: '帮助开发者进行代码审查，识别潜在问题和改进建议',
      content: `你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

代码语言：{language}
代码内容：
{code}

请从以下几个方面进行审查：
1. 代码质量和可读性
2. 性能优化建议
3. 安全性问题
4. 最佳实践遵循情况
5. 潜在的bug或错误

请提供具体的改进建议和修改方案。`,
      variables: { language: '', code: '' },
      tags: ['代码审查', '开发', '质量控制'],
      language: 'zh-CN',
      difficulty: 'intermediate',
      rating: 4.8,
      usageCount: 1247,
      isPublic: true,
      isFavorite: true,
      createdBy: '开发团队',
      createdAt: '2024-05-15',
      lastModified: '2024-06-10',
      lastUsed: '2024-06-15 14:20:00',
      version: '1.2'
    },
    {
      id: '2',
      name: '系统故障诊断',
      category: '其他',
      description: '协助运维人员诊断系统故障，提供解决方案',
      content: `你是一个经验丰富的系统运维专家。现在需要你帮助诊断以下系统故障：

系统类型：{system_type}
故障现象：{symptoms}
错误日志：{error_logs}
系统环境：{environment}

请按照以下步骤进行故障诊断：
1. 分析故障现象和可能原因
2. 检查相关系统组件和依赖
3. 提供详细的排查步骤
4. 给出具体的解决方案
5. 建议预防措施

请提供清晰的诊断报告和操作指南。`,
      variables: { system_type: '', symptoms: '', error_logs: '', environment: '' },
      tags: ['故障诊断', '运维', '系统维护'],
      language: 'zh-CN',
      difficulty: 'advanced',
      rating: 4.9,
      usageCount: 856,
      isPublic: true,
      isFavorite: false,
      createdBy: '运维团队',
      createdAt: '2024-05-20',
      lastModified: '2024-06-12',
      lastUsed: '2024-06-15 13:45:00',
      version: '1.1'
    },
    {
      id: '3',
      name: '业务需求分析',
      category: '商务',
      description: '帮助产品经理分析和整理业务需求',
      content: `你是一个资深的产品经理和业务分析师。请帮助分析以下业务需求：

需求背景：{background}
目标用户：{target_users}
业务目标：{business_goals}
功能描述：{feature_description}

请从以下维度进行需求分析：
1. 需求合理性和可行性评估
2. 用户价值和业务价值分析
3. 技术实现复杂度评估
4. 风险识别和应对策略
5. 优先级建议和排期规划

请提供结构化的需求分析报告。`,
      variables: { background: '', target_users: '', business_goals: '', feature_description: '' },
      tags: ['需求分析', '产品管理', '业务分析'],
      language: 'zh-CN',
      difficulty: 'intermediate',
      rating: 4.6,
      usageCount: 634,
      isPublic: true,
      isFavorite: true,
      createdBy: '产品团队',
      createdAt: '2024-06-01',
      lastModified: '2024-06-14',
      lastUsed: '2024-06-15 12:30:00',
      version: '1.0'
    },
    {
      id: '4',
      name: '技术文档生成',
      category: '文档工具',
      description: '自动生成技术文档和API说明',
      content: `你是一个专业的技术文档编写专家。请根据以下信息生成完整的技术文档：

项目名称：{project_name}
功能模块：{module_name}
技术栈：{tech_stack}
API接口：{api_details}
使用场景：{use_cases}

请生成包含以下内容的技术文档：
1. 项目概述和架构说明
2. 功能模块详细介绍
3. API接口文档和示例
4. 安装和配置指南
5. 使用示例和最佳实践
6. 常见问题和故障排除

请确保文档结构清晰，内容详实，易于理解。`,
      variables: { project_name: '', module_name: '', tech_stack: '', api_details: '', use_cases: '' },
      tags: ['技术文档', '文档生成', 'API文档'],
      language: 'zh-CN',
      difficulty: 'beginner',
      rating: 4.4,
      usageCount: 423,
      isPublic: false,
      isFavorite: false,
      createdBy: '技术团队',
      createdAt: '2024-06-05',
      lastModified: '2024-06-13',
      lastUsed: '2024-06-15 11:15:00',
      version: '1.0'
    }
  ];

  // 模板类型映射
  const templateTypeMap = {
    SYSTEM_PROMPT: '系统提示词',
    USER_PROMPT: '用户提示词',
    ASSISTANT_PROMPT: '助手提示词',
    FUNCTION_PROMPT: '函数调用提示词',
    CHAIN_PROMPT: '链式提示词',
    CUSTOM: '自定义'
  };

  // 后端分类枚举到前端分类的映射
  const backendCategoryMap = {
    CODING: '编程',
    BUSINESS: '商务',
    SUMMARIZATION: '摘要',
    ANALYSIS: '数据分析',
    WRITING: '文档工具',
    GENERAL: '通用',
    OTHER: '其他'
  };

  // 前端分类到后端枚举的映射
  const frontendCategoryMap = {
    '编程': 'CODING',
    '商务': 'BUSINESS',
    '摘要': 'SUMMARIZATION',
    '数据分析': 'ANALYSIS',
    '文档工具': 'WRITING',
    '通用': 'GENERAL',
    '其他': 'OTHER'
  };

  const categoryMap = {
    编程: { color: 'blue', icon: <CodeOutlined /> },
    商务: { color: 'orange', icon: <BulbOutlined /> },
    摘要: { color: 'purple', icon: <FileTextOutlined /> },
    数据分析: { color: 'red', icon: <SafetyCertificateOutlined /> },
    文档工具: { color: 'purple', icon: <FileTextOutlined /> },
    通用: { color: 'cyan', icon: <MessageOutlined /> },
    其他: { color: 'gray', icon: <ThunderboltOutlined /> }
  };

  const difficultyMap = {
    beginner: { name: '初级', color: 'green' },
    intermediate: { name: '中级', color: 'orange' },
    advanced: { name: '高级', color: 'red' }
  };

  const getCategoryKey = (category: string) => {
    const categoryKeyMap: { [key: string]: string } = {
      编程: 'coding',
      商务: 'business',
      摘要: 'summarization',
      数据分析: 'dataAnalysis',
      文档工具: 'docTools',
      通用: 'general',
      其他: 'other'
    };
    return categoryKeyMap[category] || 'other';
  };

  const handleCreatePrompt = () => {
    setEditingPrompt(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPrompt = (prompt: PromptTemplate) => {
    setEditingPrompt(prompt);
    form.setFieldsValue({
      name: prompt.name,
      category: prompt.category,
      description: prompt.description,
      content: prompt.content,
      type: prompt.type || 'USER_PROMPT',
      language: prompt.language || 'zh-CN',
      difficulty: prompt.difficulty || 'intermediate',
      isPublic: prompt.isPublic || false,
      tags: prompt.tags || [],
      variables: prompt.variables || []
    });
    setModalVisible(true);
  };

  const handleViewPrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setDetailModalVisible(true);
  };

  // 保存模板（创建或更新）
  const handleSavePrompt = async (values: any) => {
    try {
      setLoading(true);
      
      console.log('🔄 保存提示词模板，表单数据:', values);
      
      // 准备请求数据
      const requestData = PromptTemplateConverter.toBackendRequest({
        ...values,
        id: editingPrompt?.id,
        version: editingPrompt?.version || '1.0',
        createdBy: editingPrompt?.createdBy || 'admin'
      });
      
      console.log('🚀 发送到后端的数据:', requestData);

      const response = await PromptTemplateApi.saveTemplate(requestData);
      
      console.log('✅ 保存响应:', response);
      console.log('🔍 响应检查:', {
        'response存在': !!response,
        'response.success': response?.success,
        'response.success类型': typeof response?.success,
        'response.message': response?.message,
        '条件判断': response && response.success
      });
      
      if (response && response.success) {
        message.success(editingPrompt ? '更新模板成功' : '创建模板成功');
        setModalVisible(false);
        form.resetFields();
        setEditingPrompt(null);
        // 重新加载数据
        await loadTemplates(pagination.current, pagination.pageSize);
      } else {
        console.log('🚨 进入错误处理分支');
        const errorMessage = response?.message || '保存模板失败';
        console.log('🚨 错误信息:', errorMessage);
        message.error(errorMessage);
      }
    } catch (error: any) {
      console.error('保存模板失败:', error);
      message.error(error.message || '保存模板失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 删除模板
  const handleDeletePrompt = async (prompt: PromptTemplate) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除提示词模板"${prompt.name}"吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          setLoading(true);
          
          if (import.meta.env.DEV) {
            // 开发模式下模拟删除成功
            message.success('删除模板成功');
            await loadTemplates(pagination.current, pagination.pageSize);
            return;
          }

          const response = await PromptTemplateApi.deleteTemplate(prompt.id);
          
          if (response.success) {
            message.success('删除模板成功');
            // 重新加载数据
            await loadTemplates(pagination.current, pagination.pageSize);
          } else {
            message.error(response.message || '删除模板失败');
          }
        } catch (error: any) {
          console.error('删除模板失败:', error);
          message.error(error.message || '删除模板失败');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleCopyPrompt = (prompt: PromptTemplate) => {
    navigator.clipboard.writeText(prompt.content);
    message.success(t('prompts:messages.copySuccess'));
  };

  const handleToggleFavorite = (promptId: string) => {
    message.success(t('prompts:messages.favoriteSuccess'));
  };

  // 搜索处理
  const handleSearch = async (searchValue: string) => {
    setSearchText(searchValue);
    setPagination(prev => ({ ...prev, current: 1 }));
    await loadTemplates(1, pagination.pageSize);
  };

  // 筛选处理
  const handleFilterChange = async (filters: any) => {
    setFilterCategory(filters.category || 'all');
    setPagination(prev => ({ ...prev, current: 1 }));
    await loadTemplates(1, pagination.pageSize);
  };

  // 刷新数据
  const handleRefresh = async () => {
    await loadTemplates(pagination.current, pagination.pageSize);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await handleSavePrompt(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderPromptCards = () => {
    return templates.map(prompt => {
      const categoryConfig = categoryMap[prompt.category as keyof typeof categoryMap];
      const difficultyConfig = difficultyMap[prompt.difficulty];

      return (
        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={prompt.id}>
          <PromptCard
            title={
              <div className="card-title">
                <div className="title-left">
                  <Space>
                    {categoryConfig?.icon}
                    <span>{prompt.name}</span>
                  </Space>
                </div>
                <div className="title-right">{prompt.isFavorite && <StarOutlined />}</div>
              </div>
            }
            onClick={() => handleViewPrompt(prompt)}
          >
            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                <Tag color={categoryConfig?.color} icon={categoryConfig?.icon}>
                  {t(`prompts:categories.${getCategoryKey(prompt.category)}`)}
                </Tag>
                <Tag color={difficultyConfig?.color}>{t(`prompts:difficulty.${prompt.difficulty}`)}</Tag>
                {prompt.isPublic && <Tag color="blue">{t('prompts:status.public')}</Tag>}
              </Space>
            </div>

            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 16, minHeight: 40 }}>
              {prompt.description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ textAlign: 'center' }}>
                    <Rate disabled value={prompt.rating} allowHalf />
                    <div>{prompt.rating}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <Statistic title={t('prompts:stats.usageCount')} value={prompt.usageCount} />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Space wrap>
                {prompt.tags.slice(0, 3).map(tag => (
                  <Tag key={tag} size="small">
                    {tag}
                  </Tag>
                ))}
                {prompt.tags.length > 3 && <Tag size="small">+{prompt.tags.length - 3}</Tag>}
              </Space>
            </div>

            <div style={{ fontSize: 12, color: '#666' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}
              >
                <span>{t('prompts:detail.version')}:</span>
                <span>{prompt.version}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t('prompts:detail.lastUsed')}:</span>
                <span>{prompt.lastUsed}</span>
              </div>
            </div>

            {/* 操作按钮区域 - 单独一行，右对齐 */}
            <div className="card-actions">
              <Space>
                <Tooltip title={t('prompts:actions.view')}>
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      handleViewPrompt(prompt);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('prompts:actions.edit')}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      handleEditPrompt(prompt);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('prompts:actions.delete')}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeletePrompt(prompt);
                    }}
                  />
                </Tooltip>
              </Space>
            </div>
          </PromptCard>
        </Col>
      );
    });
  };

  const publicPrompts = templates.filter(prompt => prompt.isPublic).length;
  const favoritePrompts = templates.filter(prompt => prompt.isFavorite).length;
  const totalUsage = templates.reduce((sum, prompt) => sum + prompt.usageCount, 0);
  const avgRating = templates.length > 0 ? templates.reduce((sum, prompt) => sum + prompt.rating, 0) / templates.length : 0;

  return (
    <PageContainer className="prompt-templates-page">
      <PageHeader>
        {/* Title和按钮在同一行 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Title level={2} style={{ margin: 0 }}>
            <Space>
              <FileTextOutlined />
              {t('prompts:title')}
            </Space>
          </Title>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>{t('common:refresh')}</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreatePrompt}>
              {t('prompts:createPrompt')}
            </Button>
          </Space>
        </div>

        {/* Paragraph单独一行，充满宽度 */}
        <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>{t('prompts:subtitle')}</Paragraph>
      </PageHeader>

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="prompt-stats-primary">
            <Statistic
              title={t('prompts:stats.totalTemplates')}
              value={pagination.total || templates.length}
              prefix={<FileTextOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="prompt-stats-success">
            <Statistic
              title={t('prompts:stats.publicTemplates')}
              value={publicPrompts}
              prefix={<CheckCircleOutlined />}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="prompt-stats-warning">
            <Statistic title={t('prompts:stats.favoriteTemplates')} value={favoritePrompts} prefix={<StarOutlined />} />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard className="prompt-stats-purple">
            <Statistic
              title={t('prompts:stats.averageRating')}
              value={avgRating.toFixed(1)}
              prefix={<RobotOutlined />}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 筛选栏 */}
      <SearchFilterBar
        searchValue={searchText}
        onSearchChange={handleSearch}
        searchPlaceholder={t('prompts:search.placeholder')}
        filters={[
          {
            key: 'category',
            value: filterCategory,
            onChange: (value) => handleFilterChange({ category: value }),
            placeholder: t('prompts:search.category'),
            width: 120,
            options: [
              { value: 'all', label: t('prompts:search.allCategories') },
              { value: '编程', label: '编程' },
              { value: '商务', label: '商务' },
              { value: '摘要', label: '摘要' },
              { value: '数据分析', label: '数据分析' },
              { value: '文档工具', label: '文档工具' },
              { value: '通用', label: '通用' },
              { value: '其他', label: '其他' }
            ]
          }
        ]}
        onRefresh={() => window.location.reload()}
      />

      {/* 提示词卡片列表 */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div>加载中...</div>
        </div>
      ) : templates.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
          <div>暂无提示词模板</div>
        </div>
      ) : (
        <Row gutter={[16, 16]}>{renderPromptCards()}</Row>
      )}

      {/* 分页组件 */}
      {templates.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={async (page, size) => {
              setPagination(prev => ({ ...prev, current: page, pageSize: size }));
              await loadTemplates(page, size);
            }}
            onShowSizeChange={async (current, size) => {
              setPagination(prev => ({ ...prev, current: 1, pageSize: size }));
              await loadTemplates(1, size);
            }}
          />
        </div>
      )}

      {/* 创建/编辑提示词模态框 */}
      <PromptFormModal
        visible={modalVisible}
        editingPrompt={editingPrompt}
        form={form}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      />

      {/* 提示词详情模态框 */}
      <PromptDetailModal
        visible={detailModalVisible}
        selectedPrompt={selectedPrompt}
        onCancel={() => setDetailModalVisible(false)}
        onCopyPrompt={handleCopyPrompt}
        categoryMap={categoryMap}
        difficultyMap={difficultyMap}
        getCategoryKey={getCategoryKey}
      />
    </PageContainer>
  );
};

export default PromptTemplates;
