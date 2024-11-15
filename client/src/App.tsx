// App.tsx
import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import CovidDataDisplay from './components/CovidDataDisplay';
import './App.css';
import { ChartType } from './types/ChartTypes';

const App: React.FC = () => {
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
    chartType: ChartType.LINE,  // Default chart type for baseline
    selectedColumn: 'total_cases',
  });

  const [comparisonFilters, setComparisonFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  } | undefined>(undefined);

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
    chartType: ChartType;
    selectedColumn: string;
  }) => {
    setBaselineFilters(filters);
  };

  const handleComparisonFilterChange = (filters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  }) => {
    setComparisonFilters(filters);
  };

  const handleSearch = (chartType: ChartType) => {
    // Here we handle the search logic that triggers updates for data visualization.
    // Update the chartType for the baseline and/or comparison filters
    setBaselineFilters(prevFilters => ({
      ...prevFilters,
      chartType,  // Update chartType in baseline filters
    }));
    console.log('Search triggered with chart type:', chartType);
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
      />

      <CovidDataDisplay
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        chartType={baselineFilters.chartType}  // Pass chartType to CovidDataDisplay
      />
    </div>
  );
};

export default App;
