import { Alert } from "antd";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import VerifyRoute, { AuthState } from "components/ProtectedRoute";
import RootState from "core/RootState";
import thisModule from "modules/app";
import React from "react";
import { asyncComponent, LoadingState } from "react-coat-pkg";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";

import Login from "../Login";

require("./index.less");
const Admin = asyncComponent(() => import(/* webpackChunkName: "admin" */ "modules/admin/views"));

type User = RootState["project"]["app"]["curUser"];

interface Props {
  dispatch: Dispatch<any>;
  uncaughtErrors: { [key: string]: string };
  projectConfigLoaded: boolean;
  curUserLoaded: boolean;
  curUser: User;
  globalLoading: LoadingState;
}

interface OwnProps {}
interface State {}

function hasAuth(path: string, curUser: User): AuthState {
  return curUser.hasLogin ? AuthState.Authorized : AuthState.Forbidden;
}

class Component extends React.PureComponent<Props, State> {
  onErrorRead(eid: string) {
    this.props.dispatch(thisModule.actions.app_setErrorRead(eid));
  }
  public render() {
    const { projectConfigLoaded, curUserLoaded, curUser, globalLoading, uncaughtErrors } = this.props;
    return (
      <div className="application">
        <Switch>
          <Redirect exact={true} path="/" to="/admin/dashboard" />
          <Redirect exact={true} path="/admin" to="/admin/dashboard" />
          <VerifyRoute auth={projectConfigLoaded && curUserLoaded ? hasAuth("/admin", curUser) : AuthState.Pending} path="/admin" component={Admin} />
          <VerifyRoute exact={true} auth={projectConfigLoaded && curUserLoaded ? AuthState.Authorized : AuthState.Pending} path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
        <div className="errors">
          {Object.keys(uncaughtErrors).map(eid => {
            const onClose = () => this.onErrorRead(eid);
            return <Alert key={eid} message={uncaughtErrors[eid]} type="error" closable showIcon onClose={onClose} />;
          })}
        </div>
        <Loading loading={globalLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const app = state.project.app;
  return {
    uncaughtErrors: app.uncaughtErrors,
    projectConfigLoaded: app.projectConfigLoaded,
    curUserLoaded: app.curUserLoaded,
    curUser: app.curUser,
    globalLoading: app.loading.global,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
