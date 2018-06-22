import { CommonResourceActions } from "core/common";
import { NAMESPACE as ADMIN_NAMESPACE } from "modules/admin/exportActionNames";
import { BaseModuleHandlers, buildModel, effect } from "react-coat-pkg";
import { supervisor } from "core/entity/user.type";
import thisModule from "./";
import { api } from "./api";
import * as actionNames from "./exportActionNames";
import { ItemDetail, ListOptional, State } from "./type";

// 定义本模块State的初始值
const state: State = {
  curItem: null,
  tableList: {
    filter: { status: null, username: "" },
    summary: null,
    list: null,
  },
  loading: {
    global: "Stop",
  },
};
const newItem: ItemDetail = {
  id: "",
  username: "",
  avatar: "",
  createDate: null,
  status: supervisor.Status.active,
};
// 定义本模块的Action
class ModuleActions extends CommonResourceActions {
  @effect(ADMIN_NAMESPACE)
  *getTableList({ payload, moduleState }: { payload: ListOptional; moduleState: State }) {
    const data = yield* super.getTableList({ payload, moduleState });
    console.log(data);
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  @effect()
  *[actionNames.INIT]() {
    yield this.put(thisModule.actions.getTableList({}));
  }
}

const actions: any = thisModule.actions;
const model = buildModel(state, new ModuleActions(actions, api, newItem), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
