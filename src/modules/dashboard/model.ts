import { BaseModuleActions, BaseModuleHandlers, BaseModuleState, LOCATION_CHANGE_ACTION_NAME, buildModel, effect } from "react-coat-pkg";
import thisModule from "./";
import * as apiService from "./api";
import * as actionNames from "./exportActionNames";
import { DashboardData } from "./type";

// 定义本模块的State
interface State extends BaseModuleState {
  dashboardData: DashboardData | null;
}
// 定义本模块State的初始值
const state: State = {
  dashboardData: null,
  loading: {
    global: "Stop",
  },
};
// 定义本模块的Action
class ModuleActions extends BaseModuleActions {
  setDashboardData({ payload, moduleState }: { payload: DashboardData; moduleState: State }): State {
    return { ...moduleState, dashboardData: payload };
  }
  @effect(actionNames.NAMESPACE)
  *refresh(): any {
    const dashboardData: DashboardData = yield this.call(apiService.api.getDashboardData);
    yield this.put(thisModule.actions.setDashboardData(dashboardData));
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  @effect()
  *[LOCATION_CHANGE_ACTION_NAME]({ payload }: { payload: { location: { pathname: string } } }) {
    if (payload.location.pathname === "/admin/dashboard") {
      yield this.put(thisModule.actions.refresh());
    }
  }
}

const model = buildModel(state, new ModuleActions(), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
