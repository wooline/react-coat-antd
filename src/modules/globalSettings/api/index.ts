import globalService from "service/global";
import { global } from "core/entity/global.type";

export class API {
  updateGlobalSettings(data: global.settings.Item): Promise<global.settings.Item> {
    return globalService.updateSettings(data);
  }
}

export const api = new API();
