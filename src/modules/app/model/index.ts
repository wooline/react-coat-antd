import RootState from "core/RootState";
import thisModule from "modules/app";
import { BaseModuleState, buildActionByEffect, buildActionByReducer, buildLoading, buildModel, ERROR_ACTION_NAME, LoadingState } from "react-coat-pkg";
import { call, put } from "redux-saga/effects";

import * as actionNames from "../actionNames";
import * as apiService from "../api";
import { CurUser, ProjectConfig } from "./type";

// 定义本模块的State
interface State extends BaseModuleState {
  uncaughtErrors: { [key: string]: string };
  projectConfigLoaded: boolean;
  curUserLoaded: boolean;
  projectConfig: ProjectConfig | null;
  curUser: CurUser;
  loading: {
    global: LoadingState;
    login: LoadingState;
  };
}
// 定义本模块State的初始值
const state: State = {
  uncaughtErrors: {},
  projectConfigLoaded: false,
  curUserLoaded: false,
  projectConfig: null,
  curUser: {
    avatar: "",
    uid: "",
    username: "",
    hasLogin: false,
    notices: 0,
  },
  loading: {
    global: "Stop",
    login: "Stop",
  },
};

let ErrorID = 0;
// 定义本模块的Action
class ModuleActions {
  [ERROR_ACTION_NAME] = buildActionByReducer(function(error: { message: string }, moduleState: State, rootState: RootState): State {
    return { ...moduleState, uncaughtErrors: { ...moduleState.uncaughtErrors, [ErrorID++]: error.message.trim() } };
  });
  [actionNames.SET_PROJECT_CONFIG] = buildActionByReducer(function(projectConfig: ProjectConfig, moduleState: State, rootState: RootState): State {
    return { ...moduleState, projectConfig, projectConfigLoaded: true };
  });
  [actionNames.SET_CUR_USER] = buildActionByReducer(function(curUser: CurUser, moduleState: State, rootState: RootState): State {
    return { ...moduleState, curUser, curUserLoaded: true };
  });
  [actionNames.SET_ERROR_READ] = buildActionByReducer(function(eid: string, moduleState: State, rootState: RootState): State {
    const uncaughtErrors = { ...moduleState.uncaughtErrors };
    delete uncaughtErrors[eid];
    return { ...moduleState, uncaughtErrors };
  });
  @buildLoading(actionNames.NAMESPACE, "login") // 创建另一个局部loading状态来给“登录”按钮做反映
  [actionNames.LOGIN] = buildActionByEffect(function*({ username, password }: { username: string; password: string }) {
    const curUser: CurUser = yield call(apiService.api.login, username, password);
    yield put(thisModule.actions.app_setCurUser(curUser));
  });
  @buildLoading()
  [actionNames.LOGOUT] = buildActionByEffect(function*(payload: null) {
    yield call(apiService.api.logout);
    window.location.reload();
  });
}
// 定义本模块的监听
class ModuleHandlers {
  // 监听全局错误Action，收集并发送给后台
  [ERROR_ACTION_NAME] = buildActionByEffect(function*(error: {}) {
    console.log(error);
    yield call(apiService.api.reportError, error);
  });
  // 监听自已的INIT Action
  @buildLoading()
  [actionNames.INIT] = buildActionByEffect(function*(data: State) {
    const config: ProjectConfig = yield call(apiService.api.getSettings);
    yield put(thisModule.actions.app_setProjectConfig(config));
    const curUser: CurUser = yield call(apiService.api.getCurUser);
    yield put(thisModule.actions.app_setCurUser(curUser));
  });
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
