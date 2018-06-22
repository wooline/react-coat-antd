import * as Mock from "mockjs";
import { getNotices as GetNotices, deleteNotices as DeleteNotices } from "@interface/global";
import { pagination } from "utils";

export function deleteNotices(query: DeleteNotices.Request): DeleteNotices.Response {
  const list = datasource[query.type].list.filter(item => query.ids.indexOf(item.id) === -1);
  datasource[query.type].list = list;
  return null;
}
export function getNotices(filter: GetNotices.Request): GetNotices.Response {
  const filterData = { page: 1, pageSize: 5, ...filter };
  const unreadTotal = filterUnread(filter.type, true).length;
  const { list, pageSize, page, totalPage, total } = pagination(filterUnread(filter.type, filter.unread), filterData.pageSize, filterData.page);
  return { filter: { ...filter, page, pageSize }, list, summary: { total, unreadTotal } };
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
    "list|50": [item],
  }) as GetNotices.Response;
}

const datasource: { [key: string]: GetNotices.Response } = {
  inform: createList("notice"),
  message: createList("message"),
  todo: createList("todo"),
};

function filterUnread(type: string, unread: boolean) {
  const list = datasource[type].list;
  if (unread) {
    return list.filter(item => item.unread);
  } else {
    return list;
  }
}
