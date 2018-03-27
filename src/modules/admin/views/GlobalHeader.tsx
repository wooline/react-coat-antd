import RootState from "core/RootState";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

type User = RootState["project"]["app"]["curUser"];

interface Props {
  curUser: User;
}

interface OwnProps {}

interface State {}

class Component extends PureComponent<Props, State> {
  render() {
    const { curUser } = this.props;
    return (
      <div>
        <ul>
          <li>
            欢迎您：{curUser.username}，您有<strong /> 条消息
          </li>
          <li>
            <Link to="/admin/todos">todos</Link>
          </li>
          <li>
            <Link to="/admin/product">product</Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    curUser: state.project.app.curUser,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
