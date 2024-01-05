import { db } from "./db.js";

export interface LoginCreds {
  email: string;
  password: string;
}

async function validateUserCredentials(userCreds: LoginCreds): Promise<any> {
  try {
    const result = await db("appuser")
      .select() // Specify the columns you need
      .where("email", userCreds.email)
      .andWhere(db.raw("password = crypt(?, password)", [userCreds.password]));

    return result;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error validating user credentials:", error);
    throw error;
  }
}

export default { validateUserCredentials };
