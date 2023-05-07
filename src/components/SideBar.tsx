import ProfileStats from "./ProfileStats";

const sideBarItemsStyle = "h-fit border-gray-300 border rounded-xl";

const SideBar = () => {
  
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
          src="/yogesh_profile_sidebar.jpeg" 
          alt="sidebar_profile_pic" 
          className="rounded-full mb-2"
        />
        <div className="text-md font-semibold underline">
          Yogesh Nikam
        </div>
        <div className="text-sm text-gray-600">
          Full Stack Application Developer
        </div>
      </div>
    </>);
  }

  const sideBarProfile = () => {
    return (
      <div className={`${sideBarItemsStyle} flex flex-col`}>
        {renderProfileDetails()}
        <ProfileStats className="border-b-gray-200 border-b p-2"/>
        <div
          className="p-4 py-3 h-1/3 flex items-center"
        >
          <img src="/my_items_icon.svg" alt="my items" className="h-5 pr-3"/>
          <div className="text-sm font-bold text-gray-800"> 
            My items 
          </div>
        </div>
      </div>
    );
  };

  // const sideBarContent = () => {
  //   return (
  //     <div className={`${sideBarItemsStyle}`}>
  //       sidebar content
  //     </div>
  //   );
  // };
  
  // TODO - instead of using w-1/6, you can also use flex:0.2 kind of thing.
  // For that to work, the container of this component should be a flex container.
  // Explore this thing once later.
  return(
    <div className="h-fit w-1/6 mt-5 ml-5"> 
      {sideBarProfile()}
      <br/>
      {/*sideBarContent()*/}
    </div>
  );
};

export default SideBar;
