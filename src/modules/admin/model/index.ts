import RootState from "core/RootState";
import { FooterData, menu, notice } from "core/entity/global.type";
import { arrayToMap, getStorage, setStorage } from "core/utils";
import thisModule from "modules/admin";
import * as actionNames from "modules/admin/exportActionNames";
import { ActionData, BaseModuleActions, BaseModuleHandlers, BaseModuleState, LOCATION_CHANGE_ACTION_NAME, LoadingState, buildModel, effect } from "react-coat-pkg";
import * as ajax from "../api";
import { footerData, globalSearchData } from "./metadata";

type NoticeType = notice.NoticeType;
const noticeType = notice.NoticeType;
export interface TabNav {
  id: string;
  title: string;
  url: string;
}
type ModuleActionData<Payload> = ActionData<Payload, State, RootState>;
// 定义本模块的State
interface State extends BaseModuleState {
  siderCollapsed: boolean;
  menuData: menu.Item[];
  footer: FooterData;
  globalSearch: {
    placeholder: string;
    dataSource: string[];
  };
  curNotice: NoticeType;
  notices: { [key in NoticeType]: notice.List };
  tabNavsActivedId: string;
  tabNavs: TabNav[];
  tabNavsMap: { [id: string]: TabNav };
  curTabNav: TabNav;
  loading: {
    global: LoadingState;
    notices: LoadingState;
  };
}
const getDefaultNotices = () => ({
  inform: {
    filter: { type: noticeType.inform, unread: false },
    summary: null,
    list: null,
  },
  message: {
    filter: { type: noticeType.message, unread: false },
    summary: null,
    list: null,
  },
  todo: {
    filter: { type: noticeType.todo, unread: false },
    summary: null,
    list: null,
  },
});

// 定义本模块State的初始值
const state: State = {
  siderCollapsed: false,
  menuData: [],
  footer: footerData,
  globalSearch: globalSearchData,
  curNotice: noticeType.message,
  notices: getDefaultNotices(),
  tabNavsActivedId: "",
  tabNavs: [],
  tabNavsMap: {},
  curTabNav: null,
  loading: {
    notices: "Stop",
    global: "Stop",
  },
};

