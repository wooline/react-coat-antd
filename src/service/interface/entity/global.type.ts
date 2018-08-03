export namespace global {
  export namespace settings {
    export enum ThemeValue {
      blue = "blue",
      green = "green",
      red = "red",
    }
    export interface Item {
      theme: ThemeValue;
      videoDir: string;
      pageSize: number;
    }
  }
  export namespace notice {
    export enum NoticeType {
      message = "message",
      todo = "todo",
      inform = "inform",
    }
    export interface ListFilter {
      page?: number;
      pageSize?: number;
      type: NoticeType;
      unread: boolean;
    }
    export interface ListSummary {
      total?: number;
      totalPage?: number;
      unreadTotal: number;
    }
    export interface ListItem {
      id: string;
      unread: boolean;
      avatar: string;
      title: string;
      extra: string;
      description: string;
      datetime: string;
    }
    export interface TableList {
      filter: ListFilter;
      list: ListItem[];
      summary: ListSummary;
    }
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
