// components/CovidFilterForm.tsx
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface FilterProps {
  onFilterSubmit: (filters: { country: string; startDate: string; endDate: string }) => void;
}

const CovidFilterForm: React.FC<FilterProps> = ({ onFilterSubmit }) => {
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    onFilterSubmit({ country, startDate, endDate });
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
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Search
      </Button>
    </div>
  );
};

export default CovidFilterForm;
