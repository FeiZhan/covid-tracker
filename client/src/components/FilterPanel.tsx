// components/FilterPanel.tsx
import React from 'react';
import CovidFilterForm from './CovidFilterForm';
import { ChartType } from '../types/ChartTypes';

type FilterPanelProps = {
  baselineFilters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  };
  comparisonFilters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  } | undefined;
  columns: string[];
  onBaselineFilterChange: (filters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }) => void;
  onComparisonFilterChange: (filters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }) => void;
  onSearch: (chartType: ChartType) => void;
  chartType: ChartType; // Receive chartType as a prop
  setChartType: (chartType: ChartType) => void; // Receive setter for chartType
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  baselineFilters,
  comparisonFilters,
  columns,
  onBaselineFilterChange,
  onComparisonFilterChange,
  onSearch,
  chartType,
  setChartType,
}) => {
  return (
    <div className="filter-panel">
      <h3>Baseline Filters</h3>
      <CovidFilterForm
        filters={baselineFilters}
        columns={columns}
        onFilterSubmit={onBaselineFilterChange}
        chartType={chartType} // Pass chartType to CovidFilterForm
        setChartType={setChartType} // Pass setChartType to modify it
      />
      <h3>Comparison Filters</h3>
      <CovidFilterForm
        filters={comparisonFilters || { country: '', startDate: '', endDate: '', selectedColumn: '' }}
        columns={columns}
        onFilterSubmit={onComparisonFilterChange}
        chartType={chartType} // Pass chartType to CovidFilterForm
        setChartType={setChartType} // Pass setChartType to modify it
        />

        {/* Chart Type Selection */}
        <div className="chart-type-selection">
          <label>
            Chart Type:
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
            >
              <option value={ChartType.LINE}>Line</option>
              <option value={ChartType.BAR}>Bar</option>
              <option value={ChartType.PIE}>Pie</option>
              <option value={ChartType.AREA}>Area</option>
              <option value={ChartType.RADAR}>Radar</option>
              <option value={ChartType.MAP}>Map</option>
            </select>
          </label>
        </div>
  
        {/* Search Button */}
      <button onClick={() => onSearch(chartType)}>Search</button>
    </div>
  );
};

export default FilterPanel;
