import { getNotices } from "@interface/global";
import { Component } from "@nestjs/common";
import * as notices from "./notices.data";

@Component()
export class NoticeComponent {
  getNotices(request: getNotices.Request): Promise<getNotices.Response> {
    return Promise.resolve(notices.getNotices(request));
  }
}
