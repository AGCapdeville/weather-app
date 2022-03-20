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
    <div style={{width:"100vw", height:"100vh", backgroundColor:"grey"}}>
      <Screen />
    </div>
  );
}

export default App;
