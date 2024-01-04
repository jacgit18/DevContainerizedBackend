// import { generatedUUID } from "./20240104214234_update-app-user-table";

// const adminUser = [
//     {
//       id: generatedUUID,
//     }
//   ]




/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    const firstAppUserId = await knex.select('id').from('appuser').first();

    // Insert the first appuser_id into app_admin
    return knex('app_admin').insert([
        {
            appuser_id: firstAppUserId.id,
            // other fields for 'app_admin' table
        }
    ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex('app_admin').delete()
}

