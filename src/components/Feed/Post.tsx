import PostProfileInfo from "./PostProfileInfo";

export interface PostPropsType {
 imgSrc: string,
 name: string,
 description: string,
 content: string
}

const postActions = ['like', 'comment', 'repost', 'send'];

const capitalize = (s : string) : string => s[0].toUpperCase() + s.slice(1)

const Post = ({
  imgSrc,
  name,
  description,
  content
}: PostPropsType) => {
  
  const renderPostActions = () => {
    return postActions.map((action, index) => (
      <div className="flex cursor-pointer px-6 py-2 rounded-md hover:bg-gray-100">
        <img
          src={`/post_icons/${action}.svg`}
          alt={`post-action-${action}`}
          key={`post-action-${index}`}
          className="h-6 mr-2"
        />
        <p>
          {capitalize(action)} 
        </p>
      </div>
    ))
  }

  return (
    <div
      className="h-fit w-full border border-gray-300 rounded-xl p-3 mb-5"
    >
      <PostProfileInfo 
        imgSrc={imgSrc}
        name={name}
        description={description}
      />
      <div>
        <p>
          {content}
        </p>
      </div>
      <div className="flex justify-between px-10 mt-2 pt-4 border-t-2">
        {renderPostActions()} 
      </div>
    </div>
  );
}

export default Post;
