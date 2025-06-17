import React from "react";
import "./FilterDropdown.css";

const FilterDropdown = ({ selectedCategory, onCategoryChange }) => {
  // handle category change
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label htmlFor="category-filter" className="filter-label">
        Filter Boards:
      </label>
      <select
        id="category-filter"
        className="filter-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="all">All Boards</option>
        <option value="recent">Recent (6)</option>
        <option value="Celebration">Celebration</option>
        <option value="Thank you">Thank You</option>
        <option value="Inspiration">Inspiration</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
