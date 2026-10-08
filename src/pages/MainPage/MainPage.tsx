import React from 'react';
import { Layout } from '@/components';
import { DepartmentsList } from '@/features/department';
import { TrackerView } from '@/features/tracker';
import { useSlots } from '@/context/SlotsContext';

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
