// App.tsx
import React, { useState } from 'react';
import CovidFilterForm from './components/CovidFilterForm';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import { ChartType } from './types/ChartTypes';

const App: React.FC = () => {
  const [filters, setFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string; // Added selected column to filters
  }>({
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    chartType: ChartType.LINE,
    selectedColumn: 'total_cases', // Default column
  });

  const columns = [
    'total_cases',
    'new_cases',
    'total_deaths',
    'new_deaths',
    // Add more columns as needed
  ];

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>
      <CovidFilterForm
        filters={filters}
        columns={columns} // Pass available columns to the form
        onFilterSubmit={setFilters}
      />
      <CovidDataDisplay filters={filters} />
    </div>
  );
};

export default App;
