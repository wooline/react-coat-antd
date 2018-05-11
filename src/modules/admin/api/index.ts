import globalService from "service/global";

import { MenuItemData, Notices, NoticesChannel, NoticesChannelFilter } from "../model/type";

export class API {
  getNotices(): Promise<Notices> {
    return globalService.getNotices({});
  }
  getMenu(): Promise<MenuItemData[]> {
    return globalService.getMenu({});
  }
  filterNotices(filter: NoticesChannelFilter): Promise<NoticesChannel> {
    return globalService.filterNotices(filter);
  }
}

export const api = new API();