function getNewTabNavUrl(router: { location: { pathname: string; search: string } }): string {
  const { pathname, search } = router.location;
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
// 定义本模块的Action
class ModuleActions extends BaseModuleActions {
  INIT(): State {
    const tabNavs: TabNav[] = getStorage(actionNames.NAMESPACE, "tabNavs") || [];
    state.tabNavs = tabNavs;
    state.tabNavsMap = arrayToMap(tabNavs);
    state.tabNavsActivedId = "";
    return state;
  }
  setNotices({ payload, moduleState }: ModuleActionData<notice.List>): State {
    return { ...moduleState, notices: { ...moduleState.notices, [payload.filter.type]: payload } };
  }
  setEmptyNotices({ moduleState }: { moduleState: State }): State {
    return {
      ...moduleState,
      notices: getDefaultNotices(),
    };
  }
  setInitData({ payload, moduleState }: ModuleActionData<menu.Item[]>): State {
    return { ...moduleState, menuData: payload };
  }
  setSiderCollapsed({ payload, moduleState }: ModuleActionData<boolean>): State {
    return { ...moduleState, siderCollapsed: payload };
  }
  setCurNotice({ payload, moduleState }: ModuleActionData<NoticeType>): State {
    return { ...moduleState, curNotice: payload };
  }

  setNewTabNav({ payload, moduleState, rootState }: ModuleActionData<boolean>): State {
    if (payload) {
      const newItem = {
        id: "",
        title: document.title,
        url: getNewTabNavUrl(rootState.router),
      };
      const item = moduleState.tabNavsMap[newItem.url];
      if (item) {
        return { ...moduleState, curTabNav: { ...item } };
      } else {
        return { ...moduleState, curTabNav: { ...newItem } };
      }
    } else {
      return { ...moduleState, curTabNav: null };
    }
  }
  updateTabNav({ payload, moduleState }: ModuleActionData<TabNav>): State {
    const item = moduleState.tabNavsMap[payload.url];
    if (item && item.title === payload.title) {
      return { ...moduleState, curTabNav: null };
    }
    const newItem: TabNav = { ...payload, id: payload.url };
    const tabNavsMap = { ...moduleState.tabNavsMap, [payload.url]: newItem };
    let tabNavs: TabNav[] = moduleState.tabNavs;
    if (item) {
      tabNavs = moduleState.tabNavs.map(tab => (tab.url === payload.url ? { ...tab, title: payload.title } : tab));
    } else {
      tabNavs = [...moduleState.tabNavs, newItem];
    }
    setStorage(actionNames.NAMESPACE, "tabNavs", tabNavs);
    return { ...moduleState, curTabNav: null, tabNavs, tabNavsMap };
  }
  closeTabNav({ payload, moduleState }: ModuleActionData<TabNav>): State {
    const item = moduleState.tabNavsMap[payload.url];
    if (item) {
      const tabNavs = moduleState.tabNavs.filter(tab => tab.id !== payload.id);
      const tabNavsMap = { ...moduleState.tabNavsMap, [payload.url]: undefined };
      setStorage(actionNames.NAMESPACE, "tabNavs", tabNavs);
      return { ...moduleState, tabNavs, tabNavsMap };
    } else {
      return { ...moduleState };
    }
  }
  setTabNavsActived({ payload, moduleState }: ModuleActionData<string>): State {
    return { ...moduleState, tabNavsActivedId: payload, curTabNav: null };
  }
  setCurTabNav({ payload, moduleState }: ModuleActionData<TabNav>): State {
    return { ...moduleState, curTabNav: payload };
  }

  @effect()
  *changeTabNavsActived({ payload, moduleState }: ModuleActionData<TabNav>): any {
    if (payload && moduleState.tabNavsActivedId !== payload.id) {
      yield this.put(this.routerActions.push(payload.url));
    } else {
      yield this.put(thisModule.actions.setCurTabNav(payload));
    }
  }
  @effect()
  *changeCurNotice({ payload, moduleState }: ModuleActionData<NoticeType>): any {
    const notices = moduleState.notices[payload];
    const refresh = notices.list === null || payload === moduleState.curNotice;
    if (payload !== moduleState.curNotice) {
      yield this.put(thisModule.actions.setCurNotice(payload));
    }
    if (refresh) {
      yield this.put(thisModule.actions.getNotices(notices.filter));
    }
  }
  @effect()
  *deleteNotice({ payload, moduleState }: ModuleActionData<{ type: string; ids: string[]; stateCallback: () => void }>): any {
    const request = { ...payload };
    delete request.stateCallback;
    const notices = moduleState.notices[moduleState.curNotice];
    yield this.call(ajax.api.deleteNotices, request);
    yield this.put(thisModule.actions.getNotices(notices.filter));
    payload.stateCallback();
  }
  @effect(actionNames.NAMESPACE, "notices")
  *getNotices({ payload }: ModuleActionData<notice.List["filter"]>): any {
    const notices: notice.List = yield this.call(ajax.api.getNotices, { type: payload.type, unread: payload.unread });
    const action = thisModule.actions.setNotices(notices);
    yield this.put(action);
  }
}
// 定义本模块的监听
class ModuleHandlers extends BaseModuleHandlers {
  @effect()
  *[actionNames.INIT]() {
    const menuData: menu.Item[] = yield this.call(ajax.api.getMenu);
    yield this.put(thisModule.actions.setInitData(menuData));
  }
  @effect()
  *[LOCATION_CHANGE_ACTION_NAME]({ payload }: ModuleActionData<{ location: { pathname: string; search: string } }>) {
    const url = getNewTabNavUrl(payload);
    yield this.put(thisModule.actions.setTabNavsActived(url));
  }
}

const model = buildModel(state, new ModuleActions(), new ModuleHandlers());

export default model;

type Actions = typeof model.actions;

export { Actions, State };
