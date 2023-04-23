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

  const [username, setUserName] = useState("");
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
        JSON.stringify({ username: username, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, roles, accessToken });

      setSuccess(true);
      setUserName("");
      navigate("/main", {
        state: { from: location.pathname },
        replace: true,
      });
      setPwd("");

      //navigate(from, {replace: true});
    } catch (err) {
      if (!err?.response) {
        showErrMsg("Немає відповіді від серверу");
      } else if (err.response?.status == 400) {
        showWarningMsg("Неправильний e-mail, або пароль");
      } else if (err.response?.status == 401) {
        showWarningMsg("Схоже, що ви ще не зареєстровані");
      } else {
        showErrMsg("Виникла невідома помилка");
      }
    }
  };

  const handleToRegister = () => {
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
          value={username}
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
