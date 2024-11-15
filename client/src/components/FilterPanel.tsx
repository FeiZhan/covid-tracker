// components/FilterPanel.tsx
import React, { useState } from 'react';
import { ChartType } from '../types/ChartTypes';
import CovidFilterForm from './CovidFilterForm';

type FilterPanelProps = {
  baselineFilters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  };
  comparisonFilters?: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  };
  columns: string[];
  onBaselineFilterChange: (filters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  }) => void;
  onComparisonFilterChange: (filters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string;
  }) => void;
  onSearch: (chartType: ChartType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  baselineFilters,
  comparisonFilters,
  columns,
  onBaselineFilterChange,
  onComparisonFilterChange,
  onSearch
}) => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE);

  const handleSearch = () => {
    onSearch(chartType);
  };

  return (
    <div className="filter-panel">
      <h2>Baseline Data</h2>
      <CovidFilterForm
        filters={baselineFilters}
        columns={columns}
        onFilterSubmit={onBaselineFilterChange}
      />

      <h2>Comparison Data (Optional)</h2>
      <CovidFilterForm
        filters={comparisonFilters || baselineFilters} // Default to baseline if comparison is undefined
        columns={columns}
        onFilterSubmit={onComparisonFilterChange}
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FilterPanel;
