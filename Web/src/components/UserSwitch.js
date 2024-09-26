import React from 'react';
import { useState } from 'react';
import {
  UserSwitchOutlined ,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined ,
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
const UserSwitch = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
    setCollapsed(!collapsed);

  };
    return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
    );
};

export default UserSwitch;