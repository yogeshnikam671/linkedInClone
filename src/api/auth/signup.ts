import { IdTokenResult, createUserWithEmailAndPassword } from "firebase/auth"
import { SignInCreds } from "./login"
import { fireAuth } from "../config"

export const signUp = async (creds: SignInCreds) : Promise<IdTokenResult> => {
  const response = await createUserWithEmailAndPassword(fireAuth, creds.email, creds.password);
  return response.user.getIdTokenResult();
}
