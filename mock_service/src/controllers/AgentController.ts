import {Controller, Get, Query} from "@nestjs/common";
import * as agent from "../interface/entity/agent";
import {IAgentService} from "../interface/IAgentService";
import Service from "../service/AgentService";

@Controller("/ajax/agent/")
export default class AgentController implements IAgentService {
  constructor(private readonly service: Service) {}

  @Get("agents")
  async getTableList(@Query() request: agent.ListFilter): Promise<agent.TableList> {
    return this.service.getTableList(request);
  }
}
