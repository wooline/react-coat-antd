import { CurUser } from "../model/type";

export type GetCurUserResponse = CurUser;
export type LoginResponse = CurUser;

export class API {
  getCurUser(): Promise<GetCurUserResponse> {
    return Promise.resolve({ notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "0", username: "guest", hasLogin: false });
  }
  login(username: string, password: string): Promise<LoginResponse> {
    return Promise.resolve({ notices: 10, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "1", username: "jimmy", hasLogin: true });
  }
}

export const api = new API();
