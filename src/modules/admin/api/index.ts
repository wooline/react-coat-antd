import globalService from "service/global";

import { global } from "core/entity/global.type";

export class API {
  getNotices(filter: global.notice.ListFilter): Promise<global.notice.List> {
    return globalService.getNotices(filter);
  }
  getMenu(): Promise<global.menu.Item[]> {
    return globalService.getMenu({});
  }
}

export const api = new API();
