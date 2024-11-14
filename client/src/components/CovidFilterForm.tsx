// src/components/CovidFilterForm.tsx
import React, { useState } from 'react';

interface CovidFilterFormProps {
  onSubmit: (country: string, startDate: string, endDate: string) => void;
}

const CovidFilterForm: React.FC<CovidFilterFormProps> = ({ onSubmit }) => {
  const [country, setCountry] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (country && startDate && endDate) {
      onSubmit(country, startDate, endDate);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default CovidFilterForm;
