import ChartType from './ChartType';

export const Columns = [
  'total_cases',
  'new_cases',
  'total_deaths',
  'new_deaths',
];

type BaseFilterType = {
  country: string;
  startDate: string;
  endDate: string;
};

// Defining types for each filter and configuration
type Filter = {
  baselineFilter: BaseFilterType;
  comparisonFilter: BaseFilterType;
  chartType: ChartType;  // Example chart types
  column: string;  // Column to display in the chart (e.g., 'cases', 'deaths')
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
  column: Columns[0], // Example column
};

export default Filter;
