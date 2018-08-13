import {ajax} from "core/utils/request";
import * as notice from "./interface/notice";

export default class Service {
  static deleteList(request: notice.DeleteListRequest): Promise<void> {
    return ajax("DELETE", "/ajax/notice/:type", request);
  }
  static getTableList(request: notice.ListFilter): Promise<notice.TableList> {
    return ajax("GET", "/ajax/notice/notices", request);
  }
}
