import { QueryParams } from "../controllers/req-data-validation/index.js"
import { materialData } from "../data/index.js"
import { Material } from '../model/index.js'
import { columnsReturnedFromDbQuery } from "../model/Model.js"

async function createMaterials(appuser_id: string, material: any): Promise<any> {
  material.date_created = new Date()
  material.date_modified = new Date()
  material.appuser_id = appuser_id
  // material.created_by = userID

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
