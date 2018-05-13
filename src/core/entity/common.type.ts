export namespace common {
  export interface List<Item, Filter, Summary> {
    filter: {
      page?: number;
      pageSize?: number;
    } & Filter;
    list: Item[] | null;
    summary:
      | null
      | {
          total?: number;
          totalPage?: number;
        } & Summary;
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
}
