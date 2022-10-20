import React from 'react';
import './App.css';
import MultFilter from './components/MultFilter';
import SearchFilters from './components/SearchFilters';
import Table from './components/Table';
import AppProvider from './Context/appProvider';

function App() {
  return (
    <AppProvider>
      <SearchFilters />
      <MultFilter />
      <Table />
    </AppProvider>
  );
}

export default App;
