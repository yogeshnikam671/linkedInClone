import { UserProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../config";

const usersColl = collection(fireDb, 'users');

// TODO - add error handling.
export const createProfile = async (userProfile: UserProfile) => {
  await addDoc(usersColl, userProfile);
}
