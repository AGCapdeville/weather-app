import { useDispatch } from "react-redux";
import { updateScreen } from "../../../ducks/screen";
import {
  sunMain,
  rainMain,
  heavyRainMain,
  lightRainMain,
  snowMain,
  cloudMain,
  cloudsMain,
  partlyCloudyMain,
  thunderstormMain,
  brokenCloudsMain,
  location,
} from "../../../images";
import Source from "../../source";

const SourcesScreen = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Icons provided by flaticon.com
      </div>

      <div style={{ position: "absolute", right: 10, bottom: 10 }}>
        <button onClick={() => dispatch(updateScreen("Main"))}>back</button>
      </div>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Source
          iconLink="https://www.flaticon.com/free-icons/sun"
          icon={sunMain}
          iconName="Sun"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/cloud"
          icon={cloudMain}
          iconName="Cloud"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/light-rain"
          icon={lightRainMain}
          iconName="Light Rain"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/rain"
          icon={rainMain}
          iconName="Rain"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/heavy-rain"
          icon={heavyRainMain}
          iconName="Heavy Rain"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/snow"
          icon={snowMain}
          iconName="Snow"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/thunder"
          icon={thunderstormMain}
          iconName="Thunder"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/overcast"
          icon={cloudsMain}
          iconName="Clouds"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/partly-cloudy"
          icon={partlyCloudyMain}
          iconName="Partly Cloudy"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/broken-clouds"
          icon={brokenCloudsMain}
          iconName="Broken Clouds"
          author="Sudowoodo"
        />
        <Source
          iconLink="https://www.flaticon.com/free-icons/location"
          icon={location}
          iconName="Location"
          author="Freepik"
        />
      </div>
    </div>
  );
};

export default SourcesScreen;

{
  /* 
    <a href="https://www.flaticon.com/free-icons/cloud" title="cloud icons">Cloud icons created by juicy_fish - Flaticon</a>
    <div><a href="https://www.flaticon.com/free-icons/partly-cloudy" title="partly cloudy icons">Partly cloudy icons created by Sudowoodo - Flaticon</a></div>
    <div><a href="https://www.flaticon.com/free-icons/cloudy" title="cloudy icons">Cloudy icons created by Freepik - Flaticon</a></div> */
}
