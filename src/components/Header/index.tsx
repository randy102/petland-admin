import React from "react";
import { Layout, Menu } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  function handleLogOut() {}

  return (
    <div>
      <Layout.Header id="header-wrap">
        <div id="header-title">Control Panel</div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: "40px", float: "right" }}
        >
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                <SettingOutlined />
                Options
              </span>
            }
          >
            <Menu.Item key="setting:1">
              <Link to="/" replace onClick={handleLogOut}>
                <LogoutOutlined />
                Log out
              </Link>
            </Menu.Item>

            <Menu.Item key="setting:2">
              <Link to="/" replace>
                <LockOutlined />
                Change Password
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    </div>
  );
}
