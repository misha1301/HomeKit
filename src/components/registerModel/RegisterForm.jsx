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

const REGISTER_URL = "/register";

const RegisterForm = () => {
  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const userRef = useRef();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: username, password: password }),
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

      setAuth({ username, status, accessToken });

      setSuccess(true);
      showSucsessMsg("Ви успішно зареєструвались");

      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }, 1000);

      setUserName("");
      setPassword("");
      //navigate(from, {replace: true});
    } catch (err) {
      if (!err?.response) {
        showErrMsg("Немає відповіді від серверу");
      } else if (err.response?.status == 400) {
        showWarningMsg("Ви ввели некоректні дані");
      } else if (err.response?.status == 409) {
        showWarningMsg("Такий користувач вже зареєстрований");
      } else {
        showErrMsg("Виникла невідома помилка");
      }
    }
  };

  const handleToLogin = () => {
    navigate("/login", { state: { from: location.pathname }, replace: true });
  };

  return (
    <Model onSubmit={handleSubmit}>
      <ModelHeader>Зареєструватися</ModelHeader>
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
          placeholder="Ваш пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </ModelContent>
      <ModelFooter>
        <input type="button" value="Увійти" onClick={handleToLogin} />
        <VerticalLine />
        <input type="submit" value="Зареєструватись" />
      </ModelFooter>
    </Model>
  );
};

export default RegisterForm;
