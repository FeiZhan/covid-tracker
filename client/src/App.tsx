// App.tsx
import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import { ChartType } from './types/ChartTypes';

const App: React.FC = () => {
  // Remove chartType from the filters; manage it separately
  const [baselineFilters, setBaselineFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }>({
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    selectedColumn: 'total_cases',
  });

  const [comparisonFilters, setComparisonFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  } | undefined>(undefined);

  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE); // Global chartType

  const columns = [
    'total_cases',
    'new_cases',
    'total_deaths',
    'new_deaths',
    // Add more columns as needed
  ];

  const handleBaselineFilterChange = (filters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }) => {
    setBaselineFilters(filters);
  };

  const handleComparisonFilterChange = (filters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }) => {
    setComparisonFilters(filters);
  };

  const handleSearch = (newChartType: ChartType) => {
    // Update the global chartType
    setChartType(newChartType);
    console.log('Search triggered with chart type:', newChartType);
  };

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>
      <FilterPanel
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        columns={columns}
        onBaselineFilterChange={handleBaselineFilterChange}
        onComparisonFilterChange={handleComparisonFilterChange}
        onSearch={handleSearch}
        chartType={chartType} // Pass chartType to FilterPanel
        setChartType={setChartType} // Pass setChartType to modify it from FilterPanel
      />

      <CovidDataDisplay
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        chartType={chartType}  // Pass chartType to CovidDataDisplay
      />
    </div>
  );
};

export default App;
