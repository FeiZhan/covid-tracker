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
  }>({
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
  });

  const [comparisonFilters, setComparisonFilters] = useState<{
    country: string;
    startDate: string;
    endDate: string;
  } | undefined>(undefined);

  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE);
  const [selectedColumn, setSelectedColumn] = useState<string>('total_cases'); // Local state for selected column

  const columns = [
    'total_cases',
    'new_cases',
    'total_deaths',
    'new_deaths',
  ];

  // Function to handle baseline filter changes
  const handleBaselineFilterChange = (filters: {
    country: string;
    startDate: string;
    endDate: string;
  }) => {
    setBaselineFilters(filters);
  };

  // Function to handle comparison filter changes
  const handleComparisonFilterChange = (filters: {
    country: string;
    startDate: string;
    endDate: string;
  }) => {
    setComparisonFilters(filters);
  };

  // Function to handle chart type changes
  const handleChartTypeChange = (chartType: ChartType) => {
    setChartType(chartType);
  };

  // Function to handle column changes
  const handleColumnChange = (column: string) => {
    setSelectedColumn(column); // Update the selected column state
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
        onSearch={handleChartTypeChange} // Pass down chart type change handler
        onColumnChange={handleColumnChange} // Pass down column change handler
      />

      <CovidDataDisplay
        baselineFilters={baselineFilters}
        comparisonFilters={comparisonFilters}
        chartType={chartType} // Pass down the selected chartType
        selectedColumn={selectedColumn} // Pass the selected column to the display component
      />
    </div>
  );
};

export default App;
