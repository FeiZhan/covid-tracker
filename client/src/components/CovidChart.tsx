// src/components/CovidChart.tsx
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CovidData, CovidCountryData } from '../types/CovidData'; // Import types
import CovidWorldMap from './CovidWorldMap';
import { ChartType } from '../types/ChartTypes';

type CovidChartProps = {
  data: CovidData[];
  chartType: ChartType;
};

const CovidChart: React.FC<CovidChartProps> = ({ data, chartType }) => {
  switch (chartType) {
    case ChartType.LINE:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="new_cases" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    case ChartType.BAR:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="new_cases" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    case ChartType.MAP:
      return (<CovidWorldMap data={data[data.length - 1]} />);
    default:
      return <div>Select a chart type to display the data.</div>;
  }
};

export default CovidChart;
