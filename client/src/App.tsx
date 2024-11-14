// App.tsx
import React, { useState } from 'react';
import CovidFilterForm from './components/CovidFilterForm';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';

const App: React.FC = () => {
  const [filters, setFilters] = useState<{ country: string; startDate: string; endDate: string }>({
    country: '',
    startDate: '',
    endDate: '',
  });

  return (
    <div className="App">
      <h1>Covid Tracking and Comparison</h1>
      <CovidFilterForm onFilterSubmit={setFilters} />
      <CovidDataDisplay filters={filters} />
    </div>
  );
};

export default App;
