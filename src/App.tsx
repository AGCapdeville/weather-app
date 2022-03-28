import './App.css';

// Screens
import Main from './components/screens/main';
import WeatherToday from './components/screens/weatherToday';
import { useScreen } from './ducks/screen';

const screens : any = {
  Main,
  WeatherToday
}

function App() {
  const screen = useScreen();
  const Screen = screens[screen];
  return (
    <Screen />
  );
}

export default App;
