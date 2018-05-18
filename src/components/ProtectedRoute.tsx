import React, { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

import Startup from "./Startup";

export enum AuthState {
  Pending,
  Authorized,
  Forbidden,
}

interface Props extends RouteProps {
  auth: AuthState;
  component: ComponentType<any>;
}
interface State {}

function render(path: string, { from: { pathname } }, auth: AuthState, props: RouteComponentProps<any>, TargetComponent: ComponentType<any>) {
  if (auth === AuthState.Pending) {
    return <Startup />;
  } else if (auth === AuthState.Authorized) {
    return <TargetComponent {...props} />;
  } else {
    return <Redirect to={{ pathname: path === "/login" ? pathname : "/login", state: { from: props.location } }} />;
  }
}

const Component = function(props: Props, state: State) {
  const { auth, component, ...rest } = props;
  const { path, location } = rest;
  const toRender = routeProps => {
    return path && location && render(path, location.state || { from: { pathname: "/" } }, auth, routeProps, component);
  };
  return <Route {...rest} render={toRender} />;
};

export default Component;
