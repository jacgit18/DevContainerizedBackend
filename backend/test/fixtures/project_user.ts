import {FixtureTable} from "./util/index.js"

const oneCompanyOneProjectAccess = {
  company_id: {from: 'company', where: {name: 'CompanyOneProject'}},
  project_id: {from: 'project', where: {name: 'projectAccess1'}},
  tfuser_id: {from: 'tfuser', where: {email: 'connectedToOneCompanyAndOneProject@email.com'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
}

const oneCompanyTwoProjectAccess1 = {
  company_id: {from: 'company', where: {name: 'CompanyTwoProject'}},
  project_id: {from: 'project', where: {name: 'projectAccess1'}},
  tfuser_id: {from: 'tfuser', where: {email: 'connectedToOneCompanyAndTwoProject@email.com'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'crew'}},
}

const oneCompanyTwoProjectAccess2 = {
  company_id: {from: 'company', where: {name: 'CompanyTwoProject'}},
  project_id: {from: 'project', where: {name: 'projectAccess2'}},
  tfuser_id: {from: 'tfuser', where: {email: 'connectedToOneCompanyAndTwoProject@email.com'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'super'}},
}

const twoCompanyOneProjectUser1 = {
  tfuser_id: {from: 'tfuser', where: {email: 'connectedToTwoCompanyAndOneProject@email.com'}},
  company_id: {from: 'company', where: {name: 'CompanyOneProject'}},
  project_id: {from: 'project', where: {name: 'projectAccess1'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
}

const postTicket = {
  tfuser_id: {from: 'tfuser', where: {email: 'postTicketUser@email.com'}},
  company_id: {from: 'company', where: {name: 'postTicketCompany'}},
  project_id: {from: 'project', where: {name: 'postTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'postTicket'
}

const getAllTicketSubCrew = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketSubCrew@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketSub'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'crew'}},
  notes: 'getAllTicketSubCrew',
}

const getAllTicketSubSuper = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketSubSuper@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketSub'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'super'}},
  notes: 'getAllTicketSubSuper',
}

const getAllTicketSubPm = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketSubPm@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketSub'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getAllTicketSubPm',
}

const getAllTicketSubPm2 = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketSubPm2@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketSub2'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getAllTicketSubPm2',
}

const getAllTicketGcPm = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketGcPm@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getAllTicketGcPm'
}

const getAllTicketGcSuper = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketGcSuper@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketGc'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'super'}},
  notes: 'getAllTicketGcSuper',
}

const getAllTicketOwnerPm = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketOwnerPm@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketOwner'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getAllTicketOwnerPm'
}

const getAllTicketOwnerCrew = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllTicketOwnerCrew@email.com'}},
  company_id: {from: 'company', where: {name: 'getAllTicketOwner'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'crew'}},
  notes: 'getAllTicketOwnerCrew'
}

const patchProjectOneTradeNoGc = {
  tfuser_id: {from: 'tfuser', where: {email: 'patchProject@email.com'}},
  company_id: {from: 'company', where: {name: 'patchProjectOneTradeNoGc'}},
  project_id: {from: 'project', where: {name: 'patchProjectOneTradeNoGc'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'patchProjectOneTradeNoGc'
}

const patchProjectMultiTradeNoGc1 = {
  tfuser_id: {from: 'tfuser', where: {email: 'patchProject@email.com'}},
  company_id: {from: 'company', where: {name: 'patchProjectMultiTradeNoGc1'}},
  project_id: {from: 'project', where: {name: 'patchProjectMultiTradeNoGc'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'patchProjectMultiTradeNoGc1'
}

const getGCLaborType = {
  tfuser_id: {from: 'tfuser', where: {email: 'getAllLaborGcPm@email.com'}},
  company_id: {from: 'company', where: {name: 'getGCLaborType'}},
  project_id: {from: 'project', where: {name: 'getLaborType'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getGCLaborType',
}

const getSubLaborType ={
  tfuser_id: {from: 'tfuser', where: {email: 'getAllLaborSubPm@email.com'}},
  company_id: {from: 'company', where: {name: 'getSubLaborType'}},
  project_id: {from: 'project', where: {name: 'getLaborType'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'pm'}},
  notes: 'getSubLaborType',
}

const getSubCrewLaborType ={
  tfuser_id: {from: 'tfuser', where: {email: 'getAllLaborSubCrew@email.com'}},
  company_id: {from: 'company', where: {name: 'getSubLaborType'}},
  project_id: {from: 'project', where: {name: 'getLaborType'}},
  project_user_role_id: {from: 'project_user_role', where: {code: 'crew'}},
  notes: 'getSubCrewLaborType',
}

const postLaborTypeSubPm = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubPm@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_user_role_id: { from: 'project_user_role', where: { code: 'pm' } },
  notes: 'postLaborTypeSubPm'
}

const postLaborTypeSubSuper = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubSuper@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_user_role_id: { from: 'project_user_role', where: { code: 'super' } },
  notes: 'postLaborTypeSubSuper'
}

const postLaborTypeSubCrew = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeSubCrew@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeSub' } },
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_user_role_id: { from: 'project_user_role', where: { code: 'crew' } },
  notes: 'postLaborTypeSubCrew'
}

const postLaborTypeGcSuper = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeGcSuper@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeGc' } },
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_user_role_id: { from: 'project_user_role', where: { code: 'super' } },
  notes: 'postLaborTypeGcSuper'
}

const postLaborTypeGcPm = {
  tfuser_id: { from: 'tfuser', where: { email: 'postLaborTypeGcPm@email.com' } },
  company_id: { from: 'company', where: { name: 'postLaborTypeGc' } },
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_user_role_id: { from: 'project_user_role', where: { code: 'pm' } },
  notes: 'postLaborTypeGcPm'
}


const projectUserFixtures: FixtureTable = {
  tableName: 'project_user',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    oneCompanyTwoProjectAccess1,
    oneCompanyTwoProjectAccess2,
    oneCompanyOneProjectAccess,
    twoCompanyOneProjectUser1,
    postTicket,
    getAllTicketSubCrew,
    getAllTicketSubPm,
    getAllTicketSubSuper,
    getAllTicketGcPm,
    getAllTicketGcSuper,
    getAllTicketOwnerPm,
    getAllTicketOwnerCrew,
    getAllTicketSubPm2,
    patchProjectMultiTradeNoGc1,
    patchProjectOneTradeNoGc,
    getGCLaborType,
    getSubLaborType,
    getSubCrewLaborType,
    postLaborTypeSubPm,
    postLaborTypeSubCrew,
    postLaborTypeSubSuper,
    postLaborTypeGcSuper,
    postLaborTypeGcPm,
  }
}

export default projectUserFixtures
