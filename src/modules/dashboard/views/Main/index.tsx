import { Card, Col, Icon, Row } from "antd";
import Loading from "components/Loading";
import RootState from "core/RootState";
import * as React from "react";
import CountUp from "react-countup";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import DocumentTitle from "react-document-title";
import { LoadingState } from "react-coat-pkg";
import { DashboardData } from "../../model/type";
import "./index.less";

interface Props {
  moduleLoading: LoadingState;
  dashboardData: DashboardData | null;
}

interface OwnProps {}
interface State {}

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ",",
};

const Component = (props: Props, state: State) => {
  const { dashboardData, moduleLoading } = props;
  return (
    <DocumentTitle title="首页">
      <div className="dashboard g-content">
        {dashboardData && (
          <Row gutter={24}>
            <Col lg={8} md={24}>
              <Card bordered={false}>
                <div className="user">
                  <div className="header">
                    <div className="headerinner">
                      <Icon className="iconWarp" type="user" />
                      <h5 className="name">{dashboardData.username}</h5>
                      <p>{dashboardData.ip}</p>
                    </div>
                  </div>
                  <div className="number">
                    <div className="item">
                      <Icon className="iconWarp" type="picture" />
                      <p>
                        <CountUp end={dashboardData.total.pictures} {...countUpProps} />
                      </p>
                    </div>
                    <div className="item">
                      <Icon className="iconWarp" type="video-camera" />
                      <p>
                        <CountUp end={dashboardData.total.videos} {...countUpProps} />
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        <Loading loading={moduleLoading} />
      </div>
    </DocumentTitle>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const data = state.project.dashboard;
  return {
    moduleLoading: data.loading.global,
    dashboardData: data.dashboardData,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<string>, ownProps: OwnProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
