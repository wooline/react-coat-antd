import { getCurUser, getMenu, getNotices, login, Service } from "@interface/global";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { buildMethod } from "utils";

import { MenuComponent } from "./menu.component";
import { NoticeComponent } from "./notice.component";
import { SessionComponent } from "./session.component";

const basePath = "/ajax/global/";

const method = buildMethod(basePath);

@Controller(basePath)
export class GlobalController implements Service {
  constructor(private readonly sessionService: SessionComponent, private readonly menuService: MenuComponent, private readonly noticeComponent: NoticeComponent) {}

  @method(getCurUser.metadata)
  async getCurUser() {
    return this.sessionService.getCurUser({});
  }

  @method(login.metadata)
  async login(@Body() body) {
    return this.sessionService.login(body);
  }

  @method(getMenu.metadata)
  async getMenu() {
    return this.menuService.getMenu({});
  }

  @method(getNotices.metadata)
  async getNotices() {
    return this.noticeComponent.getNotices({});
  }
}
