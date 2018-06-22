import { Module } from "@nestjs/common";

import { UserModule } from "./user/user.module";
import { GlobalModule } from "./global/global.module";
import { PageModule } from "./page/page.module";

@Module({
  imports: [UserModule, GlobalModule, PageModule],
})
export class ApplicationModule {}
