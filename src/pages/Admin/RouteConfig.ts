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
import { UserRole } from "../../utils/auth";
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
    path: '/project',
    name: 'Projects',
    icon: ProjectOutlined,
    component: Project,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/product',
    name: 'Products',
    icon: CodeSandboxOutlined,
    component: Product,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/news',
    name: 'News & QHSE',
    icon: EditOutlined,
    component: News,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/career',
    name: 'Careers',
    icon: ReconciliationOutlined,
    component: Career,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/partner',
    name: 'Partners',
    icon: TeamOutlined,
    component: Partner,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/member',
    name: 'Members',
    icon: TeamOutlined,
    component: Member,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/contact',
    name: 'Contacts',
    icon: WhatsAppOutlined,
    component: Contact,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/translation',
    name: 'Translations',
    icon: TranslationOutlined,
    component: Translation,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/slider',
    name: 'Slider',
    icon: PictureOutlined,
    component: Slider,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/banner',
    name: 'Banner',
    icon: PictureOutlined,
    component: Banner,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/library',
    name: 'Library',
    icon: PictureOutlined,
    component: Library,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/history',
    name: 'History',
    icon: FieldTimeOutlined,
    component: History,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/config',
    name: 'Config',
    icon: SettingOutlined,
    component: Config,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/mailtemplate',
    name: 'Mail Template',
    icon: MailOutlined,
    component: MailTemplate,
    allowed: [ADMIN, MOD]
  },
  {
    path: '/subscription',
    name: 'Subscriptions',
    icon: BellOutlined,
    component: Subscription,
    allowed: [ADMIN, MOD]
  }
]
