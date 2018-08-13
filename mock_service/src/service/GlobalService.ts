import {Injectable} from "@nestjs/common";
import * as global from "../controllers/interface/global";

@Injectable()
export default class Service {
  getSettings(): global.settings.Item {
    return {} as any;
  }
  getAdminLayout(): global.adminLayout.Item {
    return {} as any;
  }
  getCurUser(): global.session.Item {
    return {} as any;
  }
  login(request: global.session.LoginAPI.Request): global.session.LoginAPI.Response {
    return {} as any;
  }
  logout(): void {
    return {} as any;
  }
}
