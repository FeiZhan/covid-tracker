// src/App.tsx
import React from 'react';
import './App.css';
import CovidFilterForm from './CovidFilterForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <CovidFilterForm />
    </div>
  );
};

export default App;
