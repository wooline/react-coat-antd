import { ProjectConfig } from "modules/app/model/type.d";

export interface GlobalSettingsData {
  theme: ProjectConfig["theme"];
  videoDir: string;
  pageSize: number;
}
