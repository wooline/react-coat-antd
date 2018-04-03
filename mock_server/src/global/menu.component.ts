import { getMenu } from "@interface/global";
import { Component } from "@nestjs/common";

@Component()
export class MenuComponent {
  getMenu(request: getMenu.Request): Promise<getMenu.Response> {
    return Promise.resolve([
      {
        name: "用户管理",
        icon: "dashboard",
        path: "/admin",
        children: [{ name: "用户列表", path: "/admin/user" }, { name: "用户首页", path: "/admin/home" }, { name: "工作台", path: "/admin/todos" }],
      },
      {
        name: "表单页",
        icon: "form",
        path: "form",
        children: [{ name: "基础表单", path: "form/basic-form" }, { name: "分步表单", path: "form/step-form" }, { name: "高级表单", path: "form/advanced-form" }],
      },
      {
        name: "列表页",
        icon: "table",
        path: "list",
        children: [
          { name: "查询表格", path: "list/table-list" },
          { name: "标准列表", path: "list/basic-list" },
          { name: "卡片列表", path: "list/card-list" },
          {
            name: "搜索列表",
            path: "list/search",
            children: [
              {
                name: "搜索列表（文章）",
                path: "list/search/articles",
              },
              {
                name: "搜索列表（项目）",
                path: "list/search/projects",
              },
              {
                name: "搜索列表（应用）",
                path: "list/search/applications",
              },
            ],
          },
        ],
      },
      {
        name: "详情页",
        icon: "profile",
        path: "profile",
        children: [{ name: "基础详情页", path: "profile/basic" }, { name: "高级详情页", path: "profile/advanced" }],
      },
      {
        name: "结果页",
        icon: "check-circle-o",
        path: "result",
        children: [{ name: "成功", path: "result/success" }, { name: "失败", path: "result/fail" }],
      },
      {
        name: "异常页",
        icon: "warning",
        path: "exception",
        children: [{ name: "403", path: "exception/403" }, { name: "404", path: "exception/404" }, { name: "500", path: "exception/500" }, { name: "触发异常", path: "exception/trigger" }],
      },
      {
        name: "账户",
        icon: "user",
        path: "user",
        children: [{ name: "登录", path: "user/login" }, { name: "注册", path: "user/register" }, { name: "注册结果", path: "user/register-result" }],
      },
    ]);
  }
}
