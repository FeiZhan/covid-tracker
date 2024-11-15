// components/CovidFilterForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ChartType } from '../types/ChartTypes';

type FilterProps = {
  filters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
  };
  onFilterSubmit: (newFilters: {
    country: string;
    startDate: string;
    endDate: string;
    chartType: ChartType;
  }) => void;
};

const CovidFilterForm: React.FC<FilterProps> = ({ filters, onFilterSubmit }) => {
  const [country, setCountry] = useState(filters.country);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);
  const [chartType, setChartType] = useState(filters.chartType);
  const handleChartTypeChange = (event: ChangeEvent<HTMLSelectElement>) => setChartType(event.target.value as ChartType);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilterSubmit({ country, startDate, endDate, chartType });
  };

  return (
    <div className="filter-form">
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select value={country} onChange={(e) => setCountry(e.target.value as string)}>
          <MenuItem value="Afghanistan">Afghanistan</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="India">India</MenuItem>
          {/* Add more countries as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <label>
        Chart Type:
        <select value={chartType} onChange={handleChartTypeChange}>
          <option value={ChartType.LINE}>{ChartType.LINE}</option>
          <option value={ChartType.BAR}>{ChartType.BAR}</option>
          <option value={ChartType.PIE}>{ChartType.PIE}</option>
          <option value={ChartType.AREA}>{ChartType.AREA}</option>
          <option value={ChartType.RADAR}>{ChartType.RADAR}</option>
          <option value={ChartType.MAP}>{ChartType.MAP}</option>
        </select>
      </label>
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Search
      </Button>
    </div>
  );
};

export default CovidFilterForm;
