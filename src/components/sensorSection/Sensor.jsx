import React from "react";

import cooling_active from "../../assets/cooling_active.svg";
import cooling_off from "../../assets/cooling_off.svg";
import cooling_no_conect from "../../assets/cooling_no_conect.svg";

import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./sensor.css";

function Sensor(props) {
  const sensorData = {
    activeRule: "Зберігати темперетуру в межах 10",
    mainData: "12",
    aditionalData: "53% в.в",
    aditionalDataDescryption: "в середині",
    conection: true,
    state: true,
    isActive: false,
  };

  return (
    <>
      {props.type === "active" ? (
        <section className="sensor-data-section">
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
}

export default Sensor;
