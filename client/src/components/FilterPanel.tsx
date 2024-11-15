// components/FilterPanel.tsx
import React, { useState } from 'react';
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
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  baselineFilters,
  comparisonFilters,
  columns,
  onBaselineFilterChange,
  onComparisonFilterChange,
  onSearch,
}) => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE);

  const handleChartTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedChartType = event.target.value as ChartType;
    setChartType(selectedChartType);
    onSearch(selectedChartType); // Trigger search with new chartType
  };

  return (
    <div>
      <CovidFilterForm
        filters={baselineFilters}
        columns={columns}
        onFilterSubmit={onBaselineFilterChange}
      />
      <h3>Comparison Filters</h3>
      <CovidFilterForm
        filters={comparisonFilters || { country: '', startDate: '', endDate: '', selectedColumn: '' }}
        columns={columns}
        onFilterSubmit={onComparisonFilterChange}
      />

        {/* Chart Type Selection */}
        <div className="chart-type-selection">
        <label>
          Chart Type:
          <select value={chartType} onChange={handleChartTypeChange}>
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
