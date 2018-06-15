import { BaseModuleActions } from "react-coat-pkg";
import { message } from "antd";
import { CommonResource } from "./common.type";

type BaseCommonResource = CommonResource;
type ResourceActions = BaseCommonResource["ResourceActions"];

export class CommonResourceActions extends BaseModuleActions implements ResourceActions {
  constructor(protected actions: BaseCommonResource["ResourceActionsCreator"], protected api: BaseCommonResource["ResourceApi"], protected newItem: BaseCommonResource["ItemDetail"]) {
    super();
  }
  *getTableList({ payload, moduleState }: { payload: BaseCommonResource["ListOptional"]; moduleState: BaseCommonResource["ResourceState"] }): any {
    const request: BaseCommonResource["ListFilter"] = { ...moduleState.tableList.filter, ...payload };
    const response: BaseCommonResource["TableList"] = yield this.call(this.api.getTableList, request);
    yield this.put(this.actions.setTableList(response));
    return response;
  }
  setTableList({ payload, moduleState }: { payload: BaseCommonResource["TableList"]; moduleState: BaseCommonResource["ResourceState"] }): BaseCommonResource["ResourceState"] {
    return { ...moduleState, tableList: payload };
  }
  setCurItem({ payload, moduleState }: { payload: BaseCommonResource["ItemDetail"] | "create"; moduleState: BaseCommonResource["ResourceState"] }): BaseCommonResource["ResourceState"] {
    let curItem: BaseCommonResource["ItemDetail"] = null;
    if (payload === "create") {
      curItem = { ...this.newItem };
    } else if (payload) {
      curItem = { ...payload };
    }
    return { ...moduleState, curItem };
  }
  *updateItem({ payload }: { payload: BaseCommonResource["ItemUpdate"] }): any {
    const response: BaseCommonResource["ItemUpdateResult"] = yield this.call(this.api.updateItem, payload);
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.actions.setCurItem(null));
      yield this.put(this.actions.getTableList({}));
    }
    return response;
  }
  *createItem({ payload }: { payload: BaseCommonResource["ItemCreate"] }): any {
    const response: BaseCommonResource["ItemCreateResult"] = yield this.call(this.api.createItem, payload);
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.actions.setCurItem(null));
      yield this.put(this.actions.getTableList({}));
    }
    return response;
  }
}
