/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("material_type", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("(GEN_RANDOM_UUID())"))
      table.text('old_id')
      table.uuid('appuser_id').notNullable().unique()
      table.foreign('appuser_id').references('appuser.id')
      table.index(["appuser_id"])
      table.boolean("is_active").notNullable().defaultTo(true)
      table.decimal("conversion")
      table.text("cost_code")
      table.text("field_name")
      table.text("name").notNullable()
      table.text("notes")
      table.decimal("rate", null)
      table.text("size")
      table.text("unit").notNullable()
      table.uuid("created_by").notNullable()
      table.foreign("created_by").references("appuser.id")
      table.timestamp("date_created").notNullable()
      table.timestamp("date_modified").notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable("material_type")
  }