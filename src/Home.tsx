import { useEffect, useState } from 'react'
import './App.css'
import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import SideBar from './components/SideBar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { sessionStorageItem } from './constants/sessionStorageItem'
import { IdTokenResult } from 'firebase/auth'
import { storeLoginDetails } from './store/actions/auth'
import { UserProfile, fetchProfile } from './api/profile/fetchProfile'
import { storeUserDetails } from './store/actions/user'

const Home = () => {

  const dispatch = useDispatch();
  const storeAuthToken = (authToken:(IdTokenResult | null | undefined)) => dispatch(storeLoginDetails(authToken));
  const storeUserProfile = (user: UserProfile) => dispatch(storeUserDetails(user));

  const authTokenFromStore = useSelector((state: any) => state.auth?.authToken);
  
  const [authToken, setAuthToken] = useState<IdTokenResult | null | undefined>();

  const expireUserSession = () => {
    storeAuthToken(undefined);
    setAuthToken(null);
  }

  const handleUserAuthSession = () => {
    if (authTokenFromStore) {
      setAuthToken(authTokenFromStore);
      return;
    }
    const sessionStorageTokenString = sessionStorage.getItem(sessionStorageItem.authToken);
    if (!sessionStorageTokenString) {
      expireUserSession();
      return;
    }
    const loginToken = JSON.parse(sessionStorageTokenString);
    const isTokenExpired = new Date() > new Date(loginToken.expirationTime);
    if (isTokenExpired) {
      expireUserSession();
    }
    else {
      storeAuthToken(loginToken);
      setAuthToken(loginToken);
    }
  }

  const fetchUserProfile = async (email: string) => {
      const user = await fetchProfile(email);
      if(user === null) expireUserSession();
      storeUserProfile(user as UserProfile);
  }

  useEffect(() => {
    handleUserAuthSession();    
  }, [authTokenFromStore]);

  useEffect(() => {
    if(authToken) {
      fetchUserProfile(authToken.claims.email);
    }
  }, [authToken])

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
