import React, { useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ChangePassword from 'components/ChangePassword';
import './styles.scss';

export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const userName = window.localStorage.getItem('user.name');

  return (
    <div>
      <Layout.Header id="header-wrap">
        <div id="header-title">Quản lý Petland</div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '40px', float: 'right' }}
        >
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                <SettingOutlined />
                {userName}
              </span>
            }
          >
            <Menu.Item key="setting:1">
              <Link to="/logout" replace>
                <LogoutOutlined />
                Đăng xuất
              </Link>
            </Menu.Item>

            <Menu.Item key="setting:2">
              <div onClick={() => setShowModal(true)}>
                <LockOutlined />
                Đổi mật khẩu
              </div>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
      <Modal
        visible={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        <ChangePassword setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}
