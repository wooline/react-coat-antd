import * as Mock from "mockjs";
import { user } from "@interface/entity/user.type";
import { getSupervisors as GetSupervisors } from "@interface/userService";
import { pagination } from "utils";

const datasource: GetSupervisors.Response = (() => {
  const item = {
    id: "@id",
    username: "@name",
    status: "@pick(['active','disable'])",
    avatar:
      // tslint:disable-next-line:max-line-length
      "@pick(['https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png','https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png','https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png', 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg'])",
    createDate: "@datetime",
  };
  return Mock.mock({
    filter: { page: 1 },
    summary: { total: 20 },
    "list|20": [item],
  });
})();

export function getSupervisors(filter: GetSupervisors.Request): GetSupervisors.Response {
  const filterData = { page: 1, pageSize: 5, ...filter };
  const { list, pageSize, page, totalPage, total } = pagination(filterList(filter.username, filter.status), filterData.pageSize, filterData.page);
  return { filter: { ...filter, page, pageSize }, list, summary: { total } };
}

function filterList(username: string, status: user.supervisor.Status) {
  const list = datasource.list;
  if (username && status) {
    return list.filter(item => item.status === status && item.username.includes(username));
  } else if (username) {
    return list.filter(item => item.username.includes(username));
  } else if (status) {
    return list.filter(item => item.status === status);
  } else {
    return list;
  }
}
