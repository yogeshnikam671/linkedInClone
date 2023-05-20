import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDb } from "../config";
import { PostPropsType } from "../../components/Feed/Post";

export const createPost = async (data: PostPropsType) => {
  const coll = collection(fireDb, 'posts');
  const dataWithTimeStamp = {
    ...data,
    timestamp: Timestamp.now().toDate()
  };
  await addDoc(coll, dataWithTimeStamp);
  return;
};
