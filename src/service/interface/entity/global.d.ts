import { common } from "./common";

export namespace global {
  export namespace settings {
    export type ThemeValue = "blue" | "green" | "red";
    export interface Item {
      theme: ThemeValue;
      videoDir: string;
      pageSize: number;
    }
  }
  export namespace notice {
    export interface Item {
      key?: string;
      id: string;
      read?: boolean;
      avatar?: string;
      title: string;
      extra?: string;
      description?: string;
      datetime?: string;
    }
    export type List = common.List<Item>;
  }

  export namespace menu {
    export interface Item {
      name: string;
      icon?: string;
      path: string;
      children?: Item[];
      target?: string;
    }
  }
  export namespace session {
    export interface PushData {
      notices: number;
    }
    export interface Item {
      avatar: string;
      uid: string;
      username: string;
      hasLogin: boolean;
      notices: number;
    }
  }
  export namespace dashboardData {
    export interface Item {
      username: string;
      ip: string;
      total: {
        pictures: number;
        videos: number;
      };
    }
  }
}
