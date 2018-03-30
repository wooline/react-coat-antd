import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { create, query } from "interface/session";
import { buildMethod } from "utils";

import { SessionComponent } from "./session.component";

const basePath = "/ajax/session";

const method = buildMethod(basePath);

@Controller(basePath)
export class SessionController {
    constructor(private readonly sessionService: SessionComponent) {}

    @method(query.metadata)
    async query() {
        return this.sessionService.query({});
    }

    @method(create.metadata)
    async create(@Body() body) {
        return this.sessionService.create(body);
    }
}
