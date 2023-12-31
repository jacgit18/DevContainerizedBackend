import express from "express"

import { authService } from "../services/index.js"
import { TfRequest } from "../types/express.js"
import { addErrorHandlingToController } from "../utils/error.js"
import { FieldSpecForValidation, validateFields } from "./req-data-validation/index.js"

export const emailFieldSpecForValidation: FieldSpecForValidation = {
  name: 'email',
  type: 'string',
  cannotBeNull: true,
}

export const passwordFieldSpecForValidation: FieldSpecForValidation = {
  name: 'password',
  type: 'string',
  cannotBeNull: true,
}

async function loginUser(req: TfRequest, res: express.Response): Promise<void> {
  const fieldSpecsForValidation: FieldSpecForValidation[] = [
    emailFieldSpecForValidation,
    passwordFieldSpecForValidation,
  ]
  const validatedUser = validateFields(
    req.body, fieldSpecsForValidation
  )

  // @ts-ignore
  const resBody = await authService.createJwtForAuthenticatedUser(validatedUser)
  res.send(resBody)
}

async function resetPassword(req: TfRequest, res: express.Response): Promise<void> {
  const fieldSpecsForValidation: FieldSpecForValidation[] = [
    emailFieldSpecForValidation,
  ]
  const {email: validatedEmail} = validateFields(
    req.body, fieldSpecsForValidation
  )
  await authService.verifyEmailAndSendResetPasswordEmail(validatedEmail as string)
  res.status(200).send('A reset password email has been sent to the submitted email address if it is valid')
}

const exportDefault = {
  loginUser,
  resetPassword,
}

export default addErrorHandlingToController(exportDefault)

