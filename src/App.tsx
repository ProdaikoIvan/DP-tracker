import Header from './components/Header/Header';
import DepartmentsList from './components/DepartmentsList/DepartmentsList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <DepartmentsList />
      </main>
    </div>
  );
}

export default App;
