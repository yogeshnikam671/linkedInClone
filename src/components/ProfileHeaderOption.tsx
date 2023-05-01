
export interface ProfileHeaderOptionProps {
  id: string,
  iconsrc: string,
  iconalt: string
}

const ProfileHeaderOption = ({
  id,
  iconsrc,
  iconalt
}: ProfileHeaderOptionProps) => {
  const profileHeaderOptionId = `profile_header_option_${id}`;
  return (
    <div
      id={profileHeaderOptionId}
      key={id}
      className="flex flex-row justify-between w-fit px-2"
    >
      <img
        src={iconsrc}
        alt={iconalt}
        className="h-full"
      />
    </div>
  );
}

export default ProfileHeaderOption;
