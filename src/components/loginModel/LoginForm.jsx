import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

import {
  showErrMsg,
  showWarningMsg,
  showSucsessMsg,
} from "../../msgpopup/ShowPopup";

import Model from "../customModel/Model";
import ModelHeader from "../customModel/ModelHeader";
import ModelContent from "../customModel/ModelContent";
import ModelFooter from "../customModel/ModelFooter";
import VerticalLine from "../customModel/VerticalLine";

const LOGIN_URL = "/login";

const LoginForm = () => {
  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: userName, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const status = response?.status;

      setAuth({ userName, status, accessToken });

      setSuccess(true);
      setUserName("");
      setPwd("");
      //navigate(from, {replace: true});
    } catch (err) {
      if (!err?.response) {
        showErrMsg("Немає відповіді від серверу");
      } else if (err.response?.status == 400) {
        showErrMsg("Неправильний e-mail, або пароль");
      } else {
        showErrMsg("Помилка входу");
      }
      errRef.current.focus();
    }
  };

  const handleToRegister = (e) => {
    navigate("/register", {
      state: { from: location.pathname },
      replace: true,
    });
  };

  return (
    <Model onSubmit={handleSubmit}>
      <ModelHeader>Вхід в акаунт</ModelHeader>
      <ModelContent>
        <input
          type="text"
          placeholder="Ваше ім'я"
          ref={userRef}
          onChange={(e) => setUserName(e.target.value)}
          value={pwd}
          required
        />
        <input
          type="password"
          placeholder="Ваш ароль"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
      </ModelContent>
      <ModelFooter>
        <input
          type="button"
          value="Зареєструватись"
          onClick={handleToRegister}
        />
        <VerticalLine />
        <input type="submit" value="Увійти" />
      </ModelFooter>
    </Model>
  );
};

export default LoginForm;
