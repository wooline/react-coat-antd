import { Component } from "@nestjs/common";

import { create, query, Service } from "interface/session";

const List = [{ notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "0", username: "guest", hasLogin: false }, { notices: 2, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "1", username: "jimmy", hasLogin: true }];

@Component()
export class SessionComponent implements Service {
  query(request: query.Request): Promise<query.Response> {
    return Promise.resolve(List[0]);
  }
  create(request: create.Request): Promise<create.Response> {
    return Promise.resolve(List[1]);
  }
}
