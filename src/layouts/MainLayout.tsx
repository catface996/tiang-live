import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Typography,
} from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  NodeIndexOutlined,
  ControlOutlined,
  RobotOutlined,
  FileTextOutlined,
  TagsOutlined,
  MessageOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
  ProjectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../utils/assetUtils';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import { useAppSelector } from '../store';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { currentTheme } = useAppSelector((state) => state.theme);
  const isDarkMode = currentTheme === 'dark';

  // 动态菜单项（使用翻译）
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: '/planes',
      icon: <AppstoreOutlined />,
      label: t('menu.planes'),
    },
    {
      key: '/entities',
      icon: <NodeIndexOutlined />,
      label: t('menu.entities'),
    },
    {
      key: '/sequences',
      icon: <ControlOutlined />,
      label: t('menu.sequences'),
    },
    {
      key: '/industry-solutions',
      icon: <SolutionOutlined />,
      label: t('menu.solutions'),
    },
    {
      key: 'task-management',
      icon: <ProjectOutlined />,
      label: t('menu.tasks'),
      children: [
        {
          key: '/task-management/task-collections',
          label: t('menu.collections'),
        },
        {
          key: '/task-management/inspection-tasks',
          label: t('menu.inspectionTasks'),
        },
        {
          key: '/task-management/hook-tasks',
          label: t('menu.hookTasks'),
        },
      ],
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: t('menu.reports'),
    },
    {
      key: '/ai-assistant',
      icon: <MessageOutlined />,
      label: t('menu.aiAssistant'),
    },
    {
      key: '/ai-agents',
      icon: <RobotOutlined />,
      label: t('menu.agents'),
    },
    {
      key: 'system-settings',
      icon: <SettingOutlined />,
      label: t('menu.systemSettings'),
      children: [
        {
          key: '/system-settings/model-management',
          label: t('menu.modelManagement'),
        },
        {
          key: '/system-settings/prompt-templates',
          label: t('menu.promptTemplates'),
        },
        {
          key: '/system-settings/tag-management',
          label: t('menu.tagManagement'),
        },
        {
          key: '/system-settings/entity-scan',
          label: t('menu.entityScan'),
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('layout.profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('layout.settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('layout.logout'),
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('打开个人资料');
        break;
      case 'settings':
        console.log('打开设置');
        break;
      case 'logout':
        console.log('退出登录');
        break;
    }
  };

  // 移除颜色变量，改用CSS类

  return (
    <Layout className="app-layout" style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="app-sider"
      >
        {/* Logo区域 */}
        <div className="app-logo" style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 16px',
          transition: 'all 0.2s'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 600, 
            gap: '8px',
            transition: 'all 0.2s'
          }}>
            <img 
              src={ASSETS.LOGO} 
              alt="Logo" 
              style={{ 
                width: '32px', 
                height: '32px',
                objectFit: 'contain',
                transition: 'all 0.2s'
              }} 
            />
            {!collapsed && (
              <Text className="app-title" style={{ 
                fontSize: '16px', 
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}>
                {t('layout.title')}
              </Text>
            )}
          </div>
        </div>

        {/* 菜单 */}
        <Menu
          className="app-menu"
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        {/* 顶部导航栏 */}
        <Header className="app-header">
          <Button
            className="collapse-button"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <Space size={16}>
            {/* 主题切换 */}
            <ThemeToggle className="toolbar-button" />
            
            {/* 语言切换器 */}
            <LanguageSwitcher className="language-switcher" />
            
            {/* 用户菜单 */}
            <Dropdown
              menu={{ 
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                className="toolbar-button user-info"
                type="text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 'auto',
                  padding: '8px 12px',
                  border: 'none'
                }}
              >
                <Space>
                  <Avatar 
                    className="user-avatar"
                    size="small" 
                    icon={<UserOutlined />}
                  />
                  <Text className="user-info">
                    管理员
                  </Text>
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        {/* 主内容区域 */}
        <Content className="app-content" style={{ 
          margin: 0,
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
