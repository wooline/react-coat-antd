export namespace common {
  export interface List<Item, Filter> {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPage: number;
    };
    filter: Filter;
    list: Item[];
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
