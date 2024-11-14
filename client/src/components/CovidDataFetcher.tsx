// src/components/CovidDataFetcher.tsx
import React, { useState } from 'react';
import CovidFilterForm from './CovidFilterForm';

const CovidDataFetcher: React.FC = () => {
  const [covidData, setCovidData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ country: '', startDate: '', endDate: '' });

  const fetchCovidData = async (country: string, startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/covid?country=${country}&startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch COVID data');
      }

      const data = await response.json();
      setCovidData(data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission and update filters
  const handleFilterSubmit = (country: string, startDate: string, endDate: string) => {
    setFilters({ country, startDate, endDate });
    fetchCovidData(country, startDate, endDate);
  };

  return (
    <div>
      <CovidFilterForm onSubmit={handleFilterSubmit} />

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {covidData && (
        <div>
          <h2>COVID Data for {filters.country}</h2>
          <pre>{JSON.stringify(covidData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CovidDataFetcher;
