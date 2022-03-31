// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { WeekContainer, MainDayCard, DayCard, DayTitle, DayNumber, WeatherIcon, Month, Year} from "./mainStyle";

import {
    clear, clearMain, 
    rain, rainMain,
    iceRain, iceRainMain,
    snow, snowMain,
    thunderstorm, thunderstormMain,
    cloudy, cloudyMain,
    brokenClouds, brokenCloudsMain,
    cloud, cloudMain,
    overcast, overcastMain
} from '../../../images';

const { WEATHER_API_KEY } = require('../../../config');

const MainScreen = () => {
    const dispatch = useDispatch()

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [weekDays, setWeekdays] = useState([])
    const [weekDaysWeather, setWeekDaysWeather] = useState([])

    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const getDay = (delta) => {
        let date = new Date()
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() + delta);
        return previous;
    }

    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    // #a2a2a2 normal
    // #3783f0 main

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
                return isMainDay ? iceRainMain : iceRain;
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
                return isMainDay ? clearMain : clear;
            case 801:
                return isMainDay ? cloudyMain : cloudy;
            case 802:
                return isMainDay ? cloudMain : cloud;
            case 803:
                return isMainDay ? brokenCloudsMain : brokenClouds;
            case 804:
                return isMainDay ? overcastMain : overcast;
            default:
                return isMainDay ? "atmosphereMain" : "atmosphere";
        }
    }

    useEffect(() => {

        const getWeatherForYesterday = async (lat, long) => {
            let date = getDay(-1);
            let utc = Math.floor(date.getTime() / 1000);
            console.log(utc)
            // https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
            const apiHistCall = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
                lat + "&lon=" + long +
                "&dt=" + utc +
                "&appid=" + WEATHER_API_KEY +
                "&units=imperial";
            const response = await fetch(apiHistCall); // Generate the Response object
            if (response.ok) {
                const jsonValue = await response.json(); // Get JSON value from the response body
                return Promise.resolve(jsonValue);
            } else {
                return Promise.reject('404');
            }
        }

        const getWeatherForWeek = async (lat, long) => {
            const apiHistCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat + "&lon=" + long +
                "&appid=" + WEATHER_API_KEY +
                "&units=imperial";
            const response = await fetch(apiHistCall); // Generate the Response object
            if (response.ok) {
                const jsonValue = await response.json(); // Get JSON value from the response body
                return Promise.resolve(jsonValue);
            } else {
                return Promise.reject('404');
            }
        }

        // setLatitude("35.62");
        // setLongitude("-117.67");
        getWeatherForYesterday("35.622540", "-117.676430")
            .then(
                (yesterday) => {
                    // console.log("yesterday", yesterday)
                    // console.log(yesterday["current"]["weather"][0]["main"])
                    getWeatherForWeek("35.622540", "-117.676430")
                        .then(
                            (week) => {
                                setWeekdays([getDay(-1), getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5)])
                                setWeekDaysWeather([yesterday["current"], week["daily"][0], week["daily"][1], week["daily"][2], week["daily"][3], week["daily"][4], week["daily"][5]]);
                                setIsLoaded(true);
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                            }
                        )
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(weekDaysWeather);
        return (
            <WeekContainer>
                {weekDays.map((day, index) => 
                    {
                        if (day === weekDays[1]){
                            return (    
                                <MainDayCard>
                                    <DayTitle>
                                        {weekdays[day.getDay()]}
                                    </DayTitle>
                                    <DayNumber>
                                        {day.getDate()}
                                    </DayNumber>
                                    <WeatherIcon>
                                        <img style={{width:"calc(1vw + 4rem)"}} className="weatherIcon" 
                                            src={
                                                idToWeatherIcon(weekDaysWeather[index]["weather"][0]["id"], true)
                                            } alt="weatherIcon" />
                                    </WeatherIcon>
                                    {console.log(weekDaysWeather[index]["weather"][0]["id"])}
                                    {weekDaysWeather[index]["weather"][0]["description"]}
                                    <Month>
                                        {day.getMonth() + 1}
                                    </Month>
                                    <Year>
                                        {day.getFullYear()}
                                    </Year>
                                </MainDayCard>
                            )
                        } else {
                            return (
                                <DayCard>
                                    <DayTitle>
                                        {weekdays[day.getDay()]}
                                    </DayTitle>
                                    <DayNumber>
                                        {day.getDate()}
                                    </DayNumber>
                                    <WeatherIcon>
                                        <img style={{width:"calc(1vw + 4rem)"}} className="weatherIcon" 
                                            src={
                                                idToWeatherIcon(weekDaysWeather[index]["weather"][0]["id"], false)
                                            } alt="weatherIcon" />
                                        {/* <img style={{width:"calc(1vw + 4rem)"}} className="weatherIcon" src={cloudy} alt="weatherIcon" /> */}
                                    </WeatherIcon>
                                    {weekDaysWeather[index]["weather"][0]["description"]}
                                </DayCard>
                            )
                        }
                    }
                )}
            </WeekContainer>
        );
    }
}

export default MainScreen