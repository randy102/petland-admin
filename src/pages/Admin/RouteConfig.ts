import { ProjectOutlined, TranslationOutlined, UserOutlined, TeamOutlined, EditOutlined } from "@ant-design/icons";
import Translation from "./Translation";
import Project from "./Project";
import User from "./User";
import Partner from "./Partner";
import News from "./News";

interface RouteConfig {
  path: string
  name: string
  icon: React.ForwardRefExoticComponent<any>
  component: React.FunctionComponent<any>
}

export const ROUTES: RouteConfig[] = [
  {
    path: '/user',
    name: 'Users',
    icon: UserOutlined,
    component: User
  },
  {
    path: '/project',
    name: 'Projects',
    icon: ProjectOutlined,
    component: Project
  },
  {
    path: '/partner',
    name: 'Partners',
    icon: TeamOutlined,
    component: Partner
  },
  {
    path: '/news',
    name: 'News',
    icon: EditOutlined,
    component: News
  },
  {
    path: '/translation',
    name: 'Translations',
    icon: TranslationOutlined,
    component: Translation
  }
]
