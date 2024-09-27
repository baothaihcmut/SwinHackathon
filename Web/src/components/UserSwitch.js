import React, { useState } from 'react';
import {
  UserSwitchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'User',
  },
  {
    key: '2',
    icon: <UserSwitchOutlined />,
    label: 'Volunteer',
  },
];

const UserSwitch = ({ onModeChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMode, setSelectedMode] = useState('User');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    const mode = e.key === '1' ? 'User' : 'Volunteer';
    setSelectedMode(mode);
    onModeChange(mode);
  };

  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default UserSwitch;
