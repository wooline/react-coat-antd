export type Optional<F> = { [K in keyof F]?: F[K] };
export interface DefListFilter {
  page?: number;
  pageSize?: number;
}
export interface DefListSummary {
  total?: number;
  totalPage?: number;
}
export interface TableList<Item, Filter, Summary> {
  filter: DefListFilter & Filter;
  list: Item[];
  summary: DefListSummary & Summary;
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
