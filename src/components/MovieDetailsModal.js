import React from 'react';
import './MovieDetailsModal.css';

const MovieDetailsModal = ({ movieDetails, onClose }) => {
  if (!movieDetails) return null;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <img src={posterUrl} alt={movieDetails.title} className="poster" />
          <div className="info">
            <h1>{movieDetails.title}</h1>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Rating:</strong> ⭐ {movieDetails.vote_average}/10</p>
            <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
            <p><strong>Genres:</strong> {movieDetails.genres.map((g) => g.name).join(', ')}</p>
          </div>
        </div>
        <div className="modal-overview">
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;