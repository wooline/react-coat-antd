import {ProjectConfig} from "core/entity/global";
import {LoginRequest, LoginResponse, Item as SessionItem} from "core/entity/session";
import {delayPromise} from "react-coat-pkg";
import GlobalService from "service/GlobalService";

export class API {
  getCurUser(): Promise<SessionItem> {
    return GlobalService.getCurUser();
  }
  login(request: LoginRequest): Promise<LoginResponse> {
    return GlobalService.login(request);
  }
  logout(): Promise<void> {
    return GlobalService.logout();
  }
  // 模拟1秒延迟
  @delayPromise(1)
  getSettings(): Promise<ProjectConfig> {
    return GlobalService.getSettings();
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export default new API();
