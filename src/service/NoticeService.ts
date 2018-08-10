import {ajax} from "core/utils/request";
import * as notice from "./interface/notice";

export default class Service {
  static deleteList(request: notice.DeleteListRequest): Promise<void> {
    return ajax("DELETE", "/ajax/global/notices/:type", request);
  }
  static list(request: notice.ListFilter): Promise<notice.TableList> {
    return ajax("GET", "/ajax/global/notices", request);
  }
}
