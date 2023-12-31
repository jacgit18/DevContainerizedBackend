import { FieldSpec } from "./Model.js"

const companyType = ["trade", "cm", "owner"]

export const fieldDefinitions: FieldSpec[] = [
    {
      name: 'id',
      type: 'UUID',
      requiredForCreateRequest: false,
      returnFromDbQuery: true,
      canBeModifiedByUser: false
    },
    {
      name: 'address',
      type: 'string',
      requiredForCreateRequest: false,
      returnFromDbQuery: true,
      canBeModifiedByUser: true
    },
    {
      name: 'is_active',
      type: 'boolean',
      requiredForCreateRequest: false,
      returnFromDbQuery: false,
      canBeModifiedByUser: false
    },
    {
      name: 'logo_url',
      type: 'string',
      requiredForCreateRequest: false,
      returnFromDbQuery: true,
      canBeModifiedByUser: false,
    },
    {
      name: 'name',
      type: 'string',
      requiredForCreateRequest: true,
      returnFromDbQuery: true,
      canBeModifiedByUser: true
    },
    {
      name: 'phone',
      type: 'string',
      requiredForCreateRequest: false,
      returnFromDbQuery: true,
      canBeModifiedByUser: true
    },
    {
      name: 'company_type', // DEV-125 company_type is currently an enum in the create-company-table file, we left it as a string type here but please be sure to review this
      type: 'enum',
      requiredForCreateRequest: true,
      returnFromDbQuery: true,
      canBeModifiedByUser: false,
      enumValues: companyType,
    },
    {
      name: 'created_by',
      type: 'UUID',
      requiredForCreateRequest: false,
      returnFromDbQuery: false,
      canBeModifiedByUser: false
    },
    {
      name: 'date_created',
      type: 'timestamp',
      requiredForCreateRequest: false,
      returnFromDbQuery: false,
      canBeModifiedByUser: false
    },
  ]
  