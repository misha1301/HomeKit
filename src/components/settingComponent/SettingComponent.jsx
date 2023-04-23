import MainSetting from "./MainSetting";
import RoomSettings from "./RoomSettings";
import SensorSettings from "./SensorSettings";

const SettingComponent = (props) => {
  return (
    <section className="setting">
      {props?.param ? (
        props.param == "roomProps" ? (
          <RoomSettings selectedRoom={props.selectedRoom}/>
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
