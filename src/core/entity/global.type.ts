export interface MenuItem {
  name: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  target?: string;
}
export interface SessionPushData {
  notices: number;
}
export interface SessionItem {
  avatar: string;
  uid: string;
  username: string;
  hasLogin: boolean;
  notices: number;
}
export interface FooterData {
  links: Array<{
    key: string;
    title: string;
    href: string;
    blankTarget: boolean;
  }>;
  copyright: string;
  className?: string;
}
export interface GlobalSearchData {
  placeholder: string;
  dataSource: string[];
}
export interface ProjectConfig {}
