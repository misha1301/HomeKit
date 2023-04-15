import React from "react";
import { Link, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import { showErrMsg } from '../../msgpopup/ShowPopup';

import Model from "../customModel/Model";
import ModelHeader from "../customModel/ModelHeader";
import ModelContent from "../customModel/ModelContent";
import ModelFooter from "../customModel/ModelFooter";
import VerticalLine from "../customModel/VerticalLine";

const RegisterForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    showErrMsg("невдалося зареєструвватись");
    console.log("sending register form");
  }  

  const handleToLogin = (e) => {
    navigate('/login', { state: { from: location.pathname }, replace: true });
  }
  return (
    <Model onSubmit={handleSubmit}>
      <ModelHeader>
        Зареєструватися
      </ModelHeader>
      <ModelContent>
      <input type="text" placeholder="Ваше ім'я"/>
      <input type="password" placeholder="Ваш пароль"/>
      </ModelContent>
      <ModelFooter>
        <input type="button" value="Увійти" onClick={ handleToLogin}/>
        <VerticalLine/>
        <input type="submit" value="Зареєструватись"/>
      </ModelFooter>
    </Model>
  );
};

export default RegisterForm;
