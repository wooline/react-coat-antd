import {API as ResourceAPI, ListFilter, TableList} from "core/entity/agent";
import AgentService from "service/AgentService";

export class API implements ResourceAPI {
  getTableList(filter: ListFilter): Promise<TableList> {
    return AgentService.getTableList(filter);
  }
}

export default new API();
