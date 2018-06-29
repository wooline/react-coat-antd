import { session, settings } from "core/entity/global.type";
import RootState from "core/RootState";
import { ActionData, BaseModuleActions, BaseModuleHandlers, BaseModuleState, ERROR_ACTION_NAME, LoadingState, buildModel, effect } from "react-coat-pkg";
import thisModule from "./";
import * as apiService from "./api";
import * as actionNames from "./exportActionNames";

type CurUser = session.Item;
type ProjectConfig = settings.Item;
type ModuleActionData<Payload> = ActionData<Payload, State, RootState>;
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
  setUncaughtErrors({ payload, moduleState }: ModuleActionData<{ message: string }>): State {
    return { ...moduleState, uncaughtErrors: { ...moduleState.uncaughtErrors, [ErrorID++]: payload.message.trim() } };
  }
  setProjectConfig({ payload, moduleState }: ModuleActionData<ProjectConfig>): State {
    return { ...moduleState, projectConfig: payload, projectConfigLoaded: true };
  }
  setCurUser({ payload, moduleState }: ModuleActionData<CurUser>): State {
    return { ...moduleState, curUser: payload, curUserLoaded: true };
  }
  setErrorRead({ payload, moduleState }: ModuleActionData<string>): State {
    const uncaughtErrors = { ...moduleState.uncaughtErrors };
    delete uncaughtErrors[payload];
    return { ...moduleState, uncaughtErrors };
  }
  @effect(actionNames.NAMESPACE, "login") // 创建另一个局部loading状态来给“登录”按钮做反映
  *login({ payload }: ModuleActionData<{ username: string; password: string }>): any {
    const curUser: CurUser = yield this.call(apiService.api.login, payload.username, payload.password);
    yield this.put(thisModule.actions.setCurUser(curUser));
  }
  @effect()
  *logout() {
    yield this.call(apiService.api.logout);
    window.location.reload();
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  // 监听全局错误Action，收集并发送给后台，不需要注入loading...
  @effect(null)
  *[ERROR_ACTION_NAME]({ payload }: ModuleActionData<Error>) {
    console.log(payload);
    yield this.put(thisModule.actions.setUncaughtErrors(payload));
    yield this.call(apiService.api.reportError, payload);
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

const model = buildModel(state, new ModuleActions(), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
