import { message } from "antd";
import { filterEmpty } from "core/utils";
import { Actions, BaseModuleHandlers, effect, globalLoading, reducer, RootState, SagaIterator } from "react-coat-pkg";
import { ResourceDefined, ResourceExpand } from "./entity/common";

type ResourceListFilter = ResourceDefined["ListFilter"];
type ResourceItemDetail = ResourceDefined["ItemDetail"];
type ResourceItemUpdateData = ResourceDefined["ItemUpdateData"];
type ResourceItemCreateData = ResourceDefined["ItemCreateData"];
type ResourceListOptional = ResourceExpand["ListOptional"];
type ResourceTableList = ResourceExpand["TableList"];
type ResourceState = ResourceExpand["State"];
type ResourceActions = ResourceExpand["Actions"];
type ResourceAPI = ResourceExpand["API"];

export class CommonResourceHandlers<S extends ResourceState = any, R extends RootState = any, A extends Actions<CommonResourceHandlers> = any> extends BaseModuleHandlers<S, R, A> implements ResourceActions {
  constructor(protected api: ResourceAPI, protected newItem: ResourceItemDetail) {
    super();
  }
  @reducer
  setTableList(tableList: ResourceTableList): ResourceState {
    return { ...(this.state as any), tableList };
  }
  @reducer
  setCurItem(payload: ResourceItemDetail | "NEW"): ResourceState {
    let curItem: ResourceItemDetail = null;
    if (payload === "NEW") {
      curItem = { ...this.newItem };
    } else if (payload) {
      curItem = { ...payload };
    }
    return { ...(this.state as any), curItem };
  }
  @effect
  @globalLoading
  *getTableList(options: ResourceListOptional): SagaIterator {
    const request: ResourceListFilter = { ...this.state.tableList.filter, ...options };
    const getTableList = this.callPromise(this.api.getTableList, filterEmpty(request));
    yield getTableList;
    const response = getTableList.getResponse();
    yield this.put(this.actions.setTableList(response));
    return response;
  }
  @effect
  @globalLoading
  *updateItem(data: ResourceItemUpdateData): SagaIterator {
    const updateItem = this.callPromise(this.api.updateItem, data);
    yield updateItem;
    const response = updateItem.getResponse();
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.actions.setCurItem(null));
      yield this.put(this.actions.getTableList({}));
    }
    return response;
  }
  @effect
  @globalLoading
  *createItem(data: ResourceItemCreateData): SagaIterator {
    const createItem = this.callPromise(this.api.createItem, data);
    yield createItem;
    const response = createItem.getResponse();
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.actions.setCurItem(null));
      yield this.put(this.actions.getTableList({}));
    }
    return response;
  }
}
