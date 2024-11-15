import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import FilterType, { defaultFilter } from './types/FilterType';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>(defaultFilter);

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>
      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
      />
      <CovidDataDisplay
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};

export default App;
