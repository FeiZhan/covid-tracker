// App.tsx
import React, { useState } from 'react';
import CovidFilterForm from './components/CovidFilterForm';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import { ChartType } from './types/ChartTypes';

const App: React.FC = () => {
  // State for the two sets of filters
  const [baselineFilters, setBaselineFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  }>({
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    chartType: ChartType.LINE,
    selectedColumn: 'total_cases',
  });

  // State for the optional comparisonFilters
  const [comparisonFilters, setComparisonFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  } | undefined>(undefined); // comparisonFilters can be undefined

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
      <h2>Baseline Data</h2>
      <CovidFilterForm
        filters={baselineFilters}
        columns={columns}
        onFilterSubmit={setBaselineFilters} // Update baseline filters
      />
      
      <h2>Comparison Data (Optional)</h2>
      <CovidFilterForm
        filters={comparisonFilters || baselineFilters} // Default to baseline filters if comparison is undefined
        columns={columns}
        onFilterSubmit={setComparisonFilters} // Update comparison filters
      />
      
      <CovidDataDisplay baselineFilters={baselineFilters} comparisonFilters={comparisonFilters} />
    </div>
  );
};

export default App;
