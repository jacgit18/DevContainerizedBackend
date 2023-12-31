import express from "express";
import * as core from "express-serve-static-core";
import { TfRequest } from "../types/express.js";

export interface RouterEntry {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  route: string,
  controllerFn: (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<any>
}

export function routerFactory(routes: RouterEntry[]): core.Router {
  const router = express.Router()
  for (let route of routes) {
    console.log(route)
    // @ts-ignore
    router[route.method](route.route, route.controllerFn)
  }
  return router
}
