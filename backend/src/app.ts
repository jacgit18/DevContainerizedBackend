#!/user/bin/env node
import cors from "cors"
import express from "express"
import morgan from "morgan"
import * as routes from "./routers/index.js"


import config from "../config/config.js"
// import { initPerformanceMonitoring } from "../libs/monitoring.js"
import { appUserIdFromHeaders, convertQueryOperators } from "./middlewares/index.js"
// import { authenticateToken,  } from "./middlewares/index.js"



const app = express()
// NOTE: must be first
// app.use(initPerformanceMonitoring)

// Middle Wares
if (!config.TESTING) {
  // dont need logging if we are in testing environment
  console.log("Since ", !config.TESTING ," means were not in testing env ")
  app.use(morgan("tiny")) // HTTP request logger
}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(convertQueryOperators)
// app.use(companyIdFromHeaders)
app.use(appUserIdFromHeaders)



// Unauthenticated user log in routes
// app.use( "/v1", routes.authRouter)

// app.use( "/v1", routes.authRouter)


app.use("/v1", routes.materialRouter)


// app.use("/v1", authenticateToken, routes.materialRouter)








export default app
