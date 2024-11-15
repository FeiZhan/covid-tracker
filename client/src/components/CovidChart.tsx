// src/components/CovidChart.tsx
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CovidData } from '../types/DataItem'; // Import types
import CovidWorldMap from './CovidWorldMap';
import { ChartType } from '../types/ChartTypes';

type CovidChartProps = {
  data1: CovidData[]; // First dataset (can be used for comparison)
  data2?: CovidData[]; // Second dataset (optional for comparison)
  chartType: ChartType;
  selectedColumn: string; // Data column to display
};

const CovidChart: React.FC<CovidChartProps> = ({ data1, data2, chartType, selectedColumn }) => {
  const isComparison = data2 && data2.length > 0; // Check if comparison data is provided

  switch (chartType) {
    case ChartType.LINE:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Render line for the first dataset */}
            <Line
              type="monotone"
              dataKey={selectedColumn}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Data"
            />
            {/* If comparison data is provided, render a second line */}
            {isComparison && (
              <Line
                type="monotone"
                data={data2}
                dataKey={selectedColumn}
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Comparison"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    case ChartType.BAR:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Render bars for the first dataset */}
            <Bar dataKey={selectedColumn} fill="#8884d8" name="Data" />
            {/* If comparison data is provided, render a second bar */}
            {isComparison && (
              <Bar data={data2} dataKey={selectedColumn} fill="#82ca9d" name="Comparison" />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    case ChartType.MAP:
      return (
        <CovidWorldMap
          data={{
            baseline: data1[data1.length - 1],
            comparison: isComparison ? data2[data2.length - 1] : null,
          }}
        />
      );
    default:
      return <div>Select a chart type to display the data.</div>;
  }
};

export default CovidChart;
