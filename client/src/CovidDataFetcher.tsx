import React, { useEffect, useState } from 'react';
import { CovidData, CovidCountryData } from './types/CovidData'; // Import types

const CovidDataFetcher: React.FC = () => {
  const [covidData, setCovidData] = useState<CovidData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch function
    const fetchCovidData = async () => {
      try {
        // Fetch the JSON file
        const response = await fetch('/data/owid-covid-latest.json');
        if (!response.ok) {
          throw new Error('Failed to fetch COVID data');
        }

        const data: CovidData = await response.json(); // TypeScript infers the type here
        setCovidData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCovidData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extract the data for each country
  return (
    <div>
      <h1>COVID-19 Data by Country</h1>
      {covidData && Object.keys(covidData).length > 0 ? (
        <div>
          {Object.keys(covidData).map((countryCode) => {
            const country = covidData[countryCode]; // Get the country data
            return (
              <div key={countryCode}>
                <h3>{country.location} ({country.continent})</h3>
                <p>Total Cases: {country.total_cases}</p>
                <p>Total Deaths: {country.total_deaths}</p>
                <p>Total Cases per Million: {country.total_cases_per_million}</p>
                <p>Population Density: {country.population_density}</p>
                <p>Median Age: {country.median_age}</p>
                {/* Add other fields as necessary */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default CovidDataFetcher;
