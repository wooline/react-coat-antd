import globalService from "service/global";

import { menu } from "core/entity/global.type";
import { NoticeTableList, NoticeListFilter } from "./type";

export class API {
  deleteNotices(request: { type: string; ids: string[] }): Promise<void> {
    return globalService.deleteNotices(request);
  }
  getNotices(filter: NoticeListFilter): Promise<NoticeTableList> {
    return globalService.getNotices(filter);
  }
  getMenu(): Promise<menu.Item[]> {
    return globalService.getMenu({});
  }
}

export const api = new API();
