import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface CovidData {
  iso_code: string;
  continent: string;
  location: string;
  date: string;
  total_cases: string;
  new_cases: string;
  new_cases_smoothed: string;
  total_deaths: string;
  new_deaths: string;
  new_deaths_smoothed: string;
  [key: string]: string;
}

const csvFilePath = path.join(__dirname, '../../../datasets/covid-19/public/data/owid-covid-data.csv');

// Function to read and filter the data based on query parameters
export const getCovidData = (req: any, res: any): void => {
  const { country, startDate, endDate } = req.query;

  const filteredData: CovidData[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row: any) => {
      const date = row.date;

      let include = true;

      // Filter by country if specified
      if (country && row.location !== country) {
        include = false;
      }

      // Filter by start date if specified
      if (startDate && new Date(date) < new Date(startDate)) {
        include = false;
      }

      // Filter by end date if specified
      if (endDate && new Date(date) > new Date(endDate)) {
        include = false;
      }

      // If conditions match, include this row in the response
      if (include) {
        filteredData.push(row);
      }
    })
    .on('end', () => {
      if (filteredData.length === 0) {
        return res.status(404).json({ message: 'No data found for the given filters.' });
      }
      res.status(200).json(filteredData);
    })
    .on('error', (err: Error) => {
      console.error('Error reading CSV file:', err);
      res.status(500).json({ message: 'Error reading CSV file' });
    });
};
