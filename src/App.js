import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home'; // Home page component
import MovieDetails from './components/MovieDetails'; // Movie details component

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/movie/:movieId" element={<MovieDetails />} /> {/* Movie details page */}
        </Routes>
      </Router>
    </MovieProvider>
  );
};

export default App;