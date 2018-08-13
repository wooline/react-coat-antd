import {Injectable} from "@nestjs/common";
import * as agent from "../controllers/interface/agent";

@Injectable()
export default class Service {
  getTableList(request: agent.ListFilter): agent.TableList {
    return {} as any;
  }
}
