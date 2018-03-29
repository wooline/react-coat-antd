import { ProjectConfig } from "../model/type";

export type GetProjectConfigResponse = ProjectConfig;

export class API {
  getSettings(): Promise<GetProjectConfigResponse> {
    return Promise.resolve({ title: "Hello world" });
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const api = new API();
