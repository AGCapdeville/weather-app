import './App.css';

// Screens
import Weather from './components/screens/weather';
import Sources from './components/screens/sources';
import { useScreen } from './ducks/screen';

const screens : any = {
  Weather,
  Sources,
}

const App = () => {
  const screen = useScreen();
  const Screen = screens[screen];
  return (
    <Screen />
  );
}

export default App;
