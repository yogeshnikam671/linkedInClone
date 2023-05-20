import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts/fetchPosts";
import CreatePost from "./CreatePost";
import Post, { PostPropsType } from "./Post";

const Feed = () => {
  
  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);
  const [isNewPostCreated, setIsNewPostCreated] = useState<boolean>(false);
  
  const fetchAllPosts = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  }
  
  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if(isNewPostCreated) {
      fetchAllPosts();
      setIsNewPostCreated(false);
    }
  }, [isNewPostCreated]);

  const renderPosts = () => {
    if(!posts) return [];
    return posts.map((post, index) => <Post {...post} key={`post-${index}`}/>);
  }

  return posts && (
    <div
      className="h-fit w-full flex-[0.5]"
    >
      <CreatePost
        setIsNewPostCreated={setIsNewPostCreated} />
      <div className="mt-10">
        {renderPosts()}
      </div>
    </div>
  );
};

export default Feed;
