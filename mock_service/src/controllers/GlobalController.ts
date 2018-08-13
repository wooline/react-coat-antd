import {Body, Controller, Delete, Get, Put} from "@nestjs/common";
import * as global from "../interface/entity/global";
import {IGlobalService} from "../interface/IGlobalService";
import Service from "../service/GlobalService";

@Controller("/ajax/global/")
export default class GlobalController implements IGlobalService {
  constructor(private readonly service: Service) {}

  @Get("settings")
  async getSettings(): Promise<global.settings.Item> {
    return this.service.getSettings();
  }

  @Get("adminLayout")
  async getAdminLayout(): Promise<global.adminLayout.Item> {
    return this.service.getAdminLayout();
  }

  @Get("curUser")
  async getCurUser(): Promise<global.session.Item> {
    return this.service.getCurUser();
  }

  @Put("login")
  async login(@Body() request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    return this.service.login(request);
  }

  @Delete("logout")
  async logout(): Promise<void> {
    return this.service.logout();
  }
}
