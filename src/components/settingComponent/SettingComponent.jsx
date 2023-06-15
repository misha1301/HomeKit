import MainSetting from "./MainSetting";
import RoomSettings from "./RoomSettings";
import SensorSettings from "./SensorSettings";

const SettingComponent = (props) => {
  return (
    <section className="setting">
      {props?.param ? (
        props.param == "roomParam" ? (
          <RoomSettings
            onChange={props.editedName}
            onClick={props.deleteSubmit}
            roomName={props.selectedRoomName}
            originRoomName={props.selectedOriginName}
          />
        ) : props.param == "sensorParam" ? (
          <SensorSettings 
            onChangeMinTemp={props.onChangeMinTemp}
            onChangeMaxTemp={props.onChangeMaxTemp}
            currentMinTemp={props.currentMinTemp}
            currentMaxTemp={props.currentMaxTemp}
            currentIsOn={props.currentIsOn}
            onClick={props.onClickOnOff}
          />
        ) : (
          <MainSetting />
        )
      ) : (
        <MainSetting />
      )}
    </section>
  );
};

export default SettingComponent;
