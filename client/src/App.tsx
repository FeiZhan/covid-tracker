import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import { Filter, defaultFilter } from './types/FilterTypes'; // Import Filter and defaultFilter

const App: React.FC = () => {
  // Use the Filter type and initialize with defaultFilter
  const [filters, setFilters] = useState<Filter>(defaultFilter);

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>

      {/* Pass entire filters object to FilterPanel */}
      <FilterPanel
        filters={filters} // Passing the whole filter object
        onFilterChange={setFilters} // Directly pass setFilters as it matches the expected type
      />

      {/* Pass filters to CovidDataDisplay */}
      <CovidDataDisplay
        filters={filters} // Pass filters to data display component
        onFilterChange={setFilters} // Directly pass setFilters as it matches the expected type
      />
    </div>
  );
};

export default App;
