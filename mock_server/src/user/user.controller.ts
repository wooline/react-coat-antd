import { Service, getSupervisors } from "@interface/userService";
import { Body, Query, Controller, Param } from "@nestjs/common";
import { buildMethod } from "utils";
import { user } from "@interface/entity/user.type";
import { SupervisorComponent } from "./supervisor.component";

const basePath = "/ajax/user/";

const method = buildMethod(basePath);

@Controller(basePath)
export class UserController implements Service {
  constructor(private readonly adminService: SupervisorComponent) {}

  @method(getSupervisors.metadata)
  async getSupervisors(@Query() query) {
    query.status = query.status && query.status !== "null" ? (query.status === user.supervisor.Status.active ? user.supervisor.Status.active : user.supervisor.Status.disable) : null;
    query.page = parseInt(query.page, 10) || 1;
    query.pageSize = parseInt(query.pageSize, 10) || 5;
    return this.adminService.getSupervisors(query);
  }
}
