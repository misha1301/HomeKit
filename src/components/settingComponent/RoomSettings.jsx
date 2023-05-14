import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  showSucsessMsg,
  showWarningMsg,
  showErrMsg,
} from "../../msgpopup/ShowPopup";
import "./setting.css";


const RoomSettings = ({onChange, onClick, originRoomName, roomName}) => {
  
  return (
    <section className="room-setting">
      <div>
        <article>Назва кімнати</article>
        <input
          type="text"
          placeholder={`Змінити назву для ${roomName} `}
          onChange={onChange}
          value={roomName}
        />
      </div>
      <input
        type="button"
        onClick={onClick}
        value={`Видалити кімнату ${originRoomName}`}
      />
    </section>
  );
};

export default RoomSettings;
