import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DataType from '../types/DataType';

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
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCountry(filters.country);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
  }, [filters]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/covid?column=location&endDate=2020-01-05`);
        if (!response.ok) {
          throw new Error('Error fetching countries');
        }
        const data = await response.json();
        const countrySet = new Set<string>(data.map((item: DataType) => item.location));
        setCountries(Array.from(countrySet));
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const validateDate = (date: string) => {
    return date && !isNaN(Date.parse(date)); // Simple date validation
  };

  const handleSubmit = () => {
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

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="filter-form">
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select value={country} onChange={handleCountryChange}>
          {loading ? (
            <MenuItem disabled>Loading countries...</MenuItem>
          ) : (
            countries.map((countryName) => (
              <MenuItem key={countryName} value={countryName}>
                {countryName}
              </MenuItem>
            ))
          )}
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
