

const postTypes = [
  { name: "Photo", icon: "/create_post_icons/photo.svg", alt: "create_photo" },
  { name: "Video", icon: "/create_post_icons/video.svg", alt: "create_video" },
  { name: "Event", icon: "/create_post_icons/event.svg", alt: "create_event" },
  { name: "Write article", icon: "/create_post_icons/article.svg", alt: "create_article" }
];

const Feed = () => {	

  const renderPostTypes = () => {
    return postTypes.map((postType, index) => {
      return (
        <div className="flex items-center" key={`post-type-${index}`}>
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

  const createPost = () => {
    return (
      <div
        className="flex flex-col h-full border border-gray-300 rounded-2xl p-5"
      >
        <div
          className="flex flex-row items-center h-1/4 w-full pb-4"
        >
          <img
            src="/yogesh_profile_sidebar.jpeg"
            alt="sidebar_profile_pic"
            className="rounded-full mr-3 h-12"
          />
          <div
            className="border border-gray-400 p-3 rounded-full w-full" 
          >
            <input
              type="text"
              aria-label="Start a post"
              placeholder="Start a post"
              className="placeholder:font-bold placeholder:text-gray-500 placeholder:text-sm w-full"
            />
          </div>
        </div>
        <div
          className="flex flex-row justify-between text-gray-500 font-bold text-sm px-6"
        >
          { renderPostTypes() }
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-fit w-full flex-[0.5]"
    >
      {createPost()}
      {/* POSTS */}
    </div>
  );
};

export default Feed;
