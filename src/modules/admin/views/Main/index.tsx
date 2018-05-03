import { Layout } from "antd";
import classNames from "classnames";
import NotFound from "components/NotFound";
import RootState from "core/RootState";
import React from "react";
import { asyncComponent } from "react-coat-pkg";
import { ContainerQuery } from "react-container-query";
import { connect } from "react-redux";
import { Route, Switch, match } from "react-router-dom";
import { Dispatch } from "redux";
import GlobalHeader from "../GlobalHeader";
import GlobalSider from "../GlobalSider";

const GlobalSettings = asyncComponent(() => import(/* webpackChunkName: "globalSettings" */ "modules/globalSettings/views"));
const Dashboard = asyncComponent(() => import(/* webpackChunkName: "dashboard" */ "modules/dashboard/views"));

interface Props {
  match: match<any>;
  pathname: string;
}

interface OwnProps {}
interface State {}

const query = {
  "screen-xs": {
    maxWidth: 575,
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767,
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991,
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199,
  },
  "screen-xl": {
    minWidth: 1200,
  },
};
class Component extends React.PureComponent<Props, State> {
  render() {
    // tslint:disable-next-line:no-shadowed-variable
    const { match } = this.props;
    return (
      <ContainerQuery query={query}>
        {params => (
          <div className={classNames(params)}>
            <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
              <GlobalSider>SiderMenu</GlobalSider>
              <Layout>
                <GlobalHeader />
                <Layout.Content className="g-page">
                  <Switch>
                    <Route exact={true} path={`${match.url}/dashboard`} component={Dashboard} />
                    <Route exact={true} path={`${match.url}/settings/global`} component={GlobalSettings} />
                    <Route component={NotFound} />
                  </Switch>
                </Layout.Content>
                <Layout.Footer>GlobalFooter</Layout.Footer>
              </Layout>
            </Layout>
          </div>
        )}
      </ContainerQuery>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return { pathname: state.router.location.pathname };
};
const mapDispatchToProps = (dispatch: Dispatch<string>, ownProps: OwnProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
