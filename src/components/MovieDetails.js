import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get movie ID from URL
  const { fetchMovieDetails, movieDetails, loading, error } = useContext(MovieContext);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id); // Fetch movie data by ID
    }
  }, [id, fetchMovieDetails]);

  if (loading) return <p className="loading">Loading movie details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movieDetails) return <p>No movie found.</p>;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img src={posterUrl} alt={movieDetails.title} className="poster" />
        <div className="info">
          <h1>{movieDetails.title}</h1>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movieDetails.vote_average}/10</p>
          <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
          <p><strong>Genres:</strong> {movieDetails.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className="overview">
        <h2>Overview</h2>
        <p>{movieDetails.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;