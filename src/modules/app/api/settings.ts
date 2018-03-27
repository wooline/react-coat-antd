export interface GetSettingsResponse {
  title: string;
}

export class API {
  getSettings(): Promise<GetSettingsResponse> {
    return Promise.resolve({ title: "Hello world" });
  }
  reportError(error: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const api = new API();
