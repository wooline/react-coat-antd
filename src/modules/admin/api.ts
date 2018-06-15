import globalService from "service/global";

import { notice, menu } from "core/entity/global.type";

export class API {
  deleteNotices(request: { type: string; ids: string[] }): Promise<void> {
    return globalService.deleteNotices(request);
  }
  getNotices(filter: notice.ListFilter): Promise<notice.List> {
    return globalService.getNotices(filter);
  }
  getMenu(): Promise<menu.Item[]> {
    return globalService.getMenu({});
  }
}

export const api = new API();
