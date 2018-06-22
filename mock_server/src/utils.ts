import { Delete, Get, Post, Put } from "@nestjs/common";

import * as fs from "fs";
import * as path from "path";

export const appRootPath = path.join(process.cwd(), "../");
export const buildDirPath = path.join(appRootPath, "build");
export const indexPagePath = path.join(buildDirPath, "index.html");
export const packageJsonPath = path.join(appRootPath, "package.json");

export function buildMethod(basePath: string) {
  return ({ method, path }: { method: string; path: string }) => {
    const model = path.replace(basePath, "");
    switch (method) {
      case "GET":
        return Get(model);
      case "POST":
        return Post(model);
      case "PUT":
        return Put(model);
      case "DELETE":
        return Delete(model);
    }
  };
}
export function pagination(list: any[], pageSize: number, page: number) {
  if (page < 1) {
    page = 1;
  }
  if (pageSize > 10) {
    pageSize = 10;
  }
  const total = list.length;
  const totalPage = Math.ceil(list.length / pageSize);
  if (page > totalPage) {
    page = totalPage;
  }
  list = list.slice((page - 1) * pageSize, page * pageSize);
  return { list, pageSize, page, totalPage, total };
}
