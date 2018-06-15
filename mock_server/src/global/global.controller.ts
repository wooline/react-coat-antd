import { Service, getCurUser, getDashboardData, getMenu, getNotices, getPushData, getSettings, login, logout, updateSettings, deleteNotices } from "@interface/global";
import { Body, Query, Controller, Param } from "@nestjs/common";
import { buildMethod } from "utils";
import { DashboardComponent } from "./dashboard.component";
import { MenuComponent } from "./menu.component";
import { NoticeComponent } from "./notice.component";
import { SessionComponent } from "./session.component";
import { SettingsComponent } from "./settings.component";

const basePath = "/ajax/global/";

const method = buildMethod(basePath);

@Controller(basePath)
export class GlobalController implements Service {
  constructor(private readonly settingsService: SettingsComponent, private readonly sessionService: SessionComponent, private readonly menuService: MenuComponent, private readonly noticeComponent: NoticeComponent, private readonly dashboardComponent: DashboardComponent) {}

  @method(getSettings.metadata)
  async getSettings() {
    return this.settingsService.getSettings({});
  }
  @method(updateSettings.metadata)
  async updateSettings(@Body() body) {
    return this.settingsService.updateSettings(body);
  }
  @method(getCurUser.metadata)
  async getCurUser() {
    return this.sessionService.getCurUser({});
  }
  @method(getPushData.metadata)
  async getPushData() {
    return this.sessionService.getPushData({});
  }
  @method(login.metadata)
  async login(@Body() body) {
    return this.sessionService.login(body);
  }
  @method(logout.metadata)
  async logout() {
    return this.sessionService.logout({});
  }

  @method(getMenu.metadata)
  async getMenu() {
    return this.menuService.getMenu({});
  }

  @method(deleteNotices.metadata)
  async deleteNotices(@Query() query) {
    query.ids = query.ids.split(",");
    return this.noticeComponent.deleteNotices(query);
  }

  @method(getNotices.metadata)
  async getNotices(@Query() query) {
    query.unread = query.unread === "true";
    query.page = parseInt(query.page, 10) || 1;
    query.pageSize = parseInt(query.pageSize, 10) || 5;
    return this.noticeComponent.getNotices(query);
  }
  @method(getDashboardData.metadata)
  async getDashboardData() {
    return this.dashboardComponent.getDashboardData({});
  }
}
