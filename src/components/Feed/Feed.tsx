import CreatePost from "./CreatePost";
import Post, { PostPropsType } from "./Post";

const posts : Array<PostPropsType> = [
  {
    imgSrc: "/yogesh_profile_sidebar.jpeg",
    name: "Yogesh Nikam",
    description: "Full Stack Application Developer",
    content: "This is my first post. I have written this to let you know that I have been working at this place for more than 2 years now and it's been an amazing journey. I get to work on lots of tech and get to learn a lot of things. I really enjoy coding and the whole concept of building something with your computer."
  },
  
]

const Feed = () => {
  
  const renderPosts = () => {
    const dummyPost = {
      imgSrc: "/yogesh_profile_sidebar.jpeg",
      name: "Yogesh Nikam",
      description: "Random person",
      content: "This is my post"
    }
    for(let i=0; i<20; i++) posts.push(dummyPost);
    return posts.map(post => <Post {...post}/>)
  }

  return (
    <div
      className="h-fit w-full flex-[0.5]"
    >
      <CreatePost/>
      <div className="mt-10">
        {/*<Post {...post}/>*/}
        {renderPosts()}
      </div>
    </div>
  );
};

export default Feed;
