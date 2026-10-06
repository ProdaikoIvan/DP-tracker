import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import DepartmentsList from './components/DepartmentsList/DepartmentsList';
import TrackerView from './components/TrackerView/TrackerView';
import { detectCurrentDepartment, openDepartmentTab } from './services/tabService';
import type { SelectedDepartment } from './App.types';
import './App.css';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);

  const handleSelectDepartment = (dept: SelectedDepartment) => {
    setSelectedDepartment(dept);
    void openDepartmentTab(dept.city.url);
  };

  useEffect(() => {
    let isMounted = true;

    detectCurrentDepartment().then((dept) => {
      if (isMounted && dept) {
        setSelectedDepartment(dept);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app-container">
      <Header
        showBackButton={!!selectedDepartment}
        onBack={() => setSelectedDepartment(null)}
      />
      <main className="main-content">
        {selectedDepartment ? (
          <TrackerView
            city={selectedDepartment.city}
            country={selectedDepartment.country}
          />
        ) : (
          <DepartmentsList onSelectDepartment={handleSelectDepartment} />
        )}
      </main>
    </div>
  );
}

export default App;
