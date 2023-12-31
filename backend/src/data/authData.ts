import { db } from "./db.js";

export interface LoginCreds {
  email: string;
  password: string;
}

async function validateUserCredentials(userCreds: LoginCreds): Promise<any> {
  console.log(userCreds)
  try {
    const result = await db("testuser")
      .select()
      .where({
        email: userCreds.email,
        password: userCreds.password, // This assumes the password is stored as plain text (not recommended)
      });

    return result;
  } catch (error) {
    throw new Error(`Error validating user credentials: ${error}`);
  }
}

export default { validateUserCredentials };
