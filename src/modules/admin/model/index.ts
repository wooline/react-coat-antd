import RootState from "core/RootState";
import thisModule from "modules/admin";
import * as actionNames from "modules/admin/actionNames";
import {
    BaseModuleState, buildActionByEffect, buildActionByReducer, buildLoading, buildModel,
    LoadingState,
} from "react-coat-pkg";
import { call, put } from "redux-saga/effects";

import * as ajax from "../api";
import { footerData, globalSearchData } from "./meta";
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
    global: string;
    notices: string;
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
    notices: LoadingState.Stop,
    global: LoadingState.Stop,
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
  @buildLoading(actionNames.NAMESPACE, "notices")
  [actionNames.GET_NOTICES] = buildActionByEffect(function*(data: null, moduleState: State, rootState: RootState) {
    const notices: ajax.GetNoticesResponse = yield call(ajax.api.getNotices);
    yield put(thisModule.actions.admin_updateNotices(notices));
  });
}
// 定义本模块的监听
class ModuleHandlers {
  @buildLoading()
  [actionNames.INIT] = buildActionByEffect(function*(data: null, moduleState: State, rootState: RootState) {
    const menuData: ajax.GetMenuResponse = yield call(ajax.api.getMenu);
    yield put(thisModule.actions.admin_updateInitData(menuData));
  });
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
