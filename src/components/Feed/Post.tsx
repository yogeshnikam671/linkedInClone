import PostProfileInfo from "./PostProfileInfo";

export interface PostPropsType {
 imgSrc: string,
 name: string,
 description: string,
 content: string
}

const Post = ({
  imgSrc,
  name,
  description,
  content
}: PostPropsType) => {

  return (
    <div
      className="h-fit w-full border border-gray-300 rounded-xl p-3"
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
    </div>
  );
}

export default Post;
