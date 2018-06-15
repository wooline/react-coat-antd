import { message } from "antd";
import Lang from "assets/lang";
import RootState from "core/RootState";
import { settings } from "core/entity/global.type";
import appModule from "modules/app";
import { BaseModuleActions, BaseModuleHandlers, BaseModuleState, buildModel, effect } from "react-coat-pkg";
import * as apiService from "./api";
import * as actionNames from "./exportActionNames";

type GlobalSettingsData = settings.Item;
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
class ModuleActions extends BaseModuleActions {
  @effect(actionNames.NAMESPACE)
  *updateGlobalSettings({ payload, moduleState, rootState }: { payload: GlobalSettingsData; moduleState: State; rootState: RootState }) {
    const globalSettingsData: GlobalSettingsData = yield this.call(apiService.api.updateGlobalSettings, payload);
    yield this.put(appModule.actions.setProjectConfig({ ...rootState.project.app.projectConfig, ...globalSettingsData }));
    message.success(Lang.message.saveSuccess);
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {}

const model = buildModel(state, new ModuleActions(), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
