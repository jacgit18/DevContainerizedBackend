import express from "express";
import { performanceMonitoring } from "../../libs/monitoring.js";
import { TfRequest } from "../types/express.js";

export class HttpError extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message);
    this.status = status
  }
}

export function handleControllerError(
  err: Error | HttpError,
  req: TfRequest,
  res: express.Response
): void {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message)
  } else {
    // TODO remove this once we have good error monitoring
    console.log(err)
    // otherwise, unexpected error
    performanceMonitoring.updatePerformanceMonitoringForAlertsError(
      req,
      'Unhandled server error',
      err.toString()
    )
    res.status(500).send('Sorry, we cannot process your request at this time')
  }
}

export function addErrorHandlingToControllerMethod(
  controllerMethod: (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<void>
): (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<void> {
  return (req: TfRequest, res: express.Response, next: express.NextFunction) => {
    return controllerMethod(req, res, next).catch((e) => handleControllerError(e, req, res))
  }
}

export function addErrorHandlingToController(
  controller: {[key: string]: (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<void>}
): {[key: string]: (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<void>} {
  return Object.keys(controller).reduce(
    (
      newController: {[key: string]: (req: TfRequest, res: express.Response, next: express.NextFunction) => Promise<void>},
      controllerMethodName
    ) => {
      newController[controllerMethodName] = addErrorHandlingToControllerMethod(controller[controllerMethodName])
      return newController
    },
    {}
  )
}
