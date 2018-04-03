import { getCurUser, login } from "@interface/global";
import { Component } from "@nestjs/common";

const List = [{ notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "0", username: "guest", hasLogin: false }, { notices: 2, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "1", username: "jimmy", hasLogin: true }];

@Component()
export class SessionComponent {
  getCurUser(request: getCurUser.Request): Promise<getCurUser.Response> {
    return Promise.resolve(List[0]);
  }
  login(request: login.Request): Promise<login.Response> {
    return Promise.resolve(List[1]);
  }
}
