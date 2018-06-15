import { menu, notice, FooterData } from "core/entity/global.type";
import thisModule from "modules/admin";
import * as actionNames from "modules/admin/exportActionNames";
import { BaseModuleActions, BaseModuleHandlers, BaseModuleState, LoadingState, buildModel, effect } from "react-coat-pkg";
import * as ajax from "../api";
import { footerData, globalSearchData } from "./metadata";

type NoticeType = notice.NoticeType;
const noticeType = notice.NoticeType;

// 定义本模块的State
interface State extends BaseModuleState {
  siderCollapsed: boolean;
  menuData: menu.Item[];
  footer: FooterData;
  globalSearch: {
    placeholder: string;
    dataSource: string[];
  };
  curNotice: NoticeType;
  notices: { [key in NoticeType]: notice.List };
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
  setNotices({ payload, moduleState }: { payload: notice.List; moduleState: State }): State {
    return { ...moduleState, notices: { ...moduleState.notices, [payload.filter.type]: payload } };
  }
  setEmptyNotices({ moduleState }: { moduleState: State }): State {
    return {
      ...moduleState,
      notices: getDefaultNotices(),
    };
  }
  setInitData({ payload, moduleState }: { payload: menu.Item[]; moduleState: State }): State {
    return { ...moduleState, menuData: payload };
  }
  setSiderCollapsed({ payload, moduleState }: { payload: boolean; moduleState: State }): State {
    return { ...moduleState, siderCollapsed: payload };
  }
  setCurNotice({ payload, moduleState }: { payload: NoticeType; moduleState: State }): State {
    return { ...moduleState, curNotice: payload };
  }
  @effect()
  *changeCurNotice({ payload, moduleState }: { payload: NoticeType; moduleState: State }): any {
    const notices = moduleState.notices[payload];
    const refresh = notices.list === null || payload === moduleState.curNotice;
    if (payload !== moduleState.curNotice) {
      yield this.put(thisModule.actions.setCurNotice(payload));
    }
    if (refresh) {
      yield this.put(thisModule.actions.getNotices(notices.filter));
    }
  }
  @effect()
  *deleteNotice({ payload, moduleState }: { payload: { type: string; ids: string[]; stateCallback: () => void }; moduleState: State }): any {
    const request = { ...payload };
    delete request.stateCallback;
    const notices = moduleState.notices[moduleState.curNotice];
    yield this.call(ajax.api.deleteNotices, request);
    yield this.put(thisModule.actions.getNotices(notices.filter));
    payload.stateCallback();
  }
  @effect(actionNames.NAMESPACE, "notices")
  *getNotices({ payload }: { payload: notice.List["filter"] }): any {
    const notices: notice.List = yield this.call(ajax.api.getNotices, { type: payload.type, unread: payload.unread });
    const action = thisModule.actions.setNotices(notices);
    yield this.put(action);
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  @effect()
  *[actionNames.INIT]() {
    const menuData: menu.Item[] = yield this.call(ajax.api.getMenu);
    yield this.put(thisModule.actions.setInitData(menuData));
  }
}

const model = buildModel(state, new ModuleActions(), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
