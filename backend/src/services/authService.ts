import { generateJwt } from "../auth/jwtUtil.js"
import { userIsTfAdmin } from "../auth/util.js"
import { LoginCreds } from "../data/authData.js"
import { authData, userData } from "../data/index.js"
import { sendResetPasswordEmail } from "../utils/email.js"
import { HttpError } from "../utils/error.js"

async function createJwtForAuthenticatedUser(userCreds: LoginCreds): Promise<any> {
  console.log("User Cred ", userCreds)

  const validCredentials: any = await authData.validateUserCredentials(userCreds)

  console.log("Valid Cred ", validCredentials)
  
  if (validCredentials.length > 0){
    validCredentials[0].is_admin = await userIsTfAdmin(validCredentials[0].id)
    return {
      success: true,
      data: {
        jwt: generateJwt(validCredentials[0])
      }
    }
  }
  throw new HttpError(
    401,
    'Invalid Credentials. Your user or password might be incorrect.'
  )
}

async function verifyEmailAndSendResetPasswordEmail(email: string): Promise<void> {
  const user = await userData.getUserByEmail(email)
  if (user !== undefined) {
    // give them five minutes to reset password
    const jwt: string = generateJwt(user, '5m')
    await sendResetPasswordEmail(user.email, jwt)
  }
}

export default {
  createJwtForAuthenticatedUser,
  verifyEmailAndSendResetPasswordEmail,
}
