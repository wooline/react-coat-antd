import { CommonResource } from "../common.type";

export namespace supervisor {
  export enum Status {
    all = "all",
    active = "active",
    disable = "disable",
  }
  export interface ListFilter {
    status: Status;
    username: string;
    createDate: [Date, Date];
  }
  export interface ListSummary {}
  export interface ListItem {
    id: string;
    username: string;
    avatar: string;
    createDate: Date;
    status: Status;
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
