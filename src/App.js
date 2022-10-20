import React from 'react';
import './App.css';
import SearchFilters from './components/SearchFilters';
import Table from './components/Table';
import AppProvider from './Context/appProvider';

function App() {
  return (
    <AppProvider>
      <SearchFilters />
      <Table />
    </AppProvider>
  );
}

export default App;
