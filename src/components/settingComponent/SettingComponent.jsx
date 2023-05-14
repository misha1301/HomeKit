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
        ) : props.param == "sensorProps" ? (
          <SensorSettings />
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
