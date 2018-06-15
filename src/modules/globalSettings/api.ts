import globalService from "service/global";
import { settings } from "core/entity/global.type";

export class API {
  updateGlobalSettings(data: settings.Item): Promise<settings.Item> {
    return globalService.updateSettings(data);
  }
}

export const api = new API();
