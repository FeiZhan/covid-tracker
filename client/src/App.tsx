// src/App.tsx
import React from 'react';
import './App.css';
import CovidDataFetcher from './components/CovidDataFetcher';

const App: React.FC = () => {
  return (
    <div className="App">
      <CovidDataFetcher />
    </div>
  );
};

export default App;
