import { JwtUserInfo } from "./jwtUtil.js"
import { companyAccess, userIsTfAdmin } from "./util.js"



//if you are part of this company and not crew == true
async function getCompanyUsers(userInfo: JwtUserInfo, company_id: string): Promise<boolean> {
  if (await userIsTfAdmin(userInfo.id)) {
    return true
  }
  // otherwise we ensure they have access to company
  const companyPermission = await companyAccess(userInfo.id, company_id)
  return companyPermission.length > 0
}

async function isAllowedToCreateUser(userInfo: JwtUserInfo, company_id: string): Promise<boolean> {
  if (await userIsTfAdmin(userInfo.id)) {
    return true
  }
  // otherwise we ensure they are a company admin
  const companyPermission = await companyAccess(userInfo.id, company_id)
  return ((companyPermission.length > 0) && (companyPermission[0].company_user_role === 'admin'))
}




export default {
  getCompanyUsers,
  isAllowedToCreateUser,
}
