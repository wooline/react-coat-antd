import { delayPromise } from "react-coat-pkg";
import globalService from "service/globalServiceClient";

import { SessionItem, ProjectConfig } from "core/entity/global.type";

export class API {
  getCurUser(): Promise<SessionItem> {
    return globalService.getCurUser({ a: 1 });
  }
  login(username: string, password: string): Promise<SessionItem> {
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
