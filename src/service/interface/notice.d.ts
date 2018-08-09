export type NoticeType = "message" | "todo" | "inform";
export interface ListFilter {
  page: number;
  pageSize: number;
  type: NoticeType;
  unread: boolean;
}
export interface ListSummary {
  total: number;
  unreadTotal: number;
}
export interface ListItem {
  id: string;
  unread: boolean;
  avatar: string;
  title: string;
  extra: string;
  description: string;
  datetime: string;
}
export interface TableList {
  filter: ListFilter;
  list: ListItem[];
  summary: ListSummary;
}
export interface DeleteListRequest {
  type: NoticeType;
  ids: string[];
}
