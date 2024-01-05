#!/user/bin/env node
import cors from "cors"
import express from "express"
import morgan from "morgan"

import * as routes from "./routers/index.js"

import config from "../config/config.js"
import { initPerformanceMonitoring } from "../libs/monitoring.js"
import { companyIdFromHeaders, convertQueryOperators } from "./middlewares/index.js"

const app = express()
// NOTE: must be first
app.use(initPerformanceMonitoring)

// Middle Wares
if (!config.TESTING) {
  // dont need logging if we are in testing environment
  app.use(morgan("tiny"))
}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(convertQueryOperators)
app.use(companyIdFromHeaders)


// Unauthenticated user log in routes
app.use( "/v2", routes.authRouter)






export default app
