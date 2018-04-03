import { Module } from "@nestjs/common";

import { GlobalController } from "./global.controller";
import { MenuComponent } from "./menu.component";
import { NoticeComponent } from "./notice.component";
import { SessionComponent } from "./session.component";

@Module({
  imports: [],
  controllers: [GlobalController],
  components: [SessionComponent, MenuComponent, NoticeComponent],
})
export class GlobalModule {}
