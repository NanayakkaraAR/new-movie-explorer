import React from 'react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300 ${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image ';

  return (
    <div className="movie-card" style={{
      backgroundColor: '#121936',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      transition: 'transform 0.3s ease',
    }}>
      <img src={posterUrl} alt={movie.title} />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ color: '#ffd700', margin: 0 }}>{movie.title}</h3>
        <p style={{ color: '#bbbbbb', fontSize: '0.9rem' }}>
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;