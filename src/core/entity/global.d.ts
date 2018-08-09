export type ThemeValue = "blue" | "green" | "red";

export interface ProjectConfig {
  theme: ThemeValue;
  videoDir: string;
  pageSize: number;
}
export interface TabNav {
  id: string;
  title: string;
  url: string;
}
