import React from "react";

import cooling_active from "../../assets/cooling_active.svg";
import cooling_off from "../../assets/cooling_off.svg";
import cooling_no_conect from "../../assets/cooling_no_conect.svg";

import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

import {
  showErrMsg,
  showWarningMsg,
  showSucsessMsg,
} from "../../msgpopup/ShowPopup";

import "./sensor.css";

const Sensor = (props) => {
  const axiosPrivate = useAxiosPrivate();

  const sensorData = {
    activeRule: "Зберігати темперетуру в межах 10",
    mainData: "12",
    aditionalData: "53% в.в",
    aditionalDataDescryption: "в середині",
    conection: true,
    state: true,
    isActive: false,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.get("/sensors");

      console.log(JSON.stringify(response));

      showSucsessMsg("Ви успішно отримали всі сенсори");

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

  return (
    <>
      {props.type === "active" ? (
        <section className="sensor-data-section " onClick={handleSubmit}>
          <div className="header-sensor-section-container">
            <div className="animated-icon">
              <img
                className={
                  sensorData.conection && sensorData.state
                    ? sensorData.isActive
                      ? "rotation-animation animated-icon-img"
                      : "animated-icon-img"
                    : "animated-icon-img"
                }
                src={
                  sensorData.conection
                    ? sensorData.state
                      ? cooling_active
                      : cooling_off
                    : cooling_no_conect
                }
                alt=""
                height="25px"
              />
            </div>
            <div className="main-sensor-data">{sensorData?.mainData}</div>
            <div className="aditional-sensor-data">
              <p className="aditional-data">{sensorData.aditionalData}</p>
              <p className="aditional-data-descryption">
                {sensorData?.aditionalDataDescryption}
              </p>
            </div>
          </div>
          <div className="params-sensor-section-container">
            <p className="sensor-name">{props?.name}</p>
            <p className="active-param-rule">{sensorData?.activeRule}</p>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sensor;
