
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('app_admin', function (table) {
      table.increments('id')
      table.uuid('appuser_id').notNullable().unique()
      table.foreign('appuser_id').references('appuser.id')
      table.index(["appuser_id"])
      table.timestamp('deleted_at')
    })
  }
  
  /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
  export const down = function(knex) {
    return knex.schema.dropTable('app_admin')
  }
  