import { delayPromise } from "react-coat-pkg";
import globalService from "service/global";

import { global } from "core/entity/global.type";

export class API {
  getCurUser(): Promise<global.session.Item> {
    return globalService.getCurUser({});
  }
  login(username: string, password: string): Promise<global.session.Item> {
    return globalService.login({ username, password });
  }
  logout(): Promise<void> {
    return globalService.logout({});
  }
  // 模拟1秒延迟
  @delayPromise(1)
  getSettings(): Promise<global.settings.Item> {
    return globalService.getSettings({});
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const api = new API();
