import * as Mock from "mockjs";
//  var Mock = require('mockjs')

export function getNotices() {
  return datasource;
}
export function emptyNotice(type: string) {
  datasource.forEach(data => {
    if (data.type === type) {
      data.list.list.length = 0;
    }
  });
}
export function getNoticesNum() {
  return datasource.reduce((pre, cur) => {
    return pre + cur.list.list.length;
  }, 0);
}
function createList(type?: string) {
  const item = {
    id: "@id",
    title: "@ctitle(5, 20)",
    description: "@ctitle(0, 100)",
    extra: "@name",
    avatar:
      // tslint:disable-next-line:max-line-length
      "@pick(['https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png','https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png','https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png', 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg'])",
    datetime: "@datetime",
  };
  if (type === "notice") {
    item.extra = "";
  } else if (type === "todo") {
    item.extra = "@pick(['未开始','马上到期','正在进行','已耗时3天'])";
  } else if (type === "unread") {
    item.extra = "@pick(['未开始','Jimmy','','正在进行','','wooline'])";
  }
  return Mock.mock({
    pagination: {
      page: 1,
      pageSize: 5,
      total: 52,
      totalPage: Math.ceil(52 / 5),
    },
    "list|3": [item],
  });
}

const datasource = [
  {
    type: "unread",
    title: "未读",
    list: createList("unread"),
  },
  {
    type: "notice",
    title: "通知",
    list: createList("notice"),
  },
  {
    type: "message",
    title: "消息",
    list: createList("message"),
  },
  {
    type: "todo",
    title: "待办",
    list: createList("todo"),
  },
];
