import { ProjectOutlined, TranslationOutlined, UserOutlined, TeamOutlined, EditOutlined, CodeSandboxOutlined, ReconciliationOutlined, WhatsAppOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Translation from "./Translation";
import Project from "./Project";
import User from "./User";
import Partner from "./Partner";
import News from "./News";
import Product from "./Product";
import Career from "./Career";
import Contact from "./Contact";
import Info from "./Info";

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
    path: '/product',
    name: 'Products',
    icon: CodeSandboxOutlined,
    component: Product
  },
  {
    path: '/career',
    name: 'Careers',
    icon: ReconciliationOutlined,
    component: Career
  },
  {
    path: '/contact',
    name: 'Contacts',
    icon: WhatsAppOutlined,
    component: Contact
  },
  {
    path: '/info',
    name: 'Company Infos',
    icon: InfoCircleOutlined,
    component: Info
  },
  {
    path: '/translation',
    name: 'Translations',
    icon: TranslationOutlined,
    component: Translation
  }
]
