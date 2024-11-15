import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';
import WorldMap from './CovidWorldMap'; // Import the WorldMap component
import { ChartType } from '../types/ChartTypes';
import { DataItem } from '../types/DataItem'; // Import the DataItem type

type DataDisplayProps = {
  baselineFilters: {
    country: string;
    startDate: string;
    endDate: string;
  };
  comparisonFilters?: {
    country: string;
    startDate: string;
    endDate: string;
  }; // This filter is optional
  chartType: ChartType; // New value for chart type passed as a prop
  selectedColumn: string; // The selected column for displaying data
};

export const CovidDataDisplay: React.FC<DataDisplayProps> = ({
  baselineFilters,
  comparisonFilters,
  chartType, // Access the chartType prop here
  selectedColumn, // Access the selectedColumn prop
}) => {
  const [data1, setData1] = useState<DataItem[]>([]); // Data for the baseline (selected country)
  const [data2, setData2] = useState<DataItem[]>([]); // Data for the comparison (optional)
  const [loading, setLoading] = useState(false);

  // Fetch data for the baseline country
  useEffect(() => {
    if (baselineFilters.country && baselineFilters.startDate && baselineFilters.endDate) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${baselineFilters.country}&startDate=${baselineFilters.startDate}&endDate=${baselineFilters.endDate}`
      )
        .then((response) => response.json())
        .then((data: DataItem[]) => {
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
        .then((data: DataItem[]) => {
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
            <div className="card">Total Cases: {data1[data1.length - 1]?.total_cases || 0}</div>
            <div className="card">New Cases: {data1[data1.length - 1]?.new_cases || 0}</div>
            <div className="card">Total Deaths: {data1[data1.length - 1]?.total_deaths || 0}</div>
          </div>
          <div className="chart-placeholder">
            <h2>Data for {baselineFilters.country}</h2>
            {/* Render WorldMap if chartType is 'world_map' */}
            {chartType === ChartType.MAP ? (
              <WorldMap endDate={baselineFilters.endDate} column={selectedColumn} />
            ) : (
              <CovidChart
                data1={data1}
                data2={data2} // Pass comparison data (if available)
                chartType={chartType} // Pass the chartType directly from props
                selectedColumn={selectedColumn} // Column selected for display (e.g., total_cases)
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
