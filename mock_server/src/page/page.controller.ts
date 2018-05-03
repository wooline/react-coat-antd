import { Controller, Get, Response } from "@nestjs/common";

import * as path from "path";

import { indexPagePath } from "../utils";

@Controller("*")
export class PageController {
  @Get()
  page(@Response() response) {
    response.sendFile(indexPagePath);
  }
}
