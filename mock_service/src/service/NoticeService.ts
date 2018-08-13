import {Injectable} from "@nestjs/common";
import * as notice from "../interface/entity/notice";
import {INoticeService} from "../interface/INoticeService";
import {pagination} from "utils";
import * as Mock from "mockjs";
import {NoticeType, TableList} from "interface/entity/notice";
import {noticeType} from "utils/Const";

@Injectable()
export default class NoticeService implements INoticeService {
  deleteList(request: notice.DeleteListRequest): Promise<void> {
    return Promise.resolve(null);
  }
  getTableList(request: notice.ListFilter): Promise<notice.TableList> {
    request.page = parseInt(request.page.toString(), 10);
    request.pageSize = parseInt(request.pageSize.toString(), 10);
    const filter: notice.ListFilter = {page: 1, pageSize: 5, type: noticeType.inform, unread: null, ...request};
    const unreadTotal = filterUnread(filter.type, true).length;
    const {list, pageSize, page, total} = pagination(filterUnread(filter.type, Boolean(filter.unread)), filter.pageSize, filter.page);
    const result = {filter: {...filter, page, pageSize}, list, summary: {total, unreadTotal}};
    return Promise.resolve(result);
  }
}

function createList(type: NoticeType) {
  const item = {
    id: "@id",
    title: "@ctitle(5, 20)",
    description: "@ctitle(0, 100)",
    extra: "@name",
    unread: "@boolean",
    avatar:
      "@pick(['https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png','https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png','https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png', 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg'])",
    datetime: "@datetime",
  };
  if (type === noticeType.inform) {
    item.extra = "";
  } else if (type === "todo") {
    item.extra = "@pick(['未开始','马上到期','正在进行','已耗时3天'])";
  }
  return Mock.mock({
    filter: {page: 1},
    summary: {total: 15, unreadTotal: 10},
    "list|15": [item],
  }) as TableList;
}

const datasource: {[key in NoticeType]: TableList} = {
  inform: createList(noticeType.inform),
  message: createList(noticeType.message),
  todo: createList(noticeType.todo),
};
function filterUnread(type: NoticeType, unread: boolean) {
  const list = datasource[type].list;
  if (unread) {
    return list.filter(item => item.unread);
  } else {
    return list;
  }
}
