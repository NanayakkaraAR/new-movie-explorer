import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search for a movie..."
      value={searchQuery}
      onChange={handleInputChange}
      style={{
        padding: '0.75rem',
        width: '100%',
        borderRadius: '4px',
        border: 'none',
        fontSize: '1rem',
      }}
    />
  );
};

export default SearchBar;