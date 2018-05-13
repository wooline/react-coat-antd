import * as Mock from "mockjs";
import { getNotices as GetNotices } from "@interface/global";
//  var Mock = require('mockjs')

export function getNotices(filter: GetNotices.Request): GetNotices.Response {
  const type: string = filter.type;
  return { ...datasource[type], filter: { page: 1, pageSize: 5, ...filter } };
}
export function getNoticesNum() {
  return 10;
}
function createList(type?: string) {
  const item = {
    id: "@id",
    title: "@ctitle(5, 20)",
    description: "@ctitle(0, 100)",
    extra: "@name",
    unread: "@boolean",
    avatar:
      // tslint:disable-next-line:max-line-length
      "@pick(['https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png','https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png','https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png', 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg'])",
    datetime: "@datetime",
  };
  if (type === "notice") {
    item.extra = "";
  } else if (type === "todo") {
    item.extra = "@pick(['未开始','马上到期','正在进行','已耗时3天'])";
  }
  return Mock.mock({
    filter: { page: 1 },
    summary: { total: 100, unread: 10 },
    "list|5": [item],
  });
}

const datasource = {
  inform: createList("notice"),
  message: createList("message"),
  todo: createList("todo"),
};
