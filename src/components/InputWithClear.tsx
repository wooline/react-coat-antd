import React from "react";
import { Input, Icon } from "antd";
import { InputProps } from "antd/lib/input";

class InputWithClear extends React.PureComponent<InputProps> {
  onEmpty = e => {
    this.props.onChange({ target: { value: "" } } as any);
  };
  render() {
    const suffix = this.props.value ? <Icon type="close-circle" onClick={this.onEmpty} /> : null;
    return <Input suffix={suffix} {...this.props} />;
  }
}

export default InputWithClear;
