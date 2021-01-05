import { ProjectOutlined, TranslationOutlined, UserOutlined, TeamOutlined, EditOutlined, CodeSandboxOutlined, ReconciliationOutlined, WhatsAppOutlined, PictureOutlined, SettingOutlined, MailOutlined, FieldTimeOutlined, BellOutlined } from "@ant-design/icons";
import Translation from "./Translation";
import Project from "./Project";
import User from "./User";
import Partner from "./Partner";
import News from "./News";
import Product from "./Product";
import Career from "./Career";
import Contact from "./Contact";
import Slider from "./Slider";
import Config from "./Config";
import MailTemplate from "./MailTemplate";
import History from "./History"
import Member from "./Member";
import Library from "./Library"
import Subscription from "./Subscription";
import Banner from "./Banner";
interface RouteConfig {
  path: string
  name: string
  icon: React.ForwardRefExoticComponent<any>
  component: React.FunctionComponent<any>
  allowed: string[]
}

const ADMIN = "Admin"
const SUB_USER = "SubUser"
const HR = "HR" 

export const ROUTES: RouteConfig[] = [
  {
    path: '/user',
    name: 'Users',
    icon: UserOutlined,
    component: User,
    allowed: [ADMIN]
  },
  {
    path: '/project',
    name: 'Projects',
    icon: ProjectOutlined,
    component: Project,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/product',
    name: 'Products',
    icon: CodeSandboxOutlined,
    component: Product,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/news',
    name: 'News & QHSE',
    icon: EditOutlined,
    component: News,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/career',
    name: 'Careers',
    icon: ReconciliationOutlined,
    component: Career,
    allowed: [ADMIN, SUB_USER, HR]
  },
  {
    path: '/partner',
    name: 'Partners',
    icon: TeamOutlined,
    component: Partner,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/member',
    name: 'Members',
    icon: TeamOutlined,
    component: Member,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/contact',
    name: 'Contacts',
    icon: WhatsAppOutlined,
    component: Contact,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/translation',
    name: 'Translations',
    icon: TranslationOutlined,
    component: Translation,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/slider',
    name: 'Slider',
    icon: PictureOutlined,
    component: Slider,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/banner',
    name: 'Banner',
    icon: PictureOutlined,
    component: Banner,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/library',
    name: 'Library',
    icon: PictureOutlined,
    component: Library,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/history',
    name: 'History',
    icon: FieldTimeOutlined,
    component: History,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/config',
    name: 'Config',
    icon: SettingOutlined,
    component: Config,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/mailtemplate',
    name: 'Mail Template',
    icon: MailOutlined,
    component: MailTemplate,
    allowed: [ADMIN, SUB_USER]
  },
  {
    path: '/subscription',
    name: 'Subscriptions',
    icon: BellOutlined,
    component: Subscription,
    allowed: [ADMIN, SUB_USER]
  }
]
