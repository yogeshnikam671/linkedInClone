import { useEffect, useState } from "react";
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

type InputValidatorsKeyType = 'username | password | name | bio | profileImageSrc';

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

const isUsernameValid = (username: string): boolean => {
  const matchResult = String(username)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return matchResult !== null;
}

const isNonEmpty = (s: string) : boolean => !!s

const inputValidators = {
  username: isUsernameValid,
  password: isNonEmpty,
  name: isNonEmpty,
  bio: isNonEmpty,
  profileImageSrc: isNonEmpty
}

const isValidInputInitialState = {
  username: false,
  password: false,
  name: false,
  bio: false,
  profileImageSrc: false 
}

const Auth = () => {
  
  const dispatch = useDispatch();
  const storeAuthToken = (authToken:(IdTokenResult | null | undefined)) => dispatch(storeLoginDetails(authToken));

  const [authToken, setAuthToken] = useState(useSelector((state: any) => state.auth?.authToken));
  const [isLoginView, setIsLoginView] = useState(true);
  const [isValidInput, setIsValidInput] = useState(isValidInputInitialState);
  const [isFirstRender, setIsFirstRender] = useState(true);

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
      emailId
    });
    authenticateWith({email: emailId, password});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if(isLoginView) onLogin(formData);
    else onSignUp(formData);
  }

  const resetView = () => {
    setIsValidInput(isValidInputInitialState);
    setAuthToken(undefined);
    setIsFirstRender(true);
  }

  // we just have to update the inputId according to our needs e.g. inputId: 'username' | 'password'
  const onInputChange = (e: any, inputId: 'username') => {
    if(inputValidators[inputId]) {
      setIsValidInput({
        ...isValidInput,
        [inputId]: inputValidators[inputId](e.target.value)
      }) 
    }
    setAuthToken(undefined);
    setIsFirstRender(false);
  }
  
  const onRegisterNow = () => {
    setIsLoginView(false);
    resetView();
  }

  const onAlreadyHaveAnAccount = () => {
    setIsLoginView(true);
    resetView();
  }

  const shouldDisableSubmitButton = () => {
    if(isFirstRender) return false;
    if(isLoginView) {
      return !isValidInput.username || !isValidInput.password;
    }
    return Object.keys(isValidInput).some(key => isValidInput[key] === false);
  }

  const getTryAgainMessage = () => {
    return isLoginView ? 'Invalid credentials, Try again.' : 'Please enter valid details.'
  }

  const render = () => {
    const renderInput = (inputProps: LoginInputPropsType, index: number) => {
      let validityStyle = '';
      if(isValidInput[inputProps.id] === false && !isFirstRender) validityStyle = 'border-red-500';
      return (
        <div className={`${loginDivCommonStyles} ${validityStyle}`} key={`login-input-${index}`}>
          <input
            {...inputProps}
            onChange={(e) => onInputChange(e, inputProps.id)}
            className={`outline-none border-none p-1 w-full h-full rounded-[5px]`}
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
            className={`${loginDivCommonStyles} flex justify-center py-1 bg-[#0074b1] text-white border-none disabled:bg-gray-400`}
            type="submit"
            disabled={shouldDisableSubmitButton()}
          >
            <p className="pt-2">
              { isLoginView ? "Sign in" : "Sign up" }
            </p>
          </button>
        </form>
        <div className="text-center mt-1 mb-2 text-sm text-red-600 h-2">
          {authToken === null ? getTryAgainMessage() : ''}
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

export default Auth;
