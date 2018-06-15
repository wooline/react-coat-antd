// import globalService from "service/global";
import { ItemCreate, ItemUpdate, ListFilter, TableList, ResourceApi, ItemCreateResult, ItemUpdateResult } from "./type";

export class API implements ResourceApi {
  getTableList(filter: ListFilter): Promise<TableList> {
    return Promise.resolve({
      filter: { status: null, username: "" },
      list: [{ id: "11", username: "lily" }],
      summary: {},
    });
  }
  createItem(payload: ItemCreate): Promise<ItemCreateResult> {
    return Promise.resolve({ success: true });
  }
  updateItem(payload: ItemUpdate): Promise<ItemUpdateResult> {
    return Promise.resolve({ success: true });
  }
}

export const api = new API();
