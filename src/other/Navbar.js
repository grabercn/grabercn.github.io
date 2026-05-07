import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { HomeOutlined, CameraOutlined, CustomerServiceOutlined, FileTextOutlined, MenuOutlined } from '@ant-design/icons';
import { useTheme } from './ThemeContext';

const { Header } = Layout;

const Navbar = ({ activeKey = 'home', extraItems = [] }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isDark } = useTheme();

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const navItems = [
    { key: 'home', icon: <HomeOutlined />, label: <a href="/">Home</a> },
    ...extraItems,
    { key: 'resume', icon: <FileTextOutlined />, label: <a href="/#/resume">Resume</a>, style: { marginLeft: 'auto' } },
    { key: 'photography', icon: <CameraOutlined />, label: <a href="/#/photo">Photography</a> },
    { key: 'music', icon: <CustomerServiceOutlined />, label: <a href="/#/music">Music</a> },
    { key: 'theme-indicator', className: 'theme-indicator', disabled: true, label: isDark ? '☾' : '☀', style: { minWidth: 'auto', padding: '0 8px', cursor: 'default' } },
  ];

  // For the drawer, remove marginLeft auto and theme indicator
  const drawerItems = navItems
    .filter(item => item.key !== 'theme-indicator')
    .map(({ style, ...rest }) => ({ ...rest, onClick: rest.onClick ? () => { rest.onClick(); setDrawerOpen(false); } : () => setDrawerOpen(false) }));

  return (
    <Header style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {!isMobile ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          style={{ lineHeight: '64px', backgroundColor: 'transparent', borderBottom: 'none', display: 'flex', width: '100%' }}
          items={navItems}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '0 16px', justifyContent: 'flex-end' }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: '#fff', fontSize: '22px' }} />}
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'rgba(0,0,0,0.2)', border: 'none', borderRadius: '8px', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          />
        </div>
      )}

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeKey]}
          style={{ borderRight: 'none' }}
          items={drawerItems}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
