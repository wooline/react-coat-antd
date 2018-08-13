import * as global from "./global";
export type NoticeType = "message" | "todo" | "inform";

export type OrderBy = "DATE" | "TEAM_SALE_AMOUNT";

export interface ListFilter {
  page: number;
  pageSize: number;
  createdTime: [number, number] | null;
  customerName: string | null;
  sort: [OrderBy, global.common.SortOrder] | null;
}
export interface ListSummary {
  total: number;
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
  planName: string;
  planId: string;
  parentUsername: string;
  createdTime: string;
  teamSale: number;
}
export interface TableList {
  filter: ListFilter;
  list: ListItem[];
  summary: ListSummary;
}
