import {FixtureTable} from "./util/index.js"

const notifyForTmReviewHistoryGetsFiles = {
  file_parent_id: {from: 'ticket_review_process', where: {message: 'notifyForTmReviewHistoryGetsFiles'}},
  file_parent_type: 'ticket_review_process',
  initial_name: 'notifyForTmReviewHistoryGetsFiles',
  key: 'notifyForTmReviewHistoryGetsFiles',
  bucket: 'fake',
  region: 'fake',
  created_by: {from: 'tfuser', where: {email: 'getAllTicketSubSuper@email.com'}},
  date_created: new Date(),
  date_modified: new Date(),
  file_size_bytes: 4000,
}

const fileFixtures: FixtureTable = {
  tableName: 'file',
  alwaysFlush: true,
  data: {
    notifyForTmReviewHistoryGetsFiles,
  }
}

export default fileFixtures
