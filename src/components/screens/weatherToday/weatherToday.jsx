// import mainStyle from "./main.module.scss";
import { updateScreen } from '../../../ducks/screen';
import { useDispatch } from 'react-redux';

const WeatherToday = () => {
    const dispatch = useDispatch()

    const displayScreen = () => {
        dispatch(updateScreen("Main"))
    }

    return (
        <div>
            <div>Weather Today</div>
            <button onClick={() => displayScreen()}>Main</button>
        </div>
    );
}

export default WeatherToday