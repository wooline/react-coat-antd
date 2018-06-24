import { Avatar, Dropdown, Icon, Layout, Menu, Tooltip } from "antd";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import appModule from "modules/app";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import GlobalSearch from "../GlobalSearch";
import NoticeIcon from "../NoticeIcon";
import "./index.less";

// import { Link } from "react-router-dom";
type User = RootState["project"]["app"]["curUser"];

interface Props {
  dispatch: Dispatch;
  collapsed: boolean;
  curUser: User;
}

interface OwnProps {}

interface State {}

class Component extends React.PureComponent<Props, State> {
  onMenuItemClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      this.props.dispatch(appModule.actions.logout());
    } else if (key === "triggerError") {
      setTimeout(() => {
        throw new Error("自定义出错！");
      }, 0);
    }
  };
  toggleSider = () => {
    const { collapsed } = this.props;
    this.props.dispatch(thisModule.actions.setSiderCollapsed(!collapsed));
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
    const { collapsed, curUser } = this.props;
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
            <NoticeIcon />
            <Dropdown overlay={this.menu}>
              <span className="action account">
                <Avatar size="small" className="avatar" src={curUser.avatar} />
                <span className="name">{curUser.username}</span>
              </span>
            </Dropdown>
          </div>
        </div>
        <div className="tabs">
          <div className="item">
            <Icon className="action" type="close" />
            <Icon className="action" type="environment-o" />
            <span>管理员设置</span>
          </div>
          <div className="item cur">
            <Icon className="action" type="close" />
            <Icon className="action" type="environment-o" />
            <span>全局设置</span>
          </div>
          <div className="item">
            <Icon type="plus-circle-o" /> 收藏
          </div>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    collapsed: state.project.admin.siderCollapsed,
    curUser: state.project.app.curUser,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
