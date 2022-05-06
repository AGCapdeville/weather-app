import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateScreen } from "../../../ducks/screen";
import {
  WeekContainer,
  MainDayCard,
  DayCard,
  DayTitle,
  DayNumber,
  WeatherIcon,
  Month,
  Year,
  SourceButton,
  SelectedBar,
  Icon,
  SourceContainer,
  MonthContainer,
  Description,
  WeatherContainer,
  LocationContainer,
  Location,
  SideBar,
  PersonaScreen,
} from "./weatherStyle";
import {
  sun,
  sunMain,
  rain,
  rainMain,
  snow,
  snowMain,
  cloud,
  cloudMain,
  clouds,
  cloudsMain,
  partlyCloudy,
  partlyCloudyMain,
  thunderstorm,
  thunderstormMain,
  brokenClouds,
  brokenCloudsMain,
  location,
} from "../../../images";
import { computeHeadingLevel } from "@testing-library/dom";

const { WEATHER_API_KEY } = require("../../../config");

const PersonaWeather = () => {
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dispatch = useDispatch();
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const cities = {
    santa_barbara: [34.42083, -119.698189],
    los_angeles: [34.052235, -118.243683],
    san_francisco: [37.773972, -122.431297],
    san_diego: [32.7157, -117.1611],
  };

  const randomProperty = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  let initCity = randomProperty(cities);
  const [latitude, setLatitude] = useState(initCity[0]);
  const [longitude, setLongitude] = useState(initCity[1]);

  const [geoButtonState, setGeoButtonState] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weekDays, setWeekdays] = useState([]);
  const [weekDaysWeather, setWeekDaysWeather] = useState([]);

  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");

  const [selectedDay, setSelectedDay] = useState(1);

  // #a2a2a2 normal
  // #3783f0 main

  const getDay = (delta) => {
    let date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() + delta);
    return previous;
  };

  const idToWeatherIcon = (id, isMainDay) => {
    switch (id) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return isMainDay ? thunderstormMain : thunderstorm;
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return isMainDay ? "drizzleMain" : "drizzle";
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return isMainDay ? rainMain : rain;
      case 511:
        return isMainDay ? "iceRainMain" : "iceRain";
      case 520:
      case 521:
      case 522:
      case 531:
        return isMainDay ? "intenseRainMain" : "intenseRain";
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return isMainDay ? snowMain : snow;
      case 701:
        return isMainDay ? "mistMain" : "mist";
      case 711:
        return isMainDay ? "smokeMain" : "smoke";
      case 721:
        return isMainDay ? "hazeMain" : "haze";
      case 731:
        return isMainDay ? "dustWhirlsMain" : "dustWhirls";
      case 741:
        return isMainDay ? "fogMain" : "fog";
      case 751:
        return isMainDay ? "sandMain" : "sand";
      case 761:
        return isMainDay ? "dustMain" : "dust";
      case 762:
        return isMainDay ? "ashMain" : "ash";
      case 771:
        return isMainDay ? "squallMain" : "squall";
      case 781:
        return isMainDay ? "tornadoMain" : "tornado";
      case 800:
        return isMainDay ? sunMain : sun;
      case 801:
        return isMainDay ? partlyCloudyMain : partlyCloudy;
      case 802:
        return isMainDay ? cloudMain : cloud;
      case 803:
        return isMainDay ? cloudsMain : clouds;
      case 804:
        return isMainDay ? brokenCloudsMain : brokenClouds;
      default:
        return isMainDay ? "atmosphereMain" : "atmosphere";
    }
  };

  const getGeolocation = () => {
    setGeoButtonState(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail);
    } else {
      alert("Sorry, your browser does not support geolocation services.");
    }
  };

  const success = (position) => {
    setLongitude(position["coords"]["longitude"]);
    setLatitude(position["coords"]["latitude"]);
    setGeoButtonState(false);
  };

  const fail = () => {
    setGeoButtonState(false);
  };

  const pupulateWeekWeather = async () => {
    const yesterdayWeather = await getWeatherForYesterday(latitude, longitude);
    const weatherForTheWeek = await getWeatherForWeek(latitude, longitude);
    setWeekdays([
      getDay(-1),
      getDay(0),
      getDay(1),
      getDay(2),
      getDay(3),
      getDay(4),
      getDay(5),
    ]);
    setWeekDaysWeather([
      yesterdayWeather["current"],
      weatherForTheWeek["daily"][0],
      weatherForTheWeek["daily"][1],
      weatherForTheWeek["daily"][2],
      weatherForTheWeek["daily"][3],
      weatherForTheWeek["daily"][4],
      weatherForTheWeek["daily"][5],
    ]);
    setIsLoaded(true);
  };

  const getWeatherForYesterday = async (lat, long) => {
    let date = getDay(-1);
    let utc = Math.floor(date.getTime() / 1000);
    const apiHistCall =
      "https://api.openweathermap.org/data/2.5/onecall/timemachine?" +
      "lat=" +
      lat +
      "&lon=" +
      long +
      "&dt=" +
      utc +
      "&appid=" +
      WEATHER_API_KEY +
      "&units=imperial";
    const response = await fetch(apiHistCall); // Generate the Response object
    if (response.ok) {
      const jsonValue = await response.json(); // Get JSON value from the response body
      return Promise.resolve(jsonValue);
    } else {
      return Promise.reject("404");
    }
  };

  const getWeatherForWeek = async (lat, long) => {
    const apiHistCall =
      "https://api.openweathermap.org/data/2.5/onecall?" +
      "lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      WEATHER_API_KEY +
      "&units=imperial";
    const response = await fetch(apiHistCall); // Generate the Response object
    if (response.ok) {
      const jsonValue = await response.json(); // Get JSON value from the response body
      return Promise.resolve(jsonValue);
    } else {
      return Promise.reject("404");
    }
  };

  const locateUser = async (latitude, longitude) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
        "X-RapidAPI-Key": "8f72f2c6c8msh17c86ab914bf79bp1252dcjsnc1f7c6eb8ee5",
      },
    };

    const reverseGeocodingEndpoint =
      "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse";
    const reverseGeocoding = `${reverseGeocodingEndpoint}?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`;

    try {
      const response = await fetch(reverseGeocoding, options);
      const data = await response.json();
      console.log(data);
      setCity(data?.address?.city);
      setTown(data?.address?.town);
      setState(data?.address?.state);
    } catch (error) {
      console.log(error);
    }
  };

  const moveSelectedToMe = (index) => {
    let selected = document.getElementById("selected");
    selected.style.marginLeft =
      "max(" + index * 10 + "vw," + index * 100 + "px)";
    selected.style.marginRight = index * -100 + "px";

    document.getElementById(index + "month").style.display = "block";
    document.getElementById(index + "year").style.display = "block";

    document.getElementById(selectedDay + "month").style.display = "none";
    document.getElementById(selectedDay + "year").style.display = "none";
    setSelectedDay(index);
  };

  useEffect(() => {
    pupulateWeekWeather();
    locateUser(latitude, longitude);
  }, [latitude, longitude]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <LocationContainer id="locationInfo">
          <div>{state}</div>
          <div>{city}</div>
          <div>{town}</div>
          <div style={{ position: "absolute", right: 2, top: 7 }}>
            <Location onClick={(event) => getGeolocation(event)}></Location>
          </div>
        </LocationContainer>
        <SourceContainer>
          <SourceButton onClick={() => dispatch(updateScreen("Sources"))}>
            sources
          </SourceButton>
        </SourceContainer>
        <WeatherContainer>
          <SelectedBar id="selected"></SelectedBar>
          <WeekContainer>
            {weekDays.map((day, index) => {
              if (index === 1) {
                return (
                  <DayCard id={index} onClick={(e) => moveSelectedToMe(index)}>
                    <DayTitle>{weekdays[day.getDay()]}</DayTitle>
                    <DayNumber>{day.getDate()}</DayNumber>
                    <WeatherIcon>
                      <Icon
                        src={idToWeatherIcon(
                          weekDaysWeather[index]["weather"][0]["id"],
                          true
                        )}
                        alt="weatherIcon"
                      />
                    </WeatherIcon>
                    <Description id={index + "description"}>
                      {weekDaysWeather[index]["weather"][0]["description"]}
                    </Description>
                    <MonthContainer id={index + "month"}>
                      <Month>{day.getMonth() + 1}</Month>
                    </MonthContainer>
                    <Year id={index + "year"}>{day.getFullYear()}</Year>
                  </DayCard>
                );
              } else {
                return (
                  <DayCard id={index} onClick={(e) => moveSelectedToMe(index)}>
                    <DayTitle>{weekdays[day.getDay()]}</DayTitle>
                    <DayNumber>{day.getDate()}</DayNumber>
                    <WeatherIcon>
                      <Icon
                        src={idToWeatherIcon(
                          weekDaysWeather[index]["weather"][0]["id"],
                          true
                        )}
                        alt="weatherIcon"
                      />
                    </WeatherIcon>
                    <Description id={index + "description"}>
                      {weekDaysWeather[index]["weather"][0]["description"]}
                    </Description>
                    <MonthContainer
                      style={{ display: "none" }}
                      id={index + "month"}
                    >
                      <Month>{day.getMonth() + 1}</Month>
                    </MonthContainer>
                    <Year style={{ display: "none" }} id={index + "year"}>
                      {day.getFullYear()}
                    </Year>
                  </DayCard>
                );
              }
            })}
          </WeekContainer>
        </WeatherContainer>
      </>
    );
  }
};

export default PersonaWeather;
