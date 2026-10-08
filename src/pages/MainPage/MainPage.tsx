import React from 'react';
import { Layout } from '../../components/Layout';
import DepartmentsList from '../../components/DepartmentsList/DepartmentsList';
import TrackerView from '../../components/TrackerView/TrackerView';
import { useSlots } from '../../context/SlotsContext';

const MainPage: React.FC = () => {
  const { selectedDepartment, selectDepartment } = useSlots();

  return (
    <Layout>
      {selectedDepartment ? (
        <TrackerView
          city={selectedDepartment.city}
          country={selectedDepartment.country}
          onBack={() => selectDepartment(null)}
        />
      ) : (
        <DepartmentsList onSelectDepartment={selectDepartment} />
      )}
    </Layout>
  );
};

export default MainPage;
