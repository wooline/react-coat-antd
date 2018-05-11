import { common } from "core/type.d";
export interface NoticeItem {
  id: string;
  unread: boolean;
  avatar: string;
  title: string;
  extra: string;
  description: string;
  datetime: string;
}
export interface MenuItemData {
  name: string;
  icon?: string;
  path: string;
  children?: MenuItemData[];
  target?: string;
}
export interface NoticesFilter {
  page: number;
  unread: boolean;
}
export interface NoticesChannelFilter extends NoticesFilter {
  type: string;
}
export interface NoticesChannel {
  title: string;
  type: string;
  list: common.List<NoticeItem, NoticesFilter>;
}
export type Notices = NoticesChannel[];
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
