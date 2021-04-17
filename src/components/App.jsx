import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import HomeMain from './HomeMain';

export default function App() {
  return (
    <Router>
      <Header />
      <HomeMain />
    </Router>
  );
}
