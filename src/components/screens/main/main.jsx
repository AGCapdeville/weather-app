// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
const { WEATHER_API_KEY } = require('../../../config');

const MainScreen = () => {
    const dispatch = useDispatch()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weather, setWeather] = useState("");
    const [location, setLocation] = useState("");
    const [country, setCountry] = useState("");
    const [feels, setFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");


    // Ridgecrest lat: 35.624947; long: -117.679637;
    const latitude =  Math.ceil(Math.random() * 90) * (Math.round(Math.random()) ? 1 : -1)
    const longitude =  Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)

    const apiCall = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + WEATHER_API_KEY + "&units=imperial"
    // const displayScreen = () => {
    //     dispatch(updateScreen("WeatherToday"))
    // }


    // Function to do an Ajax call
    const doAjax = async (apiToCall) => {
        const response = await fetch(apiToCall); // Generate the Response object
        if (response.ok) {
            const jsonValue = await response.json(); // Get JSON value from the response body
            return Promise.resolve(jsonValue);
        } else {
            return Promise.reject('404');
        }
    }

    useEffect(() => {
        doAjax(apiCall)
            .then(
                (result) => {
                    // console.log(result);
                    setLocation(result["name"] ? result["name"] : "Unknown");
                    setCountry(result["sys"]["country"] ? result["sys"]["country"] : "Unknown");
                    setWeather(result["weather"][0]["main"]);
                    setFeelsLike(result["main"]["feels_like"]);
                    setHumidity(result["main"]["humidity"]);
                    setIsLoaded(true);
                    console.log(result);
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            );

    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div>Latitude: {latitude} Longitude: {longitude}</div>
                <div>Country: {country}</div>
                <div>Location: {location}</div>
                <div>Weather: {weather}</div>
                <div>Feels like {feels}</div>
                <div>Humidity {humidity}</div>
            </div>
        );
    }

    // return (
    //     <div>
    //         <div>Welcome to weather anime</div>
    //         <button onClick={() => displayScreen()}>Weather Today</button>
    //     </div>
    // );
}

export default MainScreen