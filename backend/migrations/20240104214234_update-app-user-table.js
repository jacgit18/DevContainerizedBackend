const User = [
    {
      email: 'joshuaxcarpentier@gmail.com',
      first_name: 'joshua',
      last_name: 'car',
      password: 'abc123', // plain text 
      date_created: new Date(),
      date_modified: new Date()
    }
  ]




/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex('appuser').insert(User)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex('appuser').delete()
}

