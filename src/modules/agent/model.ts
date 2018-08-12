import {CommonResourceHandlers} from "core/CommonResource";
import {State, ListFilter} from "core/entity/agent";
import RootState from "core/RootState";
import {Actions, exportModel} from "react-coat-pkg";
import {NAMESPACE} from "./exportNames";
import apiService from "./api";

export interface ModuleState extends State {}

const defaultFilter: ListFilter = {
  createdTime: null,
  customerName: null,
  sort: null,
  page: 1,
  pageSize: 10,
};

const initState: ModuleState = {
  selectedIds: [],
  curItem: null,
  tableList: {
    filter: defaultFilter,
    list: null,
    summary: null,
  },
  loading: null,
};

class ModuleHandlers extends CommonResourceHandlers<ModuleState, RootState> {
  constructor() {
    super({
      pathname: "/admin/resource/agent",
      defaultFilter,
      api: apiService,
    });
  }
}

export type ModuleActions = Actions<ModuleHandlers>;

export default exportModel(NAMESPACE, initState, new ModuleHandlers());
