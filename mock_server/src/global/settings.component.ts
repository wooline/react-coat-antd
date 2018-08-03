import { getSettings, updateSettings } from "@interface/globalService";
import { global } from "@interface/entity/global.type";
import { Component, HttpException, HttpStatus } from "@nestjs/common";

const settings: getSettings.Response = {
  theme: global.settings.ThemeValue.blue,
  videoDir: "http://www.baidu.com/",
  pageSize: 20,
};

@Component()
export class SettingsComponent {
  getSettings(request: getSettings.Request): Promise<getSettings.Response> {
    return Promise.resolve(settings);
  }
  updateSettings(request: updateSettings.Request): Promise<updateSettings.Response> {
    Object.assign(settings, request);
    return Promise.resolve(request);
  }
}
