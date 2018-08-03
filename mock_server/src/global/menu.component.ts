import { getMenu } from "@interface/globalService";
import { Component } from "@nestjs/common";

@Component()
export class MenuComponent {
  getMenu(request: getMenu.Request): Promise<getMenu.Response> {
    return Promise.resolve([
      {
        name: "首页",
        icon: "dashboard",
        path: "/admin/dashboard",
        children: [],
      },
      {
        name: "资源管理范例",
        icon: "setting",
        path: "/admin/user",
        children: [{ name: "独立表单页", path: "/admin/user/global" }, { name: "资源一(用户)", path: "/admin/user/supervisors" }, { name: "资源二(套餐)", path: "/admin/user/incomePlan" }],
      },
      {
        name: "不存在页",
        icon: "setting",
        path: "/admin/finance",
        children: [],
      },
    ]);
  }
}
