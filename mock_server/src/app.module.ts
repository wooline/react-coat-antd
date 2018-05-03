import { Module } from "@nestjs/common";

import { GlobalModule } from "./global/global.module";
import { PageModule } from "./page/page.module";

@Module({
  imports: [GlobalModule, PageModule],
})
export class ApplicationModule {}
