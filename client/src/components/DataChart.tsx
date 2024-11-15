import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ColumnType from '../types/ColumnType';
import DataType from '../types/DataType';
import ChartType from '../types/ChartType';

type DataChartProps = {
  data1: DataType[];
  data2?: DataType[];
  chartType: ChartType;
  selectedColumn: ColumnType;
};

const DataChart: React.FC<DataChartProps> = ({ data1, data2, chartType, selectedColumn }) => {
  if (!data1 || data1.length === 0) {
    return <div>No data available for selected filters.</div>;
  }

  const isComparison = data2 && data2.length > 0;

  const transformData = (data: DataType[]) => {
    return data.map(item => ({
      name: item.date,
      value: isNaN(parseFloat(item[selectedColumn])) ? 0 : parseFloat(item[selectedColumn]),
    }));
  };

  const chartData1 = transformData(data1);
  const chartData2 = data2 ? transformData(data2) : [];

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
      return <div>Invalid chart type selected. Please choose a valid chart type.</div>;
  }
};

export default DataChart;
