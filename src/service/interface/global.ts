import { global } from "./entity/global";

export namespace getCurUser {
  export interface Request {}
  export type Response = global.session.Item;
  export const metadata = { method: "GET", path: "/ajax/global/getCurUser" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace login {
  export interface Request {
    username: string;
    password: string;
  }
  export type Response = global.session.Item;
  export const metadata = { method: "PUT", path: "/ajax/global/login" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace getMenu {
  export interface Request {}
  export type Response = global.menu.Item[];
  export const metadata = { method: "GET", path: "/ajax/global/getMenu" };
  export type Action = (request: Request) => Promise<Response>;
}

export namespace getNotices {
  export interface Request {}
  export type Response = Array<{ title: string; type: string; list: global.notice.Item[] }>;
  export const metadata = { method: "GET", path: "/ajax/global/getNotices" };
  export type Action = (request: Request) => Promise<Response>;
}
export interface Service {
  getCurUser: getCurUser.Action;
  login: login.Action;
  getMenu: getMenu.Action;
  getNotices: getNotices.Action;
}

export default { getCurUser, login, getMenu, getNotices };
