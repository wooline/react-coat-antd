import {Injectable} from "@nestjs/common";
import * as global from "../interface/entity/global";
import {IGlobalService} from "../interface/IGlobalService";

@Injectable()
export default class GlobalService implements IGlobalService {
  getSettings(): Promise<global.settings.Item> {
    return Promise.resolve({
      theme: "blue",
      videoDir: "http://www.baidu.com/",
      pageSize: 20,
    });
  }
  getAdminLayout(): Promise<global.adminLayout.Item> {
    return {} as any;
  }
  getCurUser(): Promise<global.session.Item> {
    return {} as any;
  }
  login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    return {} as any;
  }
  logout(): Promise<void> {
    return {} as any;
  }
}
