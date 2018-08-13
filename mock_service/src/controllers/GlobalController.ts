import {Body, Controller, Delete, Get, Put} from "@nestjs/common";
import Service from "service/GlobalService";
import * as global from "./interface/global";

@Controller("/ajax/global/")
export default class GlobalController {
  constructor(private readonly service: Service) {}

  @Get("settings")
  settings(): global.settings.Item {
    return this.service.getSettings();
  }

  @Get("adminLayout")
  adminLayout(): global.adminLayout.Item {
    return this.service.getAdminLayout();
  }

  @Get("curUser")
  curUser(): global.session.Item {
    return this.service.getCurUser();
  }

  @Put("login")
  login(@Body() request: global.session.LoginAPI.Request): global.session.LoginAPI.Response {
    return this.service.login(request);
  }

  @Delete("logout")
  logout(): void {
    return this.service.logout();
  }
}
