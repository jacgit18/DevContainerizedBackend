import { db } from "./db.js"

// We're not using filters and query params - no reason for it at the moment.
async function getCompanyUsers(company_id: string): Promise<any[]> {
  return db('tfuser AS u')
      .select('u.id', 'u.first_name', 'u.last_name', 'u.email', 'u.phone', 'cur.code AS company_user_role_code')
      .innerJoin('company_user AS cu', 'u.id', '=', 'cu.tfuser_id')
      .innerJoin('company_user_role AS cur', 'cu.company_user_role_id', '=', 'cur.id')
      .where('cu.company_id', company_id)
      .orderBy('cu.company_user_role_id')
}

async function createUser(userObject: any): Promise<any> {
  const createdUsers = await db.raw(`
      INSERT INTO tfuser (email, password, first_name, last_name, phone, avatar_url, date_created, date_modified)
      VALUES (
        :email,
        crypt(:password, gen_salt('md5')),
        :first_name,
        :last_name,
        :phone,
        :avatar_url,
        :date_created,
        :date_modified
      )
      RETURNING *
      ;
    `,
    userObject
  )
  return createdUsers.rows[0]
}

async function createUserCompanyConnection(companyUser: any): Promise<any> {
  const createdUserCompanyConnection = await db('company_user').insert(companyUser)
  return createdUserCompanyConnection[0]
}

async function getUserByEmail(email: string): Promise<any> {
  const users = await db('tfuser').select('*').where('email', email)
  return users[0]
}

async function updatePassword(email: string, newPassword: string): Promise<void> {
  await db.raw(`
      UPDATE tfuser
      SET password = crypt(:newPassword, gen_salt('md5'))
      WHERE email = :email
      ;
    `,
    { email, newPassword }
  )
}





export default {
  createUser,
  getUserByEmail,
  updatePassword,
  getCompanyUsers,
  createUserCompanyConnection,
}
