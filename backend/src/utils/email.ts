import { MailDataRequired } from "@sendgrid/helpers/classes/mail.js"

import config from "../../config/config.js"
import sgMail from "../../libs/sgMail.js"
import { isEmptyArray } from "./validation.js"

const tfInfoEmailAddress: string = 'joshuaxcarpentier@gmail.com'

// Filters emails to only those from my addresses
export function onlyMyEmailsAllowed(email: string | string[]): string | string[] | null {
  const genEmailSubstring: string = '@gmail.'
  // for array of emails
  if (Array.isArray(email)) {
    return (email as string[]).filter((e) => e.includes(genEmailSubstring))
  }
  if (typeof email === 'string' && email.includes(genEmailSubstring)) {
    return email
  }
  return null
}

async function sendEmail(
  details: MailDataRequired,
  isMultiple: boolean = false
): Promise<void> {
  // Dont want to accidentally email customers during development
  if (config.env !== 'production' && !config.TESTING) {
    const filteredEmail = onlyMyEmailsAllowed(details.to as string | string[])
    // dont allow email to send if there's no valid recipient
    if (filteredEmail == null || isEmptyArray(filteredEmail)) {
      return
    }
    details.to = filteredEmail
  }
  try {
    const [response, ] = await sgMail.send(details, isMultiple)
    if (response.statusCode >= 400) {
      throw new Error(response.toString())
    }
  } catch (e) {
    console.log(`${config.forApiAlerts}: SendGrid email failed for user(s): ${
      Array.isArray(details) ? details.map((d) => d.to).join(', ') : details.to
    }`)
    console.log(e)
    throw e
  }
}

export async function sendResetPasswordEmail(to: string, jwt: string): Promise<void> {
  const resetPasswordTemplateId: string = 'd-13ba1283ee5441eab8d4e9923b457ddb'
  const resetPasswordUrl: string = `${config.url.app}/reset-password/${jwt}`
  const resetPasswordEmailDetails: MailDataRequired = {
    to,
    from: tfInfoEmailAddress,
    templateId: resetPasswordTemplateId,
    dynamicTemplateData: {
      link: resetPasswordUrl
    }
  }
  return sendEmail(resetPasswordEmailDetails)
}

export async function sendInviteNewUserEmail(to: string, jwt: string, company_name: string, inviter_name: string, invited_name: string ): Promise<void> {
  const inviteTemplateId: string = 'd-3beb83613e32491184cc55722a506b21'
  const inviteUserUrl: string = `${config.url.app}/reset-password/${jwt}`
  const inviteUserDetails: MailDataRequired = {
    to,
    from: tfInfoEmailAddress,
    templateId: inviteTemplateId,
    dynamicTemplateData: {
      invited_name,
      inviter_name,
      company_name,
      link: inviteUserUrl
    }
  }
  return sendEmail(inviteUserDetails)
}

export interface TmReviewNotificationSummary {
  // project info
  project_id: string,
  project_name: string,
  project_number: string,
  // ticket info
  ticket_id: string,
  subject: string,
  pco_number: string,
  ticket_number: string,
  date: string,
  description: string,
}

export interface ReviewContact {
  full_name?: string,
  company_name: string,
  company_address: string,
  company_phone: string,
}

export async function sendTmReviewNotification(
  to: string[],
  requestFrom: ReviewContact,
  requestTo: ReviewContact,
  summary: TmReviewNotificationSummary,
  filesToAttach: any[],
  message: string,
): Promise<void> {
  const templateId: string = 'd-bf4b624957044851ab53d863d5cde58d'
  const url: string = `${config.url.app}/0/project/${summary.project_id}/ticket/${summary.ticket_id}`
  // const attachments = await getAttachmentsFromFileData(filesToAttach)
  const tmReviewDetails: MailDataRequired = {
    to,
    from: tfInfoEmailAddress,
    templateId,
    dynamicTemplateData: {
      summary,
      from: requestFrom,
      to: requestTo,
      url,
      message,
      sender_name: requestFrom.full_name
    },
    // attachments
  }
  return sendEmail(tmReviewDetails, true)
}

