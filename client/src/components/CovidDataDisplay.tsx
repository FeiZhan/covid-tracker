// components/CovidDataDisplay.tsx
import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';
import { ChartType } from '../types/ChartTypes';

type DataDisplayProps = {
  baselineFilters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string; // Column to display (e.g., new_cases, total_cases)
  };
  comparisonFilters?: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string; // Column to display (e.g., new_cases, total_cases)
  }; // This filter is optional
};

export const CovidDataDisplay: React.FC<DataDisplayProps> = ({
  baselineFilters,
  comparisonFilters,
}) => {
  const [data1, setData1] = useState<any[]>([]); // Data for the baseline (selected country)
  const [data2, setData2] = useState<any[]>([]); // Data for the comparison (optional)
  const [loading, setLoading] = useState(false);

  // Fetch data for the baseline country
  useEffect(() => {
    if (baselineFilters.country && baselineFilters.startDate && baselineFilters.endDate) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${baselineFilters.country}&startDate=${baselineFilters.startDate}&endDate=${baselineFilters.endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData1(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [baselineFilters]);

  // Fetch data for the comparison country (if provided)
  useEffect(() => {
    if (
      comparisonFilters?.country &&
      comparisonFilters.startDate &&
      comparisonFilters.endDate
    ) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${comparisonFilters.country}&startDate=${comparisonFilters.startDate}&endDate=${comparisonFilters.endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData2(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [comparisonFilters]);

  return (
    <div className="data-display">
      {loading && <p>Loading data...</p>}
      {!loading && data1.length === 0 && baselineFilters.country && <p>No data available for selected filters.</p>}
      {!loading && data1.length > 0 && (
        <>
          <div className="summary-cards">
            <div className="card">Total Cases: {data1[0]?.total_cases || 0}</div>
            <div className="card">New Cases: {data1[0]?.new_cases || 0}</div>
            <div className="card">Total Deaths: {data1[0]?.total_deaths || 0}</div>
          </div>
          <div className="chart-placeholder">
            <h2>Data for {baselineFilters.country}</h2>
            {/* Pass data1 and data2 to CovidChart */}
            <CovidChart
              data1={data1}
              data2={data2} // Pass comparison data (if available)
              chartType={baselineFilters.chartType}
              selectedColumn={baselineFilters.selectedColumn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
