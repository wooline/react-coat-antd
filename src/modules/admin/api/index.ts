import globalService from "service/global";

import { MenuItemData, Notices } from "../model/type";

export type GetMenuResponse = MenuItemData[];
export type GetNoticesResponse = Notices;

export class API {
  getNotices(): Promise<GetNoticesResponse> {
    return globalService.getNotices({});
  }
  getMenu(): Promise<GetMenuResponse> {
    return globalService.getMenu({});
  }
}

export const api = new API();
