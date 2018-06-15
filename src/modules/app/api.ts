import { delayPromise } from "react-coat-pkg";
import globalService from "service/global";

import { session, settings } from "core/entity/global.type";

export class API {
  getCurUser(): Promise<session.Item> {
    return globalService.getCurUser({});
  }
  login(username: string, password: string): Promise<session.Item> {
    return globalService.login({ username, password });
  }
  logout(): Promise<void> {
    return globalService.logout({});
  }
  // 模拟1秒延迟
  @delayPromise(1)
  getSettings(): Promise<settings.Item> {
    return globalService.getSettings({});
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const api = new API();
