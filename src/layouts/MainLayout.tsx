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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: '/planes',
    icon: <AppstoreOutlined />,
    label: '平面管理',
  },
  {
    key: '/entities',
    icon: <NodeIndexOutlined />,
    label: '实体关系',
  },
  {
    key: '/sequences',
    icon: <ControlOutlined />,
    label: '时序管理',
  },
  {
    key: '/reports',
    icon: <FileTextOutlined />,
    label: '报告管理',
  },
  {
    key: '/tags',
    icon: <TagsOutlined />,
    label: '标签管理',
  },
  {
    key: '/ai-assistant',
    icon: <MessageOutlined />,
    label: 'AI助手',
  },
  {
    key: '/ai-agents',
    icon: <RobotOutlined />,
    label: 'AI智能体',
  },
];

const userMenuItems = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: '个人资料',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
  {
    type: 'divider' as const,
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '退出登录',
  },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        // 处理个人资料
        break;
      case 'settings':
        // 处理系统设置
        break;
      case 'logout':
        // 处理退出登录
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: collapsed ? '14px' : '18px', 
            fontWeight: 600, 
            color: '#1890ff',
            gap: '8px',
            transition: 'all 0.2s'
          }}>
            <img 
              src="/sz-logo.png" 
              alt="Logo" 
              style={{ 
                width: '32px', 
                height: '32px',
                objectFit: 'contain',
                transition: 'all 0.2s'
              }} 
            />
            {!collapsed && (
              <span style={{ whiteSpace: 'nowrap' }}>
                AI运维系统
              </span>
            )}
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Text strong>通用平面化AI运维系统</Text>
          </Space>
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <Text>管理员</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{
          margin: '24px',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
