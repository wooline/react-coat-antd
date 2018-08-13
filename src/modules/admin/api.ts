import {Item as AdminLayoutItem} from "entity/adminLayout";
import GlobalService from "service/GlobalService";

export class API {
  getAdminLayout(): Promise<AdminLayoutItem> {
    return GlobalService.getAdminLayout();
  }
}

export default new API();
