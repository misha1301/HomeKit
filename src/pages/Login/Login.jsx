import React from "react";

import LoginForm from "../../components/loginModel/LoginForm";

const Login = () => {

  const handleSubmit = () =>{
    console.log("sending login form");
  }  

  return (
     <LoginForm/>
  );
};

export default Login;
