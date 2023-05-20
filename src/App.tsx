import './App.css'
import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import SideBar from './components/SideBar/SideBar'

function App() {
  
  const user = undefined;

  const render = () => {
    const renderLoggedInSession = () => {
      return (<>
        <SideBar />
        <Feed />
        {/* <Widgets/> */}
      </>);
    }

    const renderLogin = () => {
      return (<>
        <Login/>
      </>);
    }

    return (
      <>
        <Header />
        <div className="ml-[15%] mr-[15%] flex mt-8">
          {user ? renderLoggedInSession() : renderLogin()}
        </div>
      </>
    )
  }

  return render();  
}

export default App
