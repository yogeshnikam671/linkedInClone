import SideBarProfile from "./SideBarProfile/SideBarProfile";

const sideBarItemsStyle = "h-fit border-gray-300 border rounded-xl";

const recentTopics = ["programming", "coding", "neovim", "tmuxworkflow", "blazingfast"];

const SideBar = () => {
  
  const renderRecentTopics = () => {
    return recentTopics.map((recentTopic: string, index: number) => {
      return (
        <div 
          className="p-1 text-sm text-gray-500 font-bold cursor-pointer hover:bg-gray-200 hover:text-black" 
          key={index}>
          #&nbsp;&nbsp;{recentTopic}
        </div>
      );
    });
  }

  const sideBarContent = () => {
    return (
      <div className={`${sideBarItemsStyle} pt-2 pb-2`}>
        <div>
          <div className="p-2 text-sm">
            Recent
          </div>
          <div>
            {renderRecentTopics()}
          </div>
        </div>
      </div>
    );
  };
  
  // TODO - instead of using w-1/6, you can also use flex:0.2 kind of thing.
  // For that to work, the container of this component should be a flex container.
  // Explore this thing once later.
  const render = () => {
    return (
      <div className="h-fit flex-[0.2] mr-5">
        <SideBarProfile sideBarItemsStyle={sideBarItemsStyle} />
        <br />
        {sideBarContent()}
      </div>
    );
  }

  return render();
};

export default SideBar;
