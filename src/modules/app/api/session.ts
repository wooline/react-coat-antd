import globalService from "service/global";

import { CurUser } from "../model/type";

export type GetCurUserResponse = CurUser;
export type LoginResponse = CurUser;

export class API {
  getCurUser(): Promise<GetCurUserResponse> {
    return globalService.getCurUser({});
  }
  login(username: string, password: string): Promise<LoginResponse> {
    return globalService.login({ username, password });
  }
}

export const api = new API();
