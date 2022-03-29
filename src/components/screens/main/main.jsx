// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { WeekContainer, MainDayCard, DayCard, DayTitle, DayNumber, WeatherIcon, Month, Year} from "./mainStyle";

import {cloudyMain, cloudy} from '../../../images';

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
    // const weatherIcons = {
    //     'Rain' : '🌧',
    //     "Drizzle" : '🌧',
    //     'Cloudy' : '☁️',
    //     'Clear' : '☀️',
    //     'Cloudy' : '🌤',
    //     'Thunderstorm' : '⛈',
    //     'Overcast' : '🌨'
    // }

    // const idToWeather = (id) => {
    //     switch (id[0]) {
    //         case "2":       
    //             return "Thunderstorm";
    //         case "3":
    //             return "Drizzle";
    //         case "5":
    //             return "Rain";
    //         case "6":
    //             return "Snow";
    //         case "7":
    //             // 701:"Mist", 711:"Smoke", 721:"Haze", 731:"Dust", 741:"Fog",
    //             // 751:"Sand", 761:"Dust", 762:"Ash", 771:"Squall", 781:"Tornado"
    //             return "Atmosphere";
    //         case "8":
    //             return id[2] === "0" ? "Clear" : (id[2] === "1" ? "Cloudy" : "Overcast")
    //         default:
    //             return "Unknown"
    //     }
    // }



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
                                        <img style={{width:"calc(1vw + 4rem)"}} className="weatherIcon" src={cloudyMain} alt="weatherIcon" />
                                    </WeatherIcon>
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
                                    {/* {weekDaysWeather[index]["weather"][0]["main"]} */}
                                    <WeatherIcon>
                                        <img style={{width:"calc(1vw + 4rem)"}} className="weatherIcon" src={cloudy} alt="weatherIcon" />
                                    </WeatherIcon>
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