import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, fetchSearchResults } = useContext(MovieContext);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query); // Trigger search on input change
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