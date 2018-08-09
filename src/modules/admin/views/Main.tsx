import {Layout, Tabs, Popover, Icon} from "antd";
import classNames from "classnames";
import RootState from "core/RootState";
import React from "react";
import {ContainerQuery} from "react-container-query";
import {connect} from "react-redux";
import {match} from "react-router-dom";
import GlobalHeader from "./GlobalHeader";
import GlobalSider from "./GlobalSider";
import {Item} from "core/entity/adminLayout";

// const Supervisors = asyncComponent(() => import(/* webpackChunkName: "supervisors" */ "modules/supervisors/views"));
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
    // const { match, layout } = this.props;
    const {layout} = this.props;
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
                    <div>
                      <Popover
                        content={
                          <Tabs defaultActiveKey="b">
                            <Tabs.TabPane tab="通知" key="a">
                              aaaa
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="消息" key="b">
                              bbb
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="待办" key="c">
                              ccc
                            </Tabs.TabPane>
                          </Tabs>
                        }
                        trigger="click"
                      >
                        <span className="action noticeIcon">
                          <Icon type="bell" className="icon" />
                        </span>
                      </Popover>
                    </div>
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
