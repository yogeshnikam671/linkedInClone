import { useState } from "react";
import { createPost } from "../../api/posts/createPost";
import { UserProfile } from "../../api/profile/fetchProfile";
import { useSelector } from "react-redux";

interface CreatePostProps {
 setIsNewPostCreated: Function
}

const postTypes = [
  { name: "Photo", icon: "/create_post_icons/photo.svg", alt: "create_photo" },
  { name: "Video", icon: "/create_post_icons/video.svg", alt: "create_video" },
  { name: "Event", icon: "/create_post_icons/event.svg", alt: "create_event" },
  { name: "Write article", icon: "/create_post_icons/article.svg", alt: "create_article" }
];

const CreatePost = ({
  setIsNewPostCreated
}: CreatePostProps) => {

  const userProfile: UserProfile = useSelector((state: any) => state.user?.profile);
  const [post, setPost] = useState<string>("");
  
  // @ts-ignore
  const onCreatePostInputKeyDown = async (e) => {
    if (e.code === "Enter") {
      await createPost({
        imgSrc: userProfile.profileImageSrc,
        name: userProfile.name,
        description: userProfile.bio,
        content: post
      });
      setIsNewPostCreated(true);
      setPost("");
    }
  }
  
  // @ts-ignore
  const onCreatePostInputOnChange = (e) => {
    setPost(e.target.value);
  }

  const render = () => {
    const renderPostTypes = () => {
      return postTypes.map((postType, index) => {
        return (
          <div
            className="flex items-center cursor-pointer hover:bg-gray-100 py-4 px-2 rounded-md"
            key={`post-type-${index}`}>
            <img
              src={postType.icon}
              alt={postType.alt}
              className="h-6 mr-2"
            />
            <p>
              {postType.name}
            </p>
          </div>
        );
      })
    }

    const placeholderStyles = "placeholder:font-bold placeholder:text-gray-500 placeholder:text-sm";

    return (
      <div
        className="flex flex-col h-full border border-gray-300 rounded-2xl px-5 py-4"
      >
        <div
          className="flex flex-row items-center h-1/4 w-full pb-4"
        >
          <img
            src={userProfile.profileImageSrc}
            alt="sidebar_profile_pic"
            className="rounded-full mr-3 h-12 w-12"
          />
          <div
            className="border border-gray-400 p-3 rounded-full w-full"
          >
            <input
              type="text"
              aria-label="Start a post"
              placeholder="Start a post"
              className={`${placeholderStyles} w-full focus:placeholder:opacity-0 outline-none`}
              value={post}
              onKeyDown={onCreatePostInputKeyDown}
              onChange={onCreatePostInputOnChange}
            />
          </div>
        </div>
        <div
          className="flex flex-row justify-between text-gray-500 font-bold text-sm px-6"
        >
          {renderPostTypes()}
        </div>
      </div>
    );
  }

  return render();  
};

export default CreatePost;
