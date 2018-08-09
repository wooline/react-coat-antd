import { Layout } from "antd";
import RootState from "core/RootState";
import { MenuItem } from "core/entity/adminLayout";
import thisModule from "modules/admin";
import React from "react";
import { DispatchProp, connect } from "react-redux";
import { Link } from "react-router-dom";
import SiderMenu from "./SiderMenu";

require("./index.less");
const Logo = require("./imgs/logo.svg");

interface Props extends DispatchProp {
  siderCollapsed: boolean;
  menu: MenuItem[];
}

interface State {}

class Component extends React.PureComponent<Props, State> {
  handleMenuCollapse = collapsed => {
    this.props.dispatch(thisModule.actions.setSiderCollapsed(collapsed));
  };
  render() {
    const { siderCollapsed, menu } = this.props;
    return (
      <Layout.Sider width={256} breakpoint="lg" collapsible collapsed={siderCollapsed} onCollapse={this.handleMenuCollapse} trigger={null} className="admin-GlobalSider">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        {menu && <SiderMenu />}
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    siderCollapsed: state.project.admin.siderCollapsed,
    menu: state.project.admin.layout.menu,
  };
};

export default connect(mapStateToProps)(Component);
