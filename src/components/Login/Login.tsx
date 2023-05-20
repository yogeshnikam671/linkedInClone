
interface LoginInputPropsType {
  type: string,
  placeholder: string
}

const loginDivCommonStyles = "h-1/5 w-full border border-black rounded-[5px]";

const loginInputProps: Array<LoginInputPropsType> = [
  { type: "text", placeholder: "Enter username" },
  { type: "password", placeholder: "Enter password" },
]

const Login = () => {
  
  const renderInput = (inputProps: LoginInputPropsType, index: number) => {
    return (
      <div className={loginDivCommonStyles} key={`login-input-${index}`}>
        <input
          {...inputProps} 
          className="outline-none border-none p-1 w-full h-full rounded-[5px]"
        />
      </div>
    );
  }

  return (
    <div className="m-auto h-52 w-1/4 flex flex-col justify-evenly text-lg">
      { loginInputProps.map((props, index) => renderInput(props, index)) }
      <div className={`${loginDivCommonStyles} text-center items-center py-1 bg-[#0074b1] text-white`}>
        Sign in 
      </div>
    </div>
  ); 
}

export default Login;
