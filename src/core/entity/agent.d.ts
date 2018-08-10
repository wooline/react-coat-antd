import {SortOrder, DefaultListFilter, DefaultListItem, DefaultListSummary, ResourceDefined, ResourceExpand} from "./common";
import * as CONST from "../Const";

export type OrderBy = "DATE" | "TEAM_SALE_AMOUNT";

type Defined = ResourceDefined<{
  ListItem: {
    id: number;
    userId: string;
    username: string;
    userType: string;
    planName: string;
    planNameId: string;
    date: string;
    teamSaleAmount: number;
  } & DefaultListItem;
  ListFilter: {
    createdTime?: [number, number];
    customerName?: string;
    sortOrder: SortOrder;
    orderBy: OrderBy;
  } & DefaultListFilter;
  ListSummary: {
    totalSaleAmount: number;
    username: string;
    userType: string;
    createdBy: string;
    incomePlanName: string;
    parentName: string;
    createdTime: string;
  } & DefaultListSummary;
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
export type Handlers = Expand["Handlers"];
export type API = Expand["API"];
