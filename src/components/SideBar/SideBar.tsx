import SideBarProfile from "./SideBarProfile/SideBarProfile";

const sideBarItemsStyle = "h-fit border-gray-300 border rounded-xl";

const SideBar = () => {
  
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
  const render = () => {
    return (
      <div className="h-fit w-1/5 mt-5">
        <SideBarProfile sideBarItemsStyle={sideBarItemsStyle} />
        <br />
        {/*sideBarContent()*/}
      </div>
    );
  }

  return render();
};

export default SideBar;
