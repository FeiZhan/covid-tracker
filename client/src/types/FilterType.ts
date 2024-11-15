import ChartType from './ChartType';

// Enum for Columns
export enum ColumnType {
  TOTAL_CASES = 'total_cases',
  NEW_CASES = 'new_cases',
  TOTAL_DEATHS = 'total_deaths',
  NEW_DEATHS = 'new_deaths',
}

// BaseFilterType definition
type BaseFilterType = {
  country: string;
  startDate: string;
  endDate: string;
};

// Defining types for each filter and configuration
type Filter = {
  baselineFilter: BaseFilterType;
  comparisonFilter: BaseFilterType;
  chartType: ChartType;  // Chart type enum
  column: ColumnType;  // Column enum instead of string
};

// Example for default filter state
export const defaultFilter: Filter = {
  baselineFilter: {
    country: 'Afghanistan',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
  },
  comparisonFilter: {
    country: 'India',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
  },
  chartType: ChartType.LINE,
  column: ColumnType.TOTAL_CASES, // Use enum value here
};

export default Filter;
