// Docs can be found at: http://city41.github.io/node-sql-fixtures/
// @ts-ignore
import sqlFixtures from 'sql-fixtures'

import {FixtureTable} from "./util/index.js"
import letterFixtures from './letter.js'
import {db} from "../../src/data/db.js"
import projectFixtures from "./project.js"
import userFixtures from "./user.js"
import companyFixtures from "./company.js"
import ticketFixtures from "./ticket.js"
import clientFixtures from "./client.js"
import tfAdminFixtures from "./tf_admin.js"
import companyUserFixtures from "./company_user.js"
import projectCompanyFixtures from "./project_company.js"
import projectUserFixtures from "./project_user.js"
import laborTypeFixtures from "./labor_type.js"
import materialTypeFixtures from "./material_type.js"
import equipmentTypeFixtures from "./equipment_type.js"
import breakdownLaborFixtures from "./breakdown_labor.js"
import breakdownMaterialFixtures from "./breakdown_material.js"
import breakdownEquipmentFixtures from "./breakdown_equipment.js"
import ticketMarkupFixtures from "./ticket_markup.js"
import ticketHistoryFixtures from "./ticket_history.js"
import ticketReviewProcessFixtures from "./ticket_review_process.js"
import fileFixtures from "./file.js"

// ** MUST BE ADDED IN ORDER OF FOREIGN KEY DEPENDENCIES
const fixtureTablesOrderedByDependency: FixtureTable[] = [
  userFixtures,
  tfAdminFixtures,
  companyFixtures,
  companyUserFixtures,
  materialTypeFixtures,
  equipmentTypeFixtures,
  clientFixtures,
  projectFixtures,
  projectCompanyFixtures,
  projectUserFixtures,
  laborTypeFixtures,
  letterFixtures,
  ticketFixtures,
  ticketMarkupFixtures,
  breakdownLaborFixtures,
  breakdownMaterialFixtures,
  breakdownEquipmentFixtures,
  ticketReviewProcessFixtures,
  ticketHistoryFixtures,
  fileFixtures,
]

// Allows us easy access to fixtures
let Fixtures: any = {}
export function getFixture(table: string, field?: string, value?: any): any {
  // some flexibility here, can get the entire table or just one row
  const item = field === undefined
    ? Fixtures[table]
    : Fixtures[table]?.find((row: any) => row[field] === value)
  if (item === undefined) throw new Error('cant find this fixture, please double check inputs')
  return item
}

const SqlFixturesDataSpec: any[] = fixtureTablesOrderedByDependency.map(
  (ft) => {
    const dataSpec: {[key: string]: any[]} = {}
    dataSpec[ft.tableName] = Object.keys(ft.data).map((key: string) => ft.data[key])
    return dataSpec
  }
)

export async function addFixtures(): Promise<void> {
  // TODO: add a check to make sure we don't add the same fixture twice
  // TODO check if there are existing fixtures -- if so, run flush fixtures first
  // need to reset our Fixtures accessor first
  Fixtures = {}
  const fixtureFactory = new sqlFixtures(db)
  for (let dataSpec of SqlFixturesDataSpec) {
    await fixtureFactory.create(dataSpec).then(
      (sqlData: any) => {
        // add new sql data to object
        for (let tableName of Object.keys(sqlData)) {
          Fixtures[tableName] = sqlData[tableName]
        }
      }, // don't need to know if its successful
      (e: any) => {
        console.log('THERE WAS AN ERROR WITH SQL FIXTURES')
        console.log(Object.keys(dataSpec))
        console.log(e)
      }
    )
  }
}

export async function flushFixtures(): Promise<void> {
  // have to flush in reverse order of dependencies
  for (let fixtureTable of fixtureTablesOrderedByDependency.slice().reverse()) {
    // only flush if we should
    if (fixtureTable.alwaysFlush) {
      await db(fixtureTable.tableName).delete()
    }
  }
}
