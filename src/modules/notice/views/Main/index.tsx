import {Spin, Tabs} from "antd";
import {noticeType} from "core/Const";
import {NoticeType, TableList} from "entity/notice";
import RootState from "core/RootState";
import thisModule from "modules/notice";
import React from "react";
import {LoadingState} from "react-coat-pkg";
import {connect, DispatchProp} from "react-redux";
import "./index.less";
import NoticeList from "../NoticeList";

interface Props extends DispatchProp {
  loading: boolean;
  curType: NoticeType;
  notices: {[key in NoticeType]: TableList};
}

interface State {}

class Component extends React.PureComponent<Props, State> {
  onTabClick = (activeKey: NoticeType) => {
    const action = thisModule.actions.changeCurType(activeKey);
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
    const {curType, loading} = this.props;

    return (
      <Spin spinning={loading} delay={0}>
        <div className="admin-notice-Main">
          <Tabs activeKey={curType} animated={false} onTabClick={this.onTabClick}>
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
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const moduleState = state.project.notice;
  return {
    loading: moduleState.loading.global !== LoadingState.Stop,
    curType: moduleState.curType,
    notices: moduleState.notices,
  };
};

export default connect(mapStateToProps)(Component);
