import { getNotices, emptyNotices } from "@interface/global";
import { Component } from "@nestjs/common";
import * as notices from "./notices.data";

@Component()
export class NoticeComponent {
  emptyNotices(request: emptyNotices.Request): Promise<emptyNotices.Response> {
    notices.emptyNotice(request.type);
    return Promise.resolve(null);
  }
  getNotices(request: getNotices.Request): Promise<getNotices.Response> {
    return Promise.resolve(notices.getNotices());
  }
}
