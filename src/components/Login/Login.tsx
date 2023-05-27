import { useState } from "react";
import { SignInCreds, login } from "../../api/auth/login";
import { IdTokenResult } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { storeLoginDetails } from "../../store/actions/auth";
import { sessionStorageItem } from "../../constants/sessionStorageItem";
import { signUp } from "../../api/auth/signup";
import { createProfile } from "../../api/profile/createProfile";

interface LoginInputPropsType {
  type: string,
  placeholder: string,
  id: string,
  name: string,
  key: string
}

const loginDivCommonStyles = "h-14 w-full border border-black rounded-[5px] mt-2";

const loginInputProps: Array<LoginInputPropsType> = [
  { type: "text", placeholder: "Enter email", id: "username", name: "username", key: "username" },
  { type: "password", placeholder: "Enter password", id: "password", name: "password", key: "password" },
]

const signUpInputProps: Array<LoginInputPropsType> = [
  { type: "text", placeholder: "Enter name", id: "name", name: "name", key: "name" },
  { type: "text", placeholder: "Enter bio", id: "bio", name: "bio", key: "bio" },
  { type: "text", placeholder: "Enter profile pic link", id: "profileImageSrc", name: "profileImageSrc", key: "profileImageSrc" },
  ...loginInputProps
]

// TODO - rename this to Auth since this component supports both login and signup.
const Login = () => {
  
  const dispatch = useDispatch();
  const storeAuthToken = (authToken:(IdTokenResult | null | undefined)) => dispatch(storeLoginDetails(authToken));

  const [authToken, setAuthToken] = useState(useSelector((state: any) => state.auth?.authToken));
  const [isLoginView, setIsLoginView] = useState(true);

  const authenticateWith = async (signInCreds: SignInCreds) => {
    const loginToken = isLoginView ? await login(signInCreds) : await signUp(signInCreds);
    setAuthToken(loginToken);
    if(loginToken !== null) {
      sessionStorage.setItem(sessionStorageItem.authToken, JSON.stringify(loginToken));
      storeAuthToken(loginToken);
    }
  }
  const onLogin = (formData : FormData) => {
    const email = formData.get('username') as string || '';
    const password = formData.get('password') as string || '';
    authenticateWith({email,password});
  }

  const onSignUp = async (formData: FormData) => {
    const emailId = formData.get('username') as string || '';
    const password = formData.get('password') as string || '';
    const name = formData.get('name') as string || '';
    const bio = formData.get('bio') as string || '';
    const profileImageSrc = formData.get('profileImageSrc') as string || '';
    await createProfile({
      name,
      bio,
      profileImageSrc,
      emailId,
      password
    });
    authenticateWith({email: emailId, password});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if(isLoginView) onLogin(formData);
    else onSignUp(formData);
  }

  const onInputChange = () => {
    setAuthToken(undefined);
  }
  
  const onRegisterNow = () => {
    setAuthToken(undefined);
    setIsLoginView(false);
  }

  const onAlreadyHaveAnAccount = () => {
    setIsLoginView(true);
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
      <div className="m-auto h-full w-80 flex flex-col justify-evenly text-lg">
        <img
          src="/linked_in_login_image.png"
          alt="linked_in_login_image"
          className="mb-3"
        />
        <form
          className="flex flex-col justify-evenly h-full"
          onSubmit={onSubmit}
        >
          {isLoginView
            ? loginInputProps.map((props, index) => renderInput(props, index))
            : signUpInputProps.map((props, index) => renderInput(props, index))
          }
          <button
            className={`${loginDivCommonStyles} flex justify-center py-1 bg-[#0074b1] text-white border-none`}
            type="submit"
          >
            <p className="pt-2">
              { isLoginView ? "Sign in" : "Sign up" }
            </p>
          </button>
        </form>
        <div className="text-center mt-1 mb-2 text-sm text-red-600 h-2">
          {authToken === null ? 'Invalid credentials, Try again.' : ''}
        </div>
        {isLoginView ?
          <div className="text-center mt-1 text-sm h-2">
            Don't have an account? &nbsp;
            <span
              className="underline text-blue-500 cursor-pointer hover:text-blue-800"
              onClick={onRegisterNow}
            >
              Register now
            </span>
          </div>
          : <div className="text-center mt-1 text-sm h-2">
            Already have an account? &nbsp;
            <span
              className="underline text-blue-500 cursor-pointer hover:text-blue-800"
              onClick={onAlreadyHaveAnAccount}
            >
              Sign in
            </span>
          </div>
        }
      </div>
    );
  }
  
  return render();   
}

export default Login;
