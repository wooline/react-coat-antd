import {ListOptional, NoticeType, TableList} from "entity/notice";
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
    selectedIds: [],
    filter: {type: noticeType.inform, unread: null, page: 1, pageSize: 5},
    summary: null,
    list: null,
  },
  message: {
    selectedIds: [],
    filter: {type: noticeType.message, unread: null, page: 1, pageSize: 5},
    summary: null,
    list: null,
  },
  todo: {
    selectedIds: [],
    filter: {type: noticeType.todo, unread: null, page: 1, pageSize: 5},
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

class ModuleHandlers extends BaseModuleHandlers<ModuleState, RootState> {
  @reducer
  setSelectedRows({type, selectedIds}: {type: NoticeType; selectedIds: string[]}): ModuleState {
    return {...this.state, notices: {...this.state.notices, [type]: {...this.state.notices[type], selectedIds}}};
  }
  @reducer
  protected setTableList(tableList: TableList): ModuleState {
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
  protected setCurType(curType: NoticeType): ModuleState {
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
      yield this.put(this.callThisAction(this.setCurType, curNotice));
    }
    if (refresh) {
      yield this.put(this.callThisAction(this.getTableList, notices.filter));
    }
  }
  @moduleLoading
  @effect
  *deleteList(type: NoticeType): SagaIterator {
    const ids = this.state.notices[type].selectedIds;
    if (ids.length) {
      const request = {type, ids};
      yield this.callPromise(apiService.deleteList, request);
      yield this.put(this.callThisAction(this.getTableList, {}));
    }
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
    tableList.selectedIds = [];
    yield this.put(this.callThisAction(this.setTableList, tableList));
  }
}

export type ModuleActions = Actions<ModuleHandlers>;

export default exportModel(NAMESPACE, initState, new ModuleHandlers());
