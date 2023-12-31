import { FieldSpec } from "./Model.js"

export const fieldDefinitions:  FieldSpec[] = [
  {
    name: 'id',
    type: 'UUID',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'company_id',
    type: 'UUID',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'is_admin',
    type: 'boolean',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'conversion',
    type: 'number',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'cost_code',
    type: 'string',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'field_name',
    type: 'string',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'name',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'notes',
    type: 'string',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'rate',
    type: 'number',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true,
  },
  {
    name: 'size',
    type: 'string',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'unit',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'created_by',
    type: 'UUID',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'date_created',
    type: 'timestamp',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false
  },
  {
    name: 'date_modified',
    type: 'timestamp',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: false,
  },
]




