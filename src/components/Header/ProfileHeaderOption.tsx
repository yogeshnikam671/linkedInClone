import { MouseEventHandler } from "react";

export interface ProfileHeaderOptionProps {
  id: string,
  iconsrc: string,
  iconalt: string,
  title: string,
  hidden ?: boolean,
  onClick ?: MouseEventHandler<any>
}

const ProfileHeaderOption = ({
  id,
  iconsrc,
  iconalt,
  title,
  hidden,
  onClick
}: ProfileHeaderOptionProps) => {
  const profileHeaderOptionId = `profile_header_option_${id}`;
  const profileTitleId = `profile_message_${id}`;
  return hidden ? null : (
    <div
      id={profileHeaderOptionId}
      key={id}
      className="flex flex-col justify-between w-fit px-2 text-gray-500 hover:text-black cursor-pointer"
      onClick={onClick}
    >
      <img
        src={iconsrc}
        alt={iconalt}
        className="h-3/5 self-center rounded-full"
      />
      <div
        id={profileTitleId}
        key={profileTitleId}
        className="text-sm"
      >
        {title}
      </div>
    </div>
  );
}

export default ProfileHeaderOption;
