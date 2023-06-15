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
const SENSORS_URL = "/sensors";

const Main = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, selectedSensors } = useAuth();

  const [addName, setAddName] = useState("");
  const [addSecure, setAddSecure] = useState("");
  const [addSelectedRoom, setAddSelectedRoom] = useState("");
  const [selectedSensorID, setSelectedSensorID] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");
  const [selectedOption, setSelectedOption] = useState("device");

  const [currentMinTemp, setCurrentMinTemp] = useState(0);
  const [currentMaxTemp, setCurrentMaxTemp] = useState(0);
  const [currentIsOn, setCurrentIsOn] = useState(false);

  const [selectedRoomID, setSelectedRoomID] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});

  const [settingParam, setSettingParam] = useState("");
  const [closeAll, setCloseAll] = useState(true);

  const { rooms, error, loading, setRefreshRooms } = useRooms(); // custom hook for uploading users rooms
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

  const { roomId, setRoomId, roomName, setRoomName } = useRoomSetting({
    selectedRoom,
  });

  const handleCloseNav = () => {
    setAddOption(false);
    setAutoOption(false);
    setSettingOption(false);
    setCloseAll(!closeAll);
    console.log(closeAll);
  };

  const handleNavSubmit = (e) => {
    e.preventDefault();

    if (!addOption && !autoOption && !settingOption)
      showErrMsg("Неможливо виконати операцію");

    if (addOption) {
      console.log(selectedOption);
      if (selectedOption === "device") {
        console.log(addName);
        console.log(addSelectedRoom);
        console.log(addSecure);
        if (addName && addSelectedRoom && addSecure);
        handleAddControllerSubmit();
      } else if (selectedOption === "room") {
        if (addName) handleAddSubmit();
      }
    } else if (autoOption) {
    } else if (settingOption) {
      switch (settingParam) {
        case "roomParam":
          if (roomName)
            if (roomName !== selectedRoom?.roomName) handleRenameSubmit();
          break;
        case "sensorParam":
          if (selectedSensorID) handleUpdateSensorSubmit();
          break;
        default:
          break;
      }
    }
  };

  const handleAddSubmit = async () => {
    console.log("roomName:", addName);
    try {
      const response = await axiosPrivate.post(ROOM_URL, { roomName: addName });
      //handleGetAllUserRooms();
      setAddName("");
      setAddOption(false);
      setRefreshRooms(true);
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  const handleUpdateSensorSubmit = async () => {
    console.log("заміна параметрів ", selectedSensor);
    console.log("currentIsOn: ", currentIsOn);
    console.log("currentMaxTemp: ", currentMaxTemp);
    console.log("currentMinTemp: ", currentMinTemp);
    try {
      const response = await axiosPrivate.put(SENSORS_URL, {
        id: selectedSensorID,
        settingState: true,
        maxTemp: currentMaxTemp,
        minTemp: currentMinTemp,
        isOn: currentIsOn,
      });
      //handleGetAllUserRooms();
      setSelectedSensorID("");
      setSettingOption(false);
      setRefreshRooms(true);
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  const handleAddControllerSubmit = async () => {
    console.log("roomName:", addName);
    console.log("roomID", addSelectedRoom);
    console.log("secure", addSecure);
    try {
      const response = await axiosPrivate.post(SENSORS_URL, {
        roomID: addSelectedRoom,
        name: addName,
        secure: addSecure,
      });
      //handleGetAllUserRooms();
      setAddName("");
      setAddOption(false);
      setRefreshRooms(true);
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  const handleRenameSubmit = async () => {
    console.log("roomName:", roomName);
    console.log("roomId:", roomId);
    try {
      const response = await axiosPrivate.put(ROOM_URL, {
        id: roomId,
        roomName: roomName,
      });
      //handleGetAllUserRooms();
      setAddName("");
      setRefreshRooms(true);
      setRoomName("");
      setRoomId("");
      handleCloseNav();
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      const response = await axiosPrivate.delete(ROOM_URL, {
        data: { id: roomId },
      });
      console.log(response);

      setRoomName("");
      showSucsessMsg("Ви усішно видалили кімнату");
      setRefreshRooms(true);
      handleCloseNav();

      //navigate(from, {replace: true});
    } catch (err) {
      showErrMsg(err.response.data.message);
    }
  };

  useEffect(() => {
    if (rooms.length != 0)
      setSelectedRoom(rooms.find((prop) => prop._id == selectedRoomID));
  }, [selectedRoomID]);

  useEffect(() => {
    if (selectedSensors.length != 0)
      setSelectedSensor(
        selectedSensors.find((prop) => prop._id == selectedSensorID)
      );
  }, [selectedSensorID]);

  useEffect(() => {
    if (selectedSensors.length != 0) {
      setCurrentMinTemp(selectedSensor?.state?.minTemp);
      setCurrentMaxTemp(selectedSensor?.state?.maxTemp);
      setCurrentIsOn(selectedSensor?.state?.isOn);
    }
  }, [selectedSensor]);

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
            setSettingParam(!settingOption ? "roomParam" : settingParam);
            setSelectedRoomID(e.target.id);
          }}
          onSensorClick={(e) => {
            console.log("clicked ---> ", e.target.id);
            setSettingOption(true);
            setSettingParam(!settingOption ? "sensorParam" : settingParam);
            setSelectedSensorID(e.target.id);
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
          <input type="submit" value="готово" onClick={handleNavSubmit} />
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
              addSecure={addSecure}
              selectedOption={selectedOption}
              onChangeSelectedOption={(e) => setSelectedOption(e.target.value)}
              onChangeAddSecure={(e) => setAddSecure(e.target.value)}
              onChangeAddName={(e) => setAddName(e.target.value)}
              onChangeSetSelectedRoom={(e) =>
                setAddSelectedRoom(e.target.value)
              }
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
              selectedRoomName={roomName}
              selectedOriginName={selectedRoom?.roomName}
              editedName={(e) => {
                setRoomName(e.target.value);
              }}
              deleteSubmit={handleDeleteRoom}
              onChangeMinTemp={(e) => {
                setCurrentMinTemp(e.target.value);
                console.log("setCurrentMinTemp");
                console.log(e.target.value);
              }}
              onChangeMaxTemp={(e) => {
                setCurrentMaxTemp(e.target.value);
                console.log("setCurrentMaxTemp");
                console.log(e.target.value);
              }}
              currentMinTemp={currentMinTemp}
              currentMaxTemp={currentMaxTemp}
              currentIsOn={currentIsOn}
              onClickOnOff={() => {
                setCurrentIsOn(!currentIsOn);
              }}
            />
          </CSSTransition>
        </NavMain>
      </NavConstructor>
    </>
  );
};

export default Main;

const Rooms = ({ rooms, onClick, onClickaddNew, onSensorClick }) => {
  return (
    <>
      {rooms?.length != 0 ? (
        rooms.map((room) => (
          <Room
            key={room._id}
            id={room._id}
            onClick={onClick}
            onSensorClick={onSensorClick}
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

const AddComponent = ({
  rooms,
  addName,
  addSecure,
  onChangeAddSecure,
  onChangeAddName,
  onChangeSetSelectedRoom,
  selectedOption,
  onChangeSelectedOption,
}) => {
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
            onChange={onChangeSelectedOption}
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
            onChange={onChangeSelectedOption}
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
          <article>Введіть ідентифікатор пристрою</article>
          <input
            type="text"
            placeholder="xxxx-xxxx"
            onChange={onChangeAddSecure}
            value={addSecure}
          />
        </>
      ) : (
        <></>
      )}
      {selectedOption === "device" ? (
        <>
          <article>Оберіть кімнату для пристрою</article>
          <select onChange={onChangeSetSelectedRoom}>
            <option value="" selected disabled hidden>
              Оберіть кімнату
            </option>
            {rooms?.length != 0
              ? rooms.map((room) => (
                  <option key={room._id} value={room._id} id={room._id}>
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
  const [refreshRooms, setRefreshRooms] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(ROOM_URL)
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((err) => {
        showErrMsg(err.response.data.message);
      })
      .finally(() => {
        setloading(false);
      });
    setRefreshRooms(false);
  }, [refreshRooms]);

  return { rooms, error, loading, setRefreshRooms };
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

const useRoomSetting = ({ selectedRoom }) => {
  const [roomName, setRoomName] = useState(selectedRoom?.roomName);
  const [roomId, setRoomId] = useState(selectedRoom?._id);

  useEffect(() => {
    setRoomName(selectedRoom?.roomName);
    setRoomId(selectedRoom?._id);
  }, [selectedRoom]);

  return { roomId, setRoomId, roomName, setRoomName };
};
