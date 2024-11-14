// App.tsx
import React, { useState } from 'react';
import CovidFilterForm from './components/CovidFilterForm';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';

const App: React.FC = () => {
  const [filters, setFilters] = useState<{ country: string; startDate: string; endDate: string; chartType: string }>({
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    chartType: 'line',
  });

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>
      <CovidFilterForm filters={filters} onFilterSubmit={setFilters} />
      <CovidDataDisplay filters={filters} />
    </div>
  );
};

export default App;
