import { FixtureTable } from "./util/index.js"

const oneCompanyOneProjectAccess = {
  company_id: { from: 'company', where: { name: 'CompanyOneProject' } },
  project_id: { from: 'project', where: { name: 'projectAccess1' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const oneCompanyTwoProjectAccess1 = {
  company_id: { from: 'company', where: { name: 'CompanyTwoProject' } },
  project_id: { from: 'project', where: { name: 'projectAccess1' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const oneCompanyTwoProjectAccess2 = {
  company_id: { from: 'company', where: { name: 'CompanyTwoProject' } },
  project_id: { from: 'project', where: { name: 'projectAccess2' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const getProject2AndCompany = {
  company_id: { from: 'company', where: { name: 'getProjectCompany' } },
  project_id: { from: 'project', where: { name: 'getProject2' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const getProject3AndCompany = {
  company_id: { from: 'company', where: { name: 'getProjectCompany' } },
  project_id: { from: 'project', where: { name: 'getProject3' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const getProject4AndCompany = {
  company_id: { from: 'company', where: { name: 'getProjectCompany' } },
  project_id: { from: 'project', where: { name: 'getProject4' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const postTicket = {
  company_id: { from: 'company', where: { name: 'postTicketCompany' } },
  project_id: { from: 'project', where: { name: 'postTicketProject' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const getAllTicketOwner = {
  company_id: { from: 'company', where: { name: 'getAllTicketOwner' } },
  project_id: { from: 'project', where: { name: 'getAllTicketProject' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'owner' } },
  date_created: new Date(),
}

const getAllTicketGc = {
  company_id: { from: 'company', where: { name: 'getAllTicketGc' } },
  project_id: { from: 'project', where: { name: 'getAllTicketProject' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
  company_created_project: true
}

const getAllTicketSub = {
  company_id: { from: 'company', where: { name: 'getAllTicketSub' } },
  project_id: { from: 'project', where: { name: 'getAllTicketProject' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'trade' } },
  date_created: new Date(),
}

const getLaborTypeGc = {
  company_id: { from: 'company', where: { name: 'getGCLaborType' } },
  project_id: { from: 'project', where: { name: 'getLaborType' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'cm' } },
  date_created: new Date(),
}

const getLaborTypeSub = {
  company_id: { from: 'company', where: { name: 'getSubLaborType' } },
  project_id: { from: 'project', where: { name: 'getLaborType' } },
  project_company_role_id: { from: 'project_company_role', where: { code: 'trade' } },
  date_created: new Date(),
}

const getAllTicketSub2 = {
  company_id: {from: 'company', where: {name: 'getAllTicketSub2'}},
  project_id: {from: 'project', where: {name: 'getAllTicketProject'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'trade'}},
  date_created: new Date(),
}

const patchProjectOneTradeNoGc = {
  company_id: {from: 'company', where: {name: 'patchProjectOneTradeNoGc'}},
  project_id: {from: 'project', where: {name: 'patchProjectOneTradeNoGc'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'trade'}},
  date_created: new Date(),
}

const patchProjectMultiTradeNoGc1 = {
  company_id: {from: 'company', where: {name: 'patchProjectMultiTradeNoGc1'}},
  project_id: {from: 'project', where: {name: 'patchProjectMultiTradeNoGc'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'trade'}},
  date_created: new Date(),
}

const patchProjectMultiTradeNoGc2 = {
  company_id: {from: 'company', where: {name: 'patchProjectMultiTradeNoGc2'}},
  project_id: {from: 'project', where: {name: 'patchProjectMultiTradeNoGc'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'trade'}},
  date_created: new Date(),
}

const postLaborTypeSub = {
  company_id: {from: 'company', where: {name: 'postLaborTypeSub'}},
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'trade'}},
  date_created: new Date(),
}

const postLaborTypeGc = {
  company_id: {from: 'company', where: {name: 'postLaborTypeGc'}},
  project_id: {from: 'project', where: {name: 'postLaborType'}},
  project_company_role_id: {from: 'project_company_role', where: {code: 'cm'}},
  date_created: new Date(),
}

const projectCompanyFixtures: FixtureTable = {
  tableName: 'project_company',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    oneCompanyTwoProjectAccess1,
    oneCompanyTwoProjectAccess2,
    oneCompanyOneProjectAccess,
    getProject2AndCompany,
    getProject3AndCompany,
    getProject4AndCompany,
    postTicket,
    getAllTicketOwner,
    getAllTicketGc,
    getAllTicketSub,
    getAllTicketSub2,
    patchProjectOneTradeNoGc,
    patchProjectMultiTradeNoGc1,
    patchProjectMultiTradeNoGc2,
    getLaborTypeGc,
    getLaborTypeSub,
    postLaborTypeSub,
    postLaborTypeGc,

  }
}

export default projectCompanyFixtures
