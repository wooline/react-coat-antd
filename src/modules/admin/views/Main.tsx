import {Layout} from "antd";
import classNames from "classnames";
import NotFound from "components/NotFound";
import {Item} from "core/entity/adminLayout";
import RootState from "core/RootState";
import React from "react";
import {async} from "react-coat-pkg";
import {ContainerQuery} from "react-container-query";
import {connect} from "react-redux";
import {match, Route, Switch} from "react-router-dom";
import GlobalHeader from "./GlobalHeader";
import GlobalSider from "./GlobalSider";

const Agent = async(() => import(/* webpackChunkName: "agent" */ "modules/agent/views"));
// const GlobalSettings = asyncComponent(() => import(/* webpackChunkName: "globalSettings" */ "modules/globalSettings/views"));
// const Dashboard = asyncComponent(() => import(/* webpackChunkName: "dashboard" */ "modules/dashboard/views"));

interface Props {
  layout: Item;
  match: match<any>;
  pathname: string;
}

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
    const {match, layout} = this.props;
    return (
      layout && (
        <ContainerQuery query={query}>
          {params => (
            <div className={classNames(params)}>
              <Layout style={{minHeight: "100vh", overflow: "hidden"}}>
                <GlobalSider>SiderMenu</GlobalSider>
                <Layout>
                  <GlobalHeader />
                  <Layout.Content className="g-page">
                    <Switch>
                      <Route exact={true} path={`${match.url}/resource/agent`} component={Agent} />
                      <Route component={NotFound} />
                    </Switch>
                  </Layout.Content>
                  <Layout.Footer>GlobalFooter</Layout.Footer>
                </Layout>
              </Layout>
            </div>
          )}
        </ContainerQuery>
      )
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    layout: state.project.admin.layout,
    pathname: state.router.location.pathname,
  };
};

export default connect(mapStateToProps)(Component);
