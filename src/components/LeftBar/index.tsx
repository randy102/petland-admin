import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";

import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
import { getSelectedKey } from "utils/route";
import { ROUTES } from "pages/Admin/RouteConfig";
import { getUser } from "utils/auth";

const { Sider } = Layout;

export default function LeftBar() {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string>();

  useEffect(() => {
    setUserRole(getUser("roleName"));
  }, []);

  return (
    <div id="left-bar-wrap">
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey(location.pathname)}
        >
          {ROUTES.map((route, index) => {
            if (userRole && route.allowed.includes(userRole))
              return (
                <Menu.Item key={index + 1}>
                  <Link to={`/admin${route.path}`}>
                    <route.icon />
                    <span className="nav-text">{route.name}</span>
                  </Link>
                </Menu.Item>
              );
            return undefined;
          })}
        </Menu>
      </Sider>
    </div>
  );
}
