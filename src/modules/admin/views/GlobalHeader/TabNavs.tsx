import { Icon, Popover } from "antd";
import classNames from "classnames";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { TabNav } from "../../model/index";
import TabNavEditor from "./TabNavEditor";

interface Props {
  dispatch: Dispatch;
  tabNavsActivedId: string;
  tabNavs: TabNav[];
  curItem: TabNav;
}

interface OwnProps {}

interface State {}

class Component extends React.PureComponent<Props, State> {
  state = {
    curItem: null,
  };
  onCloseItem = (curItem: TabNav) => {
    this.props.dispatch(thisModule.actions.closeTabNav(curItem));
  };
  onActiveItem = (curItem: TabNav) => {
    this.props.dispatch(thisModule.actions.changeTabNavsActived(curItem));
  };
  onSetNewCurItem = (create: boolean) => {
    this.props.dispatch(thisModule.actions.setNewTabNav(create));
  };
  onPreventDefault = e => {
    e.preventDefault();
  };
  render() {
    const { tabNavs, tabNavsActivedId, curItem } = this.props;
    return (
      <div className="tabs">
        {tabNavs.map(item => (
          <div key={item.id} className={classNames("item", { cur: item.id === tabNavsActivedId })}>
            <Popover
              popupAlign={{ offset: [0, 3] }}
              content={<TabNavEditor onCancel={() => this.onActiveItem(null)} />}
              trigger="click"
              visible={curItem && curItem.id === item.id}
              onVisibleChange={(visible: boolean) => {
                if (visible) {
                  this.onActiveItem(item);
                } else {
                  this.onActiveItem(null);
                }
              }}
            >
              <span className="trigger">trigger</span>
            </Popover>
            <span>{item.title}</span>
            <Icon className="action" type="close-circle-o" onClick={() => this.onCloseItem(item)} />
          </div>
        ))}
        <Popover popupAlign={{ offset: [0, 3] }} onVisibleChange={this.onSetNewCurItem} visible={curItem && !curItem.id} content={<TabNavEditor onCancel={() => this.onSetNewCurItem(false)} />} trigger="click">
          <div className="item">
            <Icon type="plus-circle-o" /> 收藏
          </div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const admin = state.project.admin;
  return {
    tabNavs: admin.tabNavs,
    tabNavsActivedId: admin.tabNavsActivedId,
    curItem: admin.curTabNav,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
