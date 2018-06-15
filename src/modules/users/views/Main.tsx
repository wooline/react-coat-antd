import * as React from "react";
import RootState from "core/RootState";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Props {}

interface OwnProps {}
interface State {}

const Component = (props: Props, state: State) => {
  return <div>Users</div>;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
