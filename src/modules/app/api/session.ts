import sessionService from "service/session";

import { CurUser } from "../model/type";

export type GetCurUserResponse = CurUser;
export type LoginResponse = CurUser;

export class API {
  getCurUser(): Promise<GetCurUserResponse> {
    return sessionService.query({});
  }
  login(username: string, password: string): Promise<LoginResponse> {
    return sessionService.create({ username, password });
  }
}

export const api = new API();
