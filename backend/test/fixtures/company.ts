import { FixtureTable } from "./util/index.js"

const company1 = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "Company1",
  company_type: "cm",
  date_created: new Date(),
}

const company2 = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "Company2",
  company_type: "cm",
  date_created: new Date(),
}

const companyOneProject = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "CompanyOneProject",
  company_type: "cm",
  date_created: new Date(),
}

const companyTwoProject = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "CompanyTwoProject",
  company_type: "cm",
  date_created: new Date(),
}

const companyTwoOneProjectAccess = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "companyTwoOneProjectAccess",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompany = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUser@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompanyTwo = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUserTwo@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany2",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompanyThree = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUserThree@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany3",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompanyFour = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUserFour@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany4",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompanyFive = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUserFive@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany5",
  company_type: "cm",
  date_created: new Date(),
}

const postEquipmentCompanySix = {
  created_by: { from: "tfuser", where: { email: "postEquipmentUserSix@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postEquipmentCompany6",
  company_type: "cm",
  date_created: new Date(),
}

const getProjectCompany = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getProjectCompany",
  company_type: "cm",
  date_created: new Date(),
}

const getInactiveCompany = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getInactiveCompany",
  company_type: "cm",
  date_created: new Date(),
  is_active: false,
}

const postTicketCompany = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "postTicketCompany",
  company_type: "cm",
  date_created: new Date(),
}

const postMaterialCompany = {
  created_by: {from: 'tfuser', where: {email: 'postMaterialUser@email.com'}},
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany',
  company_type: 'cm',
  date_created: new Date(),
}

const postMaterialCompanyTwo = {
  created_by: { from: 'tfuser', where: { email: 'postMaterialUserTwo@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany2',
  company_type: 'cm',
  date_created: new Date(),
}

const postMaterialCompanyThree = {
  created_by: { from: 'tfuser', where: { email: 'postMaterialUserThree@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany3',
  company_type: 'cm',
  date_created: new Date(),
}

const postMaterialCompanyFour = {
  created_by: { from: 'tfuser', where: { email: 'postMaterialUserFour@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany4',
  company_type: 'cm',
  date_created: new Date(),
}

const postMaterialCompanyFive = {
  created_by: {from: 'tfuser', where: {email: 'postMaterialUserFive@email.com'}},
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany5',
  company_type: 'cm',
  date_created: new Date(),
}

const postMaterialCompanySix = {
  created_by: {from: 'tfuser', where: {email: 'postMaterialUserSix@email.com'}},
  address: '155 Company Lane, Companytown, USA',
  name: 'postMaterialCompany6',
  company_type: 'cm',
  date_created: new Date(),
}

const getAllTicketOwner = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getAllTicketOwner",
  company_type: "owner",
  date_created: new Date(),
}

const getAllTicketGc = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getAllTicketGc",
  company_type: "cm",
  date_created: new Date(),
}

const getAllTicketSub = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getAllTicketSub",
  company_type: "trade",
  date_created: new Date(),
}

const getAllTicketSub2 = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "getAllTicketSub2",
  company_type: "trade",
  date_created: new Date(),
}

const patchProjectOneTradeNoGcCompany = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchProjectOneTradeNoGc",
  company_type: "trade",
  date_created: new Date(),
}

const patchProjectMultiTradeNoGcCompany1 = {
  created_by: { from: "tfuser", where: { email: "superadmin@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchProjectMultiTradeNoGc1",
  company_type: "trade",
  date_created: new Date(),
}

const patchProjectMultiTradeNoGcCompany2 = {
  created_by: {from: 'tfuser', where: {email: 'superadmin@email.com'}},
  address: '155 Company Lane, Companytown, USA',
  name: 'patchProjectMultiTradeNoGc2',
  company_type: 'trade',
  date_created: new Date(),
}

const getGCLaborType = {
  created_by: { from: 'tfuser', where: { email: 'getAllLaborGcPm@email.com' } },
  address: '155 Company Lane, CompanyTown, USA',
  name: 'getGCLaborType',
  company_type: 'trade',
  date_created: new Date(),
}

const getSubLaborType = {
  created_by: { from: 'tfuser', where: { email: 'getAllLaborSubPm@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'getSubLaborType',
  company_type: 'trade',
  date_created: new Date(),
}

const patchMaterialCompanyOne = {
  created_by: { from: "tfuser", where: { email: "patchMaterialOne@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyOne",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanyTwo = {
  created_by: { from: "tfuser", where: { email: "patchMaterialTwo@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyTwo",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanyThree = {
  created_by: { from: "tfuser", where: { email: "patchMaterialThree@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyThree",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanyNotThree = {
  created_by: { from: "tfuser", where: { email: "patchMaterialNotThree@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyNotThree",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanyFour = {
  created_by: { from: "tfuser", where: { email: "patchMaterialFour@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyFour",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanyFive = {
  created_by: { from: "tfuser", where: { email: "patchMaterialFive@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanyFive",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanySix = {
  created_by: { from: "tfuser", where: { email: "patchMaterialSix@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanySix",
  company_type: "trade",
  date_created: new Date(),
}

const patchMaterialCompanySeven = {
  created_by: { from: "tfuser", where: { email: "patchMaterialSeven@email.com" } },
  address: "155 Company Lane, Companytown, USA",
  name: "patchMaterialCompanySeven",
  company_type: "trade",
  date_created: new Date(),
}

const postLaborTypeSub = {
  created_by: { from: 'tfuser', where: { email: 'postLaborTypeSubPm@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'postLaborTypeSub',
  company_type: 'trade',
  date_created: new Date(),
}

const postLaborTypeGc = {
  created_by: { from: 'tfuser', where: { email: 'postLaborTypeSubPm@email.com' } },
  address: '155 Company Lane, Companytown, USA',
  name: 'postLaborTypeGc',
  company_type: 'cm',
  date_created: new Date(),
}


const companyFixtures: FixtureTable = {
  tableName: "company",
  alwaysFlush: true,
  data: {
    // put new fixtures here
    company1,
    company2,
    companyOneProject,
    companyTwoProject,
    companyTwoOneProjectAccess,
    postEquipmentCompany,
    postEquipmentCompanyTwo,
    postEquipmentCompanyThree,
    postEquipmentCompanyFour,
    postEquipmentCompanyFive,
    postEquipmentCompanySix,
    getProjectCompany,
    getInactiveCompany,
    postTicketCompany,
    postMaterialCompany,
    postMaterialCompanyTwo,
    postMaterialCompanyThree,
    postMaterialCompanyFour,
    postMaterialCompanyFive,
    postMaterialCompanySix,
    getAllTicketOwner,
    getAllTicketGc,
    getAllTicketSub,
    getAllTicketSub2,
    patchProjectOneTradeNoGcCompany,
    patchProjectMultiTradeNoGcCompany1,
    patchProjectMultiTradeNoGcCompany2,
    patchMaterialCompanyOne,
    patchMaterialCompanyTwo,
    patchMaterialCompanyThree,
    patchMaterialCompanyNotThree,
    patchMaterialCompanyFour,
    patchMaterialCompanyFive,
    patchMaterialCompanySix,
    patchMaterialCompanySeven,
    getGCLaborType,
    getSubLaborType,
    postLaborTypeSub,
    postLaborTypeGc,

  }
}

export default companyFixtures
