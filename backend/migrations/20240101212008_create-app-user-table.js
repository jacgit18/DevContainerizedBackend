
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('appuser', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(GEN_RANDOM_UUID())'))
        table.boolean('is_active').notNullable().defaultTo(true)
        table.text('email').notNullable().unique()
        table.index(['email'])
        table.text('first_name').notNullable()
        table.text('last_name').notNullable()
        table.text('phone')
        table.text('avatar_url')
        table.text('password').notNullable()
        table.timestamp('date_created').notNullable()
        table.timestamp('date_modified').notNullable()
    })
  };
  
  /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
  export const down = function(knex) {
    return knex.schema.dropTable('appuser')
  };