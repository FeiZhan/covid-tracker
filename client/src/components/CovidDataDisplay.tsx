// components/CovidDataDisplay.tsx
import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';
import { ChartType } from '../types/ChartTypes';

type DataDisplayProps = {
  filters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
    selectedColumn: string; // New property for selected data column
  };
};

export const CovidDataDisplay: React.FC<DataDisplayProps> = ({ filters }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filters.country && filters.startDate && filters.endDate) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${filters.country}&startDate=${filters.startDate}&endDate=${filters.endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [filters]);

  return (
    <div className="data-display">
      {loading && <p>Loading data...</p>}
      {!loading && data.length === 0 && filters.country && <p>No data available for selected filters.</p>}
      {!loading && data.length > 0 && (
        <>
          <div className="summary-cards">
            <div className="card">Total Cases: {data[0]?.total_cases || 0}</div>
            <div className="card">New Cases: {data[0]?.new_cases || 0}</div>
            <div className="card">Total Deaths: {data[0]?.total_deaths || 0}</div>
          </div>
          <div className="chart-placeholder">
            <h2>Data for {filters.country}</h2>
            {/* Pass the selected column to CovidChart */}
            <CovidChart data={data} chartType={filters.chartType} selectedColumn={filters.selectedColumn} />
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
