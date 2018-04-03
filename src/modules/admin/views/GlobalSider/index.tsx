import { Layout } from "antd";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import { MenuItemData } from "modules/admin/model/type";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import SiderMenu from "./SiderMenu";

// import { Link } from "react-router-dom";
interface Props {
  dispatch: Dispatch<any>;
  siderCollapsed: boolean;
  menuData: MenuItemData[];
}

interface OwnProps {}

interface State {}

class Component extends React.PureComponent<Props, State> {
  handleMenuCollapse = collapsed => {
    this.props.dispatch(thisModule.actions.admin_setSiderCollapsed(collapsed));
  };
  render() {
    const { siderCollapsed, menuData } = this.props;
    return (
      <Layout.Sider width={256} breakpoint="lg" collapsible collapsed={siderCollapsed} onCollapse={this.handleMenuCollapse} trigger={null}>
        <div className="logo" key="logo">
          <Link to="/">
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        {menuData.length ? <SiderMenu /> : null}
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    siderCollapsed: state.project.admin.siderCollapsed,
    menuData: state.project.admin.menuData,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
