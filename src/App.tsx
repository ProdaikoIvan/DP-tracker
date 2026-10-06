import { SlotsProvider } from './context/SlotsContext';
import MainPage from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <SlotsProvider>
      <MainPage />
    </SlotsProvider>
  );
}

export default App;
