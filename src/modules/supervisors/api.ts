import userService from "service/user";
import { ItemCreate, ItemUpdate, ListFilter, TableList, ResourceApi, ItemCreateResult, ItemUpdateResult } from "./type";

export class API implements ResourceApi {
  getTableList(filter: ListFilter): Promise<TableList> {
    return userService.getSupervisors(filter);
  }
  createItem(payload: ItemCreate): Promise<ItemCreateResult> {
    return Promise.resolve({ success: true });
  }
  updateItem(payload: ItemUpdate): Promise<ItemUpdateResult> {
    return Promise.resolve({ success: true });
  }
}

export const api = new API();
