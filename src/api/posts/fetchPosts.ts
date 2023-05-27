import { DocumentData, QuerySnapshot, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDb } from "../config";
import { PostPropsType } from "../../components/Feed/Post";

const postsColl = collection(fireDb, 'posts');

// Fetches only once when called.
export const fetchPosts = async () => {
  const q = query(postsColl, orderBy('timestamp', 'desc'));
  const querySnapShot = await getDocs(q);
  const posts: Array<DocumentData> = [];
  querySnapShot.forEach(doc => posts.push(doc.data()));
  return posts as Array<PostPropsType>;
}

// Fetches every time when there is some change in the data that we are querying.
export const fetchPostsOnChange = async (setPosts: Function) => {
  const q = query(postsColl, orderBy('timestamp', 'desc'));
  const onChange = (snapshot: QuerySnapshot<DocumentData>) => {
    const posts: Array<DocumentData> = [];
    snapshot.forEach(doc => posts.push(doc.data()));

    setPosts(posts as Array<PostPropsType>);
  }
  onSnapshot(q, onChange)
}
