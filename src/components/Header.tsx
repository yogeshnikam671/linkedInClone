import ProfileHeaderOption, { ProfileHeaderOptionProps } from "./ProfileHeaderOption";

const profileHeaderOptions = [
  { id: "1", iconsrc: "/home_icon.svg", iconalt: "home" },
  { id: "2", iconsrc: "/msg_icon.svg", iconalt: "message" }
];

const Header = () => {
  
  const renderSearchBar = () => {
    return (
      <div
        id="search_bar"
        className="w-fit h-fit flex flex-row justify-around bg-stone-200 p-2 rounded"
      >
        <img
          src="/search_icon.svg"
          className="h-5 self-center pr-2"
        />
        <input
          type="text"
          className="outline-none text-black bg-stone-200 h-full"
        />
      </div>
    );
  }

  const renderProfileHeaderOptions = () => {
    return profileHeaderOptions.map((option: ProfileHeaderOptionProps, index: number) => 
      <ProfileHeaderOption {...option} key={index} />
    );
  }

  return (
    <div 
      id="header"
      className="py-1 px-5 border-gray-400 border-2 w-screen flex flex-row justify-between h-12"
    >
      <div 
        id="search_header"
        className="flex flex-row justify-normal w-fit"
      >
        <img 
          src="/linkedin_icon.svg" 
          alt="linked-in"
          className="pr-5"
        />
        { renderSearchBar() }
      </div>

      <div 
        id="profile_header"
        className="w-fit flex flex-row"
      >
        {renderProfileHeaderOptions()} 
      </div>
    </div>
  );
};

export default Header;
