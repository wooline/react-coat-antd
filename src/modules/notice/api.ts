import { NoticeType, TableList, ListFilter } from "core/entity/notice";
import NoticeService from "service/NoticeService";

export class API {
  deleteList(request: { type: NoticeType; ids: string[] }): Promise<void> {
    return NoticeService.deleteList(request);
  }
  getTabelList(filter: ListFilter): Promise<TableList> {
    return NoticeService.list(filter);
  }
}

export default new API();
