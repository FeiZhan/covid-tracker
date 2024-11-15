import { ChartType } from './ChartTypes';

export const columns = [
    'total_cases',
    'new_cases',
    'total_deaths',
    'new_deaths',
  ];

// Defining types for each filter and configuration
export type Filter = {
    baselineFilter: {
      country: string;
      startDate: string;
      endDate: string;
    };
    comparisonFilter: {
      country: string;
      startDate: string;
      endDate: string;
    };
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
    column: 'total_cases', // Example column
  };
  