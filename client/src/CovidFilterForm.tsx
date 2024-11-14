// src/CovidFilterForm.tsx
import React, { useState } from 'react';
import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';

const CovidFilterForm: React.FC = () => {
  const [country, setCountry] = useState('');
  const [demographic, setDemographic] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    const filters = { country, demographic, startDate, endDate };
    console.log('Selected Filters:', filters);
    // You can also handle the logic for using the filters here
  };

  return (
    <div>
      <h2>Covid Filter Form</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          onChange={(e) => setCountry(e.target.value as string)}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Demographic</InputLabel>
        <Select
          value={demographic}
          onChange={(e) => setDemographic(e.target.value as string)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Start Date"
        type="date"
        fullWidth
        margin="normal"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="End Date"
        type="date"
        fullWidth
        margin="normal"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
    </div>
  );
};

export default CovidFilterForm;
