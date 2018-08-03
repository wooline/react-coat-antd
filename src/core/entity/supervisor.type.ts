import { DefaultListFilter, DefaultListItem, DefaultListSummary, ResourceDefined, ResourceExpand } from "../common.type";

export enum Status {
  all = "all",
  active = "active",
  disable = "disable",
}
type Defined = ResourceDefined<{
  ListItem: {
    id: string;
    username: string;
    avatar: string;
    createDate: Date;
    status: Status;
  } & DefaultListItem;
  ListFilter: {
    status?: Status;
    username?: string;
    createDate?: [Date, Date];
    incomePlanId?: string;
    balanceMoreThan?: number;
  } & DefaultListFilter;
  ListSummary: {} & DefaultListSummary;
  ItemDetail: any;
  ItemCreateData: any;
  ItemUpdateData: any;
  ItemCreateResult: any;
  ItemUpdateResult: any;
}>;
type Expand = ResourceExpand<Defined>;

export type ListItem = Defined["ListItem"];
export type ListFilter = Defined["ListFilter"];
export type ListSummary = Defined["ListSummary"];
export type ListOptional = Expand["ListOptional"];
export type TableList = Expand["TableList"];
export type State = Expand["State"];
export type Actions = Expand["Actions"];
