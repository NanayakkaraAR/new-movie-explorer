import React, { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import './MovieCard.css';
import MovieDetailsModal from './MovieDetailsModal'; // Import the modal component

const MovieCard = ({ movie }) => {
  const { fetchMovieDetails } = useContext(MovieContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const handleCardClick = async () => {
    const details = await fetchMovieDetails(movie.id); // Fetch movie details
    setMovieDetails(details);
    setIsModalOpen(true); // Open the modal
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
      </div>

      {isModalOpen && (
        <MovieDetailsModal
          movieDetails={movieDetails}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </>
  );
};

export default MovieCard;