import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts/fetchPosts";
import CreatePost from "./CreatePost";
import Post, { PostPropsType } from "./Post";

const Feed = () => {
  
  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);
  
  const fetchAllPosts = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  }
  
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const renderPosts = () => {
    if(!posts) return [];
    return posts.map(post => <Post {...post}/>);
  }

  return posts && (
    <div
      className="h-fit w-full flex-[0.5]"
    >
      <CreatePost/>
      <div className="mt-10">
        {renderPosts()}
      </div>
    </div>
  );
};

export default Feed;
