import { JwtUserInfo } from "./jwtUtil.js"
import { adminAccess, companyAccess, userIsTfAdmin } from "./util.js"


async function createMaterials(userInfo: JwtUserInfo, companyId: string): Promise<boolean> {
  // check for admin access
  const adminStatus = await adminAccess(userInfo.id)
  if (adminStatus[0]?.is_admin === true) {
    return true
  }
  const companyPermission = await companyAccess(userInfo.id, companyId)
  return companyPermission.length > 0 && companyPermission[0].company_user_role !== 'crew'
}

async function getMaterials(userInfo: JwtUserInfo, companyId: string): Promise<boolean> {
  // check for admin access
  const adminStatus = await adminAccess(userInfo.id)
  if (adminStatus[0]?.is_admin === true) {
    return true
  }
  const companyStatus = await companyAccess(userInfo.id, companyId)
  return companyStatus?.length > 0
}

async function isAllowedToUpdateMaterial(user_id: string, company_id: string): Promise<boolean> {
  if (await userIsTfAdmin(user_id)) {
    return true
  }
  const companyPermission = (await companyAccess(user_id, company_id))[0]
  return !!companyPermission && (companyPermission.company_user_role === 'admin' || companyPermission.company_user_role === 'super')
}

export default {
  createMaterials,
  getMaterials,
  isAllowedToUpdateMaterial
}


