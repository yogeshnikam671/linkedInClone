import { useState } from "react";
import { SignInCreds, login } from "../../api/auth/login";
import { IdTokenResult } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { storeLoginDetails } from "../../store/actions/auth";
import { sessionStorageItem } from "../../constants/sessionStorageItem";

interface LoginInputPropsType {
  type: string,
  placeholder: string,
  id: string,
  name: string
}

const loginDivCommonStyles = "h-1/4 w-full border border-black rounded-[5px] mt-2";

const loginInputProps: Array<LoginInputPropsType> = [
  { type: "text", placeholder: "Enter username", id: "username", name: "username" },
  { type: "password", placeholder: "Enter password", id: "password", name: "password" },
]

const Login = () => {
  
  const dispatch = useDispatch();
  const storeAuthToken = (authToken:(IdTokenResult | null | undefined)) => dispatch(storeLoginDetails(authToken));

  const [authToken, setAuthToken] = useState(useSelector((state: any) => state.auth?.authToken));

  const loginWith = async (signInCreds: SignInCreds) => {
    const loginToken = await login(signInCreds);
    sessionStorage.setItem(sessionStorageItem.authToken, JSON.stringify(loginToken));
    storeAuthToken(loginToken);
    setAuthToken(loginToken);
  }

  const onLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('username') as string || '';
    const password = formData.get('password') as string || '';
    loginWith({email,password});
  }

  const onInputChange = () => {
    setAuthToken(undefined);
  }

  const render = () => {
    const renderInput = (inputProps: LoginInputPropsType, index: number) => {
      return (
        <div className={loginDivCommonStyles} key={`login-input-${index}`}>
          <input
            {...inputProps}
            onChange={onInputChange}
            className="outline-none border-none p-1 w-full h-full rounded-[5px]"
          />
        </div>
      );
    }

    return (
      <div className="m-auto h-72 w-80 flex flex-col justify-evenly text-lg">
        <img
          src="/linked_in_login_image.png"
          alt="linked_in_login_image"
          className="mb-3"
        />
        <form
          className="flex flex-col justify-evenly h-full"
          onSubmit={onLogin}
        >
          {loginInputProps.map((props, index) => renderInput(props, index))}
          <button
            className={`${loginDivCommonStyles} flex justify-center py-1 bg-[#0074b1] text-white border-none`}
            type="submit"
          >
            <p className="pt-1">
              Sign in
            </p>
          </button>
        </form>
        <div className="text-center mt-1 text-sm text-red-600 h-2">
          {authToken === null ? 'Invalid credentials, Try again.' : ''}
        </div>
      </div>
    );
  }
  
  return render();   
}

export default Login;
