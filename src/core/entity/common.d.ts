import {LoadingState} from "react-coat-pkg";
export type Optional<F> = {[K in keyof F]?: F[K]};
export interface TableList<Item, Filter, Summary> {
  filter: Filter;
  list: Item[];
  summary: Summary;
}
export interface DefaultListItem {
  id: string | number;
}
export interface DefaultListFilter {
  page: number;
  pageSize: number;
}
export interface DefaultListSummary {
  total?: number;
  totalPage?: number;
}
export interface DefaultActionResult {
  success: boolean;
}
export interface ResourceBase {
  ListItem;
  ListFilter;
  ListSummary;
  ItemDetail;
  ItemCreateData;
  ItemUpdateData;
  ItemCreateResult;
  ItemUpdateResult;
}

export type ResourceDefined<Resource extends ResourceBase = ResourceBase> = {[K in keyof Resource]: Resource[K]};
export interface ResourceExpand<Resource extends ResourceBase = ResourceBase> {
  TableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
  ListOptional: Optional<Resource["ListFilter"]>;
  State: {
    curItem?: Resource["ItemDetail"];
    tableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
    loading: {[key: string]: LoadingState};
  };
  ResourceSelectorState: {
    selectedItems: Array<Resource["ListItem"]>;
    tableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
  };
  API: {
    getTableList(payload: Optional<Resource["ListFilter"]>): Promise<TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>>;
    createItem(payload: Resource["ItemCreateData"]): Promise<Resource["ItemCreateResult"]>;
    updateItem(payload: Resource["ItemUpdateData"]): Promise<Resource["ItemUpdateResult"]>;
  };
  Actions: {
    getTableList(filter: Optional<Resource["ListFilter"]>);
    setTableList(tableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>);
    setCurItem(item: Resource["ItemDetail"] | "create");
    updateItem(item: Resource["ItemUpdateData"]);
    createItem(item: Resource["ItemCreateData"]);
  };
  ActionsCreator: {
    getTableList(payload: Optional<Resource["ListFilter"]>);
    setTableList(payload: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>);
    setCurItem(payload: Resource["ItemDetail"] | "create");
    updateItem(payload: Resource["ItemUpdateData"]);
    createItem(payload: Resource["ItemCreateData"]);
  };
  ResourceSelectorActions: {
    getTableList({payload}: {payload: Optional<Resource["ListFilter"]>});
    setTableList({payload}: {payload: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>});
    setSelecedItem({payload}: {payload: Array<Resource["ListItem"]>});
  };
}

export enum ErrorCode {
  notFound = "404 notFound",
}
export interface ErrorBase<Code, Detail> {
  code: Code;
  message: string;
  detail: Detail;
}
export type Error_NotFound = ErrorBase<"404 notFound", null>;
export type Common_Error = Error_NotFound;
