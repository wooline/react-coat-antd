import {Injectable} from "@nestjs/common";
import * as notice from "../interface/entity/notice";
import {INoticeService} from "../interface/INoticeService";

@Injectable()
export default class NoticeService implements INoticeService {
  deleteList(request: notice.DeleteListRequest): Promise<void> {
    return {} as any;
  }
  getTableList(request: notice.ListFilter): Promise<notice.TableList> {
    return {} as any;
  }
}
