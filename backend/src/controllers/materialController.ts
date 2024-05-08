import express from "express"
import { Material } from '../model/index.js'
import { materialService } from "../services/index.js"
import { TfRequest } from "../types/express.js"
import { addErrorHandlingToController, HttpError } from "../utils/error.js"
import { FieldSpecForValidation, validateAppUserId, validateFields, validateQueryParams } from "./req-data-validation/index.js"


async function createMaterials(req: TfRequest, res: express.Response): Promise<void> {
  // company id now appuser_id
  // const {company_id} = validateCompanyId(req.company_id)

  const {appuser_id} = validateAppUserId(req.appuser_id)




  // const canAddMaterials = await materialAuth.createMaterials(req.user, company_id as string)
  if (true) {
    const fieldSpecsForValidation: FieldSpecForValidation[] = Material.fieldDefinitions.map((fs) => {
      return {
        ...fs,
        cannotBeNull: fs.requiredForCreateRequest
      }
    })
    // validate inputs
    const validatedMaterials = validateFields(req.body, fieldSpecsForValidation)

    // const createdMaterials = await materialService.createMaterials(company_id as string, validatedMaterials, req.user.id)
    const createdMaterials = await materialService.createMaterials(appuser_id as string, validatedMaterials)

    res.send(createdMaterials)
  } else {
    // no access
    res.status(401).send('Not authorized for access')
  }
}

async function getMaterials(req: TfRequest, res: express.Response): Promise<void> {
  // need to validate company id first
  // const {company_id} = validateCompanyId(req.company_id)
  const {appuser_id} = validateAppUserId(req.appuser_id)

  // const hasAccessToMaterials: boolean = await materialAuth.getMaterials(req.user, company_id as string)
  if (true) {
    // no filter for admins
    // const filter: any = {company_id}
    const filter: any = {appuser_id}

    const validatedQueryParams = validateQueryParams(req.query, Material.fieldDefinitions)
    const materials = await materialService.getMaterials(filter, validatedQueryParams)
    res.send(materials)
    return
  }
  res.status(401).send('Not authorized for materials data')
}


async function updateMaterial(req: TfRequest, res: express.Response): Promise<void> {
  // const {company_id} = validateCompanyId(req.company_id)
  const {appuser_id} = validateAppUserId(req.appuser_id)

  // const isAllowedToUpdateMaterial = await materialAuth.isAllowedToUpdateMaterial(req.user.id, company_id)
  if(true){
    console.log("TTT  ", req.params.id)

    // await validateMaterialId(req.params.id) // weird behavoir might be issue with tables 
    //but passing request 
    const fieldSpecsForValidation: FieldSpecForValidation[] = Material.fieldDefinitions.filter((fs) =>
      fs.canBeModifiedByUser
    ).map((fs) => {
      return {
        ...fs,
        cannotBeNull: false
      }
    })
    // validate inputs
    const validatedMaterial = validateFields(
      req.body,
      fieldSpecsForValidation
    )
    if (Object.keys(validatedMaterial).length !== 0 ){
      const updatedCompany = await materialService.updateMaterial(validatedMaterial, req.params.id)
      res.send(updatedCompany)
      return
    }
    throw new HttpError(400, 'Invalid material id format')
  } else {
    res.status(401).send("Not authorized to perform this action.")
  }
}


const exportDefault = {
  createMaterials,
  getMaterials,
  updateMaterial
}

export default addErrorHandlingToController(exportDefault)
