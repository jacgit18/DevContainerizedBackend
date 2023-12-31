import {MailDataRequired} from "@sendgrid/helpers/classes/mail"
import {ClientResponse} from "@sendgrid/client/src/response"

class SgMailMock {
  public sentEmails: MailDataRequired[] = []
  public flushEmails(): void {
    this.sentEmails = []
  }
  public send(data: MailDataRequired | MailDataRequired[]): Promise<[ClientResponse, {}]> {
    const toText: string = (Array.isArray(data) ? data.map((d) => d.to).join('|') : data.to) as string
    if (toText.includes('throw')) {
      throw new Error()
    }
    const res: any = {
      statusCode: 200,
      body: data,
      toString: () => 'this is a mock service for tests'
    }
    if (toText.includes('errorstatus')) {
      res.statusCode = 400
    }
    // track which emails we send, so we can check in tests
    if (Array.isArray(data)) {
      this.sentEmails = this.sentEmails.concat(data)
    } else {
      this.sentEmails.push(data)
    }
    return Promise.resolve([res, {}])
  }
}

const sgMailMock = new SgMailMock()

export default sgMailMock
