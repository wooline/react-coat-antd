import * as agent from "./entity/agent";

export interface IAgentService {
  getTableList(request: agent.ListFilter): Promise<agent.TableList>;
}
