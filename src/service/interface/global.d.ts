export namespace common {
  export type SortOrder = "DESC" | "ASC";
}
export namespace settings {
  export type ThemeValue = "blue" | "green" | "red";
  export interface Item {
    theme: ThemeValue;
    videoDir: string;
    pageSize: number;
  }
}

export namespace adminLayout {
  export interface MenuItem {
    name: string;
    icon?: string;
    path: string;
    children?: MenuItem[];
    target?: string;
  }
  export interface FooterData {
    links: Array<{
      key: string;
      title: string;
      href: string;
      blankTarget: boolean;
    }>;
    copyright: string;
    className?: string;
  }
  export interface GlobalSearchData {
    placeholder: string;
    dataSource: string[];
  }
  export interface Item {
    menu: MenuItem[];
    footer: FooterData;
    globalSearch: GlobalSearchData;
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
  export namespace LoginAPI {
    export interface Request {
      username: string;
      password: string;
    }
    export interface Response {
      data: Item;
      errorCode?: ErrorCode;
      errorMessage?: string;
    }
    export type ErrorCode = "1001 reject";
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
