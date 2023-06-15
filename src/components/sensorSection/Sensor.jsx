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

  console.log("props", props);

  function diff_minutes(dt1) {
    let splitData = dt1.split(" ")
    console.log(splitData);
    let curentDate  =  new Date();
    // var diff = (curentDate.getTime() - dt1.getTime()) / 1000;
    // diff /= 60;
    // return Math.abs(Math.round(diff));
  }

  return (
    <>
      <section
        className="sensor-data-section "
        id={props._id}
        onClick={props.onClick}
      >
        <div className="header-sensor-section-container">
          <div className="animated-icon">
            <img
              className={
                props.state.isOn
                  ? props.state.isWorking
                    ? "rotation-animation animated-icon-img"
                    : "animated-icon-img"
                  : "animated-icon-img"
              }
              src={
                // sensorData.conection ?
                props.state.isOn ? cooling_active : cooling_off
                //: cooling_no_conect
              }
              alt=""
              height="25px"
            />
          </div>
          <div className="main-sensor-data">
            {props.sensors.inside.temperature} &#xb0;C
          </div>
          <div className="aditional-sensor-data">
            <p className="aditional-data">{props.sensors.inside.humidity} %</p>
            <p className="aditional-data-descryption">в середині</p>
          </div>
        </div>
        <div className="params-sensor-section-container">
          <p className="sensor-name">{props?.name}</p>
          <p className="active-param-rule">
            Зберігати темперетуру в межах {props.state.minTemp}-
            {props.state.maxTemp} &#xb0;C
          </p>
          {
            diff_minutes(props.state.lastConnection)
          }
        </div>
      </section>
    </>
  );
};

export default Sensor;
