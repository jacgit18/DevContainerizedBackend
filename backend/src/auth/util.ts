import { db } from "../data/db.js"


export interface AccessInfo {
  isAdmin: boolean,
  accessIds: string[]
}
export interface AdminAccess {
  id: string,
  is_admin: boolean,
}

export function adminAccess(userId: string): Promise<AdminAccess[]> {
  return db('tf_admin')
    .select(db.raw('tf_admin.tfuser_id AS id, TRUE AS is_admin'))
    .where('tf_admin.tfuser_id', userId)
    .andWhere(db.raw('tf_admin.deleted_at IS NULL'))
}

export async function userIsTfAdmin(user_id: string): Promise<boolean> {
  const adminStatus = await adminAccess(user_id)
  return !! adminStatus[0]?.is_admin
}

type CompanyUserRole = 'admin' | 'super' | 'crew'

type CompanyType = 'cm' | 'trade' | 'owner'

export interface CompanyAccess {
  id: string,
  company_id: string,
  company_type: CompanyType,
  company_user_role: CompanyUserRole,
}

export async function companyAccess(userId: string, companyId?: string): Promise<CompanyAccess[]> {
  const queryOutput: any = await db.raw(`
      SELECT
        u.id,
        cu.company_id,
        c.company_type,
        cur.code AS company_user_role
      FROM tfuser u
      INNER JOIN company_user cu ON cu.tfuser_id = u.id
      INNER JOIN company_user_role cur ON cur.id = cu.company_user_role_id
      INNER JOIN company c ON c.id = cu.company_id
      WHERE u.id = ?
        AND cu.deleted_at IS NULL
        ${companyId === undefined? '' : `AND cu.company_id = ?`}
      ;
    `,
    companyId === undefined? [userId] : [userId, companyId]
  )
  return queryOutput.rows
}
