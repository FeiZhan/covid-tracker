import React from 'react';
import CovidFilterForm from './CovidFilterForm';
import ChartType from '../types/ChartType';
import FilterType, { ColumnType } from '../types/FilterType';

type FilterPanelProps = {
  filters: FilterType;
  onFilterChange: (newFilters: FilterType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      chartType: event.target.value as ChartType,
    });
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      column: event.target.value as ColumnType,
    });
  };

  const handleBaselineFilterChange = (newBaselineFilter: { country: string; startDate: string; endDate: string }) => {
    onFilterChange({
      ...filters,
      baselineFilter: newBaselineFilter,
    });
  };

  const handleComparisonFilterChange = (newComparisonFilter: { country: string; startDate: string; endDate: string }) => {
    onFilterChange({
      ...filters,
      comparisonFilter: newComparisonFilter,
    });
  };

  return (
    <div>
      <h3>Filters</h3>

      {/* Column Selection */}
      <div className="column-selection">
        <label>
          Select Column:
          <select value={filters.column} onChange={handleColumnChange}>
            {Object.values(ColumnType).map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Baseline Filters */}
      <CovidFilterForm
        filters={filters.baselineFilter || { country: '', startDate: '', endDate: '' }}
        onFilterSubmit={handleBaselineFilterChange}
      />

      <h3>Comparison Filters</h3>
      {/* Comparison Filters */}
      <CovidFilterForm
        filters={filters.comparisonFilter || { country: '', startDate: '', endDate: '' }}
        onFilterSubmit={handleComparisonFilterChange}
      />

      {/* Chart Type Selection */}
      <div className="chart-type-selection">
        <label>
          Chart Type:
          <select value={filters.chartType} onChange={handleChartTypeChange}>
            {Object.values(ChartType).map((chart) => (
              <option key={chart} value={chart}>
                {chart}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
