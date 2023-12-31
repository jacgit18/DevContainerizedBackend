import {FixtureTable} from "./util/index.js"

const superAdminEntry = {
  tfuser_id: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
}

const superAdminEntry2 = {
  tfuser_id: {from: 'tfuser', where: {email: 'superadmin2@email.com'}},
}

const noneAdminEntry = {
  tfuser_id: {from: 'tfuser', where: {email: 'postMaterialUserTwo@email.com'}},
}

const tfAdminFixtures: FixtureTable = {
  tableName: 'tf_admin',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    superAdminEntry,
    superAdminEntry2,
    noneAdminEntry

  }
}

export default tfAdminFixtures
