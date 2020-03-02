import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Menu, Button } from 'antd';
import { UserOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';

import { ModalsContext } from 'contexts/modals';

const NavMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const { setModals } = useContext(ModalsContext);

  const openPostModal = () => setModals({ type: 'post' })({ open: true });

  const handleClick = e => {
    history.push(e.key);
  };

  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      className="NavMenu-root"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <span>
          <HomeOutlined />
          <span className="NavMenu-title">Home</span>
        </span>
      </Menu.Item>
      <Menu.Item key="/profile">
        <span>
          <UserOutlined />
          <span className="NavMenu-title">Profile</span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <div className="NavMenu-last-item" onClick={openPostModal}>
        <Button size="large" type="primary" block icon={<EditOutlined />}>
          Post
        </Button>
      </div>
    </Menu>
  );
};

export default NavMenu;
