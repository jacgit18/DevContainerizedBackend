import express from 'express'
export const companyHeaderProperty = 'company_id'
export const appUserHeaderProperty = 'appuser_id'


export const companyIdFromHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const companyHeader = req.headers[companyHeaderProperty]
  //@ts-ignore
  req.company_id = companyHeader
  next()
}



export const appUserIdFromHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const appUserHeader = req.headers[appUserHeaderProperty]
  //@ts-ignore
  req.appuser_id = appUserHeader
  next()
}



