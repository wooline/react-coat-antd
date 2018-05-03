import { Icon } from "antd";
import React from "react";

import "./Startup.less";

interface Props {}

interface State {}

const Component = function(props: Props, state: State) {
  return (
    <div className="comp-startup">
      <div className="loading">
        <h3>Welcome,Please wait...</h3>
        <Icon type="clock-circle-o" />
        <span>loading...</span>
      </div>
    </div>
  );
};

export default Component;
