import sgMail from "@sendgrid/mail"
import { MailService } from "@sendgrid/mail/src/mail.js"

import config from "../config/config.js"
import sgMailMock from "../test/mock-service/sgMail.mock.js"


// Creating a wrapper around SendGrid, so we can mock out for testing
function initSgMail(): MailService {
  if (config.TESTING) {
    // @ts-ignore
    return sgMailMock as MailService
  }
  sgMail.setApiKey(config.SENDGRID_API_KEY as string)
  return sgMail
}

const sgMailExport = initSgMail()

export default sgMailExport
