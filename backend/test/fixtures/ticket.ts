import {FixtureTable} from "./util/index.js"

const getTicketSubCrewDraft = {
  action_id: {from: 'action', where: {code: 'draft'}},
  date_start: new Date(),
  date_end: new Date(),
  description: 'getTicketSubCrewDraft',
  last_sent: new Date(),
  number: '123',
  pco_number: '234df3343df',
  subject: 'First Ticket',
  includes_costs: false,
  total_amount: 200.08,
  total_paid: 180.93,
  total_retainage: 20.33,
  ticket_type: "tm",
  created_by_project_user: {from: 'project_user', where: {notes: 'getAllTicketSubCrew'}},
  date_created: new Date(),
  date_modified: new Date(),
}

const getTicketSubSuperDraft = {
  action_id: {from: 'action', where: {code: 'draft'}},
  date_start: new Date(),
  date_end: new Date(),
  description: 'getTicketSubSuperDraft',
  last_sent: new Date(),
  number: '123',
  pco_number: '234df3343df',
  subject: 'First Ticket',
  includes_costs: false,
  total_amount: 200.08,
  total_paid: 180.93,
  total_retainage: 20.33,
  ticket_type: "tm",
  created_by_project_user: {from: 'project_user', where: {notes: 'getAllTicketSubSuper'}},
  date_created: new Date(),
  date_modified: new Date(),
}

const getTicketSubSuperTmSubmitted = {
  action_id: {from: 'action', where: {code: 'tm_submitted'}},
  date_start: new Date(),
  date_end: new Date(),
  description: 'getTicketSubSuperTmSubmitted',
  last_sent: new Date(),
  number: '123',
  pco_number: '234df3343df',
  subject: 'First Ticket',
  includes_costs: false,
  total_amount: 200.08,
  total_paid: 180.93,
  total_retainage: 20.33,
  ticket_type: "tm",
  created_by_project_user: {from: 'project_user', where: {notes: 'getAllTicketSubSuper'}},
  date_created: new Date(),
  date_modified: new Date(),
}

const getTicketSubPmSubmitted = {
  action_id: {from: 'action', where: {code: 'cost_submitted'}},
  date_start: new Date(),
  date_end: new Date(),
  description: 'getTicketSubPmSubmitted',
  last_sent: new Date(),
  number: '123',
  pco_number: '234df3343df',
  subject: 'First Ticket',
  includes_costs: true,
  total_amount: 200.08,
  total_paid: 180.93,
  total_retainage: 20.33,
  ticket_type: "tm",
  created_by_project_user: {from: 'project_user', where: {notes: 'getAllTicketSubPm'}},
  date_created: new Date(),
  date_modified: new Date(),
}

const ticketFixtures: FixtureTable = {
  tableName: 'ticket',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    getTicketSubCrewDraft,
    getTicketSubPmSubmitted,
    getTicketSubSuperDraft,
    getTicketSubSuperTmSubmitted,
  }
}

export default ticketFixtures
