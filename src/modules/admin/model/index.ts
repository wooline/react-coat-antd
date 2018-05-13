import RootState from "core/RootState";
import { global } from "core/entity/global.type";
import thisModule from "modules/admin";
// import appModule from "modules/app";
import * as actionNames from "modules/admin/actionNames";
import { BaseModuleState, LoadingState, buildActionByEffect, buildActionByReducer, buildLoading, buildModel } from "react-coat-pkg";
import { call, put } from "redux-saga/effects";
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
class ModuleActions {
  [actionNames.UPDATE_NOTICES] = buildActionByReducer(function(notices: global.notice.List, moduleState: State, rootState: RootState): State {
    return { ...moduleState, notices: { ...moduleState.notices, [notices.filter.type]: notices } };
  });
  [actionNames.EMPTY_NOTICES] = buildActionByReducer(function(payload: null, moduleState: State, rootState: RootState): State {
    return {
      ...moduleState,
      notices: getDefaultNotices(),
    };
  });
  [actionNames.UPDATE_INIT_DATA] = buildActionByReducer(function(menuData: global.menu.Item[], moduleState: State, rootState: RootState): State {
    return { ...moduleState, menuData };
  });
  [actionNames.SET_SIDER_COLLAPSED] = buildActionByReducer(function(siderCollapsed: boolean, moduleState: State, rootState: RootState): State {
    return { ...moduleState, siderCollapsed };
  });
  [actionNames.UPDATE_CUR_NOTICE] = buildActionByReducer(function(curNotice: NoticeType, moduleState: State, rootState: RootState): State {
    return { ...moduleState, curNotice };
  });
  [actionNames.CHANGE_CUR_NOTICE] = buildActionByEffect(function*(curNotice: NoticeType, moduleState: State) {
    const notices = moduleState.notices[curNotice];
    const refresh = notices.list === null || curNotice === moduleState.curNotice;
    if (curNotice !== moduleState.curNotice) {
      yield put(thisModule.actions.admin_updateCurNotice(curNotice));
    }
    if (refresh) {
      yield put(thisModule.actions.admin_getNotices(notices.filter));
    }
  });
  @buildLoading(actionNames.NAMESPACE, "notices")
  [actionNames.GET_NOTICES] = buildActionByEffect(function*(filter: global.notice.List["filter"]) {
    const notices: global.notice.List = yield call(ajax.api.getNotices, filter);
    yield put(thisModule.actions.admin_updateNotices(notices));
  });
}
// 定义本模块的监听
class ModuleHandlers {
  @buildLoading()
  [actionNames.INIT] = buildActionByEffect(function*(data: null) {
    const menuData: global.menu.Item[] = yield call(ajax.api.getMenu);
    yield put(thisModule.actions.admin_updateInitData(menuData));
  });
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
