import {Body, Controller, Delete, Get, Query} from "@nestjs/common";
import Service from "../service/NoticeService";
import * as notice from "../interface/entity/notice";
import {INoticeService} from "../interface/INoticeService";

@Controller("/ajax/notice/")
export default class NoticeController implements INoticeService {
  constructor(private readonly service: Service) {}

  @Get("notices")
  async getTableList(@Query() request: notice.ListFilter): Promise<notice.TableList> {
    return this.service.getTableList(request);
  }

  @Delete(":type")
  async deleteList(@Body() request: notice.DeleteListRequest): Promise<void> {
    return this.service.deleteList(request);
  }
}
