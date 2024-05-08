import { HttpError } from "../../utils/error.js"
import { uuidRegex } from "../../utils/validation.js"
import { validateDataObjectExistence } from "./index.js"


export async function validateMaterialId(material_id: string): Promise<void> {
  const materialFormatCheck = material_id.match(uuidRegex)


  const materialTypeExist = await validateDataObjectExistence("material_type", material_id)


  if (materialFormatCheck === null || !materialTypeExist) {

    throw new HttpError(400, 'Invalid material id')
  }
}


