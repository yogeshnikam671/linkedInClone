
interface LoginInputPropsType {
  type: string,
  placeholder: string
}

const loginDivCommonStyles = "h-1/6 w-full border border-black rounded-[5px] mt-2";

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
    <div className="m-auto h-72 w-1/4 flex flex-col justify-evenly text-lg">
      <img
        src="/linked_in_login_image.png"
        alt="linked_in_login_image"
        className="mb-3"
      />
      { loginInputProps.map((props, index) => renderInput(props, index)) }
      <div className={`${loginDivCommonStyles} flex justify-center py-1 bg-[#0074b1] text-white`}>
        <p className="pt-1">
          Sign in
        </p>
      </div>
    </div>
  ); 
}

export default Login;
