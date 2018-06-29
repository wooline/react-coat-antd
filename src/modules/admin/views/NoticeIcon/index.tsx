import { Badge, Icon, Popover, Spin, Tabs } from "antd";
import RootState from "core/RootState";
import { notice } from "core/entity/global.type";
import thisModule from "modules/admin";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./index.less";

import NoticeList from "./NoticeList";

type NoticeType = notice.NoticeType;
const noticeType = notice.NoticeType;

declare module "antd/lib/popover" {
  interface PopoverProps {
    popupAlign?: {};
    popupClassName?: string;
  }
}

interface Props {
  dispatch: Dispatch;
  loading: boolean;
  count: number;
  curNotice: NoticeType;
  notices: { [key in NoticeType]: notice.List };
}

interface OwnProps {}

interface State {}

class Component extends React.PureComponent<Props, State> {
  handleVisibleChange = visible => {
    if (visible) {
      this.props.dispatch(thisModule.actions.setEmptyNotices());
      this.onTabClick(this.props.curNotice);
    }
  };
  onTabClick = (activeKey: NoticeType) => {
    const action = thisModule.actions.changeCurNotice(activeKey);
    this.props.dispatch(action);
  };
  // handleItemClick = (type: string, item: NoticeItem) => {
  //   console.log(type);
  // };
  // handleFilter = (type: string, page: number, unread: boolean) => {
  //   const action = thisModule.actions.admin_filterNotices({ type, page, unread });
  //   this.props.dispatch(action);
  // };
  render() {
    const { curNotice, loading, count } = this.props;

    const notificationBox = (
      <Spin spinning={loading} delay={0}>
        <Tabs className="tabs" activeKey={curNotice} animated={false} onTabClick={this.onTabClick}>
          <Tabs.TabPane tab="通知" key={noticeType.inform}>
            <NoticeList type={noticeType.inform} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="消息" key={noticeType.message}>
            <NoticeList type={noticeType.message} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="待办" key={noticeType.todo}>
            <NoticeList type={noticeType.todo} />
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    );
    return (
      <Popover placement="bottomRight" content={notificationBox} popupClassName="admin-NoticeIcon-popover" trigger="click" popupAlign={{ offset: [20, -16] }} onVisibleChange={this.handleVisibleChange}>
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
  const admin = state.project.admin;
  return {
    loading: state.project.admin.loading.notices !== "Stop",
    count: state.project.app.curUser.notices,
    curNotice: admin.curNotice,
    notices: admin.notices,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
