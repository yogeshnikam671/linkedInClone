import { useSelector } from "react-redux";
import { UserProfile } from "../../../api/profile/fetchProfile";
import ProfileStats from "./ProfileStats";


interface SideBarProfileProps {
  sideBarItemsStyle: string
};

const SideBarProfile = ({
  sideBarItemsStyle
}: SideBarProfileProps) => {

  const userProfile: UserProfile = useSelector((state: any) => state.user?.profile);

  const render = () => {
    const renderProfileDetails = () => {
      return (<>
        <img
          src="/profile_bg.jpeg"
          alt="sidebar_profile_bg"
          className="-mb-20 object-cover h-32 rounded-tl-xl rounded-tr-xl"
        />
        <div
          className="border-b-gray-200 border-b p-4 flex flex-col items-center"
        >

          <img
            src={userProfile.profileImageSrc}
            alt="sidebar_profile_pic"
            className="rounded-full mb-2"
          />
          <div className="text-md font-semibold hover:underline cursor-pointer text-center">
            {userProfile.name}
          </div>
          <div className="text-sm text-gray-600 text-center">
            {userProfile.bio}
          </div>
        </div>
      </>);
    }
    return (
      <div className={`${sideBarItemsStyle} flex flex-col`}>
        {renderProfileDetails()}
        <ProfileStats className="border-b-gray-200 border-b" />
        <div
          className="p-4 py-3 h-1/3 flex items-center cursor-pointer hover:bg-gray-200"
        >
          <img src="/my_items_icon.svg" alt="my items" className="h-5 pr-3" />
          <div className="text-sm font-bold text-gray-800">
            My items
          </div>
        </div>
      </div>
    );
  };

  return render();
};

export default SideBarProfile;
