import {Avatar, Badge, Dropdown, Icon, Layout, Menu, Popover, Tooltip} from "antd";
import {Item as User} from "core/entity/session";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import appModule from "modules/app";
import React from "react";
import {connect, DispatchProp} from "react-redux";
import GlobalSearch from "../GlobalSearch";
import TabNavs from "./TabNavs";
import noticeViews from "modules/notice/views";
import noticeModule from "modules/notice";

import "./index.less";

interface Props extends DispatchProp {
  noticeCount: number;
  collapsed: boolean;
  curUser: User;
}

interface State {}

class Component extends React.PureComponent<Props, State> {
  onMenuItemClick = ({key}: {key: string}) => {
    if (key === "logout") {
      this.props.dispatch(appModule.actions.logout());
    } else if (key === "triggerError") {
      setTimeout(() => {
        throw new Error("自定义出错！");
      }, 0);
    }
  };
  toggleSider = () => {
    const {collapsed} = this.props;
    this.props.dispatch(thisModule.actions.setSiderCollapsed(!collapsed));
  };
  onNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch(noticeModule.actions.setEmptyNotices());
      this.props.dispatch(noticeModule.actions.changeCurType(null));
    }
  };

  menu = (
    <Menu className="adminLayout-header-menu" selectedKeys={[]} onClick={this.onMenuItemClick}>
      <Menu.Item disabled>
        <Icon type="user" /> 个人中心
      </Menu.Item>
      <Menu.Item disabled>
        <Icon type="setting" /> 设置
      </Menu.Item>
      <Menu.Item key="triggerError">
        <Icon type="close-circle" /> 触发报错
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" /> 退出登录
      </Menu.Item>
    </Menu>
  );
  render() {
    const {collapsed, curUser, noticeCount} = this.props;
    return (
      <Layout.Header className="admin-GlobalHeader">
        <div className="header">
          <Icon className="toggleSider" type={collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggleSider} />
          <div className="right">
            <GlobalSearch />
            <Tooltip title="使用文档">
              <a target="_blank" href="http://pro.ant.design/docs/getting-started" rel="noopener noreferrer" className="action">
                <Icon type="question-circle-o" />
              </a>
            </Tooltip>
            <Popover placement="bottomRight" content={<noticeViews.Main />} popupClassName="admin--GlobalHeader-NoticePopover" trigger="click" onVisibleChange={this.onNoticeVisibleChange}>
              <span className="action noticeIcon">
                <Badge count={noticeCount} className="badge">
                  <Icon type="bell" className="icon" />
                </Badge>
              </span>
            </Popover>
            <Dropdown overlay={this.menu}>
              <span className="action account">
                <Avatar size="small" className="avatar" src={curUser.avatar} />
                <span className="name">{curUser.username}</span>
              </span>
            </Dropdown>
          </div>
        </div>
        <TabNavs />
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    noticeCount: state.project.app.curUser.notices,
    collapsed: state.project.admin.siderCollapsed,
    curUser: state.project.app.curUser,
  };
};

export default connect(mapStateToProps)(Component);
