import * as notice from "./entity/notice";

export interface INoticeService {
  deleteList(request: notice.DeleteListRequest): Promise<void>;
  getTableList(request: notice.ListFilter): Promise<notice.TableList>;
}
