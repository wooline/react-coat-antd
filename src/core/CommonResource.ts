import {parseQuery} from "../utils";
import {BaseModuleHandlers, effect, globalLoading, reducer, RootState, SagaIterator, LOCATION_CHANGE, RouterState} from "react-coat-pkg";
import {ResourceDefined, ResourceExpand} from "../entity/common";

type ResourceListFilter = ResourceDefined["ListFilter"];
// type ResourceItemDetail = ResourceDefined["ItemDetail"];
// type ResourceItemUpdateData = ResourceDefined["ItemUpdateData"];
// type ResourceItemCreateData = ResourceDefined["ItemCreateData"];
type ResourceListOptional = ResourceExpand["ListOptional"];
type ResourceTableList = ResourceExpand["TableList"];
type ResourceState = ResourceExpand["State"];
type ResourceHandlers = ResourceExpand["Handlers"];
type ResourceAPI = ResourceExpand["API"];

export abstract class CommonResourceHandlers<S extends ResourceState, R extends RootState> extends BaseModuleHandlers<ResourceState, RootState> implements ResourceHandlers {
  constructor(protected config: {defaultFilter: ResourceListFilter; pathname: string; api: ResourceAPI}) {
    super();
  }
  @reducer
  setTableList(tableList: ResourceTableList): ResourceState {
    return {...(this.state as any), tableList};
  }
  /* @reducer
  setCurItem(payload: ResourceItemDetail | "NEW"): ResourceState {
    let curItem: ResourceItemDetail = null;
    if (payload === "NEW") {
      curItem = {...this.newItem};
    } else if (payload) {
      curItem = {...payload};
    }
    return {...(this.state as any), curItem};
  } */
  @effect
  @globalLoading
  *getTableList(options: ResourceListOptional): SagaIterator {
    const request: ResourceListFilter = {...this.state.tableList.filter, ...options};
    const getTableList = this.callPromise(this.config.api.getTableList, request);
    yield getTableList;
    const response = getTableList.getResponse();
    yield this.put(this.callThisAction(this.setTableList, response));
    return response;
  }
  /* @effect
  @globalLoading
  *updateItem(data: ResourceItemUpdateData): SagaIterator {
    const updateItem = this.callPromise(this.api.updateItem, data);
    yield updateItem;
    const response = updateItem.getResponse();
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.callThisAction(this.setCurItem, null));
      yield this.put(this.callThisAction(this.getTableList, {}));
    }
    return response;
  } */
  /* @effect
  @globalLoading
  *createItem(data: ResourceItemCreateData): SagaIterator {
    const createItem = this.callPromise(this.api.createItem, data);
    yield createItem;
    const response = createItem.getResponse();
    if (response.success) {
      message.success("操作成功");
      yield this.put(this.callThisAction(this.setCurItem, null));
      yield this.put(this.callThisAction(this.getTableList, {}));
    }
    return response;
  } */
  @effect
  protected *[LOCATION_CHANGE as string](router: RouterState): SagaIterator {
    if (router.location.pathname === this.config.pathname) {
      const args = parseQuery(router.location.search);
      yield this.put(this.callThisAction(this.getTableList, {...this.config.defaultFilter, ...args}));
    }
  }
}
