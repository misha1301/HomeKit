const SensorSettings = (props) => {
  return (
    <section className="sensor-setting">
      <div>
        <article>Мінімальна температура</article>
        <input
          type="number"
          placeholder={`Мін. тепература`}
          onChange={props.onChangeMinTemp}
          value={props.currentMinTemp}
        />
        <article>Максимальна температура</article>
        <input
          type="number"
          placeholder={`Макс. тепература`}
          onChange={props.onChangeMaxTemp}
          value={props.currentMaxTemp}
        />
      </div>
      <input className={`${props?.currentIsOn ? 'active-state' : 'unactive-state'}`}
        type="button"
        onClick={props.onClick}
        value={`${props?.currentIsOn ? 'Вимкнути ' : 'Увімкнути '} пристрій`}
      />
    </section>
  );
};

export default SensorSettings;
