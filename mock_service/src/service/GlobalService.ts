import {Injectable} from "@nestjs/common";
import * as global from "../interface/entity/global";
import {IGlobalService} from "../interface/IGlobalService";
import {n1001Reject} from "utils/Const";

const guest: global.session.Item = {notices: 0, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "0", username: "guest", hasLogin: false};
const admin: global.session.Item = {notices: 10, avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png", uid: "admin", username: "admin", hasLogin: true};

let curUser = guest;

@Injectable()
export default class GlobalService implements IGlobalService {
  getSettings(): Promise<global.settings.Item> {
    return Promise.resolve({
      theme: "blue",
      videoDir: "http://www.baidu.com/",
      pageSize: 20,
    });
  }
  getAdminLayout(): Promise<global.adminLayout.Item> {
    return Promise.resolve({
      menu: [{name: "首页", icon: "dashboard", path: "/admin/dashboard", children: []}, {name: "资源管理范例", icon: "setting", path: "/admin/resource", children: [{name: "独立表单页", path: "/admin/resource/form"}, {name: "资源一(用户)", path: "/admin/resource/agent"}]}],
      footer: {
        links: [
          {
            key: "Pro 首页",
            title: "Pro 首页",
            href: "http://pro.ant.design",
            blankTarget: true,
          },
          {
            key: "github",
            title: "github",
            href: "https://github.com/ant-design/ant-design-pro",
            blankTarget: true,
          },
          {
            key: "Ant Design",
            title: "Ant Design",
            href: "http://ant.design",
            blankTarget: true,
          },
        ],
        copyright: "2018 蚂蚁金服体验技术部出品",
      },
      globalSearch: {
        placeholder: "站内搜索",
        dataSource: ["搜索提示一", "搜索提示二", "搜索提示三"],
      },
    });
  }
  getCurUser(): Promise<global.session.Item> {
    return Promise.resolve(curUser);
  }
  login(request: global.session.LoginAPI.Request): Promise<global.session.LoginAPI.Response> {
    if (request.username === "admin" && request.password === "admin") {
      curUser = admin;
      return Promise.resolve({data: curUser});
    } else {
      return Promise.resolve({data: null, errorCode: n1001Reject, errorMessage: "用户名或密码错误！"});
    }
    // const rejectError: login.error.Reject = {code: login.ErrorCode.reject, message: "用户名或密码错误！", detail: null};
    // throw new HttpException(rejectError, HttpStatus.BAD_REQUEST);
  }
  logout(): Promise<void> {
    curUser = guest;
    return Promise.resolve(null);
  }
}
