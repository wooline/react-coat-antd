import { getSupervisors } from "@interface/userService";
import { Component } from "@nestjs/common";
import * as supervisors from "./supervisors.data";

@Component()
export class SupervisorComponent {
  getSupervisors(request: getSupervisors.Request): Promise<getSupervisors.Response> {
    return Promise.resolve(supervisors.getSupervisors(request));
  }
}
