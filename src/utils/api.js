// utils/api.js
import axios from 'axios'; // Add this import at the top of the file

const API_KEY = 'your_tmdb_api_key';
const BASE_URL = 'https://api.themoviedb.org/3 ';

export const fetchTrendingMovies = async () => {
  return axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    },
  });
};

export const searchMovies = async (query) => {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
};

export const getMovieDetails = async (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
};

// Example usage of axios
export const fetchMovies = async () => {
  try {
    const response = await axios.get('https://api.example.com/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};