import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import './FilterBar.css';

const FilterBar = () => {
  const { filters, setFilters, fetchFilteredMovies } = useContext(MovieContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Filter changed: ${name} = ${value}`); // Debugging line
    setFilters((prev) => ({ ...prev, [name]: value })); // Update filters in context
  };

  const handleApply = () => {
    fetchFilteredMovies(); // Fetch movies based on filters
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-card">
        <div className="filter-group">
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={filters.genre} onChange={handleChange}>
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="878">Sci-Fi</option>
            <option value="10749">Romance</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            type="number"
            placeholder="e.g. 2023"
            value={filters.year}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="rating">Rating</label>
          <select id="rating" name="rating" value={filters.rating} onChange={handleChange}>
            <option value="">All Ratings</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleChange}>
            <option value="popularity.desc">Most Popular</option>
            <option value="release_date.desc">Newest</option>
            <option value="vote_average.desc">Highest Rated</option>
          </select>
        </div>

        <button className="apply-button" onClick={handleApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;