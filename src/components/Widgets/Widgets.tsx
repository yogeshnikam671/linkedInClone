
interface WidgetData {
  title: string,
  time: string,
  readers: string
}

const widgetData : Array<WidgetData> = [
  {
    title: 'Greener pastures for agritech start...',
    time: '3d ago',
    readers: '307 readers'
  },
  {
    title: 'State street to hire 5,000',
    time: '3d ago',
    readers: '24,366 readers'
  },
  {
    title: 'What Gen Z wants from an employer',
    time: '2d ago',
    readers: '3,997 readers'
  },
  {
    title: 'Tech talent embraces the gig life',
    time: '4d ago',
    readers: '3,609 readers'
  },
  {
    title: 'Banks see jump in profits',
    time: '2d ago',
    readers: '1,266 readers'
  },
]

const Widgets = () => {
  
  const render = () => {
    const renderWidget = (widget: WidgetData, index: number) => {
      
      let lastWidgetStyle = '';
      if(index === widgetData.length - 1) lastWidgetStyle = 'hover:rounded-b-xl'

      return (
        <div
          key={widget.title}
          className={`flex flex-col py-2 px-2 hover:bg-gray-200 cursor-pointer ${lastWidgetStyle}`}
        >
          <div
            className="flex flex-row text-sm font-semibold" 
          >
            <p className="mr-2 text-[25px] text-gray-600">&#x2022;</p>
            <p>{widget.title}</p>
          </div>
          <div
            className="flex flex-row ml-5 text-xs text-gray-600" 
          >
            <p className="mr-3">{widget.time}</p>
            <p>&#x2022;&nbsp;{widget.readers}</p>
          </div>
        </div>
      );
    };
    return (<>
      <div className="h-fit flex flex-[0.25] flex-col ml-5 border-gray-300 border rounded-xl">
        <h3 className="pt-3 pl-3 pb-1 text-md font-semibold">
          LinkedIn News
        </h3>
        <div className="">
        { widgetData.map((widget, index) => renderWidget(widget, index)) }
        </div>
      </div>
    </>);
  }
  
  return render();
}

export default Widgets;
