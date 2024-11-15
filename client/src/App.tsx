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

  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE);

  const columns = [
    'total_cases',
    'new_cases',
    'total_deaths',
    'new_deaths',
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

  return (
    <div className="App">
      <h1>COVID-19 Data Tracker</h1>
      <FilterPanel
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        columns={columns}
        onBaselineFilterChange={handleBaselineFilterChange}
        onComparisonFilterChange={handleComparisonFilterChange}
        chartType={chartType}
        setChartType={setChartType}
      />

      <CovidDataDisplay
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        chartType={chartType}
      />
    </div>
  );
};

export default App;
