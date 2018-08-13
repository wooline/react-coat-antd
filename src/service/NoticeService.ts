import {ajax} from "utils/request";
import * as notice from "interface//entity/notice";
import {INoticeService} from "interface//INoticeService";

export class Service implements INoticeService {
  deleteList(request: notice.DeleteListRequest): Promise<void> {
    return ajax("DELETE", "/ajax/notice/:type", request);
  }
  getTableList(request: notice.ListFilter): Promise<notice.TableList> {
    return ajax("GET", "/ajax/notice/notices", request);
  }
}
export default new Service();
