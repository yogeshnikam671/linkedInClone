import { useDispatch, useSelector } from "react-redux";
import ProfileHeaderOption, { ProfileHeaderOptionProps } from "./ProfileHeaderOption";
import { IdTokenResult, signOut } from "firebase/auth";
import { storeLoginDetails } from "../../store/actions/auth";
import { fireAuth } from "../../api/config";
import { MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { sessionStorageItem } from "../../constants/sessionStorageItem";
import { UserProfile } from "../../api/profile/fetchProfile";
import { storeUserDetails } from "../../store/actions/user";

const profileHeaderOptions = [
  { id: "1", iconsrc: "/home_icon.svg", iconalt: "home", title: "Home"},
  { id: "2", iconsrc: "/msg_icon.svg", iconalt: "message", title: "Messages" },
  { id: "3", iconsrc: "/notification_icon.svg", iconalt: "notification", title: "Notifications" },
  { id: "4", iconsrc: "/sign_out.svg", iconalt: "sign_out", title: "Sign out"}  
];

const onSignOut = async ({
storeAuthToken, 
storeUserProfile
}: { storeAuthToken: Function, storeUserProfile: Function }) => {
  await signOut(fireAuth);
  sessionStorage.setItem(sessionStorageItem.authToken, '');
  storeAuthToken(undefined);
  storeUserProfile(undefined);
}

const getHiddenValueFor = (
  profileHeaderOption: ProfileHeaderOptionProps,
  authToken: IdTokenResult | null | undefined
): boolean => {
  if(profileHeaderOption.title === "Sign out") return !authToken;
  else return false;
}

const getOnClickHandlerFor = ({
  profileHeaderOption,
  storeAuthToken,
  storeUserProfile
}: { profileHeaderOption: ProfileHeaderOptionProps, storeAuthToken: Function, storeUserProfile: Function } ): MouseEventHandler<any> => {
  if(profileHeaderOption.title === "Sign out") return () => onSignOut({storeAuthToken, storeUserProfile});
  return () => {};
}

const Header = () => {
  const dispatch = useDispatch();
  const storeAuthToken = (authToken: (IdTokenResult | null | undefined)) => dispatch(storeLoginDetails(authToken));
  const storeUserProfile = (user: UserProfile) => dispatch(storeUserDetails(user));

  const authToken = useSelector((state: any) => state.auth?.authToken);
  const userProfile: UserProfile = useSelector((state: any) => state.user?.profile);
  
  const [headerOptions, setHeaderOptions] = useState([]);

  useEffect(() => {
    if (userProfile) {
      const userProfileHeaderOption = {
        id: `${profileHeaderOptions.length + 1}`,
        iconsrc: userProfile.profileImageSrc,
        iconalt: userProfile.name,
        title: userProfile.name.split(' ')[0]
      }
      const options = [...profileHeaderOptions];
      options.splice(3, 0, userProfileHeaderOption);
      setHeaderOptions([...options] as SetStateAction<any>);
    }
    else if(!authToken) {
      setHeaderOptions([...profileHeaderOptions] as SetStateAction<any>);
    }
  }, [userProfile]);
  

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
    return headerOptions.map((option: ProfileHeaderOptionProps, index: number) => {
      const updatedOption = {
        ...option,
        hidden: getHiddenValueFor(option, authToken),
        onClick: getOnClickHandlerFor({ profileHeaderOption: option, storeAuthToken, storeUserProfile })
      }
      return <ProfileHeaderOption {...updatedOption} key={index} />
    });
  }
  
  // To stick the header to the top and allow scrolling of the app body without moving the header,
  // we make the header position sticky and top as 0
  return !(headerOptions.length) ? null :(
    <div 
      id="header"
      className="py-1 px-5 border-b-gray-300 border w-screen flex flex-row justify-around h-12 sticky top-0 z-50 bg-white"
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
