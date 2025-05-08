import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  // ✅ Define fetchTrendingMovies before using it
  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY_HERE '
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to load trending movies.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Define fetchMovieDetails too
  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/ ${movieId}?api_key=YOUR_API_KEY_HERE`
      );
      const data = await res.json();
      setMovieDetails(data);
    } catch (err) {
      setError('Failed to load movie details.');
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
        movieDetails,
        fetchTrendingMovies, // ✅ Now it's defined!
        fetchMovieDetails,   // ✅ Defined and included
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};