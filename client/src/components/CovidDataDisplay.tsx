import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';
import WorldMap from './CovidWorldMap'; // Import the WorldMap component
import ChartType from '../types/ChartType';
import DataType from '../types/DataType'; // Import the DataItem type
import FilterType from '../types/FilterType'; // Import the Filter type

type DataDisplayProps = {
  filters: FilterType; // Expect the entire filters object
  onFilterChange: React.Dispatch<React.SetStateAction<FilterType>>; // Setter for filters object
};

export const CovidDataDisplay: React.FC<DataDisplayProps> = ({
  filters,
  onFilterChange, // Access setter for filters
}) => {
  const [data1, setData1] = useState<DataType[]>([]); // Data for the baseline (selected country)
  const [data2, setData2] = useState<DataType[]>([]); // Data for the comparison (optional)
  const [loading, setLoading] = useState(false);

  // Destructure filters into baseline and comparison filters
  const { baselineFilter, comparisonFilter, chartType, column } = filters;

  // Fetch data for the baseline country
  useEffect(() => {
    if (baselineFilter.country && baselineFilter.startDate && baselineFilter.endDate) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${baselineFilter.country}&startDate=${baselineFilter.startDate}&endDate=${baselineFilter.endDate}`
      )
        .then((response) => response.json())
        .then((data: DataType[]) => {
          setData1(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [baselineFilter]);

  // Fetch data for the comparison country (if provided)
  useEffect(() => {
    if (comparisonFilter?.country && comparisonFilter.startDate && comparisonFilter.endDate) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/covid?country=${comparisonFilter.country}&startDate=${comparisonFilter.startDate}&endDate=${comparisonFilter.endDate}`
      )
        .then((response) => response.json())
        .then((data: DataType[]) => {
          setData2(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [comparisonFilter]);

  // Handler to update the baseline country filter
  const handleCountrySelect = (countryName: string) => {
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      baselineFilter: { ...prevFilters.baselineFilter, country: countryName },
    }));
  };

  return (
    <div className="data-display">
      {loading && <p>Loading data...</p>}
      {!loading && data1.length === 0 && baselineFilter.country && <p>No data available for selected filters.</p>}
      {!loading && data1.length > 0 && (
        <>
          <div className="summary-cards">
            <div className="card">Total Cases: {data1[data1.length - 1]?.total_cases || 0}</div>
            <div className="card">New Cases: {data1[data1.length - 1]?.new_cases || 0}</div>
            <div className="card">Total Deaths: {data1[data1.length - 1]?.total_deaths || 0}</div>
          </div>
          <div className="chart-placeholder">
            <h2>Data for {baselineFilter.country}</h2>
            {/* Render WorldMap if chartType is 'world_map' */}
            {chartType === ChartType.MAP ? (
              <WorldMap
                endDate={baselineFilter.endDate}
                column={column}
                onCountrySelect={handleCountrySelect} // Pass handler to WorldMap
              />
            ) : (
              <CovidChart
                data1={data1}
                data2={data2} // Pass comparison data (if available)
                chartType={chartType} // Pass the chartType directly from props
                selectedColumn={column} // Column selected for display (e.g., total_cases)
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
