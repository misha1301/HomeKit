import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const RoomSettings = (props) => {

    return (
      <section className="room-setting">
        room setting
        <div>{props?.selectedRoom?._id}</div>
        <div>{props?.selectedRoom?.roomName}</div>
      </section>
    );
  };
  
export default RoomSettings;
  