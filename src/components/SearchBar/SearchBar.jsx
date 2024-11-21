import React, { useState } from 'react';
import './SearchBar.css'; // Import the new CSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const coords = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
    onSearch(coords, suggestion.display_name);
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a café or location..."
          className="search-bar-input"
        />
        <button type="submit" className="search-bar-button">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestions-item"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
