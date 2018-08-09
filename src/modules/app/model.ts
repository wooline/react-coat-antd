import { ProjectConfig } from "core/entity/global";
import { Item as SessionItem } from "core/entity/session";
import RootState from "core/RootState";
import { message as Alert } from "antd";
import { Actions, BaseModuleHandlers, BaseModuleState, effect, ERROR, exportModel, globalLoading, loading, LoadingState, reducer, SagaIterator } from "react-coat-pkg";
import apiService from "./api";
import { NAMESPACE } from "./exportNames";

export interface ModuleState extends BaseModuleState {
  uncaughtErrors: { [key: string]: string };
  projectConfig: ProjectConfig;
  curUser: SessionItem;
  loading: {
    global: LoadingState;
    login: LoadingState;
  };
}

const initState: ModuleState = {
  uncaughtErrors: {},
  projectConfig: null,
  curUser: null,
  loading: {
    global: LoadingState.Stop,
    login: LoadingState.Stop,
  },
};

let ErrorID = 0;

export type ModuleActions = Actions<ModuleHandlers>;

class ModuleHandlers extends BaseModuleHandlers<ModuleState, RootState, ModuleActions> {
  @reducer
  setUncaughtErrors({ message }: { message: string }): ModuleState {
    return { ...this.state, uncaughtErrors: { ...this.state.uncaughtErrors, [ErrorID++]: message.trim() } };
  }
  @reducer
  setCurUser(curUser: SessionItem): ModuleState {
    return { ...this.state, curUser };
  }
  @reducer
  setErrorRead(errorId: string): ModuleState {
    const uncaughtErrors = { ...this.state.uncaughtErrors };
    delete uncaughtErrors[errorId];
    return { ...this.state, uncaughtErrors };
  }
  @loading("login")
  @effect
  *login({ username, password }: { username: string; password: string }): SagaIterator {
    const login = this.callPromise(apiService.login, { username, password });
    yield login;
    const response = login.getResponse();
    if (!response.errorCode) {
      const curUser = response.data;
      yield this.put(this.actions.setCurUser(curUser));
    } else {
      Alert.error(response.errorMessage);
    }
  }
  @globalLoading
  @effect
  *logout(): SagaIterator {
    yield this.callPromise(apiService.logout);
    window.location.reload();
  }
  @globalLoading
  @effect
  *START(): SagaIterator {
    const getSettings = this.callPromise(apiService.getSettings);
    yield getSettings;
    const projectConfig = getSettings.getResponse();
    const getCurUser = this.callPromise(apiService.getCurUser);
    yield getCurUser;
    const curUser = getCurUser.getResponse();
    yield this.put(this.actions.STARTED({ ...this.state, projectConfig, curUser }));
  }
  @effect
  *[ERROR](error: Error): SagaIterator {
    console.log(error);
    yield this.put(this.actions.setUncaughtErrors(error));
    yield this.callPromise(apiService.reportError, error);
  }
}

export default exportModel(NAMESPACE, initState, new ModuleHandlers());
