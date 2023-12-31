import jwt, {Algorithm, Jwt, JwtPayload} from "jsonwebtoken"

import {config} from "../../config/index.js"
import {HttpError} from "../utils/error.js"

export interface JwtUserInfo {
  email: string,
  id: string,
  first_name: string,
  last_name: string,
  is_admin: boolean,
}

export interface JwtData {
  email: string,
  id: string,
  firstName: string,
  lastName: string,
  name: string,
  is_admin: boolean,
}

function convertUserInfoToJwtData(userInfo: JwtUserInfo): JwtData {
  return {
    email: userInfo.email,
    id: userInfo.id,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    name: `${userInfo.first_name} ${userInfo.last_name}`,
    is_admin: userInfo.is_admin,
  }
}

export const tfJwtAlgo: Algorithm = 'HS512'

export function generateJwt(userInfo: JwtUserInfo, expiry?: string): string {
  return jwt.sign(
    convertUserInfoToJwtData(userInfo),
    config.JWT_SECRET as string,
    { algorithm: tfJwtAlgo, expiresIn: expiry ?? '7d'}
  )
}

export function verifyJwt(token: string): JwtUserInfo {
  try {
    // (throws if invalid token)
    const data: Jwt = jwt.verify(token, config.JWT_SECRET as string, {complete: true})
    const payload = data.payload as JwtPayload
    if (
      // check that they are using the same algorithm
      data.header.alg !== tfJwtAlgo
      // check that their token is still valid
      || (new Date()) > (new Date((payload.exp ?? 0) * 1000))
    ) throw new Error()
    // if everything is valid, then we parse relevant data
    return {
      email: payload.email,
      id: payload.id,
      first_name: payload.firstName,
      last_name: payload.lastName,
      is_admin: payload.is_admin,
    }
  } catch (_) {
    throw new HttpError(401, 'Your identity could not be authenticated. Please try logging out then logging back in.')
  }
}
