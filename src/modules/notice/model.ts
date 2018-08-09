import {ListOptional, NoticeType, TableList} from "core/entity/notice";
import {noticeType} from "core/Const";
import RootState from "core/RootState";
import {Actions, BaseModuleHandlers, BaseModuleState, effect, exportModel, moduleLoading, reducer, SagaIterator, LoadingState} from "react-coat-pkg";
import apiService from "./api";
import {NAMESPACE} from "./exportNames";

export interface ModuleState extends BaseModuleState {
  curType: NoticeType;
  notices: {[key in NoticeType]: TableList};
  loading: {
    global: LoadingState;
  };
}

const getDefaultNotices = () => ({
  inform: {
    filter: {type: noticeType.inform, unread: false, page: 1, pageSize: 5},
    summary: null,
    list: null,
  },
  message: {
    filter: {type: noticeType.message, unread: false, page: 1, pageSize: 5},
    summary: null,
    list: null,
  },
  todo: {
    filter: {type: noticeType.todo, unread: false, page: 1, pageSize: 5},
    summary: null,
    list: null,
  },
});

const initState: ModuleState = {
  curType: noticeType.message,
  notices: getDefaultNotices(),
  loading: {
    global: LoadingState.Stop,
  },
};

export type ModuleActions = Actions<ModuleHandlers>;

class ModuleHandlers extends BaseModuleHandlers<ModuleState, RootState, ModuleActions> {
  @reducer
  setTableList(tableList: TableList): ModuleState {
    return {...this.state, notices: {...this.state.notices, [tableList.filter.type]: tableList}};
  }
  @reducer
  setEmptyNotices(): ModuleState {
    return {
      ...this.state,
      notices: getDefaultNotices(),
    };
  }
  @reducer
  setCurType(curType: NoticeType): ModuleState {
    return {...this.state, curType};
  }
  @effect
  *changeCurType(curNotice: NoticeType): SagaIterator {
    if (!curNotice) {
      curNotice = this.state.curType;
    }
    const notices = this.state.notices[curNotice];
    const refresh = notices.list === null || curNotice === this.state.curType;
    if (curNotice !== this.state.curType) {
      yield this.put(this.actions.setCurType(curNotice));
    }
    if (refresh) {
      yield this.put(this.actions.getTableList(notices.filter));
    }
  }
  @moduleLoading
  @effect
  *deleteList({type, ids, stateCallback}: {type: string; ids: string[]; stateCallback: () => void}): SagaIterator {
    const request = {type, ids};
    yield this.callPromise(apiService.deleteList, request);
    yield this.put(this.actions.getTableList({}));
    stateCallback();
  }
  @moduleLoading
  @effect
  *getTableList(optional: ListOptional): SagaIterator {
    const type = optional.type || this.state.curType;
    const filter = this.state.notices[type].filter;
    const request = {...filter, ...optional};
    const getTabelList = this.callPromise(apiService.getTabelList, request);
    yield getTabelList;
    const tableList = getTabelList.getResponse();
    yield this.put(this.actions.setTableList(tableList));
  }
}

export default exportModel(NAMESPACE, initState, new ModuleHandlers());
