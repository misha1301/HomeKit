import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sensor from "../sensorSection/Sensor";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import "./room.css";
const SENSORS_URL="/sensors";

function Room(props) {
  const { setSelectedSensors } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [controllers, setControllers] = useState([]);

  const sensorData = {
    id: "6f_7f-e7",
    type: "active",
    name: "Еко охолодження",
    tag: "cooling",
  };

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      axiosPrivate
      .get(SENSORS_URL+`/${props.id}`)
      .then((response) => {
        console.log(response.data);
        if(isMounted)
        setControllers(response.data);
        setSelectedSensors(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
    }, 15000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    }
  },[]);

  useEffect(()=>{
    axiosPrivate
    .get(SENSORS_URL+`/${props.id}`)
    .then((response) => {
      console.log(response.data);
      setControllers(response.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  },[])

  return (
    <section className="room-section">
      <article id={props.id} onClick={props.onClick}>
        {props.roomName}
        <p>&gt;</p>
      </article>
      <section className="sensors-section">
      {controllers?.length != 0 ? (
        controllers.map((controller) => (
          <Sensor key={controller._id} id={controller._id} {...controller} onClick={props.onSensorClick}/>
        ))
      ) : (
        <></>
      )}
      </section>
    </section>
  );
}

export default Room;
