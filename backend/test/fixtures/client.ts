import {FixtureTable} from "./util/index.js";

const getLetterClient = {
  company_id: {from: 'company', where: {name: 'Company1'}},
  name: 'getLetterClient',
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
}

const clientFixtures: FixtureTable = {
  tableName: 'client',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    getLetterClient,
  }
}

export default clientFixtures
