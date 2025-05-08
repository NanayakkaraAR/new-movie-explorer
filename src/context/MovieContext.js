import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY ');
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to load trending movies.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchQuery,
        setSearchQuery,
        loading,
        setLoading,
        error,
        setError,
        fetchTrendingMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};