import {Module} from "@nestjs/common";
import AgentController from "controllers/AgentController";
import GlobalController from "controllers/GlobalController";
import NoticeController from "controllers/NoticeController";
import AgentService from "./service/AgentService";
import GlobalService from "./service/GlobalService";
import NoticeService from "./service/NoticeService";

@Module({
  imports: [],
  controllers: [GlobalController, NoticeController, AgentController],
  providers: [GlobalService, AgentService, NoticeService],
})
export class AppModule {}
