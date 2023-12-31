import express from "express"
import { JwtUserInfo } from "../auth/jwtUtil.js"

export type TfRequest = express.Request & {
  user: JwtUserInfo,
  token: string,
  company_id: string,
}
