import { FixtureTable } from "./util/index.js"

const normalConnectedUserEntry = {
  tfuser_id: { from: "tfuser", where: { email: "imjustnormalandconnected@email.com" } },
  company_id: { from: "company", where: { name: "Company1" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const normalConnectedMultipleUserC1 = {
  tfuser_id: { from: "tfuser", where: { email: "normalUserConnectedToMultipleCompany@email.com" } },
  company_id: { from: "company", where: { name: "Company1" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const normalConnectedMultipleUserC2 = {
  tfuser_id: { from: "tfuser", where: { email: "normalUserConnectedToMultipleCompany@email.com" } },
  company_id: { from: "company", where: { name: "Company2" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const oneCompanyZeroProjectUser = {
  tfuser_id: { from: "tfuser", where: { email: "connectedToOneCompanyZeroProjects@email.com" } },
  company_id: { from: "company", where: { name: "Company2" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const oneCompanyOneProjectUser = {
  tfuser_id: { from: "tfuser", where: { email: "connectedToOneCompanyAndOneProject@email.com" } },
  company_id: { from: "company", where: { name: "CompanyOneProject" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const oneCompanyTwoProjectUser1 = {
  tfuser_id: { from: "tfuser", where: { email: "connectedToOneCompanyAndTwoProject@email.com" } },
  company_id: { from: "company", where: { name: "CompanyTwoProject" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const twoCompanyOneProjectUser1 = {
  tfuser_id: { from: "tfuser", where: { email: "connectedToTwoCompanyAndOneProject@email.com" } },
  company_id: { from: "company", where: { name: "CompanyOneProject" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const twoCompanyOneProjectUser2 = {
  tfuser_id: { from: "tfuser", where: { email: "connectedToTwoCompanyAndOneProject@email.com" } },
  company_id: { from: "company", where: { name: "companyTwoOneProjectAccess" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const postTicket = {
  tfuser_id: { from: "tfuser", where: { email: "postTicketUser@email.com" } },
  company_id: { from: "company", where: { name: "postTicketCompany" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const postEquipmentTwo = {
  tfuser_id: { from: "tfuser", where: { email: "postEquipmentUserTwo@email.com" } },
  company_id: { from: "company", where: { name: "postEquipmentCompany2" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const postEquipmentFour = {
  tfuser_id: { from: "tfuser", where: { email: "postEquipmentUserFour@email.com" } },
  company_id: { from: "company", where: { name: "postEquipmentCompany4" } },
  company_user_role_id: { from: "company_user_role", where: { code: "crew" } },
}

const postEquipmentFive = {
  tfuser_id: { from: "tfuser", where: { email: "postEquipmentUserFive@email.com" } },
  company_id: { from: "company", where: { name: "postEquipmentCompany5" } },
  company_user_role_id: { from: "company_user_role", where: { code: "super" } },
}

const postEquipmentSix = {
  tfuser_id: { from: "tfuser", where: { email: "postEquipmentUserSix@email.com" } },
  company_id: { from: "company", where: { name: "postEquipmentCompany6" } },
  company_user_role_id: { from: "company_user_role", where: { code: "super" } },
}

const postMaterialFour = {
  tfuser_id: {from: 'tfuser', where: {email: 'postMaterialUserFour@email.com'}},
  company_id: {from: 'company', where: {name: 'postMaterialCompany4'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'crew'}}
}

const postMaterialFive = {
  tfuser_id: {from: 'tfuser', where: {email: 'postMaterialUserFive@email.com'}},
  company_id: {from: 'company', where: {name: 'postMaterialCompany5'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'super'}}
}

const postMaterialSix = {
  tfuser_id: {from: 'tfuser', where: {email: 'postMaterialUserSix@email.com'}},
  company_id: {from: 'company', where: {name: 'postMaterialCompany6'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'super'}}
}

const getAllTicketSubCrew = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketSubCrew@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketSub" } },
  company_user_role_id: { from: "company_user_role", where: { code: "crew" } },
}

const getAllTicketSubPm = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketSubPm@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketSub" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const getAllTicketSubPm2 = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketSubPm2@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketSub2" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const getAllTicketSubSuper = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketSubSuper@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketSub" } },
  company_user_role_id: { from: "company_user_role", where: { code: "super" } },
}

const getAllTicketGcPm = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketGcPm@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketGc" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const getAllTicketGcSuper = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketGcSuper@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'super'}}
}

const getAllTicketOwnerPm = {
  tfuser_id: { from: 'tfuser', where: { email: 'getAllTicketOwnerPm@email.com' } },
  company_id: { from: 'company', where: { name: 'getAllTicketOwner' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'admin' } }
}

const getGCLaborType = {
  tfuser_id: { from: 'tfuser', where: { email: 'getAllLaborGcPm@email.com' } },
  company_id: { from: 'company', where: { name: 'getGCLaborType' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'admin' } }
}

const getSubLaborType = {
  tfuser_id: { from: 'tfuser', where: { email: 'getAllLaborSubPm@email.com' } },
  company_id: { from: 'company', where: { name: 'getSubLaborType' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'admin' } }
}

const getSubCrewLaborType = {
  tfuser_id: { from: 'tfuser', where: { email: 'getAllLaborSubCrew@email.com' } },
  company_id: { from: 'company', where: { name: 'getSubLaborType' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'crew' } }
}

const getAllTicketOwnerCrew = {
  tfuser_id: { from: "tfuser", where: { email: "getAllTicketOwnerCrew@email.com" } },
  company_id: { from: "company", where: { name: "getAllTicketOwner" } },
  company_user_role_id: { from: "company_user_role", where: { code: "crew" } },
}

const patchMaterialOne = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialOne@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanyOne" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const patchMaterialTwo = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialTwo@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanyTwo" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const patchMaterialFour = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialFour@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanyFour" } },
  company_user_role_id: { from: "company_user_role", where: { code: "crew" } },
}

const patchMaterialFive = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialFive@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanyFive" } },
  company_user_role_id: { from: "company_user_role", where: { code: "super" } },
}

const patchMaterialSix = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialSix@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanySix" } },
  company_user_role_id: { from: "company_user_role", where: { code: "super" } },
}

const patchMaterialSeven = {
  tfuser_id: { from: "tfuser", where: { email: "patchMaterialSeven@email.com" } },
  company_id: { from: "company", where: { name: "patchMaterialCompanySeven" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const patchProjectOneTradeNoGc = {
  tfuser_id: { from: "tfuser", where: { email: "patchProject@email.com" } },
  company_id: { from: "company", where: { name: "patchProjectOneTradeNoGc" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const patchProjectMultiTradeNoGc1 = {
  tfuser_id: { from: "tfuser", where: { email: "patchProject@email.com" } },
  company_id: { from: "company", where: { name: "patchProjectMultiTradeNoGc1" } },
  company_user_role_id: { from: "company_user_role", where: { code: "admin" } },
}

const addToProject = {
  tfuser_id: {from: 'tfuser', where: {email: 'testUserToAddToProject@email.com'}},
  company_id: {from: 'company', where: {name: 'CompanyTwoProject'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'admin'}}
}

const connectedToOneCompanyNoProjects = {
  tfuser_id: {from: 'tfuser', where: {email: 'connectedToOneCompanyNoProjects@email.com'}},
  company_id: {from: 'company', where: {name: 'CompanyOneProject'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'admin'}}
}

const postLaborTypeSubCrew = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubCrew@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'crew' } }
}

const postLaborTypeSubSuper = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubSuper@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'super' } }
}

const postLaborTypeSubPm = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubPm@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'admin' } }
}

const postLaborTypeGcPm = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeGcPm@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeGc' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'admin' } }
}

const postLaborTypeGcSuper = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeGcSuper@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeGc' } },
  company_user_role_id: { from: 'company_user_role', where: { code: 'super' } }
}

const addGcCrew = {
  tfuser_id: {from: 'tfuser', where: {email: 'addGcCrew@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  company_user_role_id: {from: 'company_user_role', where: {code: 'admin'}}
}

const companyUserFixtures: FixtureTable = {
  tableName: "company_user",
  alwaysFlush: true,
  data: {
    // put new fixtures here
    normalConnectedUserEntry,
    normalConnectedMultipleUserC1,
    normalConnectedMultipleUserC2,
    oneCompanyOneProjectUser,
    oneCompanyZeroProjectUser,
    oneCompanyTwoProjectUser1,
    twoCompanyOneProjectUser1,
    twoCompanyOneProjectUser2,
    postTicket,
    postEquipmentTwo,
    postEquipmentFour,
    postEquipmentFive,
    postEquipmentSix,
    postMaterialFour,
    postMaterialFive,
    postMaterialSix,
    getAllTicketSubCrew,
    getAllTicketSubPm,
    getAllTicketSubSuper,
    getAllTicketGcSuper,
    getAllTicketGcPm,
    getAllTicketOwnerPm,
    getAllTicketOwnerCrew,
    getAllTicketSubPm2,
    patchProjectMultiTradeNoGc1,
    patchMaterialOne,
    patchMaterialTwo,
    patchMaterialFour,
    patchMaterialFive,
    patchMaterialSix,
    patchMaterialSeven,
    patchProjectOneTradeNoGc,
    connectedToOneCompanyNoProjects,
    getGCLaborType,
    getSubLaborType,
    getSubCrewLaborType,
    addToProject,
    postLaborTypeSubCrew,
    postLaborTypeSubPm,
    postLaborTypeSubSuper,
    postLaborTypeGcSuper,
    postLaborTypeGcPm,
    addGcCrew,
  },
}

export default companyUserFixtures
