import {Injectable} from "@nestjs/common";
import * as notice from "../controllers/interface/notice";

@Injectable()
export default class Service {
  deleteList(request: notice.DeleteListRequest): void {
    return {} as any;
  }
  getTableList(request: notice.ListFilter): notice.TableList {
    return {} as any;
  }
}
