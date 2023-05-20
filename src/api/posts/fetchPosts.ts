import { DocumentData, collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireDb } from "../config";
import { PostPropsType } from "../../components/Feed/Post";

const postsColl = collection(fireDb, 'posts');

export const fetchPosts = async () => {
  const q = query(postsColl, orderBy('timestamp', 'desc'));
  const querySnapShot = await getDocs(q);
  const posts: Array<DocumentData> = [];
  querySnapShot.forEach(doc => posts.push(doc.data()));
  return posts as Array<PostPropsType>;
}
