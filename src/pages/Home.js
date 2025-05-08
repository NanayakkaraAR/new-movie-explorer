import React, { useContext, useEffect } from 'react';
import './Home.css'; // We'll create this next
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { movies, loading, error, fetchTrendingMovies } = useContext(MovieContext);

  useEffect(() => {
    fetchTrendingMovies(); // Fetch trending movies on load
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the Movie Explorer</h1>
          <p>Search for your favorite movies and explore details</p>
          <SearchBar />
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="movies-section">
        <h2>Trending Movies</h2>
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            !loading && <p>No movies found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;