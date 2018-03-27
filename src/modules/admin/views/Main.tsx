import { Layout } from "antd";
import classNames from "classnames";
import RootState from "core/RootState";
import React from "react";
import { asyncComponent } from "react-coat-pkg";
import { ContainerQuery } from "react-container-query";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { match, Route } from "react-router-dom";
import { Dispatch } from "redux";

import GlobalHeader from "./GlobalHeader";

const { Content } = Layout;
const Product = asyncComponent(() => import(/* webpackChunkName: "product" */ "modules/product/views"));
const Todos = asyncComponent(() => import(/* webpackChunkName: "todos" */ "modules/todos/views"));

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
      <DocumentTitle title="aaaa">
        <ContainerQuery query={query}>
          {params => (
            <div className={classNames(params)}>
              <Layout>
                <div>SiderMenu</div>
                <Layout>
                  <GlobalHeader />
                  <Content style={{ height: "100%" }}>
                    <Route exact={true} path={`${match.url}/todos`} component={Todos} />
                    <Route exact={true} path={`${match.url}/product`} component={Product} />
                  </Content>
                  <div>GlobalFooter</div>
                </Layout>
              </Layout>
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
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
