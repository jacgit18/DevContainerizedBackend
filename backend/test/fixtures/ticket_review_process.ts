import {FixtureTable} from "./util/index.js"

const notifyForTmReviewHistoryGetsFiles = {
  ticket_id: {from: 'ticket', where: {description: 'getTicketSubSuperTmSubmitted'}},
  old_action_id: {from: 'action', where: {code: 'draft'}},
  new_action_id: {from: 'action', where: {code: 'tm_submitted'}},
  message: 'notifyForTmReviewHistoryGetsFiles',
  ticket_review_process_type: 'tm_submit',
  created_by: {from: 'tfuser', where: {email: 'getAllTicketSubSuper@email.com'}},
  date_created: new Date(),
}

const ticketReviewProcessFixtures: FixtureTable = {
  tableName: 'ticket_review_process',
  alwaysFlush: true,
  data: {
    notifyForTmReviewHistoryGetsFiles,
  }
}

export default ticketReviewProcessFixtures
