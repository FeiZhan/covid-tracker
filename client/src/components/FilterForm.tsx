import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

type FilterProps = {
  filters: {
    country: string;
    startDate: string;
    endDate: string;
  };
  onFilterSubmit: (newFilters: {
    country: string;
    startDate: string;
    endDate: string;
  }) => void;
};

const FilterForm: React.FC<FilterProps> = ({ filters, onFilterSubmit }) => {
  const [country, setCountry] = useState(filters.country);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);

  // Sync state with incoming filters when they change
  useEffect(() => {
    setCountry(filters.country);
    setStartDate(filters.startDate); // Fix: update startDate on filter change
    setEndDate(filters.endDate); // Fix: update endDate on filter change
  }, [filters]);

  // Validate the date format (optional but recommended)
  const validateDate = (date: string) => {
    return date && !isNaN(Date.parse(date)); // Simple date validation
  };

  const handleSubmit = () => {
    // Handle submit only if dates are valid
    if (validateDate(startDate) && validateDate(endDate)) {
      onFilterSubmit({ country, startDate, endDate });
    } else {
      console.error("Invalid date format");
    }
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  // Handle submit on form submission, not on every change
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="filter-form">
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
        required
      />

      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FilterForm;
