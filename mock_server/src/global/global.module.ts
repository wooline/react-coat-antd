import { Module } from "@nestjs/common";

import { DashboardComponent } from "./dashboard.component";
import { GlobalController } from "./global.controller";
import { MenuComponent } from "./menu.component";
import { NoticeComponent } from "./notice.component";
import { SessionComponent } from "./session.component";
import { SettingsComponent } from "./settings.component";

@Module({
  imports: [],
  controllers: [GlobalController],
  components: [SettingsComponent, SessionComponent, MenuComponent, NoticeComponent, DashboardComponent],
})
export class GlobalModule {}
