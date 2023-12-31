import { FixtureTable } from "./util/index.js"

const postTicketLabor1 = {
  cost_code: '1234gg',
  date_start: new Date(),
  name: 'postTicketLabor1',
  rate_rt: '10',
  rate_ot: '11',
  rate_pot: '12',
  rate_dt: '5',
  rate_pdt: '15',
  notes: 'postTicketLabor1',
  created_by_project_user: { from: 'project_user', where: { notes: 'getAllTicketSubPm' } },
  subcontractor_id: { from: 'company', where: { name: 'getAllTicketSub' } },
  date_created: new Date(),
  date_modified: new Date(),
}

const postTicketLaborDontHaveAccess = {
  cost_code: '1234gg',
  date_start: new Date(),
  name: 'postTicketLaborDontHaveAccess',
  rate_rt: '10',
  rate_ot: '11',
  rate_pot: '12',
  rate_dt: '5',
  rate_pdt: '15',
  notes: 'postTicketLaborDontHaveAccess',
  created_by_project_user: { from: 'project_user', where: { notes: 'getAllTicketGcPm' } },
  subcontractor_id: { from: 'company', where: { name: 'getAllTicketGc' } },
  date_created: new Date(),
  date_modified: new Date(),
}

const getSubLaborType1 = {
  cost_code: '1234gg',
  date_start: new Date(),
  name: 'getSubLaborType1',
  rate_rt: '10',
  rate_ot: '11',
  rate_pot: '12',
  rate_dt: '5',
  rate_pdt: '15',
  notes: 'getSubLaborType1',
  created_by_project_user: { from: 'project_user', where: { notes: 'getSubLaborType' } },
  subcontractor_id: { from: 'company', where: { name: 'getSubLaborType' } },
  date_created: new Date(),
  date_modified: new Date(),
}

const getSubLaborType2 = {
  cost_code: '1234gg',
  date_start: new Date(),
  name: 'getSubLaborType2',
  rate_rt: '10',
  rate_ot: '11',
  rate_pot: '12',
  rate_dt: '5',
  rate_pdt: '15',
  notes: 'getSubLaborType2',
  created_by_project_user: { from: 'project_user', where: { notes: 'getSubLaborType' } },
  subcontractor_id: { from: 'company', where: { name: 'getGCLaborType' } },
  date_created: new Date(),
  date_modified: new Date(),
  
}

const getGCLaborType = {
  cost_code: '1234gg',
  date_start: new Date(),
  name: 'getGCLaborType',
  rate_rt: '10',
  rate_ot: '11',
  rate_pot: '12',
  rate_dt: '5',
  rate_pdt: '15',
  notes: 'getGCLaborType',
  created_by_project_user: { from: 'project_user', where: { notes: 'getGCLaborType' } },
  subcontractor_id: { from: 'company', where: { name: 'getSubLaborType' } },
  date_created: new Date(),
  date_modified: new Date(),
  
}

const laborTypeFixtures: FixtureTable = {
  tableName: 'labor_type',
  alwaysFlush: true,
  data: {
    // put new fixtures here
    postTicketLabor1,
    postTicketLaborDontHaveAccess,
    getGCLaborType,
    getSubLaborType1,
    getSubLaborType2,
  }
}

export default laborTypeFixtures
