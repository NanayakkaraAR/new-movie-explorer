import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext'; // ✅ Import Provider

import Home from './pages/Home';

function App() {
  return (
    <MovieProvider> {/* 🔥 Wrap your app here */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;