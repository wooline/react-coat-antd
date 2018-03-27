import { MenuItemData, Notices } from "../model/type";

export type GetMenuResponse = MenuItemData[];
export type GetNoticesResponse = Notices;

export class API {
  getNotices(): Promise<GetNoticesResponse> {
    return Promise.resolve({
      count: 30,
      dataSource: [
        {
          title: "通知",
          list: [
            {
              id: "000000001",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
              title: "你收到了 14 份新周报",
              datetime: "6 个月前",
              key: "000000001",
            },
            {
              id: "000000002",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
              title: "你推荐的 曲妮妮 已通过第三轮面试",
              datetime: "6 个月前",
              key: "000000002",
            },
            {
              id: "000000003",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
              title: "这种模板可以区分多种通知类型",
              datetime: "6 个月前",
              read: true,
              key: "000000003",
            },
            {
              id: "000000004",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
              title: "左侧图标用于区分不同的类型",
              datetime: "6 个月前",
              key: "000000004",
            },
            {
              id: "000000005",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
              title: "内容不要超过两行字，超出时自动截断",
              datetime: "6 个月前",
              key: "000000005",
            },
          ],
        },
        {
          title: "消息",
          list: [
            {
              id: "000000006",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "曲丽丽 评论了你",
              description: "描述信息描述信息描述信息",
              datetime: "6 个月前",
              key: "000000006",
            },
            {
              id: "000000007",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "朱偏右 回复了你",
              description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
              datetime: "6 个月前",
              key: "000000007",
            },
            {
              id: "000000008",
              avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
              title: "标题",
              description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
              datetime: "6 个月前",
              key: "000000008",
            },
          ],
        },
        {
          title: "待办",
          list: [
            {
              id: "000000009",
              title: "任务名称",
              description: "任务需要在 2017-01-12 20:00 前启动",
              extra: "未开始",
            },
            {
              id: "000000010",
              title: "第三方紧急代码变更",
              description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
              extra: "马上到期",
            },
            {
              id: "000000011",
              title: "信息安全考试",
              description: "指派竹尔于 2017-01-09 前完成更新并发布",
              extra: "已耗时 8 天",
            },
            {
              id: "000000012",
              title: "ABCD 版本发布",
              description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
              extra: "进行中",
            },
          ],
        },
      ],
    });
  }
  getMenu(): Promise<GetMenuResponse> {
    return Promise.resolve([
      {
        name: "用户管理",
        icon: "dashboard",
        path: "admin",
        children: [{ name: "用户列表", path: "admin/user" }, { name: "用户首页", path: "admin/home" }, { name: "工作台", path: "dashboard/workplace" }],
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
      {
        name: "使用文档",
        icon: "book",
        path: "http://pro.ant.design/docs/getting-started",
        target: "_blank",
      },
    ]);
  }
}

export const api = new API();
