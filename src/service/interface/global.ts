import { common } from "./entity/common.type";
import { global } from "./entity/global.type";

export namespace getSettings {
  export interface Request {}
  export type Response = global.settings.Item;
  export const metadata = { method: "GET", path: "/ajax/global/settings" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace updateSettings {
  export interface Request {
    theme: global.settings.ThemeValue;
    videoDir: string;
    pageSize: number;
  }
  export type Response = Request;
  export const metadata = { method: "POST", path: "/ajax/global/settings" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace getCurUser {
  export interface Request {}
  export type Response = global.session.Item;
  export const metadata = { method: "GET", path: "/ajax/global/curUser" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace getPushData {
  export interface Request {}
  export type Response = global.session.PushData;
  export const metadata = { method: "GET", path: "/ajax/global/pushData" };
  export type Action = (request: Request) => Promise<Response>;
}

export namespace login {
  export interface Request {
    username: string;
    password: string;
  }
  export type Response = global.session.Item;
  export const metadata = { method: "PUT", path: "/ajax/global/curUser" };
  export type Action = (request: Request) => Promise<Response>;
  export enum ErrorCode {
    reject = "1001 reject",
  }
  export namespace error {
    export type Reject = common.ErrorBase<ErrorCode.reject, null>;
  }
}
export namespace logout {
  export interface Request {}
  export type Response = void;
  export const metadata = { method: "DELETE", path: "/ajax/global/curUser" };
  export type Action = (request: Request) => Promise<Response>;
}
export namespace getMenu {
  export interface Request {}
  export type Response = global.menu.Item[];
  export const metadata = { method: "GET", path: "/ajax/global/menu" };
  export type Action = (request: Request) => Promise<Response>;
}

export namespace getNotices {
  export type Request = global.notice.ListFilter;
  export type Response = global.notice.List;
  export const metadata = { method: "GET", path: "/ajax/global/notices" };
  export type Action = (request: Request) => Promise<Response>;
}

export namespace deleteNotices {
  export interface Request {
    type: string;
    page: number;
    unread: boolean;
  }
  export type Response = void;
  export const metadata = { method: "DELETE", path: "/ajax/global/notices/:type" };
  export type Action = (request: Request) => Promise<Response>;
}

export namespace getDashboardData {
  export interface Request {}
  export type Response = global.dashboardData.Item;
  export const metadata = { method: "GET", path: "/ajax/global/dashboardData" };
  export type Action = (request: Request) => Promise<Response>;
}
export interface Service {
  getSettings: getSettings.Action;
  updateSettings: updateSettings.Action;
  getCurUser: getCurUser.Action;
  getPushData: getPushData.Action;
  login: login.Action;
  logout: logout.Action;
  getMenu: getMenu.Action;
  getNotices: getNotices.Action;
  getDashboardData: getDashboardData.Action;
}

export default { getSettings, updateSettings, getCurUser, getPushData, login, logout, getMenu, getNotices, getDashboardData };
