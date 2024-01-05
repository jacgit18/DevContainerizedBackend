/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('performance_monitoring', function (table) {
      table.uuid('id').primary().defaultTo(knex.raw('(GEN_RANDOM_UUID())'))
      table.integer('res_time_in_ms').notNullable()
      table.enum('http_method', ['get', 'put', 'post', 'delete', 'patch']).notNullable()
      table.timestamp('started_at').notNullable()
      table.text('url').notNullable()
      table.text('route')
      table.json('query_params')
      table.json('body')
      table.uuid('appuser_id')
      table.uuid('company_id')
      table.text('ip')
      table.smallint('res_status')
      table.boolean('for_alerts').notNullable().defaultTo(false)
      table.text('for_alerts_message')
      table.text('error_text')
    })
  }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('performance_monitoring')
  }
  