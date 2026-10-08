import { SlotsProvider } from './context/SlotsContext';
import { MainPage } from './pages/MainPage';
import './App.css';

function App() {
  return (
    <SlotsProvider>
      <MainPage />
    </SlotsProvider>
  );
}

export default App;
