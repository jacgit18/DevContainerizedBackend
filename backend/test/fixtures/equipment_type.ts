import {FixtureTable} from "./util/index.js"

const postTicketEquipment1 = {
  company_id: {from: 'company', where: {name: 'getAllTicketSub'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_created: new Date(),
  date_modified: new Date(),
  cost_code: '2345',
  name: 'postTicketEquipment1',
  rate: 5,
  unit: 'sheets',
}

const postTicketEquipmentDontHaveAccess = {
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_created: new Date(),
  date_modified: new Date(),
  cost_code: '2345',
  name: 'postTicketEquipmentDontHaveAccess',
  rate: 5,
  unit: 'sheets',
}

const getEquipment1 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getEquipment1',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getEquipment2 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getEquipment2',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getEquipment3 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getEquipment3',
  is_active: false,
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getEquipment4 = {
  company_id: {from: 'company', where: {name: 'CompanyOneProject'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getEquipment4',
  is_active: false,
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const equipmentTypeFixtures: FixtureTable = {
  tableName: 'equipment_type',
  alwaysFlush: true,
  data: {
    postTicketEquipment1,
    postTicketEquipmentDontHaveAccess,
    getEquipment1,
    getEquipment2,
    getEquipment3,
    getEquipment4,
  }
}

export default equipmentTypeFixtures
