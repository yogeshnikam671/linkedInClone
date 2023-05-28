import { IdTokenResult, createUserWithEmailAndPassword } from "firebase/auth"
import { SignInCreds } from "./login"
import { fireAuth } from "../config"

export const signUp = async (creds: SignInCreds) : Promise<IdTokenResult | null> => {
  if(creds.email === '' || creds.password === '') return null;
  try {
    const response = await createUserWithEmailAndPassword(fireAuth, creds.email, creds.password);
    return response.user.getIdTokenResult();
  } catch(e) {
    return null;
  }
}
