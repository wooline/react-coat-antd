import {ajax} from "core/utils/request";
import * as global from "./interface/global";

export default class Service {
  static settings(): Promise<global.settings.Item> {
    return ajax("GET", "/ajax/global/settings");
  }
  static adminLayout(): Promise<global.adminLayout.Item> {
    return ajax("GET", "/ajax/global/adminLayout");
  }
  static curUser(): Promise<global.session.Item> {
    return ajax<{loggedIn: boolean; username: string; userId: string}>("GET", "/ajax/currentUser").then(data => {
      return {
        notices: 10,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        uid: data.userId,
        username: data.username,
        hasLogin: data.loggedIn,
      };
    });
  }
  static login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    return ajax<{success: boolean; errorMessage: string; username: string; userId: string}>("PUT", "/ajax/login", request).then(data => {
      if (data.success) {
        return {
          data: {
            notices: 10,
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            uid: data.userId,
            username: data.username,
            hasLogin: true,
          },
        };
      } else {
        return {
          data: {
            notices: 0,
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            uid: "0",
            username: "guest",
            hasLogin: false,
          },
          errorCode: "1001 reject" as "1001 reject",
          errorMessage: data.errorMessage,
        };
      }
    });
  }
  static logout(): Promise<void> {
    return ajax("DELETE", "/ajax/logout");
  }
}
