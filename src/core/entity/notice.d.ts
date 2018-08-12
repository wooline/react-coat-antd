import {DefaultListFilter, DefaultListItem, DefaultListSummary, ResourceDefined, ResourceExpand, NTrue} from "./common";
import * as CONST from "../Const";

export type NoticeType = "message" | "todo" | "inform";

type Defined = ResourceDefined<{
  ListItem: {
    id: string;
    unread: boolean;
    avatar: string;
    title: string;
    extra: string;
    description: string;
    datetime: string;
  } & DefaultListItem;
  ListFilter: {
    type: NoticeType;
    unread: NTrue | null;
  } & DefaultListFilter;
  ListSummary: {
    unreadTotal: number;
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
export type TableList = Expand["TableList"] & {selectedIds?: string[]};
