import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useAuth from "../../hooks/useAuth";
import Room from "../../components/roomSection/Room";
import NavConstructor from "../../components/navModel/NavConstructor";
import NavHeader from "../../components/navModel/NavHeader";
import NavMain from "../../components/navModel/NavMain";
import NavMobile from "../../components/navModel/NavMobile";
import SettingComponent from "../../components/settingComponent/SettingComponent";

import {
  showErrMsg,
  showWarningMsg,
  showSucsessMsg,
} from "../../msgpopup/ShowPopup";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./main.css";

const ROOM_URL = "/rooms";

const Main = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [addName, setAddName] = useState("");

  const [selectedRoomID, setSelectedRoomID] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});

  const [settingParam, setSettingParam] = useState("");
  const [closeAll, setCloseAll] = useState();

  const { rooms, error, loading } = useRooms(); // custom hook for uploading users rooms
  const {
    addOption,
    autoOption,
    settingOption,
    setAddOption,
    setAutoOption,
    setSettingOption,
    activeMenu,
    navOption,
  } = useNavOption({ closeAll }); // custom hook for avtive nav options

  const handleCloseNav = () => {
    setAddOption(false);
    setAutoOption(false);
    setSettingOption(false);
  };

  const handleNavSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddSubmit = async () => {
    console.log("roomName:", addName);
    try {
      const response = await axiosPrivate.post(ROOM_URL, { roomName: addName });
      //handleGetAllUserRooms();
      setAddName("");
      setAddOption(false);
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

  const handleRenameSubmit = async () => {
    console.log("roomName:", addName);
    try {
      const response = await axiosPrivate.put(ROOM_URL, { id: addName });
      //handleGetAllUserRooms();
      setAddName("");
      setAddOption(false);
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

  const handledeleteSubmit = async () => {
    console.log("roomName:", addName);
    try {
      const response = await axiosPrivate.delete(ROOM_URL, { id: addName });
      //handleGetAllUserRooms();
      setAddName("");
      setAddOption(false);
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

  useEffect(() => {
    if (rooms.length != 0)
      setSelectedRoom(rooms.find((prop) => prop._id == selectedRoomID));
  }, [selectedRoomID]);

  return (
    <>
      <header>
        <article>
          <h2 className="main-tytle">Мій дім</h2>
          <h4>Привіт {auth?.username}</h4>
        </article>
      </header>
      <main>
        <Rooms
          rooms={rooms}
          onClickaddNew={() => setAddOption(true)}
          onClick={(e) => {
            setSettingOption(true);
            setSettingParam(!settingOption ? "roomProps" : settingParam);
            setSelectedRoomID(e.target.id);
          }}
        />
      </main>
      <NavMobile
        addOption={addOption}
        autoOption={autoOption}
        settingOption={settingOption}
        onChangeAdd={() => setAddOption(!addOption)}
        onChangeAuto={() => setAutoOption(!autoOption)}
        onChangeSetting={() => {
          setSettingOption(!settingOption);
          setSettingParam(!settingOption ? "mainParam" : settingParam);
        }}
      />
      <NavConstructor
        state={addOption || autoOption || settingOption}
        onSubmit={handleNavSubmit}
      >
        <NavHeader>
          <input type="button" value="скасувати" onClick={handleCloseNav} />
          <article className="nav-option">{navOption}</article>
          <input type="submit" value="готово" />
        </NavHeader>
        <NavMain>
          <CSSTransition
            in={activeMenu === "add"}
            unmountOnExit
            timeout={300}
            classNames="menu-primary"
          >
            <AddComponent
              rooms={rooms}
              addName={addName}
              onChangeAddName={(e) => setAddName(e.target.value)}
            />
          </CSSTransition>
          <CSSTransition
            in={activeMenu === "auto"}
            unmountOnExit
            timeout={300}
            classNames="menu-secondary"
          >
            <div className="auto"></div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "setting"}
            unmountOnExit
            timeout={300}
            classNames="menu-setting"
          >
            <SettingComponent
              param={settingParam}
              selectedRoom={selectedRoom}
            />
          </CSSTransition>
        </NavMain>
      </NavConstructor>
    </>
  );
};

export default Main;

const Rooms = ({ rooms, onClick, onClickaddNew }) => {
  return (
    <>
      {rooms?.length != 0 ? (
        rooms.map((room) => (
          <Room
            key={room._id}
            id={room._id}
            onClick={onClick}
            roomName={room?.roomName}
          />
        ))
      ) : (
        <label className="add-new-room">
          <input type="button" value="+" onClick={onClickaddNew} />
        </label>
      )}
    </>
  );
};

const AddComponent = ({ rooms, addName, onChangeAddName }) => {
  const [selectedOption, setSelectedOption] = useState("device");

  return (
    <div className="add">
      <article>Виберіть опцію</article>
      <div className="add-options">
        <label
          className={`${
            selectedOption === "device" ? "add-option-active" : ""
          }`}
        >
          <input
            type="radio"
            name="select"
            checked={selectedOption === "device" ? true : false}
            value="device"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          <h4>Пристрій</h4>
        </label>
        <label
          className={`${selectedOption === "room" ? "add-option-active" : ""}`}
        >
          <input
            type="radio"
            name="select"
            value="room"
            checked={selectedOption === "room" ? true : false}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          <h4>Кімнату</h4>
        </label>
      </div>
      <article>
        Введіть назву {selectedOption === "device" ? "пристрою" : "кімнати"}
      </article>
      <input
        type="text"
        placeholder={
          selectedOption === "device" ? "Новий пристрій" : "Нова кімната"
        }
        onChange={onChangeAddName}
        value={addName}
      />
      {selectedOption === "device" ? (
        <>
          <article>Оберіть кімнату для пристрою</article>
          <select>
            {rooms?.length != 0
              ? rooms.map((room) => (
                  <option key={room._id} id={room._id}>
                    {room.roomName}
                  </option>
                ))
              : ""}
          </select>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(ROOM_URL)
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return { rooms, error, loading };
}

const useNavOption = ({ closeAll }) => {
  const [addOption, setAddOption] = useState(false);
  const [autoOption, setAutoOption] = useState(false);
  const [settingOption, setSettingOption] = useState(false);
  const [activeMenu, setActiveMenu] = useState("add");
  const [navOption, setNavOption] = useState("");

  useEffect(() => {
    if (addOption) {
      setAutoOption(false);
      setSettingOption(false);
    }
  }, [addOption]);

  useEffect(() => {
    if (autoOption) {
      setAddOption(false);
      setSettingOption(false);
    }
  }, [autoOption]);

  useEffect(() => {
    if (settingOption) {
      setAddOption(false);
      setAutoOption(false);
    }
  }, [settingOption]);

  useEffect(() => {
    if (closeAll) {
      setAddOption(false);
      setAutoOption(false);
      setSettingOption(false);
    }
  }, [closeAll]);

  useEffect(() => {
    setActiveMenu(
      `${
        addOption
          ? "add"
          : autoOption
          ? "auto"
          : settingOption
          ? "setting"
          : activeMenu
      }`
    );

    setNavOption(
      `${
        addOption
          ? "Додати"
          : autoOption
          ? "Автоматизація"
          : settingOption
          ? "Налаштування"
          : ""
      }`
    );
  }, [addOption, autoOption, settingOption]);

  return {
    addOption,
    autoOption,
    settingOption,
    setAddOption,
    setAutoOption,
    setSettingOption,
    activeMenu,
    navOption,
  };
};
