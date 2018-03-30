import { Module } from "@nestjs/common";

import { SessionComponent } from "./session.component";
import { SessionController } from "./session.controller";

@Module({
    imports: [],
    controllers: [SessionController],
    components: [SessionComponent]
})
export class SessionModule {}
