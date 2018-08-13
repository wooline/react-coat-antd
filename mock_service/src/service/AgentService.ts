import {Injectable} from "@nestjs/common";
import * as agent from "../interface/entity/agent";
import {IAgentService} from "../interface/IAgentService";

@Injectable()
export default class AgentService implements IAgentService {
  getTableList(request: agent.ListFilter): Promise<agent.TableList> {
    return {} as any;
  }
}
