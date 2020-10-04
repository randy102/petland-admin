import React from "react";
import { Menu, Layout } from "antd";

import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
import { getSelectedKey } from "utils/route";
import { ROUTES } from "pages/Admin/RouteConfig";

const { Sider } = Layout;

export default function LeftBar() {
  const location = useLocation();

  return (
    <div id="left-bar-wrap">
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey(location.pathname)}
        >
          {ROUTES.map((route, index) => (
            <Menu.Item key={index + 1}>
              <Link to={`/admin${route.path}`}>
                <route.icon />
                <span className="nav-text">{route.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
}
