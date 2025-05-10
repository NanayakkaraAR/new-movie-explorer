import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // Adjust the path if necessary
import './Home.css';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const {
    movies,
    loading,
    error,
    fetchTrendingMovies,
    allMovies,
    allMoviesLoading,
    allMoviesError,
    fetchAllMovies,
  } = useContext(MovieContext);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTrendingMovies();
        await fetchAllMovies(currentPage); // Fetch the first page of movies
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchData();
  }, [currentPage, fetchTrendingMovies, fetchAllMovies]); // Ensure dependencies are stable

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out
      console.log('Logout successful');
      navigate('/login'); // Redirect to the login page
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

  return (
    <div className="home">
      <header className="home-header">
       
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <div className="hero-header">
            <h1>Welcome to the Movie Explorer</h1>
          </div>
          <p>Search for your favorite movies and explore details</p>
          <SearchBar />
        </div>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <FilterBar />
      </section>

      {/* Trending Movies Section */}
      <section className="movies-section trending">
        <h2>Trending Now</h2>
        
        {error && <p className="error">{error}</p>}
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            !loading && <p>No trending movies found.</p>
          )}
        </div>
      </section>

      {/* All Movies Section */}
      <section className="movies-section all-movies">
        <h2>All Popular Movies</h2>
        {allMoviesError && <p className="error">{allMoviesError}</p>}
        <div className="movie-grid">
          {allMovies.length > 0 ? (
            allMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            !allMoviesLoading && <p>No movies found.</p>
          )}
        </div>
        {!allMoviesLoading && allMovies.length > 0 && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {allMoviesLoading && <p className="loading">Loading more movies...</p>}
      </section>
    </div>
  );
};

export default Home;