export namespace query {
  export interface Request {}
  export interface Response {
    avatar: string;
    uid: string;
    username: string;
    hasLogin: boolean;
    notices: number;
  }
  export const metadata = { method: "GET", path: "/ajax/session" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace create {
  export interface Request {
    username: string;
    password: string;
  }
  export interface Response {
    avatar: string;
    uid: string;
    username: string;
    hasLogin: boolean;
    notices: number;
  }
  export const metadata = { method: "PUT", path: "/ajax/session" };
  export type Action = (request: create.Request) => Promise<create.Response>;
}
export interface Service {
  query: query.Action;
  create: create.Action;
}
export default { query, create };
