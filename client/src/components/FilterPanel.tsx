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
  chartType: ChartType;
  setChartType: (chartType: ChartType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  baselineFilters,
  comparisonFilters,
  columns,
  onBaselineFilterChange,
  onComparisonFilterChange,
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
        chartType={chartType}
        setChartType={setChartType}
      />
      <h3>Comparison Filters</h3>
      <CovidFilterForm
        filters={comparisonFilters || { country: '', startDate: '', endDate: '', selectedColumn: '' }}
        columns={columns}
        onFilterSubmit={onComparisonFilterChange}
        chartType={chartType}
        setChartType={setChartType}
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
    </div>
  );
};

export default FilterPanel;
