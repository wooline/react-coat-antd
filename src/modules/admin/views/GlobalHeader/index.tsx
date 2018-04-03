import { Avatar, Dropdown, Icon, Layout, Menu, Tooltip } from "antd";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import GlobalSearch from "../GlobalSearch";
import NoticeIcon from "../NoticeIcon";
import "./index.less";

// import { Link } from "react-router-dom";
type User = RootState["project"]["app"]["curUser"];

interface Props {
  dispatch: Dispatch<any>;
  collapsed: boolean;
  curUser: User;
}

interface OwnProps {}

interface State {}

const menu = (
  <Menu className="adminLayout-header-menu" selectedKeys={[]}>
    <Menu.Item disabled>
      <Icon type="user" />个人中心
    </Menu.Item>
    <Menu.Item disabled>
      <Icon type="setting" />设置
    </Menu.Item>
    <Menu.Item key="triggerError">
      <Icon type="close-circle" />触发报错
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />退出登录
    </Menu.Item>
  </Menu>
);

class Component extends React.PureComponent<Props, State> {
  toggleSider = () => {
    const { collapsed } = this.props;
    this.props.dispatch(thisModule.actions.admin_setSiderCollapsed(!collapsed));
  };
  render() {
    const { collapsed, curUser } = this.props;
    return (
      <Layout.Header className="admin-GlobalHeader">
        <Icon className="toggleSider" type={collapsed ? "menu-unfold" : "menu-fold"} onClick={this.toggleSider} />
        <div className="right">
          <GlobalSearch />
          <Tooltip title="使用文档">
            <a target="_blank" href="http://pro.ant.design/docs/getting-started" rel="noopener noreferrer" className="action">
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon />
          <Dropdown overlay={menu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src={curUser.avatar} />
              <span className="name">{curUser.username}</span>
            </span>
          </Dropdown>
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
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
