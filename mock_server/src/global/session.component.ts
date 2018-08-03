import { getCurUser, getPushData, login, logout } from "@interface/globalService";
import { Component, HttpException, HttpStatus } from "@nestjs/common";
import * as notices from "./notices.data";

const guest = { notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "0", username: "guest", hasLogin: false };
const admin = { notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "admin", username: "admin", hasLogin: true };
let curUser: login.Response = guest;

@Component()
export class SessionComponent {
  getCurUser(request: getCurUser.Request): Promise<getCurUser.Response> {
    if (curUser === admin) {
      return Promise.resolve({ ...admin, notices: notices.getNoticesNum() });
    } else {
      return Promise.resolve(curUser);
    }
  }
  getPushData(request: getPushData.Request): Promise<getPushData.Response> {
    return Promise.resolve({ notices: notices.getNoticesNum() });
  }
  login(request: login.Request): Promise<login.Response> {
    if (request.username === "admin" && request.password === "admin") {
      curUser = admin;
      return Promise.resolve({ ...admin, notices: notices.getNoticesNum() });
    }
    const rejectError: login.error.Reject = { code: login.ErrorCode.reject, message: "用户名或密码错误！", detail: null };
    throw new HttpException(rejectError, HttpStatus.BAD_REQUEST);
  }
  logout(request: logout.Request): Promise<logout.Response> {
    curUser = guest;
    return Promise.resolve(null);
  }
}
