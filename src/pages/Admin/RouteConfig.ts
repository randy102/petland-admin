import { ProjectOutlined, UserOutlined } from "@ant-design/icons";
import Project from "./Project";
import User from "./User";

interface RouteConfig {
  path: string
  name: string
  icon: React.ForwardRefExoticComponent<any>
  component: React.FunctionComponent<any>
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/user',
    name: 'User',
    icon: UserOutlined,
    component: User
  },
  {
    path: '/project',
    name: 'Project',
    icon: ProjectOutlined,
    component: Project
  }
]
