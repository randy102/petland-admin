import {  ProjectOutlined, TranslationOutlined, UserOutlined, TeamOutlined, EditOutlined, CodeSandboxOutlined, ReconciliationOutlined, WhatsAppOutlined, InfoCircleOutlined, PictureOutlined, SettingOutlined, MailOutlined, FieldTimeOutlined } from "@ant-design/icons";
import Translation from "./Translation";
import Project from "./Project";
import User from "./User";
import Partner from "./Partner";
import News from "./News";
import Product from "./Product";
import Career from "./Career";
import Contact from "./Contact";
import Info from "./Info";
import Slider from "./Slider";
import Config from "./Config";
import MailTemplate from "./MailTemplate";
import History from "./History"
import Member from "./Member";
import Library from "./Library"

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
    path: '/product',
    name: 'Products',
    icon: CodeSandboxOutlined,
    component: Product
  },
  {
    path: '/news',
    name: 'News & QHSE',
    icon: EditOutlined,
    component: News
  },
  {
    path: '/career',
    name: 'Careers',
    icon: ReconciliationOutlined,
    component: Career
  },
  {
    path: '/partner',
    name: 'Partners',
    icon: TeamOutlined,
    component: Partner
  },
  {
    path: '/member',
    name: 'Members',
    icon: TeamOutlined,
    component: Member
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
  },
  {
    path: '/slider',
    name: 'Slider',
    icon: PictureOutlined,
    component: Slider,
  },
  {
    path: '/library',
    name: 'Library',
    icon: PictureOutlined,
    component: Library,
  },
  {
    path: '/history',
    name: 'History',
    icon: FieldTimeOutlined,
    component: History,
  },
  {
    path: '/config',
    name: 'Config',
    icon: SettingOutlined,
    component: Config
  },
  {
    path: '/mailtemplate',
    name: 'Mail Template',
    icon: MailOutlined,
    component: MailTemplate
  }
]
