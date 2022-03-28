// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { WeekContainer, MainDayCard, DayCard, DayTitle, DayNumber} from "./mainStyle";

import {cloudyBlack, cloudyGrey} from '../../../images';

const { WEATHER_API_KEY } = require('../../../config');

const MainScreen = () => {
    const dispatch = useDispatch()

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [weekDays, setWeekdays] = useState([])
    const [weekDaysWeather, setWeekDaysWeather] = useState([])

    const [weather, setWeather] = useState('')
    const [location, setLocation] = useState('')
    const [country, setCountry] = useState('')
    const [feels, setFeelsLike] = useState('')
    const [humidity, setHumidity] = useState('')

    // Ridgecrest lat: 35.624947; long: -117.679637;
    // const latitude =  Math.ceil(Math.random() * 90) * (Math.round(Math.random()) ? 1 : -1)
    // const longitude =  Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)

    // const apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + WEATHER_API_KEY + '&units=imperial'
    // const displayScreen = () => {
    //     dispatch(updateScreen('WeatherToday'))
    // }

    const getDay = (delta) => {
        let date = new Date()
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() + delta);
        return previous;
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

    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const weatherIcons = {
        'Rain' : '🌧',
        "Drizzle" : '🌧',
        'Cloudy' : '☁️',
        'Clear' : '☀️',
        'Cloudy' : '🌤',
        'Thunderstorm' : '⛈',
        'Overcast' : '🌨'
    }

    const idToWeather = (id) => {
        switch (id[0]) {
            case "2":       
                return "Thunderstorm";
            case "3":
                return "Drizzle";
            case "5":
                return "Rain";
            case "6":
                return "Snow";
            case "7":
                // 701:"Mist", 711:"Smoke", 721:"Haze", 731:"Dust", 741:"Fog",
                // 751:"Sand", 761:"Dust", 762:"Ash", 771:"Squall", 781:"Tornado"
                return "Atmosphere";
            case "8":
                return id[2] == "0" ? "Clear" : (id[2] == "1" ? "Cloudy" : "Overcast")
            default:
                return "Unknown"
        }
    }

    // const date = new Date();
    // let month = months[date.getMonth()];
    // let month_number = date.getMonth();
    // let prevWeekday = weekdays[date.getDay() - 1 == -1 ? 6 : date.getDay() - 1]
    // let weekday = weekdays[date.getDay()];

    useEffect(() => {
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

        setWeekdays([getDay(-1), getDay(0), getDay(1), getDay(2), getDay(3), getDay(4), getDay(5)])
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <WeekContainer>
                    {weekDays.map((day, index) => 
                        {
                            if (day == weekDays[1]){
                                return (
                                    <MainDayCard>
                                        <DayTitle>
                                            {weekdays[day.getDay()]}
                                        </DayTitle>
                                        <DayNumber>
                                            {day.getDate()}
                                        </DayNumber>
                                        {weekDaysWeather[index]["weather"][0]["main"]}
                                        <img style={{width:'80px'}} className="weatherIcon" src={cloudyBlack} alt="weatherIcon" />
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
                                        {weekDaysWeather[index]["weather"][0]["main"]}
                                        <img style={{width:'80px'}} className="weatherIcon" src={cloudyGrey} alt="weatherIcon" />
                                    </DayCard>
                                )
                            }
                        }
                    )}
                </WeekContainer>

                {/* <div id="weekContainer" style={weekContainer}>
                    
                    <div id="prevDay" style={dayStyle}>
                        <div>
                            {prevWeekday}
                        </div>
                        <div>
                            {prevDay}
                        </div>
                    </div>

                    <div id="today" style={dayStyle}>
                        <div>
                            {weekday}
                        </div>
                        <div>
                            {day}
                        </div>
                    </div>

                </div> */}

            </div>
        );
    }
}

export default MainScreen