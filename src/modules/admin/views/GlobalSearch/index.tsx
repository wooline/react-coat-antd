import { AutoComplete, Icon, Input } from "antd";
import classNames from "classnames";
import RootState from "core/RootState";
import React from "react";
import { connect } from "react-redux";
import "./index.less";

interface Props {
  placeholder: string;
  dataSource: string[];
}

interface State {
  searchMode: boolean;
  value: string;
}

class Component extends React.PureComponent<Props, State> {
  state = {
    searchMode: false,
    value: "",
  };
  timeout: any;
  input: HTMLInputElement;
  onSearch = value => {
    // console.log("input", value);
  };
  onPressEnter = value => {
    // console.log("enter", value);
  };
  onChange = value => {
    this.setState({ value });
    // console.log("onChange", value);
  };
  onKeyDown = e => {
    if (e.key === "Enter") {
      this.timeout = setTimeout(() => {
        this.onPressEnter(this.state.value);
      }, 0);
    }
  };
  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      if (this.state.searchMode) {
        this.input.focus();
      }
    });
  };
  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: "",
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { placeholder, dataSource } = this.props;
    const { searchMode, value } = this.state;
    return (
      <span className="action admin-GlobalSearch" onClick={this.enterSearchMode}>
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="admin-AutoComplete"
          dataSource={dataSource}
          className={classNames("input", {
            show: searchMode,
          })}
          value={value}
          onChange={this.onChange}
        >
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node as any;
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return state.project.admin.layout.globalSearch;
};

export default connect(mapStateToProps)(Component);
