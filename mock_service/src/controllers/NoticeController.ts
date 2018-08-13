import {Body, Controller, Delete, Get, Query} from "@nestjs/common";
import Service from "service/NoticeService";
import * as notice from "./interface/notice";

@Controller("/ajax/notice/")
export default class NoticeController {
  constructor(private readonly service: Service) {}

  @Get("notices")
  tableList(@Query() request: notice.ListFilter): notice.TableList {
    return this.service.getTableList(request);
  }

  @Delete(":type")
  deleteList(@Body() request: notice.DeleteListRequest): void {
    return this.service.deleteList(request);
  }
}
