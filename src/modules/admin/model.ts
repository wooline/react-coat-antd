import {Item} from "entity/adminLayout";
import {TabNav} from "entity/global";
import RootState from "core/RootState";
import {arrayToMap, getStorage, setStorage} from "utils";
import {Actions, BaseModuleHandlers, BaseModuleState, effect, exportModel, globalLoading, LOCATION_CHANGE, reducer, RouterState, SagaIterator} from "react-coat-pkg";
import apiService from "./api";
import {NAMESPACE} from "./exportNames";

export interface ModuleState extends BaseModuleState {
  siderCollapsed: boolean;
  layout: Item;
  activedTabNavId: string;
  tabNavs: TabNav[];
  tabNavsMap: {[id: string]: TabNav};
  curTabNav: TabNav;
}

const initState: ModuleState = {
  siderCollapsed: false,
  layout: null,
  activedTabNavId: "",
  tabNavs: [],
  tabNavsMap: {},
  curTabNav: null,
  loading: null,
};

function getNewTabNavUrl(router: RouterState): string {
  const {pathname, search} = router.location;
  let url = pathname;
  if (search) {
    url +=
      "?" +
      search
        .substr(1)
        .split("&")
        .sort()
        .join("&");
  }
  return url;
}

class ModuleHandlers extends BaseModuleHandlers<ModuleState, RootState> {
  @reducer
  setSiderCollapsed(siderCollapsed: boolean): ModuleState {
    return {...this.state, siderCollapsed};
  }
  @reducer
  protected setActivedTab(activedTabNavId: string): ModuleState {
    return {...this.state, activedTabNavId, curTabNav: null};
  }
  @reducer
  protected setCurTabNav(curTabNav: TabNav): ModuleState {
    return {...this.state, curTabNav};
  }
  @reducer
  setNewTabNav(open: boolean): ModuleState {
    if (open) {
      const newItem = {
        id: "",
        title: document.title,
        url: getNewTabNavUrl(this.rootState.router),
      };
      const item = this.state.tabNavsMap[newItem.url];
      if (item) {
        return {...this.state, curTabNav: {...item}};
      } else {
        return {...this.state, curTabNav: {...newItem}};
      }
    } else {
      return {...this.state, curTabNav: null};
    }
  }
  @reducer
  updateTabNav(updateItem: TabNav): ModuleState {
    const item = this.state.tabNavsMap[updateItem.url];
    if (item && item.title === updateItem.title) {
      return {...this.state, curTabNav: null};
    }
    const newItem: TabNav = {...updateItem, id: updateItem.url};
    const tabNavsMap = {...this.state.tabNavsMap, [updateItem.url]: newItem};
    let tabNavs: TabNav[] = this.state.tabNavs;
    if (item) {
      tabNavs = this.state.tabNavs.map(tab => (tab.url === updateItem.url ? {...tab, title: updateItem.title} : tab));
    } else {
      tabNavs = [...this.state.tabNavs, newItem];
    }
    setStorage(NAMESPACE, "tabNavs", tabNavs);
    return {...this.state, curTabNav: null, tabNavs, tabNavsMap};
  }
  @reducer
  delTabNav(id: string): ModuleState {
    const item = this.state.tabNavsMap[id];
    if (item) {
      const tabNavs = this.state.tabNavs.filter(tab => tab.id !== id);
      const tabNavsMap = {...this.state.tabNavsMap, [id]: undefined};
      setStorage(NAMESPACE, "tabNavs", tabNavs);
      return {...this.state, tabNavs, tabNavsMap};
    } else {
      return this.state;
    }
  }
  @effect
  *activeTabNav(item: TabNav): SagaIterator {
    if (item && this.state.activedTabNavId !== item.id) {
      yield this.put(this.routerActions.push(item.url));
    } else {
      yield this.put(this.callThisAction(this.setCurTabNav, item));
    }
  }
  @globalLoading
  @effect
  protected *START(): SagaIterator {
    const tabNavs: TabNav[] = getStorage(NAMESPACE, "tabNavs") || [];
    const getAdminLayout = this.callPromise(apiService.getAdminLayout);
    yield getAdminLayout;
    const layout = getAdminLayout.getResponse();
    yield this.put(this.callThisAction(this.STARTED, {...this.state, layout, tabNavs, tabNavsMap: arrayToMap(tabNavs)}));
  }
  @effect
  protected *[LOCATION_CHANGE as string](payload: RouterState): SagaIterator {
    const url = getNewTabNavUrl(payload);
    yield this.put(this.callThisAction(this.setActivedTab, url));
  }
}

export type ModuleActions = Actions<ModuleHandlers>;

export default exportModel(NAMESPACE, initState, new ModuleHandlers());
