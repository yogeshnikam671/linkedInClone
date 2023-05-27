import { useEffect, useState } from 'react'
import './App.css'
import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import SideBar from './components/SideBar/SideBar'
import { useSelector } from 'react-redux'
import { sessionStorageItem } from './constants/sessionStorageItem'
import { IdTokenResult } from 'firebase/auth'

const Home = () => {
  const authTokenFromStore = useSelector((state: any) => state.auth?.authToken);
  
  const [authToken, setAuthToken] = useState<IdTokenResult | null | undefined>();

  useEffect(() => {
    const sessionStorageTokenString = sessionStorage.getItem(sessionStorageItem.authToken);
    if(authTokenFromStore) {
      setAuthToken(authTokenFromStore);
    }
    else if(sessionStorageTokenString) {
      const loginToken = JSON.parse(sessionStorageTokenString);
      const isTokenExpired = new Date() > new Date(loginToken.expirationTime);
      if(isTokenExpired) setAuthToken(null);
      else setAuthToken(loginToken);
    }
  }, [authTokenFromStore]);

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

  return (authToken !== undefined) && render();  
}

export default Home; 
