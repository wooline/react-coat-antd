import {SortOrder, DefaultListFilter, DefaultListItem, DefaultListSummary, ResourceDefined, ResourceExpand} from "./common";
import * as CONST from "../Const";

export type OrderBy = "DATE" | "TEAM_SALE_AMOUNT";

type Defined = ResourceDefined<{
  ListItem: {
    userId: string;
    username: string;
    planName: string;
    planId: string;
    parentUsername: string;
    createdTime: string;
    teamSale: number;
  } & DefaultListItem;
  ListFilter: {
    createdTime: [number, number] | null;
    customerName: string | null;
    sort: [OrderBy, SortOrder] | null;
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
export type ItemDetail = ListItem;
export type TableList = Expand["TableList"];
export type State = Expand["State"];
export type Handlers = Expand["Handlers"];
export type API = Expand["API"];
