import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const MovieContext = createContext();

// 🔐 Replace this with your real API key
const API_KEY = 'e0119b51c02fcbcb73d943b77cfc8c2a'; // ✅ Confirmed working format

export const MovieProvider = ({ children }) => {
  // Trending Movies State
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Movie Details
  const [movieDetails] = useState(null);

  // All / Popular Movies (Infinite Scroll)
  const [allMovies, setAllMovies] = useState([]);
  const [allMoviesLoading, setAllMoviesLoading] = useState(false);
  const [allMoviesError, setAllMoviesError] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity.desc',
  });

  // Load saved filters from localStorage on app load
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('movieFilters'));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  // Save filters to localStorage when changed
  useEffect(() => {
    localStorage.setItem('movieFilters', JSON.stringify(filters));
  }, [filters]);

  // ---- API CALLS ----

  // Fetch Trending Movies
  const fetchTrendingMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to load trending movies.');
      console.error('Trending Movies Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Movie Details by ID
  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      return data; // Return movie details
    } catch (err) {
      setError('Failed to load movie details.');
      console.error('Movie Details Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch Popular Movies for Infinite Scroll
  const fetchAllMovies = useCallback(async (page = 1) => {
    setAllMoviesLoading(true);
    setAllMoviesError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setAllMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies
    } catch (err) {
      setAllMoviesError('Failed to load more movies.');
      console.error('Popular Movies Error:', err);
    } finally {
      setAllMoviesLoading(false);
    }
  }, []);

  const resetPopularMovies = () => {
    setAllMovies([]);
  };

  // Fetch Filtered Movies
  const fetchFilteredMovies = async () => {
    const { genre, year, rating, sortBy } = filters; // Destructure filters
    setAllMovies([]); // Clear previous movies
    setAllMoviesLoading(true);
    setAllMoviesError(null);

    // Build the API URL dynamically based on filters
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;

    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
    if (rating) url += `&vote_average.gte=${rating}`;

    console.log('Fetching filtered movies with URL:', url); // Debugging line

    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log('Filtered Movies Response:', data); // Debugging line

      setAllMovies(data.results || []); // Update the movies state with filtered results
    } catch (err) {
      setAllMoviesError('Failed to load filtered movies.');
      console.error('Filtered Movies Error:', err);
    } finally {
      setAllMoviesLoading(false);
    }
  };

  // Fetch Movie Images by Movie ID
  const fetchMovieImages = async (movieId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDExOWI1MWMwMmZjYmNiNzNkOTQzYjc3Y2ZjOGMyYSIsIm5iZiI6MTc0NjY4Njc3MC41NzksInN1YiI6IjY4MWM1MzMyODUzYmM1Y2ZlMDg4YzExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDvb3X1AkMRX_mm5ZMv6KVpFQEwkcizdXl7zYDm6QZY',
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      return data.backdrops || []; // Return backdrops (or posters if needed)
    } catch (err) {
      setError('Failed to load movie images.');
      console.error('Movie Images Error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch Search Results
  const fetchSearchResults = async (query) => {
    if (!query) {
      setMovies([]); // Clear search results if query is empty
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.results.length === 0) {
        setError('No movies found for the given search query.');
      } else {
        setMovies(data.results); // Update the movies state with search results
      }
    } catch (err) {
      setError('Failed to fetch search results.');
      console.error('Search Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    fetchAllMovies, // Keep one instance
    fetchFilteredMovies, // Keep one instance
    // Remove or rename duplicates
  };

  return (
    <MovieContext.Provider
      value={{
        // Trending Movies
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,

        // Search
        searchQuery,
        setSearchQuery,

        // Movie Details
        movieDetails,

        // Popular Movies
        allMovies,
        allMoviesLoading,
        allMoviesError,
        fetchAllMovies,
        resetPopularMovies,

        // Filters
        filters,
        setFilters,
        fetchFilteredMovies,

        // API Functions
        fetchTrendingMovies,
        fetchMovieDetails,
        fetchAllMovies,
        fetchFilteredMovies,
        fetchMovieImages,
        fetchSearchResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const MovieImages = ({ movieId }) => {
  const { fetchMovieImages } = useContext(MovieContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching images for movieId:', movieId); // Debugging line
    const loadImages = async () => {
      const fetchedImages = await fetchMovieImages(movieId);
      console.log('Fetched Images:', fetchedImages); // Debugging line
      setImages(fetchedImages);
      setLoading(false);
    };

    loadImages();
  }, [movieId, fetchMovieImages]);

  if (loading) return <p>Loading images...</p>;
  if (images.length === 0)
    return (
      <div>
        <p>No images available for this movie.</p>
        <img
          src="https://via.placeholder.com/500x300?text=No+Image+Available"
          style={{ width: '200px', margin: '10px' }}
        />
      </div>
    );

  return (
    <div>
      {images.map((image, index) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500${image.file_path}`;
        console.log('Image URL:', imageUrl); // Debugging line
        return (
          <img
            key={index}
            src={imageUrl}
            style={{ width: '200px', margin: '10px' }}
          />
        );
      })}
    </div>
  );
};

export default MovieImages;