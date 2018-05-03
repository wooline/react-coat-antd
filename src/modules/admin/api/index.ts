import globalService from "service/global";

import { MenuItemData, Notices } from "../model/type";

export class API {
  getNotices(): Promise<Notices> {
    return globalService.getNotices({});
  }
  getMenu(): Promise<MenuItemData[]> {
    return globalService.getMenu({});
  }
  emptyNotices(type: string): Promise<void> {
    return globalService.emptyNotices({ type });
  }
}

export const api = new API();
