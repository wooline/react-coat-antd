import {ajax} from "utils/request";
import * as agent from "interface//entity/agent";
import {IAgentService} from "interface//IAgentService";

export class Service implements IAgentService {
  getTableList(request: agent.ListFilter): Promise<agent.TableList> {
    return ajax("GET", "/ajax/agent/agents", request);
  }
}
export default new Service();
