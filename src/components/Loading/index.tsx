import { Spin } from "antd";
import React from "react";
import { LoadingState } from "react-coat-pkg";
import "./index.less";

interface Props {
  loading: LoadingState;
}

interface State {}

const Component = function(props: Props, state: State) {
  const { loading } = props;
  return loading === "Start" || loading === "Depth" ? (
    <div className={"comp-loading " + loading}>
      <div className="loading-icon">
        <Spin />
      </div>
    </div>
  ) : null;
};
export default Component;
