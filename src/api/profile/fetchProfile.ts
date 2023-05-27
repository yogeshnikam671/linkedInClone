import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDb } from "../config";

export interface UserProfile {
  name: string,
  bio: string,
  emailId: string,
  profileImageSrc: string
}

const usersColl = collection(fireDb, 'users');

export const fetchProfile = async (emailId: string): Promise<UserProfile | null> => {
  try {
    const q = query(usersColl, where("emailId", "==", emailId));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) throw Error("User not found");
    
    const user: Array<UserProfile> = [];
    querySnapshot.forEach(doc => user.push(doc.data() as UserProfile));
    if(user.length > 1) throw Error("Invalid User");
    return user[0];
  } catch(e) {
    return null;
  }
}
