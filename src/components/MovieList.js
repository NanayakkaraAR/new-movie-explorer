import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const MovieList = () => {
  const { fetchTrendingMovies, movies, loading, error } = useContext(MovieContext);

  useEffect(() => {
    fetchTrendingMovies(); // Fetch trending movies when the component loads
  }, [fetchTrendingMovies]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: '10px' }}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '150px', cursor: 'pointer' }}
              />
            </Link>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;