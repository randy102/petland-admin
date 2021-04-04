import {UserOutlined, ProjectFilled } from "@ant-design/icons";

import User from "./User";
import { UserRole } from "../../utils/auth";
import React from "react";
import Demo from "./Demo";

interface RouteConfig {
  path: string
  name: string
  icon: React.ForwardRefExoticComponent<any>
  component: React.FunctionComponent<any>
  allowed: string[]
}

const { ADMIN, MOD } = UserRole

export const ROUTES: RouteConfig[] = [
  {
    path: '/user',
    name: 'Users',
    icon: UserOutlined,
    component: User,
    allowed: [ADMIN]
  },
  {
    path: '/demo',
    name: 'Demo',
    icon: ProjectFilled,
    component: Demo,
    allowed: [ADMIN]
  },
]
