import globalService from "service/global";

import { DashboardData } from "./type";

export class API {
  getDashboardData(): Promise<DashboardData> {
    return globalService.getDashboardData({});
  }
}

export const api = new API();
