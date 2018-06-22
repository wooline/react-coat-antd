import { TableList } from "../common.type";

export namespace user {
  export namespace supervisor {
    export enum Status {
      active = "active",
      disable = "disable",
    }
    export interface ListFilter {
      status: Status;
      username: string;
    }
    export interface ListSummary {}
    export interface Item {
      id: string;
      username: string;
      avatar: string;
      createDate: Date;
      status: Status;
    }
    export type List = TableList<Item, ListFilter, ListSummary>;
  }
}
