import globalService from "service/global";
import { GlobalSettingsData } from "../model/type";

export class API {
  updateGlobalSettings(data: GlobalSettingsData): Promise<GlobalSettingsData> {
    return globalService.updateSettings(data);
  }
}

export const api = new API();
