import {FieldSpecForValidation, validateFields, validateObjectList, validateDataObjectExistence} from "./index.js"
import {Material} from '../../model/index.js'
import {isNonEmptyArray} from "../../utils/validation.js"
import{uuidRegex} from "../../utils/validation.js"
import {db} from "../../data/db.js"
import {HttpError} from "../../utils/error.js"


export async function validateMaterialId(material_id: string): Promise<void> {
  const materialFormatCheck = material_id.match(uuidRegex)
  const materialTypeExist = await validateDataObjectExistence("material_type", material_id)
  if (materialFormatCheck === null || !materialTypeExist) {
    throw new HttpError(400, 'Invalid material id')
  }
}


