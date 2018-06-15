import { CommonResource } from "../common.type";

export namespace user {
  export enum status {
    enable = "enable",
    disable = "disable",
  }
  export interface ListFilter {
    status: status;
    username: string;
  }
  export interface ListSummary {}
  export interface ListItem {
    id: string;
    username: string;
  }
  export type Resource = CommonResource<{
    ListItem: ListItem;
    ListFilter: ListFilter;
    ListSummary: ListSummary;
    ItemDetail: ListItem;
    ItemCreate: any;
    ItemUpdate: any;
    ItemCreateResult: any;
    ItemUpdateResult: any;
  }>;
}
