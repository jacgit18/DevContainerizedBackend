import {QueryParams} from "../controllers/req-data-validation/index.js"

export function updateFilterForQueryParams(filter: any, queryParams: QueryParams): any {
  const updatedFilter: any = {...filter}
  if (queryParams.active !== undefined) {
    const activeFieldNameInDatabase: string = `is_active`
    updatedFilter[activeFieldNameInDatabase] = queryParams.active
  }
  if (queryParams.include !== undefined) {
    // if id is already present, then we need to update it
    if (updatedFilter.id != null) {
      // if it's an array, we need to combine
      updatedFilter.id = Array.isArray(updatedFilter.id)
        ? [...updatedFilter.id, ...queryParams.include]
        : [updatedFilter.id, ...queryParams.include]
    } else {
      updatedFilter.id = [...queryParams.include]
    }
  }
  return updatedFilter
}

export function updateFilterForTableName(tableName: string, filter: any): any {
  const updatedFilter: any = {...filter}
  for (let filterKey of Object.keys(updatedFilter)) {
    updatedFilter[`${tableName}.${filterKey}`] = updatedFilter[filterKey]
    delete updatedFilter[filterKey]
  }
  return updatedFilter
}

export function paginationForQuery(limit: number | undefined, page: number | undefined, query: any): any {
  return limit === undefined || page === undefined
    ? query
    : query.limit(limit).offset((page - 1) * limit)
}
