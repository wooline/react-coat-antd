import { DefaultListFilter, DefaultListItem, DefaultListSummary, ResourceDefined, ResourceExpand } from "../common.type";

export enum NoticeType {
  message = "message",
  todo = "todo",
  inform = "inform",
}

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
    unread: boolean;
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
export type TableList = Expand["TableList"];
export type State = Expand["State"];
export type Actions = Expand["Actions"];
