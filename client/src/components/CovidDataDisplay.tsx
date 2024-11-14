// components/CovidDataDisplay.tsx
import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';

interface CovidDataDisplayProps {
  filters: { country: string; startDate: string; endDate: string };
}

const CovidDataDisplay: React.FC<CovidDataDisplayProps> = ({ filters }) => {
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
            <CovidChart data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
