import { Badge, Icon, Popover, Spin, Tabs } from "antd";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import { NoticeItem, Notices } from "modules/admin/model/type";
import React from "react";
import { LoadingState } from "react-coat-pkg";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import "./index.less";
import NoticeList from "./NoticeList";

declare module "antd/lib/popover" {
  interface PopoverProps {
    popupAlign: {};
    popupClassName: string;
  }
}

interface Props {
  dispatch: Dispatch<any>;
  loading: boolean;
  count: number;
  list: Notices;
}

interface OwnProps {}

interface State {}

class Component extends React.PureComponent<Props, State> {
  handleVisibleChange = visible => {
    if (visible) {
      this.props.dispatch(thisModule.actions.admin_getNotices(null));
    }
  };
  handleItemClick(type: string, item: NoticeItem) {
    console.log(type);
  }
  handleClear(type: string) {
    console.log(type);
  }
  render() {
    const { list, loading, count } = this.props;

    const notificationBox = (
      <Spin spinning={loading} delay={0}>
        <Tabs className="tabs">
          {list.map(item => {
            const onClick = (subItem: NoticeItem) => this.handleItemClick(item.type, subItem);
            const onClear = () => this.handleClear(item.type);
            return (
              <Tabs.TabPane tab={item.title} key={item.type}>
                <NoticeList dataSource={item.list} onClick={onClick} onClear={onClear} />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </Spin>
    );
    return (
      <Popover placement="bottomRight" content={notificationBox} popupClassName="admin-NoticeIcon-popover" trigger="click" arrowPointAtCenter popupAlign={{ offset: [20, -16] }} onVisibleChange={this.handleVisibleChange}>
        <span className="action admin-NoticeIcon">
          <Badge count={count} className="badge">
            <Icon type="bell" className="icon" />
          </Badge>
        </span>
      </Popover>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    loading: state.project.admin.loading.notices !== LoadingState.Stop,
    count: state.project.app.curUser.notices,
    list: state.project.admin.notices,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
