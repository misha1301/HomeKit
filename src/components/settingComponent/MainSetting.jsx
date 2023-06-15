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

const LOGOUT_URL = "/logout";

const MainSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });

      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });

      //navigate(from, {replace: true});
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  return (
    <section className="main-setting">
      <input type="button" onClick={handleSubmit} value={`Вийти з облікового запису`} />
    </section>
  );
};

export default MainSetting;
