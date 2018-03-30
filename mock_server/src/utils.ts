import { Delete, Get, Post, Put } from "@nestjs/common";

export function buildMethod(basePath: string) {
    return ({method, path}: {method: string; path: string}) => {
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
