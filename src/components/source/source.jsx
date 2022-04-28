import { WeatherIcon } from "./sourceStyle.js";

const Source = (props) => (
  <a href={props.iconLink} style={{ margin: "10px" }}>
    <WeatherIcon
      style={{
        width: "100px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "calc(50px + 2vw)" }}
        className="weatherIcon"
        src={props.icon}
        alt="weatherIcon"
      />
      <div style={{ fontSize: "12px", textAlign: "center", marginTop: "10px" }}>
        {props.iconName}
      </div>
      <div style={{ fontSize: "10px", textAlign: "center", marginTop: "5px" }}>
        Designed by
      </div>
      <div style={{ fontSize: "10px", textAlign: "center" }}>
        {props.author}
      </div>
    </WeatherIcon>
  </a>
);

export default Source;
