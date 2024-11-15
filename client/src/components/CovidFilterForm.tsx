// components/CovidFilterForm.tsx
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
  chartType: ChartType; // Receive chartType as prop
  setChartType: (chartType: ChartType) => void; // Receive setter for chartType
};

const CovidFilterForm: React.FC<FilterProps> = ({ filters, columns, onFilterSubmit, chartType, setChartType }) => {
  const [country, setCountry] = useState(filters.country);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);
  const [selectedColumn, setSelectedColumn] = useState(filters.selectedColumn);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilterSubmit({ country, startDate, endDate, selectedColumn });
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

      <FormControl fullWidth margin="normal">
        <InputLabel>Data Column</InputLabel>
        <Select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value as string)}>
          {columns.map((column) => (
            <MenuItem key={column} value={column}>
              {column.replace(/_/g, ' ')} {/* Format column names if needed */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Search
      </Button>
    </div>
  );
};

export default CovidFilterForm;
