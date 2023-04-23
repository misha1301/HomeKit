import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sensor from "../sensorSection/Sensor";
import "./room.css";

function Room(props) {

  const sensorData = {
    id: "6f_7f-e7",
    type: "active",
    name: "Еко охолодження",
    tag: "cooling"
  };

  return (
    <section className="room-section">
      <article id={props.id} onClick={props.onClick}>{props.roomName}<p>&gt;</p></article>
      <section className="sensors-section">
        {/* <Sensor {...sensorData}/> */}
      </section>
    </section>
  );
}

export default Room;
