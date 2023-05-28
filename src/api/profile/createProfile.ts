import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../config";
import { UserProfile } from "./fetchProfile";

const usersColl = collection(fireDb, 'users');

export const createProfile = async (userProfile: UserProfile) => {
  // @ts-ignore
  if(Object.keys(userProfile).some(key => userProfile[key] === '')) return null;
  await addDoc(usersColl, userProfile);
}
