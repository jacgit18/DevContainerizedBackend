import { FixtureTable } from "./util/index.js"

const getLetterProject = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getLetterProject',
  date_created: new Date(),
  date_modified: new Date(),
}

const getTicketProject = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getTicketProject',
  date_created: new Date(),
  date_modified: new Date(),
}

const projectAccess1 = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'projectAccess1',
  date_created: new Date(),
  date_modified: new Date(),
}

const projectAccess2 = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'projectAccess2',
  date_created: new Date(),
  date_modified: new Date(),
}

const getProject2 = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getProject2',
  date_created: new Date(),
  date_modified: new Date(),
}

const getProject3 = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getProject3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getProject4 = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getProject4',
  date_created: new Date(),
  date_modified: new Date(),
  is_active: false,
}

const postTicketProject = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'postTicketProject',
  date_created: new Date(),
  date_modified: new Date(),
}

const getAllTicketProject = {
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_start: new Date(),
  name: 'getAllTicketProject',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchProjectOneTradeNoGc = {
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_start: new Date(),
  name: 'patchProjectOneTradeNoGc',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchProjectMultiTradeNoGc = {
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_start: new Date(),
  name: 'patchProjectMultiTradeNoGc',
  date_created: new Date(),
  date_modified: new Date(),
}

const getLaborType = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'getLaborType',
  date_created: new Date(),
  date_modified: new Date(),
}

const postLaborType = {
  created_by: { from: 'tfuser', where: { email: 'superadmin@email.com' } },
  date_start: new Date(),
  name: 'postLaborType',
  date_created: new Date(),
  date_modified: new Date(),
}

const projectFixtures: FixtureTable = {
  tableName: 'project',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    getLetterProject,
    getTicketProject,
    projectAccess1,
    projectAccess2,
    getProject2,
    getProject3,
    getProject4,
    postTicketProject,
    getAllTicketProject,
    patchProjectMultiTradeNoGc,
    patchProjectOneTradeNoGc,
    getLaborType,
    postLaborType,
  }
}

export default projectFixtures
