import {ajax} from "core/utils/request";
import * as global from "./interface/global";

export default class Service {
  static getSettings(): Promise<global.settings.Item> {
    return ajax("GET", "/ajax/global/settings");
  }
  static getAdminLayout(): Promise<global.adminLayout.Item> {
    return ajax("GET", "/ajax/global/adminLayout");
  }
  static getCurUser(): Promise<global.session.Item> {
    return ajax("GET", "/ajax/global/curUser");
  }
  static login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    return ajax("PUT", "/ajax/global/login", request);
  }
  static logout(): Promise<void> {
    return ajax("DELETE", "/ajax/global/logout");
  }
}
