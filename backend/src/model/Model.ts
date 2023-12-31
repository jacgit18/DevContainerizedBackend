
export type FieldType = 'string' | 'UUID' | 'number' | 'timestamp' | 'boolean' | 'enum'

export interface FieldSpec {
  name: string,
  type: FieldType,
  requiredForCreateRequest: boolean,
  returnFromDbQuery: boolean,
  canBeModifiedByUser: boolean,
  enumValues?: string[]
}

export function columnsReturnedFromDbQuery(fieldSpecs: FieldSpec[], tableName?: string): string[] {
  return fieldSpecs
    .filter((fs) => fs.returnFromDbQuery)
    // add in the table name if its ambiguous
    .map((fs) => `${tableName === undefined ? '' : tableName + '.'}${fs.name}`)
}

export function filterForModifiableFields(toFilter: any, fieldSpecs: FieldSpec[]): { [key: string]: any } {
  return fieldSpecs.reduce(
    (modifiableFields: { [key: string]: any }, fs: FieldSpec) => {
      // intentionally grouping null and undefined here
      if (fs.canBeModifiedByUser && toFilter[fs.name] != null) {
        modifiableFields[fs.name] = toFilter[fs.name]
      }
      return modifiableFields
    },
    {}
  )
}
