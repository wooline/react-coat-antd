export interface ProjectConfig {
  theme: "blue" | "green" | "red";
  videoDir: string;
  pageSize: number;
}
export interface CurUser {
  avatar: string;
  uid: string;
  username: string;
  hasLogin: boolean;
  notices: number;
}
