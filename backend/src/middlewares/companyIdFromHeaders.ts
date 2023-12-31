import express from 'express'
export const companyHeaderProperty = 'company_id'

export const companyIdFromHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const companyHeader = req.headers[companyHeaderProperty]
  //@ts-ignore
  req.company_id = companyHeader
  next()
}




