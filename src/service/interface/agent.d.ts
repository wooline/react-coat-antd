import * as global from "./global";
export type NoticeType = "message" | "todo" | "inform";

export type OrderBy = "DATE" | "TEAM_SALE_AMOUNT";

export interface ListFilter {
  page: number;
  pageSize: number;
  createdTime?: [number, number];
  customerName?: string;
  sortOrder: global.common.SortOrder;
  orderBy: OrderBy;
}
export interface ListSummary {
  totalSaleAmount: number;
  username: string;
  userType: string;
  createdBy: string;
  incomePlanName: string;
  parentName: string;
  createdTime: string;
}
export interface ListItem {
  id: number;
  userId: string;
  username: string;
  userType: string;
  planName: string;
  planNameId: string;
  date: string;
  teamSaleAmount: number;
}
export interface TableList {
  filter: ListFilter;
  list: ListItem[];
  summary: ListSummary;
}
