import { getNotices, deleteNotices } from "@interface/global";
import { Component } from "@nestjs/common";
import * as notices from "./notices.data";

@Component()
export class NoticeComponent {
  deleteNotices(request: deleteNotices.Request): Promise<deleteNotices.Response> {
    return Promise.resolve(notices.deleteNotices(request));
  }
  getNotices(request: getNotices.Request): Promise<getNotices.Response> {
    return Promise.resolve(notices.getNotices(request));
  }
}
