import {ajax} from "core/utils/request";
import * as agent from "./interface/agent";

export default class Service {
  static getTableList(request: agent.ListFilter): Promise<agent.TableList> {
    return ajax("GET", "/ajax/agent/agents", request);
  }
}
