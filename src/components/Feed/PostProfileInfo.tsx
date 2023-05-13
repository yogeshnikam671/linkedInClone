
export interface PostProfileInfoPropsType {
 imgSrc: string,
 name: string,
 description: string
}

const PostProfileInfo = ({
 imgSrc,
 name,
 description
}: PostProfileInfoPropsType) => {
  return (
    <div
      className="flex pb-3"
    >
      <img
          src={imgSrc}
          alt="sidebar_profile_pic"
          className="rounded-full mr-3 h-12"
        />
      <div>
        <p className="font-bold text-md">{name}</p>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
}

export default PostProfileInfo;
