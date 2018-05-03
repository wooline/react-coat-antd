import { message } from "antd";
import Lang from "assets/lang";
import RootState from "core/RootState";
import appModule from "modules/app";
import { BaseModuleState, buildActionByEffect, buildLoading, buildModel } from "react-coat-pkg";
import { call, put } from "redux-saga/effects";
import * as actionNames from "../actionNames";
import * as apiService from "../api";
import { GlobalSettingsData } from "./type";

// 定义本模块的State
interface State extends BaseModuleState {
  globalSettingsData: GlobalSettingsData | null;
}
// 定义本模块State的初始值
const state: State = {
  globalSettingsData: null,
  loading: {
    global: "Stop",
  },
};
// 定义本模块的Action
class ModuleActions {
  @buildLoading(actionNames.NAMESPACE)
  [actionNames.UPDATE_GLOBAL_SETTINGS] = buildActionByEffect(function*(data: GlobalSettingsData, moduleState: State, rootState: RootState) {
    const globalSettingsData: GlobalSettingsData = yield call(apiService.api.updateGlobalSettings, data);
    yield put(appModule.actions.app_setProjectConfig({ ...rootState.project.app.projectConfig, ...globalSettingsData }));
    message.success(Lang.message.saveSuccess);
  });
}
// 定义本模块的监听
class ModuleHandlers {}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
