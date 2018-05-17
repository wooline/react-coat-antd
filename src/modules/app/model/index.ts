import RootState from "core/RootState";
import { global } from "core/entity/global.type";
import thisModule from "modules/app";
import { BaseModuleActions, BaseModuleHandlers, BaseModuleState, ERROR_ACTION_NAME, LoadingState, buildModel, effect } from "react-coat-pkg";
import * as apiService from "../api";
import * as actionNames from "../exportActionNames";

type CurUser = global.session.Item;
type ProjectConfig = global.settings.Item;

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
class ModuleActions extends BaseModuleActions {
  setUncaughtErrors(error: { message: string }, moduleState: State, rootState: RootState): State {
    return { ...moduleState, uncaughtErrors: { ...moduleState.uncaughtErrors, [ErrorID++]: error.message.trim() } };
  }
  setProjectConfig(projectConfig: ProjectConfig, moduleState: State, rootState: RootState): State {
    return { ...moduleState, projectConfig, projectConfigLoaded: true };
  }
  setCurUser(curUser: CurUser, moduleState: State, rootState: RootState): State {
    return { ...moduleState, curUser, curUserLoaded: true };
  }
  setErrorRead(eid: string, moduleState: State, rootState: RootState): State {
    const uncaughtErrors = { ...moduleState.uncaughtErrors };
    delete uncaughtErrors[eid];
    return { ...moduleState, uncaughtErrors };
  }
  @effect(actionNames.NAMESPACE, "login") // 创建另一个局部loading状态来给“登录”按钮做反映
  *login({ username, password }: { username: string; password: string }): any {
    const curUser: CurUser = yield this.call(apiService.api.login, username, password);
    yield this.put(thisModule.actions.setCurUser(curUser));
  }
  @effect()
  *logout(payload: null) {
    yield this.call(apiService.api.logout);
    window.location.reload();
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  // 监听全局错误Action，收集并发送给后台，不需要注入loading...
  @effect(null)
  *[ERROR_ACTION_NAME](error: Error) {
    console.log(error);
    yield this.put(thisModule.actions.setUncaughtErrors(error));
    yield this.call(apiService.api.reportError, error);
  }
  // 监听自已的INIT Action
  @effect()
  *[actionNames.INIT]() {
    const config: ProjectConfig = yield this.call(apiService.api.getSettings);
    yield this.put(thisModule.actions.setProjectConfig(config));
    const curUser: CurUser = yield this.call(apiService.api.getCurUser);
    yield this.put(thisModule.actions.setCurUser(curUser));
  }
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
