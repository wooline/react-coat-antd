import RootState from "core/RootState";
import thisModule from "modules/admin";
import appModule from "modules/app";
import * as actionNames from "modules/admin/actionNames";
import { BaseModuleState, LoadingState, buildActionByEffect, buildActionByReducer, buildLoading, buildModel } from "react-coat-pkg";
import { call, put } from "redux-saga/effects";
import * as ajax from "../api";
import { footerData, globalSearchData } from "./metadata";
import { FooterData, MenuItemData, Notices } from "./type";

// 定义本模块的State
interface State extends BaseModuleState {
  siderCollapsed: boolean;
  menuData: MenuItemData[];
  footer: FooterData;
  globalSearch: {
    placeholder: string;
    dataSource: string[];
  };
  notices: Notices;
  loading: {
    global: LoadingState;
    notices: LoadingState;
  };
}
// 定义本模块State的初始值
const state: State = {
  siderCollapsed: false,
  menuData: [],
  footer: footerData,
  globalSearch: globalSearchData,
  notices: [],
  loading: {
    notices: "Stop",
    global: "Stop",
  },
};
// 定义本模块的Action
class ModuleActions {
  [actionNames.UPDATE_NOTICES] = buildActionByReducer(function(notices: Notices, moduleState: State, rootState: RootState): State {
    return { ...moduleState, notices };
  });
  [actionNames.UPDATE_INIT_DATA] = buildActionByReducer(function(menuData: MenuItemData[], moduleState: State, rootState: RootState): State {
    return { ...moduleState, menuData };
  });
  [actionNames.SET_SIDER_COLLAPSED] = buildActionByReducer(function(siderCollapsed: boolean, moduleState: State, rootState: RootState): State {
    return { ...moduleState, siderCollapsed };
  });
  @buildLoading()
  [actionNames.EMPTY_NOTICES] = buildActionByEffect(function*(type: string, moduleState: State, rootState: RootState) {
    yield call(ajax.api.emptyNotices, type);
    let olist: any[] = [];
    const notices = moduleState.notices.map(data => {
      if (data.type === type) {
        olist = data.list;
        return { ...data, list: [] };
      } else {
        return data;
      }
    });
    yield put(thisModule.actions.admin_updateNotices(notices));
    const curUser = rootState.project.app.curUser;
    yield put(appModule.actions.app_setCurUser({ ...curUser, notices: curUser.notices - olist.length }));
  });
  @buildLoading(actionNames.NAMESPACE, "notices")
  [actionNames.GET_NOTICES] = buildActionByEffect(function*(data: null) {
    const notices: Notices = yield call(ajax.api.getNotices);
    yield put(thisModule.actions.admin_updateNotices(notices));
  });
}
// 定义本模块的监听
class ModuleHandlers {
  @buildLoading()
  [actionNames.INIT] = buildActionByEffect(function*(data: null) {
    const menuData: MenuItemData[] = yield call(ajax.api.getMenu);
    yield put(thisModule.actions.admin_updateInitData(menuData));
  });
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
