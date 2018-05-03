import { delayPromise } from "react-coat-pkg";
import globalService from "service/global";

import { CurUser, ProjectConfig } from "../model/type";

export class API {
  getCurUser(): Promise<CurUser> {
    return globalService.getCurUser({});
  }
  login(username: string, password: string): Promise<CurUser> {
    return globalService.login({ username, password });
  }
  logout(): Promise<void> {
    return globalService.logout({});
  }
  // 模拟1秒延迟
  @delayPromise(1)
  getSettings(): Promise<ProjectConfig> {
    return globalService.getSettings({});
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const api = new API();
