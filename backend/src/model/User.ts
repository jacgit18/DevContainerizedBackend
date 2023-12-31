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
    name: 'is_active',
    type: 'boolean',
    requiredForCreateRequest: false,
    returnFromDbQuery: false,
    canBeModifiedByUser: false
  },
  {
    name: 'email',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'first_name',
    type: 'string',
    requiredForCreateRequest: true,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'last_name',
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
    name: 'avatar_url',
    type: 'string',
    requiredForCreateRequest: false,
    returnFromDbQuery: true,
    canBeModifiedByUser: true
  },
  {
    name: 'password',
    type: 'string',
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
  {
    name: 'date_modified',
    type: 'timestamp',
    requiredForCreateRequest: false,
    returnFromDbQuery: false,
    canBeModifiedByUser: false,
  },
]




