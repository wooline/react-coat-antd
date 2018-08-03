import { getDashboardData } from "@interface/globalService";
import { Component } from "@nestjs/common";

@Component()
export class DashboardComponent {
  getDashboardData(request: getDashboardData.Request): Promise<getDashboardData.Response> {
    return Promise.resolve({
      username: "admin",
      ip: "127.0.0.1",
      total: {
        pictures: parseInt((Math.random() * 1000).toString(), 10),
        videos: parseInt((Math.random() * 1000).toString(), 10),
      },
    });
  }
}
