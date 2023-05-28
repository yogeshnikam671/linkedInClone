import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../config";
import { UserProfile } from "./fetchProfile";

const usersColl = collection(fireDb, 'users');

// TODO - add error handling.
export const createProfile = async (userProfile: UserProfile) => {
  if(Object.keys(userProfile).some(key => userProfile[key] === '')) return null;
  await addDoc(usersColl, userProfile);
}
