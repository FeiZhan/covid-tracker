// src/types/CovidData.ts
export interface CovidCountryData {
    continent: string;
    location: string;
    last_updated_date: string;
    total_cases: number;
    new_cases: number;
    total_deaths: number;
    new_deaths: number;
    total_cases_per_million: number;
    new_cases_per_million: number;
    total_deaths_per_million: number;
    population_density: number;
    median_age: number;
    aged_65_older: number;
    // Add more fields as needed
  }
  
  export interface CovidData {
    [countryCode: string]: CovidCountryData;
  }
  