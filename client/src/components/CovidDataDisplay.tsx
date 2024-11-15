import React, { useEffect, useState } from 'react';
import CovidChart from './CovidChart';
import WorldMap from './CovidWorldMap';
import ChartType from '../types/ChartType';
import DataType from '../types/DataType';
import FilterType from '../types/FilterType';

type DataDisplayProps = {
  filters: FilterType;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const CovidDataDisplay: React.FC<DataDisplayProps> = ({
  filters,
  onFilterChange,
}) => {
  const [data1, setData1] = useState<DataType[]>([]);
  const [data2, setData2] = useState<DataType[]>([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { baselineFilter, comparisonFilter, chartType, column } = filters;

  useEffect(() => {
    if (baselineFilter.country && baselineFilter.startDate && baselineFilter.endDate) {
      setLoading1(true);
      fetch(
        `http://localhost:5000/api/covid?country=${baselineFilter.country}&startDate=${baselineFilter.startDate}&endDate=${baselineFilter.endDate}`
      )
        .then((response) => response.json())
        .then((data: DataType[]) => {
          setData1(data);
          setLoading1(false);
        })
        .catch(() => setLoading1(false));
    }
  }, [baselineFilter]);

  useEffect(() => {
    if (comparisonFilter?.country && comparisonFilter.startDate && comparisonFilter.endDate) {
      setLoading2(true);
      fetch(
        `http://localhost:5000/api/covid?country=${comparisonFilter.country}&startDate=${comparisonFilter.startDate}&endDate=${comparisonFilter.endDate}`
      )
        .then((response) => response.json())
        .then((data: DataType[]) => {
          setData2(data);
          setLoading2(false);
        })
        .catch(() => setLoading2(false));
    }
  }, [comparisonFilter]);

  const handleCountrySelect = (countryName: string) => {
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      baselineFilter: { ...prevFilters.baselineFilter, country: countryName },
    }));
  };

  const latestData = data1[data1.length - 1] || {};

  return (
    <div className="data-display">
      {loading1 || loading2 ? (
        <p>Loading data...</p>
      ) : data1.length === 0 && baselineFilter.country ? (
        <p>No data available for selected filters.</p>
      ) : (
        <>
          <div className="summary-cards">
            <div className="card">Total Cases: {latestData.total_cases || 0}</div>
            <div className="card">New Cases: {latestData.new_cases || 0}</div>
            <div className="card">Total Deaths: {latestData.total_deaths || 0}</div>
          </div>
          <div className="chart-placeholder">
            <h2>Data for {baselineFilter.country}</h2>
            {chartType === ChartType.MAP ? (
              <WorldMap
                endDate={baselineFilter.endDate}
                column={column}
                onCountrySelect={handleCountrySelect}
              />
            ) : (
              <CovidChart
                data1={data1}
                data2={data2}
                chartType={chartType}
                selectedColumn={column}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataDisplay;
