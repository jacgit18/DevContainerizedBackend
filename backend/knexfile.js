// ensuring that env vars are set up
import config from "./config/config.js"

const knexMigrationConfig = config.standardDbConfig

export default knexMigrationConfig
