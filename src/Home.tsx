import './App.css'
import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import SideBar from './components/SideBar/SideBar'
import { useSelector } from 'react-redux'

const Home = () => {
  const authToken = useSelector((state: any) => state.auth?.authToken);

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
          {authToken ? renderLoggedInSession() : renderLogin()}
        </div>
      </>
    )
  }

  return render();  
}

export default Home; 
