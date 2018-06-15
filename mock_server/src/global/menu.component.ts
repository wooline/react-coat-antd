import { getMenu } from "@interface/global";
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
        name: "站点设置",
        icon: "setting",
        path: "/admin/settings",
        children: [{ name: "全局设置", path: "/admin/settings/global" }, { name: "管理员设置", path: "/admin/settings/users" }],
      },
      {
        name: "视频管理",
        icon: "picture",
        path: "/admin/photos",
        children: [],
      },
    ]);
  }
}
