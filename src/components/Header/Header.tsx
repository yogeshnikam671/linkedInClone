import ProfileHeaderOption, { ProfileHeaderOptionProps } from "./ProfileHeaderOption";

const profileHeaderOptions = [
  { id: "1", iconsrc: "/home_icon.svg", iconalt: "home", title: "Home"},
  { id: "2", iconsrc: "/msg_icon.svg", iconalt: "message", title: "Messages" },
  { id: "3", iconsrc: "/notification_icon.svg", iconalt: "notification", title: "Notifications" },
  { id: "4", iconsrc: "/yogesh_profile.jpeg", iconalt: "profile_name", title: "Yogesh" }
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
          className="h-4 self-center pr-2"
        />
        <input
          type="text"
          className="outline-none text-black bg-stone-200 h-full w-52"
          placeholder="Search"
        />
      </div>
    );
  }

  const renderProfileHeaderOptions = () => {
    return profileHeaderOptions.map((option: ProfileHeaderOptionProps, index: number) => 
      <ProfileHeaderOption {...option} key={index} />
    );
  }
  
  // To stick the header to the top and allow scrolling of the app body without moving the header,
  // we make the header position sticky and top as 0
  return (
    <div 
      id="header"
      className="py-1 px-5 border-b-gray-300 border w-screen flex flex-row justify-around h-12 sticky top-0 z-50"
    >
      <div 
        id="search_header"
        className="flex flex-row justify-normal w-fit"
      >
        <img 
          src="/linkedin_icon.svg" 
          alt="linked-in"
          className="pr-5 h-9"
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
