import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import DataType from '../types/DataType'; // Import types
import ChartType from '../types/ChartType';

type CovidChartProps = {
  data1: DataType[]; // First dataset (can be used for comparison)
  data2?: DataType[]; // Second dataset (optional for comparison)
  chartType: ChartType;
  selectedColumn: string; // Data column to display
};

const CovidChart: React.FC<CovidChartProps> = ({ data1, data2, chartType, selectedColumn }) => {
  const isComparison = data2 && data2.length > 0; // Check if comparison data is provided

  // Map data1 and data2 into the format expected by the Bar and Line chart components
  const transformData = (data: DataType[]) => {
    return data.map(item => ({
      name: item.date, // Assuming 'date' is the date field, change this as per your data
      value: parseFloat(item[selectedColumn]), // Ensure value is a number
    }));
  };

  const chartData1 = transformData(data1);
  const chartData2 = data2 && data2.length ? transformData(data2) : [];

  switch (chartType) {
    case ChartType.LINE:
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Data"
            />
            {isComparison && (
              <Line
                type="monotone"
                data={chartData2}
                dataKey="value"
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
          <BarChart data={chartData1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Data" />
            {isComparison && (
              <Bar data={chartData2} dataKey="value" fill="#82ca9d" name="Comparison" />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    default:
      return <div>Select a chart type to display the data.</div>;
  }
};

export default CovidChart;
