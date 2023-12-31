import { QueryParams } from "../controllers/req-data-validation/index.js"
import { materialData } from "../data/index.js"
import { columnsReturnedFromDbQuery } from "../model/Model.js"
import { Material } from '../model/index.js'

async function createMaterials(company_id: string, material: any, userID: string): Promise<any> {
  material.date_created = new Date()
  material.date_modified = new Date()
  material.company_id = company_id
  material.created_by = userID

  return materialData.createMaterial(
    material,
    columnsReturnedFromDbQuery(Material.fieldDefinitions)
  )
}

async function getMaterials(filter: any, queryParams: QueryParams): Promise<any[]> {
  return await materialData.getMaterials(
    filter,
    queryParams,
    columnsReturnedFromDbQuery(Material.fieldDefinitions)
  )
}

async function updateMaterial(updatedValues: any, material_id: string): Promise<any> {
  updatedValues.date_modified = new Date()
  return materialData.updateMaterial(
    updatedValues,
    {id: material_id},
    columnsReturnedFromDbQuery(Material.fieldDefinitions)
  )
}


export default {
  createMaterials,
  getMaterials,
  updateMaterial
}
