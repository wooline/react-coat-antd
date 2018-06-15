export type Optional<F> = { [K in keyof F]?: F[K] };
export interface DefListFilter {
  page?: number;
  pageSize?: number;
}
export interface DefListSummary {
  total?: number;
  totalPage?: number;
}
export interface DefActionResult {
  success: boolean;
}
export interface TableList<Item, Filter, Summary> {
  filter: DefListFilter & Filter;
  list: Item[];
  summary: DefListSummary & Summary;
}
export interface CommonResource<Resource extends { ListItem; ListFilter; ListSummary; ItemDetail; ItemCreate; ItemUpdate; ItemCreateResult; ItemUpdateResult } = { ListItem; ListFilter; ListSummary; ItemDetail; ItemCreate; ItemUpdate; ItemCreateResult; ItemUpdateResult }> {
  ListItem: Resource["ListItem"];
  ListFilter: DefListFilter & Resource["ListFilter"];
  ListSummary: DefListSummary & Resource["ListSummary"];
  ItemDetail: Resource["ItemDetail"];
  ItemCreate: Resource["ItemCreate"];
  ItemUpdate: Resource["ItemUpdate"];
  ItemCreateResult: Resource["ItemCreateResult"];
  ItemUpdateResult: Resource["ItemUpdateResult"];
  TableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
  ListOptional: Optional<DefListFilter & Resource["ListFilter"]>;
  ResourceApi: {
    getTableList(payload: Optional<DefListFilter & Resource["ListFilter"]>): Promise<TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>>;
    createItem(payload: Resource["ItemCreate"]): Promise<Resource["ItemCreateResult"]>;
    updateItem(payload: Resource["ItemUpdate"]): Promise<Resource["ItemUpdateResult"]>;
  };
  ResourceState: {
    curItem: Resource["ItemDetail"];
    tableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
  };
  ResourceSelectorState: {
    selectedItems: Array<Resource["ListItem"]>;
    tableList: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>;
  };
  ResourceActions: {
    getTableList({ payload }: { payload: Optional<DefListFilter & Resource["ListFilter"]> });
    setTableList({ payload }: { payload: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]> });
    setCurItem({ payload }: { payload: Resource["ItemDetail"] | "create" });
    updateItem({ payload }: { payload: Resource["ItemUpdate"] });
    createItem({ payload }: { payload: Resource["ItemCreate"] });
  };
  ResourceActionsCreator: {
    getTableList(payload: Optional<DefListFilter & Resource["ListFilter"]>);
    setTableList(payload: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]>);
    setCurItem(payload: Resource["ItemDetail"] | "create");
    updateItem(payload: Resource["ItemUpdate"]);
    createItem(payload: Resource["ItemCreate"]);
  };
  ResourceSelectorActions: {
    getTableList({ payload }: { payload: Optional<DefListFilter & Resource["ListFilter"]> });
    setTableList({ payload }: { payload: TableList<Resource["ListItem"], Resource["ListFilter"], Resource["ListSummary"]> });
    setSelecedItem({ payload }: { payload: Array<Resource["ListItem"]> });
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
