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
    chartType: ChartType.LINE,
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
    // This is where you handle the search logic,
    // which could include triggering updates for data visualization with the chart type applied
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

      <CovidDataDisplay baselineFilters={baselineFilters} comparisonFilters={comparisonFilters} />
    </div>
  );
};

export default App;
