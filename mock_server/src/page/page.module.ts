import { Module } from "@nestjs/common";

import { PageController } from "./page.controller";

@Module({
  imports: [],
  controllers: [PageController],
  components: [],
})
export class PageModule {}
