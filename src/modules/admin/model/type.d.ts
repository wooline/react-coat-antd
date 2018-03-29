export interface NoticeItem {
  key?: string;
  id: string;
  read?: boolean;
  avatar?: string;
  title: string;
  extra?: string;
  description?: string;
  datetime?: string;
}
export interface MenuItemData {
  name: string;
  icon?: string;
  path: string;
  children?: MenuItemData[];
  target?: string;
}
export type Notices = Array<{ title: string; type: string; list: NoticeItem[] }>;
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
