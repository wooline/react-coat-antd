export namespace user {
  export namespace supervisor {
    export enum Status {
      all = "all",
      active = "active",
      disable = "disable",
    }
    export interface ListFilter {
      page?: number;
      pageSize?: number;
      createDate: [Date, Date];
      status: Status;
      username: string;
    }
    export interface ListSummary {
      total?: number;
      totalPage?: number;
    }
    export interface ListItem {
      id: string;
      username: string;
      avatar: string;
      createDate: Date;
      status: Status;
    }
    export interface TableList {
      filter: ListFilter;
      list: ListItem[];
      summary: ListSummary;
    }
  }
}
