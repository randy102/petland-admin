import {
  UserOutlined,
  ProjectFilled,
  TagOutlined,
  TagsOutlined,
  SoundOutlined,
  CreditCardOutlined,
  BugOutlined,
  MessageOutlined,
  HighlightOutlined,
} from '@ant-design/icons';

import User from './User';
import Category from './Category';
import { UserRole } from '../../utils/auth';
import React from 'react';
import Demo from './Demo';
import Subcategory from './Subcategory';
import Post from './Post';
import Ads from './Ads';
import Report from './Report';
import Chargerequest from './Charge-request';
import Highlightpacklist from './Highlight-pack-list';


interface RouteConfig {
  path: string;
  name: string;
  icon: React.ForwardRefExoticComponent<any>;
  component: React.FunctionComponent<any>;
  allowed: string[];
}

const { ADMIN, MOD } = UserRole;

export const ROUTES: RouteConfig[] = [
  {
    path: '/user',
    name: 'Tài khoản',
    icon: UserOutlined,
    component: User,
    allowed: [ADMIN],
  },
  {
    path: '/category',
    name: 'Loại thú cưng',
    icon: TagOutlined,
    component: Category,
    allowed: [ADMIN],
  },
  {
    path: '/subcategory',
    name: 'Giống thú cưng',
    icon: TagsOutlined,
    component: Subcategory,
    allowed: [ADMIN],
  },
  {
    path: '/post',
    name: 'Bài đăng',
    icon: CreditCardOutlined,
    component: Post,
    allowed: [ADMIN, MOD],
  },
  {
    path: '/ads',
    name: 'Quảng cáo',
    icon: SoundOutlined,
    component: Ads,
    allowed: [ADMIN, MOD],
  },
  {
    path: '/pack',
    name: 'Gói nổi bật',
    icon: HighlightOutlined,
    component: Highlightpacklist,
    allowed: [ADMIN, MOD],
  },
  {
    path: '/charge-request',
    name: 'Yêu cầu nạp điểm',
    icon: MessageOutlined,
    component: Chargerequest,
    allowed: [ADMIN, MOD],
  },
  {
    path: '/report',
    name: 'Báo cáo',
    icon: BugOutlined,
    component: Report,
    allowed: [ADMIN],
  },
  {
    path: '/demo',
    name: 'Demo',
    icon: ProjectFilled,
    component: Demo,
    allowed: [ADMIN],
  },
];
