import { Layout } from "antd";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

// import { Link } from "react-router-dom";
interface Props {
  dispatch: Dispatch<any>;
  siderCollapsed: boolean;
}

interface OwnProps {}

interface State {}

class Component extends PureComponent<Props, State> {
  handleMenuCollapse = collapsed => {
    this.props.dispatch(thisModule.actions.admin_setSiderCollapsed(collapsed));
  };
  render() {
    const { siderCollapsed } = this.props;
    return (
      <Layout.Sider width={256} breakpoint="lg" collapsible collapsed={siderCollapsed} onCollapse={this.handleMenuCollapse} trigger={null}>
        sider
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    siderCollapsed: state.project.admin.siderCollapsed,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
