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

      <div className="column-selection">
        <label htmlFor="column-select">Select Column:</label>
        <select id="column-select" value={filters.column} onChange={handleColumnChange}>
          {(Object.values(ColumnType) as ColumnType[]).map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      <CovidFilterForm
        filters={filters.baselineFilter ?? { country: '', startDate: '', endDate: '' }}
        onFilterSubmit={handleBaselineFilterChange}
      />

      <h3>Comparison Filters</h3>
      <CovidFilterForm
        filters={filters.comparisonFilter ?? { country: '', startDate: '', endDate: '' }}
        onFilterSubmit={handleComparisonFilterChange}
      />

      <div className="chart-type-selection">
        <label htmlFor="chart-type-select">Chart Type:</label>
        <select id="chart-type-select" value={filters.chartType} onChange={handleChartTypeChange}>
          {(Object.values(ChartType) as ChartType[]).map((chart) => (
            <option key={chart} value={chart}>
              {chart}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
