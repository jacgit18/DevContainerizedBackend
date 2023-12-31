import { db } from "./db.js";

export interface LoginCreds {
  email: string,
  password: string,
}

async function validateUserCredentials(userCreds: LoginCreds): Promise<any> {
  console.log(userCreds);
  return db("tfuser")
    .select()
    .where("email", userCreds.email)
    .andWhere(db.raw("password = crypt(?, password)", [userCreds.password]))
    ;
}


export default {validateUserCredentials}
