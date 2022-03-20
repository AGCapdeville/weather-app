// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


const MainScreen = () => {
    const dispatch = useDispatch()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});

    // const weatherKey = "d759058e687e86fb9d57337061f496e5";
    // const apiCall = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={d759058e687e86fb9d57337061f496e5}"
    const apiCall = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={d759058e687e86fb9d57337061f496e5}"
    // const displayScreen = () => {
    //     dispatch(updateScreen("WeatherToday"))
    // }

    useEffect(() => {
        fetch(apiCall)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {items}
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