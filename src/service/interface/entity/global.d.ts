export namespace global {
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
    export interface Item {
      avatar: string;
      uid: string;
      username: string;
      hasLogin: boolean;
      notices: number;
    }
  }
}
