export interface SessionPushData {
  notices: number;
}
export interface Item {
  avatar: string;
  uid: string;
  username: string;
  hasLogin: boolean;
  notices: number;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  data: Item;
  errorCode?: LoginErrorCode;
  errorMessage?: string;
}
export type LoginErrorCode = "1001 reject";
