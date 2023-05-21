import { IdTokenResult, signInWithEmailAndPassword } from "firebase/auth"
import { fireAuth } from "../config"

export interface SignInCreds {
  email: string,
  password: string
}

export const login = async (creds: SignInCreds): Promise<IdTokenResult | null> => {
  try {
    const auth = await signInWithEmailAndPassword(fireAuth, creds.email, creds.password);
    const token = await auth.user.getIdTokenResult();
    return token;
  } catch(e) {
    return null;
  }
}
