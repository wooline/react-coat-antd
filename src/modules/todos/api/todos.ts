import { setLoading } from "react-coat-pkg";

import { NAMESPACE } from "../actionNames";

export interface GetTodosListResponse {
  list: string[];
}
export class AJAX {
  // mock一个耗时3秒的异步请求
  getTodosList(): Promise<GetTodosListResponse> {
    return Promise.resolve({ list: ["todo1", "todo2"] });
  }
}

const ajax = new AJAX();

export class API {
  getTodosList(): Promise<GetTodosListResponse> {
    return setLoading(ajax.getTodosList(), NAMESPACE);
  }
}

export const api = new API();
