import {ajax} from "utils/request";
import * as global from "interface//entity/global";
import {IGlobalService} from "interface//IGlobalService";

export class Service implements IGlobalService {
  getSettings(): Promise<global.settings.Item> {
    return ajax("GET", "/ajax/global/settings");
  }
  getAdminLayout(): Promise<global.adminLayout.Item> {
    return ajax("GET", "/ajax/global/adminLayout");
  }
  getCurUser(): Promise<global.session.Item> {
    return ajax("GET", "/ajax/global/curUser");
  }
  login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    return ajax("PUT", "/ajax/global/login", request);
  }
  logout(): Promise<void> {
    return ajax("DELETE", "/ajax/global/logout");
  }
}

export default new Service();
