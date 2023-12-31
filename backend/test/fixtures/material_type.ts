import {FixtureTable} from "./util/index.js"

const postTicketMaterial1 = {
  company_id: {from: 'company', where: {name: 'getAllTicketSub'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_created: new Date(),
  date_modified: new Date(),
  conversion: '5.5',
  cost_code: '2345',
  field_name: 'super material',
  name: 'postTicketMaterial1',
  rate: 5,
  size: 'xl',
  unit: 'sheets',
}
const postTicketMaterialDontHaveAccess = {
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  date_created: new Date(),
  date_modified: new Date(),
  conversion: '5.5',
  cost_code: '2345',
  field_name: 'super material',
  name: 'postTicketMaterialDontHaveAccess',
  rate: 5,
  size: 'xl',
  unit: 'sheets',
}

const getMaterial1 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getMaterial1',
  field_name: 'getMaterial1',
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getMaterial2 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getMaterial2',
  field_name: 'getMaterial2',
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getMaterial3 = {
  company_id: {from: 'company', where: {name: 'getProjectCompany'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getMaterial3',
  field_name: 'getMaterial3',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const getMaterial4 = {
  company_id: {from: 'company', where: {name: 'CompanyOneProject'}},
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  name: 'getMaterial4',
  field_name: 'getMaterial4',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterial1 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyOne'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialOne@email.com'}},
  name: 'getMaterialForPatchOne',
  field_name: 'getMaterialForPatchOne',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterial2 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyTwo'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialTwo@email.com'}},
  name: 'getMaterialForPatchTwo',
  field_name: 'getMaterialForPatchTwo',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterial3 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyThree'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialThree@email.com'}},
  name: 'getMaterialForPatchThree',
  field_name: 'getMaterialForPatchThree',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const patchMaterialNot3 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyNotThree'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialNotThree@email.com'}},
  name: 'getMaterialForPatchThree',
  field_name: 'getMaterialForPatchThree',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}


const patchMaterial4 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyFour'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialFour@email.com'}},
  name: 'getMaterialForPatchFour',
  field_name: 'getMaterialForPatchFour',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}


const patchMaterial5 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanyFive'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialFive@email.com'}},
  name: 'getMaterialForPatchFive',
  field_name: 'getMaterialForPatchFive',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}


const patchMaterial6 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanySix'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialSix@email.com'}},
  name: 'getMaterialForPatchSix',
  field_name: 'getMaterialForPatchSix',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}


const patchMaterial7 = {
  company_id: {from: 'company', where: {name: 'patchMaterialCompanySeven'}},
  created_by: {from: 'tfuser', where: {email: 'patchMaterialSeven@email.com'}},
  name: 'getMaterialForPatchSeven',
  field_name: 'getMaterialForPatchSeven',
  is_active: false,
  size: '3',
  unit: '3',
  date_created: new Date(),
  date_modified: new Date(),
}

const materialTypeFixtures: FixtureTable = {
  tableName: 'material_type',
  alwaysFlush: true,
  data: {
    postTicketMaterial1,
    postTicketMaterialDontHaveAccess,
    getMaterial1,
    getMaterial2,
    getMaterial3,
    getMaterial4,
    patchMaterial1,
    patchMaterial2,
    patchMaterial3,
    patchMaterialNot3,
    patchMaterial4,
    patchMaterial5,
    patchMaterial6,
    patchMaterial7,

  }
}

export default materialTypeFixtures
