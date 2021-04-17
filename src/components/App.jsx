import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

export default function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}
