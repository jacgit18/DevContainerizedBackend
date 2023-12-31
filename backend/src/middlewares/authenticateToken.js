import {HttpError} from "../utils/error.js"
import {verifyJwt} from "../auth/jwtUtil.js"

export const authHeaderProperty = 'authorization'

const authenticateToken = (req, res, next) => {
  // parse jwt out of request
  const authHeader = req.headers[authHeaderProperty]
  const token = authHeader && authHeader.split(" ")[1]
  try {
    if (token == null) throw new HttpError(401, 'Your identity could not be authenticated. Please try logging out then logging back in.')
    const userInfo = verifyJwt(token)
    req.token = token
    req.user = userInfo
    next()
  } catch (err) {
    if (err.status) {
      return res.status(401).send(err.message)
    }
    return res.status(500).send('Sorry, there was an issue with your request. Please try again later.')
  }
}

export default authenticateToken
