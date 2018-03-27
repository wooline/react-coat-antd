export interface GetCurUserResponse {
  uid: string;
  username: string;
  hasLogin: boolean;
}
export interface LoginResponse {
  uid: string;
  username: string;
  hasLogin: boolean;
}

export class API {
  getCurUser(): Promise<GetCurUserResponse> {
    return Promise.resolve({ uid: "0", username: "guest", hasLogin: false });
  }
  login(username: string, password: string): Promise<LoginResponse> {
    return Promise.resolve({ uid: "1", username: "jimmy", hasLogin: true });
  }
}

export const api = new API();
