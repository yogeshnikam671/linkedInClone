
export interface ProfileHeaderOptionProps {
  id: string,
  iconsrc: string,
  iconalt: string,
  title: string
}

const ProfileHeaderOption = ({
  id,
  iconsrc,
  iconalt,
  title
}: ProfileHeaderOptionProps) => {
  const profileHeaderOptionId = `profile_header_option_${id}`;
  const profileTitleId = `profile_message_${id}`;
  return (
    <div
      id={profileHeaderOptionId}
      key={id}
      className="flex flex-col justify-between w-fit px-2 text-gray-400 hover:text-black cursor-pointer"
    >
      <img
        src={iconsrc}
        alt={iconalt}
        className="h-3/5 self-center rounded-full"
      />
      <div
        id={profileTitleId}
        key={profileTitleId}
        className="text-sm font-bold"
      >
        {title}
      </div>
    </div>
  );
}

export default ProfileHeaderOption;
