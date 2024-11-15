// components/CovidFilterForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { ChartType } from '../types/ChartTypes';

type FilterProps = {
  filters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  };
  columns: string[];
  onFilterSubmit: (newFilters: {
    country: string;
    startDate: string;
    endDate: string;
    selectedColumn: string;
  }) => void;
  chartType: ChartType;
  setChartType: (chartType: ChartType) => void;
};

const CovidFilterForm: React.FC<FilterProps> = ({ filters, columns, onFilterSubmit, chartType, setChartType }) => {
  const [country, setCountry] = useState(filters.country);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);
  const [selectedColumn, setSelectedColumn] = useState(filters.selectedColumn);

  const handleChartTypeChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value as ChartType); // Update chartType via setter
  };

  const handleSubmit = () => {
    onFilterSubmit({ country, startDate, endDate, selectedColumn });
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
    handleSubmit(); // Update immediately when country changes
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    handleSubmit(); // Update immediately when start date changes
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    handleSubmit(); // Update immediately when end date changes
  };

  const handleSelectedColumnChange = (event: SelectChangeEvent<string>) => {
    setSelectedColumn(event.target.value);
    handleSubmit(); // Update immediately when column changes
  };

  return (
    <div className="filter-form">
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select value={country} onChange={handleCountryChange}>
          <MenuItem value="Afghanistan">Afghanistan</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="India">India</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Column</InputLabel>
        <Select value={selectedColumn} onChange={handleSelectedColumnChange}>
          {columns.map((column) => (
            <MenuItem key={column} value={column}>{column}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Chart Type</InputLabel>
        <Select value={chartType} onChange={handleChartTypeChange}>
          <MenuItem value={ChartType.LINE}>Line</MenuItem>
          <MenuItem value={ChartType.BAR}>Bar</MenuItem>
          <MenuItem value={ChartType.PIE}>Pie</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CovidFilterForm;
