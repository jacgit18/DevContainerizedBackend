import knex from 'knex'
import config from "../../config/config.js"

// @ts-ignore
export const db = knex(config.standardDbConfig)

export const whereBuilder = (filter: {[key: string]: any}) => {
  const nonArrayEntries: {[key: string]: any} = Object.keys(filter).reduce(
    (nonArrEnt: {[key: string]: any}, key: string) => {
      if (!Array.isArray(filter[key])) {
        nonArrEnt[key] = filter[key]
      }
      return nonArrEnt
    },
    {}
  )
  const arrayEntries: {[key: string]: any[]} = Object.keys(filter).reduce(
    (arrEnt: {[key: string]: any}, key: string) => {
      if (Array.isArray(filter[key])) {
        if (filter[key].length === 0) {
          throw new Error('cannot use empty array for SQL filter')
        }
        arrEnt[key] = filter[key]
      }
      return arrEnt
    },
    {}
  )
  return (builder: any) => {
    // need to compose the array entries
    return Object.keys(arrayEntries).reduce(
      (b: any, key: string) => {
        return b.whereIn(key, arrayEntries[key])
      },
      Object.keys(nonArrayEntries).length > 0 ? builder.where(nonArrayEntries) : builder
    )
  }
}

export async function getFromTableById(tableName: string, id: any): Promise<any | undefined> {
  return (await db(tableName).select().where('id', id))[0]
}
