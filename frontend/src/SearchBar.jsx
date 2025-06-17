import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  // state to track the search query
  const [query, setQuery] = useState("");

  // handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // handle search submission
  const handleSearch = () => {
    onSearch(query);
  };

  // handle key down (for Enter key)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // clear the search input
  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search boards..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <div className="search-button-container">
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button onClick={handleClear} className="clear-button-text">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
