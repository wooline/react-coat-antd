import RootState from "core/RootState";
import { global } from "core/entity/global.type";
import thisModule from "modules/admin";
import * as actionNames from "modules/admin/exportActionNames";
import { BaseModuleActions, BaseModuleHandlers, BaseModuleState, LoadingState, buildModel, effect } from "react-coat-pkg";
import * as ajax from "../api";
import { footerData, globalSearchData } from "./metadata";

type NoticeType = global.notice.NoticeType;
const noticeType = global.notice.NoticeType;

// 定义本模块的State
interface State extends BaseModuleState {
  siderCollapsed: boolean;
  menuData: global.menu.Item[];
  footer: global.FooterData;
  globalSearch: {
    placeholder: string;
    dataSource: string[];
  };
  curNotice: NoticeType;
  notices: { [key in NoticeType]: global.notice.List };
  loading: {
    global: LoadingState;
    notices: LoadingState;
  };
}
const getDefaultNotices = () => ({
  inform: {
    filter: { type: noticeType.inform, unread: false },
    summary: null,
    list: null,
  },
  message: {
    filter: { type: noticeType.message, unread: false },
    summary: null,
    list: null,
  },
  todo: {
    filter: { type: noticeType.todo, unread: false },
    summary: null,
    list: null,
  },
});
// 定义本模块State的初始值
const state: State = {
  siderCollapsed: false,
  menuData: [],
  footer: footerData,
  globalSearch: globalSearchData,
  curNotice: noticeType.message,
  notices: getDefaultNotices(),
  loading: {
    notices: "Stop",
    global: "Stop",
  },
};

// 定义本模块的Action
class ModuleActions extends BaseModuleActions {
  updateNotices(notices: global.notice.List, moduleState: State): State {
    return { ...moduleState, notices: { ...moduleState.notices, [notices.filter.type]: notices } };
  }
  emptyNotices(payload: null, moduleState: State): State {
    return {
      ...moduleState,
      notices: getDefaultNotices(),
    };
  }
  updateInitData(menuData: global.menu.Item[], moduleState: State): State {
    return { ...moduleState, menuData };
  }
  setSiderCollapsed(siderCollapsed: boolean, moduleState: State): State {
    return { ...moduleState, siderCollapsed };
  }
  updateCurNotice(curNotice: NoticeType, moduleState: State): State {
    return { ...moduleState, curNotice };
  }
  @effect()
  *changeCurNotice(curNotice: NoticeType, moduleState: State): any {
    const notices = moduleState.notices[curNotice];
    const refresh = notices.list === null || curNotice === moduleState.curNotice;
    if (curNotice !== moduleState.curNotice) {
      yield this.put(thisModule.actions.updateCurNotice(curNotice));
    }
    if (refresh) {
      yield this.put(thisModule.actions.getNotices(notices.filter));
    }
  }
  @effect(actionNames.NAMESPACE, "notices")
  *getNotices(filter: global.notice.List["filter"]): any {
    const notices: global.notice.List = yield this.call(ajax.api.getNotices, filter);
    const action = thisModule.actions.updateNotices(notices);
    yield this.put(action);
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  @effect()
  *[actionNames.INIT]() {
    const menuData: global.menu.Item[] = yield this.call(ajax.api.getMenu);
    yield this.put(thisModule.actions.updateInitData(menuData));
  }
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
