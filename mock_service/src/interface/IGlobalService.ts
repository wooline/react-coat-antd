import * as global from "./entity/global";

export interface IGlobalService {
  getSettings(): Promise<global.settings.Item>;
  getAdminLayout(): Promise<global.adminLayout.Item>;
  getCurUser(): Promise<global.session.Item>;
  login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response>;
  logout(): Promise<void>;
}
