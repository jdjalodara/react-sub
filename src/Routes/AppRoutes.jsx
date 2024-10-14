import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Components/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
