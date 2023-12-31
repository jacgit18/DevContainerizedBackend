import dotenv from "dotenv"

dotenv.config()

const environment = process.env.NODE_ENV
const forTesting = process.env.FOR_TESTING === 'y'
const apiPath = `${process.env.API_BASE}${process.env.API_PATH}`
const authenticationUrl = `${process.env.URL}${apiPath}/login`
const dbName = forTesting ? process.env.TEST_DB_NAME : process.env.DB_NAME

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: dbName,
  TESTING: forTesting,
  env: environment,
  url: {
    apiBase: process.env.API_BASE,
    api: apiPath,
    app: process.env.REACT_APP_URL,
    auth: authenticationUrl,
    domain: process.env.BASE_URL,
  },
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  standardDbConfig: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
  forApiAlerts: 'forApiAlerts',
}

// database: process.env.DB_NAME, // change back to dbname

export default config
