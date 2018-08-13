import {Icon, Popover} from "antd";
import classNames from "classnames";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import React from "react";
import {TabNav} from "entity/global";
import {DispatchProp, connect} from "react-redux";
import TabNavEditor from "./TabNavEditor";

interface Props extends DispatchProp {
  activedTabNavId: string;
  tabNavs: TabNav[];
  curItem: TabNav;
}

interface State {}

class Component extends React.PureComponent<Props, State> {
  state = {
    curItem: null,
  };
  onCloseItem = (curItem: TabNav) => {
    this.props.dispatch(thisModule.actions.delTabNav(curItem.id));
  };
  onActiveItem = (curItem: TabNav) => {
    this.props.dispatch(thisModule.actions.activeTabNav(curItem));
  };
  onSetNewCurItem = (create: boolean) => {
    this.props.dispatch(thisModule.actions.setNewTabNav(create));
  };
  onPreventDefault = e => {
    e.preventDefault();
  };
  render() {
    const {tabNavs, activedTabNavId, curItem} = this.props;
    return (
      <div className="tabs">
        {tabNavs.map(item => (
          <div key={item.id} className={classNames("item", {cur: item.id === activedTabNavId})}>
            <Popover
              popupAlign={{offset: [0, 3]}}
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
        <Popover popupAlign={{offset: [0, 3]}} onVisibleChange={this.onSetNewCurItem} visible={curItem && !curItem.id} content={<TabNavEditor onCancel={() => this.onSetNewCurItem(false)} />} trigger="click">
          <div className="item">
            <Icon type="plus-circle-o" /> 收藏
          </div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const admin = state.project.admin;
  return {
    tabNavs: admin.tabNavs,
    activedTabNavId: admin.activedTabNavId,
    curItem: admin.curTabNav,
  };
};

export default connect(mapStateToProps)(Component);
