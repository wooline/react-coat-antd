export namespace resource.preset {
  export namespace query {
    export interface Request {}
    export interface Response {
      title: string;
    }
    export const metadata = { method: "GET", path: "/ajax/preset" };
    export type Action = (request: Request) => Promise<Response>;
  }
  export interface Service {
    query: query.Action;
  }
}
