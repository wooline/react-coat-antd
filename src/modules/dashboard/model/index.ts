import RootState from "core/RootState";
import thisModule from "modules/dashboard";
import { BaseModuleState, buildActionByEffect, buildActionByReducer, buildLoading, buildModel, LOCATION_CHANGE_ACTION_NAME } from "react-coat-pkg";
import { call, put } from "redux-saga/effects";

import * as actionNames from "../actionNames";
import * as apiService from "../api";
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
class ModuleActions {
  [actionNames.SET_DASHBOARD_DATA] = buildActionByReducer(function(dashboardData: DashboardData, moduleState: State, rootState: RootState): State {
    return { ...moduleState, dashboardData };
  });
  @buildLoading(actionNames.NAMESPACE)
  [actionNames.REFRESH] = buildActionByEffect(function*(data: null) {
    const dashboardData: DashboardData = yield call(apiService.api.getDashboardData);
    yield put(thisModule.actions.dashboard_setDashboardData(dashboardData));
  });
}
// 定义本模块的监听
class ModuleHandlers {
  [LOCATION_CHANGE_ACTION_NAME] = buildActionByEffect(function*({ pathname }: { pathname: string }) {
    if (pathname === "/admin/dashboard") {
      yield put(thisModule.actions.dashboard_refresh());
    }
  });
}

const model = buildModel(state, ModuleActions, ModuleHandlers);

export default model;

type Actions = typeof model.actions;

export { Actions, State };
