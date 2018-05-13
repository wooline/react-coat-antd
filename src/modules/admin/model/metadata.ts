import { global } from "core/entity/global.type";

export const footerData: global.FooterData = {
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
};
export const globalSearchData: global.GlobalSearchData = {
  placeholder: "站内搜索",
  dataSource: ["搜索提示一", "搜索提示二", "搜索提示三"],
};
