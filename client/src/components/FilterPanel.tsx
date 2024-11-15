import React, { useState } from 'react';
import CovidFilterForm from './CovidFilterForm';
import ChartType from '../types/ChartType';
import FilterType, { ColumnType } from '../types/FilterType'; // Import FilterTypes with Column enum

type FilterPanelProps = {
  filters: FilterType; // Now using Filter type for filters
  onFilterChange: (newFilters: FilterType) => void; // Update filter change handler
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<ColumnType>(filters.column); // Use Column enum for selectedColumn

  const handleChartTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedChartType = event.target.value as ChartType;
    onFilterChange({
      ...filters,
      chartType: selectedChartType, // Update chart type
    });
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value as ColumnType; // Ensure column is of type Column enum
    setSelectedColumn(column); // Update the selected column state
    onFilterChange({
      ...filters,
      column, // Update column in filters
    });
  };

  const handleBaselineFilterChange = (newBaselineFilter: { country: string; startDate: string; endDate: string }) => {
    onFilterChange({
      ...filters,
      baselineFilter: newBaselineFilter, // Update baseline filter
    });
  };

  const handleComparisonFilterChange = (newComparisonFilter: { country: string; startDate: string; endDate: string }) => {
    onFilterChange({
      ...filters,
      comparisonFilter: newComparisonFilter, // Update comparison filter
    });
  };

  return (
    <div>
      <h3>Filters</h3>

      {/* Column Selection */}
      <div className="column-selection">
        <label>
          Select Column:
          <select
            value={selectedColumn}
            onChange={handleColumnChange}
          >
            {Object.values(ColumnType).map((column) => ( // Map over enum values
              <option key={column} value={column}>
                {column} {/* Display enum value */}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Baseline Filters */}
      <CovidFilterForm
        filters={filters.baselineFilter} // Pass baseline filters directly
        onFilterSubmit={handleBaselineFilterChange}
      />

      <h3>Comparison Filters</h3>
      {/* Comparison Filters */}
      <CovidFilterForm
        filters={filters.comparisonFilter} // Pass comparison filters directly
        onFilterSubmit={handleComparisonFilterChange}
      />

      {/* Chart Type Selection */}
      <div className="chart-type-selection">
        <label>
          Chart Type:
          <select value={filters.chartType} onChange={handleChartTypeChange}>
            <option value={ChartType.LINE}>{ChartType.LINE}</option>
            <option value={ChartType.BAR}>{ChartType.BAR}</option>
            <option value={ChartType.MAP}>{ChartType.MAP}</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
