import { Module } from "@nestjs/common";

import { SupervisorComponent } from "./supervisor.component";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  components: [SupervisorComponent],
})
export class UserModule {}
