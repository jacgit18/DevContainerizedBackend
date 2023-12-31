import knex from "knex"
import express from "express"

import config from "../config/config.js"

const validHttpMethods: string[] = ['put', 'post', 'patch', 'get', 'delete']

interface PerformanceMonitoringItem {
  // in init
  res_time_in_ms: number,
  http_method: string,
  started_at: Date,
  url: string,
  ip?: string,
  // after controller
  route?: string,
  query_params?: any,
  body?: any,
  tfuser_id?: string,
  company_id?: string,
  res_status?: number,
  // alerts update
  for_alerts?: boolean,
  for_alerts_message?: string,
  error_text?: string,
}


export class PerformanceMonitoringService {
  private items: PerformanceMonitoringItem[] = []
  private maxItemsBeforeInsert: number = 50
  // @ts-ignore
  private db = knex(config.standardDbConfig)
  private tableName: string = 'performance_monitoring'
  private propName: string = 'performanceMonitoring'

  private async addItem(item: PerformanceMonitoringItem): Promise<void> {
    // if we have too many items, insert all items and reset container
    if (this.items.length >= this.maxItemsBeforeInsert) {
      try{
        await this.db(this.tableName).insert(this.items)
      } catch (e) {
        console.log(`${config.forApiAlerts}: UNABLE TO INSERT PERFORMANCE MONITORING ITEMS`)
        console.log(e)
      }
      this.items = []
    }
    this.items.push(item)
  }

  private static initPerformanceMonitoringItem(req: express.Request): PerformanceMonitoringItem {
    return {
      res_time_in_ms: 0,
      started_at: new Date(),
      http_method: req.method.toLowerCase(),
      url: req.url,
      ip: req.ip ?? "",
    }
  }

  public initPerformanceMonitoring(req: express.Request): void {
    if (validHttpMethods.includes(req.method.toLowerCase())) {
      // @ts-ignore
      req[this.propName] = PerformanceMonitoringService.initPerformanceMonitoringItem(req)
    }
  }

  public updatePerformanceMonitoringForAlertsError(
    req: any,
    alertsMessage: string,
    errorText: string,
  ): void {
    // @ts-ignore
    const pmItem: PerformanceMonitoringItem = req[this.propName]
    if (!! pmItem) {
      pmItem.for_alerts = true
      pmItem.for_alerts_message = alertsMessage
      pmItem.error_text = errorText
    }
  }

  public finishPerformanceMonitoring(req: any, res: express.Response): void {
    // @ts-ignore
    const pmItem: PerformanceMonitoringItem = req[this.propName]
    if (!!pmItem) {
      // finalize the item and add to list
      if (!!req.route?.path) {
        pmItem.route = req.route?.path
      }
      if (Object.keys(req.body ?? {}).length > 0) {
        pmItem.body = req.body
      }
      if (Object.keys(req.query ?? {}).length > 0) {
        pmItem.query_params = req.query
      }
      if (!!req.user?.id) {
        pmItem.tfuser_id = req.user?.id
      }
      // this is a weird thing the frontend does if we dont prevent it, can cause this to crash
      if (!!req.company_id && req.company_id !== 'null') {
        pmItem.company_id = req.company_id
      }
      pmItem.res_status = res.statusCode
      pmItem.res_time_in_ms = (new Date()).getTime() - pmItem.started_at.getTime()
      this.addItem(pmItem).then(/* intentionally blank */)
    }
  }
}

export const performanceMonitoring = new PerformanceMonitoringService()

export const initPerformanceMonitoring = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  performanceMonitoring.initPerformanceMonitoring(req)
  // this is the only way to catch a response after the response code has been set
  res.on('finish', function () {
    // @ts-ignore
    performanceMonitoring.finishPerformanceMonitoring(req, this)
  })
  next()
}
