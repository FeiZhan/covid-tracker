import React, { useState } from 'react';
import CovidFilterForm from './CovidFilterForm';
import { ChartType } from '../types/ChartTypes';
import { Filter, columns } from '../types/FilterTypes'; // Import FilterTypes

type FilterPanelProps = {
  filters: Filter; // Now using Filter type for filters
  onFilterChange: (newFilters: Filter) => void; // Update filter change handler
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(filters.column); // Set initial state from filters

  const handleChartTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedChartType = event.target.value as ChartType;
    onFilterChange({
      ...filters,
      chartType: selectedChartType, // Update chart type
    });
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = event.target.value;
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
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
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
