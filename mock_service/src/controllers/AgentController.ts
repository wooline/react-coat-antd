import {Controller, Get, Query} from "@nestjs/common";
import Service from "service/AgentService";
import * as agent from "./interface/agent";

@Controller("/ajax/agent/")
export default class AgentController {
  constructor(private readonly service: Service) {}

  @Get("agents")
  getTableList(@Query() request: agent.ListFilter): agent.TableList {
    return this.service.getTableList(request);
  }
}
